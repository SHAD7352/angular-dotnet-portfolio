import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    PersonalInfo,
    Project,
    Skill,
    Experience,
    BlogPost,
    NavigationItem,
    SocialLink,
    DashboardStats
} from '../models';

@Injectable({
    providedIn: 'root'
})
export class PortfolioDataService {

    // ============================================
    // PERSONAL INFORMATION
    // Note: This can be fetched from API in future
    // Replace signal value with HTTP call result
    // ============================================

    readonly personalInfo = signal<PersonalInfo>({
        name: '',
        title: '',
        tagline: '',
        email: '',
        phone: '',
        location: '',
        avatar: '',
        resumeUrl: '',
        bio: '',
        socialLinks: []
    });

    // ============================================
    // NAVIGATION
    // ============================================

    readonly navigationItems = signal<NavigationItem[]>([
        { label: 'Home', route: '/', icon: 'home', exact: true },
        { label: 'About', route: '/about', icon: 'person' },
        { label: 'Skills', route: '/skills', icon: 'code' },
        { label: 'Experience', route: '/experience', icon: 'work' },
        { label: 'Projects', route: '/projects', icon: 'folder' },
        { label: 'Blog', route: '/blog', icon: 'article' },
        { label: 'Contact', route: '/contact', icon: 'mail' }
    ]);

    // ============================================
    // SKILLS DATA
    // Note: Skill levels can be adjusted as needed
    // ============================================

    readonly skills = signal<Skill[]>([]);

    // ============================================
    // EXPERIENCE DATA
    // Note: Fetch from API: GET /api/experiences
    // ============================================

    readonly experiences = signal<Experience[]>([]);

    // ============================================
    // EDUCATION DATA
    // Note: Can be added to API later
    // ============================================

    readonly education = signal<any[]>([]);

    // ============================================
    // PROJECTS DATA
    // Note: Fetch from API: GET /api/projects
    // ============================================

     readonly projects = signal<Project[]>([]);

    // ============================================
    // BLOG POSTS DATA
    // Note: Fetch from API: GET /api/blog/posts
    // ============================================

    readonly blogPosts = signal<BlogPost[]>([]);

    // ============================================
    // CERTIFICATIONS DATA (Optional)
    // ============================================

    readonly certifications = signal([
        // Add certifications when available
        // {
        //     id: '1',
        //     name: 'Microsoft Certified: Azure Developer Associate',
        //     issuer: 'Microsoft',
        //     date: new Date('2024-06-01'),
        //     credentialUrl: 'https://...'
        // }
    ]);

    // ============================================
    // HELPER METHODS
    // ============================================

    getSkillsByCategory(category: 'frontend' | 'backend' | 'database' | 'tools'): Skill[] {
        return this.skills().filter(skill => skill.category === category);
    }

    getFeaturedProjects(): Project[] {
        return this.projects().filter(project => project.isFeatured);
    }

    getProjectsByCategory(category: string): Project[] {
        if (category === 'all') return this.projects();
        return this.projects().filter(project => project.category === category);
    }

    getProjectById(id: string): Project | undefined {
        return this.projects().find(project => project.id === id);
    }

    getBlogPostBySlug(slug: string): BlogPost | undefined {
        return this.blogPosts().find(post => post.slug === slug);
    }

    getPublishedPosts(): BlogPost[] {
        return this.blogPosts().filter(post => post.published);
    }

    // ============================================
    // API INTEGRATION METHODS (Future Use)
    // Uncomment and implement when backend is ready
    // ============================================

    private http = inject(HttpClient);
    private apiBaseUrl = environment.apiUrl;

    constructor() {
        this.loadFromApi();
    }

    loadFromApi(): void {
        // Fetch Personal Info
        this.http.get<any>(`${this.apiBaseUrl}/personal-info`).subscribe({
            next: (res) => {
                if (res?.data) this.personalInfo.set(res.data);
            },
            error: (err) => console.error('Failed to load personal info:', err)
        });

        // Fetch Skills
        this.http.get<any>(`${this.apiBaseUrl}/skills`).subscribe({
            next: (res) => {
                if (res?.data && res.data.length > 0) this.skills.set(res.data);
            },
            error: (err) => console.error('Failed to load skills:', err)
        });

        // Fetch Experiences
        this.http.get<any>(`${this.apiBaseUrl}/experiences`).subscribe({
            next: (res) => {
                if (res?.data && res.data.length > 0) {
                    const mapped = res.data.map((d: any) => ({
                        ...d,
                        current: d.isCurrent,
                        achievements: d.achievements?.map((a: any) => a.achievement) || [],
                        technologies: d.technologies?.map((t: any) => t.technology) || []
                    }));
                    this.experiences.set(mapped);
                }
            },
            error: (err) => console.error('Failed to load experiences:', err)
        });

        // Fetch Projects
        this.http.get<any>(`${this.apiBaseUrl}/projects`).subscribe({
            next: (res) => {
                if (res?.data && res.data.length > 0) {
                    const mapped = res.data.map((d: any) => ({
                        ...d,
                        isFeatured: d.isFeatured,
                        projectDate: d.projectDate,
                        techStacks: d.techStacks?.map((t: any) => t.technology) || []
                    })).sort((a: Project, b: Project) => (b.sortOrder || 0) - (a.sortOrder || 0));
                    this.projects.set(mapped);
                }
            },
            error: (err) => console.error('Failed to load projects:', err)
        });

        // Fetch Blog Posts
        this.http.get<any>(`${this.apiBaseUrl}/blog/posts`).subscribe({
            next: (res) => {
                if (res?.data && res.data.length > 0) {
                    const mapped = res.data.map((d: any) => ({
                        ...d,
                        published: d.isPublished,
                        readingTime: d.readingTimeMinutes
                    }));
                    this.blogPosts.set(mapped);
                }
            },
            error: (err) => console.error('Failed to load blog posts:', err)
        });
    }

    createProject(project: Project): Observable<any> {
        return this.http.post<any>(`${this.apiBaseUrl}/projects`, project).pipe(
            tap((created) => {
                const newProject = {
                    ...created.data,
                    techStacks: created.data.techStacks?.map((t: any) => t.technology) || []
                };
                this.projects.update(projects => [...projects, newProject]);
            })
        );
    }

    updateProject(id: string, project: Project): Observable<any> {
        return this.http.put<any>(`${this.apiBaseUrl}/projects/${id}`, project).pipe(
            tap((updated) => {
                this.projects.update(projects => 
                    projects.map(p => p.id === updated.data.id ? {
                        ...updated.data,
                        techStacks: updated.data.techStacks?.map((t: any) => t.technology) || []
                    } : p)
                );
            })
        );
    }

    deleteProject(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiBaseUrl}/projects/${id}`).pipe(
            tap(() => {
                this.projects.update(projects => projects.filter(p => p.id !== id));
            })
        );
    }

    getDashboardStats(): Observable<any> {
        return this.http.get<any>(`${this.apiBaseUrl}/dashboard/stats`);
    }

    getContactMessages(limit?: number): Observable<any> {
        const url = limit ? `${this.apiBaseUrl}/dashboard/messages?limit=${limit}` : `${this.apiBaseUrl}/dashboard/messages`;
        return this.http.get<any>(url);
    }

    markMessageAsRead(id: string): Observable<any> {
        return this.http.put<any>(`${this.apiBaseUrl}/dashboard/messages/${id}/read`, {});
    }

    updatePersonalInfo(data: PersonalInfo): Observable<any> {
        return this.http.put<any>(`${this.apiBaseUrl}/personal-info`, data).pipe(
            tap(res => {
                if (res?.data) {
                    this.personalInfo.set(res.data);
                }
            })
        );
    }

    createBlogPost(post: BlogPost): Observable<any> {
        return this.http.post<any>(`${this.apiBaseUrl}/blog/posts`, post).pipe(
            tap((created) => {
                const newPost = {
                    ...created.data,
                    tags: created.data.tags?.map((t: any) => t.tag) || []
                };
                this.blogPosts.update(posts => [...posts, newPost]);
            })
        );
    }

    updateBlogPost(id: string, post: BlogPost): Observable<any> {
        return this.http.put<any>(`${this.apiBaseUrl}/blog/posts/${id}`, post).pipe(
            tap((updated) => {
                const updatedPost = {
                    ...updated.data,
                    tags: updated.data.tags?.map((t: any) => t.tag) || []
                };
                this.blogPosts.update(posts => 
                    posts.map(p => p.id === updatedPost.id ? updatedPost : p)
                );
            })
        );
    }

    deleteBlogPost(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiBaseUrl}/blog/posts/${id}`).pipe(
            tap(() => {
                this.blogPosts.update(posts => posts.filter(p => p.id !== id));
            })
        );
    }

    submitContactMessage(message: any): Observable<any> {
        return this.http.post<any>(`${this.apiBaseUrl}/contact`, message);
    }
}
