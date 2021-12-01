<template>
  <main id="welcome">
      <figure>
        <img src="port2.jpg" alt="" width="300px">
        <div class="texto">
            <h3>RENT BOOK</h3>
        </div>
      </figure>
      <figure>
          <img src="port1.jpg" alt="" width="300px">
          <div class="texto">
              <h3>NEW BOOK</h3>
          </div>
      </figure>
  </main>
</template>

<script>
  export default {
    name: 'Welcome',
  }
</script>

<style>
    #welcome{
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 1fr;
        align-content: center;
    }
    #welcome figure{
        resize: both;
        position: relative;
        margin: auto;
        padding: 0px 40px;
        background-color: black;
        border-radius: 20px;
        box-shadow: 20px 20px 18px rgb(112, 112, 112);
        cursor: pointer;
    }

    #welcome figure .texto{
        background-color: rgb(0, 0, 0);
        position: absolute;
        width: 80%;
        height: 100%;
        text-align: center;
        color: white;
        top: 0px;
        font-size: 40px;
        transition: all 0.3s ease-in-out;
        background-color: rgba(0, 0, 0, 0.671);
        padding-top: 50%;
        text-decoration: overline underline white;
    }

    #welcome figure .texto:hover{
        background-color: rgba(155, 154, 154, 0);
        transition: all 0.3s ease-in;
        color: rgb(63,2,2);
        text-decoration: overline underline rgb(63, 2, 2);
    }

    #welcome figure:hover {
        transition: all 0.3s ease-in;
        background-color: rgb(41, 2, 2);
    }
    
</style>