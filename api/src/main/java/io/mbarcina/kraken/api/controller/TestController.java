package io.mbarcina.kraken.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TestController {

	@RequestMapping(value= {"/greeting"})
	public String greeting() {
		System.out.println("Greetings my friend");
		return "Greetings my friend";
	}
	
	@RequestMapping(value= {"/"})
	public String greetingPublic() {
		System.out.println("Hi anon!");
		return "Hi anon!";
	}
}
