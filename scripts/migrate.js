// Import the postgres-migrations module and the path module
const { migrate } = require('postgres-migrations');
const path = require('path');

// Extract the NODE_ENV environment variable
const { NODE_ENV } = process.env;

// If NODE_ENV is not "production", load environment variables from the .env or .env.test file
if (NODE_ENV !== 'production') {
  const args = process.argv.slice(2)[0];
  const envFile = args === 'test' ? '../.env.test' : '../.env';

  // Load the environment variables using the dotenv module and the path.join method
  require('dotenv').config({
    path: path.join(__dirname, envFile),
  });
}

// Extract the required database connection information from the environment variables
const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

// Create a configuration object for the migration process
const config = {
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: parseInt(PGPORT),
  ensureDatabaseExists: true,
  defaultDatabase: PGDATABASE,
};

// Define an asynchronous function called migrateDB that performs the database migration
const migrateDB = async (config) => {
  console.log('Migrating Database...');

  // Call the migrate method from the postgres-migrations module to perform the migration
  const output = await migrate(config, './migrations');

  // If the migration is up to date, log a message to the console
  if (!output.length) {
    console.log('Database already up to date!');
  }
  // Otherwise, log the result of the migration process to the console
  else {
    console.log(output);
  }
};

// Call the migrateDB function with the configuration object and log any errors that occur
try {
  migrateDB(config);
} catch (err) {
  console.log(err);
}
