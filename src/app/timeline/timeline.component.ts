import { TextFragmentComponent } from './../text-fragment/text-fragment.component';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { Injector, EmbeddedViewRef } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @ViewChild('timeline') timeline: ElementRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.addFragment('teste', 0);
      this.addFragment('teste', 1);
      this.addFragment('teste', 2);
      this.addFragment('teste', 3);
      this.addFragment('teste', 4);
      this.addFragment('teste', 5);
      this.addFragment('teste', 6);
      this.addFragment('teste', 7);
      this.addFragment('teste', 8);
      this.addFragment('teste', 9);
      this.addFragment('teste', 10);
      this.addFragment('teste', 11);
      this.addFragment('teste', 12);
      this.addFragment('teste', 13);
      this.addFragment('teste', 14);
      this.addFragment('teste', 15);
      this.addFragment('teste', 16);
    }, 1000);
  }

  private addFragment(conteudo: string, index: number) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextFragmentComponent);
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.conteudo = conteudo;
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    if (index === 0) {
      this.timeline.nativeElement.innerHTML = '';
    }

    this.timeline.nativeElement.appendChild(domElem);
  }

}
