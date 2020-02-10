'use strict';

const peopleTableHeadings = ['Name', 'Age', 'Options'];
const companiesTableHeadings = ['Name', 'Location', 'Options'];
const carsTableHeadings = ['Model', 'Price', 'Options'];

const carsBtn = document.querySelector('.tabs__btn--cars');
const peopleBtn = document.querySelector('.tabs__btn--people');
const companiesBtn = document.querySelector('.tabs__btn--companies');


const elementInfo = document.querySelector('.user-info');
const personEditForm = document.forms.person;
const companyEditForm = document.forms.company;
const carEditForm = document.forms.car;


const carsForPerson = personEditForm.querySelector('.edit-form__cars-list');
const carsForCompany = companyEditForm.querySelector('.edit-form__cars-list');

const addNewElementBtn = document.querySelector('.users__new-btn');
const editFormAddPersonBtn = document.querySelector('.edit-form__btn-person--add');
const editFormAddCompanyBtn = document.querySelector('.edit-form__btn-company--add');
const editFormAddCarBtn = document.querySelector('.edit-form__btn-car--add');

const confirmPopup = document.querySelector('.confirm-popup');

let startPeopleArray = [
    new Person(1, 'person1', 30, '+38055-236-94-87', 4200),
    new Person(2, 'person2', 42, '+38057-294-78-55', 3700),
    new Person(3, 'person3', 61, '+38058-587-36-21', 6100),
];

let startCompaniesArray = [
    new Company(1, 'company1', 'Kiev', 'company1@gmail.com', 17500),
    new Company(2, 'company2', 'Odessa', 'company2@gmail.com', 18600),
    new Company(3, 'company3', 'Dnepr', 'company3@gmail.com', 12500),
];

let startCarsArray = [
    new Car(1, 'car1', 2007, 'blue', 2300),
    new Car(2, 'car2', 2019, 'red', 4500),
    new Car(3, 'car3', 2010, 'white', 3200),
];
