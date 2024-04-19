package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;

@Entity
public class Notifications {
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
    private String type ;
    private Timestamp timestamp ;

    // no para constructor //
    public Notifications() {
    }
    // all para constructor //
    public Notifications(long id, String type, Timestamp timestamp, long matchScheduleId, long messageTextId, long senderUserName, long reciverUserName) {
        this.id = id;
        this.type = type;
        this.timestamp = timestamp;

    }
    // getter and setter //
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }


}
