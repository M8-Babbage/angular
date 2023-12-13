import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SplitterModule } from 'primeng/splitter';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    SplitterModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule
  ],
  imports: [
    RouterModule,
  ]
})
export class PrimeNgModule { }
