package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;
@Entity
@IdClass(MatchRegisterationCk.class)
public class MatchRegisteration {
    @Id
    @ManyToOne
    @JoinColumn(name = "match_schedule_id" , referencedColumnName = "id" , nullable = false)
    /*@SequenceGenerator(
            name= "matchScheduleId",
            sequenceName = "matchScheduleId",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "matchScheduleId"
    )*/
    private MatchSchedule matchScheduleId ;
    @Id
    @ManyToOne
    @JoinColumn(name = "user_name" , referencedColumnName = "id" , nullable = false)
    private User userName ;
    @Column(name = "team_number")
    private  long TeamNumber ;
    private Timestamp timestamp ;
    @ManyToOne
    @JoinColumn(name="pos_id")
    private Position posId ;
    // no para const //
    public MatchRegisteration() {
    }
    // all para const //
    public MatchRegisteration(MatchSchedule matchScheduleId, User userName, long teamNumber, Timestamp timestamp, Position posId) {
        this.matchScheduleId = matchScheduleId;
        this.userName = userName;
        TeamNumber = teamNumber;
        this.timestamp = timestamp;
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

    public long getTeamNumber() {
        return TeamNumber;
    }

    public void setTeamNumber(long teamNumber) {
        TeamNumber = teamNumber;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Position getPosId() {
        return posId;
    }

    public void setPosId(Position posId) {
        this.posId = posId;
    }
}
