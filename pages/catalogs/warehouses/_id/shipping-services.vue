<template>
    <v-container>
        
    </v-container>
</template>

<script>
import { defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"ShippingServicesPerWarehousePage",
    layout:"app",

    setup() {

        const { $axios, $notify } = useContext()
        const version = process.env.API_VERSION
        const apiDomain = process.env.API_DOMAIN
        const shippingServices = ref([])

        onMounted(() => getShippingServices())


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
