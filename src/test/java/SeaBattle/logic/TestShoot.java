package hello.logic;

import org.junit.Assert;
import org.junit.Test;

public class TestShoot {
    static int [][] PlayerMap = {{0,1,2,3},{20,21,22,100},{9,19,29,100},{47,48,100,100},{96,97,100,100},{89,99,100,100},{40,100,100,100},{34,100,100,100},{7,100,100,100},{15,100,100,100}};
    static int [][] EndGameMap = {{100,100,100,100},{100,100,100,100},{9,100,100,100},{100,100,100,100},{100,100,100,100},{100,100,100,100},{100,100,100,100},{100,100,100,100},{100,100,100,100},{100,100,100,100}};

    @Test
    public void missHit(){
        int expected = Shoot.hit(PlayerMap, 4);
        Assert.assertEquals(expected, 2);
    }

    @Test
    public void woundedHit(){
        int expected = Shoot.hit(PlayerMap, 3);
        Assert.assertEquals(expected, 3);
    }

    @Test
    public void killedHit(){
        int expected = Shoot.hit(PlayerMap, 15);
        Assert.assertEquals(expected, 4);
    }

    @Test
    public void endGame(){
        int expected = Shoot.hit(EndGameMap, 9);
        Assert.assertEquals(expected, 5);
    }
}
