import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { CommonModule } from '@angular/common';
import { AddBoxDialogComponent } from '../../components/add-box-dialog/add-box-dialog.component';
import { BoardComponent } from '../../components/board/board.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [DragDropModule, CommonModule, AddBoxDialogComponent, BoardComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

  // Create tasks for the 'Ideas' column
ideasTasks: Task[] = [
  new Task('some random idea', 'Description for some random idea', new Date(), false),
  new Task('This is random', 'Description for This is random', new Date(), false),
  new Task('build', 'Description for build', new Date(), false)
];

// Create tasks for the 'Ideassfsdfs' column
ideassfsdfsTasks: Task[] = [
  new Task('some random idead', 'Description for some random idead', new Date(), false),
  new Task('This is randomasasdasd asdsa', 'Description for This is randomasasd asdasdsa', new Date(), false),
  new Task('build asdsa', 'Description for build asdsa', new Date(), false)
];

// Instantiate the Board object with the provided columns and tasks
board: Board = new Board('Test Board', [
  new Column('Ideas', this.ideasTasks),
  new Column('Ideassfsdfs', this.ideassfsdfsTasks)
]);

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  handleBoxAdded(boxName: string): void {
    // Create a new column with the box name
    const newColumn = new Column(boxName, []);

    // Push the new column to the board
    this.board.columns.push(newColumn);

    console.log('Box added:', boxName);
    console.log('Board:', this.board);
  }

}
