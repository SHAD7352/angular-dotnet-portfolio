import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { Project } from '../../../core/models';

@Component({
    selector: 'app-admin-projects',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './admin-projects.component.html',
    styleUrls: ['./admin-projects.component.scss']
})
export class AdminProjectsComponent implements OnInit {
    portfolioData = inject(PortfolioDataService);
    fb = inject(FormBuilder);

    isModalOpen = signal(false);
    editingProjectId = signal<string | null>(null);
    projectForm!: FormGroup;
    isSaving = signal(false);
    saveError = signal('');

    categories = ['frontend', 'backend', 'fullstack', 'mobile', 'other'];

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.projectForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            image: [''],
            category: ['fullstack', Validators.required],
            liveUrl: [''],
            githubUrl: [''],
            isFeatured: [false],
            projectDate: [new Date().toISOString().substring(0, 10), Validators.required],
            sortOrder: [0, Validators.required],
            techStacks: this.fb.array([this.fb.control('', Validators.required)])
        });
    }

    get techStacks(): FormArray {
        return this.projectForm.get('techStacks') as FormArray;
    }

    addTech(): void {
        this.techStacks.push(this.fb.control('', Validators.required));
    }

    removeTech(index: number): void {
        if (this.techStacks.length > 1) {
            this.techStacks.removeAt(index);
        }
    }

    openModal(project?: Project): void {
        this.saveError.set('');
        if (project) {
            this.editingProjectId.set(project.id);
            this.projectForm.patchValue({
                title: project.title,
                description: project.description,
                image: project.image,
                category: project.category,
                liveUrl: project.liveUrl,
                githubUrl: project.githubUrl,
                isFeatured: project.isFeatured,
                sortOrder: project.sortOrder,
                projectDate: new Date(project.projectDate).toISOString().substring(0, 10)
            });
            this.techStacks.clear();
            if (project.techStacks && project.techStacks.length > 0) {
                project.techStacks.forEach(tech => {
                    this.techStacks.push(this.fb.control(tech, Validators.required));
                });
            } else {
                this.addTech();
            }
        } else {
            this.editingProjectId.set(null);
            this.initForm();
        }
        this.isModalOpen.set(true);
    }

    closeModal(): void {
        this.isModalOpen.set(false);
        this.editingProjectId.set(null);
        this.projectForm.reset();
        this.saveError.set('');
    }

    saveProject(): void {
        if (this.projectForm.invalid) {
            this.projectForm.markAllAsTouched();
            return;
        }

        this.isSaving.set(true);
        this.saveError.set('');

        const formValue = this.projectForm.value;
        const projectData: Project = {
            id: this.editingProjectId() || crypto.randomUUID(),
            ...formValue,
            projectDate: new Date(formValue.projectDate)
        };

        const saveObs = this.editingProjectId()
            ? this.portfolioData.updateProject(this.editingProjectId()!, projectData)
            : this.portfolioData.createProject(projectData);

        saveObs.subscribe({
            next: () => {
                this.isSaving.set(false);
                this.closeModal();
            },
            error: (err) => {
                this.isSaving.set(false);
                this.saveError.set(err.error?.message || 'Failed to save project. Please try again.');
                console.error('Failed to save project:', err);
            }
        });
    }

    deleteProject(id: string): void {
        if (confirm('Are you sure you want to delete this project?')) {
            this.portfolioData.deleteProject(id).subscribe({
                next: () => {},
                error: (err) => {
                    alert(err.error?.message || 'Failed to delete project.');
                    console.error('Failed to delete project:', err);
                }
            });
        }
    }
}
