import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PublicLayoutComponent, PrivateLayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutsModule { }
