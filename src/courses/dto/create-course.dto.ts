export class CreateCourseDto {
  title!: string;
  description!: string;
  duration!: number;
  isActive?: boolean;
}