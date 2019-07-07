package SeaBattle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Класс для запуска Spring сервера
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        System.getProperties().put( "server.port", 4112);
        SpringApplication.run(Application.class, args);
    }

}
