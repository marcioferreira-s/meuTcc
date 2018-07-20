import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { trigger, style, animate, transition } from '@angular/animations';
import {AuthProvider} from '../../providers/auth';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service';
import { ToastController } from 'ionic-angular';
import { User } from '../../providers/user';
import { HomePage } from '../home/home';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
    trigger(
      'login', [
        transition(':enter', [
          style({
            opacity: 0
          }),
          animate("1s ease-in-out", style({
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            opacity: 0
          })
        ])
      ],
    ),
    trigger(
      'registro', [
        transition(':enter', [
          style({
            opacity: 0
          }),
          animate("1s ease-in-out", style({
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            opacity: 0
          })
        ])
      ],
    ),
  ]
})
export class LoginPage {
  user : User = new User(); 
  @ViewChild('form') form: NgForm;
  login=true;
  register=false;
  loginForm ={
    email:'',
    password:''
  }
  registerForm ={
    email:'',
    password:'',
    name:''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider:AuthProvider,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private authService: AuthService,
    private toastCtrl: ToastController
) {
  }
//Exibir form de Registro

exibirRegistrar(){
  this.login=false;
  this.register=true;
}


exibirLogin(){
  this.login=true;
  this.register=false;
  
}

signIn(){

  if(this.form.form.valid){

    this.authService.singIn(this.user)
    .then(()=>{
      this.navCtrl.setRoot(HomePage);
    }).catch((error: any) => {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
      if (error.code == 'auth/invalid-email') {
        toast.setMessage('O e-mail digitado não é valido.');
      } else if (error.code == 'auth/user-disabled') {
        toast.setMessage('O usuário está desativado.');
      } else if (error.code == 'auth/user-not-found') {
        toast.setMessage('O usuário não foi encontrado.');
      } else if (error.code == 'auth/wrong-password') {
        toast.setMessage('A senha digitada não é valida.');
      }
      toast.present();
    });
  }
}
criarNovaConta2(){
  if(this.form.form.valid){
    let toast = this.toastCtrl.create({
      duration:5000,
      position:'top'});
      toast.setMessage('teste');
      toast.present();
    this.authService.createUser(this.user)
    .then((user: any)=>{
    
      toast.setMessage('Usuário criado com sucesso');
      toast.present();
      this.navCtrl.setRoot(HomePage);
    var user2 =this.authService.currentUser();
     
    if (user2 != null) {
      console.log(user2);
        
    user2.sendEmailVerification().then(function() {
      console.log("Entrou para enviar o email");
    }).catch(function(error) {
      console.log(error);
    });
    }
    }).catch((error: any) => {
      if (error.code  == 'auth/email-already-in-use') {
        toast.setMessage('O e-mail digitado já está em uso.');
      } else if (error.code  == 'auth/invalid-email') {
        toast.setMessage('O e-mail digitado não é valido.');
      } else if (error.code  == 'auth/operation-not-allowed') {
        toast.setMessage('Não está habilitado criar usuários.');
      } else if (error.code  == 'auth/weak-password') {
        toast.setMessage('A senha digitada é muito fraca.');
      }
      toast.present();
    });
  }

}

  ionViewDidLoad() {
    
  }

}
