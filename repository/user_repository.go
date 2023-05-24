package repository

import (
	"arto-be/model/domain"
	"arto-be/utils"

	"github.com/jmoiron/sqlx"
)

type UserRepository interface {
	Save(user *domain.User)
	FindById(userId string) domain.User
	FindByEmail(userEmail string) (domain.User, error)
	Update(user *domain.User)
	UpdatePassword(user *domain.User)
	// CheckEmail(email string) bool

}

type userRepository struct {
	db *sqlx.DB
}

func (userRepo *userRepository) Save(user *domain.User) {
	_, err := userRepo.db.NamedExec(utils.INSERT_USER, &user)
	utils.PanicIfError(err)
}

func (userRepo *userRepository) FindById(userId string) domain.User {
	var user domain.User
	err := userRepo.db.Get(&user, utils.SELECT_USER_ID, userId)
	utils.PanicIfError(err)

	return user
}

func (userRepo *userRepository) FindByEmail(userEmail string) (domain.User, error) {
	var user domain.User
	err := userRepo.db.Get(&user, utils.SELECT_USER_EMAIL, userEmail)
	if err != nil {
		return user, err
	}

	return user, nil
}

func (userRepo *userRepository) Update(user *domain.User) {
	_, err := userRepo.db.NamedExec(utils.UPDATE_USER, &user)
	utils.PanicIfError(err)
}

func (userRepo *userRepository) UpdatePassword(user *domain.User) {
	_, err := userRepo.db.NamedExec(utils.UPDATE_USER_PASSWORD, &user)
	utils.PanicIfError(err)
}

func NewUserRepository(db *sqlx.DB) UserRepository {
	return &userRepository{
		db: db,
	}
}
