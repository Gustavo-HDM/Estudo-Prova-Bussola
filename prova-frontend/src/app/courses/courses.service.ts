import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Course {
  id: number;
  title: string;
  description: string;
  duration: number;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/courses';

  getAll() {
    return this.http.get<Course[]>(this.url);
  }

  create(data: Omit<Course, 'id'>) {
    return this.http.post<Course>(this.url, data);
  }

  update(id: number, data: Partial<Course>) {
    return this.http.patch<Course>(`${this.url}/${id}`, data);
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}