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
    console.log('fetching task list');
    let Url = AppSettings.API_ENDPOINT
    return this.http.get<{ count: number, tasks: TaskListItem[] }>(Url + 'tasks/')
      .toPromise()
      .then(
        data => {
          return data.tasks.map(task => {
            console.log(task);
            return {
              _id: task._id,
              name: task.name,
              description: task.description,
              image: task.image,
              level: task.level,
              age: task.age,
              contributor: task.contributor,
              updatedAt: task.updatedAt,
              createdAt: task.createdAt
            }
          }
          )
        }
      )
  }

  saveTasklist(taskListItems: TaskListItem[]){
    return this.storage.set('task-list', taskListItems)
  }

  getTaskListFromStorage(){
    return this.storage.get('task-list')
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
          } else {
            return this.storage.set('favTasks', [taskListItem])
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
            tasks.splice(idx, 1)
          }
          return this.storage.set('favTasks', tasks)
        }
      )
  }

  isFavorite(taskId: string) {
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

  isSaved(task: TaskListItem) {
    return this.storage.get('tasks')
      .then(
        tasks => {
          console.log(tasks);
          
          let idx = -1;
          //is up to date
          let valid = true;
          if (tasks) {
            idx = tasks.findIndex(item => { return item._id === task._id })
            if(idx>0){
              
              valid = tasks[idx].updatedAt === task.updatedAt
              console.log(tasks[idx]);
              console.log(task.updatedAt)
              console.log(valid);
              if(!valid){
                this.removeTask(task._id)
              }
            }
          }
          return tasks && idx !== -1 && valid;
        }
      )

  }

  getTask(task: TaskListItem) {
    // console.log('getting task: ',task);
    
    return this.isSaved(task).then(saved => {
      if (saved) {
        return this.storage.get('tasks').then(
          data => {
            console.log('this task is on storage');
            console.log(data);
            
            let idx = data.findIndex(item => { return item._id === task._id })
            return data[idx]
          }
        )
      } else {
        console.log('fetching task');
        let Url = AppSettings.API_ENDPOINT
        // console.log(task);
        
        return this.http.get<Task>(Url + 'tasks/' + task._id).toPromise()
          .then(task => {             
            return this.saveTask(task) 
          })
      }
    }
    )
  }

  saveTask(task: Task) {
    return this.storage.get('tasks').then(tasks => {
      if(tasks){
        return this.storage.set('tasks', [...tasks, task]).then(_ => { return task })
      }else{
        return this.storage.set('tasks', [task]).then(_ => { return task })
      }
    })
  }

  removeTask(taskId: string) {
    return this.storage.get('tasks').then(tasks => {
      let idx = tasks.findIndex(item => { return item._id === taskId })
      return this.storage.set('tasks', tasks.splice(idx, 1))
    })
  }

}
