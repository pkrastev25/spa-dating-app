import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';

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
   */
  constructor(private authService: AuthService) {
  }

  // region LIFECYCLE

  ngOnInit() {
  }

  // endregion LIFECYCLE

  /**
   * Registers the user with the help of {@link AuthService}.
   */
  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('Registration successful!');
    }, error => {
      console.log(error);
    });
  }

  /**
   * Cancels the registration process, hides the registration form.
   */
  cancel() {
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }

}
