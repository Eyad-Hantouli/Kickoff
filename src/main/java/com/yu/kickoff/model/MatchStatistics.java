package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@IdClass(MatchStatisticsCk.class)
public class MatchStatistics {
    @Id
    @ManyToOne
    @JoinColumn(name = "match_id" , referencedColumnName = "id" , nullable = false)
    private Match matchId ;
    @Id
    @ManyToOne
    @JoinColumn(name = "user_name" ,referencedColumnName = "id" , nullable = false)
    private User userName ;
    private Long goals ;
    @Column(name = "yellow_card")
    private Long yellowCard ;
    @Column(name = "read_card")
    private Long readCard ;
    private Long fouls ;
    private Long motm ;
    private Timestamp timestamp ;
    @ManyToOne
    @JoinColumn(name = "postion_id")
    private Position positionId ;
    // no para const //
    public MatchStatistics() {
    }
    // all para const //

    public MatchStatistics(Match matchId, User userName, Long goals, Long yellowCard, Long readCard, Long fouls, Long motm, Timestamp timestamp, Position positionId) {
        this.matchId = matchId;
        this.userName = userName;
        this.goals = goals;
        this.yellowCard = yellowCard;
        this.readCard = readCard;
        this.fouls = fouls;
        this.motm = motm;
        this.timestamp = new Timestamp(System.currentTimeMillis());
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

    public Long getGoals() {
        return goals;
    }

    public void setGoals(Long goals) {
        this.goals = goals;
    }

    public Long getYellowCard() {
        return yellowCard;
    }

    public void setYellowCard(Long yellowCard) {
        this.yellowCard = yellowCard;
    }

    public Long getReadCard() {
        return readCard;
    }

    public void setReadCard(Long readCard) {
        this.readCard = readCard;
    }

    public Long getFouls() {
        return fouls;
    }

    public void setFouls(Long fouls) {
        this.fouls = fouls;
    }

    public Long getMotm() {
        return motm;
    }

    public void setMotm(Long motm) {
        this.motm = motm;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public Position getPositionId() {
        return positionId;
    }

    public void setPositionId(Position positionId) {
        this.positionId = positionId;
    }
}
