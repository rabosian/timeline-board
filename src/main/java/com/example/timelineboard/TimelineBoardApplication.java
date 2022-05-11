package com.example.timelineboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TimelineBoardApplication {

	public static void main(String[] args) {
		SpringApplication.run(TimelineBoardApplication.class, args);
	}

}
