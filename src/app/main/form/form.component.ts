import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(private router: Router) {}

  steps: boolean[] = [false, true, true, true, true];
  step = 0;

  ngOnInit(): void {}

  goHome() {
    this.router.navigate(['/app/index']);
  }

  goToProfile() {
    this.router.navigate(['/app/profile']);
  }

  isSignedIn(): boolean {
    return window.localStorage['token'] !== null;
  }

  selectGender(event) {
    console.log('test');
    console.log(event);
  }

  advance() {
    if (this.step == 0) {
    }
  }
}
