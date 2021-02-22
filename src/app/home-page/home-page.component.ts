import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  title: string;
  description: string;
  language: string = localStorage.getItem('language');
  details: any = this._translate.instant("home")

  constructor(
    private _translate: TranslateService,
    public _userService: UserService
  ) {

    this._initialiseTranslation();
  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })

  }

  ionViewWillEnter() {
    this._userService.getNotificationCount().then((res: any) => {
      console.log("res in footer", res);
    }).catch(err => {
      console.log(err)
    });
    this._userService.detectFooterChange('home');
  }

  _initialiseTranslation(): void {
    console.log("language in hompage", this.language)
    setTimeout(() => {
      this._translate.use(this.language);
      console.log(this._translate.instant("home"));
      this.details = this._translate.instant("home");
    }, 250);
  }
}
