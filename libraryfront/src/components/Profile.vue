<template>
  <main id="profile">
      <form class= "form-profile" v-on:submit.prevent="confirmUpdate">
              <div class="data-profile">
                  <h2>{{userDetailById.username}}</h2>
                  <textarea name="name" class="textarea" cols="auto" rows="1" placeholder="NAME" v-model="updateUser.nombre"></textarea>
                  <textarea name="email" class="textarea" cols="auto" rows="1" placeholder="E-MAIL" v-model="updateUser.email"></textarea>
                  <textarea name="password" class="textarea" cols="auto" rows="1" placeholder="PASSWORD" v-model="updateUser.password"></textarea>
                  <textarea name="password" class="textarea" cols="auto" rows="1" placeholder="CONFIRM PASSWORD" v-model="confirmPassword"></textarea>
                  <button type="submit" class="button editar">CONFIRM</button>
                  <button v-on:click="confirmDeletion" type="button" class="button borrar">DELETE ACCOUNT</button>
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
            rol                      
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
      min-height: 600px;
    }
    .form-profile {
      padding: 5%;
      display: grid;
      align-content: center;
      margin: 5% 31%;
    }

    .data-profile{
      display: grid;
      grid-template-rows: auto;
      border-radius: 20px;
      padding: 5%;
      background-color: rgb(238, 230, 230);
      box-shadow: 20px 20px 18px rgb(112, 112, 112);
    }
    .form-profile h2{
      text-align: center;
      font-size: 40px;
    } 

    .img {
        margin: auto;
        padding-bottom: 20px;
    }

    .textarea,.button{
        text-align: center;
        border-radius: 50px;
        border-color: rgb(255, 255, 255);
        margin: 12px 10%;
        padding: 2%;
        resize: none;
        }
    .textarea:focus,.button:focus{
        border-color: white;
    }

    .textarea:active,.button:active{
        border-color: white;
    }

    .button{
        padding: 4%;
        margin: 10px auto;
        font-size: larger;
    }

    .editar{
        cursor: pointer;
        padding: 1.5% 7%;
        background-color: rgb(149, 246, 209);
        border-style: none;
    }

    .editar:hover{
        background-color: rgb(3, 112, 70);
        color: white;

    }
    #profile{
    height: 630px;
    }
    .borrar{
        cursor: pointer;
        padding: 1.5% 7%;
        color: rgb(95, 2, 2);
        font-style: oblique;
        border-style: none;
    }
    .borrar:hover{
      background-color: rgb(95, 2, 2);
      color: white;
    }
</style>