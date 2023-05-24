package config

import "os"

type DbConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	Dbname   string
}

type Config struct {
	DbConfig
}

func (c *Config) readConfigFile() Config {
	c.DbConfig = DbConfig{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Dbname:   os.Getenv("DB_NAME"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
	}
	return *c
}

func NewConfig() Config {
	cfg := Config{}
	return cfg.readConfigFile()
}
