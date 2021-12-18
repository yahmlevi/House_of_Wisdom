class GroovyTut {
    // static means that the method belong to the class
    // void means that the method doesn't return anything
    // we pass it a string array called args
    static void main(String[] args) {
        println("Hi Yahm")
        System.out.println("Hello World");
        println("5 * 4 = " + (5 * 4));
        println("5.2 * 4.4 = " + (5.2.plus(4.4)));

        def age = "1"
        println("age = " + (++age))

        def name = "Yahm"
        println("3rd Index of Name " + name[3]);
        println("Substring at 1 " + name.substring(1));

        def randString = "Random";
        println("Random $randString String");
        // println("Random %s String", [randString]);

        // print("Whats's your name?\n")
        // def fName = System.console().readLine();
        // print("\nHello " + fName + "!\n");


        def paulMap = [
            'name': 'Paul',
            'age': 35,
            'address': '123 Main St',
            'list': [1, 2, 3, 4, 5]
        ];

        println("Name " + paulMap.name);
        println("Name " + paulMap['name']);
        println("List Item " + paulMap['list'][1]);
        println("Has Key " + paulMap.containsKey('age'));


        def ageOld = 16;

        if(ageOld == 5) {
            println("You are 5 years old");
        } else if(ageOld == 6) {
            println("You are 6 years old");
        } else {
            println("You are older than 6");
        }

        def canVote = true;

        // println(canVote ? "You can vote" : "You can't vote");

        switch(ageOld) {
            case 16:
                println("You can drive");
                break;
            case 18:
                println("You can vote");
                break;
            default: 
                println("Have FUN!");
        }

        println("For Loop");

        def i = 0;
        while (i < 10) {
            if(i % 2){
                i++;
                continue;
            }
            if(i == 8) {
                break;
            }
            println(i);
            i++;
        }

        for(def x = 0; x < 10; x++) {
            println(x);
        }
        for(j in 2..6) {
            println(j);
        }
    }
}