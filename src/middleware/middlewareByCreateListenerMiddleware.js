import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';

import countReducer, {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  selectCountStatus,
} from './counterSlice';

// Create the middleware instance and methods
// Dịch: Tạo phiên bản phần mềm trung gian và các phương thức
const listenerMiddleware = createListenerMiddleware();

const fetchData = () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: 'This is data' }), 500)
  );
};

const matchSomeAction = (a, b, c, d, e) => {
  return false;
}

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
// Thêm một hoặc nhiều mục trình nghe tìm kiếm các hành động cụ thể.
// Chúng có thể chứa bất kỳ logic đồng bộ hoặc không đồng bộ nào, tương tự như thunks.
listenerMiddleware.startListening({
  actionCreator: countReducer,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    // Chạy bất kỳ logic side-effect-y bổ sung nào bạn muốn ở đây
    console.log('Todo added: ', action.payload.text)

    // Can cancel other running instances
    // Có thể hủy các phiên bản đang chạy khác
    listenerApi.cancelActiveListeners()

    // Run async logic
    const data = await fetchData();

    // Pause until action dispatched or state changed
    // Tạm dừng cho đến khi hành động được thực hiện hoặc trạng thái thay đổi
    if (await listenerApi.condition(matchSomeAction)) {
      // Use the listener API methods to dispatch, get state,
      // unsubscribe the listener, start child tasks, and more
      // Sử dụng các phương thức API của trình xử lý để gửi, nhận trạng thái,
      // hủy đăng ký trình nghe, bắt đầu tác vụ con và hơn thế nữa
      listenerApi.dispatch(incrementByAmount(1.5))
      listenerApi.unsubscribe()
    }
  },
})

// const store = configureStore({
//   reducer: {
//     todos: todosReducer,
//   },
//   // Add the listener middleware to the store.
//   // NOTE: Since this can receive actions with functions inside,
//   // it should go before the serializability check middleware
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().prepend(listenerMiddleware.middleware),
// })

export default listenerMiddleware.middleware;

