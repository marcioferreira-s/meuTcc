import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import {InfoProvider} from './../../providers/info/info';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-infohome',
  templateUrl: 'infohome.html',
})
export class InfohomePage {

  infos: Observable<any>;

constructor(public navCtrl: NavController,
     private provider: InfoProvider,
    private toast: ToastController) {
 
    this.infos = this.provider.getAll();
  }

  newInfo() {
    this.navCtrl.push('InfoPage');
  }

  editInfo(info: any) {
    // Maneira 1
    this.navCtrl.push('InfoPage', { info: info });

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  removeInfo(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Informação removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover a informação.', duration: 3000 }).present();
        });
    }
  }
}