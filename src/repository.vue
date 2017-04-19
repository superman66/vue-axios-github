<template>
    <div class="container">
        <md-layout md-gutter v-for="repo in list">
            <md-card class="repos-card" md-with-hover>
                <md-card-header md-with-hover="true">
                    <md-card-header-text style="text-align: left">
                        <div class="md-title">{{repo.name}}</div>
                        <div class="md-subhead">{{repo.description}}</div>
                    </md-card-header-text>
                    <md-card-media>
                        <img :src="repo.owner.avatar_url" alt="People">
                    </md-card-media>
                </md-card-header>
                <md-card-content>
                    <div class="repo-mark">
                        <span class="md-subhead" v-if="repo.language">
                            <md-icon>location_on</md-icon>
                            <span>{{repo.language}}</span>
                        </span>
                        <span class="md-subhead" v-if="repo.stargazers_count">
                            <md-icon>grade</md-icon>
                            <span>{{repo.stargazers_count}}</span>
                        </span>
                        <span class="md-subhead" v-if="repo.forks_count">
                            <md-icon>call_split</md-icon>
                            <span>{{repo.forks_count}}</span>
                        </span>
                        <span class="md-subhead">
                            <md-icon>update</md-icon>
                            <span>{{repo.updated_at}}</span>
                        </span>
                    </div>
                </md-card-content>
                <md-card-actions>
                    <md-button>View Detail</md-button>

                </md-card-actions>
            </md-card>
        </md-layout>
    </div>
</template>

<script type="application/ecmascript">
    import api from './constant/api'
    import * as types from './store/types'

    export default {
        name: '',
        data () {
            return {
                msg: '',
                list: []
            }
        },
        mounted(){
            this.$store.commit(types.TITLE, 'Your Repositories');
            this.getRepository();
        },

        methods: {
            getRepository(){
                let params = {
                    sort: 'updated'
                }
                this.axios.get(api.repo_list, params)
                    .then(response => {
                        this.list = response.data;
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
    .repos-card {
        width: 600px;
        margin: 10px auto;
        .repo-mark {
            text-align: left;
            position: absolute;
            bottom: 15px;
        }
    }
</style>
