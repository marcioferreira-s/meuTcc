import { Component } from '@angular/core';
import {AlergiaProvider} from './../../providers/alergia/alergia';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-alergia',
  templateUrl: 'alergia.html',
})
export class AlergiaPage {

  title: string;
  form:FormGroup;
  alergia:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private formBuilder: FormBuilder, 
     private provider: AlergiaProvider,
     private toast: ToastController) {

       // maneira 1
       this.alergia = this.navParams.data.alergia || { };
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
    this.title = this.navParams.data.alergia ? 'Alterando Alergia' : 'Novo Alergia';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.alergia.key],
      name: [this.alergia.name, Validators.required],
      tipo: [this.alergia.tipo, Validators.required],
      obs: [this.alergia.obs, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Alergia salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o Alergia.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

}
