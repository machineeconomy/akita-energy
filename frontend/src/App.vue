<template>
  <div id="app">
    <h1 class="title">AKITA Wind Energy</h1>
    <h2 class="sub-title">IOTA Machine Wallet</h2>
    <div v-if="!payed">
      <img class="wind_img" src="./assets/EnergyWind.png" />
      <br>
      <iota-payment class="pay-button" @paymentSuccess="paymentSuccess">Show QR Code</iota-payment>
    </div>
    <div v-else>
        <img class="wind_gif" src="./assets/Windrad_1.gif" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  },
  data() {
    return {
      payed: false
    }
  },
  methods: {
    paymentSuccess() {
      this.payed = true;

      setTimeout(function() {
        // click on button
        location.reload();
      }, 10000);
      
    }
  }
}
</script>

<style >
:root {
  --akita-primary: #00b0f0;
  --akita-secondary: #00fb92;
  --akita-dark: #3b3838;
  --akita-light: #f2f2f2;
  --akita-blue: #00b0f0;
}
body {
  height: 100vh;
  widows: 100%;
  text-align: center;
  justify-content: center;
    background: linear-gradient(
    to bottom right,
    var(--akita-primary) 50%,
    var(--akita-secondary) 85%
  );
}
#app {
  font-family: "Oswald", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--akita-light);
  margin: 0 auto;
  margin-top: 60px;

  border-radius: 10px;
  padding: 20px 20px;
  max-width: 600px;
}
.title {
  font-size: 4em;
  font-weight: bold;
}
.sub-title {
  font-size: 3em;
  font-weight: bold;
}
.logo {
  width: 200px;
}

.pay-button button {
  background-color: var(--akita-dark);
  border-radius: 10px;
  border: none;
  color: white;
  padding: 30px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
}
.pay-button button:hover {
  cursor: pointer;
}

.wind_gif {
  width: 50%;
}
.wind_img {
  width: 50%;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1); 
}
</style>
