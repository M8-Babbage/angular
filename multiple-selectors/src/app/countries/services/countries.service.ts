import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, combineLatest, map, of } from 'rxjs';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private httpService = inject(HttpClient);

  private readonly _URL = 'https://restcountries.com/v3.1';
  private _REGIONS: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  get regions(): Region[] {
    return [...this._REGIONS];
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);
    const url = `${this._URL}/region/${region}?fields=cca3,name,borders`;
    return this.httpService.get<Country[]>(url).pipe(
      map((countries) =>
        countries.map((country) => {
          return {
            name: country.name.common,
            cca3: country.cca3,
            borders: country.borders ?? [],
          };
        })
      )
    );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    const url = `${this._URL}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.httpService.get<Country>(url).pipe(
      map((country) => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [],
      }))
    );
  }

  getCountryBordersByCodes(borders: string[]): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return of([]);

    let countryRequest: Observable<SmallCountry>[] = [];

    borders.forEach((alphaCode) => {
      const request = this.getCountryByAlphaCode(alphaCode);
      countryRequest = [...countryRequest, request];
    });

    return combineLatest(countryRequest);
  }
}
