<template>
    <div>
        <v-app-bar height="100" elevation="1" absolute class="app-bar" color="white">
            <v-app-bar-title class="title title-color">Catálogos</v-app-bar-title>
        </v-app-bar>

        <v-container style="margin-top: 100px" class="px-0">
            <v-row>
                <v-col cols="3">
                    <v-list class="list">
                        <v-list-item-group active-class="active-list">
                            <v-list-item v-for="item in menus[0].subitems" :key="item.text" :to="item.route">
                                <v-list-item-icon>
                                    <v-icon :color="$store.state.primary">{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{ item.text }}</v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-col>

                <v-col cols="9">
                    <slot />
                </v-col>
            </v-row>
        </v-container>
    </div>
    
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import menu from '../assets/menu.json'

export default defineComponent({

    name:"CatalogsComponent",

    setup() {
        
        const menus = computed(() => menu.filter(menu => menu.text === 'Catálogos')) 

        return {
            menus
        }

    },
})
</script>
