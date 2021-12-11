<template>
    <main>
        <h1>New Book For Sale</h1>   
        <form class="newRegistre">
            <label for=""></label>
            <label for="">TITLE</label>
            <input type="text" placeholder="Book title" v-model="bookS.title">
            <label for="">AUTHOR</label>
            <input type="text" placeholder="Book author" v-model="bookS.author">
            <label for="">UNITS</label>
            <input type="number" name="units" min="0" max="999" placeholder="999" v-model="bookS.units">
            <label for="">DESCRIPTION</label>
            <textarea name="" id="description" cols="58" rows="10" v-model="bookS.description"></textarea>
            <label for="">PRICE</label>
            <input type="number" name="price" placeholder="$200.000" min="0" max="200000" v-model="bookS.price">
            <label for="">COVER</label>
            <input type="text" placeholder="Cover image name (without the .webp extension)" v-model="bookS.bookCover">
            <label for="">COVER FILE</label>
            <input type="file" accept=".webp">
            <button class="guardarB" v-on:click="confirmInsertion">CREATE</button>
        </form> 
    </main>
</template>

<script>
import gql from "graphql-tag";

export default {
    name: 'newBookS',

    data: function(){
        return{
            bookS: {
                idBookS    : 0,
                bookCover  : "",
                title      : "",
                units      : 0,
                author     : "",
                description: "",
                price      : 0
            },
        }
    },

    methods: {
        randomNumber: function(){
            var aleatorio = Math.random() * (1000000);
            aleatorio = Math.floor(aleatorio);
            this.bookS.idBookS = aleatorio
        },

        confirmInsertion: function(){
            if (confirm('Are you sure to create the book?') === true){
              this.createBookPurchase();
            }
        },

        createBookPurchase: async function(){
        await this.$apollo
        .mutate({
            mutation: gql`
              mutation Mutation($book: bookSInput!, $idUser: Int!) {
                createBookS(book: $book, idUser: $idUser) {
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

              variables:{
                idUser: parseInt(localStorage.getItem("idUser")),
                book  : this.bookS,
              }
            })

            .then((result) => {
              alert("Successful creation")
              this.$router.push({ name: "Books" });
            })

            .catch((error) => {
              if (error.message == "409: Conflict"){
                alert("Book id already exists.\nPlease try again");
              }
              console.log(error)
            });
        },
    },

    created: function(){   
        this.randomNumber();   
    }
} 
</script>

<style>
    @font-face {
        font-family: "Baskerville Old Face";
        src: url(../fonts/BaskervilleOldFaceV2.ttf) format('truetype');
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
    text-align: center;
    }
    form {
        padding: 5%;
        display: grid;
        grid-template-rows: 1fr 1fr;
        align-content: center;
        margin: 0px 20%;
    }

    form div{
        display: grid;
        grid-template-rows: auto;
        border-radius: 20px;
        padding: 5%;
        border-style: dotted;
        border-color: black;
    }

    .img {
        margin: auto;
        padding-bottom: 20px;
    }

    form input,button, h3{
        text-align: center;
        border-radius: 50px;
        margin: 10px 10%;
        padding: 2%;
        }

    form button{
        padding: 2%;
        margin: auto;
    }
    .editar{
        cursor: pointer;
        padding: 1.5% 7%;
        color: blue;
        border-style: none;
    }
    #description{
        border-radius: 5px;
        resize: none;
        font-size: 20px;
        margin: auto;
    }
    label{
        margin-top: 10px ;
        margin-bottom: -3px;
    }
    button {
        border: none;
        font-size: larger;
        background-color: rgb(149, 246, 209);
    }
    button:hover{
        cursor: pointer;
      background-color: rgb(3, 112, 70);
      color: white;
  }
    
</style>