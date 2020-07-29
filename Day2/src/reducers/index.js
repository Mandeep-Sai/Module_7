export default function (state = {}, action) {
  switch (action.type) {
    case "LOADING_COMPLETE":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
