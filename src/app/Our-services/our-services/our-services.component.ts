import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
})
export class OurServicesComponent implements OnInit {

  allServices: any = [];
  language: any = localStorage.getItem('language');
  details: any;

  constructor(
    private _translate: TranslateService,
    public _userService: UserService
  ) {
    this._initialiseTranslation();
    setTimeout(() => {
      this.createServiceList();
    }, 30);

  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })

  }

  createServiceList() {
    this.allServices = [
      {
        name: this.details.service1,
        image: 'assets/images/e-scribe.png',
        content: this.details.content1,
        url: "/home/e-scribe"
      },
      {
        name: this.details.service2,
        image: 'assets/images/speciality-packing.png',
        content: this.details.content2,
        url: "/home/speciality-packing"
      },
      {
        name: this.details.service3,
        image: 'assets/images/curbside.png',
        content: this.details.content3,
        url: "/home/curb-side"
      },
      {
        name: this.details.service4,
        image: 'assets/images/free-home.png',
        content: this.details.content4,
        url: "/home/free-home-delivery"
      },
      {
        name: this.details.service5,
        image: 'assets/images/generic-drug.png',
        content: this.details.content5,
        url: "/home/generic-drug"
      },
      {
        name: this.details.service6,
        image: 'assets/images/major.png',
        content: this.details.content6,
        url: "/home/major-insurance"
      }
    ]
  }

  ionViewWillEnter() {
    this._userService.getNotificationCount().then((res: any) => {
      console.log("res in footer", res);
    }).catch(err => {
      console.log(err)
    });
    this._userService.detectFooterChange('services');
  }

  /**
   * langugae 
   */
  _initialiseTranslation(): void {
    setTimeout(() => {
      this._translate.use(this.language);
      this.details = this._translate.instant("services");
      console.log(this.details)
      this.createServiceList();
    }, 25);
  }
}
