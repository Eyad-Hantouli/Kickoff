package com.yu.kickoff.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Score {
    @Id
    private String title ;
    private Long score ;
}
