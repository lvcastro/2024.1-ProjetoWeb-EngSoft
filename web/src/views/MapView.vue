<script setup lang="ts">
import MapComponent from '../components/MapComponent.vue'
import SidebarComponent from '../components/SideBarComponent.vue'
</script>

<template>
  <div class="bg-lightyellow">
    <div class="container-fluid lato">
      <div class="row ">
        <div class="col-md-3">
            <SidebarComponent />
        </div>
        
        <div class="col-md-9 d-block m-0">
          <MapComponent />
        </div>
      </div>
    </div>
  </div>
</template>