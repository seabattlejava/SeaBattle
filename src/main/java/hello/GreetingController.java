package hello;

import org.springframework.stereotype.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import java.util.regex.*;
import hello.logic.*;
import hello.chat.*;

@Controller
public class GreetingController {

	//ArrayList<String> users = new ArrayList<String>();
	String firstUser, secondUser;
	
	@GetMapping("/names")
	@ResponseBody
	public String names(@RequestParam String name) {
		Pattern pattern = Pattern.compile("^((\\w)+)$");
		Matcher matcher = pattern.matcher(name);
		if (!(firstUser != null && !firstUser.isEmpty()) || !(secondUser != null && !secondUser.isEmpty())) {
			if (matcher.find()) { 
				if (firstUser != null && !firstUser.isEmpty()) {
					secondUser = name;
					return secondUser;
				} else  {
					firstUser = name;
					return firstUser;
				}
			} else {
				return "/";
			} 
		} else {
			return "=";
		}
	}

	@GetMapping("/addShips")
	@ResponseBody
	public String addShips(@RequestParam String mas) {
		return Logic.input(mas);
	}
	
	
	/* @GetMapping("/game")
	public String Game() {
		return "game";
	} */
	
/* 	@GetMapping("/getName")
	@ResponseBody
	public String getName(@RequestParam String name)
	{
		if (name.equals(firstUser))
		{
			return firstUser;
		} else {
			return secondUser;
		}
	}
	 */
	@GetMapping("/viewer")
	@ResponseBody
	public String Viewer ()
	{
		if ((firstUser != null && !firstUser.isEmpty()) && (secondUser != null && !secondUser.isEmpty())) {
			return "no";
		} else {
			return "yes";
		}
	}
	
	@MessageMapping("/message")
	@SendTo("/chat/messages")
	public Message getMessages(Message message) {
		System.out.println(message);
		return message;
	}
}
