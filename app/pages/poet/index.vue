<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { formatDate } from '@/utils/tools'

const selectedPoet = ref(null)
const activeCategory = ref(null)

const { data: page } = await useAsyncData('poet-page', () => {
  return queryCollection('pages').path('/poet').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}
// 默认加载所有博客文章
const { data: posts } = await useAsyncData('poet-posts', () =>
  queryCollection('poet').order('date', 'DESC').all()
)

// 页面加载时，默认激活第一个分类
// onMounted(() => {
//   if (catagory.value.length > 0) {
//     activeCategory.value = catagory.value[0].value
//   }
// })

if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'poet posts not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

// 从所有诗词中提取作者信息并去重
const catagory = computed(() => {
  if (!allPosts.value || !allPosts.value.length) return []

  // 提取所有作者名称
  const authors = allPosts.value.map(post => post.author?.name).filter(Boolean)
  // 去重作者名称
  const uniqueAuthors = [...new Set(authors)]
  // 转换为适合当前 UI 的格式
  return uniqueAuthors.map((author, index) => ({
    id: index + 1,
    label: author,
    value: author
  }))
})

// 在组件加载时获取所有诗词文章
const { data: allPosts } = await useAsyncData('all-poet-posts', () =>
  queryCollection('poet').order('date', 'DESC').all()
)

// 根据分类过滤文章
const filteredPosts = computed(() => {
  if (!allPosts.value || !allPosts.value.length) return []

  const category = allPosts.value.find(post => post.path === `/poet/${activeCategory.value}`)
  if (!category) return allPosts.value

  // 使用 startsWith 过滤路径
  const categoryPath = `/poet/${category.path}`
  console.log('categoryPath>>>>', categoryPath)

  return allPosts.value.filter(post =>
    post.path && post.path.startsWith(categoryPath)
  )
})

const handleSwitchType = async (name) => {
  selectedPoet.value = name

  // 修复了原查询问题：直接使用where('author.name', '杜甫')无法查询嵌套属性
  // 解决方案：先获取所有诗词，然后在客户端过滤
  const { data: filteredPosts } = await useAsyncData(`get-poems-by-user-${selectedPoet.value}`, async () => {
    // 先获取所有诗词
    const allPoems = await queryCollection('poet').all()
    // 在客户端过滤出诗人的诗词
    const filtered = allPoems.filter((poem) => {
      // 确保author和author.name存在
      return poem.author && poem.author.name === selectedPoet.value
    })
    return filtered
  })

  posts.value = filteredPosts.value
}
</script>

<template>
  <UPage v-if="page">
    <div class=" flex flex-row">
      <div>
        <UPageHero :title="page.title" :description="page.description" :links="page.links" :ui="{
          title: '!mx-0 text-left',
          description: '!mx-0 text-left',
          links: 'justify-start'
        }" />
        <UPageSection :ui="{
          container: '!pt-0'
        }">
          <UBlogPosts orientation="vertical">
            <Motion v-for="(post, index) in posts" :key="index" :initial="{ opacity: 0, transform: 'translateY(10px)' }"
              :while-in-view="{ opacity: 1, transform: 'translateY(0)' }" :transition="{ delay: 0.2 }"
              :in-view-options="{ once: true }">
              <UBlogPost variant="naked" orientation="horizontal" :to="post.path" v-bind="post"
                :date="formatDate(post.date)" :ui="{
                  root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
                  image:
                    'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default',
                  header:
                    index % 2 === 0
                      ? 'sm:-rotate-1 overflow-visible'
                      : 'sm:rotate-1 overflow-visible'
                }" />
            </Motion>
          </UBlogPosts>
        </UPageSection>
      </div>
      <div class=" flex flex-col gap-4 fixed right-2 top-[50%] transform translate-y-[-50%]">
        <UTabs :model-value="selectedPoet" color="neutral" orientation="vertical" variant="pill" :content="false"
          :items="catagory" class="w-full" @update:model-value="handleSwitchType" />
      </div>
    </div>
  </UPage>
</template>
