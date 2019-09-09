import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeBackendProvider } from 'src/app/_helpers/fake-backend';
import { Router } from '@angular/router';
import { UserRoutingModule } from '../user.routing.module';
import { UserFormComponent } from '../user-form/user-form.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<UserListComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          BrowserModule,
          ReactiveFormsModule,
          RouterTestingModule.withRoutes(
            [{path: 'user/new', component: UserFormComponent}]
          ),
          FormsModule,
          HttpClientModule,
          UserRoutingModule
      ],
      providers: [ fakeBackendProvider ],
      declarations: [ UserListComponent, UserFormComponent ]
    })
    .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create header elemments', async () => {
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.user-container .header .header-item').textContent).toBe('m Users ');
    expect(compiled.querySelector('.user-container .header .search-container input').getAttribute('placeholder')).toBe('Search Here');
    expect(compiled.querySelector('.user-container .header .search-container .search__button i').textContent).toBe('s');

    component.searchTerm = '';
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should test no result search', async () => {
    const compiled = fixture.debugElement.nativeElement;

    component.searchTerm = 'Eddie Murphy';
    await fixture.whenStable();
    fixture.detectChanges();
    expect(compiled.querySelector('.user-container .body-wrapper .body .empty-row div').textContent).toBe('No record found');
  });

  it('should test summary grid - plural', async () => {
    const compiled = fixture.debugElement.nativeElement;

    component.searchTerm = '';
    await fixture.whenStable();
    fixture.detectChanges();
    expect(compiled.querySelector('.user-container .body-wrapper .list-summary').textContent).toContain('records found');
  });

  it('should test summary grid - singular', async () => {
    const compiled = fixture.debugElement.nativeElement;

    component.searchTerm = 'Bill';
    await fixture.whenStable();
    fixture.detectChanges();
    expect(compiled.querySelector('.user-container .body-wrapper .list-summary').textContent).toBe('1 record found');
  });

  it('should call delete confirmation popup', async () => {
    const compiled = fixture.debugElement.nativeElement;

    component.searchTerm = 'Bill';
    await fixture.whenStable();
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('.trash-action')).nativeElement;
    el.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.user-container .modal')).toBeTruthy();
  });

  it('should confirm delete popup', async () => {
    const compiled = fixture.debugElement.nativeElement;

    component.searchTerm = 'Bill';
    await fixture.whenStable();
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('.trash-action')).nativeElement;
    el.click();
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('.success')).nativeElement;
    el.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.user-container .body-wrapper .list-summary').textContent).toBe('0 record found');
  });

  it('should cancel confirmation delete popup', async () => {
    const compiled = fixture.debugElement.nativeElement;

    component.searchTerm = 'Bill';
    await fixture.whenStable();
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('.trash-action')).nativeElement;
    el.click();
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('.error')).nativeElement;
    el.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.user-container .body-wrapper .list-summary').textContent).toBe('1 record found');
  });

  it('should redirect when add button is clicked', async () => {
    el = fixture.debugElement.query(By.css('.add-action')).nativeElement;
    el.click();

    await fixture.whenStable();

    expect(location.path()).toBe('/user/new');
  });
});
