export default function (state = {}, action) {
  switch (action.type) {
    case "LOADING_COMPLETE":
      return {
        ...state,
        loading: false,
      };
    case "UNMOUNTED":
      return {
        ...state,
        loading: true,
      };
    case "LOAD_STUDENT":
      return {
        ...state,
        student: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
