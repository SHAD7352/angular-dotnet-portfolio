import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services';
import { ScrollAnimateDirective } from '../../shared/directives';
import { Experience } from '../../core/models';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [CommonModule, ScrollAnimateDirective],
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
    portfolioData = inject(PortfolioDataService);

    formatDate(date: Date): string {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            year: 'numeric'
        }).format(new Date(date));
    }

    getDuration(exp: Experience): string {
        const start = new Date(exp.startDate);
        const end = exp.current ? new Date() : new Date(exp.endDate!);

        const months = (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());

        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (years > 0 && remainingMonths > 0) {
            return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
        } else if (years > 0) {
            return `${years} yr${years > 1 ? 's' : ''}`;
        } else {
            return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
        }
    }

    getTypeLabel(type: string): string {
        const labels: Record<string, string> = {
            'full-time': 'Full-time',
            'part-time': 'Part-time',
            'contract': 'Contract',
            'internship': 'Internship'
        };
        return labels[type] || type;
    }
}
