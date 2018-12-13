import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  randomData = [];
  dataCount = 5000;
  dataChangeSubscription: Subscription;
  ngOnInit(): void {
    // this.randomData = this.createRandomData(this.dataCount);
    const FPS = 60;
    this.dataChangeSubscription = interval(1000 / FPS)
    .subscribe(_ => this.randomData = this.createRandomData(this.dataCount));
  }


  createRandomData(num) {
    const data = [];
    for (let i = 0; i < num; i++) {
      data.push({
        data: (Math.random() * 10).toFixed(1),
        color: (Math.random() * 0xFFFFFF)
      });
    }

    return data;
  }

  ngOnDestroy(): void {
    if (this.dataChangeSubscription) {
      this.dataChangeSubscription.unsubscribe();
    }
  }



}
