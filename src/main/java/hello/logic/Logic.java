package hello.logic;

import com.google.gson.Gson;

public class Logic {

    final static Gson gson = new Gson();

    public static int[][] playerOne = new int[10][10];
    public static int[][] playerTwo = new int[10][10];

    public static void main(String[] args) {

        int[][] mas1 = {
                {0, 2, 2, 2, 1, 0, 1, 0, 2, 1},
                {0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                {0, 1, 0, 0, 0, 0, 0, 1, 0, 0},
                {0, 1, 0, 0, 0, 1, 0, 0, 0, 1},
                {0, 1, 0, 0, 0, 1, 0, 0, 0, 0},
                {0, 1, 0, 1, 0, 1, 0, 0, 0, 1},
                {0, 0, 0, 1, 0, 0, 0, 0, 0, 1},
                {1, 0, 0, 0, 0, 1, 0, 0, 0, 0},
                {2, 0, 0, 0, 0, 1, 0, 0, 0, 0},
                {1, 0, 0, 0, 0, 1, 0, 0, 0, 0}
        };

        int[][] mas2 = {
                {0, 1, 0, 1, 0, 0, 0, 0, 0, 0},
                {0, 1, 0, 0, 0, 1, 0, 0, 0, 0},
                {0, 0, 0, 0, 0, 0, 0, 1, 0, 0},
                {0, 0, 0, 0, 0, 1, 0, 0, 0, 1},
                {0, 0, 0, 0, 0, 1, 0, 0, 0, 0},
                {0, 1, 0, 1, 0, 1, 0, 0, 0, 1},
                {0, 1, 0, 1, 0, 0, 0, 0, 0, 1},
                {0, 1, 0, 0, 0, 1, 0, 0, 0, 0},
                {0, 1, 0, 0, 0, 1, 0, 0, 0, 0},
                {0, 0, 0, 0, 0, 1, 0, 0, 0, 0}
        };

        String input;

        input = gson.toJson(mas1);
//        System.out.println(input);

        playerOne = gson.fromJson(input, int[][].class);

//        for(int i=0; i<10; i++){
//            for(int j=0; j<10; j++){
//                System.out.print(playerOne[i][j] + " ");
//            }
//            System.out.println();
//        }

        input = gson.toJson(mas2);
//        System.out.println(input);

        playerTwo = gson.fromJson(input, int[][].class);

//        for(int i=0; i<10; i++){
//            for(int j=0; j<10; j++){
//                System.out.print(playerTwo[i][j] + " ");
//            }
//            System.out.println();
//        }

        Shoot.hit(playerOne);

        for(int i=0; i<10; i++){
            for(int j=0; j<10; j++){
                System.out.print(playerOne[i][j] + " ");
            }
            System.out.println();
        }

    }
}
