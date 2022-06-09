<template>


      <div class="container">
        <div class="box" style="background: red">
            <!-- <img src="../../public/1.png"> -->
        </div>
        <div class="box stack-top" style="background: blue">
            <!-- <img src="../../public/2.png"> -->
        </div>
      </div>

</template>


<style scoped>
  .container {
    background-color: aqua;
    width: 400px;
    height: 400px;
    position: relative;
    margin: 20px;
  }
  .box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0; 
    opacity: 0.9; /* for demo purpose  */
  }
  .stack-top {
    z-index: 9;
    margin: 20px; /* for demo purpose  */
  }
</style>