import { AfterViewInit, Component, EventEmitter, Input, IterableDiffer, IterableDiffers, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'faq-admin-overview',
  templateUrl: './faq-admin-overview.component.html',
  styleUrls: ['./faq-admin-overview.component.scss']
})
export class FaqAdminOverviewComponent implements OnInit {
  @Input("questions") questions: Question[] = [];
  @Output("selectedQuestion") selctedQuestion: EventEmitter<Question> = new EventEmitter();
  @Output("createQuestion") createquestion: EventEmitter<Question> = new EventEmitter();
  @Output("deleteQuestion") deletequestion: EventEmitter<Question> = new EventEmitter();
  
  public filter: FormControl = new FormControl();

  public dataSource: MatTableDataSource<Question> = new MatTableDataSource();  
  public displayedColumns: string[] = ['id', 'title'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public selectedRow: Question | null = null;

  private iterableDiffer: IterableDiffer<Question>;
  
  constructor(private iterableDiffers:IterableDiffers) { 
    this.iterableDiffer = iterableDiffers.find([]).create<Question>();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.questions);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.questions);
    if (changes) {
      this.dataSource = new MatTableDataSource(this.questions);
    }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setSelected(row: Question){
    if(this.selectedRow === row){
      this.selectedRow = null;
    }
    else {   
      this.selectedRow = row;
    }
  }

  isSelected(row: Question){
    return this.selectedRow === row;
  }

  onCreate(){
    this.createquestion.emit(new Question());
  }

  onEdit(){
    if(this.selectedRow !== null){
      this.selctedQuestion.emit(this.selectedRow);
    }
  }

  onDelete(){
    if(this.selectedRow !== null){
      this.deletequestion.emit(this.selectedRow);
      this.selectedRow = null;
    }
  }
}
