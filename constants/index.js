const THIRTY_MINUTES_AS_MILLLISECONDS = 1800000; // 30 minutes
const ONE_DAY_AS_MILLISECONDS = 86400000; // 1 day
const SIGNING_ALGORITHM = 'HS256'; // JWT ALGORITHM
const SALT_ROUNDS = 10;

module.exports = {
  SALT_ROUNDS,
  THIRTY_MINUTES_AS_MILLLISECONDS, 
  ONE_DAY_AS_MILLISECONDS, 
  SIGNING_ALGORITHM,
}