<script setup lang="ts">
import { formatDate } from '@/utils/tools'
import { blogIcons } from '@/utils/blogIcons'
import { onMounted, computed, ref } from 'vue'

const { data: page } = await useAsyncData('frontend-page', () => {
  return queryCollection('pages').path('/frontend').first()
})
console.log('page.value????>>', page.value)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}
// 默认加载所有博客文章
const { data: posts } = await useAsyncData('frontends', () =>
  queryCollection('frontend').order('date', 'DESC').all()
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
    statusMessage: 'frontends posts not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

const { data: navigation } = await useAsyncData('frontend-navigation', () =>
  queryCollectionNavigation('frontend')
)

// 从导航结构中提取一级分类
const catagory = computed(() => {
  if (!navigation.value?.length) return []

  // 找到 frontend 根目录
  const frontendRoot = navigation.value.find(item => item.path === '/frontend')
  if (!frontendRoot?.children) return []
  console.log('frontendRoot????>>', frontendRoot)

  // 转换为适合当前 UI 的格式
  return frontendRoot.children.map((child, index) => ({
    id: index + 1,
    label: child.title || child.name,
    value: child.path.replace('/frontend/', ''),
    icon: blogIcons[child.path.replace('/frontend/', '')] || 'i-lucide-folder',
    active: index === 0 // 默认激活第一个分类
  }))
})

// 跟踪当前激活的分类
const activeCategory = ref('')

// 在组件加载时获取所有前端项目文章
const { data: allPosts } = await useAsyncData('all-frontend-posts', () =>
  queryCollection('frontend').order('date', 'DESC').all()
)

// 根据分类过滤文章
const filteredPosts = computed(() => {
  if (!allPosts.value || !allPosts.value.length) return []
  if (!activeCategory.value) return allPosts.value

  // 使用 startsWith 过滤路径
  const categoryPath = `/frontend/${activeCategory.value}`
  console.log('categoryPath>>>>', categoryPath)

  return allPosts.value.filter(post =>
    post.path && post.path.startsWith(categoryPath)
  )
})

const handleSwitchType = (item) => {
  const { value } = item
  activeCategory.value = value
  posts.value = filteredPosts.value

  console.log(`Switched to category: ${value}`)
  console.log(`Filtered posts: `, filteredPosts.value)
}
</script>

<template>
  <UPage v-if="page">
    <div class=" flex flex-row">
      <div>
        <UPageHero
          :title="page.title"
          :description="page.description"
          :links="page.links"
          :ui="{
            title: '!mx-0 text-left',
            description: '!mx-0 text-left',
            links: 'justify-start'
          }"
        />
        <UPageSection
          :ui="{
            container: '!pt-0'
          }"
        >
          <UBlogPosts orientation="vertical">
            <Motion
              v-for="(post, index) in posts"
              :key="index"
              :initial="{ opacity: 0, transform: 'translateY(10px)' }"
              :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
              :transition="{ delay: 0.2 }"
              :in-view-options="{ once: true }"
            >
              <UBlogPost
                variant="naked"
                orientation="horizontal"
                :to="post.path"
                v-bind="post"
                :date="formatDate(post.date)"
                :ui="{
                  root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
                  image:
                    'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default',
                  header:
                    index % 2 === 0
                      ? 'sm:-rotate-1 overflow-visible'
                      : 'sm:rotate-1 overflow-visible'
                }"
              />
            </Motion>
          </UBlogPosts>
        </UPageSection>
      </div>
      <div class=" flex flex-col gap-4 fixed right-2 top-[50%] transform translate-y-[-50%]">
        <UTooltip
          v-for="item in catagory"
          :key="item.id"
          :text="item.label"
          :content="{
            align: 'center',
            side: 'left',
            sideOffset: 8
          }"
        >
          <UButton
            size="md"
            variant="outline"
            :color="activeCategory === item.value ? 'success' : 'neutral'"
            :icon="item.icon"
            @click="handleSwitchType(item)"
          />
        </UTooltip>
      </div>
      <!-- <UNavigationMenu
        popover
        tooltip
        collapsed
        orientation="vertical"
        :items="items"
        @update:model-value=""
        class=" fixed right-0 top-[50%] transform translate-y-[-50%]"
      /> -->
    </div>
  </UPage>
</template>
