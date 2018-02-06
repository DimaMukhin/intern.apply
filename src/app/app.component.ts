import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  inputs: ['childValue']
})
export class AppComponent {
  showMessage: string='test';
  title = 'app';
  childValue: string;

  characters = [
    'Finn the human',
    'Jake the dog',
    'Princess bubblegum',
    'Lumpy Space Princess',
    'Beemo1',
    'Beemo2'
  ]

  onNotifyClicked(message:string):void{
    this.showMessage=message;
  }
  
}
