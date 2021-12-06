<template>
  <main id="bookV">
    <div id="info-main">
      <div id="info-port">
        <h2 class="title">¡BUY NOW!</h2>
        <h2 class="title-name">"Alicia En El Pais De Las Maravillas"</h2>
        <img class="port" src="../assets/AliciaEnElPaisDeLasMaravillas.webp" alt="portada">
        <article class="data">
          <h3><b>Autor: </b>Lewis Carroll</h3>
          <h3><b>Price: </b>$20000</h3>
          <h3><b>Available: </b>20</h3>
          <br><br><br><br>
          <h3>
            <b>Buy:</b>
            <input type="number" min="1" max="10" name="count" id="count" placeholder="0">
            <button type="submit" class="submit">ORDER NOW</button>
          </h3>
        </article>
      </div>
      <article id="synopsis">
        <h3>Synopsis</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur velit doloremque vitae minus veniam aut, est, hic at voluptas voluptate fugiat aperiam inventore odit quaerat nihil earum illum sed voluptatibus.</p>
      </article>
    </div>
  </main>
</template>

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