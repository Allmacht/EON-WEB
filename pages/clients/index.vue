<template>
    <div>
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
