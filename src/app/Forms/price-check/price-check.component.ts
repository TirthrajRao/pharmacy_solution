import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { FormService } from '../../services/form.service';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
declare const $: any;
@Component({
  selector: 'app-price-check',
  templateUrl: './price-check.component.html',
  styleUrls: ['./price-check.component.scss'],
})
export class PriceCheckComponent implements OnInit {


  priceCheckForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  formDetail: any = this._translate.instant("form");
  language: string = localStorage.getItem('language');
  currentUserData = JSON.parse(localStorage.getItem('userFormData'));
  loading: Boolean = false;
  formData:any;
  comments:any;
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  newComment:any = '';
  constructor(
    private _translate: TranslateService,
    public _userService: UserService,
    public _formService: FormService,
    public appComponant: AppComponent,
    public router: Router,
    public route: ActivatedRoute,  
    private datePipe: DatePipe
  ) {
    this.priceCheckForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl('', [Validators.required]),
      medicine_name_1: new FormControl(''),
      medicine_1_strength: new FormControl(''),
      madicine_1_quantity: new FormControl(''),
      medicine_name_2: new FormControl(''),
      medicine_2_strength: new FormControl(''),
      madicine_2_quantity: new FormControl(''),
      medicine_name_3: new FormControl(''),
      medicine_3_strength: new FormControl(''),
      madicine_3_quantity: new FormControl(''),
      medicine_name_4: new FormControl(''),
      medicine_4_strength: new FormControl(''),
      madicine_4_quantity: new FormControl(''),
      medicine_name_5: new FormControl(''),
      medicine_5_strength: new FormControl(''),
      madicine_5_quantity: new FormControl(''),
      note_to_pharmacy: new FormControl('')
    });

    




    // Call get comments API:
    
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.formData = JSON.parse(params.form_data);
      console.log(this.formData);
      
      this.getComments();
      for (const key in this.formData) {
        if (key !== 'post_id') {
          console.log(this.priceCheckForm.controls)
          this.priceCheckForm.controls[key].setValue(this.formData[key]);
        }
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
    if (this.priceCheckForm.invalid) {
      return
    }
    $(elem).next().find('a[data-toggle="tab"]').click();
  }

  get f() { return this.priceCheckForm.controls }

  /**
   * Add Price Check Form
   * @param {object} data 
   */
  addPriceForm(data) {
    this.submitted = true;
    data['user_id'] = this.currentUserData.id;
    if (this.priceCheckForm.invalid) {
      return
    }
    this.isDisable = true;
    console.log(data);
    this.isDisable = true;
    this.loading = true;
    console.log(data);
    this._formService.addPriceCheckForm(data).then((res: any) => {
      console.log("refill", res);
      this.loading = false;
      this.isDisable = false;
      this.submitted = false;
      this.priceCheckForm.reset();
      this.appComponant.sucessAlert();
      this.router.navigate(['/home/home-page']);
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
    let url = `price_check_comment/get?post_id=${this.formData.post_id}`;
    this._formService.getComments(url).then((res) => {
      console.log(res);
      this.comments = JSON.parse(JSON.stringify(res)).reverse();
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


  getTimeStamp(timestamp) {
    return this.datePipe.transform(timestamp, 'HH:mm dd-MMM-yyyy')
  }
  

}
