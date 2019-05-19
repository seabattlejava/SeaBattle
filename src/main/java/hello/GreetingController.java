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
		if ("".equals(firstUser)) {
			firstUser = name;
		} else {
			secondUser = name;
		}
		//users.add(name);
        return name;
    }

	/* @GetMapping("/game")
    public String Game() {
        return "game";
    } */
	
	@GetMapping("/getName")
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
}
