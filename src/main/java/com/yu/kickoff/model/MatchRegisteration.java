package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.sql.Timestamp;
@Entity
@IdClass(MatchRegisterationCk.class)
public class MatchRegisteration {
    @Id
    @ManyToOne
    @JoinColumn(name = "match_schedule_id" , referencedColumnName = "id" , nullable = false)
    private MatchSchedule matchScheduleId ;
    @Id
    @ManyToOne
    @JoinColumn(name = "user_name" , referencedColumnName = "id" , nullable = false)
    private User userName ;
    @Column(name = "team_number")
    private  Long TeamNumber ;
    private Timestamp timestamp ;
    @ManyToOne
    @JoinColumn(name="pos_id")
    private Position posId ;
    // no para const //
    public MatchRegisteration() {
    }
    // all para const //
    public MatchRegisteration(MatchSchedule matchScheduleId, User userName, Long teamNumber, Timestamp timestamp, Position posId) {
        this.matchScheduleId = matchScheduleId;
        this.userName = userName;
        TeamNumber = teamNumber;
        this.timestamp = new Timestamp(System.currentTimeMillis());
        this.posId = posId;
    }
    // setter and getter //
    public MatchSchedule getMatchScheduleId() {
        return matchScheduleId;
    }

    public void setMatchScheduleId(MatchSchedule matchScheduleId) {
        this.matchScheduleId = matchScheduleId;
    }

    public User getUserName() {
        return userName;
    }

    public void setUserName(User userName) {
        this.userName = userName;
    }

    public Long getTeamNumber() {
        return TeamNumber;
    }

    public void setTeamNumber(Long teamNumber) {
        TeamNumber = teamNumber;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public Position getPosId() {
        return posId;
    }

    public void setPosId(Position posId) {
        this.posId = posId;
    }
}
