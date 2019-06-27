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

/**
 * Класс содержащий контроллеры
 * @author Dmitriy8726
 */
@Controller
public class GreetingController {
	final static Logger log = Logger.getLogger(GreetingController.class);
	final static Gson gson = new Gson();
	//ArrayList<String> users = new ArrayList<String>();
	String firstUser = "", secondUser = "";
	int flag = 0;
	int num = 0;
	int usersoff = 0;

	/**
	 * Проверяет имя входящего игрока
	 * @param name Имя клиента
	 * @return Символ разрешающий или запрещающий дальнейшие действия
	 */
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
				} else	{
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

	/**
	 * Присваевает игроку номер
	 * @return Номер игрока
	 */
	@GetMapping("/giveNumber")
	@ResponseBody
	public int giveNumber() {
		num++;
		return num;
	}

	/**
	 * Передает расположение кораблей от клиента к логике
	 * @param mas Строка содержащая расположения кораблей
	 * @see Logic#input(String)
	 * @return Ответ от вызова метода логики
	 */
	@GetMapping("/addShips")
	@ResponseBody
	public String addShips(@RequestParam String mas) {
		flag++;
		log.info("Some message");
		return Logic.input(mas);
	}

	/**
	 * Определяет порядок хода игроков
	 * @param number Номер игрока
	 * @return Разрешение на ход
	 */
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

	/**
	 * Таймер ожидающий ответа
	 * @see Logic#check()
	 * @return Результат о возможности сделать ход
	 */
	@GetMapping("/timer")
	@ResponseBody
	public String timer() {
		return Logic.check();
	}

	/**
	 * Отображает попадания по игроку
	 * @see Logic#shootme()
	 * @return Клетку и результат выстрела
	 */
	@GetMapping("/shootMe")
	@ResponseBody
	public String shootme() {
		return Logic.shootme();
	}

	/**
	 * Таймер начала игры
	 * @return Можно начать игру или нет
	 */
	@GetMapping("/timerstartgame")
	@ResponseBody
	public String timerStarttart() {
		if (flag == 2) {
			return "yes";
		} else {
			return "no";
		}
	}

	/**
	 * Передает выстрел игрока
	 * @param fire Клетка куда был произведен выстрел
	 * @see Logic#shoot(String)
	 * @return Строку содержащую результат выстрела
	 */
	@GetMapping("/shoot")
	@ResponseBody
	public String Shoot (@RequestParam String fire)
	{
		return Logic.shoot(fire);
	}

	/**
	 * Определяет является ли пользователь зрителем
	 * @return Строку с результатом является ли пользователь зрителем
	 */
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

	/**
	 * Подключает пользователя к каналу чата
	 * @param message Сообщения пользователя
	 * @return Сообщения в чате
	 */
	@MessageMapping("/message")
	@SendTo("/chat/messages")
	public Message getMessages(Message message) {
		System.out.println(message);
		return message;
	}

	/**
	 * Показывает пользователю что он победил
	 * @return Строку для перехода на нужную страницу
	 */
	@GetMapping("/win")
	public String win() {
		return "win";
	}

	/**
	 * Показывает пользователю что он проиграл
	 * @return Строку для перехода на нужную страницу
	 */
	@GetMapping("/lose")
	public String lose() {
		firstUser = "";
		secondUser = "";
		flag = 0;
		num = 0;
		usersoff = 0;
		return "lose";
	}
}
