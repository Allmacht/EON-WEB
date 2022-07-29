<template>
    <v-navigation-drawer v-model="show" app temporary right :width="size" :class="{ 'mx-3 mt-3': size !== '100%', 'rounded-lg':true }">
        <template #prepend>
            <v-app-bar :color="$store.state.primary" dark>
                <v-btn icon @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold" v-text="warehouse.name" />
                            <v-list-item-subtitle>
                                <span style="font-size: 12px">
                                    ID : {{ warehouse.id }}
                                    <v-icon size="12" right @click="copy(warehouse.id)">mdi-content-copy</v-icon>
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
                                    <td class="font-weight-bold">País</td>
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
                                <tr v-if="warehouse.created_at !== warehouse.updated_at">
                                    <td class="font-weight-bold">Última actualización</td>
                                    <td>{{ warehouse.updated_at }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>

                <v-col v-if="warehouse.map" cols="12" class="px-0 py-0 responsive-map-container" v-html="warehouse.map" />                    
                
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

        const title = computed(() => props.warehouse && show.value === true ? props.warehouse.name : 'Almacenes')

        const size  = computed(() => {
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
            title,
        }

    },

    head(){
        return {
            title: this.title
        }
    }
})
</script>

<style>
    .responsive-map-container iframe{
        width: 100%;
        min-height: 475px;
    }
</style>
