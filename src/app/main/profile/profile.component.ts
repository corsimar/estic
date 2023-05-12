import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileCompleted: boolean = true;

  infoMessage: string =
    'This is how others will see your profile<br>You can edit it anytime by clicking on an attribute';
  tipMessage: string = '';

  nextBtnValid: boolean = false;
  previousValid: boolean = false;

  setup: boolean = false;

  image: boolean = false;
  imageValid: boolean = false;

  physicalForm: FormGroup;
  physical: boolean = false;

  personality: boolean = false;
  personalityTraits = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
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

  leisure: boolean = false;

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

  contact: boolean = false;
  contactForm: FormGroup;

  input: any;
  inputNumber: boolean = false;

  infoMessages = [
    "It looks like you didn't set up your profile yet!",
    'Upload an image with yourself to use as profile photo',
    'Tell us about your physical appearance',
    'Choose the personality traits that suits you the most',
    'Tell us about your hobbies, sports you play and music you listen to',
    'Provide us with your contact info so people can reach you',
    'You finished setting up your profile! You can edit it anytime',
  ];
  tipMessages = [
    '',
    'Choose an appropriate photo to fit in the circle',
    '',
    'Choose between 3 and 6 personality traits you think suits you best (0/6)',
    'What you do in your free time says a lot about yourself',
    'You must complete at least one field in order to advance',
    '',
  ];
  messageIndex = 0;

  percentage = 0;
  appColor = '#dd65ab';

  editSelect: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.buildContactForm();
    if (!this.profileCompleted) {
      this.setMessages();

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
  }

  buildForm() {
    this.physicalForm = this.formBuilder.group({
      age: [
        null,
        [
          Validators.required,
          Validators.min(18),
          Validators.max(70),
          onlyNumeric(),
        ],
      ],
      height: [
        null,
        [
          Validators.required,
          Validators.min(50),
          Validators.max(300),
          onlyNumeric(),
        ],
      ],
      weight: [
        null,
        [
          Validators.required,
          Validators.min(30),
          Validators.max(300),
          onlyNumeric(),
        ],
      ],
      eyesColor: [null],
      hairColor: [null],
      tattoos: [null],
    });
  }

  buildContactForm() {
    this.contactForm = this.formBuilder.group({
      instagram: [null, null],
      facebook: [null, null],
      twitter: [null, null],
    });
  }

  get instagram(): FormControl {
    return this.contactForm.get('instagram') as FormControl;
  }

  get facebook(): FormControl {
    return this.contactForm.get('facebook') as FormControl;
  }

  get twitter(): FormControl {
    return this.contactForm.get('twitter') as FormControl;
  }

  goHome() {
    this.router.navigate(['/app/index']);
  }

  goToProfile() {
    this.router.navigate(['/app/profile']);
  }

  isSignedIn(): boolean {
    return window.localStorage['token'] !== null;
  }

  setMessages(): void {
    this.infoMessage = this.infoMessages[this.messageIndex];
    this.tipMessage = this.tipMessages[this.messageIndex];
  }

  getInfoMessage(): string {
    return this.infoMessage;
  }

  loadImage(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      //this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      //this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      //this.msg = "";
      document.getElementById('photo').style.backgroundImage =
        'url(' + reader.result + ')';
      this.imageValid = true;
    };
  }

  updateProfile(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      //this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      //this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      //this.msg = "";
      document.getElementById('profilePhoto').style.backgroundImage =
        'url(' + reader.result + ')';
      this.imageValid = true;
    };
  }

  advance() {
    if (!this.setup) {
      this.setup = true;
      this.image = true;
      this.nextBtnValid = true;
      this.messageIndex++;
      this.setMessages();
      return;
    }
    if (this.image) {
      if (!this.imageValid) return;
      this.image = false;
      this.physical = true;
      this.percentage = 20;
      this.messageIndex++;
      this.setMessages();
      this.previousValid = true;
      document.getElementById('nextBtnArea').style.columnGap = '48px';
      return;
    }
    if (this.physical) {
      if (this.physicalForm.invalid) return;
      this.physical = false;
      this.personality = true;
      this.percentage = 40;
      this.messageIndex++;
      this.setMessages();
      return;
    }
    if (this.personality) {
      if (
        this.getPersonalityTraitsCount() < 3 ||
        this.getPersonalityTraitsCount() > 6
      )
        return;
      this.personality = false;
      this.leisure = true;
      this.percentage = 60;
      this.messageIndex++;
      this.setMessages();
      return;
    }
    if (this.leisure) {
      this.leisure = false;
      this.contact = true;
      this.percentage = 80;
      this.messageIndex++;
      this.setMessages();
      return;
    }
    if (this.contact) {
      if (
        this.instagram.value.length < 3 &&
        this.facebook.value.length < 3 &&
        this.twitter.value.length < 3
      )
        return;
      this.contact = false;
      this.percentage = 100;
      this.messageIndex++;
      this.setMessages();
      this.nextBtnValid = false;
      return;
    }
  }

  previous() {
    if (this.physical) {
      this.physical = false;
      this.image = true;
      this.percentage = 0;
      this.messageIndex--;
      this.setMessages();
      this.previousValid = false;
      document.getElementById('nextBtnArea').style.columnGap = '0px';
      return;
    }
    if (this.personality) {
      this.personality = false;
      this.physical = true;
      this.percentage = 20;
      this.messageIndex--;
      this.setMessages();
    }
    if (this.leisure) {
      this.leisure = false;
      this.personality = true;
      this.percentage = 40;
      this.messageIndex--;
      this.setMessages();
      return;
    }
    if (this.contact) {
      this.contact = false;
      this.leisure = true;
      this.percentage = 60;
      this.messageIndex--;
      this.setMessages();
      return;
    }
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
    if (!this.selectedPersonalityTraits[id]) {
      if (this.getPersonalityTraitsCount() >= 6) return;
      element.style.backgroundColor = '#cc3b9025';
      element.style.border = '1px solid #cc3b90';
    } else {
      element.style.backgroundColor = 'white';
      element.style.border = 'none';
    }
    this.selectedPersonalityTraits[id] = !this.selectedPersonalityTraits[id];
    this.tipMessage =
      'Choose between 3 and 6 personality traits you think suits you best (' +
      this.getPersonalityTraitsCount() +
      '/6)';
  }

  select(event) {}

  change(event) {}

  isVisible = false;
  traitModified = -1;
  inp: any;
  eyesList = [
    'Select',
    'Prefer not to mention',
    'Brown',
    'Blue',
    'Green',
    'Gray',
    'Hazel',
  ];
  hairList = [
    'Select',
    'Prefer not to mention',
    'Blonde',
    'Brunette',
    'Red',
    'Black',
  ];
  tattoosList = ['Select', 'Prefer not to mention', 'Yes', 'No'];

  selectList = [];

  showModal(index): void {
    this.isVisible = true;
    this.traitModified = index;
    if (this.traitModified >= 0 && this.traitModified <= 2)
      this.editSelect = false;
    else {
      this.editSelect = true;
      if (this.traitModified == 3) this.selectList = this.eyesList;
      else if (this.traitModified == 4) this.selectList = this.hairList;
      else if (this.traitModified == 5) this.selectList = this.tattoosList;
    }
  }

  editProfile(event) {
    this.inp = event.target;
  }

  handleOk(): void {
    if (this.inp == null) {
      this.isVisible = false;
      return;
    }
    var inpVal = this.inp.value;
    if (this.traitModified == 0) {
      if (!this.isNumeric(inpVal)) {
        alert('Age must contain only digits.');
        this.handleCancel();
        return;
      }
      var v = parseInt(inpVal);
      if (v < 18 || v > 70) {
        alert('Valid ages are between 18 and 70.');
        this.handleCancel();
        return;
      }
      document.getElementById('age').innerHTML = inpVal;
    } else if (this.traitModified == 1) {
      if (!this.isNumeric(inpVal)) {
        alert('Height must contain only digits.');
        this.handleCancel();
        return;
      }
      var v = parseInt(inpVal);
      if (v < 50 || v > 300) {
        alert('Valid heights are between 50 and 300.');
        this.handleCancel();
        return;
      }
      document.getElementById('height').innerHTML = inpVal + ' cm';
    } else if (this.traitModified == 2) {
      if (!this.isNumeric(inpVal)) {
        alert('Weight must contain only digits.');
        this.handleCancel();
        return;
      }
      var v = parseInt(inpVal);
      if (v < 30 || v > 300) {
        alert('Valid weights are between 30 and 300.');
        this.handleCancel();
        return;
      }
      document.getElementById('weight').innerHTML = inpVal + ' kg';
    } else if (this.traitModified == 3) {
      if (inpVal === 'Select') {
        this.handleCancel();
        return;
      }
      document.getElementById('eyeColor').innerHTML = inpVal;
    } else if (this.traitModified == 4) {
      if (inpVal === 'Select') {
        this.handleCancel();
        return;
      }
      document.getElementById('hairColor').innerHTML = inpVal;
    } else if (this.traitModified == 5) {
      if (inpVal === 'Select') {
        this.handleCancel();
        return;
      }
      document.getElementById('tattoos').innerHTML = inpVal;
    }
    this.handleCancel();
  }

  isNumeric(value): boolean {
    return /^\d+$/.test(value) && value.substring(0, 1) !== '0';
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

export function onlyNumeric(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const passwordValid = /^\d+$/.test(value) && value.substring(0, 1) !== '0';

    return !passwordValid ? { passwordStrength: true } : null;
  };
}
