<script>

import {sortData, filterData} from "../services/data-manipulation"
import Header from "./components/Header.vue"
import User from "./components/User.vue"
import Menu from "./components/Menu.vue"
import _ from "lodash"
import Paginate from "vuejs-paginate-next"
import {getUsersAPI, addUserAPI} from "../services/api-service"


export default {
  components: {Header, User, Menu, paginate: Paginate},
  
  data(){
    return{
      users: [],
      users_pagination: [],
      newUser: {},
      pag_items_in_page: 12,
      page: 1,
      pagination_offset: 0,
      dialog: false,
      sortValue: '',
      filterValue: ''
    }
  },
  mounted(){
    getUsersAPI().then(res => {
        this.users = res
        this.users_pagination = _.slice(this.users, 0, this.pag_items_in_page)
      })
  },
  methods: {
    changePage(page_num){
      this.page = page_num
      this.pagination_offset = (this.pag_items_in_page * this.page) - this.pag_items_in_page

      this.users_pagination = _.slice(this.users, this.pagination_offset, this.pag_items_in_page + this.pagination_offset)
      
      window.scroll(0, 0)
    },
    addUser(){
      
      this.getUsers()
      addUserAPI(this.newUser)
      this.newUser = {}
      this.dialogAdd = false
    }
  },
  computed: {
    pagesCount(){
      return Math.ceil(this.users.length / this.pag_items_in_page)
    },
    Update(){
      if(this.sortValue == 'asc'){
        this.users.sort((a, b) => new Date(a.birthday) - new Date(b.birthday))
      }
      else if(this.sortValue == 'desc'){
        this.users.sort((a, b) => new Date(b.birthday)  - new Date(a.birthday))
      }

      if(this.filterValue == 'м'){
        this.users = this.users.filter((u) => u.male === 'м')
      }
      else if(this.filterValue == 'ж'){
        this.users = this.users.filter((u) => u.male === 'ж')
      } 
      
      return this.users
    }
  },
  watch:{
    filterValue(value){
      this.user = this.Update
      this.users_pagination = _.slice(this.users, this.pagination_offset, this.pag_items_in_page + this.pagination_offset)
    },
    sortValue(value){
      this.user = this.Update
      this.users_pagination = _.slice(this.users, this.pagination_offset, this.pag_items_in_page + this.pagination_offset)
    }
  }
}
</script>

<template>
  <Header></Header>

  <div>
    
    <div>
      <div class="row m-2">
        <div class="col-9 mt-2 p-0 align-items-center">
            <label class="mx-3">Сортировать</label>
            <select v-model="sortValue">
                <option value="asc" default>По возрастанию д/р </option>
                <option value="desc">По убыванию д/р </option>
            </select>
            <label class="mx-4">Фильтровать</label>
            <select v-model="filterValue" >
                <option value="м">Мужчины</option>
                <option value="ж">Женщины</option>
            </select>
        </div>
        <div class="col-3 d-flex justify-content-end">
            <button @click="dialog = true" class="btn my-2 text-light col-6 bg-update">
            
            <span class="p-0 ">Добавить пользователя <span style="font-size: 20px;">+</span></span>
            </button>

            <v-dialog
            v-model="dialog"
            width="auto"
            >
                <v-card
                max-width="500"
                title="Добавить пользователя"
                >
                <div class="row m-2">
                    <label class="col-3 m-2" >Фамилия</label>
                    <input type="text" class="col-8 m-2" v-model="newUser.surname" required>

                    <label class="col-3 m-2" >Имя</label>
                    <input type="text" class="col-8 m-2" v-model="newUser.name" required>

                    <label class="col-3 m-2" >Отчество</label>
                    <input type="text" class="col-8 m-2" v-model="newUser.patron" required>

                    <label class="col-3 m-2" >День рождения</label>
                    <input type="date" class="col-8 m-2" v-model="newUser.birthday" required>

                    <label class="col-3 m-2" >Телефон</label>
                    <input type="text" class="col-8 m-2" v-model="newUser.phone" required>
                    
                    <label class="col-3 m-2" >Email</label>
                    <input type="email" class="col-8 m-2" v-model="newUser.email" required>

                    <label class="col-3 m-2" >Пол</label>
                    <select type="text" class="col-8 m-2" v-model="newUser.male">
                        <option value="м">Мужской</option>
                        <option value="ж">Женский</option>
                    </select>

                    <div class="d-flex justify-content-evenly">
                    <button
                    class="bg-success btn text-light m-2"
                    @click="addUser"
                    >Добавить</button>

                    <button
                        class="btn bg-danger text-light m-2"
                        @click="dialog = false"
                        
                    >Закрыть</button>
                    </div>
                </div>
                </v-card>
            </v-dialog>
        </div>
      </div>
    </div>
    
    <div class="row m-0 justify-content-around">
      <User class="col-sm-5 col-lg-3 my-3 m-2 " v-show="users != null" v-for="(el, index) in this.users_pagination" :key="index" :user="el"></User> 
    </div>
  </div>

  
  
  <paginate
    v-model="page"
    :page-range="3"
    :margin-pages="2"
    :click-handler="changePage"
    :page-count="pagesCount"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination d-flex justify-content-center'"
    :page-class="'page-item'"
  >
  </paginate>
  
</template>

<style >
tr, button{
  font-weight: 600;
}

.bg-delete{
  background-color: rgb(224, 0, 0);
}

.bg-update{
  background-color: rgb(12, 143, 0);
}

</style>
