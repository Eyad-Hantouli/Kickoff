package com.yu.kickoff.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "uzer")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "username")
    private String username;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "mid_name")
    private String midName;
    @Column(name = "last_name")
    private String lastName;

    private Date bod ;
    private String address ;
    @Column(name = "password")
    private String password;
    private String phoneNumber;
    private String idCardOne ;
    private String idCardTwo ;
    @Enumerated(value = EnumType.STRING)
    private Role role;
    private  String status ;
    private Timestamp timestamp;

    public User() {
    }

    public User(String username, String firstName, String midName, String lastName, Date bod, String address, String password, String phoneNumber, String idCardOne, String idCardTwo, Role role, String status, City city) {
        this.username = username;
        this.firstName = firstName;
        this.midName = midName;
        this.lastName = lastName;
        this.bod = bod;
        this.address = address;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.idCardOne = idCardOne;
        this.idCardTwo = idCardTwo;
        this.role = role;
        this.status = status;
        this.timestamp = new Timestamp(System.currentTimeMillis());
        this.city = city;
    }

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMidName() {
        return midName;
    }

    public void setMidName(String midName) {
        this.midName = midName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Token> getTokens() {
        return tokens;
    }

    public void setTokens(List<Token> tokens) {
        this.tokens = tokens;
    }

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city ;

    public Date getBod() {
        return bod;
    }

    public void getBod(Date bod) {
        this.bod = bod;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getIdCardOne() {
        return idCardOne;
    }

    public void setIdCardOne(String idCardOne) {
        this.idCardOne = idCardOne;
    }

    public String getIdCardTwo() {
        return idCardTwo;
    }

    public void setIdCardTwo(String idCardTwo) {
        this.idCardTwo = idCardTwo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setBod(Date bod) {
        this.bod = bod;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

}
