import { Component } from '@angular/core';
import {InfoProvider} from './../../providers/info/info';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  title: string;
  form:FormGroup;
  info:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private formBuilder: FormBuilder, private provider: InfoProvider,
     private toast: ToastController
    ) {
      // maneira 1
      this.info = this.navParams.data.info || { };
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
      this.title = this.navParams.data.info ? 'Alterando Informações' : 'Novas Informações';
    }
  
    createForm() {
      this.form = this.formBuilder.group({
        key: [this.info.key],
        name: [this.info.name, Validators.required],
        rua: [this.info.rua, Validators.required],
        municipio: [this.info.municipio, Validators.required],
      });
    }
  
    onSubmit() {
      if (this.form.valid) {
        this.provider.save(this.form.value)
          .then(() => {
            this.toast.create({ message: 'Informações salva com sucesso.', duration: 3000 }).present();
            this.navCtrl.pop();
          })
          .catch((e) => {
            this.toast.create({ message: 'Erro ao salvar as informações.', duration: 3000 }).present();
            console.error(e);
          })
      }
    }
  }
  