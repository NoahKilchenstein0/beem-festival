import { AfterViewInit, Component, EventEmitter, Input, IterableDiffer, IterableDiffers, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Artist } from 'src/app/models/artist';

@Component({
  selector: 'artist-admin-overview',
  templateUrl: './artist-admin-overview.component.html',
  styleUrls: ['./artist-admin-overview.component.css']
})
export class ArtistAdminOverviewComponent implements OnInit, AfterViewInit {

  @Input("artists") artists: Artist[] = [];
  @Output("selectedArtist") selctedArtist: EventEmitter<Artist> = new EventEmitter();
  @Output("createArtist") createArtist: EventEmitter<Artist> = new EventEmitter();
  @Output("deleteArtist") deleteArtist: EventEmitter<Artist> = new EventEmitter();

  public sortedArtistData: Artist[] = this.artists.slice();

  public filter: FormControl = new FormControl();

  public dataSource: MatTableDataSource<Artist> = new MatTableDataSource();
  public displayedColumns: string[] = ['id', 'name', 'genre', 'dayStartTime', 'playTime', 'isBooked'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public selectedRow: Artist | null = null;

  private iterableDiffer: IterableDiffer<Artist>;

  constructor(private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = iterableDiffers.find([]).create<Artist>();
  }

  ngOnInit() {
    //this.dataSource = new MatTableDataSource(this.artists);
    this.dataSource = new MatTableDataSource(this.sortedArtistData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.artists);
    if (changes) {
      this.dataSource = new MatTableDataSource(this.artists);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setSelected(row: Artist) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    }
    else {
      this.selectedRow = row;
    }
  }

  isSelected(row: Artist) {
    return this.selectedRow === row;
  }

  onCreate() {
    this.createArtist.emit(new Artist());
  }

  onEdit() {
    if (this.selectedRow !== null) {
      this.selctedArtist.emit(this.selectedRow);
    }
  }

  onDelete() {
    if (this.selectedRow !== null) {
      this.deleteArtist.emit(this.selectedRow);
      this.selectedRow = null;
    }
  }

  sortData(sort: Sort) {
    const data = this.artists.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedArtistData = data;
    } else {
      this.sortedArtistData = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      })
    }
    this.dataSource = new MatTableDataSource(this.sortedArtistData);

  }

}
