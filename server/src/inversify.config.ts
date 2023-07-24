import { Container } from 'inversify';
import TYPES from './constants/types.constants';
import {
  MongoDBConnection,
  FRAMEWORK_TYPES,
  MongoDBClient,
  BaseLogService,
  RoleService,
  BaseUserService,
  AuthService,
} from 'swiss-army';
import { ServerConfig } from './config/server.config';
import { StudentService } from './services/student/student.service';

// Load everything needed to the Container
export const iocContainer = new Container();

// Framework types
// iocContainer.bind<MongoDBConnection>(FRAMEWORK_TYPES.MongoDBConnection).to(MongoDBConnection).inSingletonScope();
// iocContainer.bind<MongoDBClient>(FRAMEWORK_TYPES.MongoDBClient).to(MongoDBClient).inSingletonScope();
// iocContainer.bind<BaseUserService>(FRAMEWORK_TYPES.BaseUserService).to(BaseUserService).inSingletonScope();
// iocContainer.bind<BaseLogService>(FRAMEWORK_TYPES.LogService).to(BaseLogService).inSingletonScope();
// iocContainer.bind<RoleService>(FRAMEWORK_TYPES.RoleService).to(RoleService).inSingletonScope();
// iocContainer.bind<AuthService>(FRAMEWORK_TYPES.AuthService).to(AuthService).inSingletonScope();

// Project types
iocContainer.bind<ServerConfig>(FRAMEWORK_TYPES.ServerConfig).to(ServerConfig).inSingletonScope();
iocContainer.bind<StudentService>(TYPES.StudentService).to(StudentService).inSingletonScope();


// ## YOEMAN INSERTION POINT 2 ## //
