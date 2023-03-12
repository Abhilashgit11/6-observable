import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription!: Subscription;

  constructor() { }
  
  ngOnInit() {
    // Creating an observable from interval() provided from rxjs
    /* this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    }) */
    // Creating an observable from scratch
    const customIntervalObs = new Observable<number>(observer => {
      let count = 0;
      setInterval(() => {
        if (count === 2) {
        // if (count === 5) {
          observer.complete();
        }
        observer.next(count);
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000);
    });

    /* this.firstObsSubscription = customIntervalObs.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed');
    }); */

    this.firstObsSubscription = customIntervalObs.pipe(filter((data) => {
      return data > 0;
    }), map((data) => {
      return 'Round ' + data;
    })).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Complete');
      }
    });

  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
