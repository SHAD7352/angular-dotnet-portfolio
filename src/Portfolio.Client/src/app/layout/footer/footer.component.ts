import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioDataService } from '../../core/services';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    portfolioData = inject(PortfolioDataService);
    currentYear = new Date().getFullYear();
}
