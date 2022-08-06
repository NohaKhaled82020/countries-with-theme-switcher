import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { COLOR_THEME } from 'src/app/shared/constants/general.constants';
import { HelpersService } from 'src/app/shared/services/helpers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  theme: string = 'light-theme';

  constructor(public helpers: HelpersService) {}

  ngOnInit(): void {
    const currentTheme = this.helpers.getItemFromLocalStorage(COLOR_THEME);
    if (currentTheme) {
      this.theme = currentTheme;
      this.helpers.theme$.next(currentTheme);
    }
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.helpers.theme$.next(this.theme);
    this.helpers.setItemToLocalStorage(COLOR_THEME, this.theme);
  }
}
