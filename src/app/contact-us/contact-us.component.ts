import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {

  language: string = localStorage.getItem('language');
  details: any = this._translate.instant("contact")
  formDetail: any = this._translate.instant("form")
 
  
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

  ionViewWillEnter(){
    this._userService.detectFooterChange('contact');
  }

  /**
   * Detect and change language
   */
  _initialiseTranslation(): void {
    setTimeout(() => {
      this._translate.use(this.language);
      console.log(this._translate.instant("contact"));
      this.details = this._translate.instant("contact");
      this.formDetail = this._translate.instant("form")
    }, 250);
  }

 

}
