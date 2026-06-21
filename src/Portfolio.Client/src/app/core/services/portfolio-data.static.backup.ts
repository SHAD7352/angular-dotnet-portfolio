import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    PersonalInfo,
    Project,
    Skill,
    Experience,
    BlogPost,
    NavigationItem,
    SocialLink
} from '../models';

@Injectable({
    providedIn: 'root'
})
export class PortfolioDataService {

    // ============================================
    // PERSONAL INFORMATION
    // Note: This can be fetched from API in future
    // Replace signal value with HTTP call result
    // ============================================

    readonly personalInfo = signal<PersonalInfo>({
        name: 'Md Shad Alam',
        title: 'Dot Net Developer',
        tagline: 'Your Next Dot Net Developer',
        email: 'mdshadalamcareer@gmail.com',
        phone: '+91709177xxxx',
        location: 'Guwahati, Assam, India',
        avatar: 'assets/images/profile.png',
        resumeUrl: 'assets/documents/resume.pdf',
        bio: `ASP.NET developer with about two years of experience delivering web applications using C#, ASP.NET MVC, and EF Core. I design and consume RESTful APIs, optimize SQL Server databases and queries, and implement maintainable backend features. I work in Agile teams, focusing on measurable improvements in performance and reliability while producing clean, testable code.`,
        socialLinks: [
            { name: 'GitHub', url: 'https://github.com/SHAD7352', icon: 'fab fa-github' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/md-shad-alam-7a535a241/', icon: 'fab fa-linkedin' },
            { name: 'Twitter', url: 'https://twitter.com/', icon: 'fab fa-twitter' }
        ]
    });

    // ============================================
    // NAVIGATION
    // ============================================

    readonly navigationItems = signal<NavigationItem[]>([
        { label: 'Home', route: '/', icon: 'home', exact: true },
        { label: 'About', route: '/about', icon: 'person' },
        { label: 'Skills', route: '/skills', icon: 'code' },
        { label: 'Experience', route: '/experience', icon: 'work' },
        { label: 'Projects', route: '/projects', icon: 'folder' },
        { label: 'Blog', route: '/blog', icon: 'article' },
        { label: 'Contact', route: '/contact', icon: 'mail' }
    ]);

    // ============================================
    // SKILLS DATA
    // Note: Skill levels can be adjusted as needed
    // ============================================

    readonly skills = signal<Skill[]>([
        // Programming Languages
        { name: 'C#', icon: 'csharp', level: 92, category: 'backend' },
        { name: 'Java', icon: 'java', level: 70, category: 'backend' },
        { name: 'JavaScript', icon: 'javascript', level: 85, category: 'frontend' },
        { name: 'SQL', icon: 'sql', level: 90, category: 'database' },

        // Frontend
        { name: 'HTML5', icon: 'html5', level: 95, category: 'frontend' },
        { name: 'CSS3', icon: 'css3', level: 90, category: 'frontend' },
        { name: 'Bootstrap', icon: 'bootstrap', level: 92, category: 'frontend' },
        { name: 'jQuery', icon: 'jquery', level: 88, category: 'frontend' },
        { name: 'Angular', icon: 'angular', level: 75, category: 'frontend' },
        { name: 'React.js', icon: 'react', level: 70, category: 'frontend' },

        // Backend Frameworks
        { name: 'ASP.NET Core', icon: 'dotnet', level: 92, category: 'backend' },
        { name: 'ASP.NET MVC', icon: 'dotnet', level: 95, category: 'backend' },
        { name: 'Entity Framework Core', icon: 'efcore', level: 90, category: 'backend' },
        { name: 'RESTful APIs', icon: 'api', level: 92, category: 'backend' },
        { name: 'WinForms', icon: 'windows', level: 85, category: 'backend' },
        { name: 'WebForms', icon: 'web', level: 82, category: 'backend' },

        // Database
        { name: 'MS SQL Server', icon: 'sqlserver', level: 92, category: 'database' },
        { name: 'MySQL', icon: 'mysql', level: 80, category: 'database' },

        // Tools
        { name: 'Visual Studio', icon: 'visualstudio', level: 95, category: 'tools' },
        { name: 'Git', icon: 'git', level: 88, category: 'tools' },
        { name: 'GitHub', icon: 'github', level: 88, category: 'tools' },
        { name: 'RDLC Reports', icon: 'report', level: 85, category: 'tools' },
        { name: 'Crystal Reports', icon: 'report', level: 80, category: 'tools' }
    ]);

    // ============================================
    // EXPERIENCE DATA
    // Note: Fetch from API: GET /api/experiences
    // ============================================

    readonly experiences = signal<Experience[]>([
        {
            id: '1',
            company: 'Vasp Technologies Pvt. Ltd.',
            companyLogo: 'assets/images/companies/vasp.png',
            role: 'Dot Net Developer',
            location: 'Guwahati, India',
            type: 'full-time',
            startDate: new Date('2025-06-01'),
            current: true,
            description: 'As a key developer on the product team, I build and maintain features for enterprise HRMS and School ERP solutions and contribute to the warehouse management system to improve inventory control and data management.',
            achievements: [
                'Design and implement features for HRMS and School ERP using ASP.NET and C#, focusing on task management and user registration modules',
                'Develop and maintain warehouse management functionality to improve inventory accuracy and data handling using MS SQL and efficient queries',
                'Integrate REST APIs and backend services to enable real-time data exchange across modules and external systems',
                'Collaborate with the product team to refine requirements, perform code reviews, and ensure high code quality and maintainability',
                'Use Visual Studio, Bootstrap, and jQuery to deliver responsive UI components and streamline front-end interactions'
            ],
            technologies: ['ASP.NET Core', 'Dapper', 'C#', 'MS SQL Server', 'REST APIs', 'Bootstrap', 'jQuery', 'Visual Studio', 'Alpine Js']
        },
        {
            id: '2',
            company: 'NM Technologies Pvt Ltd',
            companyLogo: 'assets/images/companies/nmtech.png',
            role: 'ASP.NET Developer',
            location: 'Kolkata, India',
            type: 'full-time',
            startDate: new Date('2024-02-01'),
            endDate: new Date('2025-05-31'),
            current: false,
            description: 'Developed and maintained web applications using C#, ASP.NET, MS SQL, Bootstrap, and jQuery within Visual Studio.',
            achievements: [
                'Built features for payroll, HRMS, vehicle parking management, and inventory systems, demonstrating versatile domain experience',
                'Implemented WinForms and WebForms modules to deliver reliable, user-friendly interfaces and improve application performance',
                'Created interactive reports using RDLC and Crystal Reports to support data-driven decision making',
                'Optimized database queries and schema designs in MS SQL to enhance application responsiveness and scalability'
            ],
            technologies: ['C#', 'ASP.NET', 'MS SQL', 'Bootstrap', 'jQuery', 'WinForms', 'WebForms', 'RDLC', 'Crystal Reports']
        }
    ]);

    // ============================================
    // EDUCATION DATA
    // Note: Can be added to API later
    // ============================================

    readonly education = signal([
        {
            id: '1',
            degree: 'Bachelor of Technology (B.Tech)',
            field: 'Computer Science',
            institution: 'B.P. Mandal College of Engineering',
            location: 'Madhepura, India',
            startprojectDate: new Date('2019-09-01'),
            endprojectDate: new Date('2023-09-30'),
            gpa: '7.33 / 10.00',
            current: false
        }
    ]);

    // ============================================
    // PROJECTS DATA
    // Note: Fetch from API: GET /api/projects
    // ============================================

     readonly projects = signal<Project[]>([
        {
            id: '1',
            title: 'School ERP System',
            description: 'Comprehensive School ERP solution with student registration, fee management, attendance tracking, and academic management modules.',
            image: 'assets/images/projectsimg/school-erp.png',
            techStacks: ['ASP.NET Core', 'ASP.NET MVC', 'ASP.NET Core Web API', 'Razor pages', 'Dapper', 'C#', 'MS SQL Server', 'Bootstrap', 'REST APIs', 'JQuery', 'Alpine.js', 'React.js'],
            category: 'fullstack',
            liveUrl: 'https://dc.sfsguwahati.in/',
            githubUrl: '',
            isFeatured: true,
            projectDate: new Date('2025-08-01')
        },
        {
            id: '2',
            title: 'Vehicle Parking Management System',
            description: 'Designed and maintained a Vehicle Parking Management System using ASP.NET Core/MVC to provide real-time parking slot monitoring, allocation, and history tracking. Implemented mobile-friendly RESTful APIs to enable seamless integration with mobile applications for parking slot booking and user management.',
            image: 'assets/images/projectsimg/VehicleParkingSystem.png',
            techStacks: ['ASP.NET Core', 'Web Forms', 'ASP.NET MVC', 'SQL Server', 'Entity Framework', 'REST APIs'],
            category: 'fullstack',
            liveUrl: 'https://smartpower.co.in/parking-fee-management-system',
            githubUrl: 'https://github.com/SHAD7352',
            isFeatured: false,
            projectDate: new Date('2025-05-01')
        },
        {
            id: '3',
            title: 'Jewellery & Scheme Managing Application',
            description: 'Developed RESTful APIs with ASP.NET Core to support mobile (customer) and web (admin) platforms for managing jewellery investment schemes. Enabled administrators to create, assign, and track schemes and agent collections, implementing server-side logic and EF-based data models for reliable tracking. Implemented financial calculation features to compute and display gold/diamond values based on customer investments and current market rates.',
            image: 'https://placehold.co/600x400/8e44ad/ffffff?text=Jewellery+Scheme',
            techStacks: ['ASP.NET Core', 'Entity Framework', 'REST APIs', 'SQL Server', 'C#'],
            category: 'backend',
            liveUrl: 'https://shyamsundarco.com/scheme',
            githubUrl: '',
            isFeatured: false,
            projectDate: new Date('2025-01-01')
        },
        {
            id: '4',
            title: 'Book Store Web Application',
            description: 'Built an ASP.NET Core 7 MVC book store web application featuring book category management, detailed book entries, and image upload support. Implemented user-friendly interfaces and used Entity Framework Core for data access, enabling reliable CRUD operations and optimized queries.',
            image: 'https://placehold.co/600x400/d35400/ffffff?text=Book+Store',
            techStacks: ['ASP.NET Core 7', 'MVC', 'Entity Framework Core', 'SQL Server', 'Bootstrap'],
            category: 'fullstack',
            liveUrl: '',
            githubUrl: 'https://github.com/mdshadalamcareer/bookstore',
            isFeatured: true,
            projectDate: new Date('2024-11-01')
        },
        {
            id: '5',
            title: 'Inventory and Invoice Generator',
            description: 'Developed a web application to manage product inventory and generate invoices using ASP.NET with MVC patterns for maintainable server-side logic. Integrated invoice generation with customer and product selection and used Entity Framework for data persistence and transactional operations.',
            image: 'https://placehold.co/600x400/27ae60/ffffff?text=Inventory+System',
            techStacks: ['ASP.NET', 'MVC', 'Entity Framework', 'SQL Server', 'Bootstrap', 'jQuery'],
            category: 'fullstack',
            liveUrl: '',
            githubUrl: 'https://github.com/mdshadalamcareer/inventory-invoice',
            isFeatured: false,
            projectDate: new Date('2024-03-01')
        },
        {
            id: '6',
            title: 'HRMS System',
            description: 'Enterprise Human Resource Management System with employee management, attendance tracking, leave management, and payroll processing features built at Vasp Technologies.',
            image: 'https://placehold.co/600x400/2980b9/ffffff?text=HRMS+System',
            techStacks: ['ASP.NET', 'C#', 'MS SQL Server', 'Bootstrap', 'jQuery'],
            category: 'fullstack',
            isFeatured: false,
            projectDate: new Date('2025-07-01')
        },
        {
            id: '7',
            title: 'Financial Accountability System for Transparency (FAST)',
            description: 'Developing a modern, cloud-based accounting and ERP system designed as a web-based alternative to traditional desktop software like Tally Prime. Features a high-speed, keyboard-driven "Gateway of Fast" interface for rapid data entry, coupled with a modern web architecture for remote accessibility and real-time syncing. [Status: Ongoing]',
            image: 'https://placehold.co/600x400/34495e/ffffff?text=MSFS+FAST',
            techStacks: ['Blazor WebAssembly', 'ASP.NET Core 10', 'C#', 'SQL Server', 'Entity Framework Core', 'REST APIs', 'Bootstrap'],
            category: 'fullstack',
            liveUrl: 'https://fast.msfsguwahati.org/auth/login',
            githubUrl: '',
            isFeatured: true,
            projectDate: new Date('2026-02-10') // Used today's date
        }
    ]);

    // ============================================
    // BLOG POSTS DATA
    // Note: Fetch from API: GET /api/blog/posts
    // ============================================

    readonly blogPosts = signal<BlogPost[]>([
        {
            id: '1',
            title: 'Building RESTful APIs with ASP.NET Core',
            slug: 'restful-apis-aspnet-core',
            excerpt: 'Learn how to design and implement scalable RESTful APIs using ASP.NET Core with best practices for enterprise applications.',
            content: '# Building RESTful APIs with ASP.NET Core\n\nIn this guide, we will explore how to create robust RESTful APIs...',
            coverImage: 'assets/images/blog/aspnet-api.png',
            author: 'Md Shad Alam',
            publishedAt: new Date('2025-01-15'),
            readingTime: 10,
            tags: ['ASP.NET Core', 'REST APIs', 'C#', 'Web Development'],
            published: true
        },
        {
            id: '2',
            title: 'Entity Framework Core: Best Practices',
            slug: 'ef-core-best-practices',
            excerpt: 'Discover Entity Framework Core patterns and techniques that will help you write more efficient and maintainable data access code.',
            content: '# Entity Framework Core: Best Practices\n\nEntity Framework Core is a powerful ORM...',
            coverImage: 'assets/images/projectsimg/ef-core.png',
            author: 'Md Shad Alam',
            publishedAt: new Date('2025-01-05'),
            readingTime: 8,
            tags: ['Entity Framework', 'C#', 'Database', 'ORM'],
            published: true
        },
        {
            id: '3',
            title: 'SQL Server Query Optimization Tips',
            slug: 'sql-server-optimization',
            excerpt: 'Learn techniques to optimize your SQL Server queries and improve database performance for enterprise applications.',
            content: '# SQL Server Query Optimization Tips\n\nOptimizing database queries is crucial...',
            coverImage: 'assets/images/projectsimg/sql-optimization.png',
            author: 'Md Shad Alam',
            publishedAt: new Date('2024-12-20'),
            readingTime: 7,
            tags: ['SQL Server', 'Database', 'Performance', 'Optimization'],
            published: true
        },
        {
            id: '4',
            title: 'From WinForms to ASP.NET Core: A Migration Guide',
            slug: 'winforms-to-aspnet-migration',
            excerpt: 'A practical guide for developers transitioning from desktop WinForms applications to web-based ASP.NET Core solutions.',
            content: '# From WinForms to ASP.NET Core\n\nMany organizations are modernizing their legacy applications...',
            coverImage: 'assets/images/blog/migration.png',
            author: 'Md Shad Alam',
            publishedAt: new Date('2024-11-28'),
            readingTime: 12,
            tags: ['WinForms', 'ASP.NET Core', 'Migration', 'Modernization'],
            published: true
        }
    ]);

    // ============================================
    // CERTIFICATIONS DATA (Optional)
    // ============================================

    readonly certifications = signal([
        // Add certifications when available
        // {
        //     id: '1',
        //     name: 'Microsoft Certified: Azure Developer Associate',
        //     issuer: 'Microsoft',
        //     projectDate: new Date('2024-06-01'),
        //     credentialUrl: 'https://...'
        // }
    ]);

    // ============================================
    // HELPER METHODS
    // ============================================

    getSkillsByCategory(category: 'frontend' | 'backend' | 'database' | 'tools'): Skill[] {
        return this.skills().filter(skill => skill.category === category);
    }

    getFeaturedProjects(): Project[] {
        return this.projects().filter(project => project.isFeatured);
    }

    getProjectsByCategory(category: string): Project[] {
        if (category === 'all') return this.projects();
        return this.projects().filter(project => project.category === category);
    }

    getProjectById(id: string): Project | undefined {
        return this.projects().find(project => project.id === id);
    }

    getBlogPostBySlug(slug: string): BlogPost | undefined {
        return this.blogPosts().find(post => post.slug === slug);
    }

    getPublishedPosts(): BlogPost[] {
        return this.blogPosts().filter(post => post.published);
    }

    // ============================================
    // API INTEGRATION METHODS (Future Use)
    // Uncomment and implement when backend is ready
    // ============================================

    private http = inject(HttpClient);
    private apiBaseUrl = 'https://localhost:7024/api';

    constructor() {
        this.loadFromApi();
    }

    loadFromApi(): void {
        // Fetch Personal Info
        this.http.get<any>(`${this.apiBaseUrl}/personalinfo`).subscribe({
            next: (res) => {
                if (res?.data) this.personalInfo.set(res.data);
            },
            error: (err) => console.error('Failed to load personal info:', err)
        });

        // Fetch Skills
        this.http.get<any>(`${this.apiBaseUrl}/skills`).subscribe({
            next: (res) => {
                if (res?.data && res.data.length > 0) this.skills.set(res.data);
            },
            error: (err) => console.error('Failed to load skills:', err)
        });

        // Fetch Experiences
        this.http.get<any>(`${this.apiBaseUrl}/experience`).subscribe({
            next: (res) => {
                if (res?.data && res.data.length > 0) {
                    const mapped = res.data.map((d: any) => ({
                        ...d,
                        current: d.isCurrent,
                        achievements: d.achievements?.map((a: any) => a.achievement) || [],
                        technologies: d.technologies?.map((t: any) => t.technology) || []
                    }));
                    this.experiences.set(mapped);
                }
            },
            error: (err) => console.error('Failed to load experiences:', err)
        });

        // Fetch Projects
        this.http.get<any>(`${this.apiBaseUrl}/projects`).subscribe({
            next: (res) => {
                if (res?.data && res.data.length > 0) {
                    const mapped = res.data.map((d: any) => ({
                        ...d,
                        isFeatured: d.isFeatured,
                        projectDate: d.projectDate,
                        techStacks: d.techStacks?.map((t: any) => t.technology) || []
                    }));
                    this.projects.set(mapped);
                }
            },
            error: (err) => console.error('Failed to load projects:', err)
        });

        // Fetch Blog Posts
        this.http.get<any>(`${this.apiBaseUrl}/blog`).subscribe({
            next: (res) => {
                if (res?.data && res.data.length > 0) {
                    const mapped = res.data.map((d: any) => ({
                        ...d,
                        published: d.isPublished,
                        readingTime: d.readingTimeMinutes
                    }));
                    this.blogPosts.set(mapped);
                }
            },
            error: (err) => console.error('Failed to load blog posts:', err)
        });
    }

    updateProject(project: Project): void {
        this.http.put<Project>(`${this.apiBaseUrl}/projects/${project.id}`, project).subscribe({
            next: (updated) => {
                this.projects.update(projects => 
                    projects.map(p => p.id === updated.id ? updated : p)
                );
            },
            error: (err) => console.error('Failed to update project:', err)
        });
    }
}
