<template>
    
</template>

<script>
import gql from "graphql-tag";

export default {
  name: 'BHistory',
  
  data: function(){
    return{
      userDetailById: {
        username: "",
        nombre  : "",
        email   : "",
      },

      accountPurchaseById: {
        balance: 0,
      },

      accountRentalById: {
        count: 0,
      },

      getPurchaseTransactions: [],

      getRentalTransactions  : [],

      bookRental: {
        idBookR    : 0,
        bookCover  : "",
        title      : "",
        units      : 0,
        author     : "",
        description: ""
      },

      bookPurchase: {
        idBookR    : 0,
        bookCover  : "",
        title      : "",
        units      : 0,
        author     : "",
        description: "",
        price: 0
      },
    }
  },

  methods: {
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
            book  : this.bookPurchase,
          }
        })

        .then((result) => {
          alert("Successful creation")
        })

        .catch((error) => {
          if (error.message == "409: Conflict"){
            alert("Book id already exists.\nPlease try again");
          }
          else{
            alert("An error has occurred with the server.\nplease try again later")
          }
        });
    },

    createBookRental: async function(){
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($book: bookSInput!, $idUser: Int!) {
              createBookR(book: $book, idUser: $idUser) {
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
            book  : this.bookRental,
          }
        })

        .then((result) => {
          alert("Successful creation")
        })

        .catch((error) => {         
          if (error.message == "409: Conflict"){
            alert("Book id already exists.\nPlease try again");
          }
          else{
            alert("An error has occurred with the server.\nplease try again later")
          }
        });
    },

    deletePurchaseTransaction: async function(){
      await this.$apollo
        .mutate({
          mutation: gql`
          mutation Mutation($idTransaction: Int!, $idUser: Int!) {
            deletePurchaseTransaction(idTransaction: $idTransaction, idUser: $idUser)
          }
          `,

          variables:{
            idUser       : parseInt(localStorage.getItem("idUser")),
            idTransaction: 0,
          }
        })

        .then((result) => {
          alert(result.data.deletePurchaseTransaction.toString())
        })

        .catch((error) => {
          if (error.message == "404: Not Found"){
            alert("Transaction not found");
          }
          else{
            alert("An error has occurred with the server.\nplease try again later")
          }
        });
    },

    deleteRentalTransaction: async function(){
      await this.$apollo
        .mutate({
          mutation: gql`
          mutation Mutation($idTransaction: Int!, $idUser: Int!) {
            deleteRentalTransaction(idTransaction: $idTransaction, idUser: $idUser)
          }
          `,

          variables:{
            idUser       : parseInt(localStorage.getItem("idUser")),
            idTransaction: 0,
          }
        })

        .then((result) => {
          alert(result.data.deleteRentalTransaction.toString())
        })
        .catch((error) => {
          if (error.message == "404: Not Found"){
            alert("Transaction not found");
          }
          else{
            alert("An error has occurred with the server.\nplease try again later")
          }
        });
    }
  },

  apollo: {
    userDetailById:{
      query: gql`
        query Query($idUser: Int!) {
          userDetailById(idUser: $idUser) {
            id
            username
            nombre
            email
            rol
          }
        }
      `,

      variables(){
        return{
          idUser: parseInt(localStorage.getItem("idUser")),      
        }
      }
    },

    accountPurchaseById: {
      query: gql`
        query Query($idUser: Int!) {
          accountPurchaseById(idUser: $idUser) {
            balance
          }
        }
      `,

      variables(){
        return{
          idUser: parseInt(localStorage.getItem("idUser")),      
        }
      }
    },

    accountRentalById: {
      query: gql`
        query Query($idUser: Int!) {
          accountRentalById(idUser: $idUser) {
            count
          }
        }
      `,

      variables(){
        return{
          idUser: parseInt(localStorage.getItem("idUser")),      
        }
      }
    },

    getPurchaseTransactions: {
      query: gql`
        query Query($idUser: Int!) {
          getPurchaseTransactions(idUser: $idUser) {
            id
            idUser
            idBookS
            nameBookS
            value
            date
            count
          }
        }
      `,

      variables(){
        return{
          idUser: parseInt(localStorage.getItem("idUser")),      
        }
      }
    },

    getRentalTransactions: {
      query: gql`
      query Query($idUser: Int!) {
        getRentalTransactions(idUser: $idUser) {
          id
          idUser
          idBookR
          nameBookR
          date
          count
        }
      }
     `,

     variables(){
        return{
          idUser: parseInt(localStorage.getItem("idUser")),      
        }
      }
    }
  },

  created: function(){
    this.$apollo.queries.userDetailById.refetch();
    this.$apollo.queries.accountPurchaseById.refetch();
    this.$apollo.queries.accountRentalById.refetch();
    this.$apollo.queries.getPurchaseTransactions.refetch();
    this.$apollo.queries.getRentalTransactions.refetch();
  }
}
</script>

<style> 

</style>