import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/shared/models/Place';
import { sample_places } from 'src/data';
import { POPULAR_CITIES } from 'src/app/shared/constants';
import { City } from 'src/app/shared/models/City';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  places: Place[] = sample_places;
  selectedCity: string = '';
  selectedFoodTypes: string[] = [];
  placesList: Place[] = [];
  popularCities: City[] = POPULAR_CITIES.slice(0, 9);
  searchTerm: string = '';

  //sorting
  sortingOption: string = 'bestRating';

  constructor(private router: Router, private route: ActivatedRoute) {}

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
    this.placesList = this.places.filter((restaurant: Place) => {
      const matchesCity =
        this.selectedCity === '' || restaurant.city === this.selectedCity;
      const matchesFoodTypes =
        this.selectedFoodTypes.length === 0 ||
        this.selectedFoodTypes.includes(restaurant.food_type);
      return matchesCity && matchesFoodTypes;
    });

    //update URL
    const queryParams: Params = {};
    if (this.selectedCity) {
      queryParams['city'] = this.selectedCity;
    }
    if (this.selectedFoodTypes.length > 0) {
      queryParams['foodTypes'] = this.selectedFoodTypes.join(',');
    }
    this.router.navigate([], { queryParams: queryParams });
  }

  onSelectPopularCity(city: string) {
    this.selectedCity = city;
    this.searchTerm = city;
    this.updateRestaurantList();
  }

  sortPlaces() {
    if (this.sortingOption === 'bestRating') {
      this.places.sort((a, b) => b.reviews.localeCompare(a.reviews));
    } else if (this.sortingOption === 'worstRating') {
      this.places.sort((a, b) => a.reviews.localeCompare(b.reviews));
    }
  }

  onSortingOptionChange() {
    this.sortPlaces();
    this.updateRestaurantList();
  }
}
