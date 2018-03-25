import {Injectable} from '@angular/core';

declare let alertify: any;

/**
 * @author Petar Krastev
 */
@Injectable()
export class AlertifyService {

  constructor() {
  }

  confirm(message: string, confirmCallback: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        confirmCallback();
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
