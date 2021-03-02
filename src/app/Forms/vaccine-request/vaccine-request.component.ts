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
  selector: 'app-vaccine-request',
  templateUrl: './vaccine-request.component.html',
  styleUrls: ['./vaccine-request.component.scss'],
})
export class VaccineRequestComponent implements OnInit {

  vaccineRequestForm: FormGroup;
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
  isNewForm : boolean = true;

  constructor(
    private _translate: TranslateService,
    public _userService: UserService,
    public _formService: FormService,
    public appComponant: AppComponent,
    public router: Router,
    public route: ActivatedRoute,  
    private datePipe: DatePipe
  ) { 
    this.vaccineRequestForm = new FormGroup({
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
  }

  ngOnInit() {}

}
