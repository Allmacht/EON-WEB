<template>
    <v-menu offset-y>
        <template #activator="{ attrs, on }">
            <v-btn class="text-capitalize py-6" text v-bind="attrs" v-on="on" icon>
                <v-avatar :color="$store.state.primary" size="36">
                    <span class="white--text text-h6">
                        {{ `${name[0].slice(0,1)}${name[1].slice(0,1)}` }}
                    </span>
                </v-avatar>
            </v-btn>
        </template>

        <v-list>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Cerrar sesión</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({

    name:"UserMenuComponent",

    setup() {

        const { $auth } = useContext()
        const name      = computed(() => $auth.user.data.name.split(' '))

        return { name }
    },
})
</script>
