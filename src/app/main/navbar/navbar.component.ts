import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addMatches, checkRememberMe } from '../index/index.component';
import { AuthService } from 'src/app/_core/services/auth.service';
import { User } from 'src/app/_core/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  name: string;
  matchesAvailable: number;
  newMessages: number = 0;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    checkRememberMe();
    if (this.isSignedIn()) {
      addMatches(
        parseInt(window.localStorage.getItem('userId')),
        this.authService
      );
      this.loadUser();
      this.checkMessages();
    }

    setInterval(() => {
      if (window.sessionStorage.getItem('refresh') === 'true') {
        window.sessionStorage.removeItem('refresh');
        this.loadUser();
      }
    }, 500);
  }

  goHome() {
    this.router.navigate(['/app/index']);
  }

  goToSignUp() {
    this.router.navigate(['/auth/register']);
  }

  goToSignIn() {
    this.router.navigate(['/auth/login']);
  }

  goToMatchForm() {
    this.router.navigate(['/app/match']);
  }

  goToChat() {
    this.router.navigate(['/app/chat']);
  }

  goToProfile() {
    this.router.navigate(['/app/profile'], {
      queryParams: {
        profileId: parseInt(window.localStorage.getItem('userId')),
      },
    });
  }

  goToMatches() {
    this.router.navigate(['/app/matches']);
  }

  signOut() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('rememberMe');
    window.localStorage.removeItem('userId');
    window.sessionStorage.removeItem('session');
    this.router.navigate(['/app/index']);
  }

  isSignedIn(): boolean {
    return window.localStorage.getItem('token') != null;
  }

  checkMessages() {
    this.authService
      .getNewMessagesCount(window.localStorage.getItem('userId'))
      .subscribe({
        next: (response) => {
          this.newMessages = response.messageCount;
        },
      });
  }

  loadUser() {
    this.authService.getUser(window.localStorage.getItem('userId')).subscribe({
      next: (response) => {
        var user: User = response.user;
        this.name = user.lastName + ' ' + user.firstName;
        this.matchesAvailable = user.matches as number;

        var url: string;
        if (user.profilePhotoURL != null)
          url = 'url(' + user.profilePhotoURL + ')';
        else url = '/assets/user.png';
        document.getElementById('navPhoto').style.backgroundImage = url;

        addMatches(
          parseInt(window.localStorage.getItem('userId')),
          this.authService
        );
      },
    });
  }
}
