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

    case "PAY_FEE":
      return {
        ...state,
        user:{
          ...state.user,
          fee:{
            ...state.user.fee,
            paid:state.user.fee.latefee+state.user.fee.semfee,
            due:0,
          }
        }
      }

    default:
      return state;
  }
};

export default reducer;
