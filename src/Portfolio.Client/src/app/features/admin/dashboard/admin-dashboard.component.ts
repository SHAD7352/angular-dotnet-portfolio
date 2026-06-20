import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { ContactMessage, DashboardStats } from '../../../core/models';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, DecimalPipe],
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
    portfolioData = inject(PortfolioDataService);

    dashboardStats = signal<DashboardStats | null>(null);
    recentMessages = signal<ContactMessage[]>([]);
    unreadMessagesCount = signal<number>(0);

    ngOnInit(): void {
        this.loadDashboardData();
    }

    loadDashboardData(): void {
        this.portfolioData.getDashboardStats().subscribe({
            next: (res) => {
                if (res?.success && res.data) {
                    this.dashboardStats.set(res.data);
                    this.unreadMessagesCount.set(res.data.unreadMessagesCount);
                }
            },
            error: (err) => console.error('Failed to load dashboard stats:', err)
        });

        this.portfolioData.getContactMessages(5).subscribe({
            next: (res) => {
                if (res?.success && res.data) {
                    this.recentMessages.set(res.data);
                }
            },
            error: (err) => console.error('Failed to load recent messages:', err)
        });
    }

    markAsRead(message: ContactMessage): void {
        if (message.isRead || !message.id) return;

        this.portfolioData.markMessageAsRead(message.id).subscribe({
            next: (res) => {
                if (res?.success) {
                    this.recentMessages.update(msgs => 
                        msgs.map(m => m.id === message.id ? { ...m, isRead: true } : m)
                    );
                    this.unreadMessagesCount.update(c => Math.max(0, c - 1));
                }
            },
            error: (err) => console.error('Failed to mark message as read:', err)
        });
    }
}
