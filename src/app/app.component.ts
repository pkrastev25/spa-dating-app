import {Component, OnInit} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {IUserModel} from './_models/IUserModel';
import {JwtHelperService} from '@auth0/angular-jwt';

/**
 * @author Petar Krastev
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService,
              private jwtHelperService: JwtHelperService) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: IUserModel = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authService.decodedToken = this.jwtHelperService.decodeToken(token);
    }

    if (user) {
      this.authService.currentUser = user;

      if (this.authService.currentUser.photoUrl !== null) {
        this.authService.changeMemberPhoto(user.photoUrl);
      } else {
        this.authService.changeMemberPhoto('../assets/user.png');
      }
    }
  }
}
