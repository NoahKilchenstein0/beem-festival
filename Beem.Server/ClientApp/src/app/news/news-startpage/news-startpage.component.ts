import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/models/news';
import { GlobalService } from 'src/app/services/global.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-startpage',
  templateUrl: './news-startpage.component.html',
  styleUrls: ['./news-startpage.component.css']
})
export class NewsStartpageComponent implements OnInit {
  public news: News[] = [];

  public filteredNews: News[] = [];
  private favoriteFiltered: boolean = false;
  public selectedNews: News = new News();
  public isDrillDownActive: boolean = false;

  public isAdminView: boolean = false;

  public isEdit: boolean = false;

  constructor(public router: Router,
              public newsService: NewsService,
              public globalsService: GlobalService) {
  }

  ngOnInit(): void {

    this.newsService.getLatestNews().subscribe(x => {
      this.news = x;
      this.filteredNews = this.news;
    });
    this.globalsService.isNewsDrillDown.subscribe(x => {
      this.isDrillDownActive = x;
    });
  }

  navigateToNewsPage(news:News): void{
    this.selectedNews = news;
    this.router.navigateByUrl("/news-site/"+news.Id);
  }
}
