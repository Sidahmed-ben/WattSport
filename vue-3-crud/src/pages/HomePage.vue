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
                                <!-- Radio Button -->
                                <div class="d-flex  justify-content-between" style="text-align: center; width: 250px; height: 50px; margin: 0px auto;">
                                    <div class="form-check d-flex">
                                        <div class="d-flex  ">
                                            <input style="" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="isEntrain" v-model="user" checked>
                                            <label style="margin: 26px 5px" class="form-check-label" for="flexRadioDefault1">
                                                S'entrainer
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-check d-flex " style="position: relative;">
                                      <input style=""  class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value= "isCoach" v-model="user" >
                                      <label style="margin: 26px 5px"  class="form-check-label" for="flexRadioDefault2">
                                            Coacher
                                      </label>
                                    </div>
                                </div>
                                <form @submit.prevent="onSubmit">
                                    <div v-if="servErrors.length > 0">
                                        <p class="mb-4" style="color: red;"> {{ servErrors[0].error.message }} </p>
                                    </div>
                                    <!-- Email -->
                                    <div class="form-group mb-3">
                                        <input id="inputEmail"  placeholder="Email address" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" v-model="form.email">
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
                                    <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">se connecter</button>
                                    <div>
                                        <router-link :to="{name:'RegisterPage'}">Créer un compte</router-link>
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
    import UsersDataService from '@/services/UsersDataService';
    
    // Import something
    export default{
        name: 'HomePage',
        components: {},
        data(){
            return{
                user: "isEntrain",
                servErrors: [],
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
                    return
                }else{
                    this.loginUser()
                }
            },

            loginUser() {
                let data = {
                    email: this.form.email,
                    password: this.form.password,
                    user: this.user
                };
                this.servErrors = [];
                UsersDataService.loginUser(data)
                    .then((result) => {
                      console.log(" Users loged succeffuly");
                      console.log(result.data);
                      switch(result.data.type){
                        case 'isEntrain' :
                            this.$router.push('/user/profil');
                            break;
                        case 'isCoach' :
                            this.$router.push('/coach/profil');
                            break;
                        default :
                            console.log("ERROR : Unknown User type ");
                            break;
                      }
                      
                    })
                    .catch(e => {
                        this.servErrors = [];
                        switch (e.response.status){
                            case 401:
                                console.log(e.response.data);
                                this.servErrors.push({error : e.response.data});
                            break;
                        }
                    });
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
        width: 160px;
        margin-top: 30px;
    }

    input {
        margin: 30px 0px auto;
    }

    div.input-errors {
        color: red;
    }

</style>



