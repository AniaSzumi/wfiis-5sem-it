DROP TABLE IF EXISTS weather;
DROP TABLE IF EXISTS users;

CREATE TABLE weather (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  place TEXT NOT NULL, 
  -- date DATE NOT NULL DEFAULT CURRENT_DATE,
  date TEXT NOT NULL,
  -- time TIME NOT NULL DEFAULT CURRENT_TIME,
  time TEXT NOT NULL,
  temperature TEXT NOT NULL,
  description TEXT
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

INSERT INTO weather (place, date, time, temperature, description) VALUES 
("Kraków", "2022-01-20", "21:54", 5, "Wiatr"),
("Warszawa", "2022-02-20", "12:54", 7, "Słońce"),
("Warszawa", "2022-01-12", "10:54", 8, "Chmury"),
("Kraków", "2022-02-11", "6:54", 6, "Deszcz");
