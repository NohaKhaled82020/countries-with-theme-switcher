import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  theme$ = new BehaviorSubject('light-theme');

  constructor() {}

  setItemToLocalStorage(name: string, value: any): void {
    localStorage.setItem(name, JSON.stringify(value));
  }
  getItemFromLocalStorage(name: string): any {
    return JSON.parse(localStorage.getItem(name) || '');
  }
  removeItemFromLocalStorage(name: string): any {
    localStorage.removeItem(name);
  }
  checkItemFromLocalStorage(name: string): boolean {
    return !!localStorage.getItem(name);
  }
}
