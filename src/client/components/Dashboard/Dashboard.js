import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './Dashboard.css';
import './shared.scss';
import wrapDashboard from '../../containers/WrapDashboard';
import wrapSingleChat from '../../containers/WrapSingleChat';
import SidePanel from './SidePanel/SidePanel';
import SingleChat from './SingleChat/SingleChat';
import Bookmarks from './Bookmarks/Bookmarks';
import DefaultMain from './DefaultMain/DefaultMain';
import UserProfile from './UserProfile/UserProfile';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.determineChatHeader = this.determineChatHeader.bind(this);
  }

  componentWillMount() {
    this.props.connectSocket();
    this.props.getCommonUsers();
    this.props.getContacts();
    this.props.getCategories();
  }

  componentDidMount() {
    if (this.props.allChats === null) {
      this.props.fetchChats({ onLoad: true });
    }
    else {
      this.handleRooms(this.props.allChats, 'join room');
    }

    this.props.notifyCommonUsers();
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
      this.props.manageRoom({ chatId: chat.id, event });
    }
  }

  determineChatHeader(chat) {
    if (chat.name) return chat.name;

    const title = chat.users.reduce((acc, user, i, arr) => {
      if (user.id === this.props.userId) return acc;

      if (arr.length - 1 === i || arr.length < 3) {
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
        <SidePanel
          determineChatHeader={this.determineChatHeader}
        />

        {/* Where should methods live and/or when should they be passed */}
        <div className="Dashboard-main-container">
          {
            this.props.showDefaultMain ?
              <DefaultMain
                determineChatHeader={this.determineChatHeader}
              />
            : this.props.showChat ?
                <SingleChat
                  determineChatHeader={this.determineChatHeader.bind(this)}
                />
              : <Bookmarks />
          }
        </div>

        {
          this.props.showUserProfile ?
            <UserProfile />
          : null
        }
      </div>
    )
  }
}

export default wrapDashboard(Dashboard);
