<template>
    <v-container v-if="warehouse">
        
    </v-container>
</template>

<script>
import { defineComponent, useAsync, useContext, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"ShowWarehousePage",
    layout:"app",
    middleware:"auth",

    setup() {

        const { $axios } = useContext()
        const version    = process.env.API_VERSION
        const route      = useRoute()

        const warehouse  = useAsync(async () => {
            const response = await $axios.get(`/api/${version}/warehouses/${route.value.params.id}`);
            return response.data.data
        })

        return {
            warehouse
        }
    },

    head(){
        return {
            title:this.warehouse?.name
        }
    }
})
</script>
