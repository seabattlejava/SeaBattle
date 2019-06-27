package hello.logic;

/**
 * Класс для проверки результата выстрела игрока
 * @author Munhama
 */
public class Shoot {

    /**
     * Проверяет нахождение корабля в клетке выстрела
     * @param map Массив кораблей противника
     * @param shoot Клетка выстрела игрока
     * @see Shoot#endGame(int[][])
     * @return Результат попадания
     */
    public static int hit(int[][] map, int shoot) {
        int check = 0;
        int end;

        for (int i = 0; i < map.length; i++) {
            for (int j = 0; j < map[i].length; j++) {
                if (map[i][j] == shoot) {
                    map[i][j] = 100;
                    for (int k = 0; k < map[i].length; k++) {
                        if (map[i][k] == 100) check++;
                    }
                    end = endGame(map);
                    if (end == 1) return 5;
                    if (check == 4) return 4;
                    return 3;
                }
            }
        }
        return 2;
    }

    /**
     * Определяет окончание игры
     * @param map Массив кораблей противника
     * @return Результат проверки
     */
    public static int endGame(int[][] map) {
        int end = 0;
        for (int i = 0; i < map.length; i++) {
            for (int j = 0; j < map[i].length; j++) {
                if (map[i][j] == 100) end++;
            }
        }
        if (end == 40) return 1;
        else return 0;
    }
}
