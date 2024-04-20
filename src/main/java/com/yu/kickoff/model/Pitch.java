package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;
import java.util.List;

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
    @ManyToOne
    @JoinColumn(name = "author_id")
    private User authorId ;
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City cityId ;
    // relation with MatchSchedule //
    @OneToMany(mappedBy = "pitchId")
    private List<MatchSchedule> matchSchedules ;
    // relation with match //
    @OneToMany(mappedBy = "pitchId")
    private List<Match> matches ;
    // relation with SpecialReservation //
    @OneToMany(mappedBy = "pitchId")
    private List<SpecialReservation> specialReservations ;
    // no para const //
    public Pitch() {
    }
    // all para const //

    public Pitch(long id, String name, double price, double rate, String status, String ownershipDocument, Timestamp timestamp, User authorId, City cityId, List<MatchSchedule> matchSchedules, List<Match> matches, List<SpecialReservation> specialReservations) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rate = rate;
        this.status = status;
        this.ownershipDocument = ownershipDocument;
        this.timestamp = timestamp;
        this.authorId = authorId;
        this.cityId = cityId;
        this.matchSchedules = matchSchedules;
        this.matches = matches;
        this.specialReservations = specialReservations;
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

    public List<MatchSchedule> getMatchSchedules() {
        return matchSchedules;
    }

    public List<Match> getMatches() {
        return matches;
    }

    public List<SpecialReservation> getSpecialReservations() {
        return specialReservations;
    }
}
