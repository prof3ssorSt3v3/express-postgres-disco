import postgres from 'postgres';

const sql = postgres(process.env.PSQL_URL);

export default sql;
