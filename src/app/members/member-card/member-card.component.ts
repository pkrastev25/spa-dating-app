import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../_models/UserModel';

/**
 * Component responsible for rendering a user card - user photo, nickname
 * and navigational buttons for further options.
 */
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: UserModel;

  /**
   * Constructor.
   */
  constructor() {
  }

  // region LIFECYCLE

  ngOnInit() {
  }

  // endregion LIFECYCLE

}
