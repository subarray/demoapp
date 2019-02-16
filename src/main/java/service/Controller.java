package service;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.sql.SQLException;

@RestController
public class Controller {

   class Person {
      String name;
      String color;
      String catdog;
   }

   @PostMapping("/create")
   public void create(@RequestBody String json) {
      try(Db db = Db.open()) {
         // For more
         // Person p = (new Gson()).fromJson(json, Person.class);
         db.update("insert into person(data) values('%s')", json);

      } catch(SQLException e) {
         // unique key violation
         if("23505".equals(e.getSQLState()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Name already exists", e);
         else
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Error processing request", e);
      }
   }

   @GetMapping("/list")
   public String list() {
      try(Db db = Db.open()) {
         // Return up to 20 entries, latest at the top
         return db.query("select json_agg(d.*) from (select data from person order by added desc limit 20) d");

      } catch(SQLException e) {
          throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Error processing request", e);
      }
   }
}
