<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12" xl="6" lg="7" class="mb-10">
                <v-card flat :color="$store.state.background" :disabled="loading">
                    <div class="create-element-div-header">
                        <v-card-title>
                            <v-avatar :color="$store.state.primary" class="mr-3" size="40">
                                <span class="white--text text-h7">
                                    {{ avatar ? avatar : 'WH' }}
                                </span>
                            </v-avatar>
                            {{ form.name ? form.name : 'Nuevo almacén' }}

                            <v-spacer></v-spacer>

                            <span class="text--disabled"  style="font-size:11px; float:right">
                                <v-btn small style="float:right" :color="$store.state.primary" dark :loading="loading" @click="submit()">Crear</v-btn>
                                <v-btn small text style="float:right" class="mr-2" :to="{ name:'warehouses' }" exact :disabled="loading">
                                    <v-icon left>mdi-chevron-left</v-icon>
                                    Atrás
                                </v-btn>
                            </span>
                        </v-card-title>

                        <v-divider></v-divider>
                    </div>

                    <v-card-text>
                        <v-form ref="createForm" @submit.prevent="submit()">
                            <v-card-subtitle class="px-0">Datos Generales</v-card-subtitle>

                            <v-text-field v-model="form.name" filled label="Nombre" :rules="[required]"/>
                            <v-text-field v-model="form.phone" v-mask="'(###) ###-####'" filled label="Teléfono"></v-text-field>

                            <v-card-subtitle class="px-0">Dirección</v-card-subtitle>

                            <v-row>
                                <v-col cols="12" xl="6" class="py-0">
                                    <v-autocomplete v-model="form.country" :items="countries" item-text="es" item-value="name" filled no-data-text="Sin coincidencias" label="País" :rules="[required]">
                                        <template #selection="{ item }">
                                            {{ `${item.emoji} ${item.es}` }}
                                        </template>
                                        <template #item="{ item }">
                                            {{ `${item.emoji} ${item.es}` }}
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="12" xl="6" class="py-0">
                                    <v-autocomplete v-if="countryStates" v-model="form.state" :items="countryStates" item-text="name" item-value="name" no-data-text="Sin coincidencias" filled label="Estado" placeholder="Selecciona un estado"  :rules="[required]"/>
                                    <v-text-field v-else v-model="form.state" filled label="Estado" :rules="[required]"/>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" xl="6" class="py-0 pb-2">
                                    <v-text-field v-model="form.city" label="Municipio" filled :rules="[required]"/>
                                </v-col>
                                <v-col cols="12" xl="6" class="py-0 pb-2">
                                    <v-text-field v-model="form.neighborhood" label="Colonia" filled :rules="[required]"/>
                                </v-col>
                            </v-row>

                            <v-text-field v-model="form.street" label="Calle" filled :rules="[required]"/>

                            <v-row>
                                <v-col cols="12" xl="4" lg="4" class="p-2">
                                    <v-text-field type="number" v-model="form.ext_number" label="No. Exterior" filled :rules="[required]"/>
                                </v-col>
                                <v-col cols="12" xl="4" lg="4" class="pt-2">
                                    <v-text-field v-model="form.int_number" label="No. Interior" filled />
                                </v-col>
                                <v-col cols="12" xl="4" lg="4" class="pt-2">
                                    <v-text-field v-model="form.zipcode" v-mask="'#####'" label="Código postal" filled :rules="[required, zipcode]"/>
                                </v-col>
                            </v-row>

                            <v-card-subtitle class="px-0">Mapa</v-card-subtitle>

                            <v-text-field v-model="form.map" filled label="Mapa" hide-details />
                            <v-col v-if="form.map" cols="12" class="px-0 py-0 responsive-map-container" v-html="form.map" /> 
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { defineComponent, reactive, ref, computed, useContext, useRouter } from '@nuxtjs/composition-api'
import {mask} from 'vue-the-mask'
import countriesJson from '@/assets/countries.json'
import statesJson from '@/assets/states.json'

export default defineComponent({

    name:"CreateWarehousePage",
    directives:{mask},
    layout:"app",
    middleware:"auth",

    setup() {
        
        const { $axios, $notify } = useContext()
        const version             = process.env.API_VERSION
        const router              = useRouter()
        const countries           = countriesJson
        const createForm          = ref(null)
        const states              = statesJson
        const loading             = ref(false)

        const form = reactive({
            name:"",
            phone:"",
            country:"",
            state:"",
            city:"",
            neighborhood:"",
            street:"",
            ext_number:"",
            int_number:"",
            zipcode:"",
            map:""
        })

        const required = value => !!value || 'El campo es requerido'

        const zipcode = value => value.length >= 5 || 'Debe contener al menos 5 caracteres'

        const avatar = computed(() => {
            
            if(!form.name) return ''

            const names = form.name.split(' ')

            let avatar = `${names[0].slice(0,2)}`.toUpperCase()

            if(names.length > 1){
                avatar = `${names[0].slice(0,1)}${names[1].slice(0,1)}`.toUpperCase()
            }

            return avatar
        })

        const countryStates = computed(() => {

            const country = countries.filter(country => country.es === form.country || country.name === form.country)
            
            return country[0] && states[country[0].es] && states[country[0].es].length > 0 ? states[country[0].es] : country[0] && country[0].es ? states[country[0].name] : []

        })

        document.onkeydown = (e) => {
            if(e.ctrlKey && e.key === 's'){
                e.preventDefault()
                submit()
            }
        }

        const submit = async () => {

            if(!createForm.value.validate()) return

            loading.value = true

            try{
                await $axios.put(`/api/${version}/warehouses/store`, form)
                
                $notify.success({
                    title:"correcto",
                    message:"Se ha creado el almacén correctamente"
                })

                router.push({ name: 'warehouses'})
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

                return

            }

            finally{
                loading.value = false
            }
        }

        return {
            form,
            states,
            submit,
            avatar,
            zipcode,
            loading,
            required,
            countries,
            createForm,
            countryStates
        }

    },

    head(){
        return {
            title:"Nuevo almacén"
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