import { createStore } from 'redux';

const initialState = {
  attendanceData: {}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ATTENDANCE_DATA':
      return {
        ...state,
        attendanceData: action.payload
      };
    default:
      return state;
  }
}

const store = createStore(reducer);
