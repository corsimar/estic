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
import { ActivatedRoute, Router } from '@angular/router';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { checkRememberMe, getTodayDate } from '../index/index.component';
import { AuthService } from 'src/app/_core/services/auth.service';
import { User } from 'src/app/_core/models/User';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileCompleted: boolean = false;

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
    'Complete at least a field. A completed field must contain between 3 and 25 characters',
    '',
  ];
  messageIndex = 0;

  percentage = 0;
  appColor = '#dd65ab';

  userProfile: User = null;

  name: string;

  selectForm: FormGroup;

  profileId: number = -1;
  match: boolean = false;
  modalTitle: string = 'Edit your profile';
  writeFirstMessage: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService
  ) {
    this.activatedRoute.queryParams.subscribe((response) => {
      if (response['profileId'] != null) {
        this.profileId = response['profileId'];
        this.match = response['match'];
      } else {
        this.router.navigate(['/app/index']);
      }
    });
  }

  ngOnInit(): void {
    checkRememberMe();
    this.buildForm();
    this.buildContactForm();
    this.buildSelectForm();
    if (this.isSignedIn()) {
      this.loadUser();
    }
    if (!this.profileCompleted) {
      this.setMessages();
    }
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
          Validators.min(100),
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

  get age(): FormControl {
    return this.physicalForm.get('age') as FormControl;
  }

  get height(): FormControl {
    return this.physicalForm.get('height') as FormControl;
  }

  get weight(): FormControl {
    return this.physicalForm.get('weight') as FormControl;
  }

  get eyeColor(): FormControl {
    return this.physicalForm.get('eyesColor') as FormControl;
  }

  get hairColor(): FormControl {
    return this.physicalForm.get('hairColor') as FormControl;
  }

  get tattoo(): FormControl {
    return this.physicalForm.get('tattoos') as FormControl;
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

  buildSelectForm() {
    this.selectForm = this.formBuilder.group({
      selectedItem: [null, null],
    });
  }

  get selectedItem(): FormControl {
    return this.selectForm.get('selectedItem') as FormControl;
  }

  setDefaultItem(value) {
    this.selectForm.setValue({
      selectedItem: value,
    });
  }

  goToProfile() {
    if (this.router.url.includes('/app/profile')) {
      this.router.navigate(['/app/profile'], {
        queryParams: { profileId: window.localStorage.getItem('userId') },
      });
      //.then(() => window.location.reload());
    } else {
      this.router.navigate(['/app/profile'], {
        queryParams: { profileId: window.localStorage.getItem('userId') },
      });
    }
  }

  goToMatches() {
    this.router.navigate(['/app/matches']);
  }

  goToMatchForm() {
    this.router.navigate(['/app/match']);
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
      this.userProfile.profilePhotoURL = reader.result.toString();
      this.imageValid = true;
    };
  }

  updateProfile(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      document.getElementById('profilePhoto').style.backgroundImage =
        'url(' + reader.result + ')';
      this.userProfile.profilePhotoURL = reader.result.toString();
      this.saveUser();
      window.sessionStorage.setItem('refresh', 'true');
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

      this.userProfile.age = this.age.value;
      this.userProfile.height = this.height.value;
      this.userProfile.weight = this.weight.value;
      this.userProfile.eyeColor = this.eyeColor.value;
      if (this.userProfile.eyeColor == null)
        this.userProfile.eyeColor = 'prefer not to mention';
      this.userProfile.hairColor = this.hairColor.value;
      if (this.userProfile.hairColor == null)
        this.userProfile.hairColor = 'prefer not to mention';
      this.userProfile.tattoo = this.tattoo.value;
      if (this.userProfile.tattoo == null)
        this.userProfile.tattoo = 'prefer not to mention';
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

      this.userProfile.personalityTraits = this.arrayToString(
        this.selectedTraits
      );
      return;
    }
    if (this.leisure) {
      this.leisure = false;
      this.contact = true;
      this.percentage = 80;
      this.messageIndex++;
      this.setMessages();

      this.leisureToString();
      return;
    }
    if (this.contact) {
      if (
        this.instagram.value == null &&
        this.facebook.value == null &&
        this.twitter.value == null
      )
        return;
      if (
        this.instagram.value.length != 0 &&
        (this.instagram.value.length < 3 || this.instagram.value.length > 25)
      )
        return;
      if (
        this.facebook.value.length != 0 &&
        (this.facebook.value.length < 3 || this.facebook.value.length > 25)
      )
        return;
      if (
        this.twitter.value.length != 0 &&
        (this.twitter.value.length < 3 || this.twitter.value.length > 25)
      )
        return;
      this.contact = false;
      this.percentage = 100;
      this.messageIndex++;
      this.setMessages();
      this.nextBtnValid = false;

      this.userProfile.instagramURL = this.instagram.value;
      if (this.userProfile.instagramURL == null)
        this.userProfile.instagramURL = '';
      this.userProfile.facebookURL = this.facebook.value;
      if (this.userProfile.facebookURL == null)
        this.userProfile.facebookURL = '';
      this.userProfile.twitterURL = this.twitter.value;
      if (this.userProfile.twitterURL == null) this.userProfile.twitterURL = '';

      this.profileCompleted = true;
      this.userProfile.profileCompleted = true;
      this.userProfile.matches = 3;
      this.userProfile.matchesAdded = getTodayDate();

      this.saveUser();
      this.setProfile();
      this.setup = false;

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
      if (this.selectedTraits.length == 3 && this.profileCompleted) {
        alert("You can't have less than 3 traits selected!");
        return;
      }
      var trait =
        element.parentNode.children[0].childNodes[1].childNodes[0].innerText;
      this.selectedTraits.splice(this.selectedTraits.indexOf(trait), 1);
      element.style.backgroundColor = 'white';
      element.style.border = 'none';
      element.style.padding = '0px';
    }
    this.selectedPersonalityTraits[id] = !this.selectedPersonalityTraits[id];
    if (!this.profileCompleted) {
      this.tipMessage =
        'Choose between 3 and 6 personality traits you think suits you best (' +
        this.getPersonalityTraitsCount() +
        '/6)';
    }
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

  leisureToString() {
    for (let i = 0; i < this.hobbiesList.length; i++) {
      if (this.hobbiesList[i].direction === 'right') {
        this.selectedHobbies.push(this.hobbiesList[i].title);
      }
    }
    for (let i = 0; i < this.sportsList.length; i++) {
      if (this.sportsList[i].direction === 'right') {
        this.selectedSports.push(this.sportsList[i].title);
      }
    }
    for (let i = 0; i < this.musicList.length; i++) {
      if (this.musicList[i].direction === 'right') {
        this.selectedMusic.push(this.musicList[i].title);
      }
    }
    this.userProfile.hobbies = this.arrayToString(this.selectedHobbies);
    this.userProfile.sports = this.arrayToString(this.selectedSports);
    this.userProfile.music = this.arrayToString(this.selectedMusic);
  }

  userName: string;
  ageText: string;
  heightText: string;
  weightText: string;
  eyeColorText: string;
  hairColorText: string;
  tattooText: string;
  userPersonalityTraits = [];
  userHobbies = [];
  userSports = [];
  userMusic = [];
  userInstagram = '';
  userFacebook = '';
  userTwitter = '';
  isVisible = false;
  traitModified = -1;
  firstInput: any;
  secondInput: any;
  firstInputValue: string = '';
  secondInputValue: string = '';
  firstPlaceholder = '';
  firstInputNeeded: boolean = false;
  secondInputNeeded: boolean = false;
  secondPlaceholder = '';
  eyesList = [
    'Prefer not to mention',
    'Brown',
    'Blue',
    'Green',
    'Gray',
    'Hazel',
  ];
  hairList = ['Prefer not to mention', 'Blonde', 'Brunette', 'Red', 'Black'];
  tattoosList = ['Prefer not to mention', 'Yes', 'No'];

  profileSelectedHobbies = [];
  profileHobbies = [];
  profileSelectedSports = [];
  profileSports = [];
  profileSelectedMusic = [];
  profileMusic = [];

  selectList = [];

  editSelect: boolean = false;
  changePersonality: boolean = false;

  showModal(index): void {
    if (!this.ownProfile() && index != 11) return;
    this.isVisible = true;
    this.traitModified = index;
    this.changePersonality = false;
    this.editSelect = false;
    if (this.traitModified >= 0 && this.traitModified <= 3) {
      this.firstInputNeeded = true;
      if (this.traitModified == 1)
        this.firstInputValue = this.userProfile.age + '';
      else if (this.traitModified == 2)
        this.firstInputValue = this.userProfile.height + '';
      else if (this.traitModified == 3)
        this.firstInputValue = this.userProfile.weight + '';
    } else {
      this.editSelect = true;
      this.firstInputNeeded = false;
      if (this.traitModified == 4) {
        this.selectList = this.eyesList;
        this.setDefaultItem(
          this.userProfile.eyeColor.charAt(0).toUpperCase() +
            this.userProfile.eyeColor.substring(1)
        );
      } else if (this.traitModified == 5) {
        this.selectList = this.hairList;
        this.setDefaultItem(
          this.userProfile.hairColor.charAt(0).toUpperCase() +
            this.userProfile.hairColor.substring(1)
        );
      } else if (this.traitModified == 6) {
        this.selectList = this.tattoosList;
        this.setDefaultItem(
          this.userProfile.tattoo.charAt(0).toUpperCase() +
            this.userProfile.tattoo.substring(1)
        );
      } else if (this.traitModified == 7) {
        this.editSelect = false;
        this.changePersonality = true;
        this.selectTraits();
      } else if (this.traitModified == 8) {
        this.editSelect = false;
        this.firstInputNeeded = true;
        if (this.userInstagram !== 'Tap to add')
          this.firstInputValue = this.userProfile.instagramURL;
        else this.firstInputValue = '';
      } else if (this.traitModified == 9) {
        this.editSelect = false;
        this.firstInputNeeded = true;
        this.firstInputValue = this.userProfile.facebookURL;
        if (this.userFacebook !== 'Tap to add')
          this.firstInputValue = this.userProfile.facebookURL;
        else this.firstInputValue = '';
      } else if (this.traitModified == 10) {
        this.editSelect = false;
        this.firstInputNeeded = true;
        this.firstInputValue = this.userProfile.twitterURL;
        if (this.userTwitter !== 'Tap to add')
          this.firstInputValue = this.userProfile.twitterURL;
        else this.firstInputValue = '';
      } else if (this.traitModified == 11) {
        this.editSelect = false;
        this.firstInputNeeded = true;
        if (!this.match) this.firstPlaceholder = 'Write a message';
        else this.firstPlaceholder = 'Write the first message';
      }
    }
    if (this.traitModified == 0) {
      this.secondInputNeeded = true;
      this.firstInputValue = this.userProfile.lastName;
      this.secondInputValue = this.userProfile.firstName;
      this.firstPlaceholder = 'Last name';
      this.secondPlaceholder = 'First name';
    } else {
      this.secondInputNeeded = false;
    }
  }

  instagramValid() {
    if (this.userProfile == null) return true;
    if (this.ownProfile()) return true;
    else {
      if (this.userProfile.instagramURL !== '') return true;
      else return false;
    }
  }

  facebookValid() {
    if (this.userProfile == null) return true;
    if (this.ownProfile()) return true;
    else {
      if (this.userProfile.facebookURL !== '') return true;
      else return false;
    }
  }

  twitterValid() {
    if (this.userProfile == null) return true;
    if (this.ownProfile()) return true;
    else {
      if (this.userProfile.twitterURL !== '') return true;
      else return false;
    }
  }

  selectTraits() {
    var index;
    var arr = this.stringToArray(this.userProfile.personalityTraits);
    for (let i = 0; i < arr.length; i++) {
      if (
        (index = this.personalityTraits.indexOf(
          arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
        )) != -1
      ) {
        this.selectedPersonalityTraits[index] = true;
      }
    }
  }

  editProfile(event) {
    this.firstInput = event.target;
    console.log(event);
  }

  onChangeFirstInput(event) {
    this.firstInputValue = event.target.value;
  }

  onChangeSecondInput(event) {
    this.secondInputValue = event.target.value;
  }

  deselectHobby(index) {
    if (!this.ownProfile()) return;
    this.profileHobbies.push(this.profileSelectedHobbies[index]);
    this.profileSelectedHobbies = this.profileSelectedHobbies
      .slice(0, index)
      .concat(this.profileSelectedHobbies.slice(index + 1));
    this.userProfile.hobbies = this.arrayToString(this.profileSelectedHobbies);
    this.saveUser();
  }

  selectHobby(index) {
    this.profileSelectedHobbies.push(this.profileHobbies[index]);
    this.profileHobbies = this.profileHobbies
      .slice(0, index)
      .concat(this.profileHobbies.slice(index + 1));
    this.userProfile.hobbies = this.arrayToString(this.profileSelectedHobbies);
    this.saveUser();
  }

  deselectSport(index) {
    if (!this.ownProfile()) return;
    this.profileSports.push(this.profileSelectedSports[index]);
    this.profileSelectedSports = this.profileSelectedSports
      .slice(0, index)
      .concat(this.profileSelectedSports.slice(index + 1));
    this.userProfile.sports = this.arrayToString(this.profileSelectedSports);
    this.saveUser();
  }

  selectSport(index) {
    this.profileSelectedSports.push(this.profileSports[index]);
    this.profileSports = this.profileSports
      .slice(0, index)
      .concat(this.profileSports.slice(index + 1));
    this.userProfile.sports = this.arrayToString(this.profileSelectedSports);
    this.saveUser();
  }

  deselectMusic(index) {
    if (!this.ownProfile()) return;
    this.profileMusic.push(this.profileSelectedMusic[index]);
    this.profileSelectedMusic = this.profileSelectedMusic
      .slice(0, index)
      .concat(this.profileSelectedMusic.slice(index + 1));
    this.userProfile.music = this.arrayToString(this.profileSelectedMusic);
    this.saveUser();
  }

  selectMusic(index) {
    this.profileSelectedMusic.push(this.profileMusic[index]);
    this.profileMusic = this.profileMusic
      .slice(0, index)
      .concat(this.profileMusic.slice(index + 1));
    this.userProfile.music = this.arrayToString(this.profileSelectedMusic);
    this.saveUser();
  }

  handleOk(): void {
    if (this.traitModified == 0) {
      if (
        !this.onlyLetters(this.firstInputValue) ||
        !this.onlyLetters(this.secondInputValue) ||
        this.firstInputValue.length < 3 ||
        this.secondInputValue.length < 3 ||
        this.firstInputValue.length > 20 ||
        this.secondInputValue.length > 20
      ) {
        alert(
          'Name must contain only letters and be between 3 and 20 characters long!'
        );
        return;
      }
      this.userProfile.lastName = this.firstInputValue;
      this.userProfile.firstName = this.secondInputValue;
    } else if (this.traitModified == 1) {
      if (!this.isNumeric(this.firstInputValue)) {
        alert('Age must contain only digits.');
        this.handleCancel();
        return;
      }
      var v = parseInt(this.firstInputValue);
      if (v < 18 || v > 70) {
        alert('Valid ages are between 18 and 70.');
        this.handleCancel();
        return;
      }
      this.userProfile.age = v;
    } else if (this.traitModified == 2) {
      if (!this.isNumeric(this.firstInputValue)) {
        alert('Height must contain only digits.');
        this.handleCancel();
        return;
      }
      var v = parseInt(this.firstInputValue);
      if (v < 50 || v > 300) {
        alert('Valid heights are between 100 and 300.');
        this.handleCancel();
        return;
      }
      this.userProfile.height = v;
    } else if (this.traitModified == 3) {
      if (!this.isNumeric(this.firstInputValue)) {
        alert('Weight must contain only digits.');
        this.handleCancel();
        return;
      }
      var v = parseInt(this.firstInputValue);
      if (v < 30 || v > 300) {
        alert('Valid weights are between 30 and 300.');
        this.handleCancel();
        return;
      }
      this.userProfile.weight = v;
    } else if (this.traitModified == 4) {
      this.userProfile.eyeColor = this.selectedItem.value;
    } else if (this.traitModified == 5) {
      this.userProfile.hairColor = this.selectedItem.value;
    } else if (this.traitModified == 6) {
      this.userProfile.tattoo = this.selectedItem.value;
    } else if (this.traitModified == 7) {
      this.userProfile.personalityTraits = this.arrayToString(
        this.selectedTraits
      );
    } else if (this.traitModified == 8) {
      if (
        (this.firstInputValue.length < 3 || this.firstInputValue.length > 25) &&
        this.firstInputValue !== ''
      ) {
        alert(
          'Please input a valid instagram profile with at least 3 and maximum 25 characters long.'
        );
        return;
      }
      if (
        this.firstInputValue === '' &&
        this.userProfile.facebookURL === '' &&
        this.userProfile.twitterURL === ''
      ) {
        alert(
          'You must have at least one social media account on your profile!'
        );
        return;
      }
      this.userProfile.instagramURL = this.firstInputValue;
    } else if (this.traitModified == 9) {
      if (
        (this.firstInputValue.length < 3 || this.firstInputValue.length > 25) &&
        this.firstInputValue !== ''
      ) {
        alert(
          'Please input a valid facebook profile with at least 3 and maximum 25 characters long.'
        );
        return;
      }
      if (
        this.firstInputValue === '' &&
        this.userProfile.instagramURL === '' &&
        this.userProfile.twitterURL === ''
      ) {
        alert(
          'You must have at least one social media account on your profile!'
        );
        return;
      }
      this.userProfile.facebookURL = this.firstInputValue;
    } else if (this.traitModified == 10) {
      if (
        (this.firstInputValue.length < 3 || this.firstInputValue.length > 25) &&
        this.firstInputValue !== ''
      ) {
        alert(
          'Please input a valid twitter profile with at least 3 and maximum 25 characters long.'
        );
        return;
      }
      if (
        this.firstInputValue === '' &&
        this.userProfile.instagramURL === '' &&
        this.userProfile.facebookURL === ''
      ) {
        alert(
          'You must have at least one social media account on your profile!'
        );
        return;
      }
      this.userProfile.twitterURL = this.firstInputValue;
    } else if (this.traitModified == 11) {
      if (this.firstInputValue === '') return;

      var now = new Date();

      const year = now.getFullYear();
      var month = now.getMonth() + 1 + '';
      if (now.getMonth() + 1 < 10) month = '0' + month;
      var day = now.getDate() + '';
      if (now.getDate() < 10) day = '0' + day;
      var hours = now.getHours() + '';
      if (now.getHours() < 10) hours = '0' + hours;
      var minutes = now.getMinutes() + '';
      if (now.getMinutes() < 10) minutes = '0' + minutes;
      var seconds = now.getSeconds() + '';
      if (now.getSeconds() < 10) seconds = '0' + seconds;

      var date =
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds;
      const payload = {
        fromId: parseInt(window.localStorage.getItem('userId')) as number,
        toId: this.profileId,
        text: this.firstInputValue,
        dateSent: date,
        read: false,
      };

      this.authService.sendMessage(payload).subscribe({
        next: (response) => {
          console.log(response);
          this.writeFirstMessage = false;
          this.messageService.create(
            'success',
            'The message was successfully sent!'
          );
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
    this.handleCancel();
    if (this.traitModified != 11) {
      this.saveUser();
      window.sessionStorage.setItem('refresh', 'true');
    }
    this.setProfile();
  }

  onlyLetters(value): boolean {
    return /^[a-zA-Z\s-]+$/.test(value);
  }

  isNumeric(value): boolean {
    return /^\d+$/.test(value) && value.substring(0, 1) !== '0';
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getCursor() {
    if (parseInt(window.localStorage.getItem('userId')) == this.profileId) {
      return 'cursor: pointer;';
    } else return 'cursor: default';
  }

  ownProfile(): boolean {
    return parseInt(window.localStorage.getItem('userId')) == this.profileId;
  }

  signOut() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('rememberMe');
    window.localStorage.removeItem('userId');
    window.sessionStorage.removeItem('session');
    this.router.navigate(['/app/index']);
  }

  setProfile() {
    console.log(this.userProfile);
    document.getElementById('profilePhoto').style.backgroundImage =
      'url(' + this.userProfile.profilePhotoURL + ')';
    this.userName =
      this.userProfile.lastName + ' ' + this.userProfile.firstName;
    this.ageText = this.userProfile.age + '';
    this.heightText = this.userProfile.height + '';
    this.weightText = this.userProfile.weight + '';
    this.eyeColorText =
      this.userProfile.eyeColor.charAt(0).toUpperCase() +
      this.userProfile.eyeColor.substring(1);
    this.hairColorText =
      this.userProfile.hairColor.charAt(0).toUpperCase() +
      this.userProfile.hairColor.substring(1);
    this.tattooText =
      this.userProfile.tattoo.charAt(0).toUpperCase() +
      this.userProfile.tattoo.substring(1);
    this.userPersonalityTraits = this.stringToArray(
      this.userProfile.personalityTraits
    );

    this.userHobbies = this.stringToArray(this.userProfile.hobbies);
    this.userSports = this.stringToArray(this.userProfile.sports);
    this.userMusic = this.stringToArray(this.userProfile.music);

    this.profileSelectedHobbies = [];
    this.profileHobbies = [];
    for (let i = 0; i < this.userHobbies.length; i++) {
      this.profileSelectedHobbies.push(this.userHobbies[i]);
    }
    for (let i = 0; i < this.hobbies.length; i++) {
      if (this.userHobbies.indexOf(this.hobbies[i]) == -1) {
        this.profileHobbies.push(this.hobbies[i]);
      }
    }
    if (
      this.userHobbies.length == 1 &&
      this.userHobbies[0] === '' &&
      this.profileId != parseInt(window.localStorage.getItem('userId'))
    ) {
      this.profileSelectedHobbies.push('No hobbies selected');
    }

    this.profileSelectedSports = [];
    this.profileSports = [];
    for (let i = 0; i < this.userSports.length; i++) {
      this.profileSelectedSports.push(this.userSports[i]);
    }
    for (let i = 0; i < this.sports.length; i++) {
      if (this.userSports.indexOf(this.sports[i]) == -1) {
        this.profileSports.push(this.sports[i]);
      }
    }
    if (
      this.userSports.length == 1 &&
      this.userSports[0] === '' &&
      this.profileId != parseInt(window.localStorage.getItem('userId'))
    ) {
      this.profileSelectedSports.push('No sports selected');
    }

    this.profileSelectedMusic = [];
    this.profileMusic = [];
    for (let i = 0; i < this.userMusic.length; i++) {
      this.profileSelectedMusic.push(this.userMusic[i]);
    }
    for (let i = 0; i < this.musicGenres.length; i++) {
      if (this.userMusic.indexOf(this.musicGenres[i]) == -1) {
        this.profileMusic.push(this.musicGenres[i]);
      }
    }
    if (
      this.userMusic.length == 1 &&
      this.userMusic[0] === '' &&
      this.profileId != parseInt(window.localStorage.getItem('userId'))
    ) {
      this.profileSelectedMusic.push('No music genres selected');
    }

    this.userInstagram = this.userProfile.instagramURL;
    if (this.userInstagram === '') this.userInstagram = 'Tap to add';
    this.userFacebook = this.userProfile.facebookURL;
    if (this.userFacebook === '') this.userFacebook = 'Tap to add';
    this.userTwitter = this.userProfile.twitterURL;
    if (this.userTwitter === '') this.userTwitter = 'Tap to add';
  }

  loadUser() {
    if (this.profileId == -1 || isNaN(this.profileId)) {
      this.router.navigate(['/app/index']);
      return;
    }
    this.authService.getUser(this.profileId).subscribe({
      next: (response) => {
        console.log(response);
        if (
          response.user == null ||
          (this.profileId != parseInt(window.localStorage.getItem('userId')) &&
            !this.match)
        ) {
          this.router.navigate(['/app/index']);
          return;
        }
        var user: User = response.user;
        this.userProfile = user;
        this.name = user.lastName + ' ' + user.firstName;
        this.profileCompleted = user.profileCompleted;

        if (this.profileCompleted) {
          this.infoMessages = [];

          if (
            this.profileId != parseInt(window.localStorage.getItem('userId')) &&
            !this.match
          ) {
            this.infoMessage = '';
            this.writeFirstMessage = true;
            this.modalTitle =
              'Send a message to ' +
              this.userProfile.lastName +
              ' ' +
              this.userProfile.firstName;
          } else if (!this.match) {
            this.infoMessages = ['This is how others will see your profile'];
          } else {
            this.infoMessages = [
              'This is your matching person! You can start chatting here or contact them on social media',
            ];
            this.writeFirstMessage = true;
            this.modalTitle = 'Send first message of the conversation';
          }

          this.messageIndex = 0;
          this.setMessages();

          this.selectedTraits = this.stringToArray(user.personalityTraits);

          this.setProfile();
        } else {
          if (window.localStorage.getItem('userId') != response.user.userId)
            this.router.navigate(['/app/index']);
        }
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  saveUser() {
    const payload = {
      userId: window.localStorage.getItem('userId'),
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName,
      gender: this.userProfile.gender,
      profileCompleted: this.userProfile.profileCompleted,
      profilePhotoURL: this.userProfile.profilePhotoURL,
      age: this.userProfile.age,
      height: this.userProfile.height,
      weight: this.userProfile.weight,
      eyeColor: this.userProfile.eyeColor,
      hairColor: this.userProfile.hairColor,
      tattoo: this.userProfile.tattoo,
      personalityTraits: this.userProfile.personalityTraits,
      hobbies: this.userProfile.hobbies,
      sports: this.userProfile.sports,
      music: this.userProfile.music,
      instagramURL: this.userProfile.instagramURL,
      facebookURL: this.userProfile.facebookURL,
      twitterURL: this.userProfile.twitterURL,
      matches: this.userProfile.matches,
      matchesAdded: this.userProfile.matchesAdded,
      email: this.userProfile.email,
      password: this.userProfile.password,
    };

    this.authService.saveUser(payload).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
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
