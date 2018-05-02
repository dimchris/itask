import { Task } from './../../models/Task';
import { Storage } from '@ionic/storage';
import { TaskListItem } from './../../app/interfaces/TaskListItem';
import { AppSettings } from './../../AppSettings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TasksProvider {

  constructor(
    public http: HttpClient,
    private storage: Storage
  ) { }

  getTaskList() {
    let Url = AppSettings.API_ENDPOINT
    return this.http.get<{ count: number, tasks: TaskListItem[] }>(Url + 'tasks/')
      .toPromise()
      .then(
        data => {
          return data;
        }
      )
      .catch(
        error => {
          return this.storage.get('task-list')
        }
      )
  }

  getFavorites() {
    return this.storage.get('favTasks')
  }

  addToFavorites(taskListItem: TaskListItem) {
    return this.storage.get('favTasks')
      .then(
        tasks => {
          if (tasks) {
            tasks.push(taskListItem)
            return this.storage.set('favTasks', tasks)
          }
        }
      )
  }

  removeFromFavorites(taskId: string) {
    return this.storage.get('favTasks')
      .then(
        tasks => {
          if (tasks) {
            let idx = tasks.findIndex(item => { return item._id === taskId })
            tasks.splice(idx, 0)
          }
          return this.storage.set('favTasks', tasks)
        }
      )
  }

  isFavorite(taskId: string) {
    console.log("is fav");
    
    return this.storage.get('favTasks')
      .then(
        tasks => {
          let idx = -1;
          if (tasks) {
            idx = tasks.findIndex(item => { return item._id === taskId })
          }          
          return tasks && idx !== -1;
        }
      )
  }

  isSaved(taskId){
      return this.storage.get('tasks')
        .then(
          tasks => {
            let idx = -1;
            if (tasks) {
              idx = tasks.findIndex(item => { return item._id === taskId })
            }
            return tasks && idx !== -1;
          }
        )
    
  }

  getTask(taskId: string) {
    if (this.isSaved(taskId)) {
      console.log('this task is on storage');
      this.storage.get('tasks').then(
        data => {
          let idx = data.findIndex(item => { return item._id === taskId })
          return data[idx]
        }
      )
    } else {
      console.log('fetching task');
      let Url = AppSettings.API_ENDPOINT
      return this.http.get<Task>(Url + 'tasks/' + taskId).toPromise()
        .then(task => {return this.saveTask(task)})
    }
  }

  saveTask(task: Task) {
    this.storage.get('tasks').then(tasks => {
      return this.storage.set('tasks', [...tasks, task]).then( _ =>{return task})
    })
  }

  removeTask(taskId: string) {
    return this.storage.get('tasks').then(tasks => {
      let idx = tasks.findIndex(item => { return item._id === taskId })
      return this.storage.set('tasks', tasks.splice(idx, 1))
    })
  }

}
