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
                                <form @submit.prevent="onSubmit">
                                    <!-- Email -->
                                    <div class="form-group mb-3">
                                        <input id="inputEmail" type="email" placeholder="Email address" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" v-model="form.email">
                                    </div>
                                    <!-- Handle Email error -->
                                    <div class="input-errors" v-if="v$.form.email.$errors.length > 0" :key="index">
                                        <div class="error-msg">{{ v$.form.email.$errors[0].$message }}</div>
                                    </div>
                                    <!--  Password  -->
                                    <div class="form-group mb-3">
                                        <input id="inputPassword" type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" v-model="form.password">
                                    </div>
                                    <!-- Handle Password Input -->
                                    <div class="input-errors" v-if="v$.form.password.$errors.length > 0" :key="index">
                                        <div class="error-msg">{{ v$.form.password.$errors[0].$message }}</div>
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
   import useVuelidate from '@vuelidate/core'
    import { required, email, minLength } from '@vuelidate/validators'
    
    // Import something
    export default{
        name: 'HomePage',
        components: {},
        data(){
            return{
                v$: useVuelidate(),
                form: {
                    name: '',
                    email: ''
                }
            }
        },
        validations() {
            return {
                form: {
                    email: {
                        required, 
                        email 
                    },
                    password: { 
                        required,
                        min: minLength(6) 
                    }
                }
            }
        },
        methods:{
            onSubmit(){
                this.v$.$validate();
                if(this.v$.$error){
                    alert("Failed to Sign in")
                }else{
                    alert("Singned Successfuly");
                
                }
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
        margin-top: 30px;
    }

    input {
        margin: 30px 0px auto;
    }

    div.input-errors {
        color: red;
    }

</style>