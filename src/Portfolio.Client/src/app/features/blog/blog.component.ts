import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioDataService } from '../../core/services';
import { ScrollAnimateDirective } from '../../shared/directives';
import { BlogPost } from '../../core/models';

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [CommonModule, RouterModule, ScrollAnimateDirective],
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
    portfolioData = inject(PortfolioDataService);

    formatDate(date: Date): string {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(new Date(date));
    }

    getLatestPost(): BlogPost | undefined {
        const posts = this.portfolioData.getPublishedPosts();
        return posts.length > 0 ? posts[0] : undefined;
    }

    getOtherPosts(): BlogPost[] {
        return this.portfolioData.getPublishedPosts().slice(1);
    }
}
