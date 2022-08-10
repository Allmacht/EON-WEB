import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export const state = () => ({
    plugins: [vuexLocal.plugin],
    primary:"#045f80",
    secondary:"#02a3bf",
    background:"#fafafa",
})

export const getters = {
    getTitle(state) {
        return state.title
    }
}

export const mutations =  {
    setTitle(state, title) {
        state.title = title
    }
}

export const actions = {
    setTitle(context, title){
        context.commit('setTitle', title)
    }
}