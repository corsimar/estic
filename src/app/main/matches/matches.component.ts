import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';
import { addMatches, checkRememberMe } from '../index/index.component';
import { User } from 'src/app/_core/models/User';
import { MatchPreview } from 'src/app/_core/models/MatchPreview';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  name: string;
  newMessages: number = 0;
  matchesAvailable: number;

  matches: MatchPreview[] = [];
  userIds: number[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    checkRememberMe();
    if (this.isSignedIn()) {
      this.getMatches();
    }
  }

  isSignedIn(): boolean {
    return window.localStorage.getItem('token') != null;
  }

  getHref(index) {
    this.router.navigate(['/app/profile'], {
      queryParams: { profileId: this.userIds[index], match: true },
    });
  }

  getMatches() {
    this.authService
      .getMatches(parseInt(window.localStorage.getItem('userId')))
      .subscribe({
        next: (response) => {
          for (let i = 0; i < response.matches.length; i++) {
            var matchPreview: MatchPreview = {
              name: '',
              date: '',
              profilePhotoURL: '',
            };
            this.userIds.push(response.matches[i].userId);
            matchPreview.name =
              response.matches[i].lastName +
              ' ' +
              response.matches[i].firstName;
            matchPreview.date = response.matches[i].date;
            matchPreview.profilePhotoURL = response.matches[i].profilePhotoURL;
            this.matches.push(matchPreview);
          }
        },
      });
  }
}
