package utils

import (
	"math/rand"
)

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
var lettersLength = len(letters)

func GetRandomString(strLength int) string {
	bytes := make([]rune, strLength)
	for i := range bytes {
		bytes[i] = letters[rand.Intn(lettersLength)]
	}
	return string(bytes)
}
