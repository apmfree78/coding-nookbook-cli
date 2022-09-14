import { Dispatch } from 'redux';
import { saveCells } from '../action-creators';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { RootState } from '../reducers';

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any; // timer for debouncing

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        // saving cells to file with debouncing
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          console.log('save cells to file');
          saveCells()(dispatch, getState);
        }, 500);
      }
    };
  };
};
