import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { TraitComponent } from './trait/trait.component';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormComponent } from './form/form.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { MatchesComponent } from './matches/matches.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ChatComponent } from './chat/chat.component';
import { ChatmessageComponent } from './chatmessage/chatmessage.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { MessageComponent } from './message/message.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NavbarComponent } from './navbar/navbar.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@NgModule({
  declarations: [
    IndexComponent,
    ProfileComponent,
    TraitComponent,
    FormComponent,
    MatchesComponent,
    ChatComponent,
    ChatmessageComponent,
    MessageComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzProgressModule,
    NzTransferModule,
    NzPopoverModule,
    NzModalModule,
    FormsModule,
    NzIconModule,
    NzBadgeModule,
    NzListModule,
    NzMessageModule,
    NzTypographyModule,
    NzToolTipModule,
    NzCarouselModule,
  ],
  exports: [NavbarComponent],
})
export class MainModule {}
