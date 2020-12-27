package io.mbarcina.kraken.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"io.mbarcina.kraken.auth.entity", "io.mbarcina.kraken.api.entity"})
public class KrakenApiApplication 
{
    private static final Logger LOGGER = LoggerFactory.getLogger(KrakenApiApplication.class);

    public static void main( String[] args )
    {
    	SpringApplication.run(KrakenApiApplication.class, args);
    	
        LOGGER.info("Simple log statement with inputs {}, {} and {}", 1,2,3);
    }
}
