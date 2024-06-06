<script>
import {sortData, filterData} from "../../services/data-manipulation"
import {addUserAPI, getUsersAPI} from "../../services/api-service"


export default {
    data(){
        return{
            dialogAdd: false,
            user: {},
            users: [],
            sortValue: "",
            filterValue: ""
        }
    },
    methods:{
        closeButton(){
            this.dialogAdd = false
            location.reload()
        },
        addUser(){
            this.dialogAdd = false
            addUserAPI(this.user)
            location.reload()
            this.user = {}
        },
        async sort(){
            await getUsersAPI().then(res => this.users = res)
           
            this.users = sortData(this.users, this.sortValue)
            if(this.filterValue.length > 0){
                this.users = filterData(this.users, this.filterValue)
            }

            console.log(this.users)
        },
        async filter(){
            await getUsersAPI().then(res => this.users = res)
            this.users = filterData(this.users, this.filterValue)
            if(this.sortValue.length > 0){
                this.users = sortData(this.users, this.sortValue)
            }
            console.log(this.users)
        }
    }
}
</script>

<template>
    <div class="row m-2">
        <div class="col-9 mt-2 p-0 align-items-center">
            <label class="mx-3">Сортировать</label>
            <select v-model="sortValue" @change="sort">
                <option value="asc" default>По возрастанию д/р </option>
                <option value="desc">По убыванию д/р </option>
            </select>

            <label class="mx-4">Фильтровать</label>
            <select v-model="filterValue" @change="filter">
                <option value="м">Мужчины</option>
                <option value="ж">Женщины</option>
            </select>
        </div>
        <div class="col-3 d-flex justify-content-end">
            <button @click="dialogAdd = true" class="btn my-2 text-light col-6 bg-update">
            
            <span class="p-0 ">Добавить пользователя <span style="font-size: 20px;">+</span></span>
            </button>

            <v-dialog
            v-model="dialogAdd"
            width="auto"
            >
                <v-card
                max-width="500"
                prepend-icon="mdi-update"
                title="Добавить пользователя"
                >
                <div class="row m-2">
                    <label class="col-3 m-2" >Фамилия</label>
                    <input type="text" class="col-8 m-2" v-model="user.surname" required>

                    <label class="col-3 m-2" >Имя</label>
                    <input type="text" class="col-8 m-2" v-model="user.name" required>

                    <label class="col-3 m-2" >Отчество</label>
                    <input type="text" class="col-8 m-2" v-model="user.patron" required>

                    <label class="col-3 m-2" >День рождения</label>
                    <input type="date" class="col-8 m-2" v-model="user.birthday" required>

                    <label class="col-3 m-2" >Телефон</label>
                    <input type="text" class="col-8 m-2" v-model="user.phone" required>
                    
                    <label class="col-3 m-2" >Email</label>
                    <input type="email" class="col-8 m-2" v-model="user.email" required>

                    <label class="col-3 m-2" >Пол</label>
                    <select type="text" class="col-8 m-2" v-model="user.male">
                        <option value="м">Мужской</option>
                        <option value="ж">Женский</option>
                    </select>

                    <div class="d-flex justify-content-evenly">
                    <button
                    class="bg-success btn text-light m-2"
                    @click="addUser()"
                    >Добавить</button>

                    <button
                        class="btn bg-danger text-light m-2"
                        @click="closeButton()"
                    >Закрыть</button>
                    </div>
                </div>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<style></style>