import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { FormService } from '../../services/form.service';
import * as moment from 'moment';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { DatePipe } from '@angular/common';
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

  formData: any;
  comments: any;
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  newComment: any = '';
  constructor(
    private _translate: TranslateService,
    public _userService: UserService,
    public _formService: FormService,
    public appComponant: AppComponent,
    public router: Router,
    public route: ActivatedRoute,
    private datePipe: DatePipe
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

    this.route.queryParams.subscribe((params) => {
      if (params.form_data) {


        this.formData = JSON.parse(params.form_data);
        console.log(this.formData);
        this.getComments();
        this.transferPrescriptionForm = new FormGroup({
          first_name: new FormControl(this.formData.first_name ? this.formData.first_name : '', [Validators.required]),
          last_name: new FormControl(this.formData.last_name ? this.formData.last_name : '', [Validators.required]),
          email: new FormControl(this.formData.email ? this.formData.email : '', [Validators.required, Validators.email]),
          phone_number: new FormControl(this.formData.phone_number ? this.formData.phone_number : '', [Validators.required]),
          date_of_birth: new FormControl(this.formData.date_of_birth ? this.formData.date_of_birth : '', [Validators.required]),
          city: new FormControl(this.formData.city ? this.formData.city : '', [Validators.required]),
          state: new FormControl(this.formData.state ? this.formData.state : '', [Validators.required]),
          zipcode: new FormControl(this.formData.zipcode ? this.formData.zipcode : '', [Validators.required]),
          pharmacy_name: new FormControl(this.formData.pharmacy_name ? this.formData.pharmacy_name : '', [Validators.required]),
          pharmacy_number: new FormControl(this.formData.pharmacy_number ? this.formData.pharmacy_number : '', [Validators.required]),
          address: new FormControl(this.formData.address ? this.formData.address : '', [Validators.required]),
          refill_date: new FormControl(this.formData.refill_date ? this.formData.refill_date : ''),
          mad_name_1: new FormControl(this.formData.mad_name_1 ? this.formData.mad_name_1 : ''),
          mad_number_1: new FormControl(this.formData.mad_number_1 ? this.formData.mad_number_1 : ''),
          mad_name_2: new FormControl(this.formData.mad_name_2 ? this.formData.mad_name_2 : ''),
          mad_number_2: new FormControl(this.formData.mad_number_2 ? this.formData.mad_number_2 : ''),
          mad_name_3: new FormControl(this.formData.mad_name_3 ? this.formData.mad_name_3 : ''),
          mad_number_3: new FormControl(this.formData.mad_number_3 ? this.formData.mad_number_3 : ''),
          mad_name_4: new FormControl(this.formData.mad_name_4 ? this.formData.mad_name_4 : ''),
          mad_number_4: new FormControl(this.formData.mad_number_4 ? this.formData.mad_number_4 : ''),
          mad_name_5: new FormControl(this.formData.mad_name_5 ? this.formData.mad_name_5 : ''),
          mad_number_5: new FormControl(this.formData.mad_number_5 ? this.formData.mad_number_5 : ''),
          mad_name_6: new FormControl(this.formData.mad_name_6 ? this.formData.mad_name_6 : ''),
          mad_number_6: new FormControl(this.formData.mad_number_6 ? this.formData.mad_number_6 : ''),
          mad_name_7: new FormControl(this.formData.mad_name_7 ? this.formData.mad_name_7 : ''),
          mad_number_7: new FormControl(this.formData.mad_number_7 ? this.formData.mad_number_7 : ''),
          mad_name_8: new FormControl(this.formData.mad_name_8 ? this.formData.mad_name_8 : ''),
          mad_number_8: new FormControl(this.formData.mad_number_8 ? this.formData.mad_number_8 : ''),
          mad_name_9: new FormControl(this.formData.mad_name_9 ? this.formData.mad_name_9 : ''),
          mad_number_9: new FormControl(this.formData.mad_number_9 ? this.formData.mad_number_9 : ''),
          mad_name_10: new FormControl(this.formData.mad_name_10 ? this.formData.mad_name_10 : ''),
          mad_number_10: new FormControl(this.formData.mad_number_10 ? this.formData.mad_number_10 : ''),
        })

      }




    });


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

  // get comments
  getComments() {
    // trans_pre_comment/get?user_id=74?post_id=1741

    let url = `trans_pre_comment/get?post_id=${this.formData.post_id}`;
    this._formService.getComments(url).then((res) => {
      console.log(res);
      this.comments = JSON.parse(JSON.stringify(res)).reverse();
      this.loading = false
    })
      .catch((err) => {
        console.log(err);

      });
  }


  postComment() {
    console.log(this.newComment);

    let obj = {
      comment_post_ID: this.formData.post_id,
      comment_parent: this.currentUser.id,
      comment: this.newComment,
      author_name: `${this.formData.first_name} ${this.formData.last_name}`,
      author_email: this.formData.email

    }
    this.newComment = ''
    let url = "price_check_comment/create";
    this.loading = true;
    this._formService.postComment(obj, url).then((res) => {
      console.log(res);
      this.getComments();
    })
      .catch((err) => {
        console.log(err);

      });

  }


  getTimeStamp(timestamp) {
    return this.datePipe.transform(timestamp, 'HH:mm dd-MMM-yyyy')
  }
}
