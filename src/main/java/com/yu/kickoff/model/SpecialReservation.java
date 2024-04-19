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


}
