import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Theme } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private platformId = inject(PLATFORM_ID);
    private readonly STORAGE_KEY = 'portfolio-theme';

    // Signal for reactive theme state
    readonly theme = signal<Theme>('dark');

    constructor() {
        // Initialize theme from storage or system preference
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme) {
                this.theme.set(savedTheme);
            } else if (!prefersDark) {
                this.theme.set('light');
            }

            // Apply theme class to body
            this.applyTheme(this.theme());

            // React to theme changes
            effect(() => {
                this.applyTheme(this.theme());
                localStorage.setItem(this.STORAGE_KEY, this.theme());
            });
        }
    }

    toggleTheme(): void {
        this.theme.update(current => current === 'dark' ? 'light' : 'dark');
    }

    setTheme(theme: Theme): void {
        this.theme.set(theme);
    }

    private applyTheme(theme: Theme): void {
        if (isPlatformBrowser(this.platformId)) {
            document.body.classList.remove('dark-theme', 'light-theme');
            document.body.classList.add(`${theme}-theme`);
        }
    }

    isDark(): boolean {
        return this.theme() === 'dark';
    }
}
