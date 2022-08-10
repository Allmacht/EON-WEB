<template>
    <v-navigation-drawer v-model="state" :width="$vuetify.breakpoint.name !== 'sm' ? 450 : ''" app temporary>
        <v-container fill-height>
            <v-row justify="center" align="center">
                <v-col cols="10">
                    <h3 class="title-color">Restaurar contraseña</h3>
                </v-col>

                <v-col cols="10" class="">

                    <p class="mb-10 text--secondary">
                        Ingrese su correo electrónico, le enviaremos un enlace para volver a su cuenta.
                    </p>

                    <v-form>
                        <v-text-field outlined label="Correo electrónico"></v-text-field>

                        <v-btn tile block x-large :color="$store.state.primary" dark>
                            Enviar
                        </v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-navigation-drawer>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"ForgotPasswordComponent",

    props:{
        dialog:{
            required:true,
            type:Boolean,
            default:false
        }
    }, 

    emits:['close'],

    setup(props, {emit}) {
        
        const state = computed({
            get:() => props.dialog,
            set:(val) => !val? emit('close') : val
        })

        return {
            state
        }

    },
})
</script>
