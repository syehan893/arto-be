# arto-be
Poroject arto-be

<h1>Database</h1>

CREATE TABLE Users (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100)
);

CREATE TABLE Wallet (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50),
  Balance NUMERIC(15,2),
  Bank VARCHAR(100),
  Card VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);


