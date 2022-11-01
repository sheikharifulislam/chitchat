const person1 = {
    name: "Ariful",
    address: {
        lat: 102,
    },
};

const person2 = structuredClone(person1);
delete person2.name;
delete person2.address.lat;
console.log(person1);
console.log(person2);
