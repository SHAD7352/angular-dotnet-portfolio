import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { PersonalInfo } from '../../../core/models';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  portfolioData = inject(PortfolioDataService);
  fb = inject(FormBuilder);

  profileForm!: FormGroup;
  isSaving = signal(false);
  saveSuccess = signal(false);
  saveError = signal('');

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      tagline: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      location: ['', Validators.required],
      avatar: ['', Validators.required],
      resumeUrl: [''],
      bio: ['', Validators.required],
      socialLinks: this.fb.array([])
    });
  }

  get socialLinks(): FormArray {
    return this.profileForm.get('socialLinks') as FormArray;
  }

  addSocialLink(): void {
    this.socialLinks.push(this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      icon: ['', Validators.required]
    }));
  }

  removeSocialLink(index: number): void {
    this.socialLinks.removeAt(index);
  }

  loadData(): void {
    const data = this.portfolioData.personalInfo();
    this.profileForm.patchValue({
      name: data.name,
      title: data.title,
      tagline: data.tagline,
      email: data.email,
      phone: data.phone,
      location: data.location,
      avatar: data.avatar,
      resumeUrl: data.resumeUrl,
      bio: data.bio
    });

    this.socialLinks.clear();
    if (data.socialLinks) {
      data.socialLinks.forEach(link => {
        this.socialLinks.push(this.fb.group({
          name: [link.name, Validators.required],
          url: [link.url, Validators.required],
          icon: [link.icon, Validators.required]
        }));
      });
    }
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.saveSuccess.set(false);
    this.saveError.set('');

    const formValue = this.profileForm.value as PersonalInfo;

    this.portfolioData.updatePersonalInfo(formValue).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.saveSuccess.set(true);
        setTimeout(() => this.saveSuccess.set(false), 3000);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.saveError.set('Failed to update profile.');
        console.error(err);
      }
    });
  }
}
