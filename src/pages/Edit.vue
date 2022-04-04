<template>
    <div class="form-content d-flex justify-content-around my-5"> 
        <form style="width: 500px">
            <div class="form-row">
                <div class="form-group col-md-8 my-3">
                     <img :src="photo" width="350">
                </div>
                <div class="form-group col-md-8">
                    <label for="inputPhoto4">Foto</label>
                    <input @change="onFileSelected" type="file" class="form-control" id="inputPhoto4" placeholder="Foto" required>
                </div>
                <div class="form-group col-md-8 my-3">
                    <label for="inputName4">Nome</label>
                    <input v-model="name" type="text" class="form-control" id="inputName4" placeholder="Nome" required>
                </div>
                <div class="form-group col-md-8 my-3">
                    <label for="inputEmail4">Email</label>
                    <input v-model="email" type="email" class="form-control" id="inputEmail4" placeholder="example@email.com" required>
                </div>
                <div class="form-group col-md-8  my-3">
                    <label for="inputPassword4">Senha</label>
                    <input v-model="password" type="password" class="form-control" id="inputPassword4" placeholder="Senha" required>
                </div>
                 <div class="form-group col-md-8  my-3">
                    <label for="inputPhone4">Telefone</label>
                    <input v-model="phone" type="text" class="form-control" id="inputPhone4" placeholder="00 00000 0000" required>
                </div>
                 
            </div>
            <div class="my-3">
                <button @click="onUpload" class="btn btn-primary">Salvar</button>
            </div>
        </form>
    </div>
</template>

<script>

import axios from 'axios'
import sweetalert2 from 'sweetalert2'


export default {
  name: 'EditRegister',
  
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

  methods: {
      onFileSelected(event) {
          this.selPhoto = event.target.files[0]
      },

      onUpload(event){
        event.preventDefault()

        if (this.validateData()) {
            const userId = this.$route.query.user_id
            const fd = new FormData()

            fd.append('photo', this.selPhoto, this.selPhoto.name)
            fd.append('name', this.name)
            fd.append('email', this.email)
            fd.append('password', this.password);
            fd.append('phone', this.phone)



            axios.post('http://127.0.0.1:8000/api/users_edit/' + userId, fd)
                .then(() =>   sweetalert2.fire('Dados Salvos com sucesso!', '', 'success'))
                .catch(() =>  sweetalert2.fire('Erro ao processar dados!', '', 'error'))
        } else {
           sweetalert2.fire('Verifique os dados informados!', '', 'error')
        }
      },

      validateData() {
          const dataList = [
            this.name,
            this.email,
            this.selPhoto,
            this.password,
            this.phone
        ]
        const validData = dataList.every((e) => {
            if (e)
                return e
        })

        return validData
      }
  }
}
</script>

<style scoped>
    .form-content {
        display: flex;
    }
</style>
