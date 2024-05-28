package com.yu.kickoff.model;

import jakarta.persistence.*;

@Entity
public class AddPitchRequest {
    @Id
    @SequenceGenerator(
            name= "add_pitch_request_sequence",
            sequenceName = "add_pitch_request_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "add_pitch_request_sequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @Lob
    @Column(name = "ownership_documentation")
    private byte[] ownershipDocumentation;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public byte[] getOwnershipDocumentation() {
        return ownershipDocumentation;
    }

    public void setOwnershipDocumentation(byte[] ownershipDocumentation) {
        this.ownershipDocumentation = ownershipDocumentation;
    }
}
