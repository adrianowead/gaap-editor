import { TextEditorFragmentComponent } from './../text-editor-fragment/text-editor-fragment.component';
import { DtoCaretPosition } from './../dto-caret-position';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewContainerRef, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef, ComponentRef } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  public content: string;
  private _linesText: Array<string>;
  private _fragments: Array<any> = [];

  @ViewChild('divContent') divContent: ElementRef;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  ngOnInit() {
    //
  }

  onAfterViewChecked() {
    // ao iniciar, já adicionar um fragmento, para não permitir que a div trabalhe puramente com o text
    setTimeout(() => {
      this.addFragment('a', 0);
    }, 1000);
  }

  /**
   * Ao modificar o conteúdo
   * @param event Recebe o evento nativo
   */
  public contentChange() {
    let linesHTML: Array<string> = this._processLines(this.divContent.nativeElement.innerHTML);

    // não processar fragmentos já existentes
    // pois isso é responsabilidade do elemento
    // nese nível é apenas feito o processamento global e de novos itens

    linesHTML = this._stripFragment(linesHTML);
    linesHTML = this._stripHtml(linesHTML);

    console.log(linesHTML);

    this._linesText = [...linesHTML];

    // melhorar essa implementação, pois diversas funções serão responsabilidades de cada fragmento
    this._linesText.forEach((line, idx) => {
      this.addFragment(line, idx);
    });
  }

  /**
   * Processa cada uma das linhas de conteúdo
   * Atualizando elementos versionáveis já existentes ou criando novos
   */
  private _processLines(content: string): Array<any> {
    // content = content.trim();
    let lines = content.split('\n');

    lines = this._trimDoubleSpacesAndMultipleEmptyNewLines(lines);

    return lines;
  }

  /**
   * Remove espaços duplos e quebra de linha dupla e vazia
   */
  private _trimDoubleSpacesAndMultipleEmptyNewLines( lines: Array<string> ): Array<string> {
    let beforeEmpty: Boolean = false;

    lines.forEach((text, idx) => {
      lines[idx] = text.trim().replace(/\s+/g, ' ');

      if (text.length === 0 && (beforeEmpty || !lines[idx - 1])) {
        delete lines[idx];
        beforeEmpty = false;
      } else {
        beforeEmpty = text.length === 0;
      }
    });

    return lines;
  }

  /**
   * Elimina todos os elementos de fragmento já existentes
   */
  private _stripFragment(lines: Array<string>): Array<string> {
    lines.forEach((text, idx) => {
      lines[idx] = text.replace(/<\/?app-text-editor-fragment>/g, '');
    });

    lines = this._trimDoubleSpacesAndMultipleEmptyNewLines(lines);

    return lines;
  }

  /**
   * Elimita todo o html e deixa apenas o texto puro
   */
  private _stripHtml( lines: Array<string> ): Array<string> {

    lines.forEach((text, idx) => {
      const tmpDiv = document.createElement('div');
      tmpDiv.innerHTML = text;

      lines[idx] = tmpDiv.innerText;
    });

    lines = this._trimDoubleSpacesAndMultipleEmptyNewLines(lines);

    return lines;
  }

  private _getCaretPosition(): DtoCaretPosition {
    const selObj = window.getSelection();
    const range = selObj.getRangeAt(0);

    return {
      line: 0,
      column: range.startOffset
    };
  }

  private addFragment( conteudo: string, index: number ) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextEditorFragmentComponent);
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.conteudo = conteudo;
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    console.log(index);

    this._fragments[index] = componentRef;
    this.divContent.nativeElement.innerHTML = '';

    this.divContent.nativeElement.appendChild(domElem);
  }
}
