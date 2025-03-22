import { AfterViewInit, Component, EventEmitter, Input, IterableDiffer, IterableDiffers, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { News } from 'src/app/models/news';

@Component({
  selector: 'news-admin-overview',
  templateUrl: './news-admin-overview.component.html',
  styleUrls: ['./news-admin-overview.component.scss']
})
export class NewsAdminOverviewComponent implements OnInit, AfterViewInit {

  @Input("news") news: News[] = [];
  @Output("selectedNews") selctedNews: EventEmitter<News> = new EventEmitter();
  @Output("createNews") createNews: EventEmitter<News> = new EventEmitter();
  @Output("deleteNews") deleteNews: EventEmitter<News> = new EventEmitter();
  
  public filter: FormControl = new FormControl();
  public dataSource: MatTableDataSource<News> = new MatTableDataSource();  
  public displayedColumns: string[] = ['id', 'title', 'publicationDateTime'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public selectedRow: News | null = null;
  private iterableDiffer: IterableDiffer<News>;
  
  constructor(private iterableDiffers:IterableDiffers) { 
    this.iterableDiffer = iterableDiffers.find([]).create<News>();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.news);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.news);
    if (changes) {
      this.dataSource = new MatTableDataSource(this.news);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setSelected(row: News){
    if(this.selectedRow === row){
      this.selectedRow = null;
    }
    else {   
      this.selectedRow = row;
    }
  }

  isSelected(row: News){
    return this.selectedRow === row;
  }

  onCreate(){
    this.createNews.emit(new News());
  }

  onEdit(): void {
    if (this.selectedRow) {
      this.selctedNews.emit(this.selectedRow);
    }
  }

  onDelete(row?: News): void {
    if (row) {
      this.selectedRow = row;
    }
    if (this.selectedRow) {
      this.deleteNews.emit(this.selectedRow);
    }
  }
}
