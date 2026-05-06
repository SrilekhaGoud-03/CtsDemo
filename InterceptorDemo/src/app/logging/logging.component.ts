import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent
{
username:string="";
password:string="";
errorMessage:string="";
constructor(private authService:AuthService, private router:Router) { }
ngOnInit(): void {
this.authService.logout();
}

login():void{
this.authService.login(this.username, this.password).subscribe(
response=>{
this.router.navigate(['/dashboard']);
},
error=>{
console.error('Login failed:', error);
this.errorMessage='Invalid username or password.';
}
)
}

}
