package io.mbarcina.kraken.api.exception;

public class TestException extends Exception {
	private static final long serialVersionUID = 8534830370559848055L;

	public TestException(String errorMessage) {
		super(errorMessage);
	}
}
