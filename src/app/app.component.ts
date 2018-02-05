import {Component, OnInit} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {JwtHelper} from 'angular2-jwt';
import {UserModel} from './_models/UserModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  jwtHelper: JwtHelper = new JwtHelper();

  /**
   * Constructor.
   *
   * @param {AuthService} authService Reference to the service
   */
  constructor(private authService: AuthService) {

  }

  // region LIFECYCLE

  ngOnInit(): void {
    /*
     * Place the token in the auth service, so that there is access to it
     * even after a refresh of the page.
     */
    const token = localStorage.getItem('token');
    const user: UserModel = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }

  // endregion LIFECYCLE
}
