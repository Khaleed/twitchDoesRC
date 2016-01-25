# twitchdoesrc

This is an experiment to control any game through Twitch messages from a group of people using Node, Express, Twitch, IRC Protocol, Socket.IO, SQLite. 

This project will eventually be written in a functional JavaScript style using persistent data structures from the MORI ClojureScript library.  

## How To Message Someone on Twitch

Twitch implements every user as an IRC channel.

To join someones twitch channel

`irc.join("#username",[callback])`

We can pass a callback to join and send a message. 

Note the `#` before the username, this tells IRC we're trying to send a message to a users *channel* and not to private message a user.

Twitch does not support private messaging for bots. 

## Proof of Concept

I made a small game called mouse as a test. A group of recursers on twitch were able to play and guide a mouse (grey square) to the cheese (yellow). The game can be seen here http://khalled.github.io/twitchDoesRC

<a href='http://www.recurse.com' title='Made with love at the Recurse Center'><img src='https://cloud.githubusercontent.com/assets/2883345/11322972/9e553260-910b-11e5-8de9-a5bf00c352ef.png' height='59px'/></a>
