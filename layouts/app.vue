<template>
	<v-app>

		<v-navigation-drawer v-model="navigation" :mini-variant="!navigation" permanent app clipped>
			<v-list>
				<v-list-item-group>
					<v-list-item v-for="menu in menus" :key="menu.route" :color="$store.state.primary" :to="menu.route">
						<v-list-item-icon>
							<v-icon left v-text="menu.icon"></v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title v-text="menu.text"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar class="app-bar" color="white" height="80" clipped-left app>

			<v-app-bar-nav-icon @click="navigation = !navigation" style="color:black"></v-app-bar-nav-icon>

			<v-toolbar-title>
				<v-list-item class="px-0">
					
					<v-list-item-avatar>
						<v-img src="icon.svg"></v-img>
					</v-list-item-avatar>

					<v-list-item-content>

						<v-list-item-title :style="{ 'color' : $store.state.primary }">
							{{ $auth.user.data.name }}
						</v-list-item-title>

						<v-list-item-subtitle>
							<date></date> | <clock></clock>
						</v-list-item-subtitle>

					</v-list-item-content>

				</v-list-item>
			</v-toolbar-title>

			<v-spacer></v-spacer>
			
			<change-warehouse></change-warehouse>

			<v-text-field
				class="search mx-3"
				:color="$store.state.primary"
				outlined
				dense
				hide-details
				placeholder="Buscar..."
				append-icon="mdi-magnify"
				readonly
				@click="searchDialog = true"
			></v-text-field>

			<v-btn class="text-capitalize" text icon @click="userNavigation = !userNavigation">
				<v-avatar :color="$store.state.primary" size="36">
					<span class="white--text text-h6">
						{{ name }}
					</span>
				</v-avatar>
			</v-btn>

		</v-app-bar>

		<v-main>
			<Nuxt />
		</v-main>

		<user-menu :dialog="userNavigation" @close="userNavigation = false"></user-menu>
		<search-dialog :dialog="searchDialog" @close="searchDialog = false"></search-dialog>
	</v-app> 
</template>

<script>
import { computed, defineComponent, ref, useRoute, useStore, useContext } from '@nuxtjs/composition-api'
import menu from '../assets/menu.json'

export default defineComponent({

	middleware:['authenticated','auth'],

    setup() {

		const { $auth } = useContext()

		const store  = useStore()
		const route  = useRoute()

		const menus      	 = menu
		const navigation 	 = ref(true)
		const userNavigation = ref(false)
		const searchDialog 	 = ref(false)
		const title 	 	 = computed(() => store.getters.getTitle)
		const submenus   	 = computed(() => { return menu.filter(menu => route.value.path.includes(menu.route)) })
		const name 			 = computed(() => {
            const names =  $auth.user.data.name.split(' ')

            if(names.length < 2){
                return names[0].slice(0,2)
            }

            return `${names[0].slice(0,1)}${names[1].slice(0,1)}`
        })


		document.onkeydown = (e) => {
            if(e.ctrlKey && e.key === 'b'){
                e.preventDefault()
                navigation.value = !navigation.value
            }
        }

		const handleChangeRoute = (item, subitem) => {
			const title = item.text + (subitem !== null ? ' - '+subitem.text : '')
			store.dispatch('setTitle', title)
		}

		return {
			name,
			title,
			menus,
			submenus,
			navigation,
			searchDialog,
			userNavigation,
			handleChangeRoute,
		}
        
    },
})
</script>