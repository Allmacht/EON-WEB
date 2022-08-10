<template>
	<v-app>
		<!-- <v-navigation-drawer v-model="navigation" :color="$store.state.primary" dark app floating>
			<template #prepend>
				<v-img src="/chronos-logo.svg" max-width="65%" class="mx-auto my-7"></v-img>
			</template>

			<v-list>
				<v-list-item-group>
					<template v-for="menu in menus">
						<v-list-item v-if="menu.subitems.length === 0" :key="menu.text" link :to="menu.route" @click="handleChangeRoute(menu, null)">
							<v-list-item-icon>
								<v-icon v-text="menu.icon"></v-icon>
							</v-list-item-icon>

							<v-list-item-content>
								<v-list-item-title v-text="menu.text"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>

						<v-list-group v-else :key="'s-'+menu.text" :prepend-icon="menu.icon" color="white" no-action>
							<template #activator>
								<v-list-item-content>
									<v-list-item-title v-text="menu.text"></v-list-item-title>
								</v-list-item-content>
							</template>

							<v-list-item v-for="subitem in menu.subitems" :key="subitem.text" link :to="subitem.route" @click="handleChangeRoute(menu, subitem)">
								<v-list-item-content>
									<v-list-item-title v-text="subitem.text"></v-list-item-title>
								</v-list-item-content>

								<v-list-item-icon>
									<v-icon v-text="subitem.icon"></v-icon>
								</v-list-item-icon>
							</v-list-item>
						</v-list-group>
					</template>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar elevation="1" :color="$store.state.background" app>
			<v-app-bar-nav-icon @click="navigation = !navigation"></v-app-bar-nav-icon>
			<v-toolbar-title>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title>
							<h3>
								{{ title }}
							</h3>
						</v-list-item-title>
						<v-list-item-subtitle class="text--disabled">
							<clock></clock> - <date></date>
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-toolbar-title>

			<v-spacer></v-spacer>
			
			<change-warehouse></change-warehouse>
			<user-menu></user-menu>
		</v-app-bar> -->

		<v-navigation-drawer v-model="navigation" app clipped :color="$store.state.primary" dark temporary>
			
		</v-navigation-drawer>

		<v-app-bar height="65" class="app-bar" app color="white" elevation="1" clipped-left>

			<v-app-bar-nav-icon @click="navigation = !navigation"></v-app-bar-nav-icon>

			<v-app-bar-title class="px-0">
				<ol class="app-bar-items">
					<li class="mr-3">
						<v-img src="/icon.svg" width="30"></v-img>
					</li>

					<li>
						{{ $auth.user.data.name }}
						<v-icon color="black" class="mb-1">mdi-chevron-right</v-icon>
					</li>

					<li>
						<change-warehouse></change-warehouse>
					</li>
				</ol>
			</v-app-bar-title>

			<v-spacer></v-spacer>

			<user-menu></user-menu>

			<template #extension>
				<v-tabs align-with-title :color="$store.state.primary">
					<v-tab :to="'/dashboard'">Dashbard</v-tab>
					<v-tab>Productos</v-tab>
					<v-tab :to="{ name:'clients' }">Clientes</v-tab>
					<v-tab :to="{ name:'catalogs' }">Catálogos</v-tab>
				</v-tabs>
			</template>
		</v-app-bar>

		<v-main>
			<v-container class="main">
				<Nuxt />
			</v-container>
		</v-main>
	</v-app> 
</template>

<script>
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import menu from '../assets/menu.json'

export default defineComponent({

	middleware:['authenticated','auth'],

    setup() {

		const store  = useStore()

		const navigation = ref(true)
		const menus      = menu
		const title 	 = computed(() => store.getters.getTitle)

		const handleChangeRoute = (item, subitem) => {
			const title = item.text + (subitem !== null ? ' - '+subitem.text : '')
			store.dispatch('setTitle', title)
		}

		return {
			title,
			menus,
			navigation,
			handleChangeRoute,
		}
        
    },
})
</script>