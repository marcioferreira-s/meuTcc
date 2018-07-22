import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import { AlergiaProvider} from './../../providers/alergia/alergia';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-alergiahome',
  templateUrl: 'alergiahome.html',
})
export class AlergiahomePage {

  alergias: Observable<any>;

  constructor(public navCtrl: NavController, 
    private provider: AlergiaProvider,
    private toast: ToastController) {

      this.alergias = this.provider.getAll();
  }

  newAlergia() {
    this.navCtrl.push('AlergiaPage');
  }

  editAlergia(alergia: any) {
    // Maneira 1
    this.navCtrl.push('AlergiaPage', { alergia: alergia });

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  removeAlergia(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Informação sobre Alergia removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover Informação sobre Alergia.', duration: 3000 }).present();
        });
    }
  }

}
