package hello;

import org.springframework.stereotype.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.regex.*;

@Controller
public class GreetingController {

	//ArrayList<String> users = new ArrayList<String>();
	String firstUser, secondUser;
	
    @GetMapping("/names")
	@ResponseBody
    public String names(@RequestParam String name) {
		Pattern pattern = Pattern.compile("^[a-zA-Z0-9]+");
		Matcher matcher = pattern.matcher(name);
		if (matcher.find()) { 
			if (firstUser != null && !firstUser.isEmpty()) {
				secondUser = name;
				return secondUser;
			} else  if (firstUser != secondUser){
				firstUser = name;
				return firstUser;
			} else {
				return "+";
			}
		} else {
			return "/";
		}
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
}
