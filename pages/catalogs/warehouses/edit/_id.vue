<template>
    <div v-if="warehouse">
        <v-app-bar height="100" elevation="1" absolute class="app-bar subtitle-app-bar" color="white">
            <v-app-bar-title class="title title-color">
                <v-avatar :color="$store.state.primary" class="mr-1" size="40">
                    <span class="white--text text-h7">
                        {{ avatar }}
                    </span>
                </v-avatar>

                {{ warehouse.name }}
            </v-app-bar-title>
            
            <v-spacer></v-spacer>
            
            <v-btn  text class="mr-2" :to="{ name:'catalogs-warehouses' }" exact :disabled="loading">
                <v-icon left>mdi-chevron-left</v-icon>
                Atrás
            </v-btn>
            <v-btn :color="$store.state.primary" dark :loading="loading" @click="submit()">Actualizar</v-btn>
        </v-app-bar>

        <v-container class="page-margin">
            <v-row justify="center" align="center">
                <v-col cols="12" xl="8">
                    <v-form ref="updateForm" @submit.prevent="submit()">
                        <v-card-subtitle class="px-0">Datos Generales</v-card-subtitle>

                        <v-row>
                            <v-col class="py-0">
                                <v-text-field v-model="warehouse.name" :rules="[required]" outlined label="Nombre" />
                            </v-col>
                            <v-col class="py-0">
                                <v-text-field v-model="warehouse.phone" v-mask="'+## (###) ### ####'" outlined label="Teléfono"></v-text-field>
                            </v-col>
                        </v-row>


                        <v-card-subtitle class="px-0">Dirección</v-card-subtitle>

                        <v-row>
                            <v-col cols="12" xl="6" class="py-0">
                                <v-autocomplete v-model="warehouse.country" :items="countries" item-text="es" item-value="name" outlined no-data-text="Sin coincidencias" label="País" :rules="[required]">
                                    <template #selection="{ item }">
                                        {{ `${item.emoji} ${item.es}` }}
                                    </template>
                                    <template #item="{ item }">
                                        {{ `${item.emoji} ${item.es}` }}
                                    </template>
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" xl="6" class="py-0">
                                <v-autocomplete v-if="countryStates" v-model="warehouse.state" :items="countryStates" item-text="name" item-value="name" outlined label="Estado" placeholder="Selecciona un estado"  :rules="[required]"/>
                                <v-text-field v-else v-model="warehouse.state" outlined label="Estado" :rules="[required]"/>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" xl="6" class="py-0">
                                <v-text-field v-model="warehouse.city" label="Municipio" outlined :rules="[required]"/>
                            </v-col>
                            <v-col cols="12" xl="6" class="py-0">
                                <v-text-field v-model="warehouse.neighborhood" label="Colonia" outlined :rules="[required]"/>
                            </v-col>
                        </v-row>


                        <v-text-field v-model="warehouse.street" label="Calle" outlined :rules="[required]"/>

                        <v-row>
                            <v-col cols="12" xl="4" lg="4" class="p-2">
                                <v-text-field v-model="warehouse.ext_number" label="No. Exterior" outlined :rules="[required]"/>
                            </v-col>
                            <v-col cols="12" xl="4" lg="4" class="pt-2">
                                <v-text-field v-model="warehouse.int_number" label="No. Interior" outlined />
                            </v-col>
                            <v-col cols="12" xl="4" lg="4" class="pt-2">
                                <v-text-field v-model="warehouse.zipcode" label="Código postal" outlined :rules="[required]"/>
                            </v-col>
                        </v-row>

                        <v-card-subtitle class="px-0">Mapa</v-card-subtitle>

                        <v-text-field v-model="warehouse.map" outlined label="Mapa" hide-details />
                        <v-col v-if="warehouse.map" cols="12" class="px-0 py-0 responsive-map-container" v-html="warehouse.map" />  
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { computed, defineComponent, useAsync, useContext, useRoute, ref } from '@nuxtjs/composition-api'
import {mask} from 'vue-the-mask'
import countriesJson from '@/assets/countries.json'
import statesJson from '@/assets/states.json'

export default defineComponent({

    name:"ShowWarehousePage",
    layout:"app",
    directives:{mask},

    setup() {

        const { $axios, $notify } = useContext()

        const version    = process.env.API_VERSION
        const route      = useRoute()
        const countries  = countriesJson
        const updateForm = ref(null)
        const states     = statesJson
        const loading    = ref(false)

        const warehouse  = useAsync(async () => {
            const response = await $axios.get(`/api/${version}/warehouses/${route.value.params.id}`);
            return response.data.data
        })

        const avatar = computed(() => {
            
            if(!warehouse.value) return ''

            const names = warehouse.value.name.split(' ')

            let avatar = `${names[0].slice(0,2)}`.toUpperCase()

            if(names.length > 1){
                avatar = `${names[0].slice(0,1)}${names[1].slice(0,1)}`.toUpperCase()
            }

            return avatar
        })

        const countryStates = computed(() => {

            const country = countries.filter(country => country.es === warehouse.value.country || country.name === warehouse.value.country)
            
            return country[0] && states[country[0].es] && states[country[0].es].length > 0 ? states[country[0].es] : country[0] && country[0].es ? states[country[0].name] : []

        })
        
        const required = value => !!value || 'El campo es requerido'

        document.onkeydown = (e) => {
            if(e.ctrlKey && e.key === 's'){
                e.preventDefault()
                submit()
            }
        }

        const submit = async() => {

            if(!updateForm.value.validate()) return

            loading.value = true

            try{
                await $axios.patch(`/api/${version}/warehouses/update/${warehouse.value.id}`, warehouse.value)
                $notify.success({
                    title:"Correcto",
                    message:"Información actualizada correctamente."
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
            avatar,
            states,
            submit,
            loading,
            required,
            countries,
            warehouse,
            updateForm,
            countryStates
        }
    },

    head(){
        return {
            title:this.warehouse?.name
        }
    }
})
</script>


<style>
    .responsive-map iframe{
        width: 100%;
        height:50vh;
    }
</style>