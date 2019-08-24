const buildResetPostgres = require('./build-reset-postgres');

let resetPostgres;

async function resetDatabase() {
  if (!resetPostgres) resetPostgres = await buildResetPostgres();

  return resetPostgres();
}

module.exports = resetDatabase;
