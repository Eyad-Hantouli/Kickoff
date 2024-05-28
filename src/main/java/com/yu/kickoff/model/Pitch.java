package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Pitch {
    @Id
    @SequenceGenerator(
            name= "id",
            sequenceName = "id",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "id"
    )
    private Long id ;
    private String name ;
    private Double price ;
    private Double rate ;
    private String status ;
    private String address;
    @Column(name ="ownership_document" )
    private String ownershipDocument ;
    private Timestamp timestamp ;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private User authorId ;
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City cityId ;
    // relation with MatchSchedule //
    // relation with match //
    // relation with SpecialReservation //
    // no para const //
    public Pitch() {
    }
    // all para const //

    public Pitch(Long id, String name, Double price, Double rate, String status, String ownershipDocument, String address, Timestamp timestamp, User authorId, City cityId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rate = rate;
        this.status = status;
        this.ownershipDocument = ownershipDocument;
        this.address = address;
        this.timestamp = new Timestamp(System.currentTimeMillis());
        this.authorId = authorId;
        this.cityId = cityId;
    }
    // getter and setter //
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOwnershipDocument() {
        return ownershipDocument;
    }

    public void setOwnershipDocument(String ownershipDocument) {
        this.ownershipDocument = ownershipDocument;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public User getAuthorId() {
        return authorId;
    }

    public void setAuthorId(User authorId) {
        this.authorId = authorId;
    }

    public City getCityId() {
        return cityId;
    }

    public void setCityId(City cityId) {
        this.cityId = cityId;
    }
}
