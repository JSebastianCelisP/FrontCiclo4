<template>
  <main id="bookV">
    <div id="info-main">
      <div id="info-port">
        <h2 class="title-r">RENT IT FOR A WEEK</h2>
        <h2 class="title-name">"A Fuego Lento"</h2>
        <img class="port" src="../assets/AFuegoLento.webp" alt="portada">
        <article class="data">
          <h3><b>Autor:</b>Autor name</h3>
          <h3><b>Available:</b>20</h3>
          <br><br><br><br>
          <h3>
            <b>Rent:</b>
            <input type="number" min="1" max="3" name="count" id="count" placeholder="0">
            <button type="submit" class="submit">RENT NOW</button>
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
  .title-r{
    grid-area: title;
    font-size: 55px;
    text-align: center;
    margin: auto;
    color: rgb(66, 76, 218);
}
</style>