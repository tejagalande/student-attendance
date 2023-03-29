import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { AppServiceService } from 'src/app/app-service.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
  selector: 'app-downloaddata',
  templateUrl: './downloaddata.component.html',
  styleUrls: ['./downloaddata.component.css']
})
export class DownloaddataComponent implements OnInit{

  path: string = "../assests/images/logo.png";
  alttext: string="logo"
  public msg:string= '';
  div2:boolean=false;
  message:any;
  branch_name:any;
  selectedCar: number;
  selectedbranch:any;
  download:any;
  // msg: string;
  constructor(private http : HttpClient,private router: Router,private AppServiceService:AppServiceService) {}

  
  ngOnInit(): void {
    const user = localStorage.getItem('isUserLoggedIn');
      if(user)
      {
        
      }
      else
      {
        this.router.navigate( ['']);
      }
  }
 result() 
  {
      
      this.div2=true;
      this.msg="Data Download successfully";
      return this.msg;
  }

  submit(data)
  {


    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              headers.set('Access-Control-Allow-header', 'http://localhost:8081')
  

    // let getfileparams = new HttpParams().set('filepath', encodedtool5filepath);
    // let getfileheaders = new HttpHeaders().set('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').set('Authorization', token);
    this.http.get('http://localhost:8081/download').subscribe(res=>{
      
      this.download=res
      console.log(this.download)  
      this.exportAsExcelFile(this.download, 'sample');
    });

  
      
   

  }

  changeLeagueOwner()
  {
   
    this.http.get('http://localhost:8081/getcollegedetails').subscribe(res=>{
      // console.log("appservice:login",res);
      // console.log(JSON.stringify(obj));
      // this.message=JSON.stringify(res);
      this.message=res
    
      // var op = this.message..map(function(item) {
      //   return item.productId;
      // this.messages = JSON.parse(this.message);
      // jsonParsed.persons[0].name
      console.log(this.message)
    });
    // this.api.getcollege(); 
  }

  changebranch()
  {
    this.http.get('http://localhost:8081/getbranch').subscribe(res=>{
      // console.log("appservice:login",res);
      // console.log(JSON.stringify(obj));
      // this.message=JSON.stringify(res);
      this.branch_name=res
    
      // var op = this.message..map(function(item) {
      //   return item.productId;
      // this.messages = JSON.parse(this.message);
      // jsonParsed.persons[0].name
      console.log(this.branch_name)
    });
  }


  // Save Excel File


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

  logout()
  {
    localStorage.removeItem('isUserLoggedIn')
    this.router.navigate( ['']);
  }
}
