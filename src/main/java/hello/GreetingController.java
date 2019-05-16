package hello;

import org.springframework.stereotype.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

@RestController
public class GreetingController {

	ArrayList<String> users = new ArrayList<String>();
	
    @GetMapping("/names")
    public String names(@RequestParam String name) {
		users.add(name);
        return "Name " + name;
    }

}
