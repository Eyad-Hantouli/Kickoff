package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;

@Entity
@IdClass(MatchStatisticsCk.class)
public class MatchStatistics {
    @Id
    @ManyToOne
    @JoinColumn(name = "match_id" , referencedColumnName = "id" , nullable = false)
    /*@SequenceGenerator(
            name= "matchId",
            sequenceName = "matchId",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "matchId"
    )*/
    private Match matchId ;
    @Id
    @ManyToOne
    @JoinColumn(name = "user_name" ,referencedColumnName = "id" , nullable = false)
    private User userName ;
    private long goals ;
    @Column(name = "yellow_card")
    private long yellowCard ;
    @Column(name = "read_card")
    private long readCard ;
    private long fouls ;
    private long motm ;
    private Timestamp timestamp ;
    @ManyToOne
    @JoinColumn(name = "postion_id")
    private Position positionId ;
    // no para const //
    public MatchStatistics() {
    }
    // all para const //

    public MatchStatistics(Match matchId, User userName, long goals, long yellowCard, long readCard, long fouls, long motm, Timestamp timestamp, Position positionId) {
        this.matchId = matchId;
        this.userName = userName;
        this.goals = goals;
        this.yellowCard = yellowCard;
        this.readCard = readCard;
        this.fouls = fouls;
        this.motm = motm;
        this.timestamp = timestamp;
        this.positionId = positionId;
    }
    // setter and getter //
    public Match getMatchId() {
        return matchId;
    }

    public void setMatchId(Match matchId) {
        this.matchId = matchId;
    }

    public User getUserName() {
        return userName;
    }

    public void setUserName(User userName) {
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

    public Position getPositionId() {
        return positionId;
    }

    public void setPositionId(Position positionId) {
        this.positionId = positionId;
    }
}
