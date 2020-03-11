import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.viewContainerRef.createEmbeddedView(this.tempateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(private tempateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }

}
