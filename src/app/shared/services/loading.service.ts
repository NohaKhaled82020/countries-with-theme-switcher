import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingBar = this.loader.useRef('manual');
  constructor(private loader: LoadingBarService) {}

  start(): void {
    this.loadingBar.start();
  }

  stop(): void {
    this.loadingBar.complete();
  }
}
