import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styles: [
  ]
})
export class ProgressBarComponent implements OnInit {
  progressBar!: number
  get getProgressBar(): string {
    if (this.progressBar === 0) {
      return "0%"
    } else if (this.progressBar === 1) {
      return "25%"
    } else if (this.progressBar === 2) {
      return "50%"
    } else if (this.progressBar === 3) {
      return "75%"
    } else {
      return "100%"
    }
  }
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('stage')
      .subscribe(res => {
        this.progressBar = res.stage
      })
  }

}
