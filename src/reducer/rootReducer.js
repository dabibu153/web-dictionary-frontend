const initialState = {
  briefData: [],
  detailedData: {},
  wait1: "firstload",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_BRIEF_DATA":
      return { ...state, briefData: action.data };
    case "SET_DETAILED_DATA":
      return { ...state, detailedData: action.data };
    case "SET_WAIT1":
      return { ...state, wait1: action.data };
    default:
      return state;
  }
}

export default rootReducer;
