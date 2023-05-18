import { LocationStrategy } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from 'src/app/models/news';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {

  @Input("news") news: News = new News();
  @Output("navigateToNews") navigateToNews: EventEmitter<News> = new EventEmitter<News>(); 

  constructor(public globalService: GlobalService){

  }

  ngOnInit(): void {
      
  }

  public navigateToNewsPage(){
      this.navigateToNews.emit(this.news);
  }

  public createImgPath(serverPath: string) {
    return location.origin + "/" + serverPath; 
  }

  public getNewsText(news: News){
    return news.newsText.substring(0, 255).replace(/<\/?[^>]+(>|$)/g, "")  + " ...";
  }

  public isImageVisible(news:News): boolean{
    return news.img !== '' && !this.globalService.isTopNav;
  }

}
