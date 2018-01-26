import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

/**
 * Service responsible for managing the authentication process like login
 * and register.
 */
@Injectable()
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;

  /**
   * Constructor.
   *
   * @param {Http} http Service reference
   */
  constructor(private http: Http) {
  }

  /**
   * Performs an API call for the user login. If successful, it saves the JWT token
   * to the {@link localStorage}.
   *
   * @param model Contains the user data - user name and password
   * @returns {Observable<any>} Contains the result of the API call
   */
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response: Response) => {
      const user = response.json();

      if (user) {
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;
      }
    }).catch(this.handleError);
  }

  /**
   * Performs an API call for the registration of the user.
   *
   * @param model Contains the user data - user name and password
   * @returns {Observable<Response>} Contains the result of the API call
   */
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions())
      .catch(this.handleError);
  }

  /**
   * Generates additional options for the API requests such as Headers, etc.
   *
   * @returns {RequestOptions} The additional options for the API requests
   */
  private requestOptions() {
    const headers = new Headers({'Content-type': 'application/json'});

    return new RequestOptions({headers: headers});
  }

  /**
   * Handles errors from the API calls by converting them to a more user friendly
   * format.
   *
   * @param error The error associated with the API call
   * @returns {ErrorObservable} A more user friendly format for the error
   */
  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');

    if (applicationError) {
      return Observable.throw(applicationError);
    }

    const serverError = error.json();
    let modelStateErrors = '';

    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }

    return Observable.throw(modelStateErrors || 'Server error');
  }

}
