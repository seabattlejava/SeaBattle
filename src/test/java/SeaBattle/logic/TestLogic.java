package hello.logic;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class TestLogic {
    static String InputArrayClient1 = "[12,13,14,15,65,66,67,35,36,37,7,8,87,88,52,53,40,60,81,93]";
    static String InputArrayClient2 = "[0,1,2,3,20,21,22,9,19,29,47,48,96,97,89,99,40,34,7,15]";
    static String Shot = "2";
    static String Shot2 = "11";
    static String Shot3 = "15";

    @Test
    public void recordArray(){
        String expected = Logic.input(InputArrayClient1);
        Assert.assertEquals("Player1", expected, "OK!");
        expected = Logic.input(InputArrayClient2);
        Assert.assertEquals("Player2", expected, "OK!");
    }

    @Test
    public void checkShoot(){
        Logic.input(InputArrayClient1);
        Logic.input(InputArrayClient2);
        String expected = Logic.shoot(Shot);
        Assert.assertEquals("First shot, player 1", expected, "3");
        expected = Logic.shoot(Shot2);
        Assert.assertEquals("Second shot, player 1", expected, "2");
        expected = Logic.shoot(Shot2);
        Assert.assertEquals("First shot, player 2", expected, "2");
        expected = Logic.shoot(Shot3);
        Assert.assertEquals("Kill shot", expected, "4");
    }
}
