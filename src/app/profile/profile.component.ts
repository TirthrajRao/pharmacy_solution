import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AppComponent } from '../app.component';
import { TranslateService } from '@ngx-translate/core';
declare const $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData;
  editProfileForm: FormGroup;
  resetPswForm: FormGroup;
  submitted: boolean = true;
  submitted1: boolean = false;
  isDisable: Boolean = false;
  match = false;
  loading: Boolean = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  language: string = localStorage.getItem('language');
  formDetails: any = this._translate.instant("form");

  constructor(
    public _userService: UserService,
    public appcomponent: AppComponent,
    private _translate: TranslateService,
  ) {
    this.editProfileForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
    });

    this.resetPswForm = new FormGroup({
      old_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
      conform_password: new FormControl('', [Validators.required])
    })

    this._initialiseTranslation()

  }
  get f() { return this.editProfileForm.controls; }
  get f1() { return this.resetPswForm.controls; }


  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  ionViewWillEnter() {
    this.getUserProfile();
  }

  /**
   * get user profile
   */
  getUserProfile() {
    this.loading = true;
    const obj = {
      id: this.currentUser.id,
      api_access_token: this.currentUser.api_access_token
    }
    this._userService.getUserDetail(obj).then((res: any) => {
      console.log("profile", res);
      this.userData = res.data;
      this.loading = false;
    }).catch((err) => {
      console.log("errrrr",err);
      this.loading = false;
      this.isDisable = false;
      this.appcomponent.errorAlert(err.error.message);
    })
  }

  /**
   * Open Reset password modal
   */
  openRedetPswModal() {
    $('#reset-password-modal').fadeIn();
    $('#reset-password-modal .modal_body').click(function (event) {
      event.stopPropagation();
    });
    $('#reset-password-modal').click(() => {
      $('#reset-password-modal').fadeOut();
      this.submitted1 = false;
    });
  }

  /**
   * Compare password
   * @param form
   */
  comparePassword(form) {
    const message = document.getElementById('message');
    if (form.value.new_password === form.value.conform_password) {
      this.match = true;
      message.innerHTML = "Password matched!"
    } else {
      this.match = false;
      message.innerHTML = "Password not matched"
    }
  }

  /**
   * Reset Password
   * @param {Object} data
   */
  resetPassWord(data) {
    console.log(data);
    this.submitted1 = true;
    if (this.resetPswForm.invalid) {
      return
    }
    this.isDisable = true;
    this.loading = true;
    delete data.conform_password;
    data['id'] = this.currentUser.id;
    data['api_access_token'] = this.currentUser.api_access_token;
    console.log(data);
    this._userService.resetPassWord(data).then((res: any) => {
      console.log("res of reset psw", res);
      $('#reset-password-modal').fadeOut();
      this.isDisable = false;
      this.loading = false;
      this.resetPswForm.reset();
      this.submitted1 = false;
      this.appcomponent.sucessAlert("Password Reset Successful")
    }).catch((err) => {
      console.log("err", err);
      this.isDisable = false;
      this.loading = false;
      this.appcomponent.errorAlert(err.error.message);
    })
  }

  /**
   * Edit user Profile
   * @param {object} data
   */
  editUserProfile(data) {
    console.log("data", data);
    this.submitted = true;
    if (this.editProfileForm.invalid) {
      return;
    }
    this.isDisable = true;
    this.loading = true;
    data['id'] = this.currentUser.id;
    data['api_access_token'] = this.currentUser.api_access_token;
    console.log("after valid", data);
    this._userService.editUserProfile(data).then((res: any) => {
      console.log("res of edit profile", res);
      this.userData = res.data;
      this.isDisable = false;
      this.loading = false;
      this.appcomponent.sucessAlert("Update Successful");
    }).catch((err) => {
      console.log("err in edit profile", err);
      this.isDisable = false;
      this.loading = false;
      this.appcomponent.errorAlert(err.error.message);
    })
  }

  /**
  * language change
  */
  _initialiseTranslation(): void {
    setTimeout(() => {
      this._translate.use(this.language);
      this.formDetails = this._translate.instant("form");
    }, 250);
  }
}
