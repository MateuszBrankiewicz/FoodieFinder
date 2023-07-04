import { Component, EventEmitter, Output } from '@angular/core';
import { TAGS } from 'src/app/shared/constants';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent {
  foodTypes: Tag[] = TAGS;
  selectedFoodTypes: string[] = [];

  @Output() foodTypesSelected: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  onSelectFoodType(foodType: string) {
    const index = this.selectedFoodTypes.indexOf(foodType);
    if (index > -1) {
      this.selectedFoodTypes.splice(index, 1);
    } else {
      this.selectedFoodTypes.push(foodType);
    }
    this.foodTypesSelected.emit(this.selectedFoodTypes);
  }
}
