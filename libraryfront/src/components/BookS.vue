<template>
    <main id="main">
      <div id="search">
        <input type="search" placeholder="search your next book">
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
      booksSList: []
    }
  },

  methods:{
    loadBookS: function(id){
      this.$emit("loadBookdetailS", id);
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
    }
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