import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import {ContactProvider} from './../../providers/contact/contact';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-contatohome',
  templateUrl: 'contatohome.html',
})
export class ContatohomePage {

  contatos: Observable<any>;
  constructor(public navCtrl: NavController,
    private provider: ContactProvider,
     public navParams: NavParams,
     private toast: ToastController
    ) {
      this.contatos = this.provider.getAll();
  }


  newContato() {
    this.navCtrl.push('ContatoPage');
  }

  editContato(contato: any) {
    // Maneira 1
    this.navCtrl.push('ContatoPage', { contato: contato });

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  removeContato(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o Contato.', duration: 3000 }).present();
        });
    }
  }

}
