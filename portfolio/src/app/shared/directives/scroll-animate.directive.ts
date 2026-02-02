import { Directive, ElementRef, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { AnimationService } from '../../core/services';

@Directive({
    selector: '[appScrollAnimate]',
    standalone: true
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
    private el = inject(ElementRef);
    private animationService = inject(AnimationService);

    @Input() appScrollAnimate: string = 'animate-fade-in-up';
    @Input() animationDelay: number = 0;

    ngOnInit(): void {
        this.animationService.observe(this.el.nativeElement, {
            animation: this.appScrollAnimate,
            delay: this.animationDelay
        });
    }

    ngOnDestroy(): void {
        this.animationService.unobserve(this.el.nativeElement);
    }
}
