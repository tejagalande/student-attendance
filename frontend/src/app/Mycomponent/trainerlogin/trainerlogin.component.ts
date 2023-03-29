import { Component } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainerlogin',
  templateUrl: './trainerlogin.component.html',
  styleUrls: ['./trainerlogin.component.css']
})
export class TrainerloginComponent {
  constructor(private http : HttpClient,private router: Router) {}
  login:any;
  message:any;


  submit(data) {
    this.http.post('http://localhost:8081/trainerlogin',data).subscribe(res=>{
    this.login=res
    
    if(this.login.length>0)
    {
      localStorage.setItem('isUserLoggedIn', this.login.username); 
      this.router.navigate( ['trainerdashboard']);
    }
    else
    {

    }
    
  
      // jsonParsed.persons[0].name
      console.log(this.login)
    });
               
     

    // this.api.getuser(data);       
 }  


}
