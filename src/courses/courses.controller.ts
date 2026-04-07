import { Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {

    constructor(private courses: CoursesService) {}

    @Post()
    create(@Body() dto: CreateCourseDto) {
        return this.courses.create(dto, 1); // Mexer depois quando implementar JWT
    }

    @Get()
    findAll() {
        return this.courses.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.courses.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: Partial<CreateCourseDto>) {
        return this.courses.update(Number(id), dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.courses.remove(Number(id));
    }
}
