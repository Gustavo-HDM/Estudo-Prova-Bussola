import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {

    constructor(private prisma: PrismaService) {}

    create(dto: CreateCourseDto, instructorId: number) {
        return this.prisma.course.create({
            data: {
                title: dto.title,
                description: dto.description,
                duration: dto.duration,
                isActive: dto.isActive ?? true,
                instructorId
            }
        })
    }
}