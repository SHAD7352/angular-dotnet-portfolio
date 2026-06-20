import { Component, inject, signal, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioDataService, ThemeService, AuthService } from '../../core/services';
import { ContactMessage, DashboardStats } from '../../core/models';

interface MenuItem {
    icon: string;
    label: string;
    route: string;
    badge?: number;
}

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {
    portfolioData = inject(PortfolioDataService);
    themeService = inject(ThemeService);
    authService = inject(AuthService);

    @ViewChild('shaderCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
    private gl!: WebGLRenderingContext | null;
    private animationFrameId!: number;
    private resizeObserver!: ResizeObserver;

    isSidebarCollapsed = signal(false);
    dashboardStats = signal<DashboardStats | null>(null);
    unreadMessagesCount = signal<number>(0);

    menuItems = signal<MenuItem[]>([
        { icon: 'dashboard', label: 'Dashboard', route: '/admin' },
        { icon: 'folder', label: 'Projects', route: '/admin/projects', badge: 0 },
        { icon: 'article', label: 'Blog Posts', route: '/admin/blogs', badge: 0 },
        { icon: 'mail', label: 'Messages', route: '/admin/messages', badge: 0 },
        { icon: 'person', label: 'Profile', route: '/admin/profile' },
        { icon: 'settings', label: 'Settings', route: '/admin/settings' }
    ]);

    ngOnInit(): void {
        this.loadDashboardData();
    }

    ngAfterViewInit(): void {
        this.initShader();
    }

    ngOnDestroy(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    loadDashboardData(): void {
        this.portfolioData.getDashboardStats().subscribe({
            next: (res) => {
                if (res?.success && res.data) {
                    this.dashboardStats.set(res.data);
                    this.unreadMessagesCount.set(res.data.unreadMessagesCount);
                    
                    // Update menu badges dynamically
                    this.menuItems.update(items => items.map(item => {
                        if (item.label === 'Projects') return { ...item, badge: res.data.projectsCount };
                        if (item.label === 'Blog Posts') return { ...item, badge: res.data.blogPostsCount };
                        if (item.label === 'Messages') return { ...item, badge: res.data.unreadMessagesCount };
                        return item;
                    }));
                }
            },
            error: (err) => console.error('Failed to load dashboard stats:', err)
        });
    }

    initShader(): void {
        const canvas = this.canvasRef?.nativeElement;
        if (!canvas) return;

        this.gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
        if (!this.gl) return;

        const gl = this.gl;
        
        // Sync the WebGL drawing-buffer size with the CSS-driven layout size
        this.resizeObserver = new ResizeObserver(() => {
            const w = canvas.clientWidth || 1280;
            const h = canvas.clientHeight || 720;
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
        });
        this.resizeObserver.observe(canvas);

        const vs = `
            attribute vec2 a_position;
            varying vec2 v_texCoord;
            void main() {
                v_texCoord = a_position * 0.5 + 0.5;
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;
        
        const fs = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                float time = u_time * 0.2;
                
                // Deep, moving gradient for a premium dashboard feel
                vec3 color1 = vec3(0.01, 0.03, 0.07); // Deep dark blue-black
                vec3 color2 = vec3(0.06, 0.01, 0.09); // Dark purple shift
                
                float noise = sin(uv.x * 3.0 + time) * cos(uv.y * 2.0 - time * 0.5);
                vec3 color = mix(color1, color2, uv.y + noise * 0.15);
                
                // Add subtle "energy" pulses in the corners
                float d = length(uv - vec2(0.8, 0.2));
                float pulse = 0.05 * sin(time * 2.0);
                color += vec3(0.0, 0.94, 1.0) * (1.0 - smoothstep(0.0, 0.6 + pulse, d)) * 0.08;
                
                gl_FragColor = vec4(color, 1.0);
            }
        `;

        const compileShader = (type: number, src: string): WebGLShader | null => {
            const s = gl.createShader(type);
            if (!s) return null;
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };

        const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
        const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
        if (!vertexShader || !fragmentShader) return;

        const prog = gl.createProgram();
        if (!prog) return;
        gl.attachShader(prog, vertexShader);
        gl.attachShader(prog, fragmentShader);
        gl.linkProgram(prog);
        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

        const pos = gl.getAttribLocation(prog, 'a_position');
        gl.enableVertexAttribArray(pos);
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

        const uTime = gl.getUniformLocation(prog, 'u_time');
        const uRes = gl.getUniformLocation(prog, 'u_resolution');

        const render = (t: number) => {
            gl.viewport(0, 0, canvas.width, canvas.height);
            if (uTime) gl.uniform1f(uTime, t * 0.001);
            if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            this.animationFrameId = requestAnimationFrame(render);
        };
        render(0);
    }

    toggleSidebar(): void {
        this.isSidebarCollapsed.update(v => !v);
    }
}
