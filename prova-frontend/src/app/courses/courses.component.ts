import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesService, Course } from './courses.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
template: `
    <div style="max-width: 900px; margin: 40px auto; font-family: sans-serif;">

      <h1 style="margin-bottom: 24px;">📚 Gerenciar Cursos</h1>

      <!-- Formulário -->
      <div style="background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
        <h2 style="margin-bottom: 16px;">{{ editingId ? 'Editar Curso' : 'Novo Curso' }}</h2>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <input
            [(ngModel)]="title"
            placeholder="Título"
            style="padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;"/>

          <input
            [(ngModel)]="description"
            placeholder="Descrição"
            style="padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;"/>

          <input
            [(ngModel)]="duration"
            type="number"
            placeholder="Duração (min)"
            style="padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;"/>

          <div style="display: flex; gap: 8px;">
            <button
              (click)="submit()"
              style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
              {{ editingId ? 'Atualizar' : 'Salvar' }}
            </button>

            @if (editingId) {
              <button
                (click)="cancelEdit()"
                style="padding: 10px 20px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
                Cancelar
              </button>
            }
          </div>
        </div>
      </div>

      <!-- Tabela -->
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #2563eb; color: white;">
            <th style="padding: 12px; text-align: left;">ID</th>
            <th style="padding: 12px; text-align: left;">Título</th>
            <th style="padding: 12px; text-align: left;">Descrição</th>
            <th style="padding: 12px; text-align: left;">Duração</th>
            <th style="padding: 12px; text-align: center;">Ações</th>
          </tr>
        </thead>
        <tbody>
          @for (c of courses(); track c.id) {
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 12px;">{{ c.id }}</td>
              <td style="padding: 12px;">{{ c.title }}</td>
              <td style="padding: 12px;">{{ c.description }}</td>
              <td style="padding: 12px;">{{ c.duration }} min</td>
              <td style="padding: 12px; text-align: center;">
                <div style="display: flex; gap: 8px; justify-content: center;">
                  <button
                    (click)="startEdit(c)"
                    style="padding: 6px 14px; background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Editar
                  </button>
                  <button
                    (click)="remove(c.id)"
                    style="padding: 6px 14px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>

    </div>
  `
})

export class CoursesComponent implements OnInit {
  private svc = inject(CoursesService);

  courses = signal<Course[]>([]);
  title = '';
  description = '';
  duration = 60;
  editingId: number | null = null;

  ngOnInit() { this.load(); }

  load() {
    this.svc.getAll().subscribe(list => this.courses.set(list));
  }

  submit() {
    this.svc.create({
      title: this.title,
      description: this.description,
      duration: this.duration,
      isActive: true,
      instructorId: 1
    } as any).subscribe(() => {
      this.title = '';
      this.description = '';
      this.load();
    });
  }

  startEdit(c: Course) {
    this.editingId = c.id;
    this.title = c.title;
    this.description = c.description;
    this.duration = c.duration;
  }

  cancelEdit() {
    this.editingId = null;
    this.title = '';
    this.description = '';
    this.duration = 60;
  }

  remove(id: number) {
    this.svc.remove(id).subscribe(() => this.load());
  }
}