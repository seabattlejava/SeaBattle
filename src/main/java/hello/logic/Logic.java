package hello.logic;

import com.google.gson.Gson;
import org.apache.log4j.Logger;

public class Logic {

	final static Gson gson = new Gson();
	final static Logger log = Logger.getLogger(Logic.class);

	static int [] map = new int [20];
	static int [][] PlayerOne = new int [10][4];
	static int [][] PlayerTwo = new int [10][4];
	static int player = 0;
	static int flag = 0;

	public static String input(String mas) {
		int count = 0;

		map = gson.fromJson(mas, int[].class);

		switch (player){
			case 0:
				for (int i = 0; i < PlayerOne.length; i++) {
					for (int j = 0; j < PlayerOne[i].length; j++) {
						if (((i == 1 || i ==2) && j == 3) || ((i == 3 || i == 4  || i == 5) && (j == 2 || j == 3)) || ((i == 6 || i == 7 || i == 8 || i == 9) && (j == 1 || j ==2 || j == 3))) PlayerOne[i][j] = 100;
						else PlayerOne[i][j] = map[count++];
					}
				}
				log.info("Player 1 is ready");
				player = 1;
				break;
			case 1:
				for (int i = 0; i < PlayerTwo.length; i++) {
					for (int j = 0; j < PlayerTwo[i].length; j++) {
						if (((i == 1 || i ==2) && j == 3) || ((i == 3 || i == 4  || i == 5) && (j == 2 || j == 3)) || ((i == 6 || i == 7 || i == 8 || i == 9) && (j == 1 || j ==2 || j == 3))) PlayerTwo[i][j] = 100;
						else PlayerTwo[i][j] = map[count++];
					}
				}
				log.info("Player 2 is ready");
				player = 0;
				break;
			default:
				log.info("Array" + player + "did not register");
				return "Not OK!";
		}
		return "OK!";
	}

	public static String shoot(String temp) {
		String output;
		int shot;
		int result;

		shot = gson.fromJson(temp, int.class);


		switch (player) {
			case 0:
				result = Shoot.hit(PlayerTwo, shot);
				if (result == 2) {
					player = 1;
				}
				break;
			case 1:
				result = Shoot.hit(PlayerOne, shot);
				if (result == 2) {
					player = 0;
				}
				break;
			default:
				return "Not OK!";
		}

		if (result == 5) {
			flag = 2;
		} else if (result == 2) {
			flag = 1;
		}

		output = gson.toJson(result);
		return output;
	}
	
	public static String check() {
		if (flag == 1) {
			flag = 0;
			return "yes";
		} else if (flag == 0) {
			return "no";
		} else {
			player = 0;
			flag = 0;
			return"end";
		}
	}
}
