function Company(id, name, location, email, balance, car, carId) {
  this.id = id;
  this.name = name;
  this.location = location;
  this.email = email;
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
      let companyName = renderElement('td', null, this.name);
      let companyLocation = renderElement('td', null, this.location);

      newElement.appendChild(companyName);
      newElement.appendChild(companyLocation);
 }

 this.showFullInfo = function(newElement) {
   let companyName = renderElement('p', null, 'Company name: ' + this.name);
   let companyLocation = renderElement('p', null, 'Conpany location: ' + this.location);
   let companyEmail = renderElement('p', null, 'Company email: ' + this.email);
   let companyBalance = renderElement('p', null, 'Company balance: ' + this.balance);
   let companyCar = renderElement('p', null, 'Company car: ' + this.car);

   newElement.appendChild(companyName);
   newElement.appendChild(companyLocation);
   newElement.appendChild(companyEmail);
   newElement.appendChild(companyBalance);
   newElement.appendChild(companyCar);
 }

 this.changeInfo = function(form) {
  form.elements.companyName.value = this.name;
  form.elements.companyLocation.value = this.location;
  form.elements.companyEmail.value = this.email;
  form.elements.companyBalance.value = this.balance;
 }

}
