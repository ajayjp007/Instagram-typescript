import { produce } from 'immer';

interface InitialState {
  users: Array<object>;
}

const initialState: InitialState = {
  users: [],
};

interface Actions {
  type: string;
  payload: Array<object>;
}

export default (state = initialState, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case 'USERS-LOADED':
      return produce(state, (draftState) => {
        draftState.users = payload;
      });

    default:
      return state;
  }
  // return state;
};
