<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12">
                <v-row justify="center" align="center">
                    <v-col cols="12" xl="3" lg="4">
                        <v-text-field
                            v-model="search"
                            :color="$store.state.primary" 
                            label="Buscar..." 
                            append-icon="mdi-magnify" 
                            filled
                            dense
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" xl="9" lg="8" class="text-right">
                        <v-btn class="text-capitalize" :color="$store.state.primary" dark :to="{ name:'shipping-services-create' }">
                            Nueva paquetería
                            <v-icon right>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"ShippingServicesPage",
    layout:"app",
    middleware:"auth",

    setup() {
        
    },

    head(){
        return {
            title:"Paqueterías"
        }
    }
})
</script>
