package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class City {
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
    //relation with pitch //
    @OneToMany(mappedBy = "cityId")
    private List<Pitch> pitches ;
    // relation with contacts //
    @OneToMany(mappedBy = "cityId")
    private List<Contacts> contacts ;
    // relation with user //
    @OneToMany(mappedBy = "cityId")
    private List<User> users ;
    // no para const //
    public City() {
    }
    // all para const //

    public City(Long id, String name, List<Pitch> pitches, List<Contacts> contacts, List<User> users) {
        this.id = id;
        this.name = name;
        this.pitches = pitches;
        this.contacts = contacts;
        this.users = users;
    }
    // setter and getter //

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

    public List<Pitch> getPitches() {
        return pitches;
    }

    public List<Contacts> getContacts() {
        return contacts;
    }

    public List<User> getUsers() {
        return users;
    }
}
