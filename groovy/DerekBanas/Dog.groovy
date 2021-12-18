class Dog extends Animal {
    def owner;

    def Dog(name, sound, owner) {
        super(name, sound)
        this.owner = owner
    }

    def makeSound(){
        // overide the super class method
        println("$name says bark and $sound")
    }
}