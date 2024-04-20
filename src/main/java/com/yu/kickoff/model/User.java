package com.yu.kickoff.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.xml.crypto.Data;
import java.security.Timestamp;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "uzer")
public class User implements UserDetails {
    // Att

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "username")
    private String username;
    @Column(name = "first_name")
    private String firstName;
   /* @Column(name = "mid_name")
    private String midName;*/
    @Column(name = "last_name")
    private String lastName;
    /*private Data BOD ;
    private String address ;*/
    @Column(name = "password")
    private String password;
    /*private String phoneNumber;
    private String idCardOne ;
    private String idCardTwo ;*/
    @Enumerated(value = EnumType.STRING)
    private Role role;
    /*private  String status ;
    private Timestamp timestamp ;*/
    // no para const //
    public User() {
    }
    // all para const //
   /* public User(Long id, String username, String firstName, String midName, String lastName, Data BOD, String address, String password, String phoneNumber, String idCardOne, String idCardTwo, Role role, String status, Timestamp timestamp, List<Token> tokens, List<Notifications> senderNotifications, List<Notifications> receiverNotifications, List<MatchRegisteration> matchRegisterations, List<MatchStatistics> matchStatistics, List<Match> matches, List<Pitch> pitches, List<Relations> sourceUserNameList, List<Relations> targetUserNameList, City cityId) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.midName = midName;
        this.lastName = lastName;
        this.BOD = BOD;
        this.address = address;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.idCardOne = idCardOne;
        this.idCardTwo = idCardTwo;
        this.role = role;
        this.status = status;
        this.timestamp = timestamp;
        this.tokens = tokens;
        this.senderNotifications = senderNotifications;
        this.receiverNotifications = receiverNotifications;
        this.matchRegisterations = matchRegisterations;
        this.matchStatistics = matchStatistics;
        this.matches = matches;
        this.pitches = pitches;
        this.sourceUserNameList = sourceUserNameList;
        this.targetUserNameList = targetUserNameList;
        this.cityId = cityId;
    }*/

    // relation with tokens //
    @OneToMany(mappedBy = "user")
    private List<Token> tokens;
    // setter and getter //
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
    // Yamen edition
    public void setTokens(List<Token> tokens) {
        this.tokens = tokens;
    }
    // relations with Notifications //
    @OneToMany(mappedBy = "senderUserName")
    private List<Notifications> senderNotifications ;
    @OneToMany(mappedBy = "receiverUserName")
    private List<Notifications> receiverNotifications ;
    // relations with match registeration //
    @OneToMany(mappedBy = "userName")
    private List<MatchRegisteration> matchRegisterations ;
    // relations with match statistics //
    @OneToMany(mappedBy = "userName")
    private List<MatchStatistics> matchStatistics ;
    // relation with match //
    @OneToMany(mappedBy = "refereeId")
    private List<Match> matches ;
    // relation with pitch //
    @OneToMany(mappedBy = "authorId")
    private List<Pitch> pitches  ;
    // relation with relation //
    @OneToMany(mappedBy = "sourceUserName")
    private List<Relations> sourceUserNameList ;
    @OneToMany(mappedBy = "targetUserName" )
    private List<Relations> targetUserNameList ;
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City cityId ;
    // also getter and setter //
   /* public String getMidName() {
        return midName;
    }

    public void setMidName(String midName) {
        this.midName = midName;
    }

    public Data getBOD() {
        return BOD;
    }

    public void setBOD(Data BOD) {
        this.BOD = BOD;
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

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public City getCityId() {
        return cityId;
    }

    public void setCityId(City cityId) {
        this.cityId = cityId;
    }

    public void setSenderNotifications(List<Notifications> senderNotifications) {
        this.senderNotifications = senderNotifications;
    }

    public void setReceiverNotifications(List<Notifications> receiverNotifications) {
        this.receiverNotifications = receiverNotifications;
    }

    public void setMatchRegisterations(List<MatchRegisteration> matchRegisterations) {
        this.matchRegisterations = matchRegisterations;
    }

    public void setMatchStatistics(List<MatchStatistics> matchStatistics) {
        this.matchStatistics = matchStatistics;
    }

    public void setMatches(List<Match> matches) {
        this.matches = matches;
    }

    public void setPitches(List<Pitch> pitches) {
        this.pitches = pitches;
    }

    public void setSourceUserNameList(List<Relations> sourceUserNameList) {
        this.sourceUserNameList = sourceUserNameList;
    }

    public void setTargetUserNameList(List<Relations> targetUserNameList) {
        this.targetUserNameList = targetUserNameList;
    }*/
}
