<template>
    <div>
        <v-app-bar height="100" elevation="1" absolute class="app-bar subtitle-app-bar" color="white">
            <v-app-bar-title class="title title-color">Nueva paqutería</v-app-bar-title>
            
            <v-spacer></v-spacer>
            
            <v-btn  text class="mr-2" :to="{ name:'catalogs-shipping-services' }" exact :disabled="loading">
                <v-icon left>mdi-chevron-left</v-icon>
                Atrás
            </v-btn>
            <v-btn :color="$store.state.primary" dark :loading="loading" @click="submit()">Crear</v-btn>
        </v-app-bar>

        <v-container class="page-margin">    
            <v-row justify="center">
                <v-col cols="12" xl="6" lg="4" md="4">
                    <v-card flat :color="$store.state.background">
                        <v-card-text class="pa-0">
                            <v-form ref="newShippingServiceForm" :disabled="loading">
                                <v-text-field v-model="form.name" outlined label="Nombre de la paquetería" :rules="[required]" />
                                <v-text-field v-model="form.email" outlined label="Correo de contacto"/>
                                <v-text-field v-model="form.contact" outlined label="Nombre de contacto"/>
                                <v-text-field v-model="form.phone" v-mask="'+## (###) ### ####'" outlined label="Teléfono"/>
                                <v-file-input v-model="form.image[0]" label="Logotipo" outlined @change="previewImage(form.image[0])"/>

                                <v-card-subtitle class="px-0">
                                    Credenciales <br>
                                    Añada las credenciales requeridas para el uso de la paquetería, separadas por coma (,)
                                </v-card-subtitle>

                                <v-text-field v-model="form.credentials" outlined :rules="[required]" @keydown.space.prevent></v-text-field>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
    
                <v-col cols="12" xl="4" lg="4" md="4">
                    <v-card outlined>
                        <v-img class="mx-auto" height="250" width="90%" :src="preview" contain></v-img>
                        <v-divider></v-divider>
                        <v-card-title>
                            <v-icon color="success">mdi-circle-medium</v-icon>{{ form.name ? form.name : 'Nueva paquetería' }}
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
import { defineComponent, reactive, ref, useContext, useRouter } from '@nuxtjs/composition-api'
import {mask} from 'vue-the-mask'

export default defineComponent({

    name:"CreateShippingServicePage",
    directives:{mask},
    layout:"app",


    setup() {

        const { $axios, $notify }    = useContext()
        const newShippingServiceForm = ref(null)
        const router                 = useRouter()
        const loading                = ref(false)
        const version                = process.env.API_VERSION
        const preview                = ref(null)

        const form = reactive({
            name:"",
            email:"",
            contact:"",
            phone:"",
            image:[],
            credentials:"",
        })

        const required = value => !!value || 'El campo es requerido'

        const previewImage = image => {
            preview.value = image ? URL.createObjectURL(image) : null
        }

        const submit = async() => {

            if(!newShippingServiceForm.value.validate()) return

            loading.value = true
            
            try{
                form.image[0] ??= ""

                const data = new FormData
                data.append('name', form.name)
                data.append('email', form.email)
                data.append('contact', form.contact)
                data.append('phone', form.phone)
                data.append('image', form.image[0])
                data.append('credentials', JSON.stringify(form.credentials.split(',')));

                await $axios.post(`/api/${version}/shipping-services/store`, data)

                $notify.success({
                    title:"Correcto",
                    message:"Paquetería registrada correctamente."
                })

                router.push({name:'catalogs-shipping-services'})
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
            form,
            submit,
            loading,
            preview,
            required,
            previewImage,
            newShippingServiceForm
        }

    },

    head(){
        return {
            title:"Nueva paquetería"
        }
    }
})
</script>
