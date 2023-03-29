import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
// import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admindahboard',
  templateUrl: './admindahboard.component.html',
  styleUrls: ['./admindahboard.component.css']
})
export class AdmindahboardComponent implements OnInit{

  path: string = "../assests/images/logo.png";
  alttext: string="logo"
  constructor(private http : HttpClient,private router: Router) {}
  ngOnInit() 
  {
    const user = localStorage.getItem('isUserLoggedIn');
      if(user)
      {
        
      }
      else
      {
        this.router.navigate( ['']);
      }

  }

  logout()
  {
    
      localStorage.removeItem('isUserLoggedIn')
      this.router.navigate( ['']);
  }

}
