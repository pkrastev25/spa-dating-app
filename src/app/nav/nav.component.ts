import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertifyService} from '../services/alertify.service';

/**
 * Component responsible for rendering a navigation bar.
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  /**
   * Constructor.
   *
   * @param {AuthService} authService Reference to the service
   * @param {AlertifyService} alertifyService Reference to the service
   */
  constructor(private authService: AuthService, private alertifyService: AlertifyService) {
  }

  // region LIFECYCLE

  ngOnInit() {
  }

  // endregion LIFECYCLE

  /**
   * Logs in the user with the help of the {@link AuthService}. User feedback
   * is given with the help of {@link AlertifyService}.
   */
  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertifyService.success('Logged in successfully');
    }, error => {
      this.alertifyService.error(error);
    });
  }

  /**
   * Logs out the currently logged in user. User feedback is given with
   * the help of {@link AlertifyService}.
   */
  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertifyService.message('Logged out');
  }

  /**
   * Checks if there is a logged in user by validating the current JWT
   * token.
   *
   * @returns {boolean} True if the JWT token is valid, false otherwise
   */
  loggedIn() {
    return this.authService.loggedIn();
  }

}
