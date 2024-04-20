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
    @ManyToOne
    @JoinColumn(name = "match_schedule_id")
    private MatchSchedule matchScheduleId ;
    @ManyToOne
    @JoinColumn(name = "message_text_Id")
    private NotificationMessage messageTextId ;
    @ManyToOne
    @JoinColumn(name = "sender_username")
    private User senderUserName ;
    @ManyToOne
    @JoinColumn(name = "receiver_username")
    private User receiverUserName ;
    // no para constructor //
    public Notifications() {
    }
    // all para constructor //

    public Notifications(long id, String type, Timestamp timestamp, MatchSchedule matchScheduleId, NotificationMessage messageTextId, User senderUserName, User receiverUserName) {
        this.id = id;
        this.type = type;
        this.timestamp = timestamp;
        this.matchScheduleId = matchScheduleId;
        this.messageTextId = messageTextId;
        this.senderUserName = senderUserName;
        this.receiverUserName = receiverUserName;
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

    public MatchSchedule getMatchScheduleId() {
        return matchScheduleId;
    }
    public void setMatchScheduleId(MatchSchedule matchScheduleId) {
        this.matchScheduleId = matchScheduleId;
    }

    public NotificationMessage getMessageTextId() {
        return messageTextId;
    }

    public void setMessageTextId(NotificationMessage messageTextId) {
        this.messageTextId = messageTextId;
    }

    public User getSenderUserName() {
        return senderUserName;
    }

    public void setSenderUserName(User senderUserName) {
        this.senderUserName = senderUserName;
    }

    public User getReceiverUserName() {
        return receiverUserName;
    }

    public void setReceiverUserName(User receiverUserName) {
        this.receiverUserName = receiverUserName;
    }
}
