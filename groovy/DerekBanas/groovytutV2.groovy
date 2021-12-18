class GroovyTut {
    static void main(String[] args) {
        sayHello();

        println("5 + 4 = " + getSum(5, 4));

        def nums = sumAll(1, 2, 3, 4, 5);
        println("1 + 2 + 3 + 4 + 5 = " + nums);


        def fact4 = factorial(4);
        println("4! = " + fact4);
        
    }

    static def sayHello() {
        System.out.println("Hello World");
    }

    static def getSum(num1=0, num2=0) {
        return num1 + num2;
    }

    static def sumAll(int... num){
        def sum = 0;
        num.each {
            sum += it;
        }
        return sum;
    }

    static def factorial(int num){
        if (num == 0) {
            return 1;
        }
        return num * factorial(num - 1);
    }
}
