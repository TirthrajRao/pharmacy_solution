import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';
import { FormService } from '../../services/form.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss'],
})
export class EmploymentComponent implements OnInit {

  fileName: any;
  files: any;
  employmentForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  loading: Boolean = false;
  language: string = localStorage.getItem('language');
  details: any = this._translate.instant("employment");
  formDetail: any = this._translate.instant("form");
  currentUserData = JSON.parse(localStorage.getItem('userFormData'));


  constructor(
    private _translate: TranslateService,
    public _userService: UserService,
    public _formService: FormService,
    public appComponant:AppComponent,
    public router:Router
  ) {
    this._initialiseTranslation();

    this.employmentForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl('', [Validators.required]),
      mobile_number: new FormControl('', [Validators.required]),
      position_apply: new FormControl('', [Validators.required]),
      message: new FormControl(''),
    })

  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  get f() { return this.employmentForm.controls }

  /**
   * Select resume file
   */
  selectFile(e) {
    console.log(e.target.files);
    this.files = e.target.files[0];
    this.fileName = this.files.name;
  }

  /**
   * add employement form
   * @param {object} data 
   */
  addEmploymentForm(data) {
    this.submitted = true;
    if (this.employmentForm.invalid) {
      return
    }
    console.log(data);
    let formData = new FormData();
    _.forOwn(data, (value, key) => {
      formData.append(key, value)
    })
    formData.append('user_id', this.currentUserData.id);
    if (this.files)
      formData.append('resume', this.files[0])
    this.isDisable = true;
    this.loading = true;
    this._formService.addEmploymentForm(data).then((res: any) => {
      console.log("refill", res);
      this.loading = false;
      this.isDisable = false;
      this.submitted = false;
      this.employmentForm.reset();
      this.appComponant.sucessAlert();
      this.router.navigate(['/home/home-page']);
      this.files = '';
      this.fileName = '';
    }).catch(err => {
      console.log("err", err);
      this.loading = false;
      this.isDisable = false;
      this.appComponant.errorAlert();
    })
  }

  /**
   * Change language
   */
  _initialiseTranslation(): void {
    setTimeout(() => {
      this._translate.use(this.language);
      console.log(this._translate.instant("employment"));
      this.details = this._translate.instant("employment");
      this.formDetail = this._translate.instant("form");
    }, 250);
  }
}
