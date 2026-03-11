import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentsService {
  private students: Student[] = [
    { id: "1", name: "Ravi Sharma", email: "ravi@gmail.com", age: 22 },
    { id: "2", name: "Anita Singh", email: "anita@gmail.com", age: 21 },
    { id: "3", name: "Rahul Kumar", email: "rahul@gmail.com", age: 23 }
  ];

  findAll(): Student[] {
    return this.students;
  }

  findOne(id: string): Student {
    const student = this.students.find(s => s.id === id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  create(createStudentDto: CreateStudentDto): Student {
    const newStudent: Student = {
      id: uuidv4(),
      ...createStudentDto,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  update(id: string, updateStudentDto: UpdateStudentDto): Student {
    const studentIndex = this.students.findIndex(s => s.id === id);
    if (studentIndex === -1) {
      throw new NotFoundException('Student not found');
    }
    
    const updatedStudent = {
      ...this.students[studentIndex],
      ...updateStudentDto,
    };
    this.students[studentIndex] = updatedStudent;
    return updatedStudent;
  }

  remove(id: string): void {
    const studentIndex = this.students.findIndex(s => s.id === id);
    if (studentIndex === -1) {
      throw new NotFoundException('Student not found');
    }
    this.students.splice(studentIndex, 1);
  }
}
