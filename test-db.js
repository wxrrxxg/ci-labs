// test-db.js — integration test that connects to PostgreSQL

const { Client } = require('pg');

async function testDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'testpassword',
    database: 'testdb',
  });

  try {
    await client.connect();
    console.log('PASS: Connected to PostgreSQL');

    await client.query(
      'CREATE TABLE IF NOT EXISTS users (id SERIAL, name TEXT)'
    );
    console.log('PASS: Created table');

    await client.query(
      "INSERT INTO users (name) VALUES ('Alice')"
    );

    const result = await client.query('SELECT * FROM users');

    console.log(
      'PASS: Inserted and read ' + result.rows.length + ' row(s)'
    );

    if (result.rows[0].name === 'Alice') {
      console.log('PASS: Data is correct');
    } else {
      console.log('FAIL: Data mismatch');
      process.exit(1);
    }
  } catch (err) {
    console.log('FAIL: ' + err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

testDatabase();