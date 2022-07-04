import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskTheCommunityComponent } from './ask-the-community/ask-the-community.component';
import { ContactSupportComponent } from './contact-support/contact-support.component';
import { HelpAndResourcesMenuComponent } from './help-and-resources-menu/help-and-resources-menu.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { LegalSummaryComponent } from './legal-summary/legal-summary.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { SubmitFeedbackComponent } from './submit-feedback/submit-feedback.component';
import { SupportForumComponent } from './support-forum/support-forum.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  {
    path: '',
    component: HelpAndResourcesMenuComponent
  },
  {
    path: 'help',
    component: HelpCenterComponent
  },
  {
    path: 'forum',
    component: SupportForumComponent
  },
  {
    path: 'videos',
    component: VideosComponent
  },
  {
    path: 'releases',
    component: ReleaseNotesComponent
  },
  {
    path: 'summary',
    component: LegalSummaryComponent
  },
  {
    path: 'feedback',
    component: SubmitFeedbackComponent
  },
  {
    path: 'community',
    component: AskTheCommunityComponent
  },
  {
    path: 'contact-support',
    component: ContactSupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpAndResourcesRoutingModule { }
