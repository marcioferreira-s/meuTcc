import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfohomePage } from './infohome';

@NgModule({
  declarations: [
    InfohomePage,
  ],
  imports: [
    IonicPageModule.forChild(InfohomePage),
  ],
})
export class InfohomePageModule {}
