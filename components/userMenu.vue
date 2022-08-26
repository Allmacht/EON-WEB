<template>
    <v-navigation-drawer v-model="state" app right temporary>
        <template #prepend>
            <v-col cols="12" class="text-center pt-10">
                <v-avatar :color="$store.state.primary" size="96">
                    <span class="white--text text-h3">
                        {{ name }}
                    </span>
                </v-avatar>

            </v-col>

            <v-col class="text-center" cols="12">
                <span class="text-h6">{{ $auth.user.data.name }}</span> <br>
                <small class="text--secondary">{{ $auth.user.data.email }}</small>
            </v-col>
        </template>

        <v-divider></v-divider>

        <template #append>
            <v-list-item class="logout" @click="logoutDialog = true">
                <v-list-item-icon>
                    <v-icon color="white" left>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Cerrar sesión</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <logout :dialog="logoutDialog" @close="logoutDialog = !logoutDialog"></logout>
        </template>
    </v-navigation-drawer>

</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"UserMenuComponent",

    props:{
        dialog:{
            required:true,
            type:Boolean,
            default:false
        }
    },

    emits:['close'],

    setup(props, {emit}) {

        const { $auth } = useContext()
        const logoutDialog = ref(false)

        const state = computed({
            get: () => props.dialog,
            set: (val) => !val? emit('close') : val
        })

        const name = computed(() => {
            const names =  $auth.user.data.name.split(' ')

            if(names.length < 2){
                return names[0].slice(0,2)
            }

            return `${names[0].slice(0,1)}${names[1].slice(0,1)}`
        })

        return {
            name,
            state,
            logoutDialog
        }
        
    },
})
</script>
