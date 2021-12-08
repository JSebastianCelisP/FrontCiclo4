<template>
  <main id="profile">
    <form class= "formulario-uno" v-on:submit.prevent="processUpdateUser">
            <div>
                <h2><span>{{userDetailById.username}}</span></h2>
                <input type="text" name="name" placeholder="NAME" v-model="updateUser.nombre">
                <input type="text" name="email" id="email" placeholder="E-MAIL" autocomplete="off" v-model="updateUser.email">
                <input type="password" name="pass" placeholder="PASSWORD" autocomplete="off" v-model="updateUser.password">
                <input type="password" name="passC" placeholder= "CONFIRM PASSWORD" v-model="updateUser.confirmPassword">
                <button class="editar" type="submit">EDIT</button>
                <button v-on:click="processUpdateUser" class="editar" type="submit">CONFIRM</button>
            </div>
      </form>
  </main>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: 'Profile',

  data: function(){
    return {
      idUser: parseInt(localStorage.getItem("idUser")),
      userDetailById: {
        email   : "",
        username: "",
        nombre  : "",
        password: "",    
      },

      updateUser:{
        email   : "",
        nombre  : "",
        password: ""
      },

      confirmPassword: ""
    };
  },
  
  methods: {
    processUpdateUser: async function(){
      if(this.updateUser.password == this.confirmPassword){
        await this.$apollo
         .mutate({
           mutation: gql`
             mutation Mutation($userUpdateInput: userUpdateInput!, $idUser: Int!) {
                updateUser(userUpdateInput: $userUpdateInput, idUser: $idUser) {
                  username
                  nombre
                  email
                }
              }
           `,
           variables: {
             userUpdateInput: this.updateUser,
             idUser         : this.idUser,
           },
         })
         
         .then((result) => {
           alert("successful update")
         })
         .catch((error) => {
           alert("ERROR 401: Invalid credentials.");
         });
      }
      else{
        alert("Passwords do not match")
      }   
    }
  },
  
  apollo: {
    userDetailById: {
      query: gql`
        query Query($idUser: Int!) {
          userDetailById(idUser: $idUser) {                  
            username                      
          }
        }
      `,

      variables() {
        return{
          idUser: this.idUser,
        };        
      }       
    },
  }
};
</script>

<style>
  #profile{
    height: 630px;
  }
</style>