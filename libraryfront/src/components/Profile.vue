<template>
  <main id="profile">
    <form class= "formulario-uno" v-on:submit.prevent="confirmUpdate">
            <div>
                <h2><span>{{userDetailById.username}}</span></h2>
                <input type="text" name="name" placeholder="NAME" v-model="updateUser.nombre">
                <input type="text" name="email" id="email" placeholder="E-MAIL" autocomplete="off" v-model="updateUser.email">
                <input type="password" name="pass" placeholder="PASSWORD" autocomplete="off" v-model="updateUser.password">
                <input type="password" name="passC" placeholder= "CONFIRM PASSWORD" v-model="confirmPassword">
                <button class="editar" type="button">EDIT</button>
                <button type="submit" class="editar">CONFIRM</button>
                <button v-on:click="confirmDeletion" type="button" class="borrar">DELETE ACCOUNT</button>
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
    processDeleteUser: async function(){
      await this.$apollo
       .mutate({
         mutation: gql`
          mutation DeleteUser($idUser: Int!) {
            deleteUser(idUser: $idUser)
          }
        `,
        variables: {
          idUser : this.idUser,
        },
       })
       
       .then((result) => {
         alert("successful deletion")
         this.$emit("logOut");
       })
       .catch((error) => {
          if (error.message == "404: Not Found"){
             alert("Account not found");
          }
          else{
            alert("An error has occurred with the server.\nplease try again later")
          }
       });
    },
    
    confirmDeletion: function(){
      if (confirm('Are you sure to delete this account?') === true){
        this.processDeleteUser();
      }
    },
    
    processUpdateUser: async function(){
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
         if(error.message == "400: Bad Request"){
           alert("enter a valid email\nthe username or email may already exist");  
         }
         else if (error.message == "404: Not Found"){
            alert("Account not found");
         }
         else{
           alert("An error has occurred with the server.\nplease try again later")
         }
       });   
    },

    confirmUpdate: function(){
      if (confirm('Are you sure to update this account?') === true){
        if(this.updateUser.password == this.confirmPassword){
          this.processUpdateUser();
        }
        else{
          alert("Passwords do not match")
        }
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

  .borrar{
      cursor: pointer;
      padding: 1.5% 7%;
      background-color: rgb(149, 246, 209);
      border-style: none;
  }

  .borrar:hover{
      background-color: rgb(3, 112, 70);
      color: white;

  }
</style>