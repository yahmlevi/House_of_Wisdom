function morning(name){
    return `Good morning, ${name}`;
}

function evening(name){
    return `Good evening, ${name}`;
}

function happyBirthday(name){
    return `Happy Birthday, ${name}`;
}

// greet is a higher-order
function greet(name, func){
    return func(name);
}

console.log(greet("Faheem",morning));
console.log(greet("Jack",evening));
console.log(greet("Nat",happyBirthday));

