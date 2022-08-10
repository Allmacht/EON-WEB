<template>
    <catalogs>
        <v-container>
            <v-row justify="center" align="center">
                <v-col cols="12">
                    <v-row justify="center" align="center">
                        <v-col>
                            <p class="title title-color mb-0">Almacenes</p>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="search" @keyup="searchFilter()" outlined dense hide-details prepend-inner-icon="mdi-magnify" placeholder="Buscar...">
                                <template #append-outer>
                                    <v-tooltip bottom>
                                        <template #activator="{ attrs, on }">
                                            <v-btn v-bind="attrs" v-on="on" :color="$store.state.primary" :to="{ name: 'catalogs-warehouses-create'}" dark>
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Nuevo almacén</span>
                                    </v-tooltip>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12">
                    <v-list class="list" three-line>
                        <template v-if="filtered.length > 0">
                            <v-card class="mb-2" outlined v-for="(warehouse, index) in filtered" :key="index">
                                <v-card-title>
                                    <v-avatar class="mr-2" :color="$store.state.primary" size="36">
                                        <span class="white--text">
                                            {{ warehouse.acronym }}
                                        </span>
                                    </v-avatar>

                                    {{ warehouse.name }}
                                    
                                    <v-spacer></v-spacer>

                                    <v-menu>
                                        <template #activator="{ attrs, on }">
                                            <v-btn icon v-bind="attrs" v-on="on">
                                                <v-icon>mdi-menu</v-icon>
                                            </v-btn>
                                        </template>
    
                                        <v-list>
                                            <v-list-item @click="() => { showWarehouseItem = warehouse; showWarehouseDialog = true }">
                                                <v-list-item-title>
                                                    Mostrar
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item :to="{ name:'catalogs-warehouses-id-shipping-services', params:{ id:warehouse.id } }">
                                                <v-list-item-title>
                                                    Paqueterías
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item :to="{name:'catalogs-warehouses-edit-id', params:{ id:warehouse.id }}">
                                                <v-list-item-title>
                                                    Editar
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="() => { idWarehouseDelete = warehouse.id; delWarehouseDialog = true; }">
                                                <v-list-item-title>
                                                    Eliminar
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-card-title>

                                <v-card-text>
                                    {{ `${warehouse.address}, ${warehouse.state} ${warehouse.country}` }}
                                </v-card-text> 
                            </v-card>
                        </template>

                        <v-card v-else outlined>
                            <v-card-text class="text-center text--disabled">
                                Sin resultados
                            </v-card-text>
                        </v-card>
                    </v-list>
                </v-col>
            </v-row>
        </v-container>

        <show-warehouse
            :dialog="showWarehouseDialog"
            :warehouse="showWarehouseItem"
            @close="showWarehouseDialog = false"
        ></show-warehouse>

        <delete-warehouse
            :dialog="delWarehouseDialog"
            :warehouse="idWarehouseDelete"
            @close="delWarehouseDialog = false"
            @update="getWarehouses()"
        ></delete-warehouse>
    </catalogs>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"WarehousesIndex",
    layout:"app",

    setup() {
        
        const { $axios, $notify } = useContext();
        const version             = process.env.API_VERSION
        const warehouses          = ref([])
        const filtered            = ref([])
        const search              = ref("")
        const loading             = ref(true)
        const showWarehouseDialog = ref(false)
        const delWarehouseDialog  = ref(false)
        const idWarehouseDelete   = ref("")
        const showWarehouseItem   = reactive({})

        onMounted(() => getWarehouses())

        const getWarehouses = async () => {
            
            try{
                const response = await $axios.get(`/api/${version}/warehouses`);
                filtered.value = warehouses.value = response.data.data
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

        const searchFilter = () => {
            filtered.value = warehouses.value.filter(w => 
                (w.name.toLowerCase()).includes(search.value.toLowerCase()) ||
                (w.street.toLowerCase()).includes(search.value.toLowerCase()) ||
                (w.ext_number.toString().toLowerCase()).includes(search.value.toLowerCase()) ||
                (w.neighborhood.toLowerCase()).includes(search.value.toLowerCase()) ||
                (w.country.toLowerCase()).includes(search.value.toLowerCase()) ||
                (w.state.toLowerCase()).includes(search.value.toLowerCase())
            )
        }

        return {
            search,
            loading,
            filtered,
            warehouses,
            searchFilter,
            getWarehouses,
            showWarehouseItem,
            idWarehouseDelete,
            delWarehouseDialog,
            showWarehouseDialog,
        }

    },

    head() {
        return {
            title:"Almacenes"
        }
    }
})
</script>


<style>
    .v-input__append-outer{
        margin: 0 !important;
        margin-left: 5px !important;
        margin-top: 2px !important;
    }
</style>