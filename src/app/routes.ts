import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MemberListComponent} from './member-list/member-list.component';
import {MessagesComponent} from './messages/messages.component';
import {ListsComponent} from './lists/lists.component';
import {AuthGuard} from './_guards/auth.guard';

/**
 * Specifies all routes within the application.
 */
export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  /*
   * Parent route for all restricted routes. Eliminates the
   * need of boiler plate code.
   */
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent},
    ]
  },
  // Default route for the application, should be at the bottom!
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
