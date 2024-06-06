<script>
import {updateUserAPI} from "../../services/api-service"

export default { 
    data(){
        return{
            dialogUpdate: false
        }
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods:{
        updateUser(){
            this.dialogUpdate = false
            updateUserAPI(this.user)
            // location.reload()
        },
        closeButton(){
            this.dialogUpdate = false
            // location.reload()
        }
    }
}
</script>

<template>
<!-- Диалог обновления пользователя -->
    <div>
        <button @click="dialogUpdate = true" class="btn my-2 text-light col-12 bg-update">
          Обновить
        </button>

        <v-dialog
          v-model="dialogUpdate"
          width="auto"
        >
            <v-card
              max-width="500"
              prepend-icon="mdi-update"
              title="Обновить пользователя"
            >
              <div class="row m-2" method="post">
                <label class="col-3 m-2" >Фамилия</label>
                <input type="text" class="col-8 m-2" v-model="user.surname">

                <label class="col-3 m-2" >Имя</label>
                <input type="text" class="col-8 m-2" v-model="user.name">

                <label class="col-3 m-2" >Отчество</label>
                <input type="text" class="col-8 m-2" v-model="user.patron">

                <label class="col-3 m-2" >День рождения</label>
                <input type="date" class="col-8 m-2" v-model="user.birthday">

                <label class="col-3 m-2" >Телефон</label>
                <input pattern="[0-9]{1}[0-9]{3}[-][0-9]{3}[-][0-9]{2}[-][0-9]{2}" type="text" class="col-8 m-2" v-model="user.phone">

                <label class="col-3 m-2" >Email</label>
                <input type="text" class="col-8 m-2" v-model="user.email">

                <label class="col-3 m-2" >Пол</label>
                <select type="text" class="col-8 m-2" v-model="user.male">
                  <option value="м">Мужской</option>
                  <option value="ж">Женский</option>
                </select>

                <div class="d-flex justify-content-evenly">
                  <button
                    class="bg-update btn text-light m-2"
                    
                    @click="updateUser()"
                  >Обновить</button>

                  <button
                    class="btn bg-delete text-light m-2"
                    @click="closeButton()"
                  >Закрыть</button>
                </div>

              </div>
            </v-card>
          </v-dialog>
      </div>

</template>

<style>



</style>