import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../_models/UserModel';
import {ActivatedRoute} from '@angular/router';

/**
 * Component responsible for rendering a list of {@link MemberCardComponent}s
 * which represents the users.
 */
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: UserModel[];

  /**
   * Constructor.
   *
   * @param {ActivatedRoute} routerService Reference to the activated route service
   */
  constructor(private routerService: ActivatedRoute) {
  }

  // region LIFECYCLE

  ngOnInit() {
    // Retrieve the data from the resolver
    this.routerService.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  // endregion LIFECYCLE

}
