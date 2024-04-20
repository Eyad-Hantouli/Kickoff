package com.yu.kickoff.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Position {
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
    private String title ;
    // relation with MatchRegisteration
    @OneToMany(mappedBy = "posId")
    private List<MatchRegisteration> matchRegisterations ;
    // relation with Match Statistics //
    @OneToMany(mappedBy = "positionId")
    private List<MatchStatistics> matchStatistics ;
    // no para const //
    public Position() {
    }
    // all para const //

    public Position(Long id, String title, List<MatchRegisteration> matchRegisterations, List<MatchStatistics> matchStatistics) {
        this.id = id;
        this.title = title;
        this.matchRegisterations = matchRegisterations;
        this.matchStatistics = matchStatistics;
    }
    // setter and getter //

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<MatchRegisteration> getMatchRegisterations() {
        return matchRegisterations;
    }

    public List<MatchStatistics> getMatchStatistics() {
        return matchStatistics;
    }
}
