import { DtoCaretPosition } from './../dto-caret-position';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  public content: string;
  private _linesHtml: Array<string>;
  private _linesText: Array<string>;
  private _caretPosition: DtoCaretPosition;

  @ViewChild('divContent') divContent: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Ao modificar o conteúdo
   * @param event Recebe o evento nativo
   */
  public contentChange() {
    let lines: Array<string> = this._processLines(this.divContent.nativeElement.innerText);

    lines = this._stripHtml(lines);

    this._caretPosition = this._detectChange(this._linesText, lines);

    this._linesText = [...lines];
    this._linesHtml = [...this._addTags(lines)];

    this.divContent.nativeElement.innerHTML = this._linesHtml;

    console.log( this._caretPosition );
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
  private _addTags( lines: Array<string> ): Array<string> {
    // paragrafos
    lines.forEach((text, idx) => {
      if ( text.length > 0 ) {
        lines[idx] = `<p>${text}<p>`;
      }
    });

    return lines;
  }

  private _getCaretCharacterOffsetWithin(element: { ownerDocument: any; document: any; }) {
    let caretOffset = 0;
    const doc = element.ownerDocument || element.document;
    const win = doc.defaultView || doc.parentWindow;
    let sel: { rangeCount: number; type: string; createRange: () => void; };

    if (typeof win.getSelection !== 'undefined') {
      sel = win.getSelection();

      if (sel.rangeCount > 0) {
        const range = win.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type !== 'Control') {
      const textRange = sel.createRange();
      const preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint('EndToEnd', textRange);
      caretOffset = preCaretTextRange.text.length;
    }

    return caretOffset;
  }

  private _getCaretPosition() {
    if (window.getSelection && window.getSelection().getRangeAt) {
      const range = window.getSelection().getRangeAt(0);
      const selectedObj = window.getSelection();
      let rangeCount = 0;
      const childNodes = selectedObj.anchorNode.parentNode.childNodes;

      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i] === selectedObj.anchorNode) {
          break;
        }
        if (childNodes[i].outerHTML) {
          rangeCount += childNodes[i].outerHTML.length;
        } else if (childNodes[i].nodeType === 3) {
          rangeCount += childNodes[i].textContent.length;
        }
      }
      return range.startOffset + rangeCount;
    }
    return -1;
  }

  private _setCaretPosition( element: any, position: any ) {
    const el = element;
    const range = document.createRange();
    const sel = window.getSelection();

    range.setStart(el, position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  private _detectChange(lines1: Array<string>, lines2: Array<string> ): DtoCaretPosition {
    const big: Array<string> = lines1 && lines1.length > lines2.length ? lines1 : lines2;
    const small: Array<string> = lines1 && lines1.length > lines2.length ? lines2 : lines1;

    const position = new DtoCaretPosition;

    big.forEach((text, linePos) => {
      if (small) {
        if (text !== small[linePos]) {
          const rev1 = text.split('').reverse();
          const rev2 = small[linePos].split('').reverse();

          rev1.forEach((t, columnPos) => {
            if (t !== rev2[columnPos]) {
              position.line = linePos;
              position.column = columnPos;
            }
          });
        }
      }
    });

    return position;
  }
}
