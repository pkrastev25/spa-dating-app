import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserModel} from '../_models/UserModel';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

/**
 * Resolver for the {@link MemberDetailComponent}. Attempts to load
 * the data needed by the component. If unsuccessful, resolves to
 * the members route.
 */
@Injectable()
export class MemberDetailResolver implements Resolve<UserModel> {

  /**
   * Constructor.
   *
   * @param {UserService} userService Reference to the user service
   * @param {Router} routerService Reference to the router service
   * @param {AlertifyService} alertifyService Reference to the alertify service
   */
  constructor(private userService: UserService, private routerService: Router, private alertifyService: AlertifyService) {

  }

  /**
   * Attempts to resolve the activated route. Performs a load request
   * for the data needed by the component. If successful, the user is
   * redirected to the desired route. If not, he is redirected to the
   * members route.
   *
   * @param {ActivatedRouteSnapshot} route Contains information about the activated route
   * @param {RouterStateSnapshot} state Contains information about the route state
   * @returns {Observable<UserModel> | Promise<UserModel> | UserModel} The data needed by the route, null if the data cannot be loaded
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | Promise<UserModel> | UserModel {
    return this.userService
      .getUser(route.params['id'])
      .catch(() => {
        this.alertifyService.error('Problem retrieving data!');
        this.routerService.navigate(['/members']);

        return Observable.of(null);
      });
  }

}
