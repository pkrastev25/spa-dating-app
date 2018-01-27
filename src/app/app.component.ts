import {Component, OnInit} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {JwtHelper} from 'angular2-jwt';

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

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  // endregion LIFECYCLE
}
