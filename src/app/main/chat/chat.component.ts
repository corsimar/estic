import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_core/models/User';
import { AuthService } from 'src/app/_core/services/auth.service';
import {
  addMatches,
  checkRememberMe,
  getTodayDate,
  getTodayDateWithHour,
} from '../index/index.component';
import { Message } from 'src/app/_core/models/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  name: string;

  chats: number = 0;
  chatInfo: Message[] = [];
  names: string[] = [];
  profilePhotos: string[] = [];
  read: boolean[] = [];
  selectedChat: number = -1;
  selectedChatIndex: number = -1;

  messages: Message[] = [];

  inputValue: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    checkRememberMe();
    if (this.isSignedIn()) {
      this.getChats();
    }
  }

  isSignedIn(): boolean {
    return window.localStorage.getItem('token') != null;
  }

  setSelected(fromId, toId): string {
    var targetId;
    if (fromId != parseInt(window.localStorage.getItem('userId')))
      targetId = fromId;
    else targetId = toId;

    if (this.selectedChat == targetId) {
      return 'background-color: #cc3b9023';
    } else return '';
  }

  getChats() {
    this.authService
      .getChats(parseInt(window.localStorage.getItem('userId')))
      .subscribe({
        next: (response) => {
          console.log(response);
          this.chats = response.messages.length;
          this.chatInfo = response.messages;
          this.names = response.names;
          this.profilePhotos = response.profilePhotos;
          this.read = response.read;
        },
        error: (response) => {
          console.log(response);
        },
      });
  }

  clickChat(fromId, toId, index) {
    var targetId;
    if (fromId != parseInt(window.localStorage.getItem('userId')))
      targetId = fromId;
    else targetId = toId;
    if (this.selectedChat == targetId) {
      this.selectedChat = -1;
      this.selectedChatIndex = -1;
      this.messages = [];
    } else {
      this.selectedChat = targetId;
      this.selectedChatIndex = index;
      if (!this.read[index]) this.read[index] = true;
      this.loadChat(fromId, targetId, index);
    }
  }

  loadChat(fromId, toId, index) {
    this.authService
      .loadChat(parseInt(window.localStorage.getItem('userId')), toId)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.messages = response.messages;
          if (this.selectedChat == -1) this.selectedChat = toId;
          if (this.selectedChatIndex == -1) this.selectedChatIndex = index;
          this.inputValue = '';
        },
        error: (response) => {
          console.log(response);
        },
      });
  }

  sendMessage() {
    if (this.inputValue.length == 0) return;

    const payload = {
      fromId: parseInt(window.localStorage.getItem('userId')) as number,
      toId: this.selectedChat,
      text: this.inputValue,
      dateSent: getTodayDateWithHour(),
    };

    this.authService.sendMessage(payload).subscribe({
      next: () => {
        this.loadChat(
          payload.fromId,
          this.selectedChat,
          this.selectedChatIndex
        );
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
