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
    private Long id ;
    private String title ;
    // relation with MatchRegisteration
    // relation with Match Statistics //
    // no para const //
    public Position() {
    }
    // all para const //

    public Position(Long id, String title) {
        this.id = id;
        this.title = title;
    }
    // setter and getter //

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
