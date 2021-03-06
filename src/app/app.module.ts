import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './_core/app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { environment } from '../environments/environment';
import { HttpRequestInterceptor } from './_helpers/http-interceptor';
import { LayoutsModule } from 'src/app/_layouts/layouts.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    LayoutsModule,
    LoginModule,
    HomeModule,
    UserModule,
  ],
  providers: [
    (environment.production ? { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true } : fakeBackendProvider),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
