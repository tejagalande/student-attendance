import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { LoginComponent } from './Mycomponent/login/login.component';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  message:any;
  nodedata:any;
  constructor(private http : HttpClient,private router: Router,private _activatedRoute:ActivatedRoute) { }

  // private url = 'http://localhost:8081/getcollegedetails';

  getuser(data)
  {
    console.log("app service",data)
    this.http.post('http://localhost:8081/login',data).subscribe(res=>{
      console.log("appservice:login"+res);
      this.message=res;
    });
  }


  getcollege()
  {
  
    this.http.get('http://localhost:8081/getcollegedetails').subscribe(res=>{
      console.log("appservice:login",res);
      this.message=res;
    });
    
  }
  

  uploadexcel(uploadexceldata)
  {
    
      console.log("app service",uploadexceldata)
      this.http.post('http://localhost:8081/uploadexcel',uploadexceldata).subscribe(res=>{
      // console.log("getdata",res);
      this.message=res;
    
      // this.router.navigate(["trainerdashboard"],{relativeTo:this._activatedRoute})
      if(this.message)
      {
        this.message=res;
        // this.router.navigate(["trainerdashboard"],{relativeTo:this._activatedRoute})
        
        // this.router.navigate(['first'])
      }
      console.log("getdata",this.message);

      // this.nodedata=res;
      // return this.nodedata;
    });
  }

  upload(excelfile)
  {
    
   
}




//Save Excel File

public exportAsExcelFile(json: any[], excelFileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
}



}
