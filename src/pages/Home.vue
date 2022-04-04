<template>
    <div class="container">
        <section class="m-5">
            <h2 class="text-center m-5"> Lista de usuários cadastrados </h2>
            <div class="list-group">
                <div v-for="user in registeredUsers" :key="user.id" class="list-group-item d-inline-flex justify-content-between">
                   <div>
                        <span>
                            <i class="bi bi-file-person-fill mx-1"></i>
                            <strong class="username">{{ user.email }}</strong>
                        </span> 
                   </div>
                   <div>
                       <span>
                           <a class="btn bg-info mx-1" :href="'/view?user_id=' + user.id"><i class="bi bi-file-text-fill mx-1"></i>Visualizar</a>
                       </span>
                       <span>
                           <a class="btn bg-primary mx-1"  :href="'/edit?user_id=' + user.id"><i class="bi bi-pencil-fill mx-1"></i>Editar</a>
                       </span> 
                       <span>
                           <a class="btn bg-danger mx-1" @click='deleteUser(user.id)'><i class="bi bi-trash-fill mx-1"></i>Apagar</a>
                       </span>
                   </div>
                </div>
                <div class="card-footer text-center m-5">
                        <a class="btn bg-success" href="/register"><i class="bi bi-plus mx-1"></i> Novo Cadastro </a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import axios from 'axios'
import sweetalert2 from 'sweetalert2'

export default {
    name: 'HomePage',

    data() {
        return {
            registeredUsers: "",
        }
    },

    mounted () {
        axios
        .get('http://127.0.0.1:8000/api/users')
        .then(response => (this.registeredUsers = response.data["Registered users"]))
        .catch(() => sweetalert2.fire('Erro ao tentar orocessar dados', '', 'error'))
    },

    methods: {
        deleteUser (user_id) {
            this.alertModal(user_id)
        },

        alertModal(user_id) {
            sweetalert2.fire({
                title: 'Deseja excluir esse registro?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Sim',
                denyButtonText: 'Não',
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios
                        .delete(`http://127.0.0.1:8000/api/users/${user_id}`)
                        .then(() => {
                            sweetalert2.fire('Usuário excluído!', '', 'success')
                            location.reload()
                        })
                        .catch(() => sweetalert2.fire('Erro ao tentar efetuar operação', '', 'error'))
                            

                } else if (result.isDenied) {
                    sweetalert2.fire('Operação cancelada', '', 'info')
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
