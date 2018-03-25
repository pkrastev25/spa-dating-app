import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IUserModel} from '../_models/IUserModel';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {AuthService} from '../_services/auth.service';

/**
 * @author Petar Krastev
 */
@Injectable()
export class MemberEditResolver implements Resolve<IUserModel> {

  constructor(private userService: UserService,
              private routerService: Router,
              private alertifyService: AlertifyService,
              private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserModel> | Promise<IUserModel> | IUserModel {
    return this.userService
      .getUser(this.authService.decodedToken.nameid)
      .catch(() => {
        this.alertifyService.error('Problem retrieving data!');
        this.routerService.navigate(['/members']);

        return Observable.of(null);
      });
  }
}
