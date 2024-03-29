<script>
import AppLayout from '@/Layouts/AppLayout.vue'
import Card from '@/Components/Card.vue'
import Badge from '@/Components/Badge.vue'
import Button from '@/Components/Button.vue'
import ButtonRack from '@/Components/ButtonRack.vue'
import ButtonRackItem from '@/Components/ButtonRackItem.vue'
import Code from '@/Components/Code.vue'
import Paginator from '@/Components/Paginator.vue'
import EditProject from '@/Partials/EditProject.vue'
import Breadcrumbs from '@/Components/Breadcrumbs.vue'
import BreadcrumbsItem from '@/Components/BreadcrumbsItem.vue'
import BreadcrumbsItemMain from '@/Components/BreadcrumbsItemMain.vue'
import BreadcrumbsDivider from '@/Components/BreadcrumbsDivider.vue'
import throttle from 'lodash/throttle'
import pickBy from 'lodash/pickBy'
import mapValues from 'lodash/mapValues'

export default {
    components: {
        AppLayout,
        Breadcrumbs,
        BreadcrumbsItem,
        BreadcrumbsDivider,
        BreadcrumbsItemMain,
        EditProject,
        Code,
        Card,
        Button,
        ButtonRack,
        ButtonRackItem,
        Paginator,
        Badge,
    },
    props: {
        project: Object,
        exceptions: Object,
        filters: Object,
    },
    data() {
        return {
            sending: false,

            selected: [],

            form: {
                project: this.project.id,
                search: this.filters.search,
                status: this.filters.status
            },
        }
    },
    watch: {
        form: {
            handler: throttle(function () {
                let query = pickBy(this.form)
                this.$inertia.replace(this.route('projects.show', Object.keys(query).length ? query : {remember: 'forget'}))
            }, 500),
            deep: true,
        },
    },
    methods: {
        handleMarking(type) {
            if (this.selected.length) {
                this.markSelectedAs(type);

                return;
            }

            if (type === 'read') {
                this.read();
            }

            if (type === 'fixed') {
                this.fixed();
            }
        },

        reset() {
            this.form = mapValues(this.form, (item, key) => {
                // We have to remember the project key, because the route parameter requires this
                if (key == 'project') {
                    return item;
                }

                return null;
            })
        },

        fixed() {
            this.sending = true;

            this.$inertia.post(this.route('exceptions.mark-all-fixed', this.project.id), {}, {
                onFinish: () => this.sending = false
            })
        },

        read() {
            this.$inertia.post(this.route('exceptions.mark-all-read', this.project.id), {}, {
                onStart: () => this.sending = true,
                onFinish: () => this.sending = false
            });
        },

        deleteAllExceptions() {
            if (window.confirm('Are you sure you want to delete all exceptions for this project?')) {
                this.sending = true;

                this.$inertia.delete(this.route('exceptions.delete-all', this.project.id), {
                    onFinish: () => this.sending = false
                })
            }
        },

        deleteFixedExceptions() {
            this.sending = true;

            this.$inertia.post(this.route('exceptions.delete-fixed', this.project.id), {}, {
                onFinish: () => this.sending = false
            })
        },

        deleteSelected() {
            this.$inertia.post(this.route('exceptions.delete-selected', this.project.id), {
                exceptions: this.selected,
            }, {
                onSuccess: () => {
                    this.selected = [];
                },
            });
        },

        markSelectedAs(type) {
            this.$inertia.post(this.route('exceptions.mark-as', this.project.id), {
                exceptions: this.selected,
                type: type.toUpperCase()
            }, {
                onSuccess: () => {
                    this.selected = [];
                }
            })
        },

        refreshToken() {
            if (window.confirm('Are you sure you want to refresh the API token for this project? Make sure to update your projects to reflect the new API token.')) {
                this.$inertia.post(this.route('projects.refresh-token', this.project.id), {}, {
                    onSuccess: () => {
                    }
                })
            }
        }
    }
}
</script>

<template>
    <AppLayout title="Projects">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Breadcrumbs>
                <BreadcrumbsItemMain :href="route('dashboard')">Dashboard</BreadcrumbsItemMain>
                <BreadcrumbsDivider/>
                <BreadcrumbsItem :href="route('projects.index')">Projects</BreadcrumbsItem>
                <BreadcrumbsDivider/>
                <BreadcrumbsItem :href="route('projects.show', project.id)">{{ project.title }}</BreadcrumbsItem>
            </Breadcrumbs>
            <Card>
                <template #header>
                    <h2 class="text-xl font-bold">Project {{ project.title }}</h2>

                    <ButtonRack>
                        <ButtonRackItem as="inertia-link" :href="route('projects.installation', project.id)">
                            Installation guide
                        </ButtonRackItem>
                        <ButtonRackItem as="inertia-link" :href="route('projects.edit', project.id)">Edit project
                        </ButtonRackItem>
                    </ButtonRack>
                </template>

                <dl class="grid grid-cols-3 gap-px overflow-hidden bg-gray-100 rounded-b-lg">
                    <div class="p-6 space-y-1 bg-white">
                        <dt class="text-sm font-medium">Title</dt>
                        <dd class="text-base">{{ project.title }}</dd>
                    </div>

                    <div class="p-6 space-y-1 bg-white">
                        <dt class="text-sm font-medium">Application URL</dt>
                        <dd class="text-base">
                            <a :href="project.url" v-text="project.url" v-if="project.url"></a>
                            <badge info v-else>None specified</badge>
                        </dd>
                    </div>

                    <div class="p-6 space-y-1 bg-white">
                        <dt class="text-sm font-medium">API Key</dt>
                        <dd class="text-sm">
                            <Code>{{ project.key }}</Code>
                        </dd>

                        <dd class="pt-3">
                            <button @click="refreshToken" class="flex items-center text-sm space-x-2 border-b border-dotted text-primary-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                </svg>
                                <span>Refresh token</span>
                            </button>
                        </dd>
                    </div>

                    <div class="p-6 space-y-1 bg-white">
                        <dt class="text-sm font-medium">New exceptions</dt>
                        <dd class="text-base">{{ project.unread_exceptions_count }}</dd>
                    </div>

                    <div class="p-6 space-y-1 bg-white">
                        <dt class="text-sm font-medium">Total exceptions</dt>
                        <dd class="text-base">{{ project.total_exceptions }}</dd>
                    </div>

                    <div class="p-6 space-y-1 bg-white">
                        <dt class="text-sm font-medium">Description</dt>
                        <dd class="text-base" v-if="project.description">{{ project.description }}</dd>
                        <dd class="text-base" v-else>-No description-</dd>
                    </div>
                </dl>
            </Card>
            <Card class="mt-4">
                <template #buttonheader>
                    <h2 class="text-xl font-bold">Exceptions</h2>

                    <ButtonRack>
                        <ButtonRackItem :disabled="!exceptions.total" @click="handleMarking('read')">Mark
                            {{ selected.length ? 'selected' : 'all' }} read
                        </ButtonRackItem>
                        <ButtonRackItem :disabled="!exceptions.total" @click="handleMarking('fixed')">Mark
                            {{ selected.length ? 'selected' : 'all' }} fixed
                        </ButtonRackItem>
                        <ButtonRackItem :disabled="!exceptions.total" @click="deleteSelected" v-if="selected.length">Delete
                            selected
                        </ButtonRackItem>
                        <ButtonRackItem :disabled="!exceptions.total" @click="deleteFixedExceptions">Delete fixed
                        </ButtonRackItem>
                        <ButtonRackItem :disabled="!exceptions.total" @click="deleteAllExceptions">Delete all
                        </ButtonRackItem>
                    </ButtonRack>
                </template>

                <header class="flex items-center px-6 py-4 space-x-4 bg-primary-50">
                    <input
                        :placeholder="!exceptions.total ? 'Why search? There\'s nothing to search on! 🥳' : 'Search exceptions..'"
                        class="flex-1 placeholder-gray-400 rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
                        :class="{'opacity-90 cursor-not-allowed' : !exceptions.total}"
                        type="text"
                        :disabled="!exceptions.total"
                        v-model="form.search"
                    />
                </header>
                <ul class="divide-y divide-gray-200">
                    <li v-for="exception in exceptions.data" :key="exception.id">
                        <div :href="route('exceptions.show', {id: project.id, exception: exception })"
                             class="flex items-center px-6 py-4 space-x-6 hover:bg-gray-100">
                            <div class="flex items-center space-x-2">
                                <input
                                    :class="[
        'text-primary-600 rounded border-gray-300 transition',
        'focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-offset-0',
      ]"
                                    id="newsletter"
                                    type="checkbox"
                                    :value="exception.id"
                                    v-model="selected"
                                />
                            </div>

                            <inertia-link class="flex flex-1 items-center"
                                          :href="route('exceptions.show', {id: project.id, exception: exception })">
                                <div class="flex-1">
                                    <p class="font-medium text-bold"
                                       v-bind:class="{'text-gray-500': exception.status === 'Fixed'}">
                                        {{ exception.short_exception_text }}
                                    </p>

                                    <p class="text-sm text-gray-600">
                                        <Badge success v-if="exception.status === 'Fixed'">{{
                                                exception.status
                                            }}
                                        </Badge>
                                        <Badge info v-if="exception.status === 'Read'">{{ exception.status }}</Badge>
                                        <Badge danger v-if="exception.status === 'Open'">{{ exception.status }}</Badge>
                                        <span v-if="exception.snooze_until">&centerdot; </span>
                                        <Badge info v-if="exception.snooze_until">Snoozed until {{
                                                exception.snooze_until
                                            }}
                                        </Badge>
                                        &centerdot; {{ exception.human_date }} &centerdot;
                                        {{ exception.created_at }}
                                        <Badge info v-if="exception.file_type === 'javascript'">&centerdot; Javascript
                                        </Badge>
                                    </p>
                                </div>
                                <div class="flex-1"></div>

                                <span v-if="exception.project_version"><Badge gray big>{{
                                        exception.project_version
                                    }}</Badge></span>

                                <span v-if="exception.environment"><Badge gray big>{{
                                        exception.environment
                                    }}</Badge></span>

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
                        </div>
                    </li>
                </ul>

                <template #footer>
                    <Paginator :paginated="exceptions"/>
                </template>
            </Card>
        </div>
    </AppLayout>
</template>
