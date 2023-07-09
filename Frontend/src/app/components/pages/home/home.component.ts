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
  sortedPlaces: Place[] = [];
  selectedCity: string = '';
  selectedFoodTypes: string[] = [];
  placesList: Place[] = [];
  popularCities: City[] = POPULAR_CITIES;
  numberOfPlaces: number = 9;
  searchTerm: string = '';
  response: Place[] = [];
  isMorePlaces: boolean = true;
  loading: boolean = false;

  //sorting
  sortingOption: string = 'bestRating';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

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
    this.loading = true;
    this.placesList = this.placesList.filter((restaurant: Place) => {
      const matchesCity =
        this.selectedCity === '' || restaurant.city === this.selectedCity;
      const matchesFoodTypes =
        this.selectedFoodTypes.length === 0 ||
        this.selectedFoodTypes.includes(restaurant.typeOfFood);
      return matchesCity && matchesFoodTypes;
    });

    this.fetchPlaces();
  }

  async fetchPlaces(): Promise<void> {
    const queryParams: Params = {};
    let url = '';

    if (this.selectedCity) {
      queryParams['city'] = this.selectedCity;
      url = `http://localhost:8080/restaurants?city=${encodeURIComponent(
        queryParams['city']
      )}`;
    }

    if (this.selectedFoodTypes.length > 0) {
      queryParams['foodTypes'] = this.selectedFoodTypes.join(',');
      if (url != '') {
        url += `&foodTypes=${encodeURIComponent(queryParams['foodTypes'])}`;
      } else {
        url = `http://localhost:8080/restaurants?foodTypes=${encodeURIComponent(
          queryParams['foodTypes']
        )}`;
      }
    }

    this.router.navigate([], { queryParams: queryParams }).then(() => {
      this.http.get<Place[]>(url).subscribe((response: Place[]) => {
        this.response = response;
        this.placesList = response.slice(0, this.numberOfPlaces);
        this.placesList = this.sortPlaces(this.placesList);
        this.placesList.forEach((place) => {
          if (!place.imgUrl) {
            place.imgUrl = '../../../../assets/undefined.jpg';
          } else {
            let width = place.imgUrl.slice(
              place.imgUrl.indexOf('=w') + 2,
              place.imgUrl.indexOf('=w') + 5
            );
            let height = place.imgUrl.slice(
              place.imgUrl.indexOf('-h') + 2,
              place.imgUrl.indexOf('-h') + 5
            );
            if (width !== '200' || height !== '250') {
              place.imgUrl = place.imgUrl
                .replace(`=w${width}`, '=w200')
                .replace(`-h${height}`, '-h250');
            }
          }
        });
        this.checkMorePlaces();
        this.loading = false;
      });
    });
  }

  handleImageError(place: Place) {
    place.imgUrl = '../../../../assets/undefined.jpg';
  }

  checkMorePlaces() {
    if (this.numberOfPlaces >= this.response.length) {
      this.isMorePlaces = false;
    } else {
      this.isMorePlaces = true;
    }
  }

  showMorePlaces() {
    this.numberOfPlaces += 9;
    this.updateRestaurantList();
    this.checkMorePlaces();
  }

  onSelectPopularCity(city: string) {
    this.selectedCity = city;
    this.searchTerm = city;
    this.updateRestaurantList();
  }

  sortPlaces(places: Place[]): Place[] {
    if (this.sortingOption === 'bestRating') {
      return places.sort((a, b) => b.rate.localeCompare(a.rate));
    } else if (this.sortingOption === 'worstRating') {
      return places.sort((a, b) => a.rate.localeCompare(b.rate));
    } else {
      return this.placesList;
    }
  }

  onSortingOptionChange() {
    this.placesList = this.sortPlaces(this.placesList);
  }
}
