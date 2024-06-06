<script >
import App from '@/App.vue'
import DeleteUserDW from '../components/DeleteUserDW.vue'
import UpdateUserDW from '../components/UpdateUserDW.vue'


export default {
  data(){
    return{
      imagePath: this.user.photo,
      dialogUpdate: false
    }
  },
  components: {DeleteUserDW, UpdateUserDW},
  props: {
    user:{
      type: Object,
      required: true
    }
  },methods:{
    updateUserAfterDelete(){
      this.$emit(updateUserAfterDelete)
    }
  }
}
</script>

<template >
  <div class="border-radius bg-employee p-0 pt-3 d-flex flex-column  m-0 justify-content-center" >
    <img :src=imagePath >
    
    <table class="text-align-center">
      <tr>
        <td> 
            <span>ФИО</span>
        </td>
        <td> 
          <span>{{ user.surname }} {{ user.name }} {{ user.patron }}</span>
    
        </td>
      </tr>

      <tr>
        <td> 
          <span>Дата рождения</span>
        </td>
        <td> 
          {{ user.birthday.substring(0, 10) }}
        </td>
      </tr>

      <tr>
        <td> 
          <span>Номер телефона</span>
        </td>
        <td> 
          {{ user.phone }}
        </td>
      </tr>
      <tr>
        <td> 
          <span>Email</span>
        </td>
        <td> 
          {{ user.email }}
        </td>
      </tr>
    </table>
    
    <div class="row m-0">
      
      <DeleteUserDW :id="user.id" @updateUserAfterDelete="updateUserAfterDelete"></DeleteUserDW>

      <UpdateUserDW :user="user"></UpdateUserDW>
    </div>
    
  </div>
</template>

<style>


.border-radius {
    border: none;
    border-radius: 8px;
}


.bg-employee {
  /* background: linear-gradient(135deg, rgb(73, 106, 255), rgb(0, 40, 92)); */
  background-color: #eee;
}


@media screen and (min-width: 1420px){
  tr{
    display: flex;
    justify-content: space-between;
    margin: 2vh 2vw 2vh 2vw;
    word-wrap: break-word;
  }

}

@media screen and (max-width: 1420px){
  tr{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 2vh 2vw 2vh 2vw;
    word-wrap: break-word;
  }
}


img{
  border-radius: 30px;
}
</style>
