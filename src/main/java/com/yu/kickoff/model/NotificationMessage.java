package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.util.List;

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
    private Long id ;
    private String text ;
    // relation with Notifications
    @OneToMany(mappedBy = "messageTextId")
    private List<Notifications> notifications ;
    // no para constructor //
    public NotificationMessage() {
    }
    // all para constructor //
    public NotificationMessage(Long id, String text, List<Notifications> notifications) {
        this.id = id;
        this.text = text;
        this.notifications = notifications;
    }
    // setter and getter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
    public List<Notifications> getNotifications() {
        return notifications;
    }
}
