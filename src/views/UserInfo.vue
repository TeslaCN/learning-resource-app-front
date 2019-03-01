<template>
    
</template>

<script>
    export default {
        name: "UserInfo",
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            }
        }
    }
</script>

<style scoped>

</style>