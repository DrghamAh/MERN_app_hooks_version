const CategoriesReducer = (currentState, action) => {
  switch (action.type) {
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
    case "FETCH_LOADING" :
      return {
        data : [],
        loading : true,
        error : '',
      }
    default : return currentState;
  }
}

export default CategoriesReducer