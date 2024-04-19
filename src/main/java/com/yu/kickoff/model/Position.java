package com.yu.kickoff.model;

import jakarta.persistence.*;

@Entity
public class Position {
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
    private String title ;
    // no para const //
    public Position() {
    }
    // all para const //
    public Position(long id, String title) {
        this.id = id;
        this.title = title;
    }
    // setter and getter //
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
