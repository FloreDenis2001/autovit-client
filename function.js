function createCardCar(car) {
  let carContainer = document.createElement("div");
  carContainer.classList.add("car");
  carContainer.classList.add(`id-${car.id}`);
  // carContainer.style.backgroundImage=`url(car.img)`;

  let card = document.createElement("div");
  card.classList.add("card");

  let cardTitle = document.createElement("p");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = car.marca + " " + car.model;

  let cardDetails = document.createElement("div");
  cardDetails.classList.add("card-details");
  let cardYear = document.createElement("p");
  cardYear.classList.add("card-year");
  cardYear.classList.add("details");
  cardYear.textContent = car.an;

  let cardColor = document.createElement("p");
  cardColor.classList.add("card-color");
  cardColor.classList.add("details");
  cardColor.textContent = car.culoare;

  let btnRemove = document.createElement("button");
  btnRemove.classList.add("btn-rmv");
  btnRemove.textContent = "Remove";
  btnRemove.addEventListener("click", async (e) => {
    try {
      let data = await removeCar(car);
      location.reload();
    } catch (e) {
      alert(e.message);
    }
  });
  let btnupdate = document.createElement("update");
  btnupdate.classList.add("btn-upd");
  btnupdate.textContent = "Edit";
  btnupdate.addEventListener("click", async (e) => {
    try {
      let containerModal = document.querySelector(".modal-update");
      containerModal.style.display = "flex";
      createModalUpdate(car);
      let select = document.querySelectorAll(".edit-box");
      containerModal.addEventListener("click", async (e) => {
        let obj = e.target;
        if (obj.classList.contains("save-btn")) {
          let masina = {
            an: select[2].value,
            culoare: select[3].value,
            marca: select[0].value,
            model: select[1].value,
          };
          let data = await updateCar(masina);


          location.reload();
          containerModal.style.display = "none";
        } else if (obj.classList.contains("cancel-btn")) {
          containerModal.style.display = "none";
        }
      });

    } catch (e) {
      alert(e.message);
    }
  
  });

  
  cardDetails.appendChild(cardYear);
  cardDetails.appendChild(cardColor);
  cardDetails.appendChild(btnRemove);
  cardDetails.appendChild(btnupdate);

  card.appendChild(cardTitle);
  card.appendChild(cardDetails);

  carContainer.appendChild(card);

  return carContainer;
}

async function showAllCars() {
  let allCars = document.querySelector(".all-cars");

  try {
    let data = await getAllCars();

    for (let i = 0; i < 6; i++) {
      allCars.appendChild(createCardCar(data[i]));
    }
  } catch (e) {
    alert(e.message);
  }
}

function createHome() {
  let container = document.querySelector(".container");
  let filterContainer = document.querySelector(".filters");
  let filters = `

  <div class="marca-select filter">
    <label for="marca">Marca</label>
    <select class="select-box" name="" id="marca">
      <option value="" disabled selected>Selecteaza</option>
      <option value="">Audi</option>
      <option value="">Ford</option>
      <option value="">Mercedes</option>
    </select>
  </div>

  <div class="model-select filter">
    <label for="Model">Model</label>
    <select class="select-box" name="" id="model">
      <option value="" disabled selected>Selecteaza</option>
      <option value="">S</option>
      <option value="">C</option>
      <option value="">E</option>
    </select>
  </div>

  <div class="an-select filter">
    <label for="an">Anul </label>
    <select class="select-box" name="" id="an">
      <option value="" disabled selected>Selecteaza</option>
      <option value="">2005</option>
      <option value="">2006</option>
      <option value="">2010</option>
    </select>
  </div>

  <div class="color-select filter">
    <label for="culoare">Culoare </label>
    <select class="select-box " name="" id="culoare">
      <option value="" disabled selected>Selecteaza</option>
      <option value="">Negru</option>
      <option value="">Alb</option>
      <option value="">Gri</option>
    </select>
  </div>


`;

  filterContainer.innerHTML = filters;
  let allCarsContainer = document.createElement("section");
  allCarsContainer.classList.add("all-cars");
  container.appendChild(allCarsContainer);
  showAllCars();
}

function createSell() {
  let mainContainer = document.querySelector(".container");
  mainContainer.innerHTML = " ";
  let sellCar = document.createElement("section");
  sellCar.classList.add("add-container");

  let results = `<h2>Adauga un anunt <span>nou</span></h2>
  <div class="add-select">
    
    <div class="marca-select select">
      <label for="marca">Marca</label>
      <select class="select-box" name="" id="marca">
        <option value="" disabled selected>Selecteaza</option>
        <option value="Audi">Audi</option>
        <option value="Ford">Ford</option>
        <option value="Mercedes">Mercedes</option>
      </select>
    </div>

    <div class="model-select select">
      <label for="Model">Model</label>
      <select class="select-box"  name="" id="model">
        <option value="" disabled selected>Selecteaza</option>
        <option value="S">S</option>
        <option value="C">C</option>
        <option value="E">E</option>
      </select>
    </div>

    <div class="an-select select">
      <label for="an">Anul </label>
      <select class="select-box"  name="" id="an">
        <option value="" disabled selected>Selecteaza</option>
        <option value="2005">2005</option>
        <option value="2006">2006</option>
        <option value="2010">2010</option>
      </select>
    </div>

    <div class="color-select select">
      <label for="culoare">Culoare </label>
      <select class="select-box"  name="" id="culoare">
        <option value="" disabled selected>Selecteaza</option>
        <option value="Negru">Negru</option>
        <option value="Alb">Alb</option>
        <option value="Gri">Gri</option>
      </select>
    </div>
  </div>
  <button type="submit" class="add-btn">ADAUGA ANUNT</button>`;
  sellCar.innerHTML = results;
  mainContainer.appendChild(sellCar);

  let select = document.querySelectorAll(".select-box");
  let selectContainer = document.querySelector(".container");
  selectContainer.addEventListener("click", (e) => {
    let obj = e.target;
    if (obj.classList.contains("add-btn")) {
      let masina = {
        an: select[2].value,
        culoare: select[3].value,
        marca: select[0].value,
        model: select[1].value,
      };

      addCar(masina);
    }
  });
}

function createModalUpdate(car) {
  let containerModal = document.querySelector(".modal-update");
  let filter = `

  <div class="marca-select filter">
    <label for="marca">Marca</label>
    <select class="select-box edit-box" name="" id="marca">
      <option value="" disabled selected>${car.marca}</option>
      <option value="Audi">Audi</option>
      <option value="Ford">Ford</option>
      <option value="Mercedes">Mercedes</option>
    </select>
  </div>

  <div class="model-select filter">
  <label for="Model">Model</label>
  <select class="select-box edit-box"  name="" id="model" disabled>
    <option value="${car.model}" disabled selected>${car.model}</option>
  </select>
</div>

  <div class="an-select filter">
    <label for="an">Anul </label>
    <select class="select-box edit-box" name="" id="an">
      <option value="" disabled selected>${car.an}</option>
      <option value="2005">2005</option>
      <option value="2006">2006</option>
      <option value="2010">2010</option>
    </select>
  </div>

  <div class="color-select filter">
    <label for="culoare">Culoare </label>
    <select class="select-box edit-box" name="" id="culoare">
      <option value="" disabled selected>${car.culoare}</option>
      <option value="Negru">Negru</option>
      <option value="Alb">Alb</option>
      <option value="Gri">Gri</option>
    </select>
  </div>

  <div class="btn-edit filter">
  <button class="save-btn">Save</button>
  <button class="cancel-btn">Cancel</button>
  </div>
`;
  containerModal.innerHTML = filter;
  return containerModal;
}
