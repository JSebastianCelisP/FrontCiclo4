<template>
    <main id="main">
      <div id="search">
        <input type="search" placeholder="search your next book" v-model="title">
      </div>
      <div class="buttonSearch">
        <button v-on:click="searchBookR">search</button>   
      </div>
      <div class="buttonCreate">
        <button v-if="isAdmin" v-on:click="createBook">create book</button>
      </div>
      <div id="bookC">
        <div class="card-p">
          <div v-for="item in booksRList" v-bind:key="item" class="card-info">
            <img class="card-img" src="{{item.cover}}" alt="Sira">
            <h3>{{item.title}}</h3>
            <h3>Author: {{item.author}}</h3>
            <button v-on:click="loadBookR(item.idBookR)">RENT NOW!</button>
          </div>
        </div>
      </div>
    </main>
</template>


<script>
import gql from "graphql-tag";

export default {
  name: 'BookR',

  data: function(){
    return{
      booksRList: [],

      bookRDetailByTitle: {
        idBookR    : 0,
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

    loadBookR: function(id){
      if(id != 0){
        this.$emit("loadBookdetailR", id);
      }
      else{
        alert("book not found")
      }
    },

    searchBookR: function(){
      if(this.bookRDetailByTitle != null){
        this.$emit("loadBookdetailR", this.bookRDetailByTitle.idBookR);
      }
      else{
        alert("book not found")
      }
    },

    createBook: function(){
      this.$emit("loadCreateBookR")
    }
  },

  apollo: {
    booksRList: {
      query: gql`
        query Query($idUser: Int!) {
          booksRList(idUser: $idUser) {
            idBookR
            bookCover
            title
            units
            author
            description          
          }
        }
      `,
      
      variables(){
        return{
          idUser: parseInt(localStorage.getItem("idUser")),
        };
      }
    },

    bookRDetailByTitle: {
      query: gql`
        query Query($title: String!, $idUser: Int!) {
          bookRDetailByTitle(title: $title, idUser: $idUser) {
            idBookR
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
    this.$apollo.queries.booksRList.refetch();
    this.$apollo.queries.bookRDetailByTitle.refetch()
  }
}
</script>

<style>

</style>