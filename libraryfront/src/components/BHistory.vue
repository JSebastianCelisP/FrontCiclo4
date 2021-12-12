<template>
    <main id="bhistory">
        <div class="title">
            <h2>{{nombre}}Your history</h2>
        </div>
        <div class="shopping">
            <table>
                <caption>Shopping history</caption>
                <thead>
                    <tr class="title-table">
                        <th>Date</th> 
                        <th>Book</th>
                        <th>Count</th>
                        <th> Total price </th>
                    </tr>
                </thead>
                <tbody v-for="item in getPurchaseTransactions" v-bind:key="item">
                    <tr>
                        <td>{{item.date.substring(0,10)}}</td>
                        <td>{{item.nameBookS}}</td>
                        <td>{{item.count}}</td>
                        <td>{{item.value}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="rental">
            <table>
                <caption>Rental history</caption>
                <thead class="title-table">
                    <tr>
                        <th>Date</th> 
                        <th>Book</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody v-for="item in getRentalTransactions" v-bind:key="item">
                    <tr>
                        <td>{{item.date.substring(0,10)}}</td>
                        <td>{{item.nameBookR}}</td>
                        <td>{{item.count}}</td>                     
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: 'BHistory',
  
  data: function(){
    return{
      userDetailById: {
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
    }
  },

  methods: {
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
  .bhistory{
    min-height: 550px;
  }
  .title {
      grid-area: title;
      margin: 2%;
      text-align: center;
  }
  .shopping{
      grid-area: shopping;
      margin: auto;
  }
  .rental{
      grid-area: rental;
      margin: auto;
  }
  .bhistory{
      display: grid;
      grid-template-areas: 
      "title title"
      "shopping rental";
  }
  table{
      margin-top: 15%;
      width: auto;
      /* border-spacing: 2px; */
      border: 1px solid rgb(88, 3, 3);
      padding: 1%;
      border-radius: 0px 0px 5px 5px;
  }
  caption{
      font-size: larger;
      background-color: black;
      border-radius: 5px 5px 0px 0px;
      color: white;
  }
  thead th{
      width: 30%;
      padding: 1%;
      background-color: rgb(92, 6, 6);
      color: white;
      /* line-height: 30px; */
  }
  tbody td{
      width: 30%;
      margin: 5%;
      padding: 2%;
      background-color: rgb(170, 175, 173);
      text-align: center;
  }
  h2{
      font-size: 40px;
  }
</style>