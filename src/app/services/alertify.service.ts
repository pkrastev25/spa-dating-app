import {Injectable} from '@angular/core';

/**
 * Provides a global access to the library within the service.
 */
declare let alertify: any;

/**
 * Service responsible for creating and showing dialogs to the user. Internally,
 * it uses {@link alertify} to realize this functionality.
 */
@Injectable()
export class AlertifyService {

  /**
   * Constructor.
   */
  constructor() {
  }

  /**
   * Creates and shows a confirm dialog to the user according to {@link alertify}.
   *
   * @param {string} message The message that will be shown to the user
   * @param {() => any} confirmCallback Callback that will be executed upon confirmation
   */
  confirm(message: string, confirmCallback: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        confirmCallback();
      } else {
        // TODO: Nothing, for now...
      }
    });
  }

  /**
   * Creates and shows a success dialog to the user according to {@link alertify}.
   *
   * @param {string} message The message that will be shown to the user
   */
  success(message: string) {
    alertify.success(message);
  }

  /**
   * Creates and shows an error dialog to the user according to {@link alertify}.
   *
   * @param {string} message The message that will be shown to the user
   */
  error(message: string) {
    alertify.error(message);
  }

  /**
   * Creates and shows a warning dialog to the user according to {@link alertify}.
   *
   * @param {string} message The message that will be shown to the user
   */
  warning(message: string) {
    alertify.warning(message);
  }

  /**
   * Creates and shows a message dialog to the user according to {@link alertify}.
   *
   * @param {string} message The message that will be shown to the user
   */
  message(message: string) {
    alertify.message(message);
  }


}
