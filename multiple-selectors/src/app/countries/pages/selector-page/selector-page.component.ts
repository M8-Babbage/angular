import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, filter, switchMap, tap } from 'rxjs';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.scss'],
})
export class SelectorPageComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private countriesService = inject(CountriesService);

  private regionSubscription: Subscription | undefined = new Subscription();
  private countrySubscription: Subscription | undefined = new Subscription();

  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];
  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  ngOnInit(): void {
    this.onRegionChanges();
    this.onCountryChanges();
  }

  ngOnDestroy(): void {
    this.regionSubscription?.unsubscribe();
    this.countrySubscription?.unsubscribe();
  }

  onRegionChanges(): void {
    this.regionSubscription = this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => this.myForm.get('country')?.reset('')),
        tap((_) => (this.borders = [])),
        switchMap((region) => {
          return this.countriesService.getCountriesByRegion(region as Region);
        })
      )
      .subscribe((region) => {
        console.log(region);
        this.countriesByRegion = region;
      });
  }

  onCountryChanges(): void {
    this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter((value: string | null): value is string => !!value),
        switchMap((alphaCode) =>
          this.countriesService.getCountryByAlphaCode(alphaCode!)
        ),
        switchMap((country) =>
          this.countriesService.getCountryBordersByCodes(country.borders)
        )
      )
      .subscribe((countries: SmallCountry[]) => {
        this.borders = countries;
      });
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }
}
