import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { LoginModule } from 'src/app/login/login.module';
import { HomeModule } from 'src/app/home/home.module';
import { PublicLayoutComponent } from 'src/app/_layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from 'src/app/_layouts/private-layout/private-layout.component';
import { UserModule } from 'src/app/user/user.module';

const routes: Routes = [
  {
    path: 'login',
    component: PublicLayoutComponent,
    children: [
      { path: '', loadChildren: () => LoginModule }
    ]
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      { path: '', loadChildren: () => HomeModule, canActivate: [AuthGuard] },
      { path: 'user', loadChildren: () => UserModule, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
