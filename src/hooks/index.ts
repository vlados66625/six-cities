import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppDispatch, State } from '../types/state';
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export function useActionCreators<Actions extends ActionCreatorsMapObject>(actions: Actions) {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
}
