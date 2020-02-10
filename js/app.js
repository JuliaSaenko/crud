'use strict';

window.addEventListener('load', function () {
  getCarsListFromLocalStorage();
  getPeopleListFromLocalStorage();
  getCompaniesListFromLocalStorage();

  carsBtn.addEventListener('click', function() {
    addNewElementBtn.setAttribute('data-btn-add', 'add-new-car');
    addNewElementBtn.textContent = 'Add new car';
    createElements(startCarsArray, carsTableHeadings, 'carsArray', carEditForm, changeCarInfo);
  });

  peopleBtn.addEventListener('click', function() {
    hideSection(companyEditForm);
    hideSection(carEditForm);
    addNewElementBtn.setAttribute('data-btn-add', 'add-new-person');
    addNewElementBtn.textContent = 'Add new person';
    if(!carsForPerson.hasChildNodes()) {
      renderCarsList(carsForPerson);
    }
    console.log(startPeopleArray);

    carsForPerson.addEventListener('click', function(evt) {
      if(evt.target.getAttribute('data-car')) {
        personEditForm.elements.personCar.value = evt.target.textContent;
        personEditForm.elements.personCar.setAttribute('data-id', evt.target.getAttribute('data-car'));
      }
    });
    createElements(startPeopleArray, peopleTableHeadings, 'peopleArray', personEditForm, changePersonInfo);
    console.log(startPeopleArray);
  });

  companiesBtn.addEventListener('click', function() {
    hideSection(personEditForm);
    hideSection(carEditForm);
    addNewElementBtn.setAttribute('data-btn-add', 'add-new-company');
    addNewElementBtn.textContent = 'Add new company';
    if(!carsForCompany.hasChildNodes()) {
      renderCarsList(carsForCompany);
    }

    carsForCompany.addEventListener('click', function(evt) {
      hideSection(personEditForm);
      hideSection(carEditForm);
      addNewElementBtn.setAttribute('data-btn-add', 'add-new-car');
      addNewElementBtn.textContent = 'Add new car';
      if(evt.target.getAttribute('data-car')) {
        companyEditForm.elements.companyCar.value = evt.target.textContent;
        companyEditForm.elements.companyCar.setAttribute('data-id', evt.target.getAttribute('data-car'));
      }
    });
    createElements(startCompaniesArray, companiesTableHeadings, 'companiesArray', companyEditForm, changeCompanyInfo);
  });

});

document.addEventListener('click', function(evt) {
  if(evt.target.getAttribute('data-btn-add') === 'add-new-car') {
    addNewElement(carEditForm, editFormAddCarBtn);
  }
  if(evt.target.getAttribute('data-btn-add') === 'add-new-person') {
    addNewElement(personEditForm, editFormAddPersonBtn);
  }

  if(evt.target.getAttribute('data-btn-add') === 'add-new-company') {
    addNewElement(companyEditForm, editFormAddCompanyBtn);
  }
});
