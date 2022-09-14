import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const iniatialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = iniatialState, action: Action) => {
  switch (action.type) {
    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return state;
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      return state;
    case ActionType.FETCH_CELLS_COMPLETE:
      // determine order of cells first
      state.order = action.payload.map((cell) => cell.id);

      //update error, loading and order properties first
      state.loading = false;
      state.error = null;

      console.log('new state after fetching cells');
      // construct data property of new state
      state.order.forEach((id, index) => {
        state.data[id] = { ...action.payload[index] };
      });
      return state;
    case ActionType.FETCH_CELLS_ERROR:
      state.error = action.payload;
      state.loading = false;
      return state;
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      // const index = state.order.findIndex((cell) => cell === action.payload);
      // state.order.splice(index, 1);
      return state;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };
      // adding new cell to state
      state.data[cell.id] = cell;

      // find before Index
      const finalIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      if (finalIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(finalIndex + 1, 0, cell.id);
      }
      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;

      // finv Index of cell in order array with its id
      const index = state.order.findIndex((id) => id === action.payload.id);
      // determine target index
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      console.log('targetIndex');
      console.log(targetIndex);
      // if targetIndex index is out of bounds, exit
      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;
      // swapping ids with targetIndex
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;
    default:
      return state;
  }
}, iniatialState);

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};
export default reducer;
