package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;

@Entity
public class MatchStatistics {
    @Id
    @Column(name = "match_id")
    @SequenceGenerator(
            name= "matchId",
            sequenceName = "matchId",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "matchId"
    )
    private long matchId ;
    @Id
    @Column(name = "user_name")
    private String userName ;
    private long goals ;
    @Column(name = "yellow_card")
    private long yellowCard ;
    @Column(name = "read_card")
    private long readCard ;
    private long fouls ;
    private long motm ;
    private Timestamp timestamp ;
    // no para const //
    public MatchStatistics() {
    }
    // all para const //

    public MatchStatistics(long matchId, String userName, long goals, long yellowCard, long readCard, long fouls, long motm, Timestamp timestamp) {
        this.matchId = matchId;
        this.userName = userName;
        this.goals = goals;
        this.yellowCard = yellowCard;
        this.readCard = readCard;
        this.fouls = fouls;
        this.motm = motm;
        this.timestamp = timestamp;
    }
    // setter and getter //
    public long getMatchId() {
        return matchId;
    }

    public void setMatchId(long matchId) {
        this.matchId = matchId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public long getGoals() {
        return goals;
    }

    public void setGoals(long goals) {
        this.goals = goals;
    }

    public long getYellowCard() {
        return yellowCard;
    }

    public void setYellowCard(long yellowCard) {
        this.yellowCard = yellowCard;
    }

    public long getReadCard() {
        return readCard;
    }

    public void setReadCard(long readCard) {
        this.readCard = readCard;
    }

    public long getFouls() {
        return fouls;
    }

    public void setFouls(long fouls) {
        this.fouls = fouls;
    }

    public long getMotm() {
        return motm;
    }

    public void setMotm(long motm) {
        this.motm = motm;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
