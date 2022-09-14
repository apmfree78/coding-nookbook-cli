import { Dispatch } from 'react';
import { Action } from '../actions';

export const persistMiddleware = ({
  dispatch,
}: {
  dispatch: Dispatch<Action>;
}) => {
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);
    };
  };
};
