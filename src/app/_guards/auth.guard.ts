import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';

/**
 * Route guard responsible for providing access to routes to logged in
 * users only.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * Constructor.
   *
   * @param {AuthService} authService Reference to the service
   * @param {Router} router Reference to the service
   * @param {AlertifyService} alertifyService Reference to the service
   */
  constructor(private authService: AuthService, private router: Router, private alertifyService: AlertifyService) {

  }

  /**
   * Verifies that the user is currently login and provides access to the
   * desired route. If the user is not logged in, he is redirected to the
   * home route and a dialog is shown.
   *
   * @param {ActivatedRouteSnapshot} next Contains information for the route
   * @param {RouterStateSnapshot} state Contains state information for the route
   * @returns {Observable<boolean> | Promise<boolean> | boolean} True if the user is currently logged in, false otherwise
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertifyService.error('You need to be logged in to access this area!');
    this.router.navigate(['/home']);
    return false;
  }
}
