// optionally disable mongo telemetry
disableTelemetry(),
	// create database
	(db = new Mongo().getDB('$DATABASE_NAME')),
	// create user
	db.createUser({
		user: '$DATABASE_USER',
		pwd: '$DATABASE_PASSWORD',
		roles: [
			{
				role: 'readWrite',
				db: '$DATABASE_NAME'
			}
		]
	})
