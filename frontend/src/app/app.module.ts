import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Mycomponent/login/login.component';
import { TrainerdahboardComponent } from './Mycomponent/trainerdahboard/trainerdahboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MarkattendanceComponent } from './Mycomponent/markattendance/markattendance.component';
import { UploadexcelsheetComponent } from './Mycomponent/uploadexcelsheet/uploadexcelsheet.component';
import { AdmindahboardComponent } from './Mycomponent/admindahboard/admindahboard.component';
import { DownloaddataComponent } from './Mycomponent/downloaddata/downloaddata.component';

import { NgSelectModule } from '@ng-select/ng-select';

import {HttpClientModule} from '@angular/common/http'

import { AppServiceService } from './app-service.service';
import { TrainerloginComponent } from './Mycomponent/trainerlogin/trainerlogin.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TrainerdahboardComponent,
    MarkattendanceComponent,
    UploadexcelsheetComponent,
    AdmindahboardComponent,
    DownloaddataComponent,
    TrainerloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    HttpClientModule,
    NgSelectModule
   
   
  ],
  providers: [AppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
