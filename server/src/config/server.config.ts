import * as path from 'path';
import { S3Config } from './s3-server.config';
import mongoose from 'mongoose';
import { injectable } from 'inversify';

export const BASE_DIR = __dirname;
export const ROOT_DIR = path.join(__dirname, '../../');
export const FILE_UPLOAD_PATH = ROOT_DIR + '/uploads';

/**
 * A class to store server configuration
 */
@injectable()
export class ServerConfig {
  public environment: 'development' | 'staging' | 'production';
  public developerName: string;
  public port: number;
  public database: { defaultDatabase: string };
  public awsS3: S3Config = new S3Config();
  public urls: {
    developmentServerUrl: string;
    productionServerUrl: string;
    developmentClientUrl: string;
    productionClientUrl: string;
  };

  /**
   * Constructor
   */
  constructor() {
    this.database = {
      defaultDatabase: '',
    };

    this.urls = {
      developmentServerUrl: '',
      productionServerUrl: '',
      developmentClientUrl: '',
      productionClientUrl: '',
    };
  }

  /**
   * Initialize the config object
   */
  public initialize(): void {
    // Read the environment file
    require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

    this.awsS3.bucketName = process.env.AWS_S3_BUCKET_NAME;
    this.database.defaultDatabase = process.env.MONGODB_NAME || 'Test';

    const nodeEnvironment = process.env.NODE_ENV;
    switch (nodeEnvironment?.trim()) {
      case 'production':
        this.environment = 'production';
        break;
      case 'staging':
        this.environment = 'staging';
        break;
      default:
        this.environment = 'development';
        break;
    }

    // Connect with MongoDB
    this.initializeMongoDb(process.env.MONGODB_NAME, process.env.MONGODB_URI);

    // Set the developer name
    this.developerName = process.env.DEVELOPER_NAME;

    // Set the port
    this.port = parseInt(process.env.PORT) || 4100;

    console.log(`Server started in ${this.environment} mode`);

    // URLs
    this.urls.developmentServerUrl = process.env.SERVER_URL;
    this.urls.productionServerUrl = process.env.SERVER_URL;

    this.urls.developmentClientUrl = process.env.CLIENT_URL;
    this.urls.productionClientUrl = process.env.CLIENT_URL;
  }

  /**
   * Initializes mongo db
   * @param dbName
   * @param dbUri
   */
  private initializeMongoDb(dbName: string, dbUri: string) {
    // this.database.addDatabaseUri(dbName, dbUri);

    // const dbUrl = `${dbUri}/${dbName}`;
    // mongodb+srv://anandgandhi19:DhSEIhJKXlOm0OQB@cluster0.40wogg8.mongodb.net/?retryWrites=true&w=majority
    const connectionString = 'mongodb+srv://anandgandhi19:DhSEIhJKXlOm0OQB@cluster0.40wogg8.mongodb.net/Test?retryWrites=true&w=majority'
    mongoose.set('strictQuery', true);
    mongoose
      .connect(connectionString)
      .then(() => {
        console.log('-> MongoDB Connected');
      })
      .catch((error) => console.log(error));
  }
}
