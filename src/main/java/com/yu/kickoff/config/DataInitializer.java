package com.yu.kickoff.config;

import com.yu.kickoff.model.City;
import com.yu.kickoff.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    private final CityRepository cityRepository;

    @Autowired
    public DataInitializer(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public void run(String... args) {
        List<String> cityNames = Arrays.asList(
                "Amman", "Irbid", "Zarqa", "Mafraq", "Ajloun", "Jerash",
                "Madaba", "Balqa", "Karak", "Tafileh", "Maan", "Aqaba"
        );

        for (String cityName : cityNames) {
            City city = new City(cityName);
            cityRepository.save(city);
        }
    }
}
