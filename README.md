# twitchdoesrc

This is an experiment to stream a multiple player chat-command controlled activity using Node, Express, Twitch, IRC Protocol, Socket.IO, and Redis. 

The back-end is written in a functional JavaScript style using persistent data structures from the MORI ClojureScript library.  

## How To Message Someone on Twitch

Twitch implements every user as an IRC channel.

To join someones twitch channel

`irc.join("#username",[callback])`

We can pass a callback to join and send a message. 

Note the `#` before the username, this tells IRC we're trying to send a message to a users *channel* and not to private message a user.

Twitch does not support private messaging for bots.
