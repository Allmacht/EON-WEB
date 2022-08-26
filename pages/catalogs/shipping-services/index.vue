<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12">
                <v-row justify="center" align="center">
                    <v-col>
                        <p class="mb-0 title title-color">Paqueterías</p>
                    </v-col>
                    <v-col class="text-right">
                        <v-text-field
                            v-model="search"
                            @keyup="filter"
                            :color="$store.state.primary" 
                            prepend-inner-icon="mdi-magnify"
                            placeholder="Buscar..."
                            outlined
                            dense
                            hide-details
                        >
                            <template #append-outer>
                                <v-btn class="text-capitalize" :color="$store.state.primary" dark :to="{ name:'catalogs-shipping-services-create' }">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <v-row>
                    <template v-if="dataFiltered.length > 0">
                        <v-col cols="12" xl="4" lg="4" md="6" v-for="shippingService in dataFiltered" :key="shippingService.id">
                            <v-card outlined>
                                <v-img class="mx-auto" height="150" width="60%" :src="`${apiDomain}/storage/${shippingService.image}`" contain></v-img>
                                <v-divider></v-divider>
                                <v-card-title>
                                    <v-icon color="success">mdi-circle-medium</v-icon>{{ shippingService.name }}
                                    <v-spacer></v-spacer>
                                    <v-icon @click="shippingService.show = !shippingService.show">
                                        {{ shippingService.show ? 'mdi-chevron-up' : 'mdi-chevron-down'}}
                                    </v-icon>
                                </v-card-title>

                                <v-expand-transition>
                                    <div v-show="shippingService.show">
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <v-list-item class="px-0">
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ shippingService.contact }}</v-list-item-title>
                                                    <v-list-item-subtitle>
                                                        {{ shippingService.email }}
                                                    </v-list-item-subtitle>
                                                    <v-list-item-subtitle>
                                                        {{ shippingService.phone }}
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>

                                                <v-list-item-action>
                                                    <v-icon :color="$store.state.primary">mdi-email-arrow-right-outline</v-icon>
                                                </v-list-item-action>
                                            </v-list-item>
                                        </v-card-text>

                                        <v-divider></v-divider>
                                        
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn text :to="{ name:'catalogs-shipping-services-edit-id', params:{ id:shippingService.id } }">Editar</v-btn>
                                            <v-btn color="error" @click="() => { deleteId = shippingService.id; deleteDialog = true }">Eliminar</v-btn>
                                        </v-card-actions>
                                    </div>
                                </v-expand-transition>
                            </v-card>
                        </v-col>
                    </template>

                    <v-col v-else cols="12" class="text-center text--disabled pt-10">Sin resultados</v-col>
                </v-row>
            </v-col>
        </v-row>

        <delete-shipping-service :dialog="deleteDialog" :id="deleteId" @close="deleteDialog = false" @update="getShippingServices()"></delete-shipping-service>
    </v-container>
</template>

<script>
import { defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'


export default defineComponent({

    name:"ShippingServicesPage",
    layout:"app",

    setup() {
        
        const { $axios, $notify } = useContext()
        const version = process.env.API_VERSION
        const apiDomain = process.env.API_DOMAIN
        const search = ref("")
        const deleteId = ref("")
        const deleteDialog = ref(false)
        const shippingServices = ref([])
        const dataFiltered = ref([])

        onMounted(() => getShippingServices())

        const getShippingServices = async () => {
            try{
                const response = await $axios.get(`/api/${version}/shipping-services`)
                dataFiltered.value = shippingServices.value = response.data.data.map(x => Object.assign({}, x, { "show": false }))
            }

            catch(err){
                $notify.error({
                    title:"Error",
                    message:"Ha ocurrido un error al procesar su solicitud, intente más tarde.",
                })
            }
        }

        const filter = () => {
            dataFiltered.value = shippingServices.value.filter(service => 
                (service.name.toLowerCase()).includes(search.value.toLowerCase())
            )
        }

        return {
            filter,
            search,
            deleteId,
            apiDomain,
            deleteDialog,
            dataFiltered,
            shippingServices,
            getShippingServices
        }

    },

    head(){
        return {
            title:"Paqueterías"
        }
    }
})
</script>
