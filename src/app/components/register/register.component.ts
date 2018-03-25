import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {IUserModel} from '../../_models/IUserModel';
import {AuthService} from '../../_services/auth.service';
import {AlertifyService} from '../../_services/alertify.service';

/**
 * @author Petar Krastev
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  user: IUserModel;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private formBuilderService: FormBuilder,
              private routerService: Router) {
  }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

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

  cancel() {
    this.cancelRegister.emit(false);
  }
}
