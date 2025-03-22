import { AfterViewInit, Component, EventEmitter, Input, IterableDiffer, IterableDiffers, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Artist } from 'src/app/models/artist';

@Component({
  selector: 'artist-admin-overview',
  templateUrl: './artist-admin-overview.component.html',
  styleUrls: ['./artist-admin-overview.component.scss']
})
export class ArtistAdminOverviewComponent implements OnInit, AfterViewInit {

  @Input("artists") artists: Artist[] = [];
  @Output("selectedArtist") selctedArtist: EventEmitter<Artist> = new EventEmitter();
  @Output("createArtist") createArtist: EventEmitter<Artist> = new EventEmitter();
  @Output("deleteArtist") deleteArtist: EventEmitter<Artist> = new EventEmitter();

  public sortedArtistData: Artist[] = this.artists.slice();

  public filter: FormControl = new FormControl();

  public dataSource: MatTableDataSource<Artist> = new MatTableDataSource();
  public displayedColumns: string[] = ['Id', 'Name', 'Genre', 'DayStartTime', 'PlayTime', 'IsBooked'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public selectedRow: Artist | null = null;

  private iterableDiffer: IterableDiffer<Artist>;

  constructor(private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = iterableDiffers.find([]).create<Artist>();
  }

  ngOnInit() {
    this.filter.valueChanges.subscribe(filterValue => {
      this.applyFilter(filterValue);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngDoCheck(): void {
    const changes = this.iterableDiffer.diff(this.artists);
    if (changes) {
      this.dataSource.data = this.artists;
    }
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  setSelected(row: Artist) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }

  isSelected(row: Artist) {
    return this.selectedRow === row;
  }

  onEdit() {
    if (this.selectedRow) {
      this.selctedArtist.emit(this.selectedRow);
    }
  }

  onSelectRow(row: Artist) {
    this.selectedRow = row;
    this.selctedArtist.emit(row);
  }

  onCreate() {
    this.createArtist.emit(new Artist());
  }

  onDelete() {
    if (this.selectedRow) {
      this.deleteArtist.emit(this.selectedRow);
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
