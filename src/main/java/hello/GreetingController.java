package hello;

import org.springframework.stereotype.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

@Controller
public class GreetingController {

	//ArrayList<String> users = new ArrayList<String>();
	String firstUser, secondUser;
	
    @GetMapping("/names")
	@ResponseBody
    public String names(@RequestParam String name) {
		if (firstUser != null && !firstUser.isEmpty()) {
			secondUser = name;
			return secondUser;
		} else {
			firstUser = name;
			return firstUser;
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
