import _ from 'underscore';
import {
  NAV_RESET,
  NAV_PUSH,
  NAV_POP,
  APP_REMOVE_LOGGED_USER,
  APP_WIPE_DATA,
  MARK_REQUEST_PENDING,
  MARK_REQUEST_SUCCESS,
  MARK_REQUEST_FAILED,
  MARK_REQUEST_CANCELLED,
  TOAST_SET,
  TOAST_CLEAR,
  MODAL_OPEN,
  MODAL_CLOSE,
  DRAWER_OPEN,
  DRAWER_CLOSE,
  GALLERY_OPEN,
  GALLERY_CLOSE,
  BROWSER_OPEN,
  BROWSER_CLOSE
} from '~/constants/types';

/**
 * DRAWER
 */
export const drawer = (state = { drawerState: 'closed' }, { type }) => {
  switch (type) {
    case DRAWER_OPEN:
      return {
        ...state,
        drawerState: 'opened'
      };
    case DRAWER_CLOSE:
      return {
        ...state,
        drawerState: 'closed'
      };
    default:
      return state;
  }
};

/**
 * MODAL
 */
export const modal = (state = { modalState: 'closed' }, { type }) => {
  switch (type) {
    case MODAL_OPEN:
      return { ...state, modalState: 'opened' };
    case MODAL_CLOSE:
      return {
        ...state,
        modalState: 'closed'
      };
    default:
      return state;
  }
};

/**
 * TOAST
 */
export const toast = (state = null, { type, payload }) => {
  switch (type) {
    case TOAST_SET:
      return payload;
    case TOAST_CLEAR:
      return null;
    default:
      return state;
  }
};

/**
 * REQUEST
 */
export const requests = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case MARK_REQUEST_PENDING:
      return { ...state, [meta.key]: { status: 'pending', error: null } };
    case MARK_REQUEST_SUCCESS:
      return { ...state, [meta.key]: { status: 'success', error: null } };
    case MARK_REQUEST_FAILED:
      return { ...state, [meta.key]: { status: 'failure', error: payload } };
    case MARK_REQUEST_CANCELLED:
      return { ...state, [meta.key]: { status: 'success', error: null } };
    default:
      return state;
  }
};

/**
 * ROUTER
 */
const initRouteState = {
  current: {
    routeName: 'markets'
  },
  stack: []
};

export const router = (state = initRouteState, { type, payload }) => {
  switch (type) {
    case NAV_PUSH: {
      let isMatchCurrentRoute = false;
      if (state.current.routeName === payload.routeName) {
        if (
          state.current.params &&
          payload.params &&
          _.isEqual(state.current.params, payload.params)
        ) {
          isMatchCurrentRoute = true;
        }
      }
      return isMatchCurrentRoute
        ? state
        : {
            current: payload,
            stack: [
              state.current,
              ...(state.stack.length > 20 ? state.stack.splice(0, -1) : state.stack)
            ]
          };
    }
    case NAV_POP:
      let route = {};
      if (state.stack[0] && state.stack[0].params) {
        route = {
          routeName: state.stack[0].routeName || initRoute,
          params: state.stack[0].params,
          ...payload
        };
      } else {
        route = {
          routeName: (state.stack[0] && state.stack[0].routeName) || initRoute,
          ...payload
        };
      }
      return {
        current: route,
        stack: state.stack.splice(1)
      };
    case NAV_RESET:
      return { current: payload, stack: initRouteState.stack };
    case APP_REMOVE_LOGGED_USER:
      return initRouteState;
    case APP_WIPE_DATA:
      return initRouteState;
    default:
      return state;
  }
};

/**
 * GALLERY
 */
const initGallery = {
  isPlaying: false,
  images: [],
  playingIndex: 0
};

export const gallery = (state = initGallery, { type, payload }) => {
  switch (type) {
    case GALLERY_OPEN:
      return { ...state, ...payload, isPlaying: true };
    case GALLERY_CLOSE:
      return initGallery;
    default:
      return state;
  }
};

/**
 * BROWSER
 */

const initBrowser = {
  uri: null,
  showing: false
};

export const browser = (state = initBrowser, { type, payload }) => {
  switch (type) {
    case BROWSER_OPEN:
      return { ...state, showing: true, uri: payload };
    case BROWSER_CLOSE:
      return initBrowser;
    default:
      return state;
  }
};
