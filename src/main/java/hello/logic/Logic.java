package hello.logic;

import com.google.gson.Gson;
import org.apache.log4j.Logger;

/**
 * Класс инициализирует корабли игроков, определяет попадания
 * @author Munhama
 */
public class Logic {

	final static Gson gson = new Gson();
	final static Logger log = Logger.getLogger(Logic.class);

	static int [] map = new int [20];
	static int [][] PlayerOne = new int [10][4];
	static int [][] PlayerTwo = new int [10][4];
	static int [][] ViewerMap = new int [2][101];
	static int player = 0;
	static int flag = 0;
	static int shot = 0;
	static int result = 0;

	/**
	 * Записывает и хранит массивы кораблей
	 * @param mas Строка содержащая расположения кораблей
	 * @return Ответ о записи данных и готовности игрока
	 */
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

	/**
	 * Проверяет результат выстрела игрока
	 * @param temp Строка содержащая клетку выстрела
	 * @see Shoot#hit(int[][], int)
	 * @return Строку содержащую результат выстрела
	 */
	public static String shoot(String temp) {
		String output;

		shot = gson.fromJson(temp, int.class);


		switch (player) {
			case 0:
				result = Shoot.hit(PlayerTwo, shot);
				ViewerMap[1][shot] = result;
				if (result == 2) {
					player = 1;
				}
				break;
			case 1:
				result = Shoot.hit(PlayerOne, shot);
				ViewerMap[0][shot] = result;
				if (result == 2) {
					player = 0;
				}
				break;
			default:
				return "Not OK!";
		}
		if ((result == 3) || (result == 4)) {
			flag = 3;
		}
		if (result == 5) {
			flag = 2;
		} else if (result == 2) {
			flag = 1;
		}

		output = gson.toJson(result);
		return output;
	}

	/**
	 * Позволяет отображать игроку куда в него попадают
	 * @return Строку с координатой и результатом попадания
	 */
	public static String shootme() {
		int [] A = new int [2];
		String output;
		A[0] = shot;
		A[1] = result;
		output = gson.toJson(A);
		return output;
	}

	/**
	 * Проверяет может ли игрок начать свой ход
	 * @return Результат о возможности сделать ход
	 */
	public static String check() {
		if (flag == 1) {
			flag = 0;
			return "yes";
		} else if (flag == 0) {
			return "no";
		} else if (flag == 2){
			player = 0;
			flag = 0;
			return"end";
		} else {
			flag = 0;
			return"nope";
		}
	}
	
	/**
	 * Преобразует массив в Json строку
	 * @return Json строку
	 */
	public static String parser() {
		String output;
		output = gson.toJson(ViewerMap);
		return output;
	}

	/**
	 * Определяет какой игрок выйграл (для зрителя)
	 */
	public static void win() {
		if (player == 0) {
			ViewerMap[0][100] = 5;
		} else {
			ViewerMap[1][100] = 5;
		}
	}
}

