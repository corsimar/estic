import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: any;
  @Input() expeditorId: any;
  @Input() dateSent: any;

  tooltipColor: string = '#f7a4d4';

  constructor() {}

  ngOnInit(): void {}

  getFlexStyle(): string {
    if (window.localStorage.getItem('userId') == this.expeditorId)
      return 'justify-content: flex-end; text-align: right';
    else return 'justify-content: flex-start; text-align: left';
  }

  getBackgroundColor(): string {
    if (window.localStorage.getItem('userId') != this.expeditorId)
      return 'background-color: #a55182';
    else return 'background-color: #cc3b90';
  }

  getTooltipPlacement() {
    if (window.localStorage.getItem('userId') != this.expeditorId)
      return 'right';
    else return 'left';
  }
}
