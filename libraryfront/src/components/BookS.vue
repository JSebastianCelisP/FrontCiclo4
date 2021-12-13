<template>
    <main id="main">
      <div id="search">
        <input type="search" placeholder="search your next book" v-model="title"> 
      </div>
      <div class="buttonSearch">
        <button v-on:click="searchBookS">search</button>   
      </div>
      <div class="buttonCreate">
        <button v-if="isAdmin" v-on:click="createBook">create book</button>
      </div>   
      <div id="bookC">
        <div class="card-p" v-for="item in booksSList" v-bind:key="item">          
          <div class="card-info">
            <img v-on:click="loadBookS(item.idBookS)" class="card-img" :src="getImg(item.bookCover)" :alt="item.bookCover">           
            <h3>{{item.title.substring(0,24)}}</h3>
            <h3>A: {{item.author.substring(0,24)}}</h3>
            <button v-on:click="loadBookS(item.idBookS)">BUY NOW!</button>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: 'BookS',

  data: function(){
    return{
      booksSList: [],

      bookSDetailByTitle: {
        idBookS    : 0,
      },

      title: "",

      rol    : localStorage.getItem("rol").toString(),
      isAdmin: false
    }
  },

  methods:{
    veryfyIsAdmin: function(){
      if(this.rol === "Admin"){
        this.isAdmin = true
      }
      else{
        this.isAdmin = false
      }
    },

    loadBookS: function(id){
      if(id != 0){
        this.$emit("loadBookdetailS", id);
      }
      else{
        alert("book not found")
      }
    },

    searchBookS: function(){
      if(this.bookSDetailByTitle != null){
        this.$emit("loadBookdetailS", this.bookSDetailByTitle.idBookS);
      }
      else{
        alert("book not found")
      }
    },

    createBook: function(){
      this.$emit("loadCreateBookS")
    },

    getImg: function(img){
      return require('../assets/' + img + '.webp')
    },
  },

  apollo: {
    booksSList: {
      query: gql`
        query Query($idUser: Int!) {
          booksSList(idUser: $idUser) {
            idBookS
            bookCover
            title
            units
            author
            description
            price            
          }
        }
      `,
      
      variables(){
        return{
          idUser: parseInt(localStorage.getItem("idUser")),
        };
      }
    },

    bookSDetailByTitle: {
      query: gql`
        query Query($title: String!, $idUser: Int!) {
          bookSDetailByTitle(title: $title, idUser: $idUser) {
            idBookS
            bookCover
            title
            units
            author
            description
            price
          }
        }
      `,

      variables(){
        return{
          title : this.title,
          idUser: parseInt(localStorage.getItem("idUser")),
        }
      }
    }
  },  

  created: function(){
    this.veryfyIsAdmin();
    this.$apollo.queries.booksSList.refetch();
    this.$apollo.queries.bookSDetailByTitle.refetch()
  }
}
</script>

<style>
  #main{
    min-height: 550px;
  }

  #bookC{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 5%;

  }

  #search input{
    margin: 20px 40% 0px 40%;
    margin-bottom: -3cm;
    padding: 0px 30px;
    font-size: 20px;
    border-radius: 30px;
  }

  .buttonSearch button{
    margin: 20px 40% 0px 40%;
    margin-bottom: -3cm;
    padding: 0px 40px;
    font-size: 20px;
    border-radius: 30px;
    cursor: pointer;
    position: relative;
    bottom: 47px; left: 300px;
  }

  .buttonCreate button{
    margin: 20px 40% 0px 40%;
    margin-bottom: -3cm;
    padding: 0px 40px;
    font-size: 20px;
    border-radius: 30px;
    cursor: pointer;
    position: relative;
    bottom: 94px; right: 220px;
  }

  #bookC .card-p{
    cursor: pointer;
    margin: 20px;
    zoom: 0.85;
   }
  #bookC .card-p .card-img{
    background-color: black;
  }
  #bookC .card-img{
    height: 318.989px;
    width : 200px;
  }
  #bookC .card-p .card-info{
    display: flex;
    padding: 10px;
    flex-direction: column;
    text-align: center;
    color: white;
    border-radius: 0px 0px 10px 10px;
    background-color: rgba(90, 4, 4, 0.945);
  }
  #bookC .card-p .card-info button{
    cursor: pointer;
    border: none;
    font-size: 20px;
  }
  #bookC .card-p .card-info button:hover{
    cursor: pointer;
    background-color: rgb(34, 194, 127);
    color: white;
  }
</style>