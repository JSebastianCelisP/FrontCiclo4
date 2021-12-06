<template>
    <main id="login">
        <form class= "formulario-login" v-on:submit.prevent="processLogin">
            <div>
                <h2>LOGIN</h2>
                <input type="text" name="email" id="email" placeholder="E-MAIL">
                <input type="password" name="pass" placeholder="PASSWORD" v-model="user.password">
                <button class="editar" type="submit">GO</button>
            </div>
        </form>
      </main>
</template>

<script>
export default {
  name: 'Login',

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
 .formulario-login{
   height: 450px;
 }

</style>