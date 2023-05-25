import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addMatches, checkRememberMe } from '../index/index.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { User } from 'src/app/_core/models/User';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  matchForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  step = 0;
  tipMessage: string = 'Gender';
  errorMessage: string = '';
  profileCompleted: boolean = false;
  started: boolean = false;
  back: boolean = false;
  percentage: number = 0;
  appColor = '#cc3b90';
  matchesAvailable: number;
  titleText: string;

  personalityTraits = [
    'Adventurous',
    'Balanced',
    'Calm',
    'Charismatic',
    'Cooperative',
    'Curious',
    'Disciplined',
    'Empathetic',
    'Forgiving',
    'Generous',
    'Humble',
    'Humorous',
    'Imaginative',
    'Intuitive',
    'Logical',
    'Mature',
    'Open',
    'Optimistic',
    'Self-critical',
    'Spontaneous',
    'Youthful',
  ];
  selectedPersonalityTraits = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  selectedTraits = [];

  hobbies = [
    'Acting',
    'Art',
    'Beat boxing',
    'Blogging',
    'Computer Programming',
    'Dj-ing',
    'Entertaining',
    'Fashion',
    'Gaming',
    'Hairstyle',
    'Makeup',
    'Nail art',
    'Needlepoint',
    'Painting',
    'Pet care',
    'Photography',
    'Playing musical instrument',
    'Poetry',
    'Reading',
    'Singing',
    'Tattooing',
    'Writing',
  ];
  hobbiesList: TransferItem[] = [];
  selectedHobbies = [];

  sports = [
    'Archery',
    'Badminton',
    'Baseball',
    'Basketball',
    'Bodybuilding',
    'Bowling',
    'Boxing',
    'Canoeing',
    'Climbing',
    'Cycling',
    'Dance',
    'Golf',
    'Handball',
    'Ice Hockey',
    'Martial Arts',
    'Rugby',
    'Running',
    'Soccer',
    'Swimming',
    'Tennis',
    'Volleyball',
    'Water Polo',
  ];
  sportsList: TransferItem[] = [];
  selectedSports = [];

  musicGenres = [
    'Classical Music',
    'Country',
    'Dubstep',
    'Electro',
    'Electronic Dance Music (EDM)',
    'Hip Hop',
    'Jazz',
    'Pop',
    'R&B',
    'Rap',
    'Reggae',
    'Rock',
  ];
  musicList: TransferItem[] = [];
  selectedMusic = [];

  findMatch: boolean = false;
  nextBtnText: string = 'Next';
  previousValid: boolean = false;

  matchProfile: User = {} as User;

  ngOnInit(): void {
    checkRememberMe();
    if (this.isSignedIn()) {
      addMatches(
        parseInt(window.localStorage.getItem('userId')),
        this.authService
      );
      this.loadUser();
    }
    this.buildMatchForm();

    for (let i = 0; i < this.hobbies.length; i++) {
      this.hobbiesList.push({
        key: i.toString(),
        title: this.hobbies[i],
      });
    }

    for (let i = 0; i < this.sports.length; i++) {
      this.sportsList.push({
        key: i.toString(),
        title: this.sports[i],
      });
    }

    for (let i = 0; i < this.musicGenres.length; i++) {
      this.musicList.push({
        key: i.toString(),
        title: this.musicGenres[i],
      });
    }
  }

  goHome() {
    this.router.navigate(['/app/index']);
  }

  goToProfile() {
    this.router.navigate(['/app/profile'], {
      queryParams: { profileId: window.localStorage.getItem('userId') },
    });
  }

  isSignedIn(): boolean {
    return window.localStorage['token'] !== null;
  }

  buildMatchForm() {
    this.matchForm = this.formBuilder.group({
      gender: [null, Validators.required],
      age: [null, [Validators.required, this.onlyNumeric()]],
      height: [null, [Validators.required, this.onlyNumeric()]],
      weight: [null, [Validators.required, this.onlyNumeric()]],
      eyeColor: [null, Validators.required],
      hairColor: [null, Validators.required],
      tattoo: [null, Validators.required],
    });
  }

  get gender(): FormControl {
    return this.matchForm.get('gender') as FormControl;
  }

  get age(): FormControl {
    return this.matchForm.get('age') as FormControl;
  }

  get height(): FormControl {
    return this.matchForm.get('height') as FormControl;
  }

  get weight(): FormControl {
    return this.matchForm.get('weight') as FormControl;
  }

  get eyeColor(): FormControl {
    return this.matchForm.get('eyeColor') as FormControl;
  }

  get hairColor(): FormControl {
    return this.matchForm.get('hairColor') as FormControl;
  }

  get tattoo(): FormControl {
    return this.matchForm.get('tattoo') as FormControl;
  }

  selectGender(event) {
    console.log(event);
  }

  hide(index): boolean {
    if (index != this.step) return true;
    return false;
  }

  getPersonalityTraitsCount() {
    var c = 0;
    for (let i = 0; i < this.selectedPersonalityTraits.length; i++) {
      if (this.selectedPersonalityTraits[i]) c++;
    }
    return c;
  }

  selectPersonality(event) {
    var element = event.target;
    if (element.parentElement.className === 'trait')
      element = element.parentElement;
    else element = element.parentElement.parentElement;

    var id = parseInt(element.parentElement.id);
    if (Number.isNaN(id)) return;
    if (!this.selectedPersonalityTraits[id]) {
      if (this.getPersonalityTraitsCount() >= 6) return;
      element.style.backgroundColor = '#cc3b9025';
      element.style.border = '1px solid #cc3b90';
      element.style.padding = '0px 8px 0px 8px';
      var trait =
        element.parentNode.children[0].childNodes[1].childNodes[0].innerText;
      this.selectedTraits.push(trait);
    } else {
      var trait =
        element.parentNode.children[0].childNodes[1].childNodes[0].innerText;
      this.selectedTraits.splice(this.selectedTraits.indexOf(trait), 1);
      element.style.backgroundColor = 'white';
      element.style.border = 'none';
      element.style.padding = '0px';
    }
    this.selectedPersonalityTraits[id] = !this.selectedPersonalityTraits[id];
  }

  arrayToString(arr: Array<string>): string {
    var r: string = '';
    for (let i = 0; i < arr.length; i++) {
      r += arr[i];
      if (i < arr.length - 1) r += ';';
    }
    return r;
  }

  stringToArray(str: string): Array<string> {
    var arr = [];
    var index;
    while ((index = str.indexOf(';')) != -1) {
      arr.push(str.substring(0, index));
      str = str.substring(index + 1);
    }
    arr.push(str);
    return arr;
  }

  canAdvance(): string {
    if (this.step == 0) {
      if (!this.gender.valid) return 'You must select a gender!';
      return '';
    } else if (this.step == 1) {
      if (!this.age.valid) return 'Age must be between 18 and 70.';
      else {
        if (this.age.value.length == 2) {
          var age = parseInt(this.age.value);
          if (age < 18 || age > 70) return 'Age must be between 18 and 70.';
        } else {
          if (!this.verifyValues(this.age.value, 18, 70))
            return 'Age must be between 18 and 70.';
        }
      }
    } else if (this.step == 2) {
      if (!this.height.valid) return 'Height must be between 100 and 300 cm.';
      else {
        if (this.height.value.length == 2 || this.height.value.length == 3) {
          var height = parseInt(this.height.value);
          if (height < 100 || height > 300)
            return 'Height must be between 100 and 300 cm.';
        } else {
          if (!this.verifyValues(this.height.value, 100, 300))
            return 'Height must be between 100 and 300 cm.';
        }
      }
    } else if (this.step == 3) {
      if (!this.weight.valid) return 'Weight must be between 30 and 300 kg.';
      else {
        if (this.weight.value.length == 2 || this.weight.value.length == 3) {
          var weight = parseInt(this.weight.value);
          if (weight < 30 || weight > 300)
            return 'Weight must be between 30 and 300 kg.';
        } else {
          if (!this.verifyValues(this.weight.value, 30, 300))
            return 'Weight must be between 30 and 300 kg.';
        }
      }
    } else if (this.step == 4) {
      if (!this.eyeColor.valid) return 'You must select an option!';
    } else if (this.step == 5) {
      if (!this.hairColor.valid) return 'You must select an option!';
    } else if (this.step == 6) {
      if (!this.tattoo.valid) return 'You must select an option!';
    }
    return '';
  }

  advance() {
    if (this.percentage >= 100) {
      this.findMatch = true;

      const payload = {
        userId: 0,
        firstName: '',
        lastName: '',
        gender: this.matchProfile.gender,
        profileCompleted: false,
        profilePhotoURL: '',
        age: this.matchProfile.age,
        height: this.matchProfile.height,
        weight: this.matchProfile.weight,
        eyeColor: this.matchProfile.eyeColor,
        hairColor: this.matchProfile.hairColor,
        tattoo: this.matchProfile.tattoo,
        personalityTraits: this.matchProfile.personalityTraits,
        hobbies: this.matchProfile.hobbies,
        sports: this.matchProfile.sports,
        music: this.matchProfile.music,
        instagramURL: '',
        facebookURL: '',
        twitterURL: '',
        matches: 0,
        matchesAdded: '',
        email: '',
        password: '',
      };

      this.authService
        .findMatch(window.localStorage.getItem('userId'), payload)
        .subscribe({
          next: (response) => {
            const r = JSON.parse(response);
            const matchId = r.match;
            this.router.navigate(['/app/profile'], {
              queryParams: { profileId: matchId, match: true },
            });
            window.sessionStorage.setItem('refresh', 'true');
          },
          error: (response) => {
            this.tipMessage = response.error;
            this.back = true;
            window.sessionStorage.setItem('refresh', 'true');
          },
        });

      return;
    }
    var err: string;
    if ((err = this.canAdvance()) !== '') {
      this.errorMessage = err;
      return;
    }
    this.errorMessage = '';
    if (this.step == 0) {
      this.tipMessage =
        'Age: you can either write the age exactly (example: 23) or write an interval like this 20-24.';
      this.matchProfile.gender = this.gender.value;
      this.previousValid = true;
      document.getElementById('nextBtn').style.columnGap = '48px';
    } else if (this.step == 1) {
      this.tipMessage =
        'Height (cm): you can either write the height exactly (example: 175) or write an interval like this 170-185.';
      this.matchProfile.age = this.convertIntoNumber(this.age.value);
    } else if (this.step == 2) {
      this.tipMessage =
        'Weight (kg): you can either write the weight exactly (example: 60) or write an interval like this 70-85.';
      this.matchProfile.height = this.convertIntoNumber(this.height.value);
    } else if (this.step == 3) {
      this.tipMessage = 'Eye color';
      this.matchProfile.weight = this.convertIntoNumber(this.weight.value);
    } else if (this.step == 4) {
      this.tipMessage = 'Hair color';
      this.matchProfile.eyeColor = this.eyeColor.value;
    } else if (this.step == 5) {
      this.tipMessage = 'Tattoos';
      this.matchProfile.hairColor = this.hairColor.value;
    } else if (this.step == 6) {
      this.tipMessage =
        'Personality traits: you can choose no trait or up to a maximum of 6';
      this.matchProfile.tattoo = this.tattoo.value;
    } else if (this.step == 7) {
      this.tipMessage =
        'Hobbies: you can choose as many as you want or none at all';
      this.matchProfile.personalityTraits = this.arrayToString(
        this.selectedTraits
      );
    } else if (this.step == 8) {
      for (let i = 0; i < this.hobbiesList.length; i++) {
        if (this.hobbiesList[i].direction === 'right') {
          this.selectedHobbies.push(this.hobbiesList[i].title);
        }
      }
      this.tipMessage =
        'Sports: you can choose as many as you want or none at all';
      this.matchProfile.hobbies = this.arrayToString(this.selectedHobbies);
    } else if (this.step == 9) {
      for (let i = 0; i < this.sportsList.length; i++) {
        if (this.sportsList[i].direction === 'right') {
          this.selectedSports.push(this.sportsList[i].title);
        }
      }
      this.tipMessage =
        'Music: you can choose as many as you want or none at all';
      this.matchProfile.sports = this.arrayToString(this.selectedSports);
    } else if (this.step == 10) {
      for (let i = 0; i < this.musicList.length; i++) {
        if (this.musicList[i].direction === 'right') {
          this.selectedMusic.push(this.musicList[i].title);
        }
      }
      this.matchProfile.music = this.arrayToString(this.selectedMusic);
      this.tipMessage = '';
    }
    this.step++;
    this.percentage = Math.floor((this.step / 11) * 100);
    if (this.percentage >= 100) {
      this.nextBtnText = 'Find match';
      this.previousValid = false;
      document.getElementById('nextBtn').style.columnGap = '0px';
    }
  }

  previous() {
    this.step--;
    this.percentage = Math.floor((this.step / 11) * 100);
    if (this.step == 0) {
      this.previousValid = false;
      document.getElementById('nextBtn').style.columnGap = '0px';
      this.tipMessage = 'Gender';
    } else if (this.step == 1) {
      this.tipMessage =
        'Age: you can either write the age exactly (example: 23) or write an interval like this 20-24.';
    } else if (this.step == 2) {
      this.tipMessage =
        'Height (cm): you can either write the height exactly (example: 175) or write an interval like this 170-185.';
    } else if (this.step == 3) {
      this.tipMessage =
        'Weight (kg): you can either write the weight exactly (example: 60) or write an interval like this 70-85.';
    } else if (this.step == 4) {
      this.tipMessage = 'Eye color';
    } else if (this.step == 5) {
      this.tipMessage = 'Hair color';
    } else if (this.step == 6) {
      this.tipMessage = 'Tattoos';
    } else if (this.step == 7) {
      this.tipMessage =
        'Personality traits: you can choose no trait or up to a maximum of 6';
    } else if (this.step == 8) {
      this.tipMessage =
        'Hobbies: you can choose as many as you want or none at all';
    } else if (this.step == 9) {
      this.tipMessage =
        'Sports: you can choose as many as you want or none at all';
    }
  }

  startForm() {
    this.started = true;
  }

  isFormStarted() {
    return this.profileCompleted && this.started;
  }

  verifyValues(val: string, a: number, b: number): boolean {
    var f2 = 100;
    if (parseInt(val.slice(val.indexOf('-') + 1)) > 99) f2 = 1000;

    const v = parseInt(
      val.slice(0, val.indexOf('-')).concat(val.slice(val.indexOf('-') + 1))
    );

    var val1: number = v / f2;
    var val2 = v % f2;

    if (val1 < a || val1 > b || val2 < a || val2 > b || val1 >= val2)
      return false;
    return true;
  }

  convertIntoNumber(val: string): number {
    if (val.indexOf('-') == -1) return parseInt(val);
    var s: string;
    s = val.slice(0, val.indexOf('-')).concat(val.slice(val.indexOf('-') + 1));
    return parseInt(s);
  }

  onlyNumeric(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasDash =
        value.indexOf('-') == value.lastIndexOf('-') &&
        value.indexOf('-') != -1;

      var newValue;

      if (hasDash) {
        newValue = value
          .slice(0, value.indexOf('-'))
          .concat(value.slice(value.indexOf('-') + 1));
      } else {
        newValue = value;
      }

      const numericValid =
        /^\d+$/.test(newValue) && newValue.substring(0, 1) !== '0';

      return !numericValid ? { numericStrength: true } : null;
    };
  }

  loadUser() {
    this.authService.getUser(window.localStorage.getItem('userId')).subscribe({
      next: (response) => {
        var user: User = response.user;
        this.profileCompleted = user.profileCompleted;
        this.matchesAvailable = user.matches as number;
        if (!this.profileCompleted) {
          this.titleText = 'You must set up your profile first!';
        } else if (this.matchesAvailable > 0) {
          this.titleText =
            'Complete this form to find a matching person (' +
            this.matchesAvailable +
            ' matches left today)';
        } else {
          this.titleText = 'All matches for this day were used!';
        }
      },
    });
  }
}
