import { Faker } from '@faker-js/faker';

interface OfflineFakerModules {
    airline: Faker['airline'];
    animal: Faker['animal'];
    color: Faker['color'];
    commerce: Faker['commerce'];
    company: Faker['company'];
    database: Faker['database'];
    datatype: Faker['datatype'];
    date: Faker['date'];
    finance: Faker['finance'];
    food: Faker['food'];
    git: Faker['git'];
    hacker: Faker['hacker'];
    image: Faker['image'];
    internet: Faker['internet'];
    location: Faker['location'];
    lorem: Faker['lorem'];
    music: Faker['music'];
    number: Faker['number'];
    person: Faker['person'];
    phone: Faker['phone'];
    science: Faker['science'];
    string: Faker['string'];
    system: Faker['system'];
    vehicle: Faker['vehicle'];
    word: Faker['word'];
}

export type FakerModules = keyof OfflineFakerModules;

export default OfflineFakerModules;
