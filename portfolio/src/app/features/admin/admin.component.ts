import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioDataService, ThemeService } from '../../core/services';

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
export class AdminComponent {
    portfolioData = inject(PortfolioDataService);
    themeService = inject(ThemeService);

    isSidebarCollapsed = signal(false);

    menuItems: MenuItem[] = [
        { icon: 'dashboard', label: 'Dashboard', route: '/admin' },
        { icon: 'folder', label: 'Projects', route: '/admin/projects', badge: 6 },
        { icon: 'article', label: 'Blog Posts', route: '/admin/blogs', badge: 4 },
        { icon: 'mail', label: 'Messages', route: '/admin/messages', badge: 3 },
        { icon: 'person', label: 'Profile', route: '/admin/profile' },
        { icon: 'settings', label: 'Settings', route: '/admin/settings' }
    ];

    // Dashboard stats
    stats = [
        { icon: 'folder', label: 'Projects', value: 6, change: '+2' },
        { icon: 'article', label: 'Blog Posts', value: 4, change: '+1' },
        { icon: 'visibility', label: 'Page Views', value: '2.4k', change: '+15%' },
        { icon: 'mail', label: 'Messages', value: 12, change: '+5' }
    ];

    toggleSidebar(): void {
        this.isSidebarCollapsed.update(v => !v);
    }
}
