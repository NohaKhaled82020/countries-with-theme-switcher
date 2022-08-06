import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { codeApi } from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
})
export class CountryDetailsComponent implements OnInit {
  country!: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        tap((res) => {
          this.country = res['country'][0];
        })
      )
      .toPromise();
  }

  getCodeDetails(border: string): void {
    this.dataService
      .get(`${codeApi}/${border}`)
      .pipe(
        tap((res) => {
          this.country = res;
        })
      )
      .toPromise();
  }
}
