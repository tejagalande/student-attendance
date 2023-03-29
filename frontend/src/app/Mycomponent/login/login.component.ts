import { Component,OnInit} from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { FormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  login:any;

  constructor(private http : HttpClient,private router: Router){}

  // constructor(){}

  onSubmit(data) {
    this.http.post('http://localhost:8081/adminlogin',data).subscribe(res=>{
      this.login=res
      localStorage.setItem('isUserLoggedIn', this.login.username); 
  
      if(this.login.length>0)
      {
        this.router.navigate( ['admindashboard']);
        // if (this.login.username == null) 
        // {
          
        //   return false;
        // }
      }
      else
      {
        
        
      }  
    });
 }  

 
 



}
