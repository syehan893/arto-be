package utils

const (
	//User
	INSERT_USER          = "INSERT INTO users (id, name, email, password) VALUES (:id, :name, :email, :password)"
	SELECT_USER_ID       = "SELECT * FROM users WHERE id = $1"
	SELECT_USER_EMAIL    = "SELECT * FROM users WHERE email = $1"
	UPDATE_USER          = "UPDATE users SET name = :name, email = :email WHERE id = :id"
	UPDATE_USER_PASSWORD = "UPDATE users SET password = :password WHERE id = :id"
)
