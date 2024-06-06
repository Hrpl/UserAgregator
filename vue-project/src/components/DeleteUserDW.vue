<script>
import App from '@/App.vue';
import {deleteUserAPI} from "../../services/api-service"

export default{
    data(){
        return{
            dialogDelete: false
        }
    },
    props:{
        id: {
            type: String,
            required: true
        }
    },
    methods: {
        deleteUser(){
            this.dialogDelete = false
            deleteUserAPI(this.id)
            //
        },
    }
}
</script>

<template>
<!-- Диалог удаления пользователя -->
<div >
        <button @click="dialogDelete = true" class="btn my-2 text-light col-12 bg-delete ">
          Удалить
        </button>

        <v-dialog
          v-model="dialogDelete"
          width="auto"
        >
            <v-card
              max-width="600"
              prepend-icon="mdi-update"
              text="Все данные о пользователе будут безвозвратно утеряны."
              title="Вы точно хотите удалить пользователя?"
            >
              <template v-slot:actions>
                <div class="d-flex justify-content-end mx-2">
                  <button
                  class="bg-delete btn text-light"
                  @click="deleteUser()"
                >Да</button>

                  <button
                    class="btn bg-update text-light mx-2"
                    @click="dialogDelete = false"
                  >Нет</button>
                </div>
                
              </template>
            </v-card>
          </v-dialog>
      </div>
</template>

<style scoped>

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