<template>
    <div>
        <v-app-bar class="app-bar" height="100" color="white">
            <v-toolbar-title>Catálogos</v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import menu from '../../assets/menu.json'

export default defineComponent({

    name:"CatalogsPage",
    layout:"app",

    setup() {
        const menus = computed(() => menu.filter(menu => menu.text === 'Catálogos')) 

        return {
            menus
        }
    },

    head(){
        return {
            title:"Catálogos"
        }
    }
})
</script>
