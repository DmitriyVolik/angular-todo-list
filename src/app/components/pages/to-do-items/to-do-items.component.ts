// @ts-ignore

import { Component, OnInit } from '@angular/core'
import {ToDoItem} from '../../../models/ToDoItem'
import {TodoItemsService} from "../../../services/todo-items.service";
import {NavigationStart, Router} from "@angular/router";
import {clone} from "../../../utils/CloneMaker";

@Component({
  selector: 'app-to-do-items',
  templateUrl: './to-do-items.component.html',
  styleUrls: ['./to-do-items.component.css']
})
export class ToDoItemsComponent implements OnInit {

  selectedItem: ToDoItem = null

  toDoItems: ToDoItem[]

  title: string = ''

  isLoading: boolean
  allowUrlProcessing: boolean = true

  constructor(
    private router: Router,
    private itemsService: TodoItemsService
  ) {
    itemsService.commonService.getIsLoadingStream().subscribe(value => {
      this.isLoading = value
    })
    this.toDoItems = itemsService.remoteItems
  }

  resetSelectedItem () {
    this.selectedItem = null
  }

  processUrl () {
    // если другая реакция на изменение адресной строки не происходит
    // в этот момент
    if (this.allowUrlProcessing) {
      // запрещаем начало другой реакции
      this.allowUrlProcessing = false
      // изучаем хэш-область адресной строки,
      // и если в ней появилось число -
      // обрабатываем его как ИД выбранной задачи
      const hash = window.location.hash
      if (hash && this.toDoItems.length > 0) {
        const selectedItemId = Number(hash.replace('#', ''))
        const selectedItem =
          this.toDoItems.find(item => item.id === selectedItemId)
        if (selectedItem) {
          // установка текущей модели задачи
          this.selectedItem = clone(selectedItem)
        } else {
          if (!this.itemsService) {
            window.location.hash = ''
          } else {
            window.location.hash = this.selectedItem.id.toString()
          }
        }
      }
      this.allowUrlProcessing = true
    }
  }

  ngOnInit() {
    // когда меняется содержимое адресной строки ...
    this.router.events.forEach(event => {
      // console.log(event instanceof NavigationStart)
      // когда изменение адресной строки только началось
      if (event instanceof NavigationStart) {
        // реагируем на изменение адреса
        this.processUrl()
      }
    })
    // setTimeout(() => this.title = 'Hello Angular 2021!', 5000)
    this.title = 'Hello Angular 2021!'
    // this.toDoItems.push(...this.service.getItems())
    this.itemsService.getRemoteItems(this.processUrl.bind(this))
  }

  onItemClick (toDoItem: ToDoItem) {
    this.selectedItem = clone(toDoItem)
    window.location.hash = this.selectedItem.id.toString()
  }

  newTaskClick() {
    this.selectedItem = new ToDoItem(0, '', false)
  }
}
