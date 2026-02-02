import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services';
import { ScrollAnimateDirective } from '../../shared/directives';
import { Skill } from '../../core/models';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule, ScrollAnimateDirective],
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
    portfolioData = inject(PortfolioDataService);

    categories: { key: 'frontend' | 'backend' | 'database' | 'tools'; label: string; icon: string }[] = [
        { key: 'frontend', label: 'Frontend', icon: 'web' },
        { key: 'backend', label: 'Backend', icon: 'dns' },
        { key: 'database', label: 'Database', icon: 'storage' },
        { key: 'tools', label: 'Tools & DevOps', icon: 'build' }
    ];

    getSkillsByCategory(category: 'frontend' | 'backend' | 'database' | 'tools'): Skill[] {
        return this.portfolioData.getSkillsByCategory(category);
    }

    getSkillIcon(skillName: string): string {
        const iconMap: Record<string, string> = {
            'Angular': 'A',
            'React': 'R',
            'Vue.js': 'V',
            'TypeScript': 'TS',
            'JavaScript': 'JS',
            'Node.js': 'N',
            'Python': 'Py',
            'PostgreSQL': 'PG',
            'MongoDB': 'M',
            'Docker': 'D',
            'AWS': 'A',
            'Git': 'G'
        };
        return iconMap[skillName] || skillName.charAt(0);
    }

    getSkillColor(level: number): string {
        if (level >= 90) return 'expert';
        if (level >= 75) return 'advanced';
        if (level >= 60) return 'intermediate';
        return 'beginner';
    }
}
