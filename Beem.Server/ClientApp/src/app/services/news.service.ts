import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artist } from '../models/artist';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  public getNews(){
    return this.http.get<News[]>('/api/News');
  }

  public getActiveNews(){
    return this.http.get<News[]>('/api/News/GetActive');
  }

  public getLatestNews(){
    return this.http.get<News[]>('/api/News/GetLatest');
  }

  
  public getSingle(id: number){
    return this.http.get<News>('/api/News/GetSingle('+ id + ')');
  }

  public createNews(news: News){
    return this.http.post<News>('/api/News', news);
  }

  public updateNews(news: News){ 
    return this.http.put<News>('/api/News/Update('+ news.id + ')', news);
  }

  public deleteNews(id: number){
    return this.http.delete<void>('/api/News/Delete('+ id + ')');
  }
}
