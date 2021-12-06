<template>
  <main id="profile">
    <form class= "formulario-uno" v-on:submit.prevent="processLogin">
            <div>
                <h2>USERNAME</h2>
                <input type="text" name="name" placeholder="NAME">
                <input type="text" name="email" id="email" placeholder="E-MAIL">
                <input type="password" name="pass" placeholder="PASSWORD" v-model="user.password">
                <input type="password" name="passC" placeholder="CONFIRM PASSWORD">
                <button class="editar" type="submit">EDIT</button>
                <button class="editar" type="submit">CONFIRM</button>
            </div>
      </form>
  </main>
</template>

<script>
export default {
  name: 'Profile',

  data: function(){
    return {
      user: {
        
      }
    }
  },

  methods: {
    processSingUp: function(){
      
    }
  }
}
</script>

<style>
  #profile{
    height: 630px;
  }
</style>