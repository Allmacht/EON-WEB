<template>
    <v-dialog v-model="state" max-width="400" persistent>
        <v-card :loading="loading ? 'error' : false">
            <v-card-title>
                Cerrar sesión
                <v-spacer></v-spacer>
                <v-icon color="black" @click="state = false" :disabled="loading">mdi-close</v-icon>
            </v-card-title>

            <v-card-text class="py-4">
                ¿Realmente desea cerrar sesión?
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text :disabled="loading" @click="state = false">Cancelar</v-btn>
                <v-btn color="error" :loading="loading" @click="logout()">Salir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { computed, defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"LogoutComponent",

    props:{
        dialog:{
            required:true,
            type:Boolean,
            default:false,
        }
    },

    emits:['close'],

    setup(props, {emit}) {

        const { $auth } = useContext()
        const router = useRouter()

        const loading = ref(false)   

        const state = computed({
            get: () => props.dialog,
            set: (val) => !val? emit('close') : val
        })

        const logout = async() => {

            loading.value = true

            await $auth.logout() 

            router.push('/login')
        }


        return {
            state,
            logout,
            loading,
        }
        
    },
})
</script>
