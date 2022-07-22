import { ACTIONS } from "./Actions";

const Reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
