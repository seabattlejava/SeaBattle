package hello.logic;

/*
0-water
1-ship
2-wounded ship
3-dead ship
4-miss
*/

public class Shoot {

    static int shootI = 0, shootJ = 4;
    static int i, j;

    public static void hit(int[][] mas){
        if (mas[shootI][shootJ] == 0) miss(mas);
        else {
            mas[shootI][shootJ] = 2;
            kill(mas);
        }
    }

    public static void kill(int[][] mas){
        int endShip, startShip;
        int checkShip;
        boolean check = false;

        switch (shootI) {
            case 0:
                endShip = 0;
                startShip = 0;
                checkShip = 0;

                while (!check) {
                    for (i = shootJ; i <= shootJ + 4; i++) {    //определение конца коробля
                        if (i == 9 && (mas[shootI][i] == 1 || mas[shootI][i] ==2 )) {
                            endShip = i;
                            break;
                        }
                        if (mas[shootI][i] == 0 || mas[shootI][i] == 4) {
                            endShip = i - 1;
                            break;
                        }
                    }
                    for (i = endShip; i >= endShip - 4; i--) {  //определение начала коробля
                        if (i == 0 && (mas[shootI][i] == 1 || mas[shootI][i] == 2)) {
                            startShip = i;
                            break;
                        }
                        if (mas[shootI][i] == 0 || mas[shootI][i] == 4) {
                            startShip = i + 1;
                            break;
                        }
                    }
                    for (i = startShip; i <= endShip; i++) {    //определение длинны подбитого коробля
                        if (mas[shootI][i] == 2) checkShip++;
                    }
                    for (i = startShip; i <= endShip; i++) {    //если весь корабль подбит он становится убитым, под ним заполняются пустые клетки
                        if (checkShip == endShip - startShip + 1) {
                            mas[shootI][i] = 3;
                            mas[shootI + 1][i] = 4;
                        }
                    }
                    if (startShip >= 1 && checkShip == endShip - startShip + 1) {   //если слева есть место заполняются пустые клетки
                        mas[shootI][startShip-1] = 4;
                        mas[shootI+1][startShip-1] = 4;
                    }
                    if (endShip < 9 && checkShip == endShip - startShip + 1) {  //если справа есть место заполняются пустые клетки
                        mas[shootI][endShip+1] = 4;
                        mas[shootI+1][endShip+1] = 4;
                    }
                    check = true;
                }
                break;
            case 9:
                break;
        }
    }

    public static void miss(int[][] mas){
        mas[shootI][shootJ] = 4;
    }

}
