import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'Home | Portfolio'
    },
    {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
        title: 'About Me | Portfolio'
    },
    {
        path: 'skills',
        loadComponent: () => import('./features/skills/skills.component').then(m => m.SkillsComponent),
        title: 'Skills | Portfolio'
    },
    {
        path: 'experience',
        loadComponent: () => import('./features/experience/experience.component').then(m => m.ExperienceComponent),
        title: 'Experience | Portfolio'
    },
    {
        path: 'projects',
        loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
        title: 'Projects | Portfolio'
    },
    {
        path: 'blog',
        loadComponent: () => import('./features/blog/blog.component').then(m => m.BlogComponent),
        title: 'Blog | Portfolio'
    },
    {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
        title: 'Contact | Portfolio'
    },
    {
        path: 'admin',
        loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
        title: 'Admin Dashboard | Portfolio'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
