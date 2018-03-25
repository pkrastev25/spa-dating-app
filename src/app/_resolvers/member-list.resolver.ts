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
export class MemberListResolver implements Resolve<IUserModel[]> {

  pageSize = 5;
  pageNumber = 1;

  constructor(private userService: UserService,
              private routerService: Router,
              private alertifyService: AlertifyService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserModel[]> | Promise<IUserModel[]> | IUserModel[] {
    return this.userService
      .getUsers(this.pageNumber, this.pageSize)
      .catch(() => {
        this.alertifyService.error('Problem retrieving data!');
        this.routerService.navigate(['/home']);

        return Observable.of(null);
      });
  }
}
