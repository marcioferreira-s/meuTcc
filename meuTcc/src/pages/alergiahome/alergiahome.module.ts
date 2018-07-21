import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlergiahomePage } from './alergiahome';

@NgModule({
  declarations: [
    AlergiahomePage,
  ],
  imports: [
    IonicPageModule.forChild(AlergiahomePage),
  ],
})
export class AlergiahomePageModule {}
