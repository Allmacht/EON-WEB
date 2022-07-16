<template>
    <v-navigation-drawer v-model="show" app temporary right :width="size">
        <template #prepend>
            <!-- <div class="pa-2" :style="{ 'background-color' : $store.state.primary }">
                <v-btn  @click="$emit('close')" icon dark>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div> -->

            <v-app-bar :color="$store.state.primary" dark>
                <v-btn  @click="$emit('close')" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                {{ warehouse.name }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <span style="font-size: 12px">
                                    ID : {{ warehouse.id }}
                                    <v-icon size="12" @click="copy(warehouse.id)" right>mdi-content-copy</v-icon>
                                </span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-toolbar-title>
            </v-app-bar>
        </template>

        <v-container>
            <v-row justify="center" align="center">
                <v-col cols="12">
                    <v-simple-table v-if="warehouse">
                        <template #default>
                            <tbody>
                                <tr>
                                    <td class="font-weight-bold">Nombre</td>
                                    <td>{{ warehouse.name }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Ciudad</td>
                                    <td>{{ warehouse.country }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Estado</td>
                                    <td>{{ warehouse.state }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Municipio</td>
                                    <td>{{ warehouse.city }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Colonia</td>
                                    <td>{{ warehouse.neighborhood }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Calle</td>
                                    <td>{{ warehouse.street }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Número ext.</td>
                                    <td>{{ warehouse.ext_number }}</td>
                                </tr>
                                <tr v-if="warehouse.int_number">
                                    <td class="font-weight-bold">Número int.</td>
                                    <td>{{ warehouse.int_number }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Código postal</td>
                                    <td>{{ warehouse.zipcode }}</td>
                                </tr>
                                <tr v-if="warehouse.phone">
                                    <td class="font-weight-bold">Teléfono</td>
                                    <td>{{ warehouse.phone }}</td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">Creación</td>
                                    <td>{{ warehouse.created_at }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>    
        </v-container>


    </v-navigation-drawer>
</template>

<script>
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'

export default defineComponent({

    props:{
        dialog:{
            required:true,
            type:Boolean,
            default:false,
        },

        warehouse:{
            required:true,
            type:Object,
        }
    },

    emits:['close'],

    setup(props, { emit }) {

        const { $vuetify } = useContext() 

        const show = computed({
            get: () => props.dialog,
            set: (val) => !val ? emit('close') : val
        })

        const size = computed(() => {
            switch ($vuetify.breakpoint.name) {
                case 'xs': return '100%'
                case 'sm': return '50%'
                case 'md': return '30%'
                case 'lg': return '35%'
                case 'xl': return '35%'
            }
        })

        const copy = text => {
            navigator.clipboard.writeText(text)
        }

        return {
            size,
            show,
            copy,
        }

    },
})
</script>
