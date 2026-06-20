import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-layout">
      @if (showHeaderFooter()) {
        <app-header />
      }
      <main class="main-content">
        <router-outlet />
      </main>
      @if (showHeaderFooter()) {
        <app-footer />
      }
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
    }
  `]
})
export class AppComponent {
  title = 'Portfolio';
  router = inject(Router);
  showHeaderFooter = signal(true);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects.split('?')[0];
      this.showHeaderFooter.set(!(url === '/login' || url.startsWith('/admin')));
    });
  }
}
