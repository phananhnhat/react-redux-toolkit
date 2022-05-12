import {
  configureStore,
  createImmutableStateInvariantMiddleware,
  createSerializableStateInvariantMiddleware,
} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import testReducer from '../reducer/testReducer';
import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import thunk from '../middleware/redux-thunk';
import customMiddleware from '../middleware/customMiddleware';
import middlewareByCreateListenerMiddleware from '../middleware/middlewareByCreateListenerMiddleware'

const middleWares = [thunk, customMiddleware];

// Các đoạn code được comment để so sánh với redux bình thường

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    test: testReducer,
  },
  // Nếu muốn giữ nguyên DefaultMiddleware của redux-toolkit(ví dụ: redux-thunk)
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([middleWares]),
  // Có thể lược bỏ các middle-ware bằng ignoredPaths
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     immutableCheck: {
  //       ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
  //     },
  //   }),
  // Nếu muốn ghi đè tất cả middle-wares
  // middleWares: middleWares,
  devTools: true, // Defaults to true.
  // preloadedState:  {
  //   counter: {
  //     value: 10,
  //     status: 'xxx',
  //   },
  // }
  // // Custom by createListenerMiddleware
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().prepend(middlewareByCreateListenerMiddleware);
  // },
});

// Redux bình thường
// const middleWares = [];
//
// function createReducer() {
//   return combineReducers({
//     counter: counterReducer,
//   });
// }
//
// const store = createStore(
//   createReducer(),
//   applyMiddleware(...middleWares),
// );


// TODO Các api cảu redũ toolkit
// Redux Toolkit includes:
//
//   configureStore(): wraps createStore to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes redux-thunk by default, and enables use of the Redux DevTools Extension.
//   createReducer(): that lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the immer library to let you write simpler immutable updates with normal mutative code, like state.todos[3].completed = true.
//   createAction(): generates an action creator function for the given action type string. The function itself has toString() defined, so that it can be used in place of the type constant.
//   createSlice(): accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
//   createAsyncThunk: accepts an action type string and a function that returns a promise, and generates a thunk that dispatches pending/fulfilled/rejected action types based on that promise
//   createEntityAdapter: generates a set of reusable reducers and selectors to manage normalized data in the store
//   The createSelector utility from the Reselect library, re-exported for ease of use.

// TODO: createImmutableStateInvariantMiddleware
// TODO: Creates an instance of the immutability check middleware, with the given options.
//  Creates an instance of the immutability check middleware, with the given options.
//  Dịch: Tạo một phiên bản của middle-wares kiểm tra tính bất biến, với các tùy chọn nhất định.
//  Rất có thể bạn sẽ không cần phải tự gọi điều này, vì getDefaultMiddleware đã làm như vậy.
//  Gốc: redux-immutable-state-invariant
//  Lấy các middle-ware có sẵn trong redux toolkit với các option.
//  Ví dụ:

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
  ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
});
const store1 = configureStore({
  reducer: {
    counter: counterReducer,
    test: testReducer,
  },
  // Note that this will replace all default middleware
  middleware: [immutableInvariantMiddleware],
});

// TODO: createSerializableStateInvariantMiddleware
//  Tương tự createImmutableStateInvariantMiddleware
//  Gốc: redux-immutable-state-invariant
