package com.yu.kickoff.threads;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {
    @Scheduled(cron = "0 0 * * * *") // This cron expression means "At minute 0 past every hour"
    public void printHi() {
        System.out.println("HI");
    }
}
