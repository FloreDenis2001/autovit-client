function api(path, method = "GET", body = null) {
  const url = "http://localhost:8080/api/v1/" + path;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    mode: "cors",
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options);
}

async function getAllCars() {
  try {
    let data = await api("masini/all");

    if (data.status === 200) {
      return data.json();
    } else {
      data = await data.json();
      throw Error(data.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

async function addCar(car) {
  try {
    let data = await api("masini/add", "POST", car);
    if (data.status === 201) {
      return data.json();
    } else {
      throw Error(data.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

async function removeCar(car) {
  try {
    let data = await api("masini/" + car.model, "DELETE");
    if (data.status === 200) {
      alert("Masina a fost stearsa");
    } else {
      throw Error(data.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

async function updateCar(car) {
  try {
    let data = await api("masini/update", "PUT", car);
    if (data.status === 200) {
      return data.json();
    } else {
      throw Error(data.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
}



