package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

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
    private Long id ;
    @Column(name = "start_time")
    private Timestamp startTime ;
    private String status ;
    private Timestamp timestamp ;
    @ManyToOne
    @JoinColumn(name = "pitch_id")
    private Pitch pitchId ;
    public MatchSchedule() {
    }
    public MatchSchedule(Long id, Timestamp startTime, String status, Timestamp timestamp, Pitch pitchId) {
        this.id = id;
        this.startTime = startTime;
        this.status = status;
        this.timestamp = new Timestamp(System.currentTimeMillis());
        this.pitchId = pitchId;
    }
    // setter and getter //
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public Pitch getPitchId() {
        return pitchId;
    }

    public void setPitchId(Pitch pitchId) {
        this.pitchId = pitchId;
    }


}
