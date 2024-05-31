package com.yu.kickoff.repository;

import com.yu.kickoff.model.ContactUs;
import com.yu.kickoff.model.MatchRegisteration;
import com.yu.kickoff.model.MatchRegisterationCk;
import com.yu.kickoff.model.MatchSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRegisterationRespository extends JpaRepository<MatchRegisteration, MatchRegisterationCk> {
    @Query("SELECT mr FROM MatchRegisteration mr WHERE mr.matchScheduleId = :matchScheduleId")
    List<MatchRegisteration> findAllByMatchScheduleId(@Param("matchScheduleId") MatchSchedule matchScheduleId);
}
