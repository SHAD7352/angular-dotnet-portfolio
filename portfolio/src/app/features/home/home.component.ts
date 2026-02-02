import { Component, inject, OnInit, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioDataService } from '../../core/services';
import { ScrollAnimateDirective } from '../../shared/directives';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule, ScrollAnimateDirective],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    private platformId = inject(PLATFORM_ID);
    portfolioData = inject(PortfolioDataService);

    @ViewChild('heroSection') heroSection!: ElementRef;

    typedText = '';
    fullText = '';
    isTyping = true;
    private typingSpeed = 80;
    private deletingSpeed = 50;
    private pauseDuration = 2000;
    private currentIndex = 0;
    private roles = [
        'Dot Net Developer',
        'ASP.NET Expert',
        'Backend Developer',
        'Problem Solver',
        'API Specialist'
    ];
    private roleIndex = 0;

    ngOnInit(): void {
        this.fullText = this.roles[0];
        if (isPlatformBrowser(this.platformId)) {
            this.startTypingAnimation();
        } else {
            this.typedText = this.fullText;
        }
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.initParticles();
        }
    }

    private startTypingAnimation(): void {
        const type = () => {
            if (this.isTyping) {
                if (this.currentIndex < this.fullText.length) {
                    this.typedText += this.fullText.charAt(this.currentIndex);
                    this.currentIndex++;
                    setTimeout(type, this.typingSpeed);
                } else {
                    this.isTyping = false;
                    setTimeout(type, this.pauseDuration);
                }
            } else {
                if (this.currentIndex > 0) {
                    this.typedText = this.fullText.substring(0, this.currentIndex - 1);
                    this.currentIndex--;
                    setTimeout(type, this.deletingSpeed);
                } else {
                    this.isTyping = true;
                    this.roleIndex = (this.roleIndex + 1) % this.roles.length;
                    this.fullText = this.roles[this.roleIndex];
                    setTimeout(type, 500);
                }
            }
        };

        setTimeout(type, 1000);
    }

    private initParticles(): void {
        // Simple particle animation using CSS - no external library needed
    }

    scrollToProjects(): void {
        if (isPlatformBrowser(this.platformId)) {
            const projectsSection = document.getElementById('featured-projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}
