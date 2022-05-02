import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

enum FetchState {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
}

type dataType = {
  id: number;
};

const apiGetOne = <T>(id: number) =>
  new Promise<dataType>(rs => {
    const data = { id };
    setTimeout(() => {
      rs(data);
    }, 1000);
  });

const actionNames = {
  FETCH_FOO: 'foo/fetchFoo',
  RESET_STATE: 'foo/resetState',
};

const resetState = createAction(actionNames.RESET_STATE);

type returnType = { id: dataType };
const fetchFoo = createAsyncThunk<returnType, { id: number }, any>(
  actionNames.FETCH_FOO,
  async ({ id }: { id: number }) => {
    try {
      const apiPayload = await apiGetOne<dataType>(id);
      const _id = apiPayload?.id;
      const out = { [_id]: apiPayload } as returnType;
      return out;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const initialState = {
  fooState: FetchState.INITIAL,
};

const fooSlice = createSlice({
  //name: 'foo',
  name: 'foo',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchFoo.pending, state => {
      state.fooState = FetchState.LOADING;
    });
    builder.addCase(fetchFoo.fulfilled, (state, action) => {
      const data = action?.payload;
      const out = {
        ...state,
        ...data,
        fooState: FetchState.SUCCESS,
      };
      return out;
    });
    builder.addCase(fetchFoo.rejected, state => {
      state.fooState = FetchState.FAIL;
    });
  },
});

const dispatchableActions = {
  ...fooSlice.actions,
  fetchFoo,
};

const { reducer } = fooSlice;

export {
  FetchState,
  actionNames,
  dispatchableActions as actions,
  fetchFoo,
  initialState,
  fooSlice,
  reducer,
  resetState,
};
