import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginGuard } from './guard/auth.guard';
import { HTTP } from '@ionic-native/http/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

import { AngularFireModule } from '@angular/fire';
import {
  AngularFireFunctionsModule,
  // FUNCTIONS_REGION
} from '@angular/fire/functions';
import { environment } from './../environments/environment';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';

export class MyHammerConfig extends HammerGestureConfig {

  overrides = <any>{
    // override hammerjs default configuration
    'pan': { threshold: 5 },
    'swipe': {
      velocity: 0.4,
      threshold: 20,
      direction: Hammer.DIRECTION_HORIZONTAL // /!\ ugly hack to allow swipe in all direction
    }
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    HammerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireFunctionsModule,
    IonicModule.forRoot({
      backButtonText: '',
    }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    FCM,
    LoginGuard,
    HTTP,
    Geolocation ,
    LocalNotifications,
    BackgroundMode,
    SignInWithApple,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    // { provide: FUNCTIONS_REGION, useValue: 'us-central1' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
