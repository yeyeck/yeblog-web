<template>
  <div class="q-pa-lg">
    <div class="row flex">
      <div class="col-12 col-md-9">
        <!-- col-md-9 -->
        <div v-for="article in list" :key="article.id" class="q-pa-sm">
          <q-card>
            <q-card-section class="q-pt-sm q-pb-sm">
              <div class="text-h6"><router-link :to="'/article/' + article.id" class="text-black router">{{article.title}}</router-link></div>
            </q-card-section>
            <q-card-section class="justify-between column text-grey q-pb-none">
              <div class="abstract">{{article.abstractText}}</div>
              <div class="row text-caption justify-between">
                <div class="row q-pa-sm justify-start">
                  <q-btn v-for="label in article.labels" dense flat no-caps :key="label.id" size="xs" color="primary">{{label.name}}</q-btn>
                </div>
                <div class="row">
                  <div class="q-pa-sm">阅读({{article.views}})</div>
                  <div class="q-pa-sm">评论({{article.countComments}})</div>
                  <div class="q-pa-sm">{{article.createTime | formatDate}}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="current"
            :max="current + 2 > totalPage ? totalPage : current + 2"
            :min="current - 2 > 0 ? current - 2 : 1"
            :max-pages="totalPage"
            :boundary-numbers="true"
            :to-fn="page => '/article/page/' + page"
          >
          </q-pagination>
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
           <q-btn flat color="grey">文章({{statistics.totalArticles}})</q-btn>
           <q-btn flat color="grey">浏览量({{statistics.totalViews}})</q-btn>
           <q-btn flat color="grey">评论量({{statistics.totalComments}})</q-btn>
         </q-card-actions>
          <!-- <q-btn-group flat spread class="q-pb-md">
            <q-btn icon="ion-logo-github"/>
            <q-btn icon="email"/>
          </q-btn-group> -->
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
        <q-card>
          <q-item>
            <q-item-section avatar>
              <q-icon name="link" color="red"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>友情链接</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-actions vertical>
            <q-btn v-for="link in friends" :key="link.id" flat type="a" color="grey" :href="link.link" :label="link.label" target="_blank" no-caps/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'
import { mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  // components: { EssentialLink },
  name: 'PageIndex',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    const page = currentRoute.params.page ? currentRoute.params.page : 1
    const categoryId = currentRoute.params.categoryId ? currentRoute.params.categoryId : -1
    return store.dispatch('page/fetchData', { page: page, categoryId: categoryId })
  },
  methods: {
    fetchData () {
      this.$store.dispatch('page/fetchData', this.currentPage)
    }
  },
  computed: {
    ...mapGetters('page', [
      'list',
      'current',
      'totalPage'
    ]),
    ...mapGetters('blog', [
      'site',
      'top10',
      'friends',
      'statistics'
    ])
  },
  meta () {
    return {
      title: this.site.siteName,
      meta: {
        keywords: { name: 'keywords', content: this.site.keywords },
        description: { name: 'description', content: this.site.description }
      }
    }
  },
  mounted () {
    this.currentPage = this.$store.getters['page/current']
  },
  filters: {
    formatDate: function (value) {
      return date.formatDate(value, 'YYYY-MM-DD')
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
