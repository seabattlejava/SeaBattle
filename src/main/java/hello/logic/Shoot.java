package hello.logic;

/*
0-water
1-ship
2-wounded ship
3-dead ship
4-miss
*/

public class Shoot {

    static int shootI = 0, shootJ = 0;
    static int i, j;

    public static void hit(int[][] mas){
        if (mas[shootI][shootJ] == 0) miss(mas);
        else {
            mas[shootI][shootJ] = 2;
            kill(mas);
        }
    }

    public static void kill(int[][] mas){
        switch (shootI){
            case 0:
                if (shootJ == 0){
                    //for ()
                }
//                if (shootJ == 0 && (mas[shootI+1][shootJ] == 0 || mas[shootI+1][shootJ] == 4)&& (mas[shootI][shootJ+1] == 0 || mas[shootI][shootJ+1] == 4)){
//                    mas[shootI][shootJ] = 3;
//                    mas[shootI+1][shootJ+1] = 4;
//                    mas[shootI+1][shootJ] = 4;
//                    mas[shootI][shootJ+1] = 4;
//                }else if (shootJ == 0 && mas[shootI+1][shootJ] == 2 && (mas[shootI+2][shootJ] == 2 || mas[shootI+2][shootJ] == 0) && (mas[shootI+3][shootJ] == 2 || mas[shootI+3][shootJ] == 0)){
//
//                }
                break;
        }
    }

    public static void miss(int[][] mas){
        mas[shootI][shootJ] = 4;
    }

}
