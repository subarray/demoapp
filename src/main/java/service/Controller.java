package service;

import org.springframework.web.bind.annotation.*;


@RestController
public class Controller {

   class Person {
      String name;
      String color;
      String catdog;
   }

   @PutMapping("/add")
   public void add(@RequestBody String json) throws java.sql.SQLException {
      Db db = Db.open();
      // For validation on server side
      // Person p = (new Gson()).fromJson(json, Person.class);
      // validate p
      db.update("insert into person(data) values('%s')", json);
      db.close();
   }

   @GetMapping("/list")
   public String list() throws java.sql.SQLException {
      Db db = Db.open();
      String data = db.query("select json_agg(d.*) from (select data from person order by added limit 20) d");
      db.close();
      return data;
   }
}
