<template>
    <div class="container">
        <md-layout md-gutter v-for="repo in list">
            <md-card style="width: 100%">
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">{{repo.name}}</div>
                        <div class="md-subhead">Subtitle here</div>
                    </md-card-header-text>

                    <md-card-media>
                        <img src="./assets/logo.png" alt="People">
                    </md-card-media>
                </md-card-header>

                <md-card-actions>
                    <md-button>Action</md-button>
                    <md-button>Action</md-button>
                </md-card-actions>
            </md-card>
        </md-layout>
    </div>
</template>

<script type="application/ecmascript">
    import api from './constant/api'
    import {fetch} from './http'
    export default {
        name: '',
        data () {
            return {
                msg: '',
                list: []
            }
        },
        mounted(){
            this.getRepository();
        },

        methods: {
            getRepository(){
                fetch(api.repo_list)
                    .then(response => {
                        this.list = response;
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
    .repos-list {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        list-style: none;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        width: 900px;
        .repos-card {
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            width: 359px;
            border: 1px solid #ddd;
            border-radius: 2px;
        }
    }

</style>
