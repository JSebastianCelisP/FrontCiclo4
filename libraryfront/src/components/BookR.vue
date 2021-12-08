<template>
    <main id="main">
      <div id="search">
        <input type="search" placeholder="search your next book" v-model="title">
        <button v-on:click="loadBookR(bookRDetailByTitle.idBookR)">search</button>
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

      title: ""
    }
  },

  methods:{
    loadBookR: function(id){
      if(id != 0){
        this.$emit("loadBookdetailR", id);
      }
      else{
        alert("book not found")
      }
    },
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
}
</script>

<style>

</style>