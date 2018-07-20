import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicamentoHomePage } from './medicamentohome';

@NgModule({
  declarations: [
    MedicamentoHomePage,
  ],
  imports: [
    IonicPageModule.forChild(MedicamentoHomePage),
  ],
})
export class MedicamentoHomePageModule {}
