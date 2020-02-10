'use strict';

function setCarToElement(elements, cars) {
    for(let i = 0; i < elements.length; i++) {
      if(!elements[i].car) {
      elements[i].setCar(cars[1]);
      //console.log(elements[i].car);
    }
  }///поменять значение на рандомное?

}

function changePersonInfo(elemnt) {
  hideSection(editFormAddPersonBtn);
  personEditForm.classList.add('visible');
  showSection(personEditForm);

  const editFormCloseBtn = personEditForm.querySelector('.edit-form__btn--close');
    editFormCloseBtn.addEventListener('click', function() {
    hideSection(personEditForm);
  });

  const carsSelect = personEditForm.querySelector('.edit-form__cars-select');

  let selectedCar;

  personEditForm.elements.personName.value = elemnt.name;
  personEditForm.elements.personAge.value = elemnt.age;
  personEditForm.elements.personPhone.value = elemnt.phone;
  personEditForm.elements.personBalance.value = elemnt.balance;
  personEditForm.elements.personCar.value = elemnt.car;

  carsSelect.addEventListener('click', function(evt) {
    if(evt.target.getAttribute('data-car')) {
      let index = parseInt(evt.target.getAttribute('data-car'));
      selectedCar = startCarsArray[index - 1];
      elemnt.setCar(selectedCar);
      personEditForm.elements.personCar.value = elemnt.car;
    }
  });

  if(!carsForPerson.hasChildNodes()) {
    renderCarsList(carsForPerson);
  }

  const editFormSaveBtn = personEditForm.querySelector('.edit-form__btn--save');
  editFormSaveBtn.setAttribute('data-form', elemnt.id);
  showSection(editFormSaveBtn);

  const editFormTitle = personEditForm.querySelector('.edit-form__title');
  editFormTitle.textContent = 'Change person information';


  editFormSaveBtn.addEventListener('click', function() {
    if(validatePersonForm()) {
     if(parseInt(editFormSaveBtn.getAttribute('data-form')) === elemnt.id) {
          getEditedPersonInfo(elemnt, personEditForm);
          elemnt.setCar(selectedCar);
       }
    }
  });
}

function getPeopleListFromLocalStorage() {
  //console.log(1);
  if(localStorage.getItem('peopleArrayInJSONFormat')) {
    let peopleListInString = localStorage.getItem('peopleArrayInJSONFormat');
    let startPeopleArrayWithoutMetods = JSON.parse(peopleListInString);
    startPeopleArray = [];

    //startPeopleArray = startPeopleArrayWithoutMetods.map(item => Object.assign(new Person(), item));

    for(let i = 0; i < startPeopleArrayWithoutMetods.length; i++) {
      startPeopleArray.push(new Person(startPeopleArrayWithoutMetods[i].id, startPeopleArrayWithoutMetods[i].name, startPeopleArrayWithoutMetods[i].age, startPeopleArrayWithoutMetods[i].phone, startPeopleArrayWithoutMetods[i].balance, startPeopleArrayWithoutMetods[i].car));
    }
  } else {
    startPeopleArray = createStartPeopleArray();
    //setCarToElement(startPeopleArray, startCarsArray);
    //localStorage.setItem('peopleArrayInJSONFormat', startCPeopleArray)
  }

  // peopleBtn.addEventListener('click', function() {
  //   createElements(startPeopleArray, peopleTableHeadings, 'peopleArray', personEditForm, changePersonInfo);
  // });
}

function getCompaniesListFromLocalStorage() {
  if(localStorage.getItem('companiesArrayInJSONFormat')) {
    let companiesListInString = localStorage.getItem('companiesArrayInJSONFormat');
    let startElementsArrayWithoutMetods = JSON.parse(companiesListInString);
    startCompaniesArray = [];

    //startCompaniesArray = startElementsArrayWithoutMetods.map(item => Object.assign(new Company(), item));

    for(let i = 0; i < startElementsArrayWithoutMetods.length; i++) {
      startCompaniesArray.push(new Company(startElementsArrayWithoutMetods[i].id, startElementsArrayWithoutMetods[i].name, startElementsArrayWithoutMetods[i].location, startElementsArrayWithoutMetods[i].email, startElementsArrayWithoutMetods[i].balance, startElementsArrayWithoutMetods[i].car));
    }
  } else {
    startCompaniesArray = createStartCompaniesArray();
    //localStorage.setItem('companiesArrayInJSONFormat', startCompaniesArray);
  }
}

function getCarsListFromLocalStorage() {
  if(localStorage.getItem('carsArrayInJSONFormat')) {
    let carsListInString = localStorage.getItem('carsArrayInJSONFormat');
    let startCarsArrayWithoutMetods = JSON.parse(carsListInString);
    startCarsArray = [];

    //startCarsArray = startCarsArrayWithoutMetods.map(item => Object.assign(new Car(), item));

    for(let i = 0; i < startCarsArrayWithoutMetods.length; i++) {
      startCarsArray.push(new Car(startCarsArrayWithoutMetods[i].id, startCarsArrayWithoutMetods[i].model, startCarsArrayWithoutMetods[i].year, startCarsArrayWithoutMetods[i].color, startCarsArrayWithoutMetods[i].price));
    }

    createElements(startCarsArray, carsTableHeadings, 'carsArray', carEditForm, changeCarInfo);
  } else {
    startCarsArray = createStartCarsArray();
    setCarToElement(startPeopleArray, startCarsArray); ///разобраться почему не работает
    setCarToElement(startCompaniesArray, startCarsArray);
    //localStorage.setItem('carsArrayInJSONFormat', startCarsArray);
    createElements(startCarsArray, carsTableHeadings, 'carsArray', carEditForm, changeCarInfo);
  }
}

function createStartCarsArray() {
  let array = [];

  array[0] = new Car(1, 'model1', '2010', 'blue', 4200);
  array[1] = new Car(2, 'model2', '2007', 'white', 3500);
  array[2] = new Car(3, 'model3', '2019', 'purple', 6300);

  return array;
}

function createStartPeopleArray() {
  let array = [];

  array[0] = new Person(1, 'person1', '25', '+38058-587-36-21', 7500);
  array[1] = new Person(2, 'person2', '41', '+38058-854-74-15', 4100);
  array[2] = new Person(3, 'person3', '17', '+38058-254-52-08', 1200);

  setCarToElement(array, startCarsArray);

  return array;
}

function createStartCompaniesArray() {
  let array = [];

  array[0] = new Company(1, 'company1', 'Kiev', 'company1@gmail.com', 12300);
  array[1] = new Company(2, 'company2', 'Odessa', 'company2@gmail.com', 45100);
  array[2] = new Company(3, 'company3', 'Dnepr', 'company1@gmail.com', 17200);

  setCarToElement(array, startCarsArray);

  return array;
}

//
// let startPeopleArray = createStartPeopleArray();
// let startCompaniesArray = createStartCompaniesArray();

// function addNewButton() {
//   const  addNewElementBtnWrapper = document.querySelector('.users__btn-wrapper');
//   let addNewElementBtn = renderElement('button', 'users__new-btn btn', 'Add new element');
//   addNewElementBtn.setAttribute('data-new', 'add-new-element');
//
//   addNewElementBtnWrapper.appendChild(addNewElementBtn);
// }

function createElements(elementsList, headingsArray, nameOfArray, form, changeInfoFunction) {
  const usersTable = document.querySelector('.users__table');
  usersTable.innerHTML = '';

  createTableHeadings(usersTable, headingsArray);

  //console.log(elementsList);

  for( let i = 0; i < elementsList.length; i++) {
    let newCell = createElement(elementsList[i], elementsList, headingsArray, nameOfArray, form, changeInfoFunction);
    usersTable.appendChild(newCell);
  }

  getElementsListFromLocalStorage(elementsList, nameOfArray);

}


function getElementsListFromLocalStorage(elementsList, nameOfArray) {
  let elementsInJSONFormat = JSON.stringify(elementsList);
  localStorage.setItem(nameOfArray + 'InJSONFormat', elementsInJSONFormat);

  if(localStorage.getItem(nameOfArray + 'InJSONFormat')) {
    let elementsListInString = localStorage.getItem(nameOfArray + 'InJSONFormat');

    let elementsListWithoutMetods = JSON.parse(elementsListInString);
    elementsList = [];
    elementsListWithoutMetods.forEach(function(element) {
      if(nameOfArray === 'carsArray') {
        //console.log(1);

        //elementsList = elementsListWithoutMetods.map(item => Object.assign(new Car(), item));
        elementsList.push(new Car(element.id, element.model, element.year, element.color, element.price));
       //console.log(elementsList);
      } else if(nameOfArray === 'peopleArray') {
        elementsList = elementsListWithoutMetods.map(item => Object.assign(new Person(), item));
          //console.log(2);
        elementsList.push(new Person(element.id, element.name, element.age, element.phone, element.balance, element.car));
        //console.log(elementsList);
      } else if(nameOfArray === 'companiesArray') {
          //console.log(3);
          elementsList = elementsListWithoutMetods.map(item => Object.assign(new Company(), item));
        elementsList.push(new Company(element.id, element.name, element.location, element.email, element.balance, element.car));
        //console.log(elementsList);
      }
      });
    }
  //console.log(nameOfArray);
}

function createTableHeadings(table, headingsArray) {
  const elementsTableHeadingsRow = renderElement('tr', 'users__table-headings', null);

  for(let i = 0; i < headingsArray.length; i++) {
    let elementsColumnHeading = renderElement('th', null, headingsArray[i]);
    elementsTableHeadingsRow.appendChild(elementsColumnHeading);
  }

  table.appendChild(elementsTableHeadingsRow);
}

function createElement(elemnt, elementsList, headingsArray, nameOfArray, form, changeInfoFunction) {
  let newElement = document.createElement('tr');

  elemnt.renderInfoInTableCell(newElement);

  let buttonsTableCell = renderElement('td', 'users__buttons', null);
  buttonsTableCell.setAttribute('data-elem-index', elemnt.id - 1);

  let editBtn = renderElement('button', 'btn', 'Edit');
  editBtn.setAttribute('data-btn', '0');

  editBtn.addEventListener('click', function() {
    changeInfoFunction(elemnt);
    hideSection(elementInfo);
    hideSection(confirmPopup);
  });
  //
  let viewBtn = renderElement('button', 'btn', 'View');

  viewBtn.addEventListener('click', function() {
    showElementInfo(elemnt);
    hideSection(form);
    hideSection(confirmPopup);
  });

  let removeBtn = renderElement('button', 'btn', 'Remove');
  removeBtn.setAttribute('data-btn', elemnt.id);

  removeBtn.addEventListener('click', function() {
    if(parseInt(removeBtn.getAttribute('data-btn')) === elemnt.id) {
      hideSection(elementInfo);
      hideSection(form);
      showConfirmMessage(elemnt.id - 1, elementsList, headingsArray, nameOfArray, form, changeInfoFunction);
     }
  });

  newElement.appendChild(buttonsTableCell);
  buttonsTableCell.appendChild(editBtn);
  buttonsTableCell.appendChild(viewBtn);
  buttonsTableCell.appendChild(removeBtn);

  return newElement;
}

function showElementInfo(elemnt, title) {
  const elementInfo = document.querySelector('.user-info');
  const elementInfoContent = elementInfo.querySelector('.user-info__content');
  const elementInfoCloseBtn = document.querySelector('.user-info__close-btn');

  elementInfoContent.innerHTML = '';

  showSection(elementInfo);

  elementInfoCloseBtn.addEventListener('click', function() {
    hideSection(elementInfo);
  });

  elemnt.showFullInfo(elementInfoContent);
}

function getEditedCarInfo(elemnt, form) {
  //elemnt.innerHTML = '';
  elemnt.model = form.elements.carModel.value;
  elemnt.year = form.elements.carYear.value;
  elemnt.color = form.elements.carColor.value;
  elemnt.price = form.elements.carPrice.value;
  hideSection(form);
  createElements(startCarsArray, carsTableHeadings, 'carsArray', carEditForm, changeCarInfo);

  return elemnt;
}

function getEditedPersonInfo(elemnt, form) {
  //elemnt.innerHTML = '';
  elemnt.name = form.elements.personName.value;
  elemnt.age = form.elements.personAge.value;
  elemnt.phone = form.elements.personPhone.value;
  elemnt.balance = form.elements.personBalance.value;

//нужно ли добавить машину сюда

  hideSection(form);
  createElements(startPeopleArray, peopleTableHeadings, 'peopleArray', personEditForm, changePersonInfo);

  return elemnt;
}

function getEditedCompanyInfo(elemnt, form) {
  elemnt.innerHTML = '';
  elemnt.name = form.elements.companyName.value;
  elemnt.location = form.elements.companyLocation.value;
  elemnt.email = form.elements.companyEmail.value;
  elemnt.balance = form.elements.companyBalance.value;
  hideSection(form);
  createElements(startCompaniesArray, companiesTableHeadings, changeCompanyInfo, 'companiesArray');

  return elemnt;
}

function changeCarInfo(elemnt) {
  //editForm.innerHTML = '';
  carEditForm.classList.add('visible');
  showSection(carEditForm);

  const editFormCloseBtn = carEditForm.querySelector('.edit-form__btn--close');
    editFormCloseBtn.addEventListener('click', function() {
    hideSection(carEditForm);
  });

  carEditForm.elements.carModel.value = elemnt.model;
  carEditForm.elements.carYear.value = elemnt.year;
  carEditForm.elements.carColor.value = elemnt.color;
  carEditForm.elements.carPrice.value = elemnt.price;

  const editFormSaveBtn = carEditForm.querySelector('.edit-form__btn--save');
  editFormSaveBtn.setAttribute('data-form', elemnt.id);
  showSection(editFormSaveBtn);

  //const editFormAddCarBtn = carEditForm.querySelector('.edit-form__btn-car--add');
  hideSection(editFormAddCarBtn);

  const editFormTitle = carEditForm.querySelector('.edit-form__title');
  editFormTitle.textContent = 'Change car information';

  editFormSaveBtn.addEventListener('click', function() {
    // if(validateForm(editForm)) {
     if(parseInt(editFormSaveBtn.getAttribute('data-form')) === elemnt.id) {
          getEditedCarInfo(elemnt, carEditForm);
       }
    // }
  });
}

function changePersonInfo(elemnt) {
  //editForm.innerHTML = '';
  personEditForm.classList.add('visible');
  showSection(personEditForm);

  const personCars = personEditForm.querySelector('.edit-form__current-car');
  let personCar = renderElement

  const editFormCloseBtn = personEditForm.querySelector('.edit-form__btn--close');
    editFormCloseBtn.addEventListener('click', function() {
    hideSection(personEditForm);
  });

  const carsSelect = personEditForm.querySelector('.edit-form__cars-select');
  const addCarBtn = personEditForm.querySelector('.edit-form__add-car');

  let selectedCar;

  personEditForm.elements.personName.value = elemnt.name;
  personEditForm.elements.personAge.value = elemnt.age;
  personEditForm.elements.personPhone.value = elemnt.phone;
  personEditForm.elements.personBalance.value = elemnt.balance;

  //personEditForm.elements.personCar.value = elemnt.car;

  carsSelect.addEventListener('click', function(evt) {
    if(evt.target.getAttribute('data-car')) {
      let index = parseInt(evt.target.getAttribute('data-car'));
      console.log(index);
      selectedCar = startCarsArray[index - 1];
      console.log(selectedCar);
      elemnt.setCar(selectedCar);
      console.log(elemnt);
      personEditForm.elements.personCar.value = elemnt.car;
    }
  });

  if(!carsForPerson.hasChildNodes()) {
    renderCarsList(carsForPerson);
  }


  const editFormSaveBtn = personEditForm.querySelector('.edit-form__btn--save');
  editFormSaveBtn.setAttribute('data-form', elemnt.id);
  showSection(editFormSaveBtn);

  const editFormAddPersonBtn = personEditForm.querySelector('.edit-form__btn-person--add');
  hideSection(editFormAddPersonBtn);

  const editFormTitle = personEditForm.querySelector('.edit-form__title');
  editFormTitle.textContent = 'Change person information';


  editFormSaveBtn.addEventListener('click', function() {
    // if(validateForm(editForm)) {
     if(parseInt(editFormSaveBtn.getAttribute('data-form')) === elemnt.id) {
          getEditedPersonInfo(elemnt, personEditForm);
          elemnt.setCar(selectedCar);
       }
    // }
  });
}

function changeCompanyInfo(elemnt) {
  //editForm.innerHTML = '';
  companyEditForm.classList.add('visible');
  hideSection(editFormAddCompanyBtn);
  showSection(companyEditForm);

  const editFormCloseBtn = companyEditForm.querySelector('.edit-form__btn--close');
    editFormCloseBtn.addEventListener('click', function() {
    hideSection(companyEditForm);
  });

  const carsSelect = personEditForm.querySelector('.edit-form__cars-select');
  const addCarBtn = personEditForm.querySelector('.edit-form__add-car');

  let selectedCar;

  companyEditForm.elements.companyName.value = elemnt.name;
  companyEditForm.elements.companyLocation.value = elemnt.location;
  companyEditForm.elements.companyEmail.value = elemnt.email;
  companyEditForm.elements.companyBalance.value = elemnt.balance;

  carsSelect.addEventListener('click', function(evt) {
    if(evt.target.getAttribute('data-car')) {
      let index = parseInt(evt.target.getAttribute('data-car'));
      console.log(index);
      selectedCar = startCarsArray[index - 1];
      console.log(selectedCar);
      elemnt.setCar(selectedCar);
      console.log(elemnt);
      personEditForm.elements.personCar.value = elemnt.car;
    }
  });

  if(!carsForPerson.hasChildNodes()) {
    renderCarsList(carsForPerson);
  }

  const editFormSaveBtn = companyEditForm.querySelector('.edit-form__btn--save');
  editFormSaveBtn.setAttribute('data-form', elemnt.id);
  showSection(editFormSaveBtn);

  const editFormTitle = companyEditForm.querySelector('.edit-form__title');
  editFormTitle.textContent = 'Change company information';

  editFormSaveBtn.addEventListener('click', function() {
    // if(validateForm(editForm)) {
     if(parseInt(editFormSaveBtn.getAttribute('data-form')) === elemnt.id) {
          getEditedCompanyInfo(elemnt, companyEditForm);
          elemnt.setCar(selectedCar);
       }
    // }
  });
}

function showConfirmMessage(arrayOfElements, elemntId, headingsArray, nameOfArray, form, changeInfoFunction) {
  showSection(confirmPopup);

  const confirmBtn = confirmPopup.querySelector('.confirm-popup__btn--confirm');
  confirmBtn.addEventListener('click', function() {
    removeUser(arrayOfElements, elemntId, headingsArray, nameOfArray, form, changeInfoFunction);
    hideSection(confirmPopup);
  });

  const cancelBtn = confirmPopup.querySelector('.confirm-popup__btn--cancel');
  cancelBtn.addEventListener('click', function() {
    hideSection(confirmPopup);
  });
}

function removeUser(arrayOfElements, elemntId, headingsArray, nameOfArray, form, changeInfoFunction) { ///переименовать функцию
  arrayOfElements.splice(elemntId, 1);
  createElements(arrayOfElements, headingsArray, nameOfArray, form, changeInfoFunction);
}

function addNewElement(form, addBtn) {
  const formTitle = form.querySelector('.edit-form__title');
  const formSaveBtn = form.querySelector('.edit-form__btn--save');
  resetForm(form, formTitle, 'Add new element information');

  const editFormCloseBtn = form.querySelector('.edit-form__btn--close');
    editFormCloseBtn.addEventListener('click', function() {
    hideSection(form);
  });

  hideSection(formSaveBtn);
  showSection(addBtn);
}

function resetForm(form, formTitle, text) {
  showSection(form);
  form.reset();
  // form.elements.userName.placeholder = 'user1';
  // form.elements.userAge.placeholder = '27';
  // form.elements.userEmail.placeholder = 'user1@gmail.com';
  // form.elements.userPhone.placeholder = '+38000-000-00-00';
  // form.elements.userCard.placeholder = '0000 0000 0000 0000';

  formTitle.textContent = text;
}

function getNewCarInfo(carEditForm, startCarsArray) {
   let elemnt = new Car;
   elemnt.id = startCarsArray.length + 1;
   elemnt.model = carEditForm.elements.carModel.value;
   elemnt.year = carEditForm.elements.carYear.value;
   elemnt.color = carEditForm.elements.carColor.value;
   elemnt.price = carEditForm.elements.carPrice.value;

   return elemnt;
}


editFormAddCarBtn.addEventListener('click', function() {
  if(editFormAddCarBtn.classList.contains('visible')) {
    createAndPushNewCar(carEditForm);
  }
});

function createAndPushNewCar(carEditForm) {
  let newElement;
  let formSaveBtn = carEditForm.querySelector('.edit-form__btn--save')
  // if(validateForm(form)) {
    newElement = getNewCarInfo(carEditForm, startCarsArray);
    formSaveBtn.setAttribute('data-form', newElement.id);
    startCarsArray.push(newElement);
    hideSection(carEditForm);
    createElement(newElement, startCarsArray,  carsTableHeadings, 'carsArray', carEditForm, changeCarInfo);
    createElements(startCarsArray,  carsTableHeadings, 'carsArray', carEditForm, changeCarInfo);
  // }
}

function getNewPersonInfo(personEditForm, startPersonArray) {
   let elemnt = new Person;


   elemnt.id = startPersonArray.length + 1;
   elemnt.name = personEditForm.elements.personName.value;
   elemnt.age = personEditForm.elements.personAge.value;
   elemnt.phone = personEditForm.elements.personPhone.value;
   elemnt.balance = personEditForm.elements.personBalance.value;
   // elemnt.car = selectedCar['model'];
   // elemnt.carId = selectedCar['id'];
   //elemnt.car = personEditForm.elements.personCar.value;

   return elemnt;
}


editFormAddPersonBtn.addEventListener('click', function() {
  if(editFormAddPersonBtn.classList.contains('visible')) {
    createAndPushNewPerson(personEditForm);
  }
});

function renderCarsList(carsListSelect) {
  //console.log(15);
  for(let i = 0; i < startCarsArray.length; i++) {
    //let carOption;
    let carOption = renderElement('span', 'edit-form__option', startCarsArray[i].model);
    carOption.setAttribute('data-car', startCarsArray[i].id);
    carsListSelect.appendChild(carOption);
    //carsSelect.selectedIndex = elemnt.carId;
  }
}

function createAndPushNewPerson(personEditForm) {
  // const carsSelect = personEditForm.querySelector('.edit-form__cars-select');
  const addCarBtn = personEditForm.querySelector('.edit-form__add-car');
  let newElement;
  let formSaveBtn = personEditForm.querySelector('.edit-form__btn--save');

  // if(validateForm(form)) {
    newElement = getNewPersonInfo(personEditForm, startPeopleArray);

    let selectedCar = personEditForm.elements.personCar.getAttribute('data-id');

    newElement.setCar(startCarsArray[selectedCar]);

    formSaveBtn.setAttribute('data-form', newElement.id);
    startPeopleArray.push(newElement);
    hideSection(personEditForm);
    createElement(newElement, startPeopleArray,  peopleTableHeadings, 'peopleArray', personEditForm, changePersonInfo);
    createElements(startPeopleArray,  peopleTableHeadings, 'peopleArray', personEditForm, changePersonInfo);
  // }
}

function getNewCompanyInfo(companyEditForm, startCompaniesArray) {
   let elemnt = new Company;

   elemnt.id = startCompaniesArray.length + 1;
   elemnt.name = companyEditForm.elements.companyName.value;
   elemnt.location = companyEditForm.elements.companyLocation.value;
   elemnt.email = companyEditForm.elements.companyEmail.value;
   elemnt.balance = companyEditForm.elements.companyBalance.value;
   // elemnt.car = selectedCar['model'];
   // elemnt.carId = selectedCar['id'];
   //elemnt.car = personEditForm.elements.personCar.value;

   return elemnt;
}


editFormAddCompanyBtn.addEventListener('click', function() {
  if(editFormAddCompanyBtn.classList.contains('visible')) {
    createAndPushNewCompany(companyEditForm);
  }
});


function createAndPushNewCompany(companyEditForm) {
  // const carsSelect = personEditForm.querySelector('.edit-form__cars-select');
  const addCarBtn = companyEditForm.querySelector('.edit-form__add-car');
  let newElement;
  let formSaveBtn = companyEditForm.querySelector('.edit-form__btn--save');

  // if(validateForm(form)) {
    newElement = getNewCompanyInfo(companyEditForm, startCompaniesArray);

    let selectedCar = companyEditForm.elements.companyCar.getAttribute('data-id');

    newElement.setCar(startCarsArray[selectedCar]);

    formSaveBtn.setAttribute('data-form', newElement.id);
    startCompaniesArray.push(newElement);
    hideSection(companyEditForm);
    createElement(newElement, startCompaniesArray,  companiesTableHeadings, 'companiesArray', companyEditForm, changeCompanyInfo);
    createElements(startCompaniesArray,  companiesTableHeadings, 'companiesArray', companyEditForm, changeCompanyInfo);
  // }
}

// function sellTheCar(element) {
//
// }

//
// ////Решить вопрос с пропажей машин после перезагрузки
// ////Настроить валидацию
// ////Переименовать разметку и функции
////0. Удалять кнопку добавить в форме редактирования
//
// ///решить что-то с тем, чтобы подставлять и в форму и в функцию создания элемента(нового и рендера в таблице) то,
// //в какой категории этот элемент находиться
// ///Реализовать возможность купить и привязать авто  (учитывать возраст?)
// ///Реализовать возможность купить и привязать несколько авто с учетом баланса
// ///Реализовать возможность продать авто - примерно за 70-80% стоимости, и увеличивать баланс
