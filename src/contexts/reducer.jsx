export const initialState = {
  userType: null,
  user: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {...action.user},
        userType:action.userType
      };
    case "UNSET_USER":
      return {
        userType: null,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
