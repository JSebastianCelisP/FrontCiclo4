<template>
    <main id="newbook">
        <h1>New Book For Rent</h1>   
            <form id="newRegistre">
                <label for=""></label>
                <label for="">TITLE</label>
                <input type="text" placeholder="Book title" v-model="bookR.title">
                <label for="">AUTHOR</label>
                <input type="text" placeholder="Book author" v-model="bookR.author">
                <label for="">UNITS</label>
                <input type="number" name="units" min="0" max="999" placeholder="999" v-model="bookR.units">
                <label for="">DESCRIPTION</label>
                <textarea name="" id="description" cols="58" rows="10" v-model="bookR.description"></textarea>
                <label for="">COVER</label>
                <input type="text" placeholder="Cover image name (without the .webp extension)" v-model="bookR.bookCover">
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
            bookR: {
                idBookR    : 0,
                bookCover  : "",
                title      : "",
                units      : 0,
                author     : "",
                description: ""
            },
        }
    },

    methods: {
        randomNumber: function(){
            var aleatorio = Math.random() * (1000000);
            aleatorio = Math.floor(aleatorio);
            this.bookR.idBookR = aleatorio
        },

        confirmInsertion: function(){
            if (confirm('Are you sure to create the book?') === true){
              this.createBookRental();
            }
        },

        createBookRental: async function(){
            await this.$apollo
              .mutate({
                mutation: gql`
                  mutation Mutation($book: bookRInput!, $idUser: Int!) {
                    createbookR(book: $book, idUser: $idUser) {
                      idBookR
                      bookCover
                      title
                      units
                      author
                      description
                    }
                  }
                `,
      
                variables:{
                  idUser: parseInt(localStorage.getItem("idUser")),
                  book  : this.bookR,
                }
              })
      
              .then((result) => {
                alert("Successful creation")
                this.$router.push({ name: "Bookr" });
              })
      
              .catch((error) => {         
                if (error.message == "409: Conflict"){
                  alert("Book id already exists.\nPlease try again");
                }
                else{
                  alert("An error has occurred with the server.\nplease try again later")
                }
              });
        }      
    },

    created: function(){   
        this.randomNumber();   
    } 
}
</script>

<style>
    #newbook h1 {
      text-align: center;
      font-size: 60px;
      margin: auto;
    }
    #newRegistre {
        padding: 5%;
        display: grid;
        grid-template-rows: 1fr 1fr;
        align-content: center;
        margin: 0px 20%;
    }

    #newRegistre input, #newRegistre button,#newRegistre h3{
        text-align: center;
        border-radius: 50px;
        margin: 10px 10%;
        padding: 2%;
        }

    #newRegistre button{
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
    #newRegistre label{
        margin-top: 10px ;
        margin-bottom: -3px;
    }
    #newRegistre button {
        border: none;
        font-size: larger;
        background-color: rgb(149, 246, 209);
    }
    #newRegistre button:hover{
        cursor: pointer;
      background-color: rgb(3, 112, 70);
      color: white;
  }
</style>