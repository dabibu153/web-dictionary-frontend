const initialState = {
  briefData: [],
  detailedData: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_BRIEF_DATA":
      return { ...state, briefData: action.data };
    case "SET_DETAILED_DATA":
      return { ...state, detailedData: action.data };
    default:
      return state;
  }
}

export default rootReducer;
