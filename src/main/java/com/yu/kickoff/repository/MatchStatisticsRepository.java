package com.yu.kickoff.repository;

import com.yu.kickoff.model.MatchStatistics;
import com.yu.kickoff.model.MatchStatisticsCk;
import com.yu.kickoff.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Map;

public interface MatchStatisticsRepository extends JpaRepository<MatchStatistics, MatchStatisticsCk> {
    @Query("SELECT SUM(ms.goals), SUM(ms.yellowCard), SUM(ms.redCard), SUM(ms.fouls), SUM(ms.motm) " +
            "FROM MatchStatistics ms WHERE ms.userName = :user")
    Object[] getTotalStatisticsByUser(@Param("user") User user);

    @Query("SELECT new map(SUM(ms.goals) as goals, " +
            "SUM(ms.yellowCard) as yellowCard, " +
            "SUM(ms.redCard) as redCard, " +
            "SUM(ms.fouls) as fouls, " +
            "SUM(ms.motm) as motm) " +
            "FROM MatchStatistics ms " +
            "WHERE ms.userName.username = :username")
    Map<String, Object> findSumsByUserName(@Param("username") String username);
}