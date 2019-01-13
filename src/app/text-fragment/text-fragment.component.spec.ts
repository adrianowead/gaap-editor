import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFragmentComponent } from './text-fragment.component';

describe('TextFragmentComponent', () => {
  let component: TextFragmentComponent;
  let fixture: ComponentFixture<TextFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
