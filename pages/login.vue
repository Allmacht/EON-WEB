<template>
    <v-navigation-drawer :width="size">
        
        <v-container fill-height>
            <v-row justify="center" align="center">
                <v-col cols="12">
                    <v-img src="/logo.svg" max-width="45%" class="mx-auto"></v-img>
                </v-col>

                <v-col class="mt-4" cols="11" xl="9">
                    <v-form>
                        <v-text-field label="Correo electrónico" filled></v-text-field>
                        <v-text-field label="Contraseña" filled></v-text-field>

                        <v-btn type="submit" class="text-lowercase my-5" block x-large>
                            Iniciar sesión
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
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"PageLogin",
    layout:"guest",

    head() {
        return {
            title:"Iniciar sesión"
        }
    },

    setup() {

        const { $vuetify } = useContext()
        const size         = computed(() => {

            switch ($vuetify.breakpoint.name) {
                case 'xs': return '100%'
                case 'sm': return '50%'
                case 'md': return '30%'
                case 'lg': return '25%'
                case 'xl': return '25%'
            }
        })
        

        return {
            size
        }
    },
})
</script>
