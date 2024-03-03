import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { News } from 'src/app/models/news';
import * as moment from 'moment';
import { UrlbypassPipe } from 'src/app/pipes/Urlbypass.pipe';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, fromEvent } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'news-site',
  templateUrl: './news-site.component.html',
  styleUrls: ['./news-site.component.css']
})
export class NewsSiteComponent implements OnInit {

  @Input("news") news: News | undefined;
  @Output("onBack") onBackCall: EventEmitter<void> = new EventEmitter<void>();

  public id: number = 0;
  public isStartPageNav = false;
  public isLoading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private newsService: NewsService){
    
  }

  ngOnInit(): void {     
    
    fromEvent(window, 'popstate').subscribe((e) => {
      // console.log(e, 'back button');
    });
    
    if(this.news === undefined){
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.newsService.getSingle(this.id).subscribe(x => {
          this.news = x;
          this.isStartPageNav = true;
          this.isLoading = false;
        });
      });
    }
    else {
      this.isLoading = false;
    }
  }


  public onBack(): void {
    if(this.isStartPageNav){
      this.router.navigateByUrl("/");
    }
    else {
      this.onBackCall.emit();
    }
  }

  public createImgPath() {
    return location.origin + "/" + this.news?.imgHeader; 
  }

  public getNewsTitle(){
    return this.news === undefined ? "" : this.news.title;
  }

  
  public getNewsText(){
    return this.news === undefined ? "" : this.news.newsText;
  }

}
