import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'duolingo';
  ganaste: boolean = false

  setGanaste(event: boolean): void {
    this.ganaste = event
    setTimeout(() => {
      this.ganaste = false
    }, 1500);
  }

  constructor() { }

  ngOnInit(): void {

  }

}
