import { importProvidersFrom, Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiUrl="https://localhost:7075/user/login";
  constructor(private jwtService:JwtService,private http:HttpClient) { }
  login(username:string, password:string):Observable<any>{
return this.http.post<any>(`${this.apiUrl}/api/login`, {username,
password}).pipe(
tap(response=>{
if(response && response.token)
{
this.jwtService.saveToken(response.token);
}
})
);
}


logout():void{
this.jwtService.destroyToken();
}


isLoggedIn():boolean{
return this.jwtService.isLoggedIn();
}


isAdmin():boolean{
const token = this.jwtService.getToken();
if(!token){
return false;
}
const tokenParts=token.split('.');
if(tokenParts.length!==3)
{
return false;
}
const decodedPayload=JSON.parse(atob(tokenParts[1]));
return decodedPayload.name==='admin';
}
}
