import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services';
import { ScrollAnimateDirective } from '../../shared/directives';
import { Project } from '../../core/models';

interface FilterOption {
    key: string;
    label: string;
    count: number;
}

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, ScrollAnimateDirective],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
    portfolioData = inject(PortfolioDataService);

    // Current filter
    activeFilter = signal<string>('all');

    // Filter options with counts
    filterOptions = computed<FilterOption[]>(() => {
        const projects = this.portfolioData.projects();
        const categories = ['all', 'frontend', 'backend', 'fullstack', 'mobile', 'other'];

        return categories.map(cat => ({
            key: cat,
            label: cat === 'all' ? 'All Projects' : this.capitalizeFirst(cat),
            count: cat === 'all'
                ? projects.length
                : projects.filter(p => p.category === cat).length
        })).filter(opt => opt.count > 0);
    });

    // Filtered projects
    filteredProjects = computed<Project[]>(() => {
        const filter = this.activeFilter();
        return this.portfolioData.getProjectsByCategory(filter);
    });

    setFilter(filter: string): void {
        this.activeFilter.set(filter);
    }

    private capitalizeFirst(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getCategoryIcon(category: string): string {
        const icons: Record<string, string> = {
            frontend: 'web',
            backend: 'dns',
            fullstack: 'layers',
            mobile: 'smartphone',
            other: 'more_horiz'
        };
        return icons[category] || 'folder';
    }
}
