import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
// import { AES256 } from '@ionic-native/aes-256/ngx';
// import * as CryptoJS from 'crypto-js';
// import sha256 from 'crypto-js/sha256';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selectedTab: any = 'Refill_Request';
  language: string = "en";
  displayMsg: any = '';
  details: any = this._translate.instant("history");
  currentUser: any = JSON.parse(localStorage.getItem("currentUser"));
  historyData: any;
  secureKey: string = '0123456789abcdef0123456789abcdef';
  secureIV: string = 'abcdef9876543210abcdef9876543210';
  loading: Boolean = false;
  displayedColumns: string[] = [];
  // dataSource: any;
  currentPage: any = 0;
  dataSource = new MatTableDataSource();

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private _translate: TranslateService,
    public _userService: UserService,
    public change: ChangeDetectorRef,
    // private aes256: AES256
  ) {
    this.loading = true;
    this.getHistoryData();
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.selectedTab = params.selectedTab;
      this._userService.languageChanges().subscribe((res: any) => {
        console.log("RESPONSE", res);
        this.language = res.language
        this._initialiseTranslation();
      })
    });



  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ionViewWillEnter() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    });



    this._initialiseTranslation();
  }

  _initialiseTranslation(): void {
    console.log("_initialiseTranslation");
    // this.change.detectChanges();
    setTimeout(() => {

      this._translate.use(this.language);
      console.log(this._translate.instant("freeHome"));
      this.details = this._translate.instant("history");
      console.log(this.details);
    }, 250);
  }

  getHistoryData() {
    this._userService.getHistoryData(this.currentUser.id).subscribe((res: any) => {
      this.historyData = JSON.parse(JSON.stringify(res));
      this.selectedTabChange(this.selectedTab);
    }, (err) => {
      console.log(err);
    });


  }
  selectedTabChange(value) {
    console.log(value);
    switch (value) {
      case 'Refill_Request':
        if (this.historyData.refill_prescription && this.historyData.refill_prescription.length) {
          this.dataSource = new MatTableDataSource(this.historyData.refill_prescription);
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          this.displayedColumns = Object.keys(this.historyData.refill_prescription[0]);
          this.displayMsg = ''
        } else {
          this.displayMsg = 'No data found!'
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          this.displayedColumns = [];
        }
        break;

      case 'Transfer_Prescription':
        if (this.historyData.trans_prescription && this.historyData.trans_prescription.length) {
          this.dataSource = new MatTableDataSource(this.historyData.trans_prescription);
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          this.displayedColumns = Object.keys(this.historyData.trans_prescription[0]);
          this.displayedColumns.push("View");
          this.displayMsg = ''
        } else {
          this.displayMsg = 'No data found!'
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          this.displayedColumns = [];
        }
        break;

      case 'Price_Check':
        if (this.historyData.price_prescription && this.historyData.price_prescription.length) {
          this.dataSource = new MatTableDataSource(this.historyData.price_prescription);
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          this.displayedColumns = Object.keys(this.historyData.price_prescription[0]);
          // this.displayedColumns.push("action");
          console.log("this.displayedColumns ==>", this.displayedColumns);

          this.displayMsg = ''
        } else {
          this.displayMsg = 'No data found!'
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          this.displayedColumns = [];
        }
        break;

      case 'Vaccine_Request':
        if (this.historyData.vaccine_request && this.historyData.vaccine_request.length) {
          this.dataSource = new MatTableDataSource(this.historyData.vaccine_request);
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          this.displayedColumns = Object.keys(this.historyData.vaccine_request[0]);
          this.displayMsg = ''
        } else {
          this.displayMsg = 'No data found!'
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          this.displayedColumns = [];
        }
        break;

      default:
        break;
    }
    this.loading = false;
  }


  getFormData(data) {
    console.log("HEllo", data);

    let params: NavigationExtras = {
      queryParams: {
        form_data: JSON.stringify(data)
      }
    }
    let router = ''
    switch (this.selectedTab) {
      case 'Refill_Request':
        router = "/home/refill-request" ;
        break;
      case 'Transfer_Prescription':
        router =  "/home/transfer-prescription";
        break;
      case 'Price_Check':
        router =  "/home/price-check" ;
        break;
      case 'Vaccine_Request':
        // router =   ;
        break;
      default:
        break;
    }

    this.router.navigate([router], params);


  }

}