# 6Observable

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

-------------Angular tutorial from Udemy with Maximilian-----------------
-------------Angular 8 The Complete Guide-----------------

1. Created ng new 6-observable
2. Copy & pasted src file from exercise files
3. Creating an Observable (Not from scratch)
    Refer to "home.component.ts"
    Created an observable like the following 
    ngOnInit() {
        this.firstObsSubscription = interval(1000).subscribe(count => {
        console.log(count);
        })
    }

    We have to remember to unsubscribe as well. If not the observable will keeep running. In the above example if we do not subscribe it will keep on printing even if you navigate away from your component.

    You can unsubscribe like the follwoing
    ngOnDestroy() {
        this.firstObsSubscription.unsubscribe();
    }
4. Creating an observable from scratch
    const customIntervalObs = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000)
    });

    And subscribing to the observable

    this.firstObsSubscription = customIntervalObs.subscribe(data => {
      console.log(data);
    });
    1. error & complete
        const customIntervalObs = new Observable(observer => {
            let count = 0;
            setInterval(() => {
                if (count === 2) {
                observer.complete();
                }
                observer.next(count);
                if (count > 3) {
                observer.error(new Error('Count is greater than 3'));
                }
                count++;
            }, 1000);
        });

        This is how we subscribe
        this.firstObsSubscription = customIntervalObs.subscribe({
            next: (data) => {
                console.log(data)
            },
            error: (error) => {
                console.error(error)
            },
            complete: () => {
                console.info('Complete')
            }
        });
5. operators: (filter, map and many more)
    For list of operators: https://rxjs.dev/guide/operators
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
6. Subjects:
    Untill now we have been using EventEmitters for communication.
    But (it is recommended ) We can use Subjects instead of EventEmitters in case of cross component communication. 
    In file user.service.ts
    e.g. activatedEmitter = new Subject<boolean>();

    Now when we are emitting instead of doing 
    this.userService.activatedEmitter.emit(true);
    do this instead (i.e using next() which belongs to subject)
    this.userService.activatedEmitter.next(true);


