import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree,Router} from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})


export class AuthGuard implements CanActivate   {
  constructor(private authService : AuthService, private router:Router) {}
    canActivate():boolean{
if(this.authService.isLoggedIn())
{
  return true;
}
else{
  this.router.navigate(['/login']);
  return false;
} 
    }
  }


