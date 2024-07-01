<script lang="ts" setup>
    // const { data } = await useAsyncData('count', () => $fetch('/api/public'))
    const route: any = useRouter()
    const config = ref({})
    const nav = ref([])
    onMounted(() => {
        nextTick(() => {
            publicApi('').then((res: any) => {
                if (res.status == 1) {
                    nav.value = res.row.nav
                    config.value = res.row.config
                }
            }).catch((err: any) => {

            })
        })

    })


    // publicApi
</script>
<template>

    <NuxtLayout>

        <div class="app-box">
            <app-header :nav="nav" :config="config"></app-header>
            
            <NuxtPage class="mt-30" :key="route.currentRoute._rawValue.fullPath" />
            <app-footer :nav="nav" :config="config"></app-footer>
        </div>

    </NuxtLayout>

</template>

<style>
    @font-face {
        font-family: 'PingFang SC';
        /* src: url('PingFangSC-Bold.eot'); IE9兼容模式  */
        src:
            /* url('PingFangSC-Bold.eot?#iefix') format('embedded-opentype'), IE6-IE8  */
            
            /* url('PingFangSC-Bold.woff2') format('woff2'), chrome、firefox  */
            /* url('/public/font/PingFang-Bold.ttf') format('ttf'),chrome、firefox  */
            url('/public/font/PingFang-Bold.ttf') format('truetype');
        /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
        /* url('PingFangSC-Bold.svg#PingFangSC-Bold') format('svg'); iOS 4.1-  */
        font-weight: 500;
        font-style: normal;
    }

    .app-box {
        margin: 0 auto;
        max-width: 2560px;
    }

    .page-enter-active,
    .page-leave-active {
        transition: all 0.8s;
    }

    .page-enter-from,
    .page-leave-to {
        opacity: 0;
        filter: blur(1rem);
    }
</style>