package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;
import java.util.List;

@Entity
public class MatchSchedule {
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
    @Column(name = "start_time")
    private Timestamp startTime ;
    private String status ;
    private Timestamp timestamp ;
    @ManyToOne
    @JoinColumn(name = "pitch_id")
    private Pitch pitchId ;
    // relation with Notifications //
    @OneToMany(mappedBy = "matchScheduleId")
    private List<Notifications> notifications ;
    // relation with Match Schedule //
    @OneToMany(mappedBy = "matchScheduleId")
    private  List<MatchRegisteration> matchRegisterations ;
    // no para const //
    public MatchSchedule() {
    }
    // all para const //
    public MatchSchedule(long id, Timestamp startTime, String status, Timestamp timestamp, Pitch pitchId, List<Notifications> notifications, List<MatchRegisteration> matchRegisterations) {
        this.id = id;
        this.startTime = startTime;
        this.status = status;
        this.timestamp = timestamp;
        this.pitchId = pitchId;
        this.notifications = notifications;
        this.matchRegisterations = matchRegisterations;
    }
    // setter and getter //
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Pitch getPitchId() {
        return pitchId;
    }

    public void setPitchId(Pitch pitchId) {
        this.pitchId = pitchId;
    }

    public List<Notifications> getNotifications() {
        return notifications;
    }

    public List<MatchRegisteration> getMatchRegisterations() {
        return matchRegisterations;
    }
}
