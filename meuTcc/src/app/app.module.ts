import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Plugins
import { IonicStorageModule } from '@ionic/storage';

//Pages
import {LoginPageModule} from '../pages/login/login.module';
import {HomePageModule} from '../pages/home/home.module';
//Providers 
import { AuthProvider} from '../providers/auth';
import {AuthService} from '../providers/auth-service';
//Firebase Config
import { firebaseConfig } from '../config/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import 'gsap';
import { ContactProvider } from '../providers/contact/contact';
import { MedicamentoProvider } from '../providers/medicamento/medicamento';
import { AlergiaProvider } from '../providers/alergia/alergia';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    //Pages
    LoginPageModule,
    HomePageModule,
    //Others
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    AuthService,
    AuthProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactProvider,
    MedicamentoProvider,
    AlergiaProvider
  ]
})
export class AppModule {}
