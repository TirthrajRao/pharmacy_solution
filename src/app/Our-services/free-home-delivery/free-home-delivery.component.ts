import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { FormService } from '../../services/form.service';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-free-home-delivery',
  templateUrl: './free-home-delivery.component.html',
  styleUrls: ['./free-home-delivery.component.scss'],
})
export class FreeHomeDeliveryComponent implements OnInit {

  freeDeliveryForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  loading: Boolean = false;
  language: string = localStorage.getItem('language');
  details: any = this._translate.instant("freeHome")
  formDetail: any = this._translate.instant("form");
  currentUserData = JSON.parse(localStorage.getItem('userFormData'));

  constructor(
    private _translate: TranslateService,
    public _userService: UserService,
    public _formService: FormService,
    public appComponant:AppComponent,
    public router:Router
  ) {
    this.freeDeliveryForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl('', [Validators.required]),
      free_delivery: new FormControl('false'),
      notify: new FormControl(this.formDetail.option1),
    })
    this._initialiseTranslation();
  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  get f() { return this.freeDeliveryForm.controls }

  /**
   * Add Free home delivery form
   * @param {object} data 
   */
  addFreeDeliveryForm(data) {
    this.submitted = true;
    data['user_id'] = this.currentUserData.id
    if (this.freeDeliveryForm.invalid) {
      return
    }
    console.log(data);
    this.isDisable = true;
    this.loading = true;
    this._formService.addFreeDeliveryForm(data).then((res: any) => {
      console.log("free delivery", res);
      this.loading = false;
      this.isDisable = false;
      this.submitted = false;
      this.freeDeliveryForm.reset();
      this.appComponant.sucessAlert();
      this.router.navigate(['/home/home-page'])
    }).catch(err => {
      console.log("err", err);
      this.loading = false;
      this.isDisable = false;
      this.appComponant.errorAlert();
    })
  }

  _initialiseTranslation(): void {
    setTimeout(() => {
      this._translate.use(this.language);
      console.log(this._translate.instant("freeHome"));
      this.details = this._translate.instant("freeHome");
      this.formDetail = this._translate.instant("form")

    }, 250);
  }
}
