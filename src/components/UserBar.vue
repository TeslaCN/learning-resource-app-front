<template>
    <div>
        {{userInfo ? userInfo.username : ''}}
    </div>
</template>

<script>
    export default {
        name: "UserBar",
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            }
        }
    }
</script>

<style scoped>

</style>