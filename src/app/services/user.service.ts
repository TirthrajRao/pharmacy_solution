import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public footerVariableSubject = new Subject();
  public changeLanguageSubject = new Subject();
  public notificationCountSubject = new Subject();
  public currentUserData = JSON.parse(localStorage.getItem('currentUser'));
  public deviceData: any = {}

  constructor(
    public http: HttpClient,
    public HTTP: HTTP,
    public platform: Platform
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.getDeviceData();
  }

  getDeviceData() {
    if (this.platform.is('android')) {
      this.deviceData['device_type'] = 'android'
      console.log("platform", 'android')
    } else if (this.platform.is('ios')) {
      this.deviceData['device_type'] = 'ios'
      console.log("platform", 'ios')
    } else {
      this.deviceData['device_type'] = 'other'
    }
    console.log("deviceData", this.deviceData)
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  footerChanges(): any {
    return this.footerVariableSubject.asObservable();
  }

  detectFooterChange(name) {
    this.footerVariableSubject.next({ "componantName": name })
  }

  languageChanges(): any {
    return this.changeLanguageSubject.asObservable();
  }

  detectLanguageChange(name) {
    this.changeLanguageSubject.next({ "language": name })
  }

  notiFicationCounts(): any {
    return this.notificationCountSubject.asObservable();
  }

  /**
  * Login User
  * @param {object} data 
  */
  login(data) {
    return new Promise((resolve, reject) => {
      if (this.platform.is('ios')) {
        console.log("login ios.......")
        this.HTTP.post(config.baseApiUrl + 'auth/login', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              localStorage.setItem('currentUser', JSON.stringify(jsonRes.data));
              this.currentUserSubject.next(jsonRes);
            }
            resolve(jsonRes);
          }).catch((err) => {
            console.log("err", err)
            reject(err);
          });
      } else {
        return this.http.post(config.baseApiUrl + 'auth/login', data).subscribe((user: any) => {
          console.log("login user=========>", user.data);
          // login successful if there's a jwt token in the response
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            this.currentUserSubject.next(user);
            resolve(user)
          }
          return user;
        }, err => {
          console.log(err);
          reject(err);
        });
      }
    })
  }

  /**
  * send deviceetoken
  */
  sendDeviceToken() {
    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUserData)
    this.deviceData['api_access_token'] = this.currentUserData.api_access_token;
    this.deviceData['device_token'] = localStorage.getItem('deviceToken');
    this.deviceData['id'] = this.currentUserData.id;
    console.log("devicedata", this.deviceData);

    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'wp-notification/update-device-token', this.deviceData).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'wp-notification/update-device-token', this.deviceData, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })
  }

  /**
  * Register user
  * @param {object} data 
  */
  registerUser(data) {
    return new Promise((resolve, reject) => {
      if (this.platform.is('ios')) {
        console.log("login ios.......")
        this.HTTP.post(config.baseApiUrl + 'auth/register', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              localStorage.setItem('currentUser', JSON.stringify(jsonRes.data));
              this.currentUserSubject.next(jsonRes);
            }
            resolve(jsonRes);
          }).catch((err) => {
            console.log("err", err)
            reject(err);
          });
      } else {
        return this.http.post(config.baseApiUrl + 'auth/register', data).subscribe((user: any) => {
          console.log("login user=========>", user.data);
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            this.currentUserSubject.next(user);
            resolve(user)
          }
          return user;
        }, err => {
          console.log(err);
          reject(err);
        });
      }
    })
  }

  /**
  * log out
  */
  logOut() {
    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    const data = {
      id: this.currentUserData.id,
      api_access_token: this.currentUserData.api_access_token
    }
    return new Promise((resolve, reject) => {
      if (this.platform.is('ios')) {
        console.log("login ios.......")
        this.HTTP.post(config.baseApiUrl + 'wp-notification/off-notification', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              localStorage.removeItem('currentUser');
              localStorage.removeItem('language');
              this.currentUserSubject.next(null);
            }
            resolve(jsonRes);
          }).catch((err) => {
            console.log("err", err)
            reject(err);
          });
      } else {
        return this.http.post(config.baseApiUrl + 'wp-notification/off-notification', data).subscribe((user: any) => {
          console.log("login user=========>", user);
          if (user) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('language');
            this.currentUserSubject.next(null);
            resolve(user)
          }
          return user;
        }, err => {
          console.log(err);
          reject(err);
        });
      }
    })

  }

  /**
  * Forgot Password
  * @param {object} data 
  */
  forgotPassword(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'auth/forgot-password', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'auth/forgot-password', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })
  }

  getUserDetail(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'auth/user-data', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'auth/user-data', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })

  }

  /**
  * reset password
  * @param {objct} data 
  */
  resetPassWord(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'auth/change-password', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'auth/change-password', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })
  }

  /**
  * Edit profile
  * @param {objct} data 
  */
  editUserProfile(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'auth/edit-user', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'auth/edit-user', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })
  }

  /**
  * Noification List
  * @param {object} data 
  */
  getNotificationList() {
    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    const data = {
      id: this.currentUserData.id,
      api_access_token: this.currentUserData.api_access_token
    }
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'wp-notification/get-notifications', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'wp-notification/get-notifications', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })
  }

  getNotificationDetail(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'wp-notification/view-notification', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'wp-notification/view-notification', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })
  }

  getNotificationCount() {
    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    const data = {
      id: this.currentUserData.id,
      api_access_token: this.currentUserData.api_access_token
    }
    return new Promise((resolve, reject) => {
      if (this.platform.is('ios')) {
        console.log("login ios.......")
        this.HTTP.post(config.baseApiUrl + 'wp-notification/unread-count', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              this.notificationCountSubject.next(jsonRes.data);
            }
            resolve(jsonRes);
          }).catch((err) => {
            console.log("err", err)
            reject(err);
          });
      } else {
        return this.http.post(config.baseApiUrl + 'wp-notification/unread-count', data).subscribe((user: any) => {
          console.log("login user=========>", user);
          if (user) {
            this.notificationCountSubject.next(user.data);
            resolve(user)
          }
          return user;
        }, err => {
          console.log(err);
          reject(err);
        });
      }
    })
  }

  deleteNotification(data) {
    this.currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    data['id'] = this.currentUserData.id;
    data['api_access_token'] = this.currentUserData.api_access_token;
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'wp-notification/delete-notification', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'wp-notification/delete-notification', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })

  }

  sendNotification() {
    let deviceToken = localStorage.getItem('deviceToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  'key=AAAAdKQjMjc:APA91bELvxjOXZJta5TykNjkSzGxzs-U5dbOEsKELFJL037zPa8VKLu6P49fap84zEmIquFQiRnN3H8yBGbXDd0vN3yO1R81EOQ9rW1k0ioqVKfNCKRS-07eovixfNuboVcGKBrCmE-C'
    });
    let options = { headers: headers };
    if (deviceToken) {
      let data = {
        "to": deviceToken,
        "notification": {
          "title": "Hi!! From Guy Park Pharmacy",
          "body": "Please visit our store for best Pharmacy Services",
          image: "https://i.ibb.co/v4k20BW/guy-park.png"
        },
        "priority": "high"
      }
      return new Promise((resolve, reject) => {
        if (!this.platform.is('ios')) {
          this.http.post('https://fcm.googleapis.com/fcm/send', data,options).subscribe((res) => {
            console.log("notification res",res)
            resolve(res)
          }, err => {
            reject(err)
          });
        } else {
          this.HTTP.post('https://fcm.googleapis.com/fcm/send', data, {}).
            then((user) => {
              const res = user.data;
              return JSON.parse(res)
            }).then((jsonRes) => {
              if (jsonRes) {
                resolve(jsonRes);
              }
            }).catch((err) => {
              reject(err);
            });
        }
      })
    }
  }
}
