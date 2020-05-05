import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { switchMap, map,mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService  {

  constructor(private auth : AuthService ,private userService : UserService ) { }

  /*canActivate(){
     this.auth.user$.pipe(
      map(user => this.userService.get(user.uid))
    ).subscribe(x => console.log(x)
    )
  }*/
}

//.pipe(
 // map(user => this.userService.get(user.uid))
 // .map(appUser => appUser.isAdmin ));
