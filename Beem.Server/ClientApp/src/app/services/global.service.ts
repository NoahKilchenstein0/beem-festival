import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public isTopNav:boolean = true;

  public isLoaded: boolean = false;

  private  isArtistDrillDownSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isArtistDrillDown: Observable<boolean> = this.isArtistDrillDownSubject.asObservable();

  private  isNewsDrillDownSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isNewsDrillDown: Observable<boolean> = this.isNewsDrillDownSubject.asObservable();

  private  isQuestionsDrillDownSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isQuestionDrillDown: Observable<boolean> = this.isQuestionsDrillDownSubject.asObservable();


  constructor(breakpointObserver: BreakpointObserver) {    
    breakpointObserver.observe([
    Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        this.isTopNav = true;
      }
    });
    breakpointObserver.observe([
      Breakpoints.Tablet,
      Breakpoints.Handset
    ]).subscribe(result => {
      if(result.matches){
        this.isTopNav = false;
      }
    });
  }

  public setArtistDrillDownActive(): void {
    this.isArtistDrillDownSubject.next(true);
  }

  public setArtistDrillDownDisabled(): void {
    this.isArtistDrillDownSubject.next(false);
  }

  public setNewsDrillDownActive(): void {
    this.isNewsDrillDownSubject.next(true);
  }

  public setNewsDrillDownDisabled(): void {
    this.isNewsDrillDownSubject.next(false);
  }

  public setQuestionsDrillDownActive(): void {
    this.isQuestionsDrillDownSubject.next(true);
  }

  public setQuestionsDrillDownDisabled(): void {
    this.isQuestionsDrillDownSubject.next(false);
  }
}
