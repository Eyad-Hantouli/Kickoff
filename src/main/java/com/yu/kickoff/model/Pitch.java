package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;

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
    private long id ;
    private String name ;
    private double price ;
    private double rate ;
    private String status ;
    @Column(name ="ownership_document" )
    private String ownershipDocument ;
    private Timestamp timestamp ;
    // no para const //
    public Pitch() {
    }
    // all para const //
    public Pitch(long id, String name, double price, double rate, String status, String ownershipDocument, Timestamp timestamp) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rate = rate;
        this.status = status;
        this.ownershipDocument = ownershipDocument;
        this.timestamp = timestamp;
    }
    // getter and setter //
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
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

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
