import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
declare const $: any;

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  language: string = "en";
  details: any = this._translate.instant("notification");
  notificationId: any;
  loading: Boolean = false;
  notificationDetail: any;
  constructor(
    private _translate: TranslateService,
    public _userService: UserService,
    public route: ActivatedRoute,
    public appComonent: AppComponent
  ) {
    
    this.route.params.subscribe((param) => {
      console.log("params",param)
      this.notificationId = param.id;
    })
    this._initialiseTranslation();

  }

  ngOnInit() {
    console.log("notification id", this.notificationId)
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
   
  }

  ionViewWillEnter() {
    this._userService.detectFooterChange('notification-detail');
    this._userService.getNotificationCount().then((res: any) => {
      console.log("res in footer", res);
    }).catch(err => {
      console.log(err)
    });
    this.getNotificationDetail();
  }

  _initialiseTranslation(): void {
    setTimeout(() => {
      this._translate.use(this.language);
      console.log(this._translate.instant("freeHome"));
      this.details = this._translate.instant("notification");

    }, 250);
  }

  getNotificationDetail() {
    const data = {
      id: this.currentUser.id,
      api_access_token: this.currentUser.api_access_token,
      notification_id: this.notificationId
    }
    this.loading = true;
    this._userService.getNotificationDetail(data).then((res: any) => {
      console.log("details", res);
      this.notificationDetail = res.data.data;
      this.loading = false;
    }).catch((err) => {
      console.log(err);
      this.loading = false;
      this.appComonent.errorAlert(err.error.message)
    })
  }

  onImageLoad() {
    $('.image').css('background', 'none')
  }
}
