import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { buffer, forkJoin, map, Observable, race } from 'rxjs';
import { codeApi, countryApi } from 'src/app/shared/constants/api.constants';
import { DataService } from 'src/app/shared/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class CountryResolver implements Resolve<boolean> {
  constructor(private dataService: DataService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.dataService.get(`${countryApi}/${route.params['name']}`);
  }
}
