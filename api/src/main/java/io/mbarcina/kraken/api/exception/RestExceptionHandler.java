package io.mbarcina.kraken.api.exception;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.auth.utils.KrakenConstants;

@SuppressWarnings({"unchecked","rawtypes"})
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(DAOException.class)
    public final ResponseEntity<Object> handleDAOException(DAOException ex, WebRequest request) {
        ApiResponse<List<String>> customResponse = new ApiResponse<List<String>>(null, KrakenConstants.CODE_NOK, ex.getMessage());
        return new ResponseEntity(customResponse, HttpStatus.OK);
    }
}
