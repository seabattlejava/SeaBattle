package hello.logic;

import com.google.gson.Gson;

public class Logic {

    final static Gson gson = new Gson();

    static int [] map = new int [20];
    static int [][] PlayerOne = new int [10][4];
    static int [][] PlayerTwo = new int [10][4];
    static int player = 0;

    public static String input(String mas) {
        int count = 0;

        map = gson.fromJson(mas, int[].class);

        switch (player){
            case 0:
                System.out.println("Player 1");
                for (int i = 0; i < PlayerOne.length; i++) {
                    for (int j = 0; j < PlayerOne[i].length; j++) {
                        if (((i == 1 || i ==2) && j == 3) || ((i == 3 || i == 4  || i == 5) && (j == 2 || j == 3)) || ((i == 6 || i == 7 || i == 8 || i == 9) && (j == 1 || j ==2 || j == 3))) PlayerOne[i][j] = 100;
                        else PlayerOne[i][j] = map[count++];

                        System.out.print(PlayerOne[i][j] + " ");
                    }
                    System.out.println();
                }
                player = 1;
                break;
            case 1:
                System.out.println("Player 2");
                for (int i = 0; i < PlayerTwo.length; i++) {
                    for (int j = 0; j < PlayerTwo[i].length; j++) {
                        if (((i == 1 || i ==2) && j == 3) || ((i == 3 || i == 4  || i == 5) && (j == 2 || j == 3)) || ((i == 6 || i == 7 || i == 8 || i == 9) && (j == 1 || j ==2 || j == 3))) PlayerTwo[i][j] = 100;
                        else PlayerTwo[i][j] = map[count++];

                        System.out.print(PlayerTwo[i][j] + " ");
                    }
                    System.out.println();
                }
                break;
            default:
                return ("Not OK!");
        }
		return "OK!";
    }
}
