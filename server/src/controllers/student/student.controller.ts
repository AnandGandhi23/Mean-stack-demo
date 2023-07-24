import { controller, httpDelete, httpGet, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../../constants/types.constants';
import { Request, Response } from 'express';
import { ControllerResult, Status } from '../../util/controller.result.util';
import { StudentService } from '../../services/student/student.service';
import { upload } from '../../util/upload.util';

/**
 * The api token controller
 */
@controller('/student')
export class StudentController {
  protected controllerName = 'student-controller';

  /**
   * Constructor
   * @param studentService - A reference to the address varification
   */
  constructor(
    @inject(TYPES.StudentService)
    private studentService: StudentService
  ) {}

  /**
   * Get all the students
   */
  @httpGet('/get-all-students')
  public async getAllStudents(request: Request, response: Response) {
    try {
      const students = await this.studentService.getAllStudents();

      // console.log('students --', students);

      return response.status(200).json(students);

      //   return new ControllerResult(200, students);
    } catch (error) {
      console.log('error -> ', error);
      const response = new ControllerResult<null>(500);
      return response;
    }
  }

  /**
   * Get student by Id
   */
  @httpGet('/get-student-by-id/:id')
  public async getStudentById(reqest: Request, response: Response) {
    try {
      // console.log(reqest.params.id);

      const student = await this.studentService.getStudentById(reqest.params.id);

      return response.status(200).json({ student });

      // return new ControllerResult(200, student);
    } catch (error) {
      console.log('error -> ', error);
      const response = new ControllerResult<null>(500);
      return response;
    }
  }

  /**
   * Get student by Id
   */
  @httpDelete('/delete-student-by-id/:id')
  public async deleteStudentById(reqest: Request, response: Response) {
    try {
      // console.log(reqest.params.id);

      const student = await this.studentService.deleteStudentById(reqest.params.id);

      return response.status(200).json({ status: 'success' });

      // return new ControllerResult(200, student);
    } catch (error) {
      console.log('error -> ', error);
      const response = new ControllerResult<null>(500);
      return response;
    }
  }

  /**
   * add new student
   */
  @httpPost('/', upload)
  public async addStudent(reqest: Request, response: Response) {
    try {
      // console.log('reqest.body=====', reqest.body);

      console.log(reqest.body);
      const student = await this.studentService.addStudent(reqest);

      return response.status(201).json({ status: 'success' });

      // return new ControllerResult(200, { status: 'success' });
    } catch (error) {
      console.log('error -> ', error);
      // const response = new ControllerResult<null>(500);
      // return response;
      return response.status(400).json({ status: 'fail', error });
    }
  }

  /**
   * Get student by search
   */
  @httpGet('/get-student-by-search/:key')
  public async getStudentBySearch(reqest: Request, response: Response) {
    try {
      const students = await this.studentService.getStudentBySearch(reqest.params.key);
      return response.status(200).json(students);
    } catch (error) {
      console.log('error -> ', error);
      const response = new ControllerResult<null>(500);
      return response;
    }
  }
}
