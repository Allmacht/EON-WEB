<template>
    <v-container fluid fill-height class="px-0 py-0">
        <v-navigation-drawer :width="size" permanent stateless>
            
            <v-container fill-height>
                <v-row justify="center" align="center">
                    <v-col cols="12">
                        <v-img src="/logo.svg" max-width="45%" class="mx-auto"></v-img>
                    </v-col>
    
                    <v-col class="mt-4" cols="11" xl="9">
                        <v-form ref="loginForm" @submit.prevent="submit" :disabled="loading">
                            <v-text-field v-model="form.email" :rules="[required, email]" type="email" label="Correo electrónico" filled></v-text-field>
                            <v-text-field 
                                v-model="form.password" 
                                :rules="[required]" 
                                :type="show ? 'text' : 'password'" 
                                label="Contraseña" 
                                filled
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show = !show"
                            ></v-text-field>
    
                            <v-btn :color="$store.state.primary" :loading="loading" type="submit" class="text-lowercase my-5" block x-large dark>
                                Iniciar sesión
                            </v-btn>

                            <v-btn :color="$store.state.primary" :disabled="loading" class="text-lowercase" block text>
                                ¿olvidaste tu contraseña?
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
            
            <template #append>
                <v-divider></v-divider>
                <div class="text-center py-5">
                    <span class="text--disabled">
                       <i> POWERED BY</i> YN<strong>TECH</strong>
                    </span>
                </div>
            </template>
        </v-navigation-drawer>
    </v-container>
</template>

<script>
import { computed, defineComponent, reactive, ref, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({

    name:'PageLogin',
    layout:'guest',

    middleware:'auth',
    auth:'guest',

    setup() {

        const { $vuetify, $auth, $notify } = useContext()
        const router                       = useRouter()

        const size = computed(() => {
            switch ($vuetify.breakpoint.name) {
                case 'xs': return '100%'
                case 'sm': return '50%'
                case 'md': return '30%'
                case 'lg': return '25%'
                case 'xl': return '25%'
            }
        })

        const loading   = ref(false)
        const show      = ref(false)
        const loginForm = ref(null)
        const form      = reactive({
            email       :"",
            device_name :"web",
            password    :""
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
            size,
            email,
            submit,
            loading,
            required,
            loginForm,
        }
    },

    head() {
        return {
            title:"Iniciar sesión"
        }
    },
})
</script>
