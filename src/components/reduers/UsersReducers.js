
const UsersReducer = (currentState, action) => {
  switch (action.type) {
    case "FETCH_LOADING" : 
      return {
        data : [],
        loading: true,
        error : '',
      }
    case "FETCH_SUCCESS" : 
      return {
        data : action.payload,
        loading : false,
        error : '',
      }
    case "FETCH_FAILED" : 
      return {
        data : [],
        loading : false,
        error : action.payload,
      }
    default : return currentState;
  }
}

export default UsersReducer;