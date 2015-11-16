// secrets in env variables
let channelOwner = process.env.TWITCH_USER;
let password = process.env.TWITCH_AUTH;

let options = {
	userName: channelOwner, // mandatory
	realName: 'nodeJS IRC client',
	// port: 6667,
	// localAddress: null,
	debug: true,
	showErrors: true,
	// autoRejoin: false,
	autoConnect: false,
	// channels: [channel],
	// secure: false,
	// selfSigned: falsße,
	// certExpired: false,
	// floodProtection: false,
	// floodProtectionDelay: 1000,
	sasl: true, // mandatory
	password: password // twitch token
		// stripColors: false,
		// channelPrefixes: "&#",
		// messageSplit: 512,
		// encoding: ''
};