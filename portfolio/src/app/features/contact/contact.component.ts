import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortfolioDataService } from '../../core/services';
import { ScrollAnimateDirective } from '../../shared/directives';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ScrollAnimateDirective],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    private fb = inject(FormBuilder);
    portfolioData = inject(PortfolioDataService);

    contactForm: FormGroup;
    isSubmitting = signal(false);
    isSubmitted = signal(false);
    submitError = signal<string | null>(null);

    constructor() {
        this.contactForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            subject: ['', [Validators.required, Validators.minLength(5)]],
            message: ['', [Validators.required, Validators.minLength(20)]]
        });
    }

    onSubmit(): void {
        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
            return;
        }

        this.isSubmitting.set(true);
        this.submitError.set(null);

        // Simulate API call
        setTimeout(() => {
            this.isSubmitting.set(false);
            this.isSubmitted.set(true);
            this.contactForm.reset();

            // Reset success message after 5 seconds
            setTimeout(() => {
                this.isSubmitted.set(false);
            }, 5000);
        }, 1500);
    }

    getFieldError(fieldName: string): string | null {
        const field = this.contactForm.get(fieldName);
        if (!field || !field.touched || !field.errors) return null;

        if (field.errors['required']) return `${this.capitalize(fieldName)} is required`;
        if (field.errors['email']) return 'Please enter a valid email address';
        if (field.errors['minlength']) {
            const minLength = field.errors['minlength'].requiredLength;
            return `${this.capitalize(fieldName)} must be at least ${minLength} characters`;
        }

        return null;
    }

    private capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
