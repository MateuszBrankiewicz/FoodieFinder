package com.example.foodiefinder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@EnableJpaRepositories("com.example.*")
@EntityScan("com.example.*")
@SpringBootApplication

public class FoodieFinderApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodieFinderApplication.class, args);

    }
    @GetMapping("/")
    public static String mainPage(){
        return "Main Page";
    }
}

