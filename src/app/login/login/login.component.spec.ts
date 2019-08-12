import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeBackendProvider } from 'src/app/_helpers/fake-backend';
import { delay } from 'rxjs/operators';
import { LayoutsModule } from 'src/app/_layouts/layouts.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;
  let originalTimeout;

  beforeEach(async(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        LayoutsModule
      ],
      providers: [fakeBackendProvider],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
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

  it('should be form valid', async () => {
    fixture.detectChanges();

    component.loginForm.controls.username.setValue('bill@holywood.com');
    component.loginForm.controls.password.setValue('bil123');

    expect(component.loginForm.valid).toBeTruthy();

    expect(fixture.debugElement.query(By.css('.invalid-feedback--email'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.invalid-feedback--password'))).toBeNull();
  });

  it('testing password invalid validation', async () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    component.loginForm.controls.username.setValue('leslie.nielsen@holywood.com');
    component.loginForm.controls.password.setValue('3313');

    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();

    await fixture.whenStable();
    fixture.detectChanges();

    const passwordMsgdiv = compiled.querySelector('.invalid-feedback_msg');
    expect(passwordMsgdiv).toBeTruthy();
    expect(passwordMsgdiv.textContent).toEqual('Username or password is incorrect');
  });

});
