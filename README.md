# twitchDoesRC

This is an experiment to control any game through Twitch messages from a group of people using Node, Twitch API, IRC Protocol, SQLite. 

Where possible, functional JavaScript style is adopted using map, reduce, and filter. 

The aim of the project was to learn more about back-end operations using streams as a data structure and how to resolve complex architectural problems in a simple, yet elegant manner. 

## How To Message Someone on Twitch

Twitch implements every user as an IRC channel.

To join someones twitch channel

`irc.join("#username",[callback])`

We can pass a callback to join and send a message. 

Note the `#` before the username, this tells IRC we're trying to send a message to a users *channel* and not to private message a user.

Twitch does not support private messaging for bots. 

## Proof of Concept

Used a small game called mouse to test twitchDoesRC. A group of recursers on Twitch were able to play and guide a mouse (grey square) to the cheese (yellow sqaure) in a live demo. The game can be seen here http://khaleed.github.io/twitchDoesRC

## Contributors

Kara McNair

<a href='http://www.recurse.com' title='Made with love at the Recurse Center'><img src='https://cloud.githubusercontent.com/assets/2883345/11322972/9e553260-910b-11e5-8de9-a5bf00c352ef.png' height='59px'/></a>

