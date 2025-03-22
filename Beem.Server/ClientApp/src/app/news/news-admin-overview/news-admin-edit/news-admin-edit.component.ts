import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { News } from 'src/app/models/news';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'news-admin-edit',
  templateUrl: './news-admin-edit.component.html',
  styleUrls: ['./news-admin-edit.component.scss']
})
export class NewsAdminEditComponent implements  OnChanges {
  @Input("news") news: News | null = null;
  @Output("onBack") onBackCall: EventEmitter<void> = new EventEmitter<void>();
  @Output("onCreateUpdate") onCreateUpdate: EventEmitter<News> = new EventEmitter<News>();

  public title: FormControl = new FormControl({value: this.news?.Title, disabled: false});
  public publicationDateTime: FormControl = new FormControl({value: this.news?.PublicationDateTime ? new Date(this.news.PublicationDateTime) : null, disabled: false});
  public newsText: FormControl = new FormControl({value: this.news?.NewsText, disabled: false});
  public img!: { dbPath: ''; };
  public imgHeader!: { dbPath: ''; };

  public isPreview: boolean = false;
  public editedNews: News = new News();

  ngOnChanges(): void {
    this.title.setValue(this.news?.Title);
    this.publicationDateTime.setValue(this.news?.PublicationDateTime ? new Date(this.news.PublicationDateTime) : null);
    this.newsText.setValue(this.news?.NewsText);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.publicationDateTime.setValue(event.value);
    }
  }

  onPreview(): void {
    this.editedNews.Title = this.title.value;
    this.editedNews.PublicationDateTime = this.publicationDateTime.value ? this.publicationDateTime.value.toISOString() : null;
    this.editedNews.NewsText = this.newsText.value;    
    if(this.img !== undefined)
    {
      this.editedNews.Img = this.img.dbPath
    }
    else if(this.news !== null)
    {
      this.editedNews.Img = this.news.Img; 
    }
    else 
    {
      this.editedNews.Img = "";
    }
    if(this.imgHeader !== undefined)
    {
      this.editedNews.ImgHeader = this.imgHeader.dbPath
    }
    else if(this.news !== null)
    {
      this.editedNews.ImgHeader = this.news.ImgHeader; 
    }
    else 
    {
      this.editedNews.ImgHeader = "";
    }
    this.isPreview = true;
  }

  onEndPrieview(): void {
    this.isPreview = false;
  }

  onBack(): void {
    this.onBackCall.emit();
  }

  onSave(): void {
    let updateNews = new News();
    updateNews.Id = this.news !== null ? this.news.Id : 0;
    updateNews.Title = this.title.value;
    updateNews.PublicationDateTime = this.publicationDateTime.value ? this.publicationDateTime.value.toISOString() : null;
    updateNews.NewsText = this.newsText.value;
    if(this.img !== undefined)
    {
      updateNews.Img = this.img.dbPath
    }
    else if(this.news !== null)
    {
      updateNews.Img = this.news.Img; 
    }
    else 
    {
      updateNews.Img = "";
    }
    if(this.imgHeader !== undefined)
    {
      updateNews.ImgHeader = this.imgHeader.dbPath
    }
    else if(this.news !== null)
    {
      updateNews.ImgHeader = this.news.ImgHeader; 
    }
    else 
    {
      updateNews.ImgHeader = "";
    }
    this.onCreateUpdate.emit(updateNews);
  }

  public uploadImageFinished(event: any){
    this.img = event;
  }

  public uploadHeaderImageFinished(event: any){
    this.imgHeader = event;
  }
}
