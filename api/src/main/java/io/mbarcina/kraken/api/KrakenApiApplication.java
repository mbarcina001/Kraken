package io.mbarcina.kraken.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"io.mbarcina.kraken.auth.entity", "io.mbarcina.kraken.api.entity"})
public class KrakenApiApplication 
{
    public static void main( String[] args )
    {
    	SpringApplication.run(KrakenApiApplication.class, args);
    }
}
