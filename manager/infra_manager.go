package manager

import (
	"arto-be/config"
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type InfraManager interface {
	DbConn() *sqlx.DB
}

type infraManager struct {
	db  *sqlx.DB
	cfg config.Config
}

func (infra *infraManager) initDb() {
	psqlconn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", infra.cfg.Host, infra.cfg.Port, infra.cfg.User, infra.cfg.Password, infra.cfg.Dbname)
	db, err := sqlx.Connect("postgres", psqlconn)
	if err != nil {
		log.Fatalf("Error connecting to database: %s", err.Error())
	}

	err = db.Ping()
	if err != nil {
		log.Fatalf("Error pinging database: %s", err.Error())
	}

	infra.db = db
}

func (infra *infraManager) DbConn() *sqlx.DB {
	return infra.db
}

func NewInfraManager(config config.Config) InfraManager {
	infra := infraManager{
		cfg: config,
	}
	infra.initDb()
	return &infra
}
