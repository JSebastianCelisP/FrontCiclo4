<template>
    <main id="main">
        <form class= "formulario-uno" v-on:submit.prevent="processLogin">
            <div>
                <h2>SING-UP</h2>
                <input type="text" name="usuario" placeholder="USERNAME" v-model="user.username">
                <input type="text" name="name" placeholder="NAME">
                <input type="text" name="email" id="email" placeholder="E-MAIL">
                <input type="password" name="pass" placeholder="PASSWORD" v-model="user.password">
                <input type="password" name="passC" placeholder="CONFIRM PASSWORD">
                <button class="editar" type="submit">GO</button>
            </div>
        </form>
    </main>
</template>

<script>
export default {
  name: 'SingUp',

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
form {
      padding: 5%;
      display: grid;
      align-content: center;
      margin: 5% 31%;
  }

  form div{
      display: grid;
      grid-template-rows: auto;
      border-radius: 20px;
      padding: 5%;
      background-color: rgb(238, 230, 230);
      box-shadow: 20px 20px 18px rgb(112, 112, 112);
  }
  form h2{
      text-align: center;
      font-size: 40px;
  } 

  .img {
      margin: auto;
      padding-bottom: 20px;
  }

  form input,button{
      text-align: center;
      border-radius: 50px;
      border-color: rgb(255, 255, 255);
      margin: 12px 10%;
      padding: 2%;
      }
  form input:focus,button:focus{
      border-color: white;
  }

  form input:active,button:active{
      border-color: white;
  }

  form button{
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
</style>