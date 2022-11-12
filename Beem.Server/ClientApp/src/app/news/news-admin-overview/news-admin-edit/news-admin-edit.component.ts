import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { News } from 'src/app/models/news';

@Component({
  selector: 'news-admin-edit',
  templateUrl: './news-admin-edit.component.html',
  styleUrls: ['./news-admin-edit.component.css']
})
export class NewsAdminEditComponent implements  OnChanges {
  @Input("news") news: News | null = null;
  @Output("onBack") onBackCall: EventEmitter<void> = new EventEmitter<void>();
  @Output("onCreateUpdate") onCreateUpdate: EventEmitter<News> = new EventEmitter<News>();

  public title: FormControl = new FormControl({value: this.news?.title, disabled: false});
  //Genre möglich noch auf Select Umstellen mit einem Enum???
  public publicationDateTime: FormControl = new FormControl({value: this.news?.publicationDateTime, disabled: false});
  public newsText: FormControl = new FormControl({value: this.news?.newsText, disabled: false});
  public img!: { dbPath: ''; };
  public imgHeader!: { dbPath: ''; };

  public isPreview: boolean = false;
  public editedNews: News = new News();

  ngOnChanges(): void {
      this.title.setValue(this.news?.title);
      this.publicationDateTime.setValue(this.news?.publicationDateTime);
      this.newsText.setValue(this.news?.newsText);
  }

  onPreview(): void {
    this.editedNews.title = this.title.value;
    this.editedNews.publicationDateTime = this.publicationDateTime.value;
    this.editedNews.newsText = this.newsText.value;    
    if(this.img !== undefined)
    {
      this.editedNews.img = this.img.dbPath
    }
    else if(this.news !== null)
    {
      this.editedNews.img = this.news.img; 
    }
    else 
    {
      this.editedNews.img = "";
    }
    if(this.imgHeader !== undefined)
    {
      this.editedNews.imgHeader = this.imgHeader.dbPath
    }
    else if(this.news !== null)
    {
      this.editedNews.imgHeader = this.news.imgHeader; 
    }
    else 
    {
      this.editedNews.imgHeader = "";
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
    updateNews.id = this.news !== null ? this.news.id : 0;
    updateNews.title = this.title.value;
    updateNews.publicationDateTime = this.publicationDateTime.value;
    updateNews.newsText = this.newsText.value;
    if(this.img !== undefined)
    {
      updateNews.img = this.img.dbPath
    }
    else if(this.news !== null)
    {
      updateNews.img = this.news.img; 
    }
    else 
    {
      updateNews.img = "";
    }
    if(this.imgHeader !== undefined)
    {
      updateNews.imgHeader = this.imgHeader.dbPath
    }
    else if(this.news !== null)
    {
      updateNews.imgHeader = this.news.imgHeader; 
    }
    else 
    {
      updateNews.imgHeader = "";
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
