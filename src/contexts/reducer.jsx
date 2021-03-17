export const initialState = {
    userType:null,
    user: null
};

const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
        case "SET_USER":
            return {
                userType:action.usertype,
                user: action.user
            }
        case "UNSET_USER":
            return {
                initialState
            }

        default:
            return state;
    }
};

export default reducer;