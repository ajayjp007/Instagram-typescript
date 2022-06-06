import { produce } from 'immer';

interface InitialState {
  posts: Array<object>;
}

const initialState: InitialState = {
  posts: [],
};

interface Actions {
  type: string;
  payload: Array<object>;
}
export default (state = initialState, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case 'POST-LOADED':
      return produce(state, (draftState) => {
        draftState.posts = payload;
      });
    default:
      return state;
  }
};
