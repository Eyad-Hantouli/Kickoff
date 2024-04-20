package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;

@Entity
public class Contacts {
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
    @Column(name = "first_name")
    private String firstName ;
    @Column(name = "mid_name")
    private String midName ;
    @Column(name = "last_name")
    private String lastName ;
    private String address ;
    private String message ;
    private Timestamp timestamp ;
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City cityId ;
    // no para const //
    public Contacts() {
    }
    // all para const //

    public Contacts(long id, String firstName, String midName, String lastName, String address, String message, Timestamp timestamp, City cityId) {
        this.id = id;
        this.firstName = firstName;
        this.midName = midName;
        this.lastName = lastName;
        this.address = address;
        this.message = message;
        this.timestamp = timestamp;
        this.cityId = cityId;
    }
    // getter and setter //
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMidName() {
        return midName;
    }

    public void setMidName(String midName) {
        this.midName = midName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public City getCityId() {
        return cityId;
    }

    public void setCityId(City cityId) {
        this.cityId = cityId;
    }
}
