import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private storage: Storage,afAuth: AngularFireAuth) {
    
      const authObserver = afAuth.authState.subscribe(user =>{
        console.log(user);
        if(user){
          this.rootPage = HomePage;
          authObserver.unsubscribe();
        }else{
          this.rootPage = LoginPage;
          authObserver.unsubscribe();
        }
      });
/*     platform.ready().then(() => {
      //Decidir page
      this.storage.get('usuario')
      .then((usuario)=>{
        console.log(usuario);
        if(usuario){
          this.rootPage = 'HomePage';

        }else{
          this.rootPage = 'LoginPage';
        }
      }) */
      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

