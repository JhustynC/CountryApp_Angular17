import { Component } from '@angular/core';
import { Country } from '../../interfaces/rest_countries_responose';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  private countries: Country[] = [];
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {}

  get Countries(): Country[] {
    return this.countries
  }

  ngOnInit(){
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }

  seachByCountry(term: string):void{
    this.initialValue = term;
    this.countriesService.serachCountry(term).subscribe(
     {
        next: (value) => this.countries = value,
        error: (err) => console.error(err),
        complete: () => console.info('complete')
      }
    );
  }

}
