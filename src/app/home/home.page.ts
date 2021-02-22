import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  menuPages: any;
  details: any;
  language: any = localStorage.getItem('language');

  constructor(
    public menu: MenuController,
    public router: Router,
    private _translate: TranslateService,
    public _userService: UserService,
    public appcomponent: AppComponent
  ) {

    this._initialiseTranslation();
    setTimeout(() => {
      this.createMenu();
    }, 300);

  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })

  }

  ionViewWillEnter() {
    this.getUserDetail();
  }

  createMenu() {
    this.menuPages = [
      {
        name: this.details.Home,
        icon: 'assets/images/black/home.svg',
        icon1: 'assets/images/white/home.svg',
        url: '/home/home-page',
        class: 'active'
      },
      {
        name: this.details.Medication,
        icon: 'assets/images/black/medicine.svg',
        icon1: 'assets/images/white/medicine.svg',
        url: '/home/service-list'
      },
      {
        name: this.details.AboutUs,
        icon: 'assets/images/black/about.svg',
        icon1: 'assets/images/white/about.svg',
        url: '/home/about-us'
      },
      {
        name: this.details.Services,
        icon: 'assets/images/black/service.svg',
        icon1: 'assets/images/white/service.svg',
        url: '/home/our-services'
      },
      {
        name: this.details.Career,
        icon: 'assets/images/black/career.svg',
        icon1: 'assets/images/white/career.svg',
        url: '/home/employment'
      },
      {
        name: this.details.HippaNotice,
        icon: 'assets/images/black/hipa notice.svg',
        icon1: 'assets/images/white/hipa notice.svg',
        url: '/home/hippa-notice'
      },
      {
        name: this.details.Notification,
        icon: 'assets/images/black/notification.png',
        icon1: 'assets/images/white/notification.png',
        url: '/home/notification'
      },
      {
        name: this.details.ContactUs,
        icon: 'assets/images/black/contact.svg',
        icon1: 'assets/images/white/contact.svg',
        url: '/home/contact-us'
      },
      {
        name: this.details.Profile,
        icon: 'assets/images/black/user.svg',
        icon1: 'assets/images/white/user.svg',
        url: '/home/profile'
      }
    ]
  }

  /**
   * Close Menu
   */
  closeMenu(index) {
    console.log(index);
    this.menuPages.map((page) => {
      page['class'] = ""
    })
    this.menu.close();
    this.menuPages[index]['class'] = "active"

  }

  /**
   * log out
   */
  logOut() {
    this._userService.logOut().then((res: any) => {
      console.log("in home page logout",res)
      this.router.navigate(['/login'])
    }).catch((err) => {
      this.appcomponent.errorAlert()
    });
  }


  _initialiseTranslation(): void {
    console.log("language", this.language)
    setTimeout(() => {
      this._translate.use(this.language);
      console.log("in home page", this._translate.instant("sidemenu"));
      this.details = this._translate.instant("sidemenu");
      this.createMenu();
    }, 250);
  }

  changeLanguage(language) {
    console.log(language);
    this.menu.close();
    this.language = language;
    this._translate.use(this.language);
    localStorage.setItem('language', this.language);
    this.details = this._translate.instant("sidemenu");
    this._userService.detectLanguageChange(this.language);
  }

  getUserDetail() {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser'))
    const data = {
      id: currentUserData.id,
      api_access_token: currentUserData.api_access_token
    }
    this._userService.getUserDetail(data).then((res: any) => {
      console.log("user details", res);
      localStorage.setItem("userFormData", JSON.stringify(res.data))
      // this.currentUserData = res;
    }).catch((err) => {
      console.log(err);
    })
  }
}
