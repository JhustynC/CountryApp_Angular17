import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/rest_countries_responose';
import { CacheStrore } from '../interfaces/icache-store';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiURL = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStrore = {
    byCapital:   {term: '', countries: []},
    byCountry:   {term: '', countries: []},
    byRegion:    {region: '', countries: []},
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage(); //Como no es un componente de angular lo puedo poner en el constructor
  }

  private saveToLocaleStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(err => of([])),
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiURL}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(error => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap((countries) => this.cacheStore.byCapital = {term: term, countries: countries}),
      tap(() => this.saveToLocaleStorage())
    );
  }

  serachCountry(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap((countries) => this.cacheStore.byCountry = {term: term, countries: countries}),
      tap(() => this.saveToLocaleStorage())
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiURL}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap((countries) => this.cacheStore.byRegion = {region: region, countries: countries}),
      tap(() => this.saveToLocaleStorage())
    );
  }

}
