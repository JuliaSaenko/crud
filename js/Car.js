function Car(id, model, year, color, price) {
  this.id = id;
  this.model = model;
  this.year = year;
  this.color = color;
  this.price = price;

  this.renderInfoInTableCell = function(newElement) {
      newElement.innerHTML = '';

      newElement.setAttribute('data-index', this.id - 1);

      let carModel = renderElement('td', null, this.model);

      let carPrice = renderElement('td', null, this.price);

      newElement.appendChild(carModel);
      newElement.appendChild(carPrice);
 }


 this.showFullInfo = function(newElement) {
   let carModel = renderElement('p', null, 'Car model: ' + this.model);
   let carYear = renderElement('p', null, 'Car year: ' + this.year);
   let carColor = renderElement('p', null, 'Car color: ' + this.color);
   let carPrice = renderElement('p', null, 'Car price: ' + this.price);

   newElement.appendChild(carModel);
   newElement.appendChild(carYear);
   newElement.appendChild(carColor);
   newElement.appendChild(carPrice);
 }

 this.changeInfo = function() {
   let form = document.forms.car;
   form.elements.carModel.value = this.model;
   form.elements.carYear.value = this.year;
   form.elements.carColor.value = this.color;
   form.elements.carPrice.value = this.price;
 }
}
