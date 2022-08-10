<template>
    <div v-if="shippingService">
        <v-app-bar height="100" elevation="1" absolute class="app-bar subtitle-app-bar" color="white">
            <v-app-bar-title class="title title-color">{{ shippingService.name }}</v-app-bar-title>
            
            <v-spacer></v-spacer>
            
            <v-btn  text class="mr-2" :to="{ name:'catalogs-shipping-services' }" exact :disabled="loading">
                <v-icon left>mdi-chevron-left</v-icon>
                Atrás
            </v-btn>
            <v-btn :color="$store.state.primary" dark :loading="loading" @click="submit()">Actualizar</v-btn>
        </v-app-bar>

        <v-container class="page-margin">
            <v-row justify="center">
    
                <v-col cols="12" xl="6" lg="4" md="4">
                    <v-card flat :color="$store.state.background">
                        <v-card-text class="pa-0" v-if="shippingService">
                            <v-form ref="updateShippingServiceForm" :disabled="loading" @submit.prevent="submit()">
                                <v-text-field outlined v-model="shippingService.name" label="Nombre de la paquetería" :rules="[required]" />
                                <v-text-field outlined v-model="shippingService.email" label="Correo de contacto"/>
                                <v-text-field outlined v-model="shippingService.contact" label="Nombre de contacto"/>
                                <v-text-field outlined v-model="shippingService.phone" v-mask="'+## (###) ### ####'" label="Teléfono"/>
                                <v-file-input outlined v-model="newImage[0]" @change="changePreview()" label="Logotipo"/>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
    
                <v-col cols="12" xl="4" lg="4" md="4">
                    <v-card outlined>
                        <v-img class="mx-auto" height="250" width="90%" :src="image" contain></v-img>
                        <v-divider></v-divider>
                        <v-card-title v-if="shippingService">
                            <v-icon color="success">mdi-circle-medium</v-icon>{{ shippingService.name ? shippingService.name : 'Nueva paquetería' }}
                            <v-spacer></v-spacer>
                            <v-chip color="warning">STAGE</v-chip>
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { defineComponent, ref, useAsync, useContext, useRoute } from '@nuxtjs/composition-api'
import {mask} from 'vue-the-mask'

export default defineComponent({

    name:"EditShippingServicePage",
    layout:"app",
    directives:{mask},

    setup() {
        
        const { $axios, $notify } = useContext()
        const version = process.env.API_VERSION
        const apiDomain = process.env.API_DOMAIN
        const updateShippingServiceForm = ref(null)
        const loading = ref(true)
        const newImage = ref([])
        const route = useRoute()
        const image = ref("")

        const required = value => !!value || 'El campo es requerido'

        const changePreview = () => {
            if(newImage.value[0]){
                image.value = URL.createObjectURL(newImage.value[0])
                return
            }

            image.value = `${apiDomain}/storage/${shippingService.value.image}`
        }

        const shippingService = useAsync(async () => {

            try{
                const response = await $axios.get(`/api/${version}/shipping-services/${route.value.params.id}`)
                image.value = `${apiDomain}/storage/${response.data.data.image}`
                loading.value = false
                return response.data.data
            }

            catch(err){

                loading.value = false

                $notify.error({
                    title:"Error",
                    message:"Ha ocurrido un error al procesar su solicitud, intente más tarde."
                })

                return false
            }
        })

        const submit = async () => {

            if(!updateShippingServiceForm.value.validate()) return

            loading.value = true

            try{

                const data = new FormData()
                data.append('name', shippingService.value.name)
                data.append('email', shippingService.value.email)
                data.append('contact', shippingService.value.contact)
                data.append('phone', shippingService.value.phone)
                data.append('image', newImage.value[0] ??= "")

                await $axios.post(`/api/${version}/shipping-services/update/${shippingService.value.id}`, data)

                $notify.success({
                    title:"Correcto",
                    message:"Paqutería actualizada correctamente"
                })
            }

            catch(err){
                
               if(err.response.status === 422){
                    for(const prop in err.response.data.errors){
                        err.response.data.errors[prop].map(message => $notify.error({title:"Error", message}))
                    }

                    return
                }

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
            image,
            submit,
            loading,
            required,
            newImage,
            changePreview,
            shippingService,
            updateShippingServiceForm
        }
        
    },

    head(){
        return {
            title:this.shippingService?.name
        }
    }
})
</script>
