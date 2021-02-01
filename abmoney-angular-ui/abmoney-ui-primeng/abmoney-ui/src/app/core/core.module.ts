import { NavComponent } from './template/nav/nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule],
  exports: [NavComponent],
})
export class CoreModule {}
