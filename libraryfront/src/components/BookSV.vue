<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Libreria</title>
</head>
<body>
    <header class="cabecera">
        <div id="logo">
          <img src="../assets/image.png" alt="Logo" />
          <h3>Librería Misión Tic</h3>
        </div>
            <div class="usuario">
            </div>
        <div class="usuario">
        </div>
        <div class="usuario">
          <h3 v-on:click="loadLogin" v-if="isAuth">Ingresar</h3>
        </div>
        <div class="usuario">
          <h3 v-on:click="loadLogin" v-if="!isAuth">LogIn</h3>
        </div>
      </header>
      <main>
        
      </main>
    
      <footer id="footer">
          <h4>Contact: library@misiontic2022.mi<br>Number: 1234567890</h4>
      </footer>
</body>
</html>