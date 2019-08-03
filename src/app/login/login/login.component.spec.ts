import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should create form and labels', () => {
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    /** testing form and fields */
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();

    /** Testing labels */
    expect(compiled.querySelector('label[for="email"]').innerText).toBe('E-mail');
    expect(compiled.querySelector('label[for="password"]').innerText).toBe('Password');

    /** testing if have submit button */
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });
});
