import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import { FormService } from '../../services/form.service';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';
declare const $: any;
@Component({
  selector: 'app-refill-req',
  templateUrl: './refill-req.component.html',
  styleUrls: ['./refill-req.component.scss'],
})
export class RefillReqComponent implements OnInit {

  curruntDate: string = new Date().toISOString();
  nextYear: any;
  refillReqForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  formDetail: any = this._translate.instant("form");
  language: string = localStorage.getItem('language');
  currentUserData = JSON.parse(localStorage.getItem('userFormData'));
  loading: Boolean = false;
  formData: any;
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  comments: unknown;
  newComment:any = '';
  constructor(
    private _translate: TranslateService,
    public _userService: UserService,
    public _formService: FormService,
    public appComponant: AppComponent,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.nextYearCount();

    this.refillReqForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile_number: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      date_of_birth: new FormControl('', [Validators.required]),
      pick_up_date: new FormControl(''),
      pick_up_time: new FormControl(''),
      delivery_method: new FormControl(''),
      refill_date: new FormControl(''),
      rx_number_1: new FormControl(''),
      rx_number_2: new FormControl(''),
      rx_number_3: new FormControl(''),
      rx_number_4: new FormControl(''),
      rx_number_5: new FormControl(''),
      rx_number_6: new FormControl(''),
      rx_number_7: new FormControl(''),
      rx_number_8: new FormControl(''),
      rx_number_9: new FormControl(''),
      rx_number_10: new FormControl(''),
      rx_number_11: new FormControl(''),
      rx_number_12: new FormControl(''),

    })
  }

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      if(params.form_data){
        this.formData = JSON.parse(params.form_data);
        console.log(this.formData);
        
        this.getComments();
        for (const key in this.formData) {
          if (key !== 'post_id') {
            console.log(this.refillReqForm.controls)
            this.refillReqForm.controls[key].setValue(this.formData[key]);
          }
        }
      }
    });

    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
    setTimeout(() => {
      document.querySelector('ion-select').shadowRoot.querySelector('.select-icon').setAttribute('style', 'display:none');
    }, 300);

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
    if (this.refillReqForm.invalid) {
      return
    }
    $(elem).next().find('a[data-toggle="tab"]').click();
  }

  get f() {
    return this.refillReqForm.controls
  }

  // Count next 25 year for date
  nextYearCount() {
    this.nextYear = this.curruntDate.split("-")[0];
    this.nextYear = this.nextYear++;
    this.nextYear = this.nextYear + +25;
  }

  /**
   * Add refill req form
   * @param {object} data 
   */
  addRefillReq(data) {
    this.submitted = true;
    data['user_id'] = this.currentUserData.id;
    data.date_of_birth = moment(data.date_of_birth).format('DD/MM/yyyy');
    if (data.pick_up_date)
      data.pick_up_date = moment(data.pick_up_date).format('DD/MM/yyyy');
    if (data.refill_date) {
      data.refill_date = moment(data.refill_date).format('DD/MM/yyyy');
      data['auto_refill'] = true
    }
    if (data.pick_up_time)
      data.pick_up_time = moment(data.pick_up_time).format('hh:mm')
    if (this.refillReqForm.invalid) {
      return
    }
    console.log(data);
    this.isDisable = true;
    this.loading = true;
    console.log(data);
    this._formService.addRefillForm(data).then((res: any) => {
      console.log("refill", res);
      this.loading = false;
      this.isDisable = false;
      this.submitted = false;
      this.refillReqForm.reset();
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

  getComments() {
    

    let url = `refill_request_comment/get?post_id=${this.formData.post_id}`;
    this._formService.getComments(url).then((res) => {
      console.log(res);
      this.comments = res;
      this.loading =false
    })
    .catch((err) => {
      console.log(err);
      
    });
  }


  postComment(){
    console.log(this.newComment);

    let obj = {
      comment_post_ID : this.formData.post_id,
      comment_parent: this.currentUser.id,
      comment: this.newComment,
      author_name: `${this.formData.first_name} ${this.formData.last_name}`,
      author_email: this.formData.email
      
    }
    this.newComment = ''
    let url = "price_check_comment/create"
    this.loading = true;
    this._formService.postComment(obj, url).then((res) => {
      console.log(res);
      this.getComments();
    })
    .catch((err) => {
      console.log(err);
      
    });
    
  }

}
