import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { FormsModule } from '@angular/forms';
import { CountryResolver } from './resolvers/country.resolver';

@NgModule({
  declarations: [HomeComponent, CountryDetailsComponent],
  imports: [CommonModule, HomeRoutingModule, FormsModule],
  providers: [CountryResolver],
})
export class HomeModule {}
