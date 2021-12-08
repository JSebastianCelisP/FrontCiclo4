<template>
    <main id="login">
      <form class= "formulario-login" v-on:submit.prevent="processLogin">
        <div>
          <h2>LOGIN</h2>
          <input type="text" name="email" id="email" placeholder="E-MAIL" v-model="user.email">
          <input type="password" name="pass" placeholder="PASSWORD" v-model="user.password">
          <button v-on:click="processLogIn" class="editar" type="submit">GO</button>
        </div>
      </form>
    </main>
</template>

<script>
import gql from "graphql-tag";

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
  
  methods: {
    processLogIn: async function(){
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($credentials: credentialsInput!) {
              logIn(credentials: $credentials) {
                refresh
                access
              }
            }
          `,

          variables: {
            credentials: this.user,
          },
        })
        
        .then((result) => {
          let dataLogIn = {
            email: this.user.email,
            token_access: result.data.logIn.access,
            token_refresh: result.data.logIn.refresh,
          };
          this.$emit("completedLogin", dataLogIn);
        })

        .catch((error) => {
          alert("ERROR 401: Invalid credentials.");
        });
    }
  }
};
</script>

<style>
 .formulario-login{
   height: 450px;
 }

</style>