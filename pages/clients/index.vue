<template>
    <div>
        <v-app-bar height="100" elevation="1" absolute class="app-bar subtitle-app-bar" color="white">
            <v-app-bar-title class="title title-color">Clientes</v-app-bar-title>
            
            <v-spacer></v-spacer>

            <v-col cols="6" xl="3">
                <v-text-field
                    v-model="search"
                    :color="$store.state.primary" 
                    placeholder="Buscar..." 
                    prepend-inner-icon="mdi-magnify" 
                    outlined
                    dense
                    hide-details
                ></v-text-field>
            </v-col>

            <v-btn :color="$store.state.primary" dark :to="{ name:'clients-create' }">Crear</v-btn>

        </v-app-bar>

        <v-container class="page-margin px-0">
            <v-row justify="center" align="center">
                <v-col cols="12">
                    <v-card :loading="loading">
                        <v-card-text>
                            <v-data-table :headers="headers">
                                
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>            
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"ClientsPage",
    layout:"app",

    setup() {
        
        const headers = [
            { text:"ID", value:"" },
            { text:"Nombre", value:"" },
            { text:"País", value:"" },
            { text:"Estado", value:"" },
            { text:"Teléfono", value:"" },
            { text:"contacto", value:"" },
            { text:"Acciones", value:"actions" },
        ]

        return {
            headers
        }
    },
})
</script>
