<script>
import AppLayout from '@/Layouts/AppLayout.vue'

import Breadcrumbs from '@/Components/Breadcrumbs.vue'
import BreadcrumbsItem from '@/Components/BreadcrumbsItem.vue'
import BreadcrumbsItemMain from '@/Components/BreadcrumbsItemMain.vue'
import Card from '@/Components/Card.vue'
import Button from '@/Components/Button.vue'
import Paginator from '@/Components/Paginator.vue'
import pickBy from 'lodash/pickBy'
import throttle from 'lodash/throttle'
import Badge from '@/Components/Badge.vue'
import BreadcrumbsDivider from "../../Components/BreadcrumbsDivider.vue";

export default {
    components: {
        BreadcrumbsDivider,
        AppLayout,
        Badge,
        Breadcrumbs,
        BreadcrumbsItem,
        BreadcrumbsItemMain,
        Card,
        Button,
        Paginator,
    },

    props: {
        issues: Object,
        filters: Object,
    },

    data() {
        return {
            form: {
                search: this.filters.search,
            },
        }
    },
    watch: {
        form: {
            handler: throttle(function() {
                let query = pickBy(this.form)
                this.$inertia.replace(this.route('issues.index', Object.keys(query).length ? query : { remember: 'forget' }))
            }, 500),
            deep: true,
        },
    },
}
</script>

<template>
    <AppLayout title="Projects">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Breadcrumbs>
                <BreadcrumbsItemMain :href="route('dashboard')">Dashboard</BreadcrumbsItemMain>
                <BreadcrumbsDivider/>
                <BreadcrumbsItem :href="route('issues.index')">Issues</BreadcrumbsItem>
            </Breadcrumbs>
            <Card>
                <template #header>
                    <h2 class="text-xl font-bold">Issues</h2>
                </template>

                <header class="flex items-center px-6 py-4 space-x-4 bg-primary-50">
                    <input
                        placeholder="Search issues..."
                        class="flex-1 placeholder-gray-400 rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
                        type="text"
                        v-model="form.search"
                    />
                </header>

                <ul class="divide-y divide-gray-200">
                    <li v-for="issue in issues.data" :key="issue.id">
                        <inertia-link :href="route('issues.show', issue.id)" class="flex items-center px-6 py-4 space-x-6 hover:bg-gray-100">
                            <Badge success v-if="issue.status === 'Fixed'">{{ issue.status }}</Badge>
                            <Badge info v-if="issue.status === 'Read'">{{ issue.status }}</Badge>
                            <Badge danger v-if="issue.status === 'Open'">{{ issue.status }}</Badge>

                            <div class="flex-1">
                                <p class="font-medium text-bold">{{ issue.exception }}</p>
                                <p class="text-sm text-gray-600">{{ issue.last_occurred_at_human }} &centerdot; {{ issue.project.title }}</p>
                            </div>

                            <div class="text-green-400" style="width: 150px;">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     style="fill: transparent;"
                                     class="w-full h-full text-brand bg-transparent"
                                     viewBox="0 -4 128 16"
                                     preserveAspectRatio="none"
                                     v-html="issue.sparkline"
                                >
                                </svg>
                            </div>

                            <svg
                                class="w-6 h-6 text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </inertia-link>
                    </li>
                </ul>

                <template #footer>
                    <Paginator :paginated="issues"/>
                </template>
            </Card>
        </div>
    </AppLayout>
  <InertiaHead title="Issues" />


</template>
