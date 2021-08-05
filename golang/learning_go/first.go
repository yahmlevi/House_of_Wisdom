package main

import (
	"fmt" // format string
)

var i float32 = 0

var (
	yahm       string = "yahm levi"
	yahm_hight int    = 5
)
var (
	yaar       string = "yaar levi"
	yaar_hight int    = 5
)

func main() {
	x := 6 // let GO decide what type
	n := 10
	grades := [3]int{97, 95, 85}
	numbers := [...]int{97, 95, 85, 99, 101}

	const myConst int = 420
	if true {
		n = 4
	}
	fmt.Println(grades[1])
	fmt.Println(numbers)
	fmt.Println(myConst)
	fmt.Println(n)
	fmt.Println(i)             // print line
	fmt.Printf("%v, %T", x, x) // print foramt
}
