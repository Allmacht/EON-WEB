<template>
    <div>
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
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" xl="9" lg="8" class="text-right">
                            <v-btn class="text-capitalize" :color="$store.state.primary" dark>
                                Nuevo almacén
                                <v-icon right>mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
    
                <v-col cols="12">
                    <v-card :loading="loading">
                        <v-card-text>
                            <v-data-table 
                                :items="warehouses" 
                                :loading="loading" 
                                :headers="headers"
                                :footer-props="footer"
                                :search="search"
                                no-results-text="Sin resultados"
                            >
                                <template #item.actions="{ item }">
                                    <v-menu>
                                        <template #activator="{ attrs, on }">
                                            <v-btn icon v-bind="attrs" v-on="on">
                                                <v-icon>mdi-menu</v-icon>
                                            </v-btn>
                                        </template>
    
                                        <v-list>
                                            <v-list-item @click="() => { showWarehouseItem = item; showWarehouseDialog = true }">
                                                <v-list-item-title>Mostrar</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title>Editar</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title>Eliminar</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <show-warehouse :dialog="showWarehouseDialog" :warehouse="showWarehouseItem" @close="showWarehouseDialog = false"></show-warehouse>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"WarehousesIndex",
    layout:"app",
    middleware:"auth",

    setup() {
        
        const { $axios, $notify } = useContext();
        const version             = process.env.API_VERSION
        const warehouses          = ref([])
        const search              = ref("")
        const loading             = ref(true)
        const showWarehouseDialog = ref(false)
        const showWarehouseItem   = reactive({})
        const footer              = {
            itemsPerPageAllText: 'Todo',
            itemsPerPageText: 'Registros por página',
        }
        const headers             = [
            { text:"Nombre",    value:"name"    },
            { text:"País",      value:"country" },
            { text:"Estado",    value:"state"   },
            { text:"Domicilio", value:"address" },
            { text:"",          value:"actions" }
        ]

        onMounted(() => getWarehouses())

        const getWarehouses = async () => {
            
            try{
                const response = await $axios.get(`/api/${version}/warehouses`);
                warehouses.value = response.data.data
            }
            catch(err){
                $notify.error({
                    title:"Error",
                    message:"Ha ocurrido un error al procesar su solicitud, intente más tarde."
                })
            }
            finally{
                loading.value = false
            }
        }



        return {
            footer,
            search,
            loading,
            headers,
            warehouses,
            showWarehouseItem,
            showWarehouseDialog
        }

    },

    head() {
        return {
            title:"Almacenes"
        }
    }
})
</script>
