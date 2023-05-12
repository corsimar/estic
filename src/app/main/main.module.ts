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

@NgModule({
  declarations: [
    IndexComponent,
    ProfileComponent,
    TraitComponent,
    FormComponent,
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
  ],
})
export class MainModule {}
