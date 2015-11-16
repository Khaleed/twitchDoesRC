var fs = require('fs');
// writing async funcs using threadpool removes stack trace info
// see errors but not which statement caused it
// to resolve this issue -> verbose()
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');
// return true if the file exists
fs.exists('data.db', function(exists) {
	db.serialize(function() {
		if (!exists) {
			// create a table called Game_Command_History
			db.run("CREATE TABLE Game_Command_History (command TEXT, user TEXT)");
		}
	});
});

// put in db
db.serialize(function() {
	// preparing a statement
	var stmt = db.prepare("INSERT INTO Game_Command_History VALUES (?, ?)");
	stmt.run("msg:" + message, from);
	stmt.finalize();
	// give me these things in the db - query Game_Command_History
	db.each("SELECT rowid AS id, command, user FROM Game_Command_History", function(err, row) {
		console.log(row);
		console.log(row.id + ": " + row.command + ": " + row.user);
	});
});
db.close();