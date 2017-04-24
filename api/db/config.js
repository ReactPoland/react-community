const dbconf = {
  hostname: 'stampy.db.elephantsql.com',
  username: 'dyloqmqg',
  database: 'dyloqmqg',
  password: 'g0hB7xF4XtxkipC_uHWSCFUi94nXwchB',
  port: '5432'
};

const dbconf_local = {
  hostname: '127.0.0.1',
  username: '',
  password: '',
  port: '5432',
  database: 'community'
};

const { username, password, hostname, port, database } = (process.env.DEV ? dbconf_local : dbconf)

module.exports = {
  database: {
    ...dbconf,
    url: `postgres://${username}:${password}@${hostname}:${port}/${database}`
  }
};
