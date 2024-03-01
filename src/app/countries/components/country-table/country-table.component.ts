import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/rest_countries_responose';

@Component({
  selector: 'countries-country-table',
  templateUrl: './country-table.component.html'
})
export class CountryTableComponent {
  @Input() countries: Country[] = [];
}
