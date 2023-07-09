import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CITIES } from 'src/app/shared/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  cities: string[] = CITIES;
  suggestedCities: string[] = [];
  isInputFocused = false;

  @Input() selectedCity: string = '';
  @Input() searchTerm: string = '';

  @Output() citySelected: EventEmitter<string> = new EventEmitter<string>();

  onSelectCity(city: string) {
    this.searchTerm = city;
    this.selectedCity = city;
    this.citySelected.emit(city);
  }

  showMore() {
    this.suggestedCities = this.cities.filter((city) =>
      city.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    if (this.searchTerm) {
      this.isInputFocused = true;
    } else {
      this.isInputFocused = false;
    }
  }

  hideSuggestions() {
    setTimeout(() => {
      this.suggestedCities = [];
    }, 200);
  }

  clearInput() {
    this.searchTerm = '';
    this.selectedCity = '';
    this.citySelected.emit('');
  }
}
