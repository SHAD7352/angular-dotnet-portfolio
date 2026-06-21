import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { BlogPost } from '../../../core/models';

@Component({
  selector: 'app-admin-blogs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss']
})
export class AdminBlogsComponent implements OnInit {
  portfolioData = inject(PortfolioDataService);
  fb = inject(FormBuilder);

  isModalOpen = signal(false);
  editingPostId = signal<string | null>(null);
  blogForm!: FormGroup;
  isSaving = signal(false);
  saveError = signal('');

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      excerpt: ['', Validators.required],
      content: ['', Validators.required],
      coverImage: ['', Validators.required],
      author: ['Admin', Validators.required],
      publishedAt: [new Date().toISOString().substring(0, 10), Validators.required],
      readingTime: [5, Validators.required],
      published: [false],
      tags: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  get tags(): FormArray {
    return this.blogForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.fb.control('', Validators.required));
  }

  removeTag(index: number): void {
    if (this.tags.length > 1) {
      this.tags.removeAt(index);
    }
  }

  openModal(post?: BlogPost): void {
    this.saveError.set('');
    if (post) {
      this.editingPostId.set(post.id);
      this.blogForm.patchValue({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        author: post.author || 'Admin',
        publishedAt: new Date(post.publishedAt || new Date()).toISOString().substring(0, 10),
        readingTime: post.readingTime,
        published: post.published
      });
      
      this.tags.clear();
      if (post.tags && post.tags.length > 0) {
        post.tags.forEach(tag => {
          this.tags.push(this.fb.control(tag, Validators.required));
        });
      } else {
        this.addTag();
      }
    } else {
      this.editingPostId.set(null);
      this.initForm();
    }
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.editingPostId.set(null);
    this.blogForm.reset();
    this.saveError.set('');
  }

  savePost(): void {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.saveError.set('');

    const formValue = this.blogForm.value;
    const postData: BlogPost = {
      id: this.editingPostId() || crypto.randomUUID(),
      ...formValue,
      publishedAt: new Date(formValue.publishedAt)
    };

    const saveObs = this.editingPostId()
      ? this.portfolioData.updateBlogPost(this.editingPostId()!, postData)
      : this.portfolioData.createBlogPost(postData);

    saveObs.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.closeModal();
      },
      error: (err) => {
        this.isSaving.set(false);
        this.saveError.set(err.error?.message || 'Failed to save blog post. Please try again.');
        console.error('Failed to save blog post:', err);
      }
    });
  }

  deletePost(id: string): void {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.portfolioData.deleteBlogPost(id).subscribe({
        next: () => {},
        error: (err) => {
          alert(err.error?.message || 'Failed to delete blog post.');
          console.error('Failed to delete blog post:', err);
        }
      });
    }
  }
}
