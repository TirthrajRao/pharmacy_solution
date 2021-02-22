import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';
declare const $: any;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notificationList: any = [];
  colors = ['first', 'second', 'third', 'fourth'];
  lastImage: any;
  language: string = "en";
  details: any = this._translate.instant("notification");
  loading: Boolean = false;

  constructor(
    private _translate: TranslateService,
    public _userService: UserService,
    public appComonent: AppComponent
  ) {
    // this.notificationList = [
    //   {
    //     title: "We Offer free Delivery On Purchase of 100$ Drugs & Medicine Dose.",
    //     message: "Cashout For 100$ cashback worth coupons Cashout For 100$ cashback worth coupons"
    //   },
    //   {
    //     title: "80% Discount on Generic Products",
    //     message: "Grab The Discount Before goes away."
    //   },
    //   {
    //     title: "We Offer free Delivery On Purchase of 100$ Drugs & Medicine Dose.",
    //     message: "Cashout For 100$ cashback worth coupons Cashout For 100$ cashback worth coupons"
    //   },
    //   {
    //     title: "80% Discount on Generic Products",
    //     message: "Grab The Discount Before goes away."
    //   },
    //   {
    //     title: "We Offer free Delivery On Purchase of 100$ Drugs & Medicine Dose.",
    //     message: "Cashout For 100$ cashback worth coupons Cashout For 100$ cashback worth coupons"
    //   },
    //   {
    //     title: "80% Discount on Generic Products",
    //     message: "Grab The Discount Before goes away."
    //   },
    //   {
    //     title: "We Offer free Delivery On Purchase of 100$ Drugs & Medicine Dose.",
    //     message: "Cashout For 100$ cashback worth coupons Cashout For 100$ cashback worth coupons"
    //   },
    //   {
    //     title: "80% Discount on Generic Products",
    //     message: "Grab The Discount Before goes away."
    //   },
    //   {
    //     title: "We Offer free Delivery On Purchase of 100$ Drugs & Medicine Dose.",
    //     message: "Cashout For 100$ cashback worth coupons Cashout For 100$ cashback worth coupons"
    //   },
    //   {
    //     title: "80% Discount on Generic Products",
    //     message: "Grab The Discount Before goes away."
    //   },
    // ]
  }

  ngOnInit() {

    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
    this.getNotificationList();

  }

  ionViewWillEnter() {
    this._userService.detectFooterChange('notification');
    // this.getNotificationList();
  }

  _initialiseTranslation(): void {
    setTimeout(() => {
      this._translate.use(this.language);
      console.log(this._translate.instant("freeHome"));
      this.details = this._translate.instant("notification");

    }, 250);
  }

  /**
   * Generate border color
   */
  generateBorder() {
    this.notificationList.map((notification, index) => {
      var rand: any = this.colors[Math.floor(Math.random() * this.colors.length)];
      rand = index % this.colors.length;
      this.lastImage = rand;
      notification['color'] = this.colors[rand];
      return notification;
    });
  }

  /**
   * get Notification List
   */
  getNotificationList() {
    this.loading = true;
    this._userService.getNotificationList().then((res: any) => {
      console.log("notificationlist", res);
      this.notificationList = res.data;
      this.generateBorder();
      this.loading = false;
    }).catch((err) => {
      console.log(err);
      this.loading = false;
      this.appComonent.errorAlert(err.error.message)
    })
  }
  onImageLoad(index) {
    $('.image-' + index).css('background', 'none')
  }

  /**
 * swipe right to delete 
 */
  swipeEvent(e, notificationId, index) {
    console.log(e, notificationId);
    if (e.direction == 2) {
      console.log("in if");
      $('.notification-' + index).addClass('rotate-left');
      this.deleteNotification(notificationId, index);
    }
  }

  /**
  * Delete Notification
  * @param {number} id 
  */
  deleteNotification(id, index) {
    // this.loading = true;
    console.log(id);
    const obj = {
      notification_id: id,
    }
    this._userService.deleteNotification(obj).then((res: any) => {
      console.log(res);
      this.notificationList.splice(index, 1)
    }).catch(err => {
      console.log(err);
      this.appComonent.errorAlert();
    })
  }
}
