<template>
    <main id="main">
        <form class= "formulario-uno" v-on:submit.prevent="processLogin">
            <div>
                <h2>LOGIN</h2>
                <input type="text" name="email" id="email" placeholder="E-MAIL">
                <input type="password" name="pass" placeholder="PASSWORD" v-model="user.password">
                <button class="editar" type="submit">GO</button>
            </div>
        </form>
      </main>
    </main>
</template>

<script>
export default {
  name: 'LogIn',

  data: function(){
    return {
      user: {
        email : "",
        password : ""
      }

    }
  },
  methods:{
    processLogin:function(){
      
    }
  }
}
</script>

<style>
        
</style>