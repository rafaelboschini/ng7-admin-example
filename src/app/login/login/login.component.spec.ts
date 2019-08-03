import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form and labels', () => {
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    /** testing form and fields */
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();
    expect(compiled.querySelector('label[for="username"]')).toBeTruthy();
    
    /** Testing labels */
    expect(compiled.querySelector('label[for="username"]').textContent).toBe('E-mail');
    expect(compiled.querySelector('label[for="password"]').textContent).toBe('Password');

    /** testing if have submit button */
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });
});
