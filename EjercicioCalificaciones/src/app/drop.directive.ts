import { Directive, EventEmitter, HostBinding, HostListener, Output, HostBindingDecorator } from '@angular/core';

@Directive({
  selector: '[appDrop]'
})
export class DropDirective {

  constructor() { }

  @Output() onFileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') public background = '#fff';
  @HostBinding('style.opacity') public opacity = '1';


    @HostListener('dragover', ['$event']) onDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#fff'
    this.opacity = '1'
  }

  @HostListener('drop', ['$event']) public onDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    let files = e.dataTransfer.files;
    if (files.length == 1) {
      this.onFileDropped.emit(files)
    }
  }

}
