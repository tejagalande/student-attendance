import { Component,OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { NgTypeToSearchTemplateDirective } from '@ng-select/ng-select';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-trainerdahboard',
  templateUrl: './trainerdahboard.component.html',
  styleUrls: ['./trainerdahboard.component.css']
})


export class TrainerdahboardComponent{
datas:any;
collegename:any;
branch_name:any;
// division:any;
// batch:any;
start_date:any;
start_time:any;
end_timetime:any;
message:any;
selectedCar: number;
selectedbranch:any;
trainer_data:any;
div:any;

constructor(private http : HttpClient,private router: Router,private activatedRoute:ActivatedRoute) { }

ngOnInit(){
  // this.activatedRoute.queryParams.subscribe(params =>{
  //   // perform search here and bind result to template only after the input has changed and 500ms have passed
  // })

  const user = localStorage.getItem('isUserLoggedIn');
      if(user)
      {
        
      }
      else
      {
        this.router.navigate( ['/trainerlogin']);
      }
}

  submit(data)
  {
      this.datas=data;
      // this.router.navigate(["markattendance"],this.datas)
      // {id: "someId", id2: "another ID"}
      // this.router.navigateByUrl(`/markattendance?${this.collegename:this.datas.college}`)
      console.log("Branch"+this.datas.branch)
      this.div=this.datas.division;
      this.router.navigate( ['markattendance'],{queryParams:  {college: this.datas.college,branch:this.datas.branch,div:this.div,batch:this.datas.batch,date:this.datas.date,start_time:this.datas.start_time,end_time:this.datas.end_time}});

      // this.router.navigate(['markattendance'], { queryParams: {id: this.datas.branch} });

      // this.http.post('http://localhost:8081/getstudentlist',data).subscribe(res=>{
      // // console.log("getdata",res);
      // this.message=res;
    
      // // this.router.navigate(["trainerdashboard"],{relativeTo:this._activatedRoute})
      // if(this.message)
      // {
      //   this.message=res;
      //   // this.router.navigate(["trainerdashboard"],{relativeTo:this._activatedRoute})
        
      //   // this.router.navigate(['first'])
      // }
      // console.log("getdata",this.message);

      // this.nodedata=res;
      // return this.nodedata;
    //});
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

  logout()
  {
    localStorage.removeItem('isUserLoggedIn')
    this.router.navigate( ['/trainerlogin']);
  }

}
