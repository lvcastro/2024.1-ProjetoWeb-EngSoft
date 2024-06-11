<template>
    <div class="bg-lightyellow dark-green lato">
        <h1 class="text-center my-3">Gerenciar administradores</h1>
        <div class="container border border-2 border-black rounded">
            <div class="row px-2 py-4 attributes">  
                <div class="col-md-5">Nome</div>
                <div class="col-md-5">Email</div>
                <div class="col-md-2">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#modalAdd">
                        <span class="material-symbols-outlined">add_circle</span>
                    </button>
                </div>
            </div>
            
            <div v-for="admin in admins" :key="admin.id" class="row p-2">
                <div class="col-md-5">
                    <p>{{ admin.name }}</p>
                </div>
                <div class="col-md-5">
                    <p>{{ admin.email }}</p>
                </div>
                <div class="col-md-2">
                    <button type="button" @click="setCurrentAdmin(admin)" data-bs-toggle="modal" data-bs-target="#modalEditar">
                        <span class="material-symbols-outlined">edit</span>
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Modal Adicionar -->
        <div class="modal fade" tabindex="-1" id="modalAdd" aria-labelledby="modalAddLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-white bg-green3">
                        <h2 class="modal-title" id="modalAddLabel">Adicionar Administrador</h2>
                    </div>
                    <div class="modal-body dark-green bg-lightyellow">
                        <form>
                            <div class="mb-3">
                                <label for="add_name" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="add_name" required>
                            </div>
                            <div class="mb-3">
                                <label for="add_email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="add_email" required>
                            </div>
                            <div class="mb-3">
                                <label for="add_password" class="form-label">Senha</label>
                                <input type="password" class="form-control" id="add_password" required>
                            </div>
                            <button type="submit" class="btn text-white bg-green3 m-1" @submit.prevent="addAdmin()">Adicionar</button>
                            <button type="button" class="btn text-white bg-green3 m-1" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Editar -->
        <div class="modal fade" tabindex="-1" id="modalEditar" aria-labelledby="modalEditarLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-white bg-green3">
                        <h2 class="modal-title" id="modalEditarLabel">Editar Administrador</h2>
                    </div>
                    <div class="modal-body dark-green bg-lightyellow">
                        <form>
                            <div class="mb-3">
                                <label for="change_name" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="change_name" required>
                            </div>
                            <div class="mb-3">
                                <label for="change_email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="change_email" required>
                            </div>
                            <div class="mb-3">
                                <label for="change_password" class="form-label">Senha</label>
                                <input type="password" class="form-control" id="change_password" required>
                            </div>
                            <button type="submit" class="btn text-white bg-green3 m-1" @submit.prevent="addAdmin">Salvar</button>
                            <button type="button" class="btn text-white bg-green3 m-1" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
</template>
<style scoped>
    .attributes{
        background-color: #39878b;
        color: white;
        border-top: 1px solid black;
    }
    .bg-green3{
        background-color: #39878b;
    }
    .btn:hover{
        background-color: #39878b;
    }
</style>
<script>
    export default {
        data() {
            return {
                admins: [
                    { name: "Geraldo Fernandes da Silva", email: "geraldofs234@gmail.com", password: "senha123" },
                    { name: "Arnaldo Gonçalves Siqueira", email: "arnaldinhosiqueira55@gmail.com", password: "senha456" },
                    { name: "Vinícius Ferreira de Moraes", email: "viniferreiramoraes@gmail.com", password: "senha789" },
                ],
                newAdmin: {
                    name: "",
                    email: "",
                    password: "",
                },
                currentAdmin: null,
            };
        },
        methods: {
            addAdmin() {
                // ta faltando coisa aqui
            },
            setCurrentAdmin(admin) {
                this.currentAdmin = { ...admin };
            },
            updateAdmin() {
                // ta faltando coisa aqui
                this.currentAdmin = null;
            },
        },
    };
</script>
