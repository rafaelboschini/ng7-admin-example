import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { LoginModule } from 'src/app/login/login.module';
import { HomeComponent } from 'src/app/home/home/home.component';
import { PublicLayoutComponent } from 'src/app/_layouts/public-layout/public-layout.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    component: PublicLayoutComponent,
    children: [
      { path: '', loadChildren: () => LoginModule }
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
