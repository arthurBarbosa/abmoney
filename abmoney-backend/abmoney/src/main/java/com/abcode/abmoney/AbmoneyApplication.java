package com.abcode.abmoney;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class AbmoneyApplication {

    public static void main(String[] args) {
        SpringApplication.run(AbmoneyApplication.class, args);
    }

}
