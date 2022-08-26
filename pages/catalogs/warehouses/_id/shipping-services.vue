<template>
    <div v-if="warehouse">
        <v-app-bar height="100" elevation="1" absolute class="app-bar subtitle-app-bar" color="white">
            <v-app-bar-title class="title title-color">
                <v-avatar :color="$store.state.primary" class="mr-1" size="40">
                    <span class="white--text text-h7">
                        {{ warehouse.acronym }}
                    </span>
                </v-avatar>

                {{ warehouse.name }}
            </v-app-bar-title>
        </v-app-bar>
        
        <v-container>
            
        </v-container>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref, useAsync, useContext, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"ShippingServicesPerWarehousePage",
    layout:"app",

    setup() {

        const route = useRoute()

        const { $axios, $notify } = useContext()
        const version = process.env.API_VERSION
        const apiDomain = process.env.API_DOMAIN
        const shippingServices = ref([])

        onMounted(() => getShippingServices())

        const warehouse = useAsync(async () => {
            const response = await $axios.get(`/api/${version}/warehouses/${route.value.params.id}`);
            return response.data.data
        })

        const getShippingServices = async () => {
            try{
                const response = await $axios.get(`/api/${version}/shipping-services`)
                shippingServices.value = response.data.data
            }

            catch(err){
                $notify.error({
                    title:"Error",
                    message:"Ha ocurrido un error al procesar su solicitud, intente más tarde.",
                })
            }
        }

        return {
            warehouse,
            apiDomain,
            shippingServices
        }
    },

    head(){
        return {
            title:"Paqueterías por almacén"
        }
    }
})
</script>
