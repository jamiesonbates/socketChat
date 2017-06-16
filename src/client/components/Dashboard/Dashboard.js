import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './Dashboard.css';
import './shared.scss';
import SidePanel from './SidePanel/SidePanel';
import SingleChat from './SingleChat/SingleChat';
import Bookmarks from './Bookmarks/Bookmarks';
import DefaultMain from './DefaultMain/DefaultMain';
import {
  fetchChats,
  setChat,
  sendMessage
} from '../../state/actions/chatActions';
import {
  connectSocket,
  disconnectSocket,
  startedTyping,
  stoppedTyping,
  notifyCommonUsers,
  manageRoom
} from '../../state/actions/socketActions';
import {
  updateMain,
  updateSide
} from '../../state/actions/dashControlActions';
import {
  getContacts
} from '../../state/actions/contactsActions';
import { getCommonUsers } from '../../state/actions/onlineActions';

class Dashboard extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.dispatch(connectSocket());
    this.props.dispatch(getCommonUsers());
    this.props.dispatch(getContacts());
  }

  componentDidMount() {
    if (this.props.allChats === null) {
      this.props.dispatch(fetchChats());
    }
    else {
      this.handleRooms(this.props.allChats, 'join room');
    }

    this.props.dispatch(notifyCommonUsers());
  }

  componentWillReceiveProps(nextProps) {
    this.handleRooms(nextProps.allChats, 'join room');
  }

  componentWillUnmount() {
    this.handleRooms(this.props.allChats, 'leave room');
  }

  handleRooms(chats, event) {
    if (!chats) {
      return;
    }

    for (const chat of chats) {
      this.props.dispatch(manageRoom(chat.id, event));
    }
  }

  findUserName(userId, chat) {
    const user = chat.users.filter(user => {
      if (user.id === userId) {
        return true;
      }

      return false;
    })[0];

    return user;
  }

  determineChatHeader(chat) {
    if (chat.name) {
      return chat.name;
    }

    const title = chat.users.reduce((acc, user, i, arr) => {
      if (user.id === this.props.userInfo.id) {
        return acc;
      }

      if (arr.length - 1 === i) {
        acc += `${user.firstName} ${user.lastName}`;

        return acc;
      }

      acc += `${user.firstName} ${user.lastName}, `;

      return acc;
    }, '');

    return title;
  }

  render() {
    return (
      <div className="Dashboard-container">
        <div className="Dashboard-sections-container">
          <SidePanel
            determineChatHeader={this.determineChatHeader}
            findUserName={this.findUserName}
          />

        {/* Where should methods live and/or when should they be passed */}
          {
            this.props.dashControls.showDefaultMain ?
              <DefaultMain />
            :  this.props.dashControls.showChat ?
                <SingleChat
                  allChats={this.props.allChats}
                  singleChat={this.props.singleChat}
                  sendMessage={sendMessage}
                  userId={this.props.userInfo.id}
                  startedTyping={startedTyping}
                  stoppedTyping={stoppedTyping}
                  chatsWithTyping={this.props.chatsWithTyping}
                  usersOnline={this.props.usersOnline}
                  determineChatHeader={this.determineChatHeader.bind(this)}
                  findUserName={this.findUserName.bind(this)}
                />
              : <Bookmarks />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    allChats: state.chats.allChats,
    singleChat: state.chats.singleChat,
    userInfo: state.userInfo,
    chatsWithTyping: state.chats.chatsWithTyping,
    usersOnline: state.chats.usersOnline,
    dashControls: state.dashControls
  }
}

export default connect(mapStateToProps)(Dashboard);
