import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/shared/models/Place';

import { POPULAR_CITIES } from 'src/app/shared/constants';
import { City } from 'src/app/shared/models/City';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  places: Place[] = [];
  selectedCity: string = '';
  selectedFoodTypes: string[] = [];
  placesList: Place[] = [];
  popularCities: City[] = POPULAR_CITIES.slice(0, 7);
  searchTerm: string = '';

  //sorting
  sortingOption: string = 'bestRating';
  

  constructor(private router: Router, private route: ActivatedRoute,private http:HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.selectedCity = params['city'] || '';
      this.selectedFoodTypes = params['foodTypes']
        ? params['foodTypes'].split(',')
        : [];
      this.updateRestaurantList();
    });
  }

  onCitySelected(city: string) {
    this.selectedCity = city;
    this.updateRestaurantList();
  }

  onFoodTypesSelected(foodTypes: string[]) {
    this.selectedFoodTypes = foodTypes;
    this.updateRestaurantList();
  }

  updateRestaurantList() {
    let url = "";
    this.placesList = this.places.filter((restaurant: Place) => {
      const matchesCity =
        this.selectedCity === '' || restaurant.city === this.selectedCity;
      const matchesFoodTypes =
        this.selectedFoodTypes.length === 0 ||
        this.selectedFoodTypes.includes(restaurant.typeOfFood);
      return matchesCity && matchesFoodTypes;
    });

   
    const queryParams: Params = {};
    if (this.selectedCity) {
      queryParams['city'] = this.selectedCity;
      url = `http://localhost:8080/restaurants?city=${encodeURIComponent(queryParams['city'])}`;
    }
    if (this.selectedFoodTypes.length > 0) {
      queryParams['foodTypes'] = this.selectedFoodTypes.join(',');
      url += `&foodTypes=${encodeURIComponent(queryParams['foodTypes'])}`;
    }
    this.router.navigate([], { queryParams: queryParams }).then(() => {
     
      this.http.get<Place[]>(url).subscribe((response: Place[]) => {
        this.placesList = response;
        console.log(this.placesList);
      });
      
    });
  }
  onSelectPopularCity(city: string) {
    this.selectedCity = city;
    this.searchTerm = city;
    this.updateRestaurantList();
  }

  sortPlaces() {
    if (this.sortingOption === 'bestRating') {
      this.places.sort((a, b) => b.rate.localeCompare(a.rate));
    } else if (this.sortingOption === 'worstRating') {
      this.places.sort((a, b) => a.rate.localeCompare(b.rate));
    }
  }

  onSortingOptionChange() {
    this.sortPlaces();
    this.updateRestaurantList();
  }
}