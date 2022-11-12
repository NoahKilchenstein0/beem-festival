import { LocationStrategy } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from 'src/app/models/news';

@Component({
  selector: 'news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {

  @Input("news") news: News = new News();
  @Output("navigateToNews") navigateToNews: EventEmitter<News> = new EventEmitter<News>(); 

  constructor(){

  }

  ngOnInit(): void {
      
  }

  public navigateToNewsPage(){
      this.navigateToNews.emit(this.news);
  }

  public createImgPath(serverPath: string) {
    return location.origin + "/" + serverPath; 
  }

}
