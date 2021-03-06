const handleSignin = (db, bcrypt) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
/*bcrypt.compare("apples", '$2a$10$Gn6I7rpyIBxLKJ2pmjhl3uXHtgTBwHtk6bAn4Q.Jcj.xRfm./iXea', function(err, res) {
		console.log('first guess', res)
	})
	bcrypt.compare("veggies",'$2a$10$Gn6I7rpyIBxLKJ2pmjhl3uXHtgTBwHtk6bAn4Q.Jcj.xRfm./iXea', function(err, res) {
		console.log('second guess', res)
	})*/

		db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials')
			}

		})
		.catch(err => res.status(400).json('wrong credentials'))
	}

	/*if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in');
		}*/

module.exports = {
	handleSignin: handleSignin
}
