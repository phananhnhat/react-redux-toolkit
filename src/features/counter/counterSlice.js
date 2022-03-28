import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  value: 0,
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// TODO: (Dịch) Hàm bên dưới được gọi là hàm thunk và cho phép chúng ta thực hiện logic không đồng bộ.
//  Nó có thể được gửi đi giống như một hành động thông thường: `dispatch(incrementAsync(10))`.
//  Thao tác này sẽ gọi hàm thunk với hàm `dispatch` làm đối số đầu tiên.
//  Sau đó, mã không đồng bộ có thể được thực thi và các hành động khác có thể được thực hiện.
//  Thunks thường được sử dụng để thực hiện các yêu cầu không đồng bộ.

// TODO: fetCount 1 promise return { data: amount } sau 0.5s

// TODO: createAsyncThunk hỗ trợ các xử lý pending/fulfilled của async/await với extraReducers, và payload sẽ là data được trả về trong function tham số thứ 2 payloadCreator
//  incrementAsync.pending => type là 'counter/fetchCount/pending'
//  incrementAsync.fulfilled => type là 'counter/fetchCount/fulfilled'

// TODO: Sử dụng createAsyncThunk khi cần tính toán payload từ 1 promise sau đó sẽ gọi action. Ưu điểm so với tạc thunk thông thường:
//  - Xử lý được các trạng thái của payloadCreator
//  - Bắn action theo trạng thái của payloadCreator khi pending hoặc resolve, payload sẽ là kết quả của payloadCreator nếu là resolve(type = ...fulfilled)

// TODO: Các function được sinh ra
//  incrementAsync => Không dispatch 1 action nào, chỉ gọi payloadCreator()), nó là 1 thunk (tức là trả về 1 function)
//  incrementAsync.pending => { type: 'counter/fetchCount/pending' }
//  incrementAsync.fulfilled => { type: 'counter/fetchCount/fulfilled', payload: 'kết quả của hàm await payloadCreator' }
//  incrementAsync.rejected => { type: 'counter/fetchCount/fulfilled' }
//  Lưu ý: incrementAsync.pending, incrementAsync.fulfilled, incrementAsync.rejected trả về ko phải là 1 thunk (tức là 1 function), mà đơn giản chỉ là {type: '...', payload: '...'}
//  Như thế thì mới có thể dùng để định nghĩa trong extraReducers
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// TODO: So sánh với việc tạo thunk thông thường thì sẽ ko có xử lý pending/fulfilled và phải tự dispatch
//  Nếu tự viết sẽ phải viết theo ví dụ dưới đây
export const incrementAsync1 = (amount) => {
  return async (dispatch) => {
    dispatch({
      type: 'counter/fetchCount/pending',
    })
    try {
      const response = await fetchCount(amount);
      // The value we return becomes the `fulfilled` action payload
      dispatch({
        type: 'counter/fetchCount/fulfilled',
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: 'counter/fetchCount/rejected',
      });
    }
  };
}

// TODO: redux-toolkit đã tích hợp sẵn redux-thunk
//  createSlice tạo 1 reducer dạng slide với
//  các action type sẽ là counter/increment counter/decrement counter/incrementByAmount
//  Nhưng nó sẽ là các function trả về các plain object dạng sau (nó không phải là trả về 1 thunk(function) ):
function fnAction(payload) {
  return{
    type: 'counter/increment',
    payload: payload,
  };
}

// TODO: Các action sinh ra bởi createSlice, đây là các hàm trả về plain object, chứ ko phải trả về 1 funtion (thunk)
//  - Theo reducers định nghĩa, cái này thì đã rõ ràng
//   + increment
//   + decrement
//   + incrementByAmount
//  => Cách sử dụng: export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// TODO: Các reducer sinh ra bởi createSlice
//  - Theo reducers, cái này thì đã rõ ràng, 1 function trả về giá trị {type: ..., payload: ...}
//   + increment
//   + decrement
//   + incrementByAmount
//  - Theo extraReducers
//   + counter/fetchCount/pending
//   + counter/fetchCount/fulfilled
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      // TODO: (Dịch) Redux Toolkit cho phép chúng ta viết logic "mutating" trong các reducers.
      //  Nó không thực sự thay đổi trạng thái bởi vì nó sử dụng thư viện Immer,
      //  thư viện này phát hiện các thay đổi đối với "trạng thái nháp" và tạo ra một trạng thái bất biến hoàn toàn mới dựa trên những thay đổi đó
      //  Kiểu tương tự như dùng 'immutable'
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // TODO: Trường `extraReducers` cho phép lát cắt xử lý các hành động được xác định ở nơi khác,
  //  bao gồm các hành động được tạo bởi createAsyncThunk hoặc trong các lát cắt khác.
  //  incrementAsync.pending => type là 'counter/fetchCount/pending'
  //  incrementAsync.fulfilled => type là 'counter/fetchCount/fulfilled'
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// TODO: Selector
export const selectCount = (state) => state.counter.value;
export const selectCountStatus = (state) => state.counter.status;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// TODO: Thunk với side-effice
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;
