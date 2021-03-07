import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[setColor]',
})
export class ColorDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.setColor = '';
  }

  @Input('setColor') setColor: string;

  private applyColor(color: string): void {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      color
    );
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.applyColor(this.setColor);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.applyColor('');
  }
}
