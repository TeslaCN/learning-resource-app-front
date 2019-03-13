<template>
    
</template>

<script>
    export default {
        name: "SignOut",
        mounted() {
            this.$store.commit('signOut');
            this.$router.push('/');
        },
    }
</script>

<style scoped>

</style>