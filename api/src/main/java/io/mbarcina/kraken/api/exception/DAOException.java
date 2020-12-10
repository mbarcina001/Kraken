package io.mbarcina.kraken.api.exception;

public class DAOException extends RuntimeException {
	private static final long serialVersionUID = 8534830370559848055L;

	public DAOException(String errorMessage) {
		super(errorMessage);
	}
}
