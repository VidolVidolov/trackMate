/* eslint-disable @typescript-eslint/no-require-imports */
const session = require('express-session');
const MemorySessionStore = require('memorystore')(session);

const store = new MemorySessionStore({
  checkPeriod: 86400000,
});

export default store;
