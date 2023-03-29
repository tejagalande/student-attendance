import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { DatasetController } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-markattendance',
  templateUrl: './markattendance.component.html',
  styleUrls: ['./markattendance.component.css']
})
export class MarkattendanceComponent implements OnInit{

  public show:boolean = false;
  public msg:string= '';
  div1:boolean=true;
  div2:boolean=false;
  stu_lenght:any;

  college:any;
  branch:any
  div:any
  batch:any
  date:any
  start_time:any
  end_time:any
  student_details;
  message:any;
  present=""
  @Input() trainerdata:string;
  

  name: string = "";  
  data:any;

  categories = [ 
    {name :"email1", id: 1},
    {name :"email2", id: 2},
    {name :"email3", id: 3},
    {name :"email4", id: 4}
  ];


  // msg: string;
  constructor(private http : HttpClient,private router: Router,private route: ActivatedRoute) {

    console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
        this.college = params['college'];
        this.branch = params['branch'];
        this.div = params['div'];
        this.batch = params['batch'];
        this.date = params['date'];
        this.start_time = params['start_time'];
        this.end_time = params['end_time'];
        // console.log(this.param2);
    });
   }
  
  
  
 hideshow() 
  {
      
      this.div1=false;
      this.div2=true;
      this.msg="Attendance Added Successfully";
      return this.msg;
  }

  ngOnInit() {

    const user = localStorage.getItem('isUserLoggedIn');
    if(user)
    {
      const  data = {
        clg: this.college,
        clg_branch:this.branch,
        clg_batch:this.batch,
        clg_div:this.div,
        clg_date:this.date,
        clg_end_time:this.start_time,
        clg_start_time:this.end_time
      };
    
      // console.log(data);

    console.log("In NG ON INIT in Attendance"+this.batch);
    this.http.post('http://localhost:8081/student_details',data).subscribe(res=>{
      this.student_details=res
      this.stu_lenght=this.student_details.length
      console.log(this.student_details)
    });
    }
    else
    {
      this.router.navigate( ['/trainerlogin']);
    }
    
  }

  submit(data)
  {
    console.log(data)
    this.http.post('http://localhost:8081/mark_attendance',data).subscribe(res=>{
      // console.log("getdata",res);
      this.message=res;
   
    if(this.message.length>0)
    {
      this.div1=false;
      this.div2=true;
      this.message=res;
    }
    else
    {

    }
    return this.message;

  });
  }

  logout()
  {
    
        localStorage.removeItem('isUserLoggedIn')
        this.router.navigate( ['trainerlogin']);
  }

  
 


}
