import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-curbside',
  templateUrl: './curbside.component.html',
  styleUrls: ['./curbside.component.scss'],
})
export class CurbsideComponent implements OnInit {

  language: string =localStorage.getItem('language');
  details: any = this._translate.instant("curbside")

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
      console.log(this._translate.instant("curbside"));
      this.details = this._translate.instant("curbside");
    }, 250);
  }

}
