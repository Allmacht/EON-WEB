<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12" xl="8" class="px-0">
                <v-card flat :color="$store.state.background">
                    <v-card-title class="px-0">
                        Nueva paquetería
                        <v-spacer></v-spacer>
                        <v-btn small text style="float:right" class="mr-2" :to="{ name:'shipping-services' }" exact>
                            <v-icon left>mdi-chevron-left</v-icon>
                            Atrás
                        </v-btn>
                        <v-btn small style="float:right" :color="$store.state.primary" dark>Registrar</v-btn>
                    </v-card-title>
                </v-card>

                <v-divider></v-divider>
            </v-col>
        </v-row>

        <v-row justify="center" align="center">

            <v-col cols="12" xl="4">
                <v-card flat :color="$store.state.background">
                    <v-card-title>asdasd</v-card-title>
                </v-card>
            </v-col>

            <v-col cols="12" xl="4">
                <v-card outlined>
                    <v-card-title>asdasd</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"CreateShippingServicePage",
    layout:"app",
    middleware:"auth",


    setup() {
        
    },

    head(){
        return {
            title:"Nueva paquetería"
        }
    }
})
</script>
