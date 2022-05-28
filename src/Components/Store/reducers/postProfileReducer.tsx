const initialState = {
  posts: [], //after successful login we set the token in localStorage
};

interface Actions {
  type: string;
  payload: Array<object>;
}

export default (state = initialState, action: Actions) => {
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case "POST-LOADED": {
      console.log(payload);
      return {
        ...state,
        posts: payload,
      };
    }
  }
  return state;
};