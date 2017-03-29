const dbconf = {
  hostname: 'stampy.db.elephantsql.com',
  username: 'dyloqmqg',
  database: 'dyloqmqg',
  password: 'g0hB7xF4XtxkipC_uHWSCFUi94nXwchB',
  port: '5432'
};

module.exports = {
  database: {
    ...dbconf,
    url: `postgres://${dbconf.username}:${dbconf.password}@${dbconf.hostname}:${dbconf.port}/${dbconf.database}`
  }
};
