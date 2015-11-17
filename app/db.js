"use strict";

let fs = require('fs');
let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('data.db');

fs.exists('data.db', exists => {
	db.serialize(() => {
		db.run("CREATE TABLE IF NOT EXISTS Game_Command_History (command TEXT, user TEXT, timeStamp TIMESTAMP default CURRENT_TIMESTAMP)");
	});
});

module.exports = {

	putInDb: (msg, from) => {
		db.serialize(() => {
			// preparing a statement
			let stmt = db.prepare("INSERT INTO Game_Command_History (command, user) VALUES (?, ?)"); // protection against sql injection
			stmt.run("msg:" + msg, from);
			// statement is finished, save to db
			stmt.finalize();
			// give me these things in the db - query Game_Command_History
			db.each("SELECT rowid AS id, command, user, timeStamp FROM Game_Command_History", (err, row) => {
				console.log(row);
				console.log(row.id + ": " + row.command + ": " + row.user + ": " + row.timeStamp);
			});
		});
	},

	close: () => {
		db.close()
	}
};