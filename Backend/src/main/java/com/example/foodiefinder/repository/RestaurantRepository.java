package com.example.foodiefinder.repository;

import com.example.foodiefinder.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {

    List<Restaurant> findByFoodTypeIn(List<String> foodTypes);

    List<Restaurant> findByCity(String city);

    List<Restaurant> findByCityAndFoodTypeIn(String city, List<String> foodTypes);
}
