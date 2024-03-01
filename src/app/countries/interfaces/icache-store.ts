import { Region } from "./region.type";
import { Country } from "./rest_countries_responose";

export interface CacheStrore {
  byCapital: TermCountries;
  byCountry: TermCountries;
  byRegion: RegionCountries;
}


export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  region: Region;
  countries: Country[];
}
