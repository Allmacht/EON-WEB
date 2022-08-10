<template>
    <v-container fill-height class="login-page">
        <v-row justify="center" align="center">
            <v-col cols="12" class="text-center mb-5">
                <v-img src="/logo.svg" width="150" class="mx-auto"></v-img>
            </v-col>
    
            <v-col cols="10" xl="3" class="text-center">
                <v-form ref="loginForm" @submit.prevent="submit" :disabled="loading">
                    <v-text-field
                        v-model="form.email"
                        type="email"
                        :rules="[required, email]"
                        outlined
                        clearable
                        :color="$store.state.primary"
                        label="Correo electrónico"
                    ></v-text-field>

                    <v-text-field 
                        v-model="form.password" 
                        :rules="[required]" 
                        :type="show ? 'text' : 'password'"
                        outlined
                        label="Contraseña"
                        :color="$store.state.primary"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show = !show"
                    ></v-text-field>

                    <v-row class="mb-2">
                        <v-col class="text-left">
                            <v-checkbox
                                v-model="form.remember"
                                name="remember"
                                class="py-0 my-0"
                                label="Recuérdame"
                                :color="$store.state.primary"
                            ></v-checkbox>
                        </v-col>
                        <v-col class="text-right">
                            <p @click="forgotPassword = true" class="text-decoration-none p-button">
                                Restaurar contraseña
                            </p>
                        </v-col>
                    </v-row>

                    <v-btn
                        type="submit"
                        block
                        tile
                        x-large
                        dark
                        :color="$store.state.primary"
                        :loading="loading"
                    >
                        Iniciar sesión
                    </v-btn>
                </v-form>
                
                <p class="mt-10 text--disabled">
                    ¿No tienes una cuenta?

                    <nuxt-link :to="'/'" class="text-decoration-none">
                        Contáctanos
                    </nuxt-link>
                </p>
            </v-col>
        </v-row>

        <v-footer fixed class="mx-0" :color="$store.state.background">
            <v-col cols="12" class="text-center">
                <span class="text--disabled">
                    <i class="mr-1"> POWERED BY</i> YN<strong>TECH</strong>
                </span>
            </v-col>
        </v-footer>

        <forgot-password :dialog="forgotPassword" @close="forgotPassword = false"></forgot-password>
    </v-container>
</template>

<script>
import { defineComponent, reactive, ref, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({

    name:'PageLogin',
    layout:'guest',

    middleware:'auth',
    auth:'guest',

    setup() {

        const { $auth, $notify } = useContext()
        const router             = useRouter()

        const forgotPassword = ref(false)
        const loading   = ref(false)
        const show      = ref(false)
        const loginForm = ref(null)
        const form      = reactive({
            email       :"",
            password    :"",
            remember    :false,
        })

        const required = value => !!value || 'El campo es requerido'
        const email    = value => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) || 'El correo electrónico no es válido'

        const submit = async () => {

            if(!loginForm.value.validate()) return
            
            loading.value = true

            try{
                await $auth.loginWith('laravelSanctum', { data: form })
                router.push('/dashboard')
                
            }
            catch(err){

                $notify.error({
                    title:"error",
                    message:"Parte de su información es incorrecta, intentelo nuevamente"
                })

                loading.value = false
            }
        }
        

        return {
            form,
            show,
            email,
            submit,
            loading,
            required,
            loginForm,
            forgotPassword,
        }
    },

    head() {
        return {
            title:"Iniciar sesión"
        }
    },
})
</script>
