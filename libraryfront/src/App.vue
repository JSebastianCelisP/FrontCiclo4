<template>
  <div id="header">
    <div id="logo">
      <img src="./assets/logoL.png" alt="Logo" />
      <h4>Library Mision TIC 2022</h4>
    </div>
    <div>
    </div>
    <div class="usuario">
      <h3 v-on:click="loadLogin" v-if="isActive">LogIn</h3>
      <h3 v-on:click="loadSignUp" v-if="!isActive">SingUp</h3>
    </div>
  </div>
  
  <div id="main">
    
    <div id="content">
      <rooter-view 
      v-on:completedLogin="completedLogin"
      v-on:completedSignUp="completedSignUp"
      v-on:logOut="logOut"
      v-on:Welcome="loadWelcome">
      </rooter-view>
    </div>

    <div id="aside">
      <ul>
        <li>Profile</li>
        <li>Buy books</li>
        <li>Rent books</li>
        <li>Exit</li>
      </ul>
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
    verifyActive: function() {
      this.isActive = localStorage.getItem("isActive") || false;
      if (this.isActive == false) {
        this.$router.push({ name: "Login" });
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
    loadWelcome: function(){
      this.$router.push({ name: "Welcome" })
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
      this.$router.push({ name: "Login" });
    },
    completedLogin: function() {
    },
    completedSignUp: function() {
      alert("Registro exitoso")
    },
    created: function() {
      this.verifyActive();
    },

  }
  
}
</script>


<style>
  * {
    margin: 0;
    padding: 0;
    font-family: ;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
  }

  #app {
    display: grid;
    width: 100%;
    grid-auto-rows: 1fr 8fr 1fr;
  }
  #header{
    display: grid;
    grid-template-columns: 1fr 6fr 0.5fr;
    background-color: rgb(17, 0, 92);
    color:white;
  }
  #logo{
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
  #header  h4{
    padding: 6%;
  }
  .usuario h3{
    padding: 20%;
    cursor: pointer;
  }
  #main{
    display: grid;
    grid-template-columns: 7fr 1fr;
  }


  #footer{
    background-color: rgb(17, 0, 92);
    color: white;
  }
  #footer > h4{
    margin-top: 1%;
    text-align: center;
  }

</style>