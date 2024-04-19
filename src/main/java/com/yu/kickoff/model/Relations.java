package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;


@Entity
public class Relations {
    @Id
    private String sourceUserName ;
    @Id
    private String targetUserName ;
    private String type ;
    private Timestamp timestamp ;
    // no para const //
    public Relations() {
    }
    // all para cons //
    public Relations(String sourceUserName, String targetUserName, String type, Timestamp timestamp) {
        this.sourceUserName = sourceUserName;
        this.targetUserName = targetUserName;
        this.type = type;
        this.timestamp = timestamp;
    }
    //setter and getter //
    public String getSourceUserName() {
        return sourceUserName;
    }

    public void setSourceUserName(String sourceUserName) {
        this.sourceUserName = sourceUserName;
    }

    public String getTargetUserName() {
        return targetUserName;
    }

    public void setTargetUserName(String targetUserName) {
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
