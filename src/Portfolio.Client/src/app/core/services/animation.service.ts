import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface AnimationOptions {
    threshold?: number;
    rootMargin?: string;
    animation?: string;
    delay?: number;
}

@Injectable({
    providedIn: 'root'
})
export class AnimationService {
    private platformId = inject(PLATFORM_ID);
    private observer: IntersectionObserver | null = null;

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.initObserver();
        }
    }

    private initObserver(): void {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const element = entry.target as HTMLElement;
                        const animation = element.dataset['animation'] || 'animate-fade-in-up';
                        const delay = element.dataset['delay'] || '0';

                        element.style.animationDelay = `${delay}ms`;
                        element.classList.add(animation);
                        element.classList.add('animated');

                        // Unobserve after animation (optional - for one-time animations)
                        this.observer?.unobserve(element);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
    }

    observe(element: HTMLElement, options?: AnimationOptions): void {
        if (!isPlatformBrowser(this.platformId) || !this.observer) return;

        // Set data attributes for animation
        if (options?.animation) {
            element.dataset['animation'] = options.animation;
        }
        if (options?.delay) {
            element.dataset['delay'] = options.delay.toString();
        }

        // Initial state
        element.style.opacity = '0';

        this.observer.observe(element);
    }

    unobserve(element: HTMLElement): void {
        if (!isPlatformBrowser(this.platformId) || !this.observer) return;
        this.observer.unobserve(element);
    }

    disconnect(): void {
        if (!isPlatformBrowser(this.platformId) || !this.observer) return;
        this.observer.disconnect();
    }
}
