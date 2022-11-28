import { useReducer } from "react";
import { ADD_CAR_ACTION, DELETE_CAR_ACTION, EDIT_CAR_ACTION } from "../actions/data-actions";

let lastCarId = 0;

const initialState = {
  cars: {},
  fuels: {
    1: { name: 'gasoline', cars: [] },
    2: { name: 'diesel', cars: [] },
    3: { name: 'gas', cars: [] },
    4: { name: 'electricity', cars: [] },
  },
  brands: {
    1: {
      name: 'Skoda', models: {
        1: { name: 'Octavia', cars: [] },
        2: { name: 'Fabia', cars: [] },
        3: { name: 'Superb', cars: [] }
      }
    },
    2: {
      name: 'Volkswagen', models: {
        4: { name: 'Golf', cars: [] },
        5: { name: 'Jetta', cars: [] },
        6: { name: 'Passat', cars: [] }
      }
    },
    3: {
      name: 'Audi', models: {
        4: { name: 'Sportback', cars: [] },
        5: { name: 'Audi R8 Le Mans', cars: [] },
        6: { name: 'Shooting Brake', cars: [] }
      }
    }
  }
};

const addCar = (state, payload) => {
  const { cars, fuels, brands } = state;
  const { car } = payload;

  car.fuelIds.forEach(fId => {
    fuels[fId].cars.push(car);
  });

  brands[car.brandId].models[car.modelId].cars.push(car);

  cars[++lastCarId] = car;
  return { ...state };
};

const editCar = (state, payload) => {
  const { cars, fuels, brands } = state;
  const { id } = payload;
  const newCar = payload.car;
  const car = cars[id];

  car.fuelIds.forEach(fId => {
    fuels[fId].cars = fuels[fId].cars.filter(c => c !== car);
  });

  newCar.fuelIds.forEach(fId => {
    fuels[fId].cars.push(newCar);
  });

  brands[car.brandId].models[car.modelId].cars = brands[car.brandId].models[car.modelId].cars.filter(c => c !== car);

  brands[newCar.brandId].models[newCar.modelId].cars.push(newCar);

  cars[id] = newCar;
  return { ...state };
};

const deleteCar = (state, payload) => {
  const { cars, fuels, brands } = state;
  const { id } = payload;
  const car = cars[id];

  car.fuelIds.forEach(fId => {
    fuels[fId].cars = fuels[fId].cars.filter(c => c !== car);
  });

  brands[car.brandId].models[car.modelId].cars = brands[car.brandId].models[car.modelId].cars.filter(c => c !== car);

  delete cars[id];
  return { ...state };
}

const dataStorageReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CAR_ACTION:
      return addCar(state, payload);
    case EDIT_CAR_ACTION:
      return editCar(state, payload);
    case DELETE_CAR_ACTION:
      return deleteCar(state, payload);
    default:
      return state;
  }
};

const useDataStorage = () => useReducer(dataStorageReducer, initialState);

export default useDataStorage;
