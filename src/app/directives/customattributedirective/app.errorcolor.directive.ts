import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[CheckForError]',
})
export class ErrorColorDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.formControl = null;
  }

  @Input('CheckForError') formControl: any;

  private applyBorderColor(color: string): void {
    this.renderer.setStyle(
      this.element.nativeElement,
      'border',
      '1px solid ' + color
    );
  }

  @HostListener('blur')
  onBlur(): void {
    if (this.formControl?.invalid) {
      this.applyBorderColor('#f44336');
    } else {
      this.applyBorderColor('');
    }
  }
}
