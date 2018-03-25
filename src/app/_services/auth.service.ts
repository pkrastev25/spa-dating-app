import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {IUserModel} from '../_models/IUserModel';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IAuthUser} from '../_models/IAuthUser';
import {environment} from '../../environments/environment';

/**
 * @author Petar Krastev
 */
@Injectable()
export class AuthService {

  baseUrl = environment.apiUrl;
  userToken: any;
  decodedToken: any;
  currentUser: IUserModel;

  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService) {
  }

  login(model: any) {
    return this.http
      .post<IAuthUser>(this.baseUrl + 'auth/login', model, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .map(user => {
        if (user && user.tokenString) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
          this.userToken = user.tokenString;
          this.currentUser = user.user;

          if (this.currentUser.photoUrl !== null) {
            this.changeMemberPhoto(this.currentUser.photoUrl);
          } else {
            this.changeMemberPhoto('../../assets/user.png');
          }
        }
      });
  }

  register(user: IUserModel) {
    return this.http
      .post(this.baseUrl + 'auth/register', user, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  loggedIn() {
    const token = this.jwtHelperService.tokenGetter();

    if (!token) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(token);
  }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
}
