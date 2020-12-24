package io.mbarcina.kraken.auth.response;

public class ApiResponse<Type> {
	
	private Type data;
	private int returnCode;
	private String errorMessage;
	
	public Type getData() {
		return data;
	}
	public void setData(Type data) {
		this.data = data;
	}
	public int getReturnCode() {
		return returnCode;
	}
	public void setReturnCode(int returnCode) {
		this.returnCode = returnCode;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public ApiResponse(Type data, int returnCode, String errorMessage) {
		super();
		this.data = data;
		this.returnCode = returnCode;
		this.errorMessage = errorMessage;
	}

}
