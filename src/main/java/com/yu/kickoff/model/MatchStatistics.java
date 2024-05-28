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
    @Column(name = "red_card")
    private Long redCard ;
    private Long fouls ;
    private Long motm ;
    private Timestamp timestamp ;

    @Enumerated(value = EnumType.STRING)
    private Position position ;
    // no para const //
    public MatchStatistics() {
    }
    // all para const //

    public MatchStatistics(Match matchId, User userName, Long goals, Long yellowCard, Long redCard, Long fouls, Long motm, Timestamp timestamp, Position position) {
        this.matchId = matchId;
        this.userName = userName;
        this.goals = goals;
        this.yellowCard = yellowCard;
        this.redCard = redCard;
        this.fouls = fouls;
        this.motm = motm;
        this.timestamp = new Timestamp(System.currentTimeMillis());
        this.position = position;
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

    public Long getredCard() {
        return redCard;
    }

    public void setredCard(Long redCard) {
        this.redCard = redCard;
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

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }
}
