import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';
import {Router} from '@angular/router';

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
  photoUrl: string;

  /**
   * Constructor.
   *
   * @param {AuthService} authService Reference to the service
   * @param {AlertifyService} alertifyService Reference to the service
   * @param {Router} router Reference to the service
   */
  constructor(private authService: AuthService, private alertifyService: AlertifyService, private router: Router) {
  }

  // region LIFECYCLE

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  // endregion LIFECYCLE

  /**
   * Logs in the user with the help of the {@link AuthService}. User feedback
   * is given with the help of {@link AlertifyService}. Reroutes the user
   * accordingly.
   */
  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertifyService.success('Logged in successfully');
    }, error => {
      this.alertifyService.error('Failed to login!');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  /**
   * Logs out the currently logged in user. User feedback is given with
   * the help of {@link AlertifyService}. Reroutes the user accordingly.
   */
  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.alertifyService.message('Logged out');
    this.router.navigate(['/home']);
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
