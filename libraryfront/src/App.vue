<template>
  <header class="cabecera">
    <div id="logo">
      <img src="./assets/image.png" alt="Logo" />
      <h3>Librería Misión Tic</h3>
    </div>
        <div class="usuario">
        </div>
    <div class="usuario">
    </div>
    <div class="usuario">
      <h3 v-on:click="loadWelcome" v-if="!isAuth">HOME</h3>
      <h3 v-on:click="loadProfile" v-if="isAuth">Perfil</h3>
    </div>
    <div class="usuario">
      <h3 v-on:click="loadSignUp" v-if="!isAuth">SING UP</h3>
      <h3 v-on:click="loadLogin" v-if="isAuth">LOGIN</h3>
    </div>
  </header>    
  <div id="content">
    <router-view
      v-on:completedLogin="completedLogin"
      v-on:completedSignUp="completedSignUp"
      v-on:logOut="logOut"
    >
    </router-view>
  </div>
  

  <footer id="footer">
      <h4>Contact: library@misiontic2022.mi<br>Number: 1234567890</h4>
  </footer>
</template>

<script>
export default {
  name: "App",

  data:function(){
    return {
      isActive : false,
    };
  }, 
  components : {},

  methods: {
    verifyAuth: function() {
      this.isAuth = localStorage.getItem("isAuth") || false;
      if (this.isAuth == false) {
        this.$router.push({ name: "Login" });
      } else {
        this.$router.push({ name: "Books" });
      }
    },
    loadLogin: function() {
      this.$router.push({ name: "Login" });
    },
    loadSignUp: function() {
      this.$router.push({ name: "Singup" });
    },
    loadWelcome: function() {
      this.$router.push({ name: "Welcome" });
    },
    loadBookdetailS: function() {
      this.$router.push({ name: "Bookdetails" });
    },
    loadBookdetailR: function() {
      this.$router.push({ name: "Bookdetailr" });
    },
    logOut: function() {
      this.verifyActive();
      this.$router.push({ name: "Login" });
    },
    completedLogin: function() {
    },
    completedSignUp: function() {
      alert("Registro exitoso")
    },
    created: function() {
      this.verifyAuth();
    },

  }
  
}
</script>

<style>
@font-face {
  font-family: "Baskerville Old Face";
  src: url(./fonts/BaskervilleOldFaceV2.ttf) format('truetype');
}
* {
  margin: 0;
  padding: 0;
  font-family: "Baskerville Old Face";
  font-weight: 100;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

#app {
  display: grid;
  height: 100%;
  grid-template-rows: auto; 
}

.cabecera {
  display: grid;
  min-width: 500px;
  grid-template-columns: 3fr 7fr 1fr 1fr 1fr;
  background-color: rgb(92, 2, 2);
  color: white;
  transition: 0.5s ease-in;
  padding: 7px;
}
#logo{
  display: grid;
  grid-template-columns: 0.5fr 2fr;
}

#logo img {
  cursor: pointer;
  margin: auto;
  width: 40px;
}
#logo h3{
  margin: 0%;
  text-align: initial;
  padding: 5% 0% 5% 0;
  font-size: 20px;
}

.usuario h3 {
  text-decoration: none;
  align-content: center;
  padding-top: 15%;
  margin-right: 10px;
  text-align: center;
  cursor: pointer;
}
#footer{
  background-color: rgb(92, 2, 2);
  color: white;
}

#footer h4{
  text-align: center;
  margin: 12px;
}

</style>
