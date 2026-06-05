import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioDataService } from '../../core/services';
import { ScrollAnimateDirective } from '../../shared/directives';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, RouterModule, ScrollAnimateDirective],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent {
    portfolioData = inject(PortfolioDataService);

    // Quick highlights - Your core strengths
    highlights = [
        { icon: 'code', label: 'Clean Code', description: 'Writing maintainable, testable code' },
        { icon: 'speed', label: 'Performance', description: 'Optimizing queries and APIs' },
        { icon: 'storage', label: 'Database', description: 'MS SQL Server expertise' },
        { icon: 'api', label: 'REST APIs', description: 'Designing scalable APIs' }
    ];

    // Education - Your actual education
    education = [
        {
            degree: 'Bachelor of Technology (B.Tech)',
            field: 'Computer Science',
            school: 'B.P. Mandal College of Engineering',
            location: 'Madhepura, India',
            year: '2019 - 2023',
            gpa: 'GPA: 7.33 / 10.00',
            description: 'Focused on software engineering, database systems, and web development.'
        }
    ];

    // Certifications - Add yours when available
    certifications: { name: string; issuer: string; year: string }[] = [
        // Add your certifications here when you earn them
        // Example format:
        // { name: 'Microsoft Certified: Azure Developer', issuer: 'Microsoft', year: '2025' },
    ];

    // Professional Skills
    professionalSkills = [
        { name: 'Teamwork', icon: 'groups' },
        { name: 'Problem Solving', icon: 'psychology' },
        { name: 'Time Management', icon: 'schedule' },
        { name: 'Adaptability', icon: 'sync_alt' },
        { name: 'Fast Learner', icon: 'school' },
        { name: 'Agile/Scrum', icon: 'loop' }
    ];
}
