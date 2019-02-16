package service;

import java.sql.*;
import java.io.Closeable;
import org.apache.commons.dbcp2.BasicDataSource;
import com.google.gson.Gson;

public class Db implements Closeable {

   private static BasicDataSource pool = new BasicDataSource();
   static {
      pool.setDriverClassName("org.postgresql.Driver");
      pool.setUrl("jdbc:postgresql:db");
      pool.setInitialSize(1);
   }

   private Connection connection;

   public static Db open() throws SQLException {
      Db db = new Db();
      db.connection = pool.getConnection();
      return db;
   }

   public <T> T query(Class<T> cls, String sql, Object... args) throws SQLException {
      String json = query(sql, args);
      if ("{}".equals(json))
         return null;
      return (new Gson()).fromJson(json, cls);
   }

   public String query(String sql, Object... args) throws SQLException {
      String q = String.format(sql, args);
      Statement st = connection.createStatement();
      ResultSet rs = st.executeQuery(q);
      String value = "{}";
      if (rs.next())
         value = rs.getString(1);
      return value;
      }

   public void update(String query, Object... args) throws SQLException {
      String q = String.format(query, args);
      Statement st = connection.createStatement();
      st.executeUpdate(q);
   }

   public void close() {
      try {
         connection.close();
      } catch(SQLException e) {}
   }

}
