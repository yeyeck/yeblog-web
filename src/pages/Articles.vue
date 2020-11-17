<template>
  <div>
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
        :to-fn="page => '/category/' + currentCate.id +'/page/' + page"
        >
        </q-pagination>
    </div>
  </div>
</template>
