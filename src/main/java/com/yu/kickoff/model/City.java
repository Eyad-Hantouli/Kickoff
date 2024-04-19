package com.yu.kickoff.model;

import jakarta.persistence.*;

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
    private long id ;
    private String name ;
    // no para const //
    public City() {
    }
    // all para const //
    public City(long id, String name) {
        this.id = id;
        this.name = name;
    }
    // setter and getter //
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
}
