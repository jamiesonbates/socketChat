# SocketChat

## About
A prototypical chat/messenger app using sockets. I want to build this so I can get experience using sockets.

## Problem
People need a way to chat with one another that allows them to do so fast and simply, but also allows them to inventory significant messages the send or receive.

## Primary Use Case
A person with many friends needs an application that enables them to chat with individuals and groups with as few barriers as possible.

## Context
This app will be used when someone is browsing the internet and has something to share with someone else. Most likely, the user will be using a laptop/desktop computer. They might be at work, at home, or working on a project with others.

## Potential Features
* Real-time info - users will be able to see if someone is typing and who it is.
* Group chat - you can create chats with multiple other users.
* Chat history.
* Star messages.
* Search chat histories.

#### Stretch
* Admin page.
* Different type of auth than cookies.
* Store short histories locally.
* Store messages to send when online.
* Edit, delete messages.

## Technology Options
* Webpack
* React
* Socket.io

#### Stretch
* Redix
* Sass

### ERD (list form)

#### Users
* id integer
* first_name varchar(255)
* last_name varchar(255)
* username varchar(255)
* email varchar(255)
* password (special?)
* timestamps date

#### Friends
* id integer
* user_id1 integer
* user_id2 integer
* timestamps date

#### Chats_Users
* id integer
* user_id integer
* chat_id integer

#### Chats
* id integer
* name varchar(255)
* timestamps date

#### Messages
* id integer
* chat_id integer
* user_id integer
* timestamps date

#### Starred
* id integer
* user_id integer
* message_id integer
* timestamps date


  
