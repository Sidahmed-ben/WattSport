<template>
     <div class="container-fluid">
        <div class="row no-gutter">
            <!-- The image half -->
            <div class="col-md-6 d-none d-md-flex bg-image"></div>
            <!-- The content half -->
            <div class="col-md-6 bg-light">
                <div class="login d-flex align-items-center py-5">
                    <!-- Demo content-->
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 col-xl-7 mx-auto">
                                <h3 class="display-4">Watt Sport</h3>
                                <div class="login-text">
                                    <p class=" mb-4">Login</p>
                                </div>
                                <form>
                                    <div class="form-group mb-3">
                                        <input id="inputEmail" type="email" placeholder="Email address" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4">
                                    </div>
                                    <div class="form-group mb-3">
                                        <input id="inputPassword" type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary">
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                    <div>
                                        <router-link :to="{name:'RegisterPage'}">Register</router-link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div><!-- End -->
                </div>
            </div><!-- End -->
        </div>
    </div>

</template>

<script>
    // Import something
    export default{
        name: 'HomePage',
        components: {},

        data(){
            return{

            }
        }
    }

</script>


<style scoped>
    .login,
    .image {
      min-height: 100vh;
    }
    .bg-image {
      background-image: url("../../public/home.png");
      background-size: cover;
      background-position: center center;
    }
    div.row{
        text-align: center;
    }

    h3 {
        font-weight: bolder;
        margin-bottom: 20px;
    }

    div .login-text{
        background-color: black;
        width: 100px;
        height: 40px;
        margin: 20px auto;
        text-align: center;
        color: azure;
        padding-top: 8px;
        border-radius: 20px;
        margin-bottom: 80px;
    }

    button{
        width: 200px;
        margin-top: 10px;
    }

    input {
        margin: 30px auto;
    }

</style>