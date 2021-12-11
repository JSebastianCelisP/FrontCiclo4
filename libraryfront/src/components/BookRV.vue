<template>
  <main id="bookV">
    <div id="info-main">
      <div id="info-port">
        <h2 class="title-r">RENT IT FOR A WEEK</h2>
        <h2 class="title-name">{{bookRDetailById.title}}</h2>
        <img class="port" src="{{BookRDetailById.bookCover}}" alt="cover">
        <article class="data">
          <h3><b>Author: </b>{{bookRDetailById.author}}</h3>
          <h3 v-if="isAdmin"><b>cover: </b>{{bookRDetailById.bookCover}}</h3>
          <h3><b>Available: </b>{{bookRDetailById.units}}</h3>
          <br><br><br><br>
          <h3>
            <b>Rent:</b>
            <input type="number" min="1" max="3" name="count" id="count" placeholder="0" v-model="transactionData.count">
            <button v-if="!isAdmin" v-on:click="createTransaction" type="submit" class="submit">RENT NOW</button>
            <button v-if="isAdmin" v-on:click="editBook" type="submit" class="submit">EDIT BOOK</button>
            <button v-if="isAdmin" v-on:click="updateBook" type="submit" class="submit">SAVE EDIT</button>
            <button v-if="isAdmin" v-on:click="confirmDeletion" type="submit" class="submit">DELETE BOOK</button>
          </h3>
        </article>
      </div>
      <article id="synopsis">
        <h3>Synopsis</h3>
        <p>{{bookRDetailById.description}}</p>
      </article>
    </div>
  </main>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "BookRV",

  data: function(){
    return{
      bookRDetailById: {
        idBookR    : 0,
        bookCover  : "",
        title      : "",
        units      : 0,
        author     : "",
        description: "",
      },

      updateBookData: {
        idBookR    : 0,
        bookCover  : "",
        title      : "",
        units      : 0,
        author     : "",
        description: "",
      },

      transactionData: {
        id     : 0,
        idBookR: parseInt(this.$route.params.id),
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
    },
    
    createTransaction: async function(){
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($transactionR: transactionRentalInput!, $idUser: Int!) {
              createRentalTransaction(transactionR: $transactionR, idUser: $idUser) {
                idUser
                idBookR
                id
                nameBookR
                date
                count
              }
            }
          `,
          
          variables:{
            transactionR: this.transactionData,
            idUser      : parseInt(localStorage.getItem("idUser"))
          }
        })

        .then((result) => {
          alert("successful rental")
          this.$emit("loadHistory")
        })

        .catch((error) => {         
          if (error.message == "300: Multiple Choices"){
            alert("Transaction id already exists.\nplease try again");
          }
          else if (error.message == "409: Conflict"){
            alert("Not enough units in stock");
          }
          else{
            alert("An error has occurred with the server.\nplease try again later")
          }

          console.log(error)
        });
    },

    updateBook: async function(){
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($updateBook: BookRInput!, $idUser: Int!) {
              updateBookR(updateBook: $updateBook, idUser: $idUser) {
                idBookR
                bookCover
                title
                units
                author
                description
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
            mutation Mutation($idBookR: Int!, $idUser: Int!) {
              deletebookR(idBookR: $idBookR, idUser: $idUser)
            }
          `,

          variables: {
            idUser : parseInt(localStorage.getItem("idUser")),
            idBookR: parseInt(this.$route.params.id),
          }
        })
        
        .then((result) => {
          alert(result.data.deleteBookR.toString())
          this.$router.push({ name: "Bookr" });
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
    bookRDetailById: {
      query: gql`
        query Query($idBookR: Int!, $idUser: Int!) {
          bookRDetailById(idBookR: $idBookR, idUser: $idUser) {
            idBookR
            bookCover
            title
            units
            author
            description
          }
        }
      `,

      variables() {
        return{
          idUser : parseInt(localStorage.getItem("idUser")),
          idBookR: parseInt(this.$route.params.id),
        }
      }
    }
  } ,
  
  created: function(){
    this.veryfyIsAdmin();
    this.randomNumber();
    this.$apollo.queries.bookRDetailById.refetch();
  }
}
</script>

<style>
  .title-r{
    grid-area: title;
    font-size: 55px;
    text-align: center;
    margin: auto;
    color: rgb(66, 76, 218);
}
</style>