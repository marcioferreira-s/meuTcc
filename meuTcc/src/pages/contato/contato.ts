import { Component } from '@angular/core';
import {ContactProvider} from './../../providers/contact/contact';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})
export class ContatoPage {

  title: string;
  form:FormGroup;
  contato:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ContactProvider,
    private toast: ToastController
  ) {

  // maneira 1
  this.contato = this.navParams.data.contato || { };
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
    this.title = this.navParams.data.contato ? 'Alterando contato' : 'Novo contato';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.contato.key],
      name: [this.contato.name, Validators.required],
      tel: [this.contato.tel, Validators.required],
     
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Contato salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o Contato.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }
 

}
