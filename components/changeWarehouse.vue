<template>
    <v-menu v-if="current" offset-y :close-on-content-click="false">
        <template #activator="{ attrs, on }">
            <v-btn class="text-capitalize px-1 change-warehouse" :color="$store.state.primary" :loading="loading" text v-bind="attrs" v-on="on">
                {{ current.name }}
                <v-icon right :color="$store.state.primary">mdi-unfold-more-horizontal</v-icon>
            </v-btn>
        </template>

        <v-list>

            
            <v-text-field v-model="search" @keyup="filter()" class="pt-0 pa-2 search-input" hide-details prepend-icon="mdi-magnify" placeholder="Buscar..."></v-text-field>

            <v-divider></v-divider>

            <v-subheader class="my-0">Almacenes</v-subheader>

            <v-list-item-group>
                <template v-if="filtered.length > 0">
                    <v-list-item v-for="warehouse in filtered" :key="warehouse.id" @click="handleChangeWarehouse(warehouse)">
                        <v-list-item-title v-text="warehouse.name"></v-list-item-title>
                    </v-list-item>
                </template>

                <v-list-item v-else>
                    <v-list-item-title class="text--disabled">Sin resultados</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script>
import { computed, defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"ChangeWarehouseComponent",

    setup() {
        
        const { $axios, $notify, $auth } = useContext()
        const version                    = process.env.API_VERSION
        const warehouses                 = ref([])
        const filtered                   = ref([])
        const search                     = ref("")
        const loading                    = ref(true)

        onMounted(() => getWarehouses())

        const current = computed(() => {
            
            let current = null

            warehouses.value.forEach(warehouse => {
                if(warehouse.id === $auth.user.data.warehouse){
                    current = warehouse
                }
            })

            return current
        })


        const getWarehouses = async() => {

            try{
                const response = await $axios.get(`/api/${version}/warehouses/my-warehouses`)
                filtered.value = warehouses.value = response.data.data
                loading.value = false
            }
            catch(err){
                $notify.error({
                    title:"Error",
                    message:"Ha ocurrido un error al consultar los almacenes (1)"
                })
            }
        }

        const handleChangeWarehouse = async(warehouse) => {

            try{
                loading.value  = true
                const response = await $axios.patch(`/api/${version}/users/update-warehouse`, { warehouse_id:warehouse.id })
                $auth.setUser(response.data)
                location.reload()
            }
            catch(err){

                $notify.error({
                    title:"Error",
                    message:"Ha ocurrido un error al actualizar el almacén"
                })

            }
            finally{
                loading.value = false
            }
        }

        const filter = () => {
            filtered.value = warehouses.value.filter(warehouse => (warehouse.name.toLowerCase()).includes(search.value.toLowerCase()))
        }

        return {
            search,
            filter,
            current,
            loading,
            filtered,
            warehouses,
            handleChangeWarehouse,
        }

    },
})
</script>
