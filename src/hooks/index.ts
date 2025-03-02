import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppDispatch, State } from '../types/state';
import { ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

// Хук для получения dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Типизированный хук для получения состояния
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

// Типизация для экшенов
type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [Key in keyof Actions]: Actions[Key] extends AsyncThunk<infer ReturnType, infer ThunkArg, object>
  ? BoundAsyncThunk<ReturnType, ThunkArg>
  : Actions[Key];
};

// Типизация для асинхронных экшенов
type BoundAsyncThunk<ReturnType, ThunkArg> = (
  arg?: ThunkArg
) => Promise<ReturnType>;

// Хук для привязки экшенов
export function useActionCreators<Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> {
  const dispatch = useAppDispatch();
  // Используем as для обхода ограничений типизации bindActionCreators
  return useMemo(() => bindActionCreators(actions, dispatch) as BoundActions<Actions>, [actions, dispatch]);
}
