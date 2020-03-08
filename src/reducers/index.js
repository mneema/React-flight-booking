const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_FLIGHTS', 'GET_FILTERS', 'GET_ROUTES':
      return { ...state, loading: true };
    case 'GET_FLIGHTS_SUCCESS':
      return { ...state, flights: action.json, loading: false };
    case 'GET_FILTERS_SUCCESS':
      return { ...state, filters: action.json, loading: false }; 
    case 'GET_ROUTES_SUCCESS':
      return { ...state, routes: action.json, loading: false };       
    default:
      return state;
   }
};
export default reducer;