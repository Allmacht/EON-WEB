<template>
    <v-menu offset-y>
        <template #activator="{ attrs, on }">
            <v-btn class="text-capitalize py-6" text v-bind="attrs" v-on="on">
                <v-avatar :color="$store.state.primary" :class="{'mr-3' : !$vuetify.breakpoint.xs}" size="36">
                    <span class="white--text text-h7">
                        {{ `${name[0].slice(0,1)}${name[1].slice(0,1)}` }}
                    </span>
                </v-avatar>
                <span v-if="!$vuetify.breakpoint.xs">
                    {{ `${name[0]} ${name[1]}` }}
                </span>
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
