import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { UserFormComponent } from './user-form.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeBackendProvider } from 'src/app/_helpers/fake-backend';
import { UserListComponent } from '../user-list/user-list.component';
import { UserRoutingModule } from '../user.routing.module';
import { Router } from '@angular/router';
import { UserSearchComponent } from '../shared/component/user-search/user-search.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserModule } from '../user.module';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let el: HTMLElement;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          BrowserModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule,
          UserRoutingModule,
          RouterTestingModule.withRoutes(
            [
              {path: 'user/', component: UserListComponent}
            ],
          ),
          UserModule
      ],
      providers: [fakeBackendProvider],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message when form is empty', () => {
    const compiled = fixture.debugElement.nativeElement;

    el = fixture.debugElement.query(By.css('.register-action')).nativeElement;
    el.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.userform-container .invalid-feedback')).toBeTruthy();
  });

  it('should fill all inputs with correctly data and submit form', async () => {
    const compiled = fixture.debugElement.nativeElement;

    component.userForm.controls.firstname.setValue('Michael Jackson');
    component.userForm.controls.username.setValue('michaeljackson');
    component.userForm.controls.document.setValue('000000000000');
    component.userForm.controls.profile.setValue(1);
    component.userForm.controls.password.setValue('whosbad');

    el = fixture.debugElement.query(By.css('.register-action')).nativeElement;
    el.click();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(router.url).toBe('/');
  });

});
