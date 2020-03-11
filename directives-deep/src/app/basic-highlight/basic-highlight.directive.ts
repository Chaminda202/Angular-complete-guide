import { OnInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBasicDirective]'
})
export class BasicHighlightDirective implements OnInit {

  constructor(private elemetRef: ElementRef) {
  }

  ngOnInit() {
    this.elemetRef.nativeElement.style.backgroundColor = 'green';
  }
}
