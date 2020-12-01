<template>
  <div class="q-pa-lg">
    <div class="row flex">
      <div class="col-12 col-md-9">
        <div class="q-pa-sm">
          <q-card style="min-height: 500px" flat>
            <q-card-actions>
              <q-btn v-for="(link, index) in friends" :key="link.id"
                type="a" :color="getLinkColor(index)" :href="link.link" :label="link.label" target="_blank" no-caps/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div class="col-12 col-md-3 q-pa-sm q-gutter-md">
        <q-card class="q-pb-lg">
          <q-item>
            <q-item-section avatar>
              <q-icon name="o_account_circle" color="red"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>名片</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <div class="row justify-center q-pt-lg q-pb-lg">
            <q-avatar size="100px" font-size="52px">
              <img src="/api/file/system/header.png">
            </q-avatar>
          </div>
         <q-card-actions align="around">
           <q-btn flat color="grey" dense size="sm">文章({{statistics.totalArticles}})</q-btn>
           <q-btn flat color="grey" dense size="sm">浏览量({{statistics.totalViews}})</q-btn>
           <q-btn flat color="grey" dense size="sm">评论量({{statistics.totalComments}})</q-btn>
         </q-card-actions>
          <!-- <q-btn-group flat spread class="q-pb-md">
            <q-btn icon="ion-logo-github"/>
            <q-btn icon="email"/>
          </q-btn-group> -->
        </q-card>
        <q-card>
          <q-item>
            <q-item-section avatar>
              <q-icon name="link" color="red"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>站内导航</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-actions vertical>
            <q-btn flat color="grey" to="/" label="主页" no-caps/>
            <q-btn flat color="grey" to="/category" label="文章分类" no-caps/>
            <q-btn flat color="grey" to="/friends" label="友情链接" no-caps/>
          </q-card-actions>
        </q-card>
        <q-card>
          <q-item>
            <q-item-section avatar>
              <q-icon name="o_whatshot"  color="red"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>最热文章</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-actions vertical>
            <q-btn  v-for="article in top10" :key="article.id" flat dense color="grey" type="a" :href="'/article/' + article.id" :label="article.title" target="__blank" no-caps/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'
import { mapGetters } from 'vuex'

const colors = ['primary', 'teal', 'orange', 'red', 'accent', 'positive']
export default {
  // components: { EssentialLink },
  name: 'Friends',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    return store.dispatch('navigations/fetchFriends')
  },
  methods: {
    getLinkColor (index) {
      return colors[index % 6]
    }
  },
  computed: {
    ...mapGetters('blog', [
      'site',
      'top10',
      'statistics'
    ]),
    ...mapGetters('navigations', [
      'friends'
    ])
  },
  meta () {
    return {
      title: '友情链接 —— ' + this.site.siteName,
      meta: {
        keywords: { name: 'keywords', content: this.site.keywords },
        description: { name: 'description', content: this.site.description }
      }
    }
  }
}
</script>

<style scoped>
.abstract {
  /* height: 100px; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.router {
  text-decoration: none;
}
</style>
