'use strict';

function setCarToElement(elements, cars) {
  for(let i = 0; i < elements.length; i++) {
    if(!elements[i].car) {
      elements[i].setCar(cars[1]);
    }
  }
}

function getPeopleListFromLocalStorage() {
  if(localStorage.getItem('peopleArrayInJSONFormat')) {
    let peopleListInString = localStorage.getItem('peopleArrayInJSONFormat');
    let startPeopleArrayWithoutMetods = JSON.parse(peopleListInString);
    startPeopleArray = [];

    for(let i = 0; i < startPeopleArrayWithoutMetods.length; i++) {
      startPeopleArray.push(new Person(startPeopleArrayWithoutMetods[i].id, startPeopleArrayWithoutMetods[i].name, startPeopleArrayWithoutMetods[i].age, startPeopleArrayWithoutMetods[i].phone, startPeopleArrayWithoutMetods[i].balance, startPeopleArrayWithoutMetods[i].car, startPeopleArrayWithoutMetods[i].carId));
    }
  } else {
    setCarToElement(startPeopleArray, startCarsArray);
  }
}

function getCompaniesListFromLocalStorage() {
  if(localStorage.getItem('companiesArrayInJSONFormat')) {
    let companiesListInString = localStorage.getItem('companiesArrayInJSONFormat');
    let startElementsArrayWithoutMetods = JSON.parse(companiesListInString);
    startCompaniesArray = [];

    for(let i = 0; i < startElementsArrayWithoutMetods.length; i++) {
      startCompaniesArray.push(new Company(startElementsArrayWithoutMetods[i].id, startElementsArrayWithoutMetods[i].name, startElementsArrayWithoutMetods[i].location, startElementsArrayWithoutMetods[i].email, startElementsArrayWithoutMetods[i].balance, startElementsArrayWithoutMetods[i].car, startElementsArrayWithoutMetods[i].carId));
    }
  } else {
    setCarToElement(startCompaniesArray, startCarsArray);
  }
}

function getCarsListFromLocalStorage() {
  if(localStorage.getItem('carsArrayInJSONFormat')) {
    let carsListInString = localStorage.getItem('carsArrayInJSONFormat');
    let startCarsArrayWithoutMetods = JSON.parse(carsListInString);
    startCarsArray = [];

    for(let i = 0; i < startCarsArrayWithoutMetods.length; i++) {
      startCarsArray.push(new Car(startCarsArrayWithoutMetods[i].id, startCarsArrayWithoutMetods[i].model, startCarsArrayWithoutMetods[i].year, startCarsArrayWithoutMetods[i].color, startCarsArrayWithoutMetods[i].price));
    }

    createElements(startCarsArray, carsTableHeadings, 'carsArray', carEditForm, changeCarInfo);
  } else {
    createElements(startCarsArray, carsTableHeadings, 'carsArray', carEditForm, changeCarInfo);
  }
}

function createElements(elementsList, headingsArray, nameOfArray, form, changeInfoFunction) {
  const usersTable = document.querySelector('.users__table');
  usersTable.innerHTML = '';

  createTableHeadings(usersTable, headingsArray);

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
    //elementsListWithoutMetods.forEach(function(element) {
      if(nameOfArray === 'carsArray') {
        elementsListWithoutMetods.forEach(function(element) {
          elementsList.push(new Car(element.id, element.model, element.year, element.color, element.price));
        });
      } else if(nameOfArray === 'peopleArray') {
        elementsListWithoutMetods.forEach(function(element) {
          elementsList.push(new Person(element.id, element.name, element.age, element.phone, element.balance, element.car, element.carId));
        });
      } else if(nameOfArray === 'companiesArray') {
        elementsListWithoutMetods.forEach(function(element) {
          elementsList.push(new Company(element.id, element.name, element.location, element.email, element.balance, element.car, element.carId));
        });
      }
  }
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

  hideSection(form);
  createElements(startPeopleArray, peopleTableHeadings, 'peopleArray', personEditForm, changePersonInfo);

  return elemnt;
}

function getEditedCompanyInfo(elemnt, form) {
  //elemnt.innerHTML = '';
  elemnt.name = form.elements.companyName.value;
  elemnt.location = form.elements.companyLocation.value;
  elemnt.email = form.elements.companyEmail.value;
  elemnt.balance = form.elements.companyBalance.value;

  hideSection(form);
  createElements(startCompaniesArray, companiesTableHeadings, 'companiesArray', companyEditForm, changeCompanyInfo);

  return elemnt;
}

function changeCarInfo(elemnt) {
  hideSection(editFormAddCarBtn);
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

  hideSection(editFormAddCarBtn);

  const editFormTitle = carEditForm.querySelector('.edit-form__title');
  editFormTitle.textContent = 'Change car information';

  editFormSaveBtn.addEventListener('click', function() {
   if(validateCarForm()) {
     if(parseInt(editFormSaveBtn.getAttribute('data-form')) === elemnt.id) {
          getEditedCarInfo(elemnt, carEditForm);
       }
    }
  });
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

function changeCompanyInfo(elemnt) {
  hideSection(editFormAddCompanyBtn);
  companyEditForm.classList.add('visible');
  showSection(companyEditForm);

  const editFormCloseBtn = companyEditForm.querySelector('.edit-form__btn--close');
    editFormCloseBtn.addEventListener('click', function() {
    hideSection(companyEditForm);
  });

  const carsSelect = companyEditForm.querySelector('.edit-form__cars-select');

  let selectedCar;

  companyEditForm.elements.companyName.value = elemnt.name;
  companyEditForm.elements.companyLocation.value = elemnt.location;
  companyEditForm.elements.companyEmail.value = elemnt.email;
  companyEditForm.elements.companyBalance.value = elemnt.balance;
  companyEditForm.elements.companyCar.value = elemnt.car;

  carsSelect.addEventListener('click', function(evt) {
    if(evt.target.getAttribute('data-car')) {
      let index = parseInt(evt.target.getAttribute('data-car'));
      selectedCar = startCarsArray[index - 1];
      elemnt.setCar(selectedCar);
      companyEditForm.elements.companyCar.value = elemnt.car;
    }
  });

  if(!carsForCompany.hasChildNodes()) {
    renderCarsList(carsForCompany);
  }

  const editFormSaveBtn = companyEditForm.querySelector('.edit-form__btn--save');
  editFormSaveBtn.setAttribute('data-form', elemnt.id);
  showSection(editFormSaveBtn);

  const editFormTitle = companyEditForm.querySelector('.edit-form__title');
  editFormTitle.textContent = 'Change company information';

  editFormSaveBtn.addEventListener('click', function() {
    if(validateCompanyForm()) {
      if(parseInt(editFormSaveBtn.getAttribute('data-form')) === elemnt.id) {
        getEditedCompanyInfo(elemnt, companyEditForm);
        elemnt.setCar(selectedCar);
       }
    }
  });
}

function showConfirmMessage(elemntId, arrayOfElements, headingsArray, nameOfArray, form, changeInfoFunction) {
  showSection(confirmPopup);

  const confirmBtn = confirmPopup.querySelector('.confirm-popup__btn--confirm');
  confirmBtn.addEventListener('click', function() {
    removeElement(elemntId, arrayOfElements, headingsArray, nameOfArray, form, changeInfoFunction);
    hideSection(confirmPopup);
  });

  const cancelBtn = confirmPopup.querySelector('.confirm-popup__btn--cancel');
  cancelBtn.addEventListener('click', function() {
    hideSection(confirmPopup);
  });
}

function removeElement(elemntId, arrayOfElements, headingsArray, nameOfArray, form, changeInfoFunction) {
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
  if(validateCarForm()) {
    newElement = getNewCarInfo(carEditForm, startCarsArray);
    formSaveBtn.setAttribute('data-form', newElement.id);
    startCarsArray.push(newElement);
    hideSection(carEditForm);
    createElement(newElement, startCarsArray,  carsTableHeadings, 'carsArray', carEditForm, changeCarInfo);
    createElements(startCarsArray,  carsTableHeadings, 'carsArray', carEditForm, changeCarInfo);
  }
}

function getNewPersonInfo(personEditForm, startPersonArray) {
   let elemnt = new Person;

   elemnt.id = startPersonArray.length + 1;
   elemnt.name = personEditForm.elements.personName.value;
   elemnt.age = personEditForm.elements.personAge.value;
   elemnt.phone = personEditForm.elements.personPhone.value;
   elemnt.balance = personEditForm.elements.personBalance.value;

   return elemnt;
}


editFormAddPersonBtn.addEventListener('click', function() {
  if(editFormAddPersonBtn.classList.contains('visible')) {
    createAndPushNewPerson(personEditForm, startCarsArray);
  }
});

function renderCarsList(carsListSelect) {
  for(let i = 0; i < startCarsArray.length; i++) {
    let carOption = renderElement('p', 'edit-form__option', startCarsArray[i].model);
    carOption.setAttribute('data-car', startCarsArray[i].id);
    carsListSelect.appendChild(carOption);

  }
}

function createAndPushNewPerson(personEditForm, startCarsArray) {
  let newElement;
  let selectedPersonCar;
  let formSaveBtn = personEditForm.querySelector('.edit-form__btn--save');

  if(validatePersonForm()) {
    newElement = getNewPersonInfo(personEditForm, startPeopleArray);

    selectedPersonCar = personEditForm.elements.personCar.getAttribute('data-id');
    newElement.setCar(startCarsArray[selectedPersonCar - 1]);

    formSaveBtn.setAttribute('data-form', newElement.id);
    startPeopleArray.push(newElement);
    hideSection(personEditForm);
    createElement(newElement, startPeopleArray,  peopleTableHeadings, 'peopleArray', personEditForm, changePersonInfo);
    createElements(startPeopleArray,  peopleTableHeadings, 'peopleArray', personEditForm, changePersonInfo);
  }
}

function getNewCompanyInfo(companyEditForm, startCompaniesArray) {
   let elemnt = new Company;

   elemnt.id = startCompaniesArray.length + 1;
   elemnt.name = companyEditForm.elements.companyName.value;
   elemnt.location = companyEditForm.elements.companyLocation.value;
   elemnt.email = companyEditForm.elements.companyEmail.value;
   elemnt.balance = companyEditForm.elements.companyBalance.value;

   return elemnt;
}

editFormAddCompanyBtn.addEventListener('click', function() {
  if(editFormAddCompanyBtn.classList.contains('visible')) {
    createAndPushNewCompany(companyEditForm);
  }
});

function createAndPushNewCompany(companyEditForm) {
  let newElement;
  let selectedCompanyCar;
  let formSaveBtn = companyEditForm.querySelector('.edit-form__btn--save');

  if(validateCompanyForm()) {
    newElement = getNewCompanyInfo(companyEditForm, startCompaniesArray);

    selectedCompanyCar = companyEditForm.elements.companyCar.getAttribute('data-id');

    newElement.setCar(startCarsArray[selectedCompanyCar - 1]);

    formSaveBtn.setAttribute('data-form', newElement.id);
    startCompaniesArray.push(newElement);
    hideSection(companyEditForm);
    createElement(newElement, startCompaniesArray,  companiesTableHeadings, 'companiesArray', companyEditForm, changeCompanyInfo);
    createElements(startCompaniesArray,  companiesTableHeadings, 'companiesArray', companyEditForm, changeCompanyInfo);
  }
}


function closeErrorPopup(popup) {
  const errorPopupClose = popup.querySelector('.error-popup__close');
  errorPopupClose.addEventListener('click', function(){
    hideSection(popup)
  });
}

function validatePersonForm() {
	let valid = true;
  const errorPopup = document.querySelector('.error-popup');
  const errorPopupText = errorPopup.querySelector('.error-popup__text');
  closeErrorPopup(errorPopup);

  const nameValidate = /^[^0-9]\w[^#&<>\"~;$^%{}?]{1,15}$/;
  const ageValidate =  /^(?:[2-9]|[1-9]\d+)$/;
  const phoneValidate = /^\+[0-9]{5}\-[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/;
  const balanceValidate = /^([0-9][0-9]{3,6}|100000)$/;

  if (!personEditForm.elements.personName.value.match(nameValidate)) {
    errorPopupText.textContent = 'Please, enter name correctly';
    showSection(errorPopup);
    valid = false;
  }

  if (!personEditForm.elements.personAge.value.match(ageValidate)) {
    errorPopupText.textContent = 'Please, enter age correctly';
    showSection(errorPopup);
    valid = false;
  }

  if (!personEditForm.elements.personPhone.value.match(phoneValidate)) {
    errorPopupText.textContent = 'Please, enter phone correctly(in format +38000-000-00-00)';
    showSection(errorPopup);
    valid = false;
  }

  if (!personEditForm.elements.personBalance.value.match(balanceValidate)) {
    errorPopupText.textContent = 'Please, enter balance correctly(from 1000 to 100 000)';
    showSection(errorPopup);
    valid = false;
  }
  return valid;
}

function validateCompanyForm() {
	let valid = true;
  const errorPopup = document.querySelector('.error-popup');
  const errorPopupText = errorPopup.querySelector('.error-popup__text');
  closeErrorPopup(errorPopup);

  const nameValidate = /^[^0-9]\w[^#&<>\"~;$^%{}?]{1,15}$/;
  const locationValidate = /^(?:[A-Z][a-z]+ )*[A-Z][a-z]+$/;
  const emailValidate = /^\w+[.!#$%&'*+/=?^_`{|}~-]*?\w*?@[a-z]+?\.[a-z]{2,4}$/;
  const balanceValidate = /^([0-9][0-9]{3,6}|100000)$/;

  if (!companyEditForm.elements.companyName.value.match(nameValidate)) {
    errorPopupText.textContent = 'Please, enter name correctly';
    showSection(errorPopup);
    valid = false;
  }

  if (!companyEditForm.elements.companyLocation.value.match(locationValidate)) {
    errorPopupText.textContent = 'Please, enter location correctly';
    showSection(errorPopup);
    valid = false;
  }

  if (!companyEditForm.elements.companyEmail.value.match(emailValidate)) {
    errorPopupText.textContent = 'Please, enter email correctly(in format someEmail@gmail.com)';
    showSection(errorPopup);
    valid = false;
  }

  if (!companyEditForm.elements.companyBalance.value.match(balanceValidate)) {
    errorPopupText.textContent = 'Please, enter balance correctly(from 1000 to 100 000)';
    showSection(errorPopup);
    valid = false;
  }
  return valid;
}

function validateCarForm() {
	let valid = true;
  const errorPopup = document.querySelector('.error-popup');
  const errorPopupText = errorPopup.querySelector('.error-popup__text');
  closeErrorPopup(errorPopup);

  const modelValidate = /^[^0-9]\w[^#&<>\"~;$^%{}?]{1,15}$/;
  const yearValidate = /^(19|20)\d{2}$/;
  const colorValidate = /^[A-Z]|[a-z]{3,15}/;
  const priceValidate = /^([0-9][0-9]{3,6}|10000)$/;

  if (!carEditForm.elements.carModel.value.match(modelValidate)) {
    errorPopupText.textContent = 'Please, enter model correctly';
    showSection(errorPopup);
    valid = false;
  }

  if (!carEditForm.elements.carYear.value.match(yearValidate)) {
    errorPopupText.textContent = 'Please, enter yeat correctly(from 1900 to 2099)';
    showSection(errorPopup);
    valid = false;
  }

  if (!carEditForm.elements.carColor.value.match(colorValidate)) {
    errorPopupText.textContent = 'Please, enter color correctly';
    showSection(errorPopup);
    valid = false;
  }

  if (!carEditForm.elements.carPrice.value.match(priceValidate)) {
    errorPopupText.textContent = 'Please, enter price correctly(from 1000 to 100 000)';
    showSection(errorPopup);
    valid = false;
  }
  return valid;
}
