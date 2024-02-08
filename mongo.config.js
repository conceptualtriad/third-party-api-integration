// optionally disable mongo telemetry
disableTelemetry(),
	// create database
	// (db = new Mongo().getDB('aus-teamsupport')),
	(db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE)),
	// create user
	db.createUser({
		user: process.env.DATABASE_USER,
		pwd: process.env.DATABASE_PASSWORD,
		roles: [
			{
				role: 'readWrite',
				db: process.env.MONGO_INITDB_DATABASE
			}
		]
	})
