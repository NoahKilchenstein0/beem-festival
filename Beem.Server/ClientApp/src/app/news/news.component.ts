import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../models/news';
import { Roles, User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public news: News[] = [];

  public filteredNews: News[] = [];
  private favoriteFiltered: boolean = false;
  public selectedNews: News = new News();
  public isDrillDownActive: boolean = false;
  public user: User | null = null;

  public isAdminView: boolean = false;

  public isEdit: boolean = false;

  constructor(
    public router: Router,
    public userService: UserService,
    public newsService: NewsService,
    public authenticationService: AuthService,
    public globalsService: GlobalService,
    private route: ActivatedRoute,
    private location: PlatformLocation
  ){
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    history.pushState(null, '', location.href);
    this.location.onPopState(() => {
      history.pushState(null, '', location.href);
      this.onBack();
    });

    if(this.isAdminOnly()){
      this.isAdminView = true;
      this.newsService.getNews().subscribe(x => {
        this.news = x;
        this.filteredNews = this.news;
      })
    }
    else {
      this.isAdminView = false;
      this.newsService.getActiveNews().subscribe(x => {
        this.news = x;
        this.filteredNews = this.news;
      })
    }
    this.globalsService.isNewsDrillDown.subscribe(x => {
      this.isDrillDownActive = x;
    });
  }

  ngOnDestroy() {
    this.location.onPopState(() => {});
  }

  setRouteParams(news:News): void {
    this.router.navigate(['/news'], {
      relativeTo: this.route,
      queryParams: {
        isAdminView: this.isAdminView,
        isEdit: this.isEdit,
        newsId: news.id
      },
      queryParamsHandling: 'merge', // preserve the current query params
    });

  }
  
  navigateToNewsPage(news:News): void{
    this.selectedNews = news;
    // this.setRouteParams(news);
    this.globalsService.setNewsDrillDownActive();
  }

  onSwap(): void {
    if(this.isAdminView){
      this.isAdminView = false;
      this.filteredNews = this.news;
    }
    else {
      this.isAdminView = true;
      this.filteredNews = this.news;
    }
  }

  onBack(): void {
    this.globalsService.setNewsDrillDownDisabled();
  }

  isAdmin(): boolean {
    if(this.user === null){
      return false;
    }
    return this.user.role === Roles.Admin && this.isAdminView;
  }

  isAdminOnly(): boolean {
    if(this.user === null){
      return false;
    }
    return this.user.role === Roles.Admin;
  }

  navigateToEditNews(news:News): void {
    this.globalsService.setNewsDrillDownActive();
    if(news.id !== 0){
      this.isEdit = true;
    }
    else {
      this.isEdit = false;
    }
    this.selectedNews = news;
  }

  updateNews(news:News){
    if(this.isEdit){
      this.newsService.updateNews(news).subscribe(x => {
        let index = this.news.findIndex(x => x.id === news.id);
        this.news.splice(index, 1);
        this.news.push(x);
        this.globalsService.setNewsDrillDownDisabled();
      });
    }
    else {
      this.newsService.createNews(news).subscribe(x => {
        this.news.push(x);
        this.globalsService.setNewsDrillDownDisabled();
      });
    }
  }

  deleteNews(news:News): void {
    this.newsService.deleteNews(news.id).subscribe(x => {
      this.news.splice(this.news.findIndex(x => x === news),1);
    });
  }

}
