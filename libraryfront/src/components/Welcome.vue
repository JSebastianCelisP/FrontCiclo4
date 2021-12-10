<template>
    <main id="welcome">
        <figure v-on:click="loadBookR">
            <img src="../assets/bookR.webp" alt="img">
            <div class="texto">
                <h3>RENT BOOK</h3>
            </div>
        </figure>
        <figure v-on:click="loadBookS">
            <img src="../assets/bookS.webp" alt="img">
            <div class="texto">
                <h3>NEW BOOK</h3>
            </div>
        </figure>
        <figure v-on:click="loadBookH">
            <img src="../assets/history.webp" alt="">
            <div class="texto">
                <h3>HISTORY</h3>
            </div>
        </figure>
        <figure v-on:click="loadProfile">
            <img src="../assets/profile.webp" alt="">
            <div class="texto">
                <h3>PROFILE</h3>
            </div>
        </figure>
  </main>
</template>

<script>
  import gql from "graphql-tag";

  export default {
    name: 'Welcome',
    
    data:function(){
        return {
            userDetailById: {
                rol: "",
            }          
        };
    }, 
 
    methods: {  
        loadBookS: function() {
            this.$router.push({ name: "Books" });
        },
        loadBookR: function() {
            this.$router.push({ name: "Bookr" });
        },
        loadBookH: function() {
            this.$router.push({ name: "Bhistory" });
        },        
        loadProfile: function() {
            this.$router.push({ name: "Profile" });
        },

        loadRol: function() {
            localStorage.setItem("rol", this.userDetailById.rol)
        }
    },
    
    apollo: {
        userDetailById:{
            query: gql`
                query Query($idUser: Int!) {
                    userDetailById(idUser: $idUser) {                       
                        rol
                    }
                }
            `,

            variables(){
                return {
                    idUser: parseInt(localStorage.getItem("idUser"))
                };
            }
        }
    },

    created: function(){
        this.loadRol();
        this.$apollo.queries.userDetailById.refetch();
    }
}
</script>

<style>
    #welcome{
        display: grid;
        width: 100%;
        height: 550px;
        grid-template-columns: auto auto auto auto;
        align-content: center;
    }

    #welcome figure{
        resize: both;
        position: relative;
        margin: auto;
        padding: 0px 20px;
        background-color: black;
        border-radius: 10px;
        cursor: pointer;
    }

    #welcome figure .texto{
        background-color: rgb(0, 0, 0);
        position: absolute;
        width: 80%;
        height: 100%;
        color: white;
        top: 0px;
        font-size: 20px;
        transition: all 0.3s ease-in-out;
        background-color: rgba(0, 0, 0, 0.671);
        margin-left: 0;
        text-align: center;
        padding-top: 50%;
        text-decoration: overline underline white;
    }

    #welcome figure .texto:hover{
        background-color: rgba(227, 243, 198, 0.568);
        transition: all 0.3s ease-in;
        color: rgb(0, 0, 0);
        text-decoration: overline underline rgb(0, 0, 0);
    }

    #welcome figure:hover {
        transition: all 0.3s ease-in;
        /* background-color: rgb(41, 2, 2); */
        box-shadow: 20px 20px 18px rgba(0, 0, 0, 0.438);
        zoom: 1.1;
    }


    
</style>