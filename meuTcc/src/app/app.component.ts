import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,Events,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';


declare var TimelineMax:any;
declare var Circ:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  @ViewChild('svgOverlay') svgOverlay;
  @ViewChild('menuItem') menuItem;
  @ViewChild('close') close;
  tweenTimeLine: any;

  rootPage:any;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform,
     statusBar: StatusBar, 
     splashScreen: SplashScreen,
    afAuth: AngularFireAuth,
    public events: Events,
    public menuCtrl: MenuController) {
    
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
//Inicialização do APP
      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.tweenTimeLine = new TimelineMax({ paused: true, reversed: true });
    this.menuCtrl.swipeEnable(false);
     // used for an example of ngFor and navigation
     this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Service', component: HomePage },
      { title: 'Settings', component: HomePage },
      { title: 'About', component: HomePage }
    ];

  }
  ngAfterViewInit() {
    this.tweenTimeLine
      .to('.menu-inner', 0, {visibility:"visible", immediateRender:false}, .10, .10)
      .to(this.svgOverlay.nativeElement, 0, {attr:{fill: '#cd9800'}}, .05, .05)
      .to(this.svgOverlay.nativeElement, .4, {attr:{r: 450}, ease: Circ.easeInOut})
      .from(this.close._elementRef.nativeElement, .2, {autoAlpha: 0})
      .staggerFrom(this.menuItem.nativeElement.children, .3, { autoAlpha: 0, x: 300}, 0.02, 0.2);
  }

  menuClosed() {
    this.events.publish('menu:closed', '');
  }

  menuOpened() {
    this.events.publish('menu:opened', '');
    this.tweenTimeLine.play();
  }

  closeMenu() {
    this.tweenTimeLine.reversed() ? this.tweenTimeLine.play() : this.tweenTimeLine.reverse();

    setTimeout(() => {
      this.menuCtrl.close();
    }, 800)
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

