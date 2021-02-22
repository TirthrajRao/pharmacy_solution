import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { HomePageComponent } from '../home-page/home-page.component';
import { ServicesListComponent } from '../Forms/services-list/services-list.component';
import { TransferPrscriptionComponent } from '../Forms/transfer-prscription/transfer-prscription.component';
import { RefillReqComponent } from '../Forms/refill-req/refill-req.component';
import { EmploymentComponent } from '../Forms/employment/employment.component';
import { PriceCheckComponent } from '../Forms/price-check/price-check.component';
import { OurServicesComponent } from '../Our-services/our-services/our-services.component';
import { FreeHomeDeliveryComponent } from '../Our-services/free-home-delivery/free-home-delivery.component';
import { EScribeComponent } from '../Our-services/e-scribe/e-scribe.component';
import { CurbsideComponent } from '../Our-services/curbside/curbside.component';
import { SpecialityPackingComponent } from '../Our-services/speciality-packing/speciality-packing.component';
import { GenericDrugComponent } from '../Our-services/generic-drug/generic-drug.component';
import { MajorInsuranceComponent } from '../Our-services/major-insurance/major-insurance.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { NotificationComponent } from '../Notification/notification/notification.component';
import { HippaNoticeComponent } from '../hippa-notice/hippa-notice.component';
import { NotificationDetailComponent } from '../Notification/notification-detail/notification-detail.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full'
      },

      {
        path: 'home-page',
        component: HomePageComponent
      },
      {
        path: 'service-list',
        component: ServicesListComponent
      },
      {
        path: 'transfer-prescription',
        component: TransferPrscriptionComponent
      },
      {
        path: 'refill-request',
        component: RefillReqComponent
      },
      {
        path: 'employment',
        component: EmploymentComponent
      },
      {
        path: 'price-check',
        component: PriceCheckComponent
      },
      {
        path: 'our-services',
        component: OurServicesComponent
      },
      {
        path: 'free-home-delivery',
        component: FreeHomeDeliveryComponent
      },
      {
        path: 'e-scribe',
        component: EScribeComponent
      },
      {
        path: 'curb-side',
        component: CurbsideComponent
      },
      {
        path: 'speciality-packing',
        component: SpecialityPackingComponent
      },
      {
        path: 'generic-drug',
        component: GenericDrugComponent
      },
      {
        path: 'major-insurance',
        component: MajorInsuranceComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: "hippa-notice",
        component: HippaNoticeComponent
      },
      {
        path: "notification-detail/:id",
        component: NotificationDetailComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
