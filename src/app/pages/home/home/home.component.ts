import { Component, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  lastValueFrom,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import {
  countriesApi,
  countryApi,
  regionApi,
} from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ICountry } from '../ICountry.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  countries: ICountry[] = [];
  searchTerm$ = new Subject<string>();

  regions = [
    'Africa',
    'Asia',
    'Europe',
    'Oceania',
    'Americas',
    'Polar',
    'Antarctic Ocean',
    'Antarctic',
  ];

  constructor(
    private dataService: DataService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    lastValueFrom(
      this.dataService.get(countriesApi).pipe(
        tap((res) => {
          this.countries = res;
        })
      )
    );
    this.search();
  }
  search(): void {
    lastValueFrom(
      this.searchTerm$.pipe(
        distinctUntilChanged(),
        debounceTime(500),
        switchMap((term) => {
          this.loadingService.start();
          if (term) {
            return this.dataService.get(`${countryApi}/${term}`);
          } else {
            return this.dataService.get(countriesApi);
          }
        }),
        tap((res) => {
          this.loadingService.stop();
          this.countries = res;
        })
      )
    );
  }
  selectCountry(ev: any) {
    this.loadingService.start();
    this.dataService
      .get(`${regionApi}/${ev.value}`)
      .pipe(
        tap((res) => {
          this.loadingService.stop();
          this.countries = res;
        })
      )
      .toPromise();
  }
}
