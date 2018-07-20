import { Component } from '@angular/core';
import {MedicamentoProvider} from './../../providers/medicamento/medicamento';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-medicamento',
  templateUrl: 'medicamento.html',

})
export class MedicamentoPage {

  title: string;
  form:FormGroup;
  medicamento:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private formBuilder: FormBuilder, private provider: MedicamentoProvider,
     private toast: ToastController
    ) {
      // maneira 1
      this.medicamento = this.navParams.data.medicamento || { };
      this.createForm();
  
      // // maneira 2
      // this.contact = { };
      // this.createForm();
  
      // if (this.navParams.data.key) {
      //   const subscribe = this.provider.get(this.navParams.data.key).subscribe((c: any) => {
      //     subscribe.unsubscribe();
  
      //     this.contact = c;
      //     this.createForm();
      //   })
      // }
  
      this.setupPageTitle();
    }
  
    private setupPageTitle() {
      this.title = this.navParams.data.medicamento ? 'Alterando medicamento' : 'Novo medicamento';
    }
  
    createForm() {
      this.form = this.formBuilder.group({
        key: [this.medicamento.key],
        name: [this.medicamento.name, Validators.required],
        dose: [this.medicamento.dose, Validators.required],
        horario: [this.medicamento.horario, Validators.required],
      });
    }
  
    onSubmit() {
      if (this.form.valid) {
        this.provider.save(this.form.value)
          .then(() => {
            this.toast.create({ message: 'Medicamento salvo com sucesso.', duration: 3000 }).present();
            this.navCtrl.pop();
          })
          .catch((e) => {
            this.toast.create({ message: 'Erro ao salvar o medicamento.', duration: 3000 }).present();
            console.error(e);
          })
      }
    }
  }
  