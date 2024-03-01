import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/rest_countries_responose';
import { Observable } from 'rxjs';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  private countries: Country[] = [];
  private regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(){
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  get Countries(): Country[] {
    return this.countries;
  }

  get Regions(): Region[] {
    return this.regions
  }

  searchByRegion (region: Region):void{
    this.selectedRegion = region;
    this.countriesService.searchRegion(region).subscribe(
      {
        next: (value) => this.countries = value,
        error: (err) => console.error(err),
        complete: () => console.info('complete')
      }
    );
  }

}
