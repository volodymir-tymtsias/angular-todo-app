import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Todo } from '../../types/todo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @Output() delete = new EventEmitter();

  @Input() todo!: Todo;

  @ViewChild('titleField')
  set findedTitleField(field: ElementRef) {
    if (field) {
      field.nativeElement.focus();
    }
  };

  editing = false;

  edit() {
    this.editing = true;

    this.findedTitleField?.nativeElement.focus();
  }
}
