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
                                    <p class=" mb-4">Register</p>
                                </div>
                                <form  @submit.prevent="onSubmit">
                                    <!-- Name -->
                                    <div class="form-group mb-3">
                                        <input id="name" type="text" placeholder="Name" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" v-model="form.name">
                                    </div>
                                    <!-- Handle Name error -->
                                    <div class="input-errors" v-if="v$.form.name.$errors.length > 0" :key="index">
                                        <div class="error-msg">{{ v$.form.name.$errors[0].$message }}</div>
                                    </div>
                                    <!-- Email  -->
                                    <div class="form-group mb-3">
                                        <input id="inputEmail"  placeholder="Email address" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" v-model="form.email">
                                    </div>
                                    <!-- Email Validation  -->
                                    <div class="input-errors" v-if="v$.form.email.$errors.length > 0" :key="index">
                                        <div class="error-msg">{{ v$.form.email.$errors[0].$message }}</div>
                                    </div>
                                    <!-- Password  -->
                                    <div class="form-group mb-3">
                                        <input id="inputPassword" type="password" placeholder="Password" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" v-model="form.password">
                                    </div>
                                    <!-- Password Validation  -->
                                    <div class="input-errors" v-if="v$.form.password.$errors.length > 0" :key="index">
                                        <div class="error-msg">{{ v$.form.password.$errors[0].$message }}</div>
                                    </div>
                                    <!-- Password2 -->
                                    <div class="form-group mb-3">
                                        <input id="inputPassword2" type="password" placeholder="Confirm password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" v-model="form.password2">
                                    </div>
                                    <div class="input-errors" v-if="v$.form.password2.$errors.length > 0" :key="index">
                                        <div class="error-msg">{{ v$.form.password2.$errors[0].$message }}</div>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Register</button>
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
    import useVuelidate from '@vuelidate/core'
    import { required, email, minLength ,sameAs } from '@vuelidate/validators'
    
    export function
        validName(name) {
                let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
                if (validNamePattern.test(name)){
                    return true;
                }
                return false;
        }
    // Import something
    export default{
        name: 'RegisterPage',
        components: {},
        data(){
            return{
                v$: useVuelidate(),
                form: {
                    name: '',
                    email: '',
                    password: '',
                    passowrd2: '',
                }
            }
        },
        validations() {
            return {
                form: {
                    name: { 
                        required, name_validation: {
                        $validator: validName,
                        $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
                        } 
                    },
                    email: {
                        required, 
                        email 
                    },
                    password: { 
                        required,
                        min: minLength(6) 
                    },
                    password2: { 
                        required , 
                        sameAs: sameAs(this.form.password),
                    }
                }
            }
        },
        methods:{
            onSubmit(){
                this.v$.$validate();
                if(this.v$.$error){
                    alert("Failed to submit")
                }else{
                    alert("Submited Successfuly")
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