import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	// Angular 19 made `standalone: true` the default. AppComponent is declared
	// in (and bootstrapped by) AppModule, and its template relies on *ngFor,
	// routerLink and router-outlet coming from BrowserModule/AppRoutingModule,
	// so it stays non-standalone. The routed components are standalone and use
	// no Angular directives, so they need no imports of their own.
	standalone: false,
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private r: Router) { }
	title = 'onesdk-angular-webpack-starter';
	router = this.r;
}
