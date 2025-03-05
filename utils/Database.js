import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  static instance;
  pool;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.pool = new sql.ConnectionPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER, // Example: 'localhost' or 'your-server-name'
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT) || 1433,
      options: {
        encrypt: true, // Use encryption for Azure SQL
        trustServerCertificate: true, // Use for local development
      }
    });

    Database.instance = this;
  }

  async connect() {
    try {
      if (!this.pool.connected) {
        await this.pool.connect();
        console.log('Connected to MSSQL Database');
      }
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  async query(sqlQuery, params = []) {
    await this.connect();
    try {
      const request = this.pool.request();
      params.forEach((param, index) => {
        request.input(`param${index + 1}`, param);
      });
      const result = await request.query(sqlQuery);
      return result.recordset;
    } catch (error) {
      console.error('Query failed:', error);
      throw error;
    }
  }

  async close() {
    try {
      await this.pool.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing connection:', error);
    }
  }
}

export default new Database();