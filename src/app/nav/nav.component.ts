import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

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
   */
  constructor(private authService: AuthService) {
  }

  // region LIFECYCLE

  ngOnInit() {
  }

  // endregion LIFECYCLE

  /**
   * Logs in the user with the help of the {@link AuthService}.
   */
  login() {
    this.authService.login(this.model).subscribe(data => {
      console.log('Logged in successfully');
    }, error => {
      console.log(error);
    });
  }

  /**
   * Logs out the currently logged in user.
   */
  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    console.log('Logged out');
  }

  /**
   * Validates if there is a logged in user.
   *
   * @returns {boolean} True if the user is currently logged in, false otherwise
   */
  loggedIn() {
    const token = localStorage.getItem('token');

    return !!token;
  }

}
