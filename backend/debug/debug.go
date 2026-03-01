package debug

import (
	"fmt"
	"os"
)

func InfoLabel(label string, something string) {
	fmt.Printf("%s %s | %s\n", formatLabel(label), LOG_LABEL_INFO, formatContent(something))
}

func WarnLabel(label string, something string) {
	fmt.Printf("%s %s | %s\n", formatLabel(label), LOG_LABEL_WARN, formatContent(something))
}

func ErrLabel(label string, detail error) {
	fmt.Printf("%s %s | %s\n", formatLabel(label), LOG_LABEL_ERROR, formatContent(detail.Error()))
}

func FatalLabel(label string, detail error) {
	fmt.Printf("%s %s | %s\n", formatLabel(label), LOG_LABEL_FATAL, formatContent(detail.Error()))
	fmt.Printf("            | %s\n", "Program will instantly exit")
	os.Exit(1)
}
