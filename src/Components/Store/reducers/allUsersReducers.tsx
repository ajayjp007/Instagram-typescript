const initialState = {
  users: [],
};

interface Actions {
  type: string;
  payload: Array<object>;
}

export default (state = initialState, action: Actions) => {
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case "USERS-LOADED": {
      console.log(payload);
      return {
        ...state,
        users: payload,
      };
    }
  }
  return state;
};
