package service

import (
	"arto-be/model/domain"
	"arto-be/model/web"
	"arto-be/repository"
)

type UserService interface {
	GetUser(userId string) web.UserResponse
	Register(newUser *web.UserRegisterRequest) (map[string]string, error)
	Login(loginRequest *web.UserLoginRequest) (string, error)
	ForgotPassword(resetRequest *web.UserResetRequest) (map[string]string, error)
	ChangePassword(userId string, changePasswordRequest *web.UserChangePasswordRequest)
}

type userService struct {
	userRepo repository.UserRepository
	// tokenServ authenticator.AccessToken
}

func (userService *userService) GetUser(userId string) web.UserResponse {
	var userResponse web.UserResponse
	user := userService.userRepo.FindById(userId)

	userResponse.Id = user.Id
	userResponse.Name = user.Name
	userResponse.Email = user.Email

	return userResponse
}

func (userService *userService) Register(newUser *web.UserRegisterRequest) (map[string]string, error) {
	var user domain.User
	user.Id = newUser.Id
	user.Name = newUser.Name
	user.Email = newUser.Email
	user.Password = newUser.Password

	userService.userRepo.Save(&user)

	return nil, nil
}

// func (userService *userService) Login(loginRequest *web.UserLoginRequest) (string, error) {
// 	user, err := userService.userRepo.FindByEmail(loginRequest.Email)
// 	if err != nil {
// 		return "", err
// 	}

// 	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginRequest.Password))
// 	if err != nil {
// 		return "", err
// 	}

// 	token, err := userService.tokenServ.CreateAccessToken(&user)
// 	if err != nil {
// 		return "", err
// 	}

// 	return token, nil
// }
