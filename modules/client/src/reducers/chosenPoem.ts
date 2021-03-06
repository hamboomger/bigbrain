import { AnyAction as Action } from 'redux';
import {
  CLEAR_CHOSEN_POEM,
  CLOSE_POEM_PREVIEW, POEM_DELETED, POEM_DELETING, POEM_DELETION_FAILED,
  POEM_LOADED,
  POEM_LOADING,
  POEM_LOADING_FAILED, SET_HIDE_POEM_TEXT,
  SHOW_POEM_PREVIEW,
} from '../actions/chosenPoem';
import ChosenPoemState from '../models/state/ChosenPoemState';
import {
  PoemLoadedAction,
  SetHidePoemTextAction,
  ShowPoemPreviewAction,
} from '../actions/interfaces/ChosenPoemActionCreator';

const initialState: ChosenPoemState = {
  isFetching: false,
  hidePoemText: false,
};

function chosenPoemReducer(state: ChosenPoemState = initialState, action: Action): ChosenPoemState {
  switch (action.type) {
    case POEM_DELETING:
      return {
        ...state,
        isFetching: true,
      };
    case POEM_LOADING:
      return {
        ...state,
        isFetching: true,
      };
    case CLEAR_CHOSEN_POEM:
      return {
        ...state,
        poem: undefined,
      };
    case POEM_LOADED:
      return {
        ...state,
        isFetching: false,
        poem: (action as PoemLoadedAction).payload,
      };
    case POEM_DELETED:
      return {
        ...state,
        isFetching: false,
        poem: undefined,
      };
    case POEM_DELETION_FAILED:
    case POEM_LOADING_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case SHOW_POEM_PREVIEW:
      return {
        ...state,
        poem: (action as ShowPoemPreviewAction).payload,
        viewType: 'modal',
      };
    case CLOSE_POEM_PREVIEW:
      return {
        ...state,
        poem: undefined,
        viewType: undefined,
      };
    case SET_HIDE_POEM_TEXT: {
      const wasHiddenBefore = state.hidePoemText;
      const shouldBeHiddenNow = (action as SetHidePoemTextAction).payload;
      if (wasHiddenBefore === shouldBeHiddenNow) return state;

      return {
        ...state,
        hidePoemText: shouldBeHiddenNow,
      };
    }
    default:
      return state;
  }
}

export default chosenPoemReducer;
