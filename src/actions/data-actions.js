const DATA_ACTIONS_GROUP = 'DATA_ACTIONS';

export const ADD_CAR_ACTION = `${DATA_ACTIONS_GROUP}/ADD_CAR`;
export const EDIT_CAR_ACTION = `${DATA_ACTIONS_GROUP}/EDIT_CAR`;
export const DELETE_CAR_ACTION = `${DATA_ACTIONS_GROUP}/DELETE_CAR`;

export const dataActions = {
  addCar: car => ({
    type: ADD_CAR_ACTION,
    payload: { car }
  }),
  editCar: (id, car) => ({
    type: EDIT_CAR_ACTION,
    payload: { id, car }
  }),
  deleteCar: (id) => ({
    type: DELETE_CAR_ACTION,
    payload: { id }
  })
};
