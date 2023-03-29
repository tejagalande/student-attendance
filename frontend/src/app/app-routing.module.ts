import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindahboardComponent } from './Mycomponent/admindahboard/admindahboard.component';
import { DownloaddataComponent } from './Mycomponent/downloaddata/downloaddata.component';
import { LoginComponent } from './Mycomponent/login/login.component';
import { MarkattendanceComponent } from './Mycomponent/markattendance/markattendance.component';
import { TrainerdahboardComponent } from './Mycomponent/trainerdahboard/trainerdahboard.component';
import { TrainerloginComponent } from './Mycomponent/trainerlogin/trainerlogin.component';
import { UploadexcelsheetComponent } from './Mycomponent/uploadexcelsheet/uploadexcelsheet.component';

const routes: Routes = [
  {path:'uploadexcel',component:UploadexcelsheetComponent},
  {path:'trainerdashboard',component:TrainerdahboardComponent},
  {path:'admindashboard',component:AdmindahboardComponent},
  {path:'markattendance',component:MarkattendanceComponent},
  {path:'downloaddata',component:DownloaddataComponent},
  {path:'trainerlogin',component:TrainerloginComponent},
  {path:'',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
