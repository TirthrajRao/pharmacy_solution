import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
declare const $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  details: any = this._translate.instant("footer");
  language: string = localStorage.getItem('language');
  notificationCount:any;
  isActive:Boolean = false;
  constructor(
    public router: Router,
    public _userService: UserService,
    private _translate: TranslateService,
    public _zone:NgZone

  ) {
    this._userService.notiFicationCounts().subscribe(response => {
      this._zone.run(() => {
        console.log("notification count response",response)
        this.notificationCount = response.count;
        console.log("response of notification count =====>", this.notificationCount);
      })
    })

    this._userService.footerChanges().subscribe((res) => {
      console.log("in footer", res);
      this.addActiveClass(res.componantName);
      // $('li a').css('display','none')
    });
    this._initialiseTranslation()
  }


  ngOnInit() {
    console.log("current url", this.router.url);
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  addActiveClass(name) {
    if ($('li').hasClass('active-page')) {
      $('li').removeClass('active-page');
      $('li span').removeClass('icon-name')
      $('li a').css('display','none');
      this.isActive = false;
    }
    if (name == 'home') {
      $('.home').addClass('active-page');
      $('.home a').css('display','block');
      $('.home span').addClass('icon-name')
    } else if (name == 'services') {
      $('.services').addClass('active-page');
      $('.services a').css('display','block');
      $('.services span').addClass('icon-name')
    } else if (name == 'request') {
      $('.request').addClass('active-page');
      $('.request a').css('display','block');
      $('.request span').addClass('icon-name')
    } else if (name == 'notification' || name=='notification-detail') {
      $('.notification').addClass('active-page');
      $('.notification a').css('display','block');
      $('.notification span').addClass('icon-name');
      this.isActive = true;
    } else if (name == 'contact') {
      $('.contact').addClass('active-page');
      $('.contact a').css('display','block');
      $('.contact span').addClass('icon-name')
    }

  }

   /**
   * langugae 
   */
  _initialiseTranslation(): void {
    console.log(this.language)
    setTimeout(() => {
      this._translate.use(this.language);
      this.details = this._translate.instant("footer");
      console.log("----------",this.details)
    }, 25);
  }
}