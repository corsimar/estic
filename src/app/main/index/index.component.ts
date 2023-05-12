import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goHome() {
    this.router.navigate(['/app/index']);
  }

  goToSignUp() {
    this.router.navigate(['/auth/register']);
  }

  goToSignIn() {
    this.router.navigate(['/auth/login']);
  }

  goToProfile() {
    this.router.navigate(['/app/profile']);
  }

  isSignedIn(): boolean {
    return window.localStorage['token'] !== null;
  }
}
