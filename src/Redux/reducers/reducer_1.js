const i = {
  list: [],
  activeId: null,
};

let hR = (state = i, action) => {
  switch (action.type) {
    case "ADD_HOBBY": {
      const a = [...state.list];
      const b = [...a, action.payload];
      return {
        ...state,
        list: b,
      };
    }
    case "SET_ACTIVE_HOBBY": {
      const a = [action.payload.id];
      return { ...state, activeId: a };
    }
    default:
      return state;
  }
};
export default hR;
