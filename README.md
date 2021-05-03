# The task
App should allow customers to rent/book bike. Registering possible, not required.
Possible to set account with google/facebook.
Website comes with at least two languages

## Views and features
### Home
- search component with dropdown(bike type), calendar, and maybe total maximum price
- selection always for specified period of time
- search button displays bikes below

### Bike detail
- see bike detail with rental form

### Checkout

- tab group with: basket, personal details(PD), order
  - basket tab lists full client order and allows to edit
  - PD tab contains user form for both cases logged in/out,
    form prefilled for logged in user
  - order tab list order datails and allows to finalize order

### Admin site
- login on path **/admin**
- list all bikes with current status:
  - booked/free for rent
  - in service
- view with form add/remove bikes
- orders overview/details

### Contact

- contact form for questions
- email, phone, social media

### FAQ

### Registration/Login

### Account


# Technical

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
