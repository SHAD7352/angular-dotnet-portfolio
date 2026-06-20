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

    categories = ['frontend', 'backend', 'fullstack', 'mobile', 'other'];

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.projectForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            image: ['', Validators.required],
            category: ['fullstack', Validators.required],
            liveUrl: [''],
            githubUrl: [''],
            featured: [false],
            date: [new Date().toISOString().substring(0, 10), Validators.required],
            techStack: this.fb.array([this.fb.control('', Validators.required)])
        });
    }

    get techStack(): FormArray {
        return this.projectForm.get('techStack') as FormArray;
    }

    addTech(): void {
        this.techStack.push(this.fb.control('', Validators.required));
    }

    removeTech(index: number): void {
        if (this.techStack.length > 1) {
            this.techStack.removeAt(index);
        }
    }

    openModal(project?: Project): void {
        if (project) {
            this.editingProjectId.set(project.id);
            this.projectForm.patchValue({
                title: project.title,
                description: project.description,
                image: project.image,
                category: project.category,
                liveUrl: project.liveUrl,
                githubUrl: project.githubUrl,
                featured: project.featured,
                date: new Date(project.date).toISOString().substring(0, 10)
            });
            this.techStack.clear();
            if (project.techStack && project.techStack.length > 0) {
                project.techStack.forEach(tech => {
                    this.techStack.push(this.fb.control(tech, Validators.required));
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
    }

    saveProject(): void {
        if (this.projectForm.invalid) {
            this.projectForm.markAllAsTouched();
            return;
        }

        const formValue = this.projectForm.value;
        const projectData: Project = {
            id: this.editingProjectId() || crypto.randomUUID(), // Assume random UUID for new if no API generates it
            ...formValue,
            date: new Date(formValue.date)
        };

        if (this.editingProjectId()) {
            this.portfolioData.updateProject(this.editingProjectId()!, projectData);
        } else {
            this.portfolioData.createProject(projectData);
        }

        this.closeModal();
    }

    deleteProject(id: string): void {
        if (confirm('Are you sure you want to delete this project?')) {
            this.portfolioData.deleteProject(id);
        }
    }
}
