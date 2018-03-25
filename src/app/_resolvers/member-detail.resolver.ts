import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IUserModel} from '../_models/IUserModel';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

/**
 * @author Petar Krastev
 */
@Injectable()
export class MemberDetailResolver implements Resolve<IUserModel> {

  constructor(private userService: UserService,
              private routerService: Router,
              private alertifyService: AlertifyService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserModel> | Promise<IUserModel> | IUserModel {
    return this.userService
      .getUser(route.params['id'])
      .catch(() => {
        this.alertifyService.error('Problem retrieving data!');
        this.routerService.navigate(['/members']);

        return Observable.of(null);
      });
  }

}
