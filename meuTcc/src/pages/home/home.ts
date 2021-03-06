import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events,ToastController } from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import { LoginPage } from '../login/login';
//import { ContactPage } from '../contact/contact';
//import { Observable } from 'rxjs/internal/Observable';
//import { ContactProvider } from './../../providers/contact/contact';
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';
import { TextToSpeech } from '@ionic-native/text-to-speech';



declare var TimelineMax: any;
declare var Back: any;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('box1') box1;
  @ViewChild('box2') box2;
  @ViewChild('box3') box3;
  @ViewChild('box4') box4;
  @ViewChild('box5') box5;

  tl: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authService: AuthService,
    public menuCtrl: MenuController,
    public events: Events,
    private sms: SMS,
    private callSvc: CallNumber,
    private tts: TextToSpeech

  ) {
    this.tl = new TimelineMax({delay: 1});
    
        events.subscribe('menu:opened', () => {
          console.log('menu open');
        });
    
        events.subscribe('menu:closed', () => {
    
        });
      }
    
  signOut(){
    this.authService.signOut()
    .then(()=>{ 
      this.navCtrl.setRoot(LoginPage);
    }).catch((error)=>{
      console.error(error);
    });
  }
  
  newInfo(){
    this.navCtrl.push('InfohomePage');
  }
  newContato(){
    this.navCtrl.push('ContatohomePage');
  }

  newMedicamento(){
    this.navCtrl.push('MedicamentoHomePage');
  }
  newAlergia(){
    this.navCtrl.push('AlergiahomePage');
  }

  senSMS(){

    var options:{
      replaceLineBreaks:true,
      android:{
        intent : 'INTENT'
      }
    }
    this.sms.send('987436097','SOS',options)
    .then(()=>{
      this.call();
    }).catch((err)=>{
      alert(JSON.stringify(err))
    });
  }


  fala(){
    this.tts.speak('Socorro.Minha localização é')
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }
  call(){
    this.callSvc.callNumber('976467301',true)
    .then(()=>{
      this.callSvc.isCallSupported
      this.fala();
    }).catch((err)=>{
      alert(JSON.stringify(err))
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    this.tl
    .from(this.box1.nativeElement, .2, {autoAlpha: 0, ease: Back.easeOut.config(4), scale: 0.5}, "-=.15")
    .from(this.box2.nativeElement, .2, {autoAlpha: 0, ease: Back.easeOut.config(4), scale: 0.5}, "-=.14")
    .from(this.box3.nativeElement, .2, {autoAlpha: 0, ease: Back.easeOut.config(4), scale: 0.5}, "-=.13")
    .from(this.box4.nativeElement, .2, {autoAlpha: 0, ease: Back.easeOut.config(4), scale: 0.5}, "-=.12")
    .from(this.box5.nativeElement, .2, {autoAlpha: 0, ease: Back.easeOut.config(4), scale: 0.5}, "-=.11");
}
  }


