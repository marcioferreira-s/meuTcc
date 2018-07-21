import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import {MedicamentoProvider} from './../../providers/medicamento/medicamento';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-medicamentohome',
  templateUrl: 'medicamentohome.html',
})
export class MedicamentoHomePage { 
  
  medicamentos: Observable<any>;

  constructor(public navCtrl: NavController,
     private provider: MedicamentoProvider,
    private toast: ToastController) {

    this.medicamentos = this.provider.getAll();
  }

  newMedicamento() {
    this.navCtrl.push('MedicamentoPage');
  }

  editMedicamento(medicamento: any) {
    // Maneira 1
    this.navCtrl.push('MedicamentoPage', { medicamento: medicamento });

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  removeMedicamento(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Medicamento removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o medicamento.', duration: 3000 }).present();
        });
    }
  }
}