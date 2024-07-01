<script setup lang="ts">
    const route: any = useRouter()
    const props: object = defineProps({
        nav: Object,
        config: Object
    })
    const goRout = ((url: any) => {
        route.push({
            path: url
        })
        const element = document.getElementById("heads");
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
        }

    })
</script>
<template>
    <div>
        <div class="footer pt-12">
            <div class="footer-box  flex justify-center">
                <div class="flex justify-center w-9/12 xl:justify-between boxsss">
                    <div class="hidden w-8/12 gap-24 xl:flex">
                        <div class="left-item text-lg" v-for="(item,index) in props.nav.bottom" :key="index"
                            @click="goRout(item.url)" style="cursor: pointer;">
                            {{ item.name }}
                            <div style="margin-top:16px;">
                                <div class="child text-base" v-for="(items,indexs) in item.child" :key="indexs"
                                    @click="goRout(item.url)" style="cursor: pointer;">
                                    {{ items.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="right-item  flex  flex-col justify-between items-center xl:w-4/12 xl:flex-row xl:items-start">
                        <div class="box1 text-center text-lg">
                            <img style="width:120px;height: 120px;" :src="props.config.qc_code" alt="">
                            <div style="transform: scale(0.8);">Scan on us</div>
                        </div>
                        <div class="phone flex flex-col items-center xl:block">
                            <div class="text1 text-md xl:text-lg">
                                SERVICE HOTLINE
                            </div>
                            <div class="text2 text-xl xl:text-2xl">
                                {{ props.config.phone }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box3 text-sm text-center pt-4 w-9/12 mr-auto ml-auto mt-4">
				<!-- <div style="width:100%;height: 2px;background-color: #fff;opacity: 0.52;"></div> -->
                {{ props.config.copyright }}&nbsp;&nbsp;
                {{ props.config.record_no }}
            </div>
        </div>
    </div>
</template>

<style scoped>
    .footer {
        background-color: #128366;
    }

    .footer .footer-box .left-item {
        font-family: "PingFang SC";
        font-weight: 600;
        font-size: 18px;
        text-align: left;
        color: #fff;
    }

    .footer .footer-box .left-item .child {
        font-family: "PingFang SC Medium";
        font-weight: 300;
        font-size: 15px;
        color: #fff;
        line-height:30px;
    }

    .footer .footer-box .right-item .box1 {
        font-family: "PingFang SC";
        font-weight: 500;
        color: #fff;
       
        line-height: 30px;

    }

    .footer .footer-box .right-item .phone {
        font-family: "PingFang SC";
        font-weight: 500;
        color: #fff;
    }

    .footer .footer-box .right-item .phone .text1 {
        font-weight: 600;
        font-size:18px;
    }

    .footer .footer-box .right-item .phone .text2 {

        font-weight: 700;
        color: #fff;
        font-size: 33px;
        margin-top:10px;
    }

    .box3 {
        font-family: "PingFang SC";
        font-weight: 500;
        color: #fff;
        border-top: 2px solid rgba(255,255,255, 0.52);
        font-size: 14px;
        padding-top:24px;
        padding-bottom:24px;
        margin-top:50px;
    }


    @media (min-width:1517px) {
        .boxsss{
            width:1517px;
        }
        .box3{
            width:1517px;
        }
    }
</style>