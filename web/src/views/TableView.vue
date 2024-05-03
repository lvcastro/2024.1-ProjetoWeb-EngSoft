<template>
    <div class="bg-lightyellow dark-green lato">
        <h1 class="text-center my-3">Gerenciar administradores</h1>
        <div class="container border border-2 border-black rounded">
            <div class="row px-2 py-4 attributes">  
                <div class="col-md-4">
                    Nome
                </div>
                <div class="col-md-4">
                    Email
                </div>
                <div class="col-md-3">
                    CPF
                </div>
                <div class="col-md-1">
                    <button type="button" data-bs-toggle="modal" data-bs-target="#modalAdicionar"><span class="material-symbols-outlined">add_circle</span></button>
                </div>
            </div>
            
            <div class="row p-2">   
                <div class="col-md-4">
                    <p>Geraldo Fernandes da Silva</p>
                </div>
                <div class="col-md-4">
                    <p>geraldofs234@gmail.com</p>
                </div>
                <div class="col-md-3">
                    <p>961.836.290-65</p>
                </div>
                <div class="col-md-1">
                    <button type="button"><span class="material-symbols-outlined">edit</span></button>
                </div>
            </div>
            <div class="row p-2">   
                <div class="col-md-4">
                    <p>Arnaldo Gonçalves Siqueira</p>
                </div>
                <div class="col-md-4">
                    <p>arnaldinhosiqueira55@gmail.com</p>
                </div>
                <div class="col-md-3">
                    <p>432.808.980-30</p>
                </div>
                <div class="col-md-1">
                    <button type="button"><span class="material-symbols-outlined">edit</span></button>
                </div>
            </div>
            <div class="row p-2">   
                <div class="col-md-4">
                    <p>Vinícius Ferreira de Moraes</p>
                </div>
                <div class="col-md-4">
                    <p>viniferreiramoraes@gmail.com</p>
                </div>
                <div class="col-md-3">
                    <p>688.773.130-48</p>
                </div>
                <div class="col-md-1">
                    <button type="button"><span class="material-symbols-outlined">edit</span></button>
                </div>
            </div>
        </div>
    </div>
    
</template>
<style>
    .attributes{
        background-color: #39878b;
        color: white;
        border-top: 1px solid black;
    }
</style>