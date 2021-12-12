<template>
  <main id="bookV">
    <div id="info-main">
      <div id="info-port">
        <h2 class="title">¡BUY NOW!</h2>
        <h2 class="title-name">"{{bookSDetailById.title}}"</h2>
        <img :src="getImg(bookSDetailById.bookCover)" :alt="bookSDetailById.bookCover">
        <article class="data">
          <h3><b>Author: </b>{{bookSDetailById.author}}</h3>
          <h3><b>Price: </b>{{bookSDetailById.price}}</h3>
          <h3><b>Available: </b>{{bookSDetailById.units}}</h3>
          <br><br><br><br>
          <h3>
            <b v-if="!isAdmin">Buy:</b>
            <input v-if="!isAdmin" type="number" min="1" max="10" name="count" id="count" placeholder="0" v-model="transactionData.count">
            <button v-if="!isAdmin" v-on:click="createTransaction" type="submit" class="submit">ORDER NOW</button>
            <!--<button v-if="isAdmin" v-on:click="editBook" type="submit" class="submit">EDIT BOOK</button>
            <button v-if="isAdmin" v-on:click="updateBook" type="submit" class="submit">SAVE EDIT</button>-->
            <button v-if="isAdmin" v-on:click="confirmDeletion" type="submit" class="submit">DELETE BOOK</button>
          </h3>
        </article>
      </div>
      <article id="synopsis">
        <h3>Synopsis</h3>
        <p>{{bookSDetailById.description}}</p>
      </article>
    </div>
  </main>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "BookSV",

  data: function(){
    return{
      bookSDetailById: {
        idBookS    : 0,
        bookCover  : "",
        title      : "",
        units      : 0,
        author     : "",
        description: "",
        price      : 0
      },

      updateBookData: {
        idBookS    : parseInt(this.$route.params.id),
        bookCover  : "",
        title      : "",
        units      : 0,
        author     : "",
        description: "",
        price      : 0
      },

      transactionData: {
        id     : 0,
        idBookS: parseInt(this.$route.params.id),
        count  : 0
      },
      
      rol    : localStorage.getItem("rol").toString(),
      isAdmin: false
    };
  },
  
  methods: {
    veryfyIsAdmin: function(){
      if(this.rol === "Admin"){
        this.isAdmin = true
      }
      else{
        this.isAdmin = false
      }
    },

    randomNumber: function(){
      var aleatorio = Math.random() * (1000000);
      aleatorio = Math.floor(aleatorio);
      this.transactionData.id = aleatorio
      console.log(this.bookSDetailById.bookCover)
    },

    getImg: function(img){
      return require('../assets/' + img + '.webp')
    },

    createTransaction: async function(){
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($transactionP: transactionPurchaseInput!, $idUser: Int!) {
              createPurchaseTransaction(transactionP: $transactionP, idUser: $idUser) {
                id
                idUser
                idBookS
                value
                nameBookS
                date
                count
              }
            }
          `,
          
          variables:{
            transactionP: this.transactionData,
            idUser      : parseInt(localStorage.getItem("idUser"))
          }
        })

        .then((result) => {
          alert("successful purchase")
          this.$emit("loadHistory")
        })

        .catch((error) => {
          if (error.message == "409: Conflict"){
            alert("Insufficient balance");
          }
          else if (error.message == "300: Multiple Choices"){
            alert("Transaction id already exists.\nplease try again");
          }
          else if (error.message == "303: See Other"){
            alert("Not enough units in stock");
          }
          else{
            alert("An error has occurred with the server.\nplease try again later")
          }
        });
    },

    updateBook: async function(){
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($updateBook: bookSInput!, $idUser: Int!) {
              updateBookS(updateBook: $updateBook, idUser: $idUser) {
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

          variables: {
            updateBook: this.updateBookData,
            idUser    : parseInt(localStorage.getItem("idUser"))
          }
        })

        .then((result) => {
          alert("successful update")
        })

        .catch((error) => {
          if (error.message == "404: Not Found"){
            alert("Book not found");
          }
          else{
            alert("An error has occurred with the server.\nplease try again later")
          }
        });
    },

    editBook: function(){

    },

    deleteBook: async function(){
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($idBookS: Int!, $idUser: Int!) {
              deleteBookS(idBookS: $idBookS, idUser: $idUser)
            }
          `,

          variables: {
            idUser : parseInt(localStorage.getItem("idUser")),
            idBookS: parseInt(this.$route.params.id),
          }
        })
        
        .then((result) => {
          alert(result.data.deleteBookS.toString())
          this.$router.push({ name: "Books" });
         })
         .catch((error) => {
          if (error.message == "404: Not Found"){
            alert("Book not found");
          }
          else{
            alert("An error has occurred with the server.\nplease try again later")
          }
        });
    },

    confirmDeletion: function(){
      if (confirm('Are you sure to delete the book?') === true){
        this.deleteBook();
      }
    },
  },

  apollo: {
    bookSDetailById: {
      query: gql`
        query Query($idBookS: Int!, $idUser: Int!) {
          bookSDetailById(idBookS: $idBookS, idUser: $idUser) {
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

      variables() {
        return{
          idUser : parseInt(localStorage.getItem("idUser")),
          idBookS: parseInt(this.$route.params.id),
        }
      }
    }
  } ,
  
  created: function(){
    this.veryfyIsAdmin();
    this.randomNumber();
    this.$apollo.queries.bookSDetailById.refetch();
  }
}
</script>

<style>
  #bookV{
      height: 550px;
  }
    #info-main{
      display: grid;
      grid-template-columns: 3fr 1fr;
    }
    .title{
      grid-area: title;
      font-size: 55px;
      text-align: center;
      margin: auto;
      color: brown;
  }
  .title-name{
    grid-area: title-name;
    font-size: 40px;
    text-align: center;
    margin: 0 auto;
  }
  .port{
    grid-area: port;
  margin-left: 45%;
  }
  .data{
    grid-area: data;
    margin-left: -15%;
    margin-top: 10%;
  }
  #info-port{
    display: grid;
    height: 550px;
    grid-template-areas: 
    "title title title"
    "title-name title-name title-name"
    "title-name title-name title-name"
    "port port data"

  }
  .data > h3{
    font-size: 30px;
  }
  #count{
    font-size: 20px;
    font-family: sans-serif;
    text-align: center;
    width: 50px;
    border-radius:5px 5px ;
    border-style: none solid solid solid ;
    margin: 2%;
  }
  #count:focus, #count::selection, #count:active, #count:target {
    border: none;
    outline: none;
    background-color: cornflowerblue;
  }
  .submit{
    cursor: pointer;
    background-color: rgb(149, 246, 209);
    margin-inline: -0.5%;
    transition: all 0.2s ease-in-out;
  }
  .submit:hover{
    background-color: rgb(3, 112, 70);
    color: white;
    box-shadow: 5px 5px 5px black;
    transition: all 0.2s ease-in;
  }
  #synopsis{
    background-color: rgba(246, 128, 128, 0.787);
    padding: 10%;
  }
  #synopsis h3{
    text-align: center;
    margin: 10%;
    font-size: 30px;
    font-weight: 600;
  }
  #synopsis p{
    font-family: sans-serif;
    text-align: justify;
  }
</style>