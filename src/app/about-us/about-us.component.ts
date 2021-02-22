import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {

  language: string = localStorage.getItem('language');
  details: any = this._translate.instant("about")

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

  _initialiseTranslation(): void {
    setTimeout(() => {
      this._translate.use(this.language);
      console.log(this._translate.instant("about"));
      this.details = this._translate.instant("about");
    }, 250);
  }

}
