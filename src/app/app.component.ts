import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { UserService } from './services/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as firebase from 'firebase/app';
// import * as cordova from 'com.red_folder.phonegap.plugin.backgroundservice.sample'
declare const $: any;
declare const cordova: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  language: any = localStorage.getItem('language');
  message: any;
  errMessage: any;
  currentLat: any;
  currentLng: any;
  myService;
  serviceName;
  factory;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public fcm: FCM,
    public _translate: TranslateService,
    public localNotifications: LocalNotifications,
    public _userService: UserService,
    private geolocation: Geolocation,
    private backgroundMode: BackgroundMode,
    private functions: AngularFireFunctions,
  ) {

    if (!this.language) {
      this._translate.setDefaultLang('en');
      localStorage.setItem('language', 'en');
    } else {
      this._translate.setDefaultLang(this.language)
    }

    //Exit app
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/home/home-page' || this.router.url === '/login') {
        navigator['app'].exitApp();
      }
    })

    this.initializeApp();
    this.router.navigate(['/home'])
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#1F3C92");
      setTimeout(() => {
        this.splashScreen.hide();
      }, 700);
      this.getCurrentLatLng();
      this.getNotification();
    });
  }


 
  /**
  * Get Notification
  */
  getNotification() {
    this.getToken();
    this.fcm.clearAllNotifications();
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log("reresh token", token);
    });

    this.fcm.onNotification().subscribe(data => {
      console.log("notification data", data, data.notification_id);
      if (data.wasTapped) {
        console.log("Received in background", data);
        this.router.navigateByUrl('/home/notification-detail/' + data.notification_id)
      } else {
        console.log("Received in foreground", data);
        this.getLocalNotification(data);
      };
      this.getNotificationCount();
    });
  }

  /**
  * Get LOcal NOtification when app is in foreground
  */
  getLocalNotification(data) {
    console.log("daata in local notification", data);
    this.localNotifications.schedule({
      id: data.notification_id,
      title: data.title,
      text: data.body,
      foreground: true,
      // icon: data.image,
      attachments: [data.image]
    });

  }

  /**
  * Get DeviceToken
  */
  getToken() {
    this.fcm.getToken().then(token => {
      console.log('token======>', token);
      localStorage.setItem('deviceToken', token);
    });

  }

  /**
  * get unread notification count
  */
  getNotificationCount() {
    this._userService.getNotificationCount().then((res: any) => {
    }).catch((err) => {
      console.log("err in notification count", err)
    })
  }

  /** 
  *Sucess Alert
  */
  sucessAlert(message?) {
    this.message = message;
    $('.success_alert_box').fadeIn().addClass('animate');
    $('.success_alert_box').click(function () {
      $(this).hide().removeClass('animate');
    });
    $('.success_alert_box .alert_box_content').click(function (event) {
      event.stopPropagation();
    });
  }

  /** 
  *Error Alert
  */
  errorAlert(message?) {
    this.errMessage = message
    $('.error_alert_box').fadeIn().addClass('animate');
    $('.error_alert_box').click(function () {
      $(this).hide().removeClass('animate');
    });
    $(' .error_alert_box .alert_box_content').click(function (event) {
      event.stopPropagation();
    });
  }

  getCurrentLatLng() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLat = resp.coords.latitude;
      this.currentLng = resp.coords.longitude
      console.log("current lat lng", this.currentLat, this.currentLng);
      this.getLocationDistance();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getLocationDistance() {
    // let distance = this.calculateDistance(this.currentLat, this.currentLng, 42.944587, -74.1997,"K");
    let distance = this.calculateDistance(21.8532, 70.2453, 21.8532, 70.2453, "K");

    console.log("caluculated distance", distance);
    if (distance <= 2) {
      console.log("in if");
      const data = {
        notification_id: 1,
        title: "Hi!! From Guy Park Pharmacy",
        body: "Please visit our store for best Pharmacy Services",
        image: "https://i.ibb.co/v4k20BW/guy-park.png",
        // attachments:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu_fpPmbK-bebEeX036y7frmW06amtCkG1ew&usqp=CAU'
      }
      this.getLocalNotification(data)
    }
  }

  /**
  * Calculate distance from current location
  */
  calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var radlon1 = Math.PI * lon1 / 180
    var radlon2 = Math.PI * lon2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    console.log("dist", dist)
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
  }
}

