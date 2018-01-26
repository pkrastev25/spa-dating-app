import {Component, OnInit} from '@angular/core';

/**
 * Component responsible for rendering a generic (home) layout or the
 * register component.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * If true, it will render the home component, if false - register component
   *
   * @type {boolean}
   */
  registerMode = false;

  /**
   * Constructor.
   */
  constructor() {
  }

  // region LIFECYCLE

  ngOnInit() {
  }

  // endregion LIFECYCLE

  /**
   * Enables rendering of the register component.
   */
  registerToggle() {
    this.registerMode = true;
  }

  /**
   * Setter.
   *
   * @param {boolean} registerMode If true, it will show the register component, if false - home component
   */
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
