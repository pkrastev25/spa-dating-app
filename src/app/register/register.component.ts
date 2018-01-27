import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';

/**
 * Component responsible for rendering a registration form.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  /**
   * Constructor.
   *
   * @param {AuthService} authService Reference to the service
   * @param {AlertifyService} alertifyService Reference to the service
   */
  constructor(private authService: AuthService, private alertifyService: AlertifyService) {
  }

  // region LIFECYCLE

  ngOnInit() {
  }

  // endregion LIFECYCLE

  /**
   * Registers the user with the help of {@link AuthService}. User feedback
   * is given with the help of {@link AlertifyService}.
   */
  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertifyService.success('Registration successful!');
    }, error => {
      this.alertifyService.error(error);
    });
  }

  /**
   * Cancels the registration process, hides the registration form.
   */
  cancel() {
    this.cancelRegister.emit(false);
  }

}
