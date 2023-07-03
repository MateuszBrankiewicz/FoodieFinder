package com.example.foodiefinder.controller;

import com.example.foodiefinder.model.Restaurant;
import com.example.foodiefinder.repository.RestaurantRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestaurantController {

    private final RestaurantRepository repository;


    public RestaurantController(RestaurantRepository repository) {
        this.repository = repository;
    }

    @GetMapping(value = "/restaurants", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Restaurant> restaurantList() {
        return repository.findAll();
    }
}
