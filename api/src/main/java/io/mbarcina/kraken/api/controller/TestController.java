package io.mbarcina.kraken.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TestController {

	@RequestMapping(value= {"/greeting"})
	public String greeting() {
		return "Greetings my friend";
	}
	
	@RequestMapping(value= {"/"})
	public String greetingPublic() {
		return "Hi anon!";
	}
}
