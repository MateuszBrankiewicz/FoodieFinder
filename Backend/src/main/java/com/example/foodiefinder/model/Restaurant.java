package com.example.foodiefinder.model;


import jakarta.persistence.*;

@Entity
@Table(name = "Restaurant")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String rate;
    @Column(name = "amountRate")
    private String amountRate;
    private String addres;
    @Column(name = "imgUrl")
    private String imgUrl;
    @Column(name = "typeOfFood")
    private String foodType;
    private String city;
    protected Restaurant(){}
    public Restaurant(String name,String rate,String amountRate,String addres,String imgUrl,String typeOfFood,String city){
        this.name = name;
        this.rate = rate;
        this.amountRate = amountRate;
        this.addres= addres;
        this.imgUrl = imgUrl;
        this.foodType = typeOfFood;
        this.city=city;
    }

    public String getName(){
        return name;
    }
    public String getRate(){
        return rate;
    }
    public String getAmountRate(){
        return amountRate;
    }
    public String getAddres(){
        return addres;
    }
    public String getImgUrl(){
        return imgUrl;
    }
    public String getTypeOfFood(){
        return foodType;
    }
    public String getCity(){
        return city;
    }
    public Long getId() {
        return id;
    }
}
