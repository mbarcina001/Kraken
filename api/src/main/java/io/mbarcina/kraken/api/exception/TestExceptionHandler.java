package io.mbarcina.kraken.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class TestExceptionHandler {
	
	@ExceptionHandler(TestException.class)
	public ResponseEntity<String> handleException(TestException e){
		System.out.println("HANDLER");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	}

}
