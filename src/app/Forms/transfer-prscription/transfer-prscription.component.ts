import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { FormService } from '../../services/form.service';
import * as moment from 'moment';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
declare const $: any;

@Component({
  selector: 'app-transfer-prscription',
  templateUrl: './transfer-prscription.component.html',
  styleUrls: ['./transfer-prscription.component.scss'],
})
export class TransferPrscriptionComponent implements OnInit {

  curruntDate: string = new Date().toISOString();
  nextYear: any;
  transferPrescriptionForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  formDetail: any = this._translate.instant("form");
  language: string = localStorage.getItem('language');
  currentUserData = JSON.parse(localStorage.getItem('userFormData'));
  loading: Boolean = false;

  constructor(
    private _translate: TranslateService,
    public _userService: UserService,
    public _formService: FormService,
    public appComponant: AppComponent,
    public router: Router
  ) {

    this.nextYearCount();

    this.transferPrescriptionForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl('', [Validators.required]),
      date_of_birth: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required]),
      pharmacy_name: new FormControl('', [Validators.required]),
      pharmacy_number: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      refill_date: new FormControl(''),
      mad_name_1: new FormControl(''),
      mad_number_1: new FormControl(''),
      mad_name_2: new FormControl(''),
      mad_number_2: new FormControl(''),
      mad_name_3: new FormControl(''),
      mad_number_3: new FormControl(''),
      mad_name_4: new FormControl(''),
      mad_number_4: new FormControl(''),
      mad_name_5: new FormControl(''),
      mad_number_5: new FormControl(''),
      mad_name_6: new FormControl(''),
      mad_number_6: new FormControl(''),
      mad_name_7: new FormControl(''),
      mad_number_7: new FormControl(''),
      mad_name_8: new FormControl(''),
      mad_number_8: new FormControl(''),
      mad_name_9: new FormControl(''),
      mad_number_9: new FormControl(''),
      mad_name_10: new FormControl(''),
      mad_number_10: new FormControl(''),
    })
  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })

    $(".next-step").click((e) => {
      var active = $('.nav-tabs li.active');
      active.next().removeClass('disabled');
      this.nextTab(active);
    });

    $(".prev-step").click(function (e) {
      var active = $('.nav-tabs li.active');
      prevTab(active);

    });

    function prevTab(elem) {
      $(elem).prev().find('a[data-toggle="tab"]').click();
    }

    $('.nav-tabs').on('click', 'li', function () {
      $('.nav-tabs li.active').removeClass('active');
      $(this).addClass('active');
    });
  }

  nextTab(elem) {
    this.submitted = true;
    if (this.transferPrescriptionForm.invalid) {
      return
    }
    $(elem).next().find('a[data-toggle="tab"]').click();
  }

  get f() { return this.transferPrescriptionForm.controls }


  // Count next 25 year for date
  nextYearCount() {
    this.nextYear = this.curruntDate.split("-")[0];
    this.nextYear = this.nextYear++;
    this.nextYear = this.nextYear + +25;
  }

  /**
   * Add transfer form
   * @param {object} data 
   */
  addTransferPresForm(data) {
    console.log("--")
    this.submitted = true;
    data['user_id'] = this.currentUserData.id;

    data.date_of_birth = moment(data.date_of_birth).format('DD/MM/yyyy');
    if (data.refill_date) {
      data.refill_date = moment(data.refill_date).format('DD/MM/yyyy');
      data['auto_refill'] = true
    }
    console.log(data)
    if (this.transferPrescriptionForm.invalid) {
      return
    }
    this.isDisable = true;
    this.loading = true;
    console.log(data);
    this._formService.addTransferForm(data).then((res: any) => {
      console.log("transfer", res);
      this.loading = false;
      this.isDisable = false;
      this.submitted = false;
      this.transferPrescriptionForm.reset();
      this.appComponant.sucessAlert();
      this.router.navigate(['/home/home-page'])
    }).catch(err => {
      console.log("err", err);
      this.loading = false;
      this.isDisable = false;
      this.appComponant.errorAlert();
    })
  }

  /**
   * change and detect language
   */
  _initialiseTranslation(): void {
    setTimeout(() => {
      this._translate.use(this.language);
      this.formDetail = this._translate.instant("form")
    }, 250);
  }
}
