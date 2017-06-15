import { combineReducers } from 'redux';

import userInfo from './userReducers';
import errors from './errorReducers';
import chats from './chatReducers';
import dashControls from './dashControlReducers';

export default combineReducers({
  userInfo,
  errors,
  chats,
  dashControls
});
