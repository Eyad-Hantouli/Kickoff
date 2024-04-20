package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;


@Entity
@IdClass(RelationCk.class)
public class Relations {
    @Id
    @ManyToOne
    @JoinColumn(name = "source_user_name" , referencedColumnName = "id" , nullable = false)
    private User sourceUserName ;
    @Id
    @ManyToOne
    @JoinColumn(name = "target_user_name" , referencedColumnName = "id" , nullable = false)
    private User targetUserName ;
    private String type ;
    private Timestamp timestamp ;
    // no para const //
    public Relations() {
    }
    // all para cons //
    public Relations(User sourceUserName, User targetUserName, String type, Timestamp timestamp) {
        this.sourceUserName = sourceUserName;
        this.targetUserName = targetUserName;
        this.type = type;
        this.timestamp = timestamp;
    }
    //setter and getter //
    public User getSourceUserName() {
        return sourceUserName;
    }

    public void setSourceUserName(User sourceUserName) {
        this.sourceUserName = sourceUserName;
    }

    public User getTargetUserName() {
        return targetUserName;
    }

    public void setTargetUserName(User targetUserName) {
        this.targetUserName = targetUserName;
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
