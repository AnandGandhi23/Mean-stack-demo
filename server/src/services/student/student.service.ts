import { inject, injectable } from 'inversify';
import { MongoDBClient, FRAMEWORK_TYPES } from 'swiss-army';
import { ServerConfig } from '../../config/server.config';
import { StudentModel } from '../../models/student.model';
import { cloudinary } from '../../util/upload.util';

/**
 * A service for the students
 */
@injectable()
export class StudentService {
  private databaseName: string;

  /**
   * Constructor
   * @param serverConfig - The server config class
   */
  constructor(
    @inject(FRAMEWORK_TYPES.ServerConfig)
    private serverConfig: ServerConfig
  ) {
    this.databaseName = this.serverConfig.database.defaultDatabase;
  }

  public async getAllStudents() {
    const students = await StudentModel.find();

    return students;
  }

  public async getStudentById(studentId) {
    return new Promise(async (resolve, reject) => {
      try {
        const student = await StudentModel.findById(studentId);

        resolve(student);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async deleteStudentById(studentId) {
    return new Promise(async (resolve, reject) => {
      try {
        const student = await this.getStudentById(studentId);

        if (student) {
          const deltedStudent = await StudentModel.findByIdAndDelete(studentId);
          resolve(deltedStudent);
        } else {
          reject('Student does not exists');
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  public async addStudent(req) {
    console.log('req.file.path---', req.file.path);
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        req.file.path,
        {
          folder: 'images',
        },
        async function (error: any, result: any) {
          if (error) {
            console.log('Error uploading file:', error);
            reject('Something wrong in file Upload');
          } else {
            if (req.body.studentId) {
              const student = await StudentModel.findById(req.body.studentId);
              if (student) {
                student.firstName = req.body.firstName && req.body.firstName;
                student.lastName = req.body.lastName && req.body.lastName;
                student.email = req.body.email && req.body.email;
                student.phone = req.body.phone && req.body.phone;
                student.profileImage = result.url;
                await student.save();
                resolve('');
              } else {
                reject('Student does not exists');
              }
            } else {
              const data = new StudentModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                profileImage: result.url,
              });
              const user = await data.save();
              resolve(user);
            }
          }
        }
      );
    });
  }

  public async getStudentBySearch(key: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const students = await StudentModel.find({
          $or: [
            { firstName: { $regex: new RegExp('^' + key.toLowerCase(), 'i') } },
            { lastName: { $regex: new RegExp('^' + key.toLowerCase(), 'i') } },
            { email: { $regex: new RegExp('^' + key.toLowerCase(), 'i') } },
          ],
        });
        resolve(students);
      } catch (error) {
        reject(error);
      }
    });
  }
}
