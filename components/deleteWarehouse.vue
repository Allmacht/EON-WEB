<template>
    <v-dialog v-model="state" max-width="400" persistent>
        <v-card :loading="loading ? 'error' : false" :disabled="loading">
            <v-card-title>
                <v-icon left color="error">mdi-alert</v-icon>
                Atención
            </v-card-title>

            <v-card-text>
                ¿Realmente desea eliminar el almacén?
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="state = false">Cancelar</v-btn>
                <v-btn color="error" :loading="loading" @click="submit()">Eliminar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"DeleteWarehouseComponent",

    props:{
        dialog:{
            required:true,
            type:Boolean,
            default:false,
        },
        warehouse:{
            required:true,
            type:String,
        }
    },

    emits:['close', 'update'],

    setup(props, { emit }) {

        const { $axios, $notify } = useContext()
        const version = process.env.API_VERSION
        const loading = ref(false)
        
        const state = computed({
            get: () => props.dialog,
            set: (val) => !val ? emit('close') : val
        })

        const submit = async () => {
            loading.value = true

            try{
                await $axios.delete(`/api/${version}/warehouses/delete?warehouse=${props.warehouse}`)

                emit('update')

                $notify.success({
                    title:"Correcto",
                    message:"Almacén eliminado correctamente."
                })
            }
            catch(err){
                if(err.response.status === 403){
                    $notify.error({
                        title:"Error",
                        message:"No cuentas con los permisos necesarios para realizar esta acción."
                    })

                    return
                }

                $notify.error({
                    title:"Error",
                    message:"Ha occurido un error al procesar su solicitud, intente más tarde."
                })
            }
            finally{
                loading.value = false
                state.value = false
            }
        }

        return {
            state,
            submit,
            loading,
        }
    },
})
</script>
