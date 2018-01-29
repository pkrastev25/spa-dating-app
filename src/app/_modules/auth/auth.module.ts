import {NgModule} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

/**
 * Factory method, creates the authorized client (with a JWT token)
 *
 * @param {Http} http Reference to the http service
 * @param {RequestOptions} options Reference to the request options service
 * @returns {AuthHttp} The authorized client (with a JWT token)
 */
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

/**
 * Module responsible for providing an authorized client (with a JWT token) that
 * carries the requests within the application.
 */
@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})

/**
 * Module responsible for providing an authorized client (with a JWT token) that
 * carries the requests within the application.
 */
export class AuthModule {
}
