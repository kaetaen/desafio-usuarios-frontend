<template>
    <div class="form-content d-flex justify-content-around my-5"> 
        <form style="width: 500px">
            <div class="form-row">
                <div class="form-group col-md-8 my-3">
                     <img :src="photo" width="350">
                </div>
                <div class="form-group col-md-8 my-3">
                    <label for="inputName4">Nome</label>
                    <input v-model="name" type="text" class="form-control" id="inputName4" placeholder="Nome" readonly>
                </div>
                <div class="form-group col-md-8 my-3">
                    <label for="inputEmail4">Email</label>
                    <input v-model="email" type="email" class="form-control" id="inputEmail4" placeholder="example@email.com" readonly>
                </div>
                <div class="form-group col-md-8  my-3">
                    <label for="inputPassword4">Senha</label>
                    <input v-model="password" type="password" class="form-control" id="inputPassword4" placeholder="Senha" readonly>
                </div>
                 <div class="form-group col-md-8  my-3">
                    <label for="inputPhone4">Telefone</label>
                    <input v-model="phone" type="text" class="form-control" id="inputPhone4" placeholder="00 00000 0000" readonly>
                </div>      
            </div>
        </form>
    </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ViewRegister',
  
  data() {
      return {
            name:'',
            phone:'',
            email:'',
            password:'',
            photo:'',
            selPhoto:''
        }
  },
   mounted () {
        const userId = this.$route.query.user_id
        axios
        .get('http://127.0.0.1:8000/api/users/' + userId)
        .then(response => {
            const userData = response.data["User data"][0]
            this.name=userData.name
            this.phone=userData.phone
            this.email=userData.email,
            this.password=userData.password,
            this.photo=userData.photo
            
        })
   },
}
</script>

<style scoped>
    .form-content {
        display: flex;
    }
</style>
