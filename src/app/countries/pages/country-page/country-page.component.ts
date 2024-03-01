import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/rest_countries_responose';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent {

  public country?: Country;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
    ) { }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id)),
      )
      .subscribe(country => {
        if(!country) return this.router.navigateByUrl('');
        this.country = country;
        return;
      });
  }


  // searchCountry(code: string){
  //   this.countriesService.searchCountryByAlphaCode(code)
  //   .subscribe(country => {

  //   });
  // }

}
