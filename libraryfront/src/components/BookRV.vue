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

      updateBook: {
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
          console.log(result)
          alert("successful rental")
        })

        .catch((error) => {
          console.log(error)
          alert("ERROR: .");
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
            updateBook: this.updateBook,
            idUser    : parseInt(localStorage.getItem("idUser"))
          }
        })

        .then((result) => {
          alert("successful update")
        })

        .catch((error) => {
          alert("ERROR: .");
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
          console.log(result)
          alert(result.data.deleteBookR)
          this.$router.push({ name: "Bookr" });
          alert("Press f5 or reload the page");
         })
         .catch((error) => {
           console.log(error)
          alert("ERROR 401: .");
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