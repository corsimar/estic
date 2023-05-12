import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trait',
  templateUrl: './trait.component.html',
  styleUrls: ['./trait.component.scss'],
})
export class TraitComponent implements OnInit {
  @Input() index: any;

  traits = [
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
  images = [
    '/assets/Personality/adventurous.png',
    '/assets/Personality/balanced.png',
    '/assets/Personality/calm.png',
    '/assets/Personality/charismatic.png',
    '/assets/Personality/cooperative.png',
    '/assets/Personality/curious.png',
    '/assets/Personality/disciplined.png',
    '/assets/Personality/empathetic.png',
    '/assets/Personality/forgiving.png',
    '/assets/Personality/generous.png',
    '/assets/Personality/humble.png',
    '/assets/Personality/humorous.png',
    '/assets/Personality/imaginative.png',
    '/assets/Personality/intuitive.png',
    '/assets/Personality/logical.png',
    '/assets/Personality/mature.png',
    '/assets/Personality/open.png',
    '/assets/Personality/optimistic.png',
    '/assets/Personality/self-critical.png',
    '/assets/Personality/spontaneous.png',
    '/assets/Personality/youthful.png',
  ];

  constructor() {}

  ngOnInit(): void {}
}
