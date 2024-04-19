package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;
@Entity
public class MatchRegisteration {
    @Id
    @Column(name = "match_schedule_id")
    @SequenceGenerator(
            name= "matchScheduleId",
            sequenceName = "matchScheduleId",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "matchScheduleId"
    )
    private long matchScheduleId ;
    @Id
    @Column(name = "user_name")
    private String userName ;
    @Column(name = "team_number")
    private  long TeamNumber ;
    private Timestamp timestamp ;
    // no para const //
    public MatchRegisteration() {
    }
    // all para const //
    public MatchRegisteration(long matchScheduleId, String userName, long teamNumber, Timestamp timestamp) {
        this.matchScheduleId = matchScheduleId;
        this.userName = userName;
        TeamNumber = teamNumber;
        this.timestamp = timestamp;
    }
    // setter and getter //
    public long getMatchScheduleId() {
        return matchScheduleId;
    }

    public void setMatchScheduleId(long matchScheduleId) {
        this.matchScheduleId = matchScheduleId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
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
}
