import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnChanges {
  @Output() delete = new EventEmitter();
  @Output() togle = new EventEmitter();
  @Output() rename = new EventEmitter<string>();

  @Input() todo!: Todo;

  @ViewChild('titleField')
  set findedTitleField(field: ElementRef) {
    if (field) {
      field.nativeElement.focus();
    }
  };

  editing = false;
  title = '';

  constructor() {}
  ngOnChanges({ todo }: SimpleChanges): void {
    if (todo.currentValue.title !== todo.previousValue?.title) {
      this.title = todo.currentValue.title;
    }
  }

  edit() {
    this.editing = true;
    this.title = this.todo.title;
  }

  save() {
    if (!this.editing) {
      return;
    }

    this.editing = false;
    this.rename.emit(this.title);
  }
}
