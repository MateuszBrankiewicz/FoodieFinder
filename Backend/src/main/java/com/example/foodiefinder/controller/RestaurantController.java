package com.example.foodiefinder.controller;

import com.example.foodiefinder.model.Restaurant;
import com.example.foodiefinder.repository.RestaurantRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RestaurantController {

    private final RestaurantRepository repository;


    public RestaurantController(RestaurantRepository repository) {
        this.repository = repository;
    }
    @CrossOrigin("http://localhost:4200")
    @GetMapping(value = "/restaurants", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Restaurant> restaurantList(@RequestParam(required = false) String city,
                                           @RequestParam(required = false) List<String> foodTypes) {
        System.out.println(city+" " + foodTypes);
        if (city != null && foodTypes != null && !foodTypes.isEmpty()) {
            return repository.findByCityAndFoodTypeIn(city, foodTypes);
        } else if (city != null) {
            return repository.findByCity(city);
        } else if (foodTypes != null && !foodTypes.isEmpty()) {
            return repository.findByFoodTypeIn(foodTypes);
        } else {
            return repository.findAll();
        }
    }}

