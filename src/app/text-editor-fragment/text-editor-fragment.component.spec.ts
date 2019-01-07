import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditorFragmentComponent } from './text-editor-fragment.component';

describe('TextEditorFragmentComponent', () => {
  let component: TextEditorFragmentComponent;
  let fixture: ComponentFixture<TextEditorFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEditorFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditorFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
