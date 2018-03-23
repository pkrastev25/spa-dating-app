import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {IMessageModel} from '../_models/IMessageModel';
import {AuthService} from '../_services/auth.service';

@Injectable()
export class MessageResolver implements Resolve<IMessageModel[]> {

  pageSize = 5;
  pageNumber = 1;
  messageContainer = 'Unread';

  constructor(private userService: UserService, private routerService: Router, private alertifyService: AlertifyService,
              private authService: AuthService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMessageModel[]> |
    Promise<IMessageModel[]> | IMessageModel[] {
    return this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pageNumber,
        this.pageSize,
        this.messageContainer
      ).catch(() => {
        this.alertifyService.error('Problem retrieving data!');
        this.routerService.navigate(['/home']);

        return Observable.of(null);
      });
  }

}
