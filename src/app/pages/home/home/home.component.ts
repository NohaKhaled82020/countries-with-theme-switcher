import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
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
  searchValue: string = '';
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
    this.dataService
      .get(countriesApi)
      .pipe(
        tap((res) => {
          this.countries = res;
        })
      )
      .toPromise();
  }
  search(): void {
    this.loadingService.start();
    this.dataService
      .get(`${countryApi}/${this.searchValue}`)
      .pipe(
        tap((res) => {
          this.loadingService.stop();
          this.countries = res;
        })
      )
      .toPromise();
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
