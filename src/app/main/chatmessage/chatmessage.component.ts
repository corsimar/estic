import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_core/models/Message';

@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrls: ['./chatmessage.component.scss'],
})
export class ChatmessageComponent implements OnInit {
  @Input() name: string;
  @Input() chatInfo: Message;
  @Input() profilePhotoURL: string;
  @Input() background: string;
  @Input() read: boolean;

  constructor() {}

  ngOnInit(): void {}

  getPhoto(): string {
    return 'background-image: url(' + this.profilePhotoURL + ')';
  }

  getStyle(): string {
    if (!this.read) {
      return 'font-weight: bold';
    } else return '';
  }

  getText(): string {
    if (parseInt(window.localStorage.getItem('userId')) == this.chatInfo.fromId)
      return 'You: ' + this.chatInfo.text;
    else return this.chatInfo.text;
  }
}
