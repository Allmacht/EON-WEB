<template>
    <v-dialog v-model="state" max-width="600">
        <v-card>
            <v-card-title class="py-2">
                <v-text-field
                    class="search-input"
                    placeholder="Buscar..."
                    append-outer-icon="mdi-magnify"
                    hide-details
                ></v-text-field>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
                <p class="mb-0 py-3">
                    <span>Busquedas recientes</span>
                    <span style="float:right; color:#0375F8">Ver todo</span>
                </p>

                <v-list-item>

                </v-list-item>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"SearchDialogComponent",

    props:{
        dialog:{
            required:true,
            type:Boolean,
            default:false,
        }
    },

    emits:['close', 'setSearch'],

    setup(props, {emit}) {
        
        const state = computed({
            get:() => props.dialog,
            set:(val) => !val? emit('close') : val
        })

        const search = ref("")

        return {
            state,
            search,
        }

    },
})
</script>
