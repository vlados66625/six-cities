import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppDispatch, State } from '../types/state';
import { ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [Key in keyof Actions]: Actions[Key] extends AsyncThunk<infer ReturnType, infer ThunkArg, object>
  ? BoundAsyncThunk<ReturnType, ThunkArg>
  : Actions[Key];
};

type BoundAsyncThunk<ReturnType, ThunkArg> = (
  arg?: ThunkArg
) => Promise<ReturnType>;

export function useActionCreators<Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch) as BoundActions<Actions>, [actions, dispatch]);
}
