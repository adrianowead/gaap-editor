import { TextEditorFragmentComponent } from './../text-editor-fragment/text-editor-fragment.component';
import { DtoCaretPosition } from './../dto-caret-position';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ViewContainerRef, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  public content: string;
  private _linesHtml: Array<any>;
  private _linesText: Array<string>;
  private _caretPosition: DtoCaretPosition;
  private fragments: Array<TextEditorFragmentComponent>;

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

  /**
   * Ao modificar o conteúdo
   * @param event Recebe o evento nativo
   */
  public contentChange() {
    this._caretPosition = this._getCaretPosition();

    let lines: Array<string> = this._processLines(this.divContent.nativeElement.innerText);

    lines = this._stripHtml(lines);

    this._linesText = [...lines];
    this._linesHtml = [...this._addTags(lines)];

    // melhorar essa implementação, pois diversas funções serão responsabilidades de cada fragmento
    this._linesHtml.forEach((line) => {
      this.addFragment(line.text);
    });
  }

  /**
   * Processa cada uma das linhas de conteúdo
   * Atualizando elementos versionáveis já existentes ou criando novos
   */
  private _processLines(content: string): Array<any> {
    content = content.trim();
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

  /**
   * Adiciona tags necessárias para marcar os estilos
   */
  private _addTags( lines: Array<string> ): Array<any> {
    const linesEditor: Array<any> = [];

    lines.forEach((text, idx) => {
      if ( text.length > 0 ) {
        linesEditor[idx] = {
          text: text
        };
      }
    });

    return linesEditor;
  }

  private _getCaretPosition(): DtoCaretPosition {
    const selObj = window.getSelection();
    const range = selObj.getRangeAt(0);

    return {
      line: 0,
      column: range.startOffset
    };
  }

  public childFocus( index ) {
    console.log('child', index);
  }

  private addFragment( conteudo: string ) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextEditorFragmentComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this.divContent.nativeElement.appendChild(domElem);
  }
}
