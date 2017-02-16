<template>
    <div id="app">
        <md-toolbar class="black">
            <div class="container">
                <div class="left">
                    <a href="https://github.com" target="_blank">
                        <svg aria-hidden="true" class="octicon octicon-mark-github" height="32" version="1.1"
                             viewBox="0 0 16 16" width="32">
                            <path fill-rule="evenodd"
                                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                    </a>
                    <span class="md-title title">{{title}}</span>
                </div>
              <div class="right">
                <a v-on:click="logout"  class=" md-default" v-show="token">logout</a>
              </div>
            </div>
        </md-toolbar>
        <router-view>
        </router-view>
    </div>
</template>

<script>
    import * as types from './store/types'
    import {mapState} from 'vuex'
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
            }
        },
        computed: mapState({
            title: state => state.title,
            token: state => state.token
        }),
      methods: {
          logout(){
            this.$store.commit(types.LOGOUT)
            this.$router.push({
              path: '/'
            })
          }
      }
    }
</script>

<style lang="scss">
    @import "../node_modules/vue-material/dist/vue-material.css";
    @import "assets/css.css";
    @import "assets/icon.css";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .container {
        width: 1000px;
        margin: 0 auto;
    }
    .left {
        float: left;
        text-align: left;
    }
    .right{
        float: right;
    }

    .md-toolbar .title {
        vertical-align: text-top;
        margin-left: 5px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
