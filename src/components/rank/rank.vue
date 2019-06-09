<template>
  <div class="rank">排名
    <div id="todo-list-example"><input v-model="newTodoText" v-on:keyup.enter="addNewTodo" placeholder="Add a todo">
      <ul>
        <li is="todo-item" v-for="(todo, index) in todos" v-bind:title="todo" :key="index"
            v-on:remove="todos.splice(index, 1)"></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  Vue.component('todo-item', {
    template: ' <li>{{ title }} <button v-on:click="$emit(\'remove\')">X</button></li>',
    props: ['title']
  })
  export default {
    data() {
      return {
        newTodoText: '',
        todos: ['Do the dishes', 'Take out the trash', 'Mow the lawn']
      }
    },
    methods: {
      addNewTodo() {
        this.todos.push(this.newTodoText)
        this.newTodoText = ''
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
