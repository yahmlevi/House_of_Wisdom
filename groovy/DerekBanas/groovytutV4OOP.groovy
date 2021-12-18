class GroovyTut {
    static void main(String[] args) {
        def king = new Animal('king', 'Growl');

        println("$king.name says $king.sound");

        king.setSound('Roar');

        println("$king.name says $king.sound");

        king.run();

        def grover = new Dog('Grover', 'Grrr', 'Yahm');

        king.makeSound();
        grover.makeSound();
    }
}