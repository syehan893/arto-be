# arto-be
Poroject arto-be

## DATABASE

This project uses PostgreSQL as the database

```sql

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

CREATE TABLE Card (
  id VARCHAR(50) PRIMARY KEY,
  wallet_id VARCHAR(50),
  name VARCHAR(100),
  card_type VARCHAR(100),
  card_number VARCHAR(100),
  type VARCHAR(100),
  FOREIGN KEY (wallet_id) REFERENCES Wallet(id)
);

CREATE TABLE Bank (
  id VARCHAR(50) PRIMARY KEY,
  wallet_id VARCHAR(50),
  name VARCHAR(100),
  bank_code VARCHAR(100),
  bank_account VARCHAR(100),
  type VARCHAR(100),
  FOREIGN KEY (wallet_id) REFERENCES Wallet(id)
);

CREATE TABLE Transaction (
  id VARCHAR(50) PRIMARY KEY,
  wallet_id VARCHAR(50),
  nominal NUMERIC(15,2),
  bank VARCHAR(100),
  bank_account VARCHAR(100),
  email_receiver VARCHAR(100),
  status VARCHAR(100),
  detail VARCHAR(255),
  created_by VARCHAR(100),
  created_at TIMESTAMP,
  edited_by VARCHAR(100),
  edited_at TIMESTAMP,
  FOREIGN KEY (wallet_id) REFERENCES Wallet(id)
);

CREATE TABLE history (
  id VARCHAR(255) PRIMARY KEY,
  transaction_id VARCHAR(255),
  name VARCHAR(255),
  transaction VARCHAR(255),
  status BOOLEAN,
  type VARCHAR(255),
  edited_at TIMESTAMP,
  edited_by VARCHAR(255),
  created_at TIMESTAMP,
  created_by VARCHAR(255),
  FOREIGN KEY (transaction_id) REFERENCES transaction(id)
);

CREATE TABLE request_payment (
  id VARCHAR(255) PRIMARY KEY,
  transaction_id VARCHAR(255),
  name VARCHAR(255),
  type VARCHAR(255),
  action VARCHAR(255),
  status BOOLEAN,
  edited_at TIMESTAMP,
  edited_by VARCHAR(255),
  created_at TIMESTAMP,
  created_by VARCHAR(255),
  FOREIGN KEY (transaction_id) REFERENCES transaction(id)
);

CREATE TABLE help_centre (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(255),
  phone_number VARCHAR(255)
);

```


