import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { NavItem } from './models/navItem';
import { AuthService } from './services/auth.service';
import { GlobalService } from './services/global.service';
import { NgcCookieConsentService, NgcInitializationErrorEvent, NgcInitializingEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'beem-site';

    //keep refs to subscriptions to be able to unsubscribe later
    private popupOpenSubscription!: Subscription;
    private popupCloseSubscription!: Subscription;
    private initializingSubscription!: Subscription;
    private initializedSubscription!: Subscription;
    private initializationErrorSubscription!: Subscription;
    private statusChangeSubscription!: Subscription;
    private revokeChoiceSubscription!: Subscription;
    private noCookieLawSubscription!: Subscription;

  public isTopNav: boolean = true;
  public navItems: NavItem[] = [   
    new NavItem("NEWS", "Alle Neuigkeiten übers Beem Festival","news"), 
    new NavItem ("LINEUP", "Künstlerseite","programm"), 
    new NavItem ("TICKETS", "Künstlerseite","programm"), 
    new NavItem ("TIMETABLE", "Künstlerseite","programm"), 
    new NavItem("IMPRESSUM", "Impressum Beem e.V.","impressum"),
    new NavItem("FAQ", "Häufige Fragen", "faq")
  ];

  constructor(public globalService: GlobalService,
    public router: Router,
    public authoritheService: AuthService,
    private ccService: NgcCookieConsentService){
      
    this.router.onSameUrlNavigation = "reload";
    this.router.events.subscribe(Event => {
      if(Event instanceof NavigationEnd){
        this.globalService.setArtistDrillDownDisabled();
        this.globalService.setNewsDrillDownDisabled();
      }
    });
  }

  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializingSubscription = this.ccService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
      });
    
    this.initializedSubscription = this.ccService.initialized$.subscribe(
      () => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
      });

    this.initializationErrorSubscription = this.ccService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {
        // the cookieconsent has failed to initialize... 
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  public onNavigateHome(): void  {
    this.router.navigateByUrl("/");
  }

  public onLogout(): void {
    this.authoritheService.logout();
  }

  sendEmail(): void {
    window.location.href = 'mailto:beem.festival@gmail.com';
  }

}
