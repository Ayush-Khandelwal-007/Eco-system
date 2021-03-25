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
      let newuser={
        ...state.user,
        fees:{
          latefee:state.user.fees.latefee,
          semfee:state.user.fees.semfee,
          paid:state.user.fees.semfee+state.user.fees.latefee,
          due:0,

        }
      }
      // console.log(newuser)
      return {
        ...state,
        user:newuser,
      }
        

    default:
      return state;
  }
};

export default reducer;
