import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MemberEditComponent} from '../members/member-edit/member-edit.component';

/**
 * Route guard responsible for preserving the unsaved changes inside the
 * {@link MemberEditComponent} when rerouting.
 */
@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {

  /**
   * Verifies whether the user has unsaved changes during a reroute. If so,
   * a dialog is shown to the user asking him whether he would still want
   * to reroute.
   *
   * @param {MemberEditComponent} component Reference to the component
   * @param {ActivatedRouteSnapshot} currentRoute Contains information about the current route
   * @param {RouterStateSnapshot} currentState Contains information about the current state
   * @param {RouterStateSnapshot} nextState Contains information about the next state
   * @returns {Observable<boolean> | Promise<boolean> | boolean} True if the user can reroute, false otherwise
   */
  canDeactivate(component: MemberEditComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (component.editForm.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost!');
    }

    return true;
  }

}
