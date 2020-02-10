function Person(id, name, age, phone, balance, car, carId) {
  this.id = id;
  this.name = name;
  this.age = age;
  this.phone = phone;
  this.balance = balance;
  this.car = car;
  this.carId = carId;

  this.setCar = function(car) {
    let clone = {};
    for (let key in car) {
     clone[key] = car[key];
   }

   this.car = clone['model'];
   this.carId = clone['id'];
  }

  this.renderInfoInTableCell = function(newElement) {
    newElement.innerHTML = '';
    newElement.setAttribute('data-index', this.id - 1);
    let personName = renderElement('td', null, this.name);
    let personAge = renderElement('td', null, this.age);

    newElement.appendChild(personName);
    newElement.appendChild(personAge);
 }

   this.showFullInfo = function(newElement) {
   let personName = renderElement('p', null, 'Person name: ' + this.name);
   let personAge = renderElement('p', null, 'Person age: ' + this.age);
   let personPhone = renderElement('p', null, 'Person phone: ' + this.phone);
   let personBalance = renderElement('p', null, 'Person balance: ' + this.balance);
   let personCar = renderElement('p', null, 'Person car: ' + this.car);

   newElement.appendChild(personName);
   newElement.appendChild(personAge);
   newElement.appendChild(personPhone);
   newElement.appendChild(personBalance);
   newElement.appendChild(personCar);
 }

  this.changeInfo = function(form) {
  form.elements.personName.value = this.name;
  form.elements.personAge.value = this.age;
  form.elements.personPhone.value = this.phone;
  form.elements.personBalance.value = this.balance;
 }
}
