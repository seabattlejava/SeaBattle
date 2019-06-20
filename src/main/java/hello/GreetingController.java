package hello;

import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import java.util.regex.*;
import hello.logic.*;
import hello.chat.*;
import org.apache.log4j.Logger;
import com.google.gson.Gson;

@Controller
public class GreetingController {
	final static Logger log = Logger.getLogger(GreetingController.class);
	final static Gson gson = new Gson();
	//ArrayList<String> users = new ArrayList<String>();
	String firstUser = "", secondUser = "";
	int flag = 0;
	int usersoff = 0;
	
	@GetMapping("/names")
	@ResponseBody
	public String names(@RequestParam String name) {
		Pattern pattern = Pattern.compile("^((\\w)+)$");
		Matcher matcher = pattern.matcher(name);
		if (!(firstUser != null && !firstUser.isEmpty()) || !(secondUser != null && !secondUser.isEmpty())) {
			if (matcher.find()) { 
				if (firstUser != null && !firstUser.isEmpty()) {
					secondUser = name;
					usersoff = 1;
					return "2";
				} else  {
					firstUser = name;
					return "1";
				}
			} else {
				return "/";
			} 
		} else {
			return "=";
		}
	}

	
	// Вот тут корабли передаются
	@GetMapping("/addShips")
	@ResponseBody
	public String addShips(@RequestParam String mas) {
		flag++;
		log.info("Some message");
		return Logic.input(mas);
	}
	
	@GetMapping("/playerNumber")
	@ResponseBody
	public String numbers(@RequestParam String number) {
		int chel = gson.fromJson(number, int.class);
		if (chel == 1) {
			return "yes";
		} else {
			return "no";
		}
	}
	
	//Таймер ожидания
	@GetMapping("/timer")
	@ResponseBody
	public String timer() {
		return Logic.check();
	}
	
	//Таймер начало игры
	@GetMapping("/timerstartgame")
	@ResponseBody
	public String timerStarttart() {
		if (flag == 2) {
			return "yes";
		} else {
			return "no";
		}
	}
	
	// Вот тут выстрел передается
	@GetMapping("/shoot")
	@ResponseBody
	public String Shoot (@RequestParam String fire)
	{
		return Logic.shoot(fire);
	}

	
	
	@GetMapping("/viewer")
	@ResponseBody
	public String Viewer ()
	{
		if (usersoff == 1) {
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
