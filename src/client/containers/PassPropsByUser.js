import React from 'react';
import { connect } from 'react-redux';

import { updateUserProfile, updateTargetUserId } from '../state/actions/uniqueUserActions';
import { setChat, createChat } from '../state/actions/chatActions';
import { updateMain } from '../state/actions/dashControlActions';
import { setBookmarks, unBookmarkMsg } from '../state/actions/bookmarkActions';

export default function(ComposedClass) {
  class PassPropsByUser extends React.Component {
    constructor() {
      super();
    }
    render() {
      return (
        <ComposedClass {...this.props} />
      )
    }
  }

  const mapStateToProps = state => {
    return {
      targetUserId: state.uniqueUserInfo.targetUserId,
      targetUserProfile: state.uniqueUserInfo.userProfile,
      bookmarks: state.bookmarks.bookmarks,
      usersOnline: state.chats.usersOnline,
      currentUserId: state.userInfo.id,
      allChats: state.chats.allChats
    }
  }

  const mapDispatchToProps = dispatch => (
    {
      updateTargetUserId: (data) => dispatch(updateTargetUserId(data)),
      updateUserProfile: (data) => dispatch(updateUserProfile(data)),
      setChat: (data) => dispatch(setChat(data)),
      createChat: (data) => dispatch(createChat(data)),
      updateMain: (data) => dispatch(updateMain(data)),
      setBookmarks: (data) => dispatch(setBookmarks(data)),
      unBookmarkMsg: (data) => dispatch(unBookmarkMsg(data))
    }
  )

  return connect(mapStateToProps, mapDispatchToProps)(PassPropsByUser);
}
