# Portfolio Application Architecture

> **Last Updated:** February 2, 2026  
> **Angular Version:** 17+  
> **Node Version:** 18+

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Design System](#design-system)
5. [Core Services](#core-services)
6. [Feature Modules](#feature-modules)
7. [Routing Configuration](#routing-configuration)
8. [Theming System](#theming-system)
9. [Animation System](#animation-system)
10. [Best Practices](#best-practices)
11. [Future Enhancements](#future-enhancements)

---

## Project Overview

This is a **responsive, enterprise-grade Angular portfolio** application built with:

- **Dark Professional Theme** as default
- **Mobile-first responsive design**
- **Modular architecture** with standalone components
- **Lazy-loaded routes** for optimal performance
- **Angular Signals** for reactive state management
- **SCSS** with CSS custom properties for theming

### Key Features

| Feature | Description |
|---------|-------------|
| Home Page | Hero section with typewriter animation, featured projects, skills marquee |
| About | Profile card, bio, highlights, skills with progress bars |
| Skills | Categorized skills grid with proficiency levels |
| Experience | Vertical timeline with achievements |
| Projects | Filterable project cards with hover effects |
| Blog | Featured post, article grid, newsletter signup |
| Contact | Split layout with validated contact form |
| Admin | Dashboard with stats, quick actions, sidebar navigation |

---

## Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
├─────────────────────────────────────────────────────────────┤
│  Framework:        Angular 17+ (Standalone Components)       │
│  Styling:          SCSS + CSS Custom Properties              │
│  UI Library:       Angular Material + CDK                    │
│  State:            Angular Signals                           │
│  Forms:            Reactive Forms                            │
│  Routing:          Angular Router (Lazy Loading)             │
│  Animations:       CSS Keyframes + IntersectionObserver      │
│  Icons:            Material Icons (Outlined)                 │
│  Fonts:            Inter (Headings) + Roboto (Body)          │
└─────────────────────────────────────────────────────────────┘
```

### Dependencies

```json
{
  "@angular/core": "^17.x",
  "@angular/material": "^17.x",
  "@angular/cdk": "^17.x",
  "@angular/animations": "^17.x",
  "@angular/forms": "^17.x",
  "@angular/router": "^17.x"
}
```

---

## Folder Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── core/                    # Core functionality
│   │   │   ├── guards/              # Route guards (future)
│   │   │   ├── interceptors/        # HTTP interceptors (future)
│   │   │   ├── models/              # TypeScript interfaces
│   │   │   │   ├── portfolio.models.ts
│   │   │   │   └── index.ts         # Barrel export
│   │   │   └── services/            # Singleton services
│   │   │       ├── theme.service.ts
│   │   │       ├── portfolio-data.service.ts
│   │   │       ├── animation.service.ts
│   │   │       └── index.ts         # Barrel export
│   │   │
│   │   ├── shared/                  # Shared utilities
│   │   │   ├── components/          # Reusable components (future)
│   │   │   ├── directives/          # Custom directives
│   │   │   │   ├── scroll-animate.directive.ts
│   │   │   │   └── index.ts
│   │   │   └── pipes/               # Custom pipes (future)
│   │   │
│   │   ├── layout/                  # Layout components
│   │   │   ├── header/
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.scss
│   │   │   ├── footer/
│   │   │   │   ├── footer.component.ts
│   │   │   │   ├── footer.component.html
│   │   │   │   └── footer.component.scss
│   │   │   └── sidebar/             # Admin sidebar (future)
│   │   │
│   │   ├── features/                # Feature modules (lazy-loaded)
│   │   │   ├── home/
│   │   │   ├── about/
│   │   │   ├── skills/
│   │   │   ├── experience/
│   │   │   ├── projects/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   └── admin/
│   │   │
│   │   ├── app.ts                   # Root component
│   │   ├── app.routes.ts            # Route definitions
│   │   └── app.config.ts            # App configuration
│   │
│   ├── styles.scss                  # Global styles & design system
│   ├── index.html                   # Entry HTML with SEO meta
│   └── main.ts                      # Bootstrap file
│
├── ARCHITECTURE.md                  # This file
├── angular.json                     # Angular CLI config
├── package.json                     # Dependencies
└── tsconfig.json                    # TypeScript config
```

---

## Design System

### Color Palette

```scss
// Dark Theme (Default)
--bg-primary:       #0F172A    // Main background
--bg-secondary:     #1E293B    // Secondary background
--bg-surface:       #1E293B    // Card surfaces
--bg-elevated:      #334155    // Elevated elements
--text-primary:     #F8FAFC    // Primary text
--text-secondary:   #CBD5E1    // Secondary text
--text-muted:       #64748B    // Muted text
--accent-primary:   #38BDF8    // Cyan accent
--accent-secondary: #22C55E    // Green accent
--accent-error:     #EF4444    // Error red
--border-primary:   #334155    // Primary border
--border-secondary: #475569    // Secondary border

// Light Theme
--bg-primary:       #FFFFFF
--bg-secondary:     #F8FAFC
--text-primary:     #0F172A
--text-secondary:   #334155
--accent-primary:   #0EA5E9
--accent-secondary: #16A34A
```

### Spacing System (8px base)

```scss
--space-1:  4px      --space-8:   64px
--space-2:  8px      --space-10:  80px
--space-3:  12px     --space-12:  96px
--space-4:  16px     --space-16:  128px
--space-6:  24px
```

### Typography

```scss
--font-heading: 'Inter', sans-serif
--font-body:    'Roboto', sans-serif

// Type Scale
--text-xs:   0.75rem    // 12px
--text-sm:   0.875rem   // 14px
--text-base: 1rem       // 16px
--text-lg:   1.125rem   // 18px
--text-xl:   1.25rem    // 20px
--text-2xl:  1.5rem     // 24px
--text-3xl:  1.875rem   // 30px
--text-4xl:  2.25rem    // 36px
--text-5xl:  3rem       // 48px
```

### Border Radius

```scss
--radius-sm:   8px
--radius-md:   12px     // Default
--radius-lg:   16px
--radius-xl:   24px
--radius-full: 9999px
```

### Shadows

```scss
--shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md:   0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg:   0 10px 15px rgba(0, 0, 0, 0.1)
--shadow-xl:   0 20px 25px rgba(0, 0, 0, 0.1)
--shadow-glow: 0 0 40px rgba(56, 189, 248, 0.3)
```

### Transitions

```scss
--transition-fast: 150ms ease
--transition-base: 250ms ease
--transition-slow: 350ms ease
```

---

## Core Services

### 1. ThemeService

**Location:** `src/app/core/services/theme.service.ts`

Manages dark/light theme switching with localStorage persistence.

```typescript
// Usage
themeService = inject(ThemeService);

// Properties
themeService.theme()      // Signal<'dark' | 'light'>
themeService.isDark()     // Computed<boolean>

// Methods
themeService.toggleTheme()
themeService.setTheme('dark' | 'light')
```

**How it works:**
1. Checks localStorage for saved preference
2. Falls back to system preference (`prefers-color-scheme`)
3. Applies `.dark-theme` or `.light-theme` class to `<body>`
4. Persists changes to localStorage

### 2. PortfolioDataService

**Location:** `src/app/core/services/portfolio-data.service.ts`

Centralized data store using Angular Signals. Contains mock data for all sections.

```typescript
// Usage
portfolioData = inject(PortfolioDataService);

// Available Signals
portfolioData.personalInfo()      // PersonalInfo
portfolioData.navigationItems()   // NavItem[]
portfolioData.skills()            // Skill[]
portfolioData.experiences()       // Experience[]
portfolioData.projects()          // Project[]
portfolioData.blogPosts()         // BlogPost[]

// Helper Methods
portfolioData.getSkillsByCategory('frontend')
portfolioData.getProjectsByCategory('fullstack')
portfolioData.getPublishedPosts()
portfolioData.getFeaturedProjects()
```

### 3. AnimationService

**Location:** `src/app/core/services/animation.service.ts`

Handles scroll-based reveal animations using IntersectionObserver.

```typescript
// Usage (typically via directive)
animationService = inject(AnimationService);

animationService.observe(element, {
  animation: 'animate-fade-in-up',
  delay: 100,
  threshold: 0.1
});

animationService.unobserve(element);
```

---

## Feature Modules

Each feature is a standalone component with lazy loading.

### Component Structure

```
feature-name/
├── feature-name.component.ts      # Component logic
├── feature-name.component.html    # Template
└── feature-name.component.scss    # Styles
```

### Features Overview

| Route | Component | Key Features |
|-------|-----------|--------------|
| `/` | HomeComponent | Typewriter animation, hero section, featured projects, skills marquee, CTA |
| `/about` | AboutComponent | Profile card, bio, highlights, skills progress bars, education |
| `/skills` | SkillsComponent | Category tabs, skill cards with progress, proficiency legend, tools grid |
| `/experience` | ExperienceComponent | Vertical timeline, duration calculation, achievements, stats |
| `/projects` | ProjectsComponent | Filter tabs, project cards, hover overlay, featured badge |
| `/blog` | BlogComponent | Featured post, posts grid, reading time, newsletter form |
| `/contact` | ContactComponent | Split layout, reactive form, validation, success state |
| `/admin` | AdminComponent | Collapsible sidebar, stats dashboard, quick actions |

---

## Routing Configuration

**Location:** `src/app/app.routes.ts`

```typescript
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component')
      .then(m => m.HomeComponent),
    title: 'Home | Portfolio'
  },
  // ... other routes
];
```

### Route Features

- ✅ **Lazy Loading:** All feature components are lazy-loaded
- ✅ **Page Titles:** Each route has a descriptive title for SEO
- ✅ **View Transitions:** Enabled via `withViewTransitions()`
- ✅ **Wildcard Redirect:** Unknown routes redirect to home

---

## Theming System

### How Themes Work

1. **CSS Custom Properties** are defined in `:root` and `.dark-theme`/`.light-theme`
2. **ThemeService** toggles body class
3. **All components** use CSS variables (e.g., `var(--bg-primary)`)

### Adding a New Theme

```scss
// In styles.scss
.custom-theme {
  --bg-primary: #yourcolor;
  --text-primary: #yourcolor;
  // ... override all variables
}
```

```typescript
// In ThemeService
type Theme = 'dark' | 'light' | 'custom';
```

---

## Animation System

### Available Animation Classes

```scss
// Fade animations
.animate-fade-in
.animate-fade-in-up
.animate-fade-in-down
.animate-fade-in-left
.animate-fade-in-right

// Scale animations
.animate-scale-in

// Special animations
.animate-float       // Continuous floating
.animate-pulse       // Pulsing effect
.animate-shimmer     // Loading shimmer
.animate-rotate      // Continuous rotation
```

### Using ScrollAnimateDirective

```html
<!-- Basic usage -->
<div appScrollAnimate="animate-fade-in-up">
  Content reveals on scroll
</div>

<!-- With delay for staggered effect -->
<div 
  appScrollAnimate="animate-fade-in-up" 
  [animationDelay]="100">
  Delayed animation
</div>
```

---

## Best Practices

### Component Guidelines

1. **Use Standalone Components**
   ```typescript
   @Component({
     standalone: true,
     imports: [CommonModule, RouterModule],
     // ...
   })
   ```

2. **Inject Services with `inject()`**
   ```typescript
   private themeService = inject(ThemeService);
   ```

3. **Use Signals for State**
   ```typescript
   isMenuOpen = signal(false);
   
   toggleMenu() {
     this.isMenuOpen.update(v => !v);
   }
   ```

4. **Use Computed for Derived State**
   ```typescript
   filteredItems = computed(() => 
     this.items().filter(i => i.active)
   );
   ```

### Styling Guidelines

1. **Use CSS Variables**
   ```scss
   .card {
     background: var(--bg-surface);
     border: 1px solid var(--border-primary);
     border-radius: var(--radius-md);
   }
   ```

2. **Use Design Tokens**
   ```scss
   padding: var(--space-4);
   font-size: var(--text-base);
   transition: all var(--transition-base);
   ```

3. **Mobile-First Media Queries**
   ```scss
   .grid {
     display: grid;
     gap: var(--space-2);
     
     @media (min-width: 768px) {
       grid-template-columns: repeat(2, 1fr);
     }
     
     @media (min-width: 1024px) {
       grid-template-columns: repeat(3, 1fr);
     }
   }
   ```

### Performance Tips

1. **Lazy load all feature routes**
2. **Use `trackBy` in `@for` loops**
3. **Use `isPlatformBrowser()` for browser-only code**
4. **Avoid heavy computations in templates**

---

## Future Enhancements

### Planned Features

- [ ] **Blog Post Detail Page** - Full article view with markdown support
- [ ] **Project Detail Page** - Extended project information
- [ ] **Authentication** - Admin login with guards
- [ ] **Backend Integration** - Replace mock data with API calls
- [ ] **CMS Integration** - Headless CMS for content management
- [ ] **Dark/Light Toggle Animation** - Smooth theme transition
- [ ] **PWA Support** - Offline capability, installable app
- [ ] **Analytics Integration** - Page view tracking
- [ ] **Contact Form Backend** - Email notifications
- [ ] **Image Optimization** - Lazy loading, WebP conversion

### Potential Enhancements

```
┌─────────────────────────────────────────────────────────┐
│  Performance                                             │
│  ├─ Image optimization with NgOptimizedImage            │
│  ├─ Bundle analysis and optimization                    │
│  └─ Server-side rendering (SSR)                         │
├─────────────────────────────────────────────────────────┤
│  Features                                                │
│  ├─ Multi-language support (i18n)                       │
│  ├─ Search functionality                                │
│  ├─ Comments system for blog                            │
│  └─ Project case studies                                │
├─────────────────────────────────────────────────────────┤
│  Admin Panel                                             │
│  ├─ Project CRUD operations                             │
│  ├─ Blog post editor (markdown)                         │
│  ├─ Message management                                  │
│  └─ Analytics dashboard                                 │
└─────────────────────────────────────────────────────────┘
```

---

## Commands Reference

```bash
# Development
npm run start              # Start dev server (http://localhost:4200)
npm run build              # Production build
npm run build -- --watch   # Build with watch mode

# Testing (future)
npm run test               # Run unit tests
npm run e2e                # Run end-to-end tests

# Code Quality
npm run lint               # ESLint check
npm run format             # Prettier format
```

---

## Contact & Support

For questions about this architecture or contributions:

- **Author:** Md Shad Alam
- **Email:** mdshadalamcareer@gmail.com
- **Phone:** +917091771277
- **Location:** Guwahati, Assam, India
- **GitHub:** [github.com/mdshadalamcareer](https://github.com/mdshadalamcareer)
- **LinkedIn:** [linkedin.com/in/mdshadalamcareer](https://linkedin.com/in/mdshadalamcareer)

---

## API Integration Guide (Future)

When connecting to your backend API, update the `PortfolioDataService`:

### Expected API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/personal-info` | GET | Personal information |
| `/api/skills` | GET | Skills list |
| `/api/experiences` | GET | Work experiences |
| `/api/projects` | GET | Projects list |
| `/api/projects/:id` | GET | Single project |
| `/api/blog/posts` | GET | Blog posts |
| `/api/blog/posts/:slug` | GET | Single post |
| `/api/contact` | POST | Submit contact form |

### Integration Steps

1. Create an `ApiService` in `core/services/`
2. Update `PortfolioDataService` to fetch from API
3. Add HTTP interceptors for auth tokens
4. Implement error handling and loading states
5. Add caching for performance

### Sample API Response (Personal Info)

```json
{
  "name": "Md Shad Alam",
  "title": "Dot Net Developer",
  "tagline": "Your Next Dot Net Developer",
  "email": "mdshadalamcareer@gmail.com",
  "phone": "+917091771277",
  "location": "Guwahati, Assam, India",
  "bio": "ASP.NET developer with about two years of experience...",
  "socialLinks": [
    { "name": "GitHub", "url": "https://github.com/mdshadalamcareer" },
    { "name": "LinkedIn", "url": "https://linkedin.com/in/mdshadalamcareer" }
  ]
}
```

---

*This documentation was created for Md Shad Alam's portfolio project.*
*Last Updated: February 2, 2026*
