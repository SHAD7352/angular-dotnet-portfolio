import { Component, inject, signal, HostListener, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService, PortfolioDataService } from '../../core/services';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    private platformId = inject(PLATFORM_ID);
    themeService = inject(ThemeService);
    portfolioData = inject(PortfolioDataService);

    isMenuOpen = signal(false);
    isScrolled = signal(false);

    @HostListener('window:scroll')
    onWindowScroll() {
        if (isPlatformBrowser(this.platformId)) {
            this.isScrolled.set(window.scrollY > 50);
        }
    }

    toggleMenu(): void {
        this.isMenuOpen.update(v => !v);

        // Prevent body scroll when menu is open
        if (isPlatformBrowser(this.platformId)) {
            document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
        }
    }

    closeMenu(): void {
        this.isMenuOpen.set(false);
        if (isPlatformBrowser(this.platformId)) {
            document.body.style.overflow = '';
        }
    }

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }
}
