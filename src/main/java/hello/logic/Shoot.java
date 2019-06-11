package hello.logic;

//2-промах
//3-попадание
//4-убийство

public class Shoot {

    public static int hit(int[][] map, int shoot) {

        int check = 0;

        for (int i = 0; i < map.length; i++) {
            for (int j = 0; j < map[i].length; j++) {
                if (map[i][j] == shoot) {
                    map[i][j] = 100;
                    for (int k = 0; k < map[i].length; k++) {
                        if (map[i][k] == 100) check++;
                    }
                    if (check == 4) return 4;
                    return 3;
                }
            }
        }
        return 2;
    }
}
