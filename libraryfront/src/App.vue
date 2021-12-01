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
      <h3 v-on:click="loadLogin" v-if="isAuth">Ingresar</h3>
      <h3 v-on:click="loadProfile" v-if="isAuth">Perfil</h3>
    </div>
    <div class="usuario">
      <h3 v-on:click="loadSignUp" v-if="isAuth">SingUp</h3>
      <h3 v-on:click="loadLogin" v-if="!isAuth">LogIn</h3>
    </div>
  </header>
  <div id="main">
    
    <div id="content">
      <rooter-view 
      v-on:completedLogin="completedLogin"
      v-on:completedSignUp="completedSignUp"
      v-on:logOut="logOut">
      </rooter-view>
    </div>
  </div>

  <div id="footer">
      <h4>Contact: library@misiontic2022.mi<br>Number: 1234567890</h4>
  </div>
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
        this.$router.push({ name: "LogIn" });
      } else {
        this.$router.push({ name: "BookS" });
      }
    },
    loadLogin: function() {
      this.$router.push({ name: "LogIn" });
    },
    loadSignUp: function() {
      this.$router.push({ name: "SingUp" });
    },
    loadProfile: function() {
      this.$router.push({ name: "Profile" });
    },
    loadBookS: function() {
      this.$router.push({ name: "BookS" });
    },
    loadBookR: function() {
      this.$router.push({ name: "BookR" });
    },
    logOut: function() {
      localStorage.clear();
      this.verifyActive();
      this.$router.push({ name: "LogIn" });
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
* {
  margin: 0;
  padding: 0;
  font-family:;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

#app {
  display: grid;
  grid-template-rows: 1fr 9fr 1fr;
  width: 100%;
}

.cabecera {
  display: grid;
  min-width: 500px;
  grid-template-columns: 3fr 7fr 1fr 1fr 1fr;
  background-color: rgb(92, 2, 2);
  color: white;
  transition: 0.5s ease-in;
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
  padding-top: 10%;
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
