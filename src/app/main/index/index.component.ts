import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_core/models/User';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  name: string;
  matchesAvailable: number;
  newMessages: number = 0;
  effect = 'scrollx';
  dotPosition = 'top';
  image = [
    '/assets/algorithm.png',
    '/assets/relationship.png',
    '/assets/engagement.png',
  ];
  text = [
    'A complex ALGORITHM<br />to help you find matching people<br />and it makes it really easy for you<br />We know how hard it is to find<br />someone that connects with you<br />so we came up with a solution',
    "You have 3 MATCHES per day<br />This means you can look for a<br />match thrice per day<br />Don't rush into the first person you<br />find and don't stress out if you can't<br />find someone good enough in the first day",
    "ATTRACT appropiate people by<br />building an attractive profile<br />to catch other's eyes <br />You can also be another's<br />person match, so take your<br />time to build a worthful profile<br />And remember, BE YOURSELF!<br />in order to get appropiate matches",
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    checkRememberMe();
  }

  isSignedIn(): boolean {
    return window.localStorage.getItem('token') != null;
  }
}

export function checkRememberMe() {
  if (
    !window.localStorage.getItem('token') ||
    !window.localStorage.getItem('userId')
  ) {
    removeAll();
    return;
  }
  if (!window.sessionStorage['session']) {
    if (!window.localStorage['rememberMe']) {
      if (!window.localStorage['token']) {
        return;
      } else {
        removeAll();
      }
    } else {
      window.sessionStorage['session'] = true;
      return;
    }
  }
}

export function removeAll() {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('userId');
  window.localStorage.removeItem('rememberMe');
  window.sessionStorage.removeItem('session');
  window.sessionStorage.removeItem('alreadyChecked');
}

export function getTodayDate(): string {
  const date = new Date();

  const year = date.getFullYear() + '';
  var month = date.getMonth() + 1 + '';
  if (date.getMonth() + 1 < 10) month = '0' + month;
  var day = date.getDate() + '';
  if (date.getDate() < 10) day = '0' + day;

  return year + '-' + month + '-' + day;
}

export function getTodayDateWithHour(): string {
  const date = new Date();

  const year = date.getFullYear() + '';
  var month = date.getMonth() + 1 + '';
  if (date.getMonth() + 1 < 10) month = '0' + month;
  var day = date.getDate() + '';
  if (date.getDate() < 10) day = '0' + day;

  var hour = date.getHours() + '';
  if (date.getHours() < 10) hour = '0' + hour;
  var minute = date.getMinutes() + '';
  if (date.getMinutes() < 10) minute = '0' + minute;
  var second = date.getSeconds() + '';
  if (date.getSeconds() < 10) second = '0' + second;

  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  );
}

export function equalDates(date1: string, date2: string): boolean {
  return date1 === date2;
}

export function addMatches(userId: number, authService: AuthService) {
  if (!window.sessionStorage['alreadyChecked']) {
    window.sessionStorage.setItem('alreadyChecked', 'true');
    authService.getUser(userId).subscribe({
      next: (response) => {
        var user: User = response.user;
        var dateAdded: string = '';
        if (user.matchesAdded != null) dateAdded = user.matchesAdded;
        if (!equalDates(dateAdded, getTodayDate())) {
          user.matches = 3;
          user.matchesAdded = getTodayDate();
          authService.saveUser(user).subscribe({
            next: () => {
              console.log('Successfully refreshed matches!');
              window.sessionStorage.setItem('refresh', 'true');
            },
            error: (response) => {
              console.log(response);
            },
          });
        }
      },
      error: () => {},
    });
  }
}
