// export class State {
//   currentState: {};
//   previousState: {};
//   dateModified: Number;
// }
//
// export const state = {
//   currentState: {},
//   previousState: {}
// };
//
// export const updateState = function (state: State, newValue: any): State {
//   let previousState = state.previousState;
//   let currentState = state.currentState;
//   const futureState = new State();
//   let currentStateProperties = Object.keys(currentState);
//
//   previousState = {};
//   currentStateProperties.forEach(property => {
//     previousState[property] = currentState[property];
//   });
//   futureState.previousState = previousState;
//   currentState = {};
//   currentStateProperties = Object.keys(newValue);
//   currentStateProperties.forEach(property => {
//     currentState[property] = newValue[property];
//   });
//   futureState.currentState = currentState;
//   futureState.dateModified = Date.now();
//   return futureState;
// };
