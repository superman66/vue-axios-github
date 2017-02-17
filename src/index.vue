<template>
    <div>
        <ul>
            <router-link :to="{path:'/repository'}">
              <md-button href="#/repository"  class="md-raised md-primary">view your repositories</md-button>
            </router-link>
        </ul>
    </div>
</template>

<script type="application/ecmascript">
    export default {
        name: '',
        data () {
            return {
                msg: ''
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">

</style>
