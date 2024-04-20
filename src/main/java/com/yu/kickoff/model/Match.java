package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.security.Timestamp;
import java.util.List;

@Entity
public class Match {
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
    private Timestamp  time ;
    private Timestamp timestamp ;
    @ManyToOne
    @JoinColumn(name = "pitch_id")
    private Pitch pitchId ;
    @ManyToOne
    @JoinColumn(name = "referee_id")
    private User refereeId ;
    // relation with match statistics //
    @OneToMany(mappedBy = "matchId")
    private List<MatchStatistics> matchStatistics ;
    // no para const //
    public Match() {
    }
    // all para const //

    public Match(Long id, Timestamp time, Timestamp timestamp, Pitch pitchId, User refereeId, List<MatchStatistics> matchStatistics) {
        this.id = id;
        this.time = time;
        this.timestamp = timestamp;
        this.pitchId = pitchId;
        this.refereeId = refereeId;
        this.matchStatistics = matchStatistics;
    }

    // setter and getter //
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
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

    public User getRefereeId() {
        return refereeId;
    }

    public void setRefereeId(User refereeId) {
        this.refereeId = refereeId;
    }

    public List<MatchStatistics> getMatchStatistics() {
        return matchStatistics;
    }
}
