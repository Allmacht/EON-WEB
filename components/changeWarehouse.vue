<template>
    <v-menu v-if="current" offset-y>
        <template #activator="{ attrs, on }">
            <v-btn class="text-capitalize py-6" :loading="loading" text v-bind="attrs" v-on="on">
                {{ current.name }}
                <v-icon right :color="$store.state.primary">mdi-chevron-down</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item-group>
                <v-list-item v-for="warehouse in warehouses" :key="warehouse.id" @click="handleChangeWarehouse(warehouse)">
                    <v-list-item-title v-text="warehouse.name"></v-list-item-title>
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
                warehouses.value = response.data.data
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
                const response = await $axios.put(`/api/${version}/users/update-warehouse`, { warehouse_id:warehouse.id })
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

        return {
            loading,
            current,
            warehouses,
            handleChangeWarehouse,
        }

    },
})
</script>
