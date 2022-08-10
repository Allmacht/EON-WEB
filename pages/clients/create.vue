<template>
    <div>
        <v-app-bar height="100" elevation="1" absolute class="app-bar subtitle-app-bar" color="white">
            <v-app-bar-title class="title title-color">Nuevo cliente</v-app-bar-title>
            
            <v-spacer></v-spacer>

            <v-btn  text class="mr-2" :to="{ name:'clients' }" exact :disabled="loading">
                <v-icon left>mdi-chevron-left</v-icon>
                Atrás
            </v-btn>
            <v-btn :color="$store.state.primary" dark :loading="loading" @click="submit()">Crear</v-btn>
        </v-app-bar>

        <v-container class="page-margin">
            <v-row justify="center" align="center">
                <v-col cols="12" xl="9">
                    <v-form>
                        <v-stepper v-model="stepper" vertical flat :color="$store.state.background">
                        
                            <v-hover v-slot="{ hover }">
                                <v-stepper-step step="1" :complete="stepper > 1" :color="$store.state.primary">
                                    Datos generales
                                    <v-icon v-if="hover && stepper > 0" small :color="$store.state.primary" @click="stepper = 1">mdi-pencil</v-icon>
                                </v-stepper-step>
                            </v-hover>

                            <v-stepper-content step="1">
                                <v-row>
                                    <v-col class="pb-0">
                                        <v-text-field outlined label="Nombre comercial"></v-text-field>
                                    </v-col>
                                    <v-col class="pb-0">
                                        <v-text-field outlined label="Razón social"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col class="py-0">
                                        <v-select outlined label="País"></v-select>
                                    </v-col>
                                    <v-col class="py-0">
                                        <v-select outlined label="Estado"></v-select>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col class="py-0">
                                        <v-text-field outlined label="Colonia"></v-text-field>
                                    </v-col>
                                    <v-col class="py-0">
                                        <v-text-field outlined label="Calle"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col class="py-0">
                                        <v-text-field outlined label="Código postal"></v-text-field>
                                    </v-col>
                                    <v-col class="py-0">
                                        <v-text-field outlined label="Número exterior"></v-text-field>
                                    </v-col>
                                    <v-col class="py-0">
                                        <v-text-field outlined label="Número interior"></v-text-field>
                                    </v-col>
                                </v-row>
                                
                                <v-row>
                                    <v-col class="py-0">
                                        <v-text-field outlined label="Teléfono de contacto"></v-text-field>
                                    </v-col>
                                    <v-col class="py-0">
                                        <v-text-field outlined label="Télefono de servicio al cliente"></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" class="py-0">
                                        <v-text-field outlined label="Correo electrónico"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" class="text-right pt-0">
                                        <v-btn :color="$store.state.primary" dark @click="stepper = 2">Continuar</v-btn>
                                    </v-col>
                                </v-row>


                            </v-stepper-content>

                            <v-hover v-slot="{ hover }">
                                <v-stepper-step step="2" :complete="stepper > 2" :color="$store.state.primary">
                                    Datos fiscales y/o de Importación/Exportación
                                    <v-icon v-if="hover && stepper > 1" small :color="$store.state.primary" @click="stepper = 2">mdi-pencil</v-icon>
                                </v-stepper-step>
                            </v-hover>

                            <v-stepper-content step="2">
                                <v-row>
                                    <v-col cols="12" class="px-0">
                                        <v-toolbar :color="$store.state.background" flat dense>
                                            <span class="text--secondary">
                                                El cliente requiere realizar importaciones/exportaciones
                                            </span>
                                            <v-spacer></v-spacer>
                                            <v-btn-toggle v-model="exportImport" mandatory>
                                                <v-btn active-class="active-button" :value="false">
                                                    No
                                                </v-btn>
                                                <v-btn active-class="active-button" :value="true">
                                                    Si
                                                </v-btn>
                                            </v-btn-toggle>
                                        </v-toolbar>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <template v-if="exportImport">
                                        <v-col>
                                            <v-text-field outlined label="SSN"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field outlined label="IDC"></v-text-field>
                                        </v-col>
                                    </template>

                                    <template v-else>
                                        <v-col>
                                            <v-text-field outlined label="IMMEX"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field outlined label="RFE"></v-text-field>
                                        </v-col>
                                    </template>

                                    <v-col cols="12" class="text-right">
                                        <v-btn text @click="stepper = 1">Atrás</v-btn>
                                        <v-btn :color="$store.state.primary" dark @click="stepper = 3">Continuar</v-btn>
                                    </v-col>
                                </v-row>
                            </v-stepper-content>
                            
                            <v-hover v-slot="{ hover }">
                                <v-stepper-step step="3" :complete="stepper > 3" :color="$store.state.primary">
                                    Almacén
                                    <v-icon v-if="hover && stepper > 2" small :color="$store.state.primary" @click="stepper = 3">mdi-pencil</v-icon>
                                </v-stepper-step>
                            </v-hover>

                            <v-stepper-content step="3">
                                <v-row>
                                    <v-col cols="12">
                                        <v-list class="list">
                                            <v-list-item-group v-model="selectedWarehouses" multiple>
                                                <template v-for="(warehouse, index) in warehouses">
                                                    <v-list-item :key="warehouse.id" :value="warehouse.id">
                                                        <template v-slot:default="{ active }">
                                                            <v-list-item-avatar>
                                                                <v-avatar :color="!active ? $store.state.primary : 'white'" size="36">
                                                                    <span :class="active ? 'black--text' : 'white--text'">
                                                                        {{ warehouse.acronym }}
                                                                    </span>
                                                                </v-avatar>
                                                            </v-list-item-avatar>
                
                                                            <v-list-item-content>
                                                                {{ warehouse.name }}
                                                            </v-list-item-content>
                
                                                            <v-list-item-action>
                                                                <v-checkbox :color="active ? 'white' : ''" :input-value="active"></v-checkbox>
                                                            </v-list-item-action>
                                                        </template>
                                                    </v-list-item>
            
                                                    <v-divider v-if="index < warehouses.length - 1" :key="'divider-'+warehouse.id"></v-divider>
                                                </template>
                                            </v-list-item-group>
                                        </v-list>
                                    </v-col>

                                    <v-col cols="12" class="text-right">
                                        <v-btn text @click="stepper = 2">Atrás</v-btn>
                                        <v-btn :color="$store.state.primary" dark @click="stepper = 4">Continuar</v-btn>
                                    </v-col>
                                </v-row>

                            </v-stepper-content>

                            <v-hover v-slot="{ hover }">
                                <v-stepper-step step="4" :complete="stepper > 4" :color="$store.state.primary">
                                    Fulfillment
                                    <v-icon v-if="hover && stepper > 3" small :color="$store.state.primary" @click="stepper = 4">mdi-pencil</v-icon>
                                </v-stepper-step>
                            </v-hover>

                            <v-stepper-content step="4">
                                <v-row>
                                    <v-col cols="12" class="px-0">
                                        <v-toolbar :color="$store.state.background" flat dense>
                                            <span class="text--secondary">
                                                El cliente requiere servicios Fulfillment
                                            </span>
                                            <v-spacer></v-spacer>
                                            <v-btn-toggle v-model="fulfillment" mandatory>
                                                <v-btn active-class="active-button" :value="false">
                                                    No
                                                </v-btn>
                                                <v-btn active-class="active-button" :value="true">
                                                    Si
                                                </v-btn>
                                            </v-btn-toggle>
                                        </v-toolbar>
                                    </v-col>
                                    
                                    <v-col cols="12 py-0" v-if="fulfillment">
                                        <v-radio-group class="my-0" v-model="services">
                                            <v-radio value="COD" label="Solamente envíos Cash On Delivery (COD)" :color="$store.state.primary"></v-radio>
                                            <v-radio value="REGULAR" label="Solamente envíos regulares" :color="$store.state.primary"></v-radio>
                                            <v-radio value="BOTH" label="Envíos Cash On Delivery (COD) y Regulares" :color="$store.state.primary"></v-radio>
                                        </v-radio-group>
                                    </v-col>

                                    <v-col cols="12" class="py-0 px-0" v-if="fulfillment">
                                        <v-toolbar :color="$store.state.background" flat dense>
                                            <span class="text--secondary">
                                                Selecciona las cuentas de paquetería con las que el cliente realizará su Fulfillment
                                            </span>
                                        </v-toolbar>
                                    </v-col>

                                    <v-col cols="12" class="text-right">
                                        <v-btn text @click="stepper = 3">Atrás</v-btn>
                                        <v-btn :color="$store.state.primary" dark @click="stepper = 5">Continuar</v-btn>
                                    </v-col>
                                </v-row>
                            </v-stepper-content>

                            <v-hover v-slot="{ hover }">
                                <v-stepper-step step="5" :complete="stepper > 5" :color="$store.state.primary">
                                    Notificaciones
                                    <v-icon v-if="hover && stepper > 4" small :color="$store.state.primary" @click="stepper = 5">mdi-pencil</v-icon>
                                </v-stepper-step>
                            </v-hover>

                            <v-stepper-content step="5">
                                <v-row>
                                    <v-col cols="12" class="px-0">
                                        <v-toolbar :color="$store.state.background" flat dense>
                                            <span class="text--secondary">
                                                El cliente desea recibir notificaciones sobre sus operaciones
                                            </span>
                                            <v-spacer></v-spacer>
                                            <v-btn-toggle v-model="notification" mandatory>
                                                <v-btn active-class="active-button" :value="false">
                                                    No
                                                </v-btn>
                                                <v-btn active-class="active-button" :value="true">
                                                    Si
                                                </v-btn>
                                            </v-btn-toggle>
                                        </v-toolbar>
                                    </v-col>

                                    <v-col cols="12" v-if="notification">

                                        <v-text-field outlined label="Correo electrónico a notificar"></v-text-field>
                                        
                                        <v-checkbox class="my-1" v-model="notifications" hide-details value="appointment" label="Programación de la cita para ingresar o extraer productos" :color="$store.state.primary"></v-checkbox>
                                        <v-checkbox class="my-1" v-model="notifications" hide-details value="arrival" label="Llegada del transportista a las instalaciones del almacén" :color="$store.state.primary"></v-checkbox>
                                        <v-checkbox class="my-1" v-model="notifications" hide-details value="put" label="Puesta en rampa del transporte" :color="$store.state.primary"></v-checkbox>
                                        <v-checkbox class="my-1" v-model="notifications" hide-details value="beginning" label="Inicio de la carga/descarga de productos" :color="$store.state.primary"></v-checkbox>
                                        <v-checkbox class="my-1" v-model="notifications" hide-details value="finish" label="Fin de la carga/descarga de productos y vobo para salida del transporte" :color="$store.state.primary"></v-checkbox>
                                        <v-checkbox class="my-1" v-model="notifications" hide-details value="out" label="Salida del transporte de las instalaciones el almacén y fin de la operación" :color="$store.state.primary"></v-checkbox>
                                        
                                    </v-col>
                                </v-row>
                            </v-stepper-content>
                            
                            <v-stepper-step step="6" :color="$store.state.primary">
                                Resumen
                            </v-stepper-step>

                            <v-stepper-content step="6">

                            </v-stepper-content>
                        </v-stepper>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"CreateClientPage",
    layout:"app",

    setup() {
        const { $axios, $notify } = useContext();
        const version = process.env.API_VERSION
        const loading = ref(false)
        const stepper = ref(1)
        const exportImport = ref(false)
        const fulfillment = ref(false)
        const notification = ref(false)
        const notifications = ref([])
        const selectedWarehouses = ref([])

        const warehouses = useAsync(async () => {
            try{
                const response = await $axios.get(`/api/${version}/warehouses`);
                return response.data.data
            }
            catch(err){
                $notify.error({
                    title:"Error",
                    message:"Ha ocurrido un error al procesar su solicitud, intente más tarde."
                })
            }
        })

        return {
            loading,
            stepper,
            warehouses,
            fulfillment,
            exportImport,
            notification,
            notifications,
            selectedWarehouses,
        }
    },

    head(){
        return {
            title:"Nuevo cliente"
        }
    }
})
</script>
