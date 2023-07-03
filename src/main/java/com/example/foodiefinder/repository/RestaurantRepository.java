package com.example.foodiefinder.repository;

import com.example.foodiefinder.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {

}
