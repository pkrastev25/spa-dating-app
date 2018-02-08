import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {UserModel} from '../_models/UserModel';
import {Router} from '@angular/router';

/**
 * Component responsible for rendering a registration form.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  user: UserModel;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;


  /**
   * Constructor.
   *
   * @param {AuthService} authService Reference to the service
   * @param {AlertifyService} alertifyService Reference to the service
   */
  constructor(private authService: AuthService, private alertifyService: AlertifyService,
              private formBuilderService: FormBuilder, private routerService: Router) {
  }

  // region LIFECYCLE

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  // endregion LIFECYCLE

  createRegisterForm() {
    this.registerForm = this.formBuilderService.group({
      gender: ['male'],
      userName: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(reactiveForm: FormGroup) {
    return reactiveForm.get('password').value === reactiveForm.get('confirmPassword').value
      ? null : {'mismatch': true};
  }

  /**
   * Registers the user with the help of {@link AuthService}. User feedback
   * is given with the help of {@link AlertifyService}.
   */
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService
        .register(this.user)
        .subscribe(() => {
          this.alertifyService.success('Registration successful!');
        }, error => {
          this.alertifyService.error(error);
        }, () => {
          this.authService
            .login(this.user)
            .subscribe(() => {
              this.routerService.navigate(['/members']);
            });
        });
    }
  }

  /**
   * Cancels the registration process, hides the registration form.
   */
  cancel() {
    this.cancelRegister.emit(false);
  }

}
