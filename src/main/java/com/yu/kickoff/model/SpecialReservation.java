package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;

@Entity
public class SpecialReservation {
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
    @Column(name = "end_time")
    private Timestamp endTime ;
    private Timestamp timestamp ;
    @ManyToOne
    @JoinColumn(name = "pitch_id")
    private Pitch pitchId ;
    // no para const //
    public SpecialReservation() {
    }
    // all para const //
    public SpecialReservation(long id, Timestamp startTime, Timestamp endTime, Timestamp timestamp, Pitch pitchId) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.timestamp = timestamp;
        this.pitchId = pitchId;
    }
    // getter and setter //
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

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
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
}
