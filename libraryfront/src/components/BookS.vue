<template>
    <main id="main">
      <div id="search">
        <input type="search" placeholder="search your next book" v-model="title">
        <button v-on:click="loadBookS(bookSDetailByTitle.idBookS)">search</button>
      </div>

      <div id="bookC">
        <div class="card-p">          
          <div v-for="item in booksSList" v-bind:key="item" class="card-info">
            <img class="card-img" src="{{item.cover}}" alt="Sira">
            <h3>{{item.title}}</h3>
            <h3>Author: {{item.author}}</h3>
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

      title: ""
    }
  },

  methods:{
    loadBookS: function(id){
      if(id != 0){
        this.$emit("loadBookdetailS", id);
      }
      else{
        alert("book not found")
      }
    }
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
    this.$apollo.queries.booksSList.refetch();
    this.$apollo.queries.bookSDetailByTitle.refetch()
  }
}
</script>

<style>

  #bookC{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 5%;

  }

  #search input{
    margin: 20px 40% 0px 40%;
    padding: 0px 30px;
    font-size: 20px;
    border-radius: 30px;
  }

  #search button{
    margin: 20px 40% 0px 40%;
    padding: 0px 30px;
    font-size: 20px;
    border-radius: 30px;
    cursor: pointer;
  }

  #bookC .card-p{
    cursor: pointer;
    margin: 20px;
    zoom: 0.85;
   }
  #bookC .card-p .card-img{
    background-color: black;
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