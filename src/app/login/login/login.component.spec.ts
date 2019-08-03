import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
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
    expect(compiled.querySelector('input[type="username"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();

    /** Testing labels */
    expect(compiled.querySelector('label[for="username"]').innerText).toBe('E-mail');
    expect(compiled.querySelector('label[for="password"]').innerText).toBe('Password');

    /** testing if have submit button */
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });

  it('testing form invalid', async () => {
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.invalid-feedback--email'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.invalid-feedback--password'))).toBeNull();

    component.loginForm.controls.username.setValue(null);
    component.loginForm.controls.password.setValue(null);

    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(component.submitted).toBeTruthy();
    expect(component.loginForm.controls.username.errors).toEqual({ required: true });
    expect(component.loginForm.controls.password.errors).toEqual({ required: true });

    const usernameErrdiv = compiled.querySelector('.invalid-feedback__username');
    const passwordErrdiv = compiled.querySelector('.invalid-feedback_password');

    expect(usernameErrdiv).toBeTruthy();
    expect(usernameErrdiv.innerText).toEqual('You forgot the e-mail');

    expect(passwordErrdiv).toBeTruthy();
    expect(passwordErrdiv.innerText).toEqual('You forgot the password');

    expect(component.loginForm.valid).toBeFalsy();
  });

});
