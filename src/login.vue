<template>
    <div>
        <h3>login</h3>
        <input type="text" v-model="token" placeholder="输入token">
        <button @click="login">登录</button>
    </div>
</template>

<script type="application/ecmascript">
    import * as types from './store/types'
    export default {
        name: '',
        data () {
            return {
                msg: '',
                token: ''
            }
        },
        methods: {
            login(){
                if (this.token) {
                    this.$store.commit(types.LOGIN, this.token)
                    let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                    this.$router.push({
                        path: redirect
                    })
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">

</style>
