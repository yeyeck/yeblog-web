<template>
  <div v-if="hasCategories">
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
    <div v-if="list.length === 0" class="q-pa-sm">
      <q-card>
        <q-card-section>
          该分类下没有任何文章
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
        :to-fn="page => '/category/' + currentCate.id +'/page/' + page"
        >
        </q-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'Articles',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    const page = currentRoute.params.page ? currentRoute.params.page : 1
    let categoryId = currentRoute.params.categoryId ? currentRoute.params.categoryId : -1
    if (categoryId === -1) {
      if (store.getters['navigations/hasCategories']) {
        const categories = store.getters['navigations/categories']
        categoryId = categories[0].id
        redirect('/category/' + categoryId + '/page/1')
      } else {
        redirect('/category/404')
      }
    }
    store.commit('navigations/setCurrentCate', categoryId)
    return store.dispatch('page/fetchData', { page: page, categoryId: categoryId })
  },
  computed: {
    ...mapGetters('page', [
      'list',
      'current',
      'totalPage'
    ]),
    ...mapGetters('navigations', [
      'categories',
      'currentCate',
      'hasCategories'
    ]),
    current: {
      get: function () {
        return this.$store.getters['page/current']
      },
      set: function (value) {
        this.$store.commit('page/setCurrent', value)
      }
    }
  },
  filters: {
    formatDate: function (value) {
      return date.formatDate(value, 'YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>
.router {
  text-decoration: none;
}
</style>
