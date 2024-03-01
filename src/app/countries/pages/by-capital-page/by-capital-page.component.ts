import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/rest_countries_responose';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {

  private countries: Country[] = [];
  public isLoadign: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: CountriesService){}

  get Countries(){
    return this.countries
  }

  ngOnInit(): void{
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  seachByCapital(term: string):void{
    this.isLoadign = true;
    this.countriesService.searchCapital(term).subscribe(
     {
      next: (value) => {
        this.countries = value;
        this.isLoadign = false;
      },
      error: (err) => console.error(err),
      complete: () => console.info('complete')
      }
    );
  }
}
