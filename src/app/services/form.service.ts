import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    public http: HttpClient,
    public platform: Platform,
    public HTTP: HTTP
  ) { }

  /**
   * Add transfer form
   * @param {object} data 
   */
  addTransferForm(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'trans_pre/create', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'trans_pre/create', data, {}).
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
   * Add Refill form
   * @param {object} data
   */
  addRefillForm(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'refill_request/create', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'refill_request/create', data, {}).
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
   * Add Price check form
   * @param {object} data 
   */
  addPriceCheckForm(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'price_check/create', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'price_check/create', data, {}).
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
   * Add employment Form
   * @param {object} data 
   */
  addEmploymentForm(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'employment/create', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'employment/create', data, {}).
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
   * Add free delivery form
   * @param {object} data 
   */
  addFreeDeliveryForm(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'home_delivery/create', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'home_delivery/create', data, {}).
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
