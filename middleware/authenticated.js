export default async function ({ redirect, $auth }) {
    try{
        await $auth.fetchUser()
        return
    }
    catch(err){
        await $auth.logout()
        redirect('/login')
    }
}