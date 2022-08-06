import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { HelpersService } from './shared/services/helpers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'countries-with-theme-switcher';
  currentTheme: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private helpers: HelpersService
  ) {}

  ngOnInit(): void {
    this.helpers.theme$.subscribe((theme) => {
      this.document.body.className = '';
      this.document.body.classList.add(theme);
    });
  }
}
