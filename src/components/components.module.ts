import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TaskListItemComponent } from './task-list-item/task-list-item';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [
		TaskListItemComponent
	],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [TaskListItemComponent]
})
export class ComponentsModule {}
