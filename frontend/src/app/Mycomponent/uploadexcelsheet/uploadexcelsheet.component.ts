import { Component } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router,ActivatedRoute } from '@angular/router';


declare var jQuery: any;
@Component({
  selector: 'app-uploadexcelsheet',
  templateUrl: './uploadexcelsheet.component.html',
  styleUrls: [`./uploadexcelsheet.component.css`]
})
export class UploadexcelsheetComponent {

  selectedCar: number;
  selectedbranch:number;
 options: any;

  
  cars=[]
    // cars = [
    //     { id: 1, name: 'Volvo' },
    //     { id: 2, name: 'Saab' },
    //     { id: 3, name: 'Opel' },
    //     { id: 4, name: 'Audi' },
    // ];


  // myControl = new FormControl('');
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;

  ngOnInit() {

    const user = localStorage.getItem('isUserLoggedIn');
      if(user)
      {
        
      }
      else
      {
        this.router.navigate( ['']);
      }

    (function ($) {
      $('someSwitchOptionDefault').click(function(){
        $('someSwitchOptionDefault').prop('checked',this.checked)
      })
    })(jQuery);

    
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  path: string = "../assests/images/logo.png";
  alttext: string="logo"
  public msg:string= '';
  div2:boolean=false;
  message:any
  messages:any;
  branch:any
  images;
  fileexcel;
  file:any;
  objectKeys = Object.keys;

  myForm = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])

  });
  constructor(private http : HttpClient,private api:AppServiceService,private router: Router,private _activatedRoute:ActivatedRoute) { }
  // constructor(private api:AppServiceService) {}

    // api.getcollege().then(message => {
      // console.log('Message =', message);
    // });


  get f(){

    return this.myForm.controls;

  }

  onFileChange(event) {

    if (event.target.files.length > 0) {

      this.file = event.target.files[0];

      console.log(this.file);
      const formData=new FormData();
      formData.append('file',this.file)

      console.log(formData);
      // this.api.upload(formData); 

      this.http.post('http://localhost:8081/file',formData).subscribe(res=>{
        // console.log("getdata",res);
      this.message=res;
      
      });

      // this.images.file;
      // this.myForm.patchValue({
      //   fileSource: file
      // });

    }
  }

  submit(data)
  {
    
    // console.log(data);
    // data.append('file',this.file)
    // console.log(this.file);
    // console.log("app service",data)
    //   this.http.post('http://localhost:8081/uploadexcel',data).subscribe(res=>{
    //   // console.log("getdata",res);
    //   this.message=res;
    
    //   // this.router.navigate(["trainerdashboard"],{relativeTo:this._activatedRoute})
    //   if(this.message)
    //   {
    //     this.router.navigate(["trainerdashboard"],{relativeTo:this._activatedRoute})
        
    //     // this.router.navigate(['first'])
    //   }
    //   console.log("getdata",this.message);
    // });

    this.api.uploadexcel(data);  
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
      this.branch=res
    
      // var op = this.message..map(function(item) {
      //   return item.productId;
      // this.messages = JSON.parse(this.message);
      // jsonParsed.persons[0].name
      console.log(this.branch)
    });
  }

  logout()
  {
    localStorage.removeItem('isUserLoggedIn')
      this.router.navigate( ['']);
  }
  
}
