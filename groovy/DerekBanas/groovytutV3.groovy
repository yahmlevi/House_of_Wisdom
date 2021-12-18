class GroovyTut {
    static void main(String[] args) {
        
        // 'call' calls back to the method
        def getFactorial = {num -> (num <= 1 ? 1 : num * call(num - 1))}
        println("factorial -  " + getFactorial(5))


        def greeting = "Goodbye";
        def sayGoodbye = {theName -> println("$greeting $theName")}
        sayGoodbye("Yahm")


        def numList = [1, 2, 3, 4, 5];
        numList.each {println(it)};



        def employees = [
            "Derek": 37,
            "Jill": 29,
            "Mike": 31,
        ];

        employees.each {
            println("$it.key is $it.value years old")
        };


        // new File("test.txt").eachLine {
        //     // println(it)
        //     line -> println("$line")
        // };
    }
}