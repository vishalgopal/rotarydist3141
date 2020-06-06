import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)},
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'myclub', loadChildren: './myclub/myclub.module#MyclubPageModule' },
  { path: 'team', loadChildren: './myclub/team/team.module#TeamPageModule' },
  { path: 'team/:id', loadChildren: './myclub/team-details/team-details.module#TeamDetailsPageModule' },
  { path: 'personal-details', loadChildren: './profile/personal-details/personal-details.module#PersonalDetailsPageModule' },
  { path: 'business-details', loadChildren: './profile/business-details/business-details.module#BusinessDetailsPageModule' },
  { path: 'family-details', loadChildren: './profile/family-details/family-details.module#FamilyDetailsPageModule' },
  { path: 'club-details', loadChildren: './profile/club-details/club-details.module#ClubDetailsPageModule' },
  { path: 'district-details', loadChildren: './profile/district-details/district-details.module#DistrictDetailsPageModule' },
  { path: 'resources', loadChildren: './myclub/resources/resources.module#ResourcesPageModule' },
  { path: 'events', loadChildren: './events/events.module#EventsPageModule' },
  { path: 'event-details', loadChildren: './events/event-details/event-details.module#EventDetailsPageModule' },
  { path: 'meetings', loadChildren: './meetings/meetings.module#MeetingsPageModule' },
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsPageModule' },
  { path: 'fundraisers', loadChildren: './fundraisers/fundraisers.module#FundraisersPageModule' },
  { path: 'announcements', loadChildren: './announcements/announcements.module#AnnouncementsPageModule' },
  { path: 'newsletters', loadChildren: './newsletters/newsletters.module#NewslettersPageModule' },
  { path: 'add-announcement', loadChildren: './announcements/add-announcement/add-announcement.module#AddAnnouncementPageModule' },
  { path: 'add-newsletter', loadChildren: './newsletters/add-newsletter/add-newsletter.module#AddNewsletterPageModule' },
  { path: 'add-event', loadChildren: './events/add-event/add-event.module#AddEventPageModule' },
  { path: 'add-meeting', loadChildren: './meetings/add-meeting/add-meeting.module#AddMeetingPageModule' },
  { path: 'add-project', loadChildren: './projects/add-project/add-project.module#AddProjectPageModule' },
  { path: 'add-fundraiser', loadChildren: './fundraisers/add-fundraiser/add-fundraiser.module#AddFundraiserPageModule' },
  { path: 'members', loadChildren: './members/members.module#MembersPageModule' },
  { path: 'blog', loadChildren: './blog/blog.module#BlogPageModule' },
  { path: 'blog-list', loadChildren: './blog/blog-list/blog-list.module#BlogListPageModule' },
  { path: 'blog-details', loadChildren: './blog/blog-details/blog-details.module#BlogDetailsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'edit-event', loadChildren: './edit-event/edit-event.module#EditEventPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'rmb', loadChildren: './rmb/rmb.module#RmbPageModule' },
  { path: 'rmb-details/:id', loadChildren: './rmb/rmb-details/rmb-details.module#RmbDetailsPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'district-directory', loadChildren: './district-directory/district-directory.module#DistrictDirectoryPageModule' },
  { path: 'gml', loadChildren: './gml/gml.module#GmlPageModule' },
  { path: 'collect-donation', loadChildren: './collect-donation/collect-donation.module#CollectDonationPageModule' },
  { path: 'member-fee', loadChildren: './member-fee/member-fee.module#MemberFeePageModule' },
  { path: 'blocked-users', loadChildren: './blocked-users/blocked-users.module#BlockedUsersPageModule' },
  { path: 'chat-view', loadChildren: './chat-view/chat-view.module#ChatViewPageModule' },
  { path: 'groupchat-view', loadChildren: './groupchat-view/groupchat-view.module#GroupchatViewPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
