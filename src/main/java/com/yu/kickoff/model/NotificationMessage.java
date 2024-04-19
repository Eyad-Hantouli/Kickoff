package com.yu.kickoff.model;

import jakarta.persistence.*;

@Entity
public class NotificationMessage {
    // ATT
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
    private String text ;
    // no para constructor //
    public NotificationMessage() {
    }
    // all para constructor //
    public NotificationMessage(long id, String text) {
        this.id = id;
        this.text = text;
    }
    // setter and getter
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
