<script lang="ts" setup>
    const props: any = defineProps({
        pid: Number,
    })

    // let preImg = ref('')
    let prodetailData = ref({
        name: '',
        price: '',
        content: '',
        remarks: '',
        images: ''
    })
    const route: any = useRouter()
    // let pid = ref(0)
    const getProdata = (() => {
        let data = {
            pid: props.pid
        }
        productdetailApi(data).then((res: any) => {
            res.row.data.local.remarks = replaceCommasWithNewlines(res.row.data.local.remarks)
            prodetailData.value = res.row.data.local

        }).catch((err: any) => {

        })
    })
    const emit = defineEmits(['back-emitted', 'go-emitted'])

    function replaceCommasWithNewlines(inputString: string): string {
        // 使用正则表达式将换行替换为富文本换行
        const result = inputString.replace(/\r\n/g, '<br>');
        return result;
    }

    const preImg = computed(() => {
        return prodetailData.value.images[current.value]
    })
    const changImg = ((item: any, index: any) => {
        current.value = index
    })
    let show = ref(true)
    let current = ref(0)
    onMounted(() => {


        const route = useRoute()
        nextTick(() => {
            getProdata()
        })
    })
</script>
<template>
    <div>
        <div id="boxdetail" class="box w-9/12 mx-auto  justify-between  hidden xl:flex">
            <div class="box-left">
                <img style="width:748px;height:748px;max-width:none;border: 1px solid #E7E7E7;" :src="preImg" alt="">
            </div>
            <div class="box-right ml-0 xl:ml-16">
                <div class="title">{{ prodetailData.name }}</div>
                <div class="heng"></div>
                <div class="text2" style="margin-top:10px;">
                    <!-- <div style="color:rgb(71,84,93);font-size: 22px;font-family: 'PingFang SC',sans-serif;">
                        {{ prodetailData.resume }}</div> -->
                    <div style="color:rgb(0,0,0);font-size: 18px;font-family: 'PingFang SC',sans-serif;">
                        Itme No.：{{ prodetailData.no }}</div>
                    <div style="color:rgb(0,0,0);font-size: 16px;font-family: 'PingFang SC',sans-serif;">
                        Product Size：{{ prodetailData.size }}</div>
                </div>
                <!-- <div class="price">${{ prodetailData.price }}</div> -->
                <div class="text" v-html="prodetailData.remarks"></div>

                <div class="btn flex justify-between">
                    <div class="btn-blue" @click="emit('go-emitted')">CONTACT CUSTOMER SERVICE</div>
                    <div class="btn-orange" @click="emit('back-emitted')">RETURNS A LIST OF</div>
                </div>
            </div>
        </div>
        <div class="boxmo w-11/12 mx-auto justify-between gap-6 block xl:hidden">
            <div class="box-left">
                <img :src="preImg" alt="">

            </div>
            <div class="imgsmo   flex flex-wrap gap-6 xl:hidden">
                <div v-for="(item,index) in prodetailData.images" :key="index" @click="changImg(item,index)"
                    style="position: relative;">
                    <img :src="item" alt="">

                    <div class="filder" v-if="current == index">

                    </div>
                </div>

            </div>
            <div class="box-right " style="margin-top:5px;">
                <div class="title">{{ prodetailData.name }}</div>
                <div class="heng"></div>
                <div class="text2" style="margin-top:10px;">
                    <!-- <div style="color:rgb(71,84,93);font-size: 24px;font-family: 'PingFang SC',sans-serif;">
                        {{ prodetailData.resume }}</div> -->
                    <div style="color:rgb(0,0,0);font-size: 20px;font-family: 'PingFang SC',sans-serif;">
                        Itme No.：{{ prodetailData.no }}</div>
                    <div style="color:rgb(0,0,0);font-size: 16px;font-family: 'PingFang SC',sans-serif;">
                        Product Size：{{ prodetailData.size }}</div>
                </div>
                <!-- <div class="price">${{ prodetailData.price }}</div> -->
                <div class="text" v-html="prodetailData.remarks"></div>
                <div class="btn flex justify-between">
                    <div class="btn-blue" @click="emit('go-emitted')">CONTACT CUSTOMER SERVICE</div>
                    <div class="btn-orange" @click="emit('back-emitted')">RETURNS A LIST OF</div>
                </div>
            </div>
        </div>
        <div class="imgs w-9/12 mx-auto flex-wrap gap-6 hidden xl:flex">
            <div v-for="(item,index) in prodetailData.images" :key="index" @click="changImg(item,index)"
                style="position: relative;">
                <img :src="item" alt="">

                <div class="filder" v-if="current == index">

                </div>
            </div>

        </div>

        <div class="detailTitle w-11/12 mx-auto flex items-center xl:w-9/12" @click="show = !show">
            PRODUCT DETAILS <div class="sanjiao"></div>
        </div>
        <div class="Overview w-9/12 mx-auto mt-10">
            Overview
        </div>
        <div v-if="show" class="w-11/12 mx-auto htmls xl:w-9/12 pb-20 mt-8" v-html="prodetailData.content">

        </div>


    </div>
</template>
<style>
    .htmls table {
        border-collapse: collapse;
        margin-top: 40px;
    }

    td,
    th {
        border: 1px solid #ccc;
        min-width: 50px;
        height: 20px;
    }

    th {
        background-color: #f1f1f1;
    }
</style>

<style lang="scss" scoped>
    .Overview {
        font-family: "PingFang SC";
        font-weight: 700;
        font-size: 21px;
        line-height: 35px;
        text-align: left;
        color: #000;
        padding-bottom:13px;
        width:1517px;
        border-bottom: 1px solid #E3E3E3;
    }

    .box {
        padding-top: 100px;
        // width:1516px;

        &-left {


            img {}
        }

        &-right {
            margin-left: 60px;

            .title {
                font-family: "PingFang SC";
                font-weight: 600;
                font-size: 24px;
                color: #000;
            }

            .heng {
                width: 163px;
                height: 5px;
                border-radius: 2.5px;
                background: #1e8ff7;
                margin-top: 18px;
                margin-bottom: 30px;
            }

            .price {
                font-family: "PingFang SC Bold";
                font-weight: 700;
                font-size: 30px;
                color: #f00;

            }

            .text {
                font-family: "PingFang SC";
                font-weight: 500;
                font-size: 18px;
                margin-top: 45px;
            }

            .btn {
                font-family: "PingFang SC";
                font-weight: 600;
                font-size: 18px;
                text-align: center;
                color: #fff;
                margin-top: 50px;

                &-blue {
                    // width: 16vw;
                    padding: 0 30px;
                    height: 7vh;
                    border-radius: 34px;
                    background: #1e8ff7;
                    line-height: 7vh;
                    cursor: pointer;
                    font-size: 18px;
                    user-select: none;
                    margin-right: 45px;

                    &:active {
                        background: lighten($color: #1e8ff7, $amount: 10%);
                    }
                }

                &-orange {
                    padding: 0 80px;
                    font-size: 18px;
                    // width: 16vw;
                    height: 7vh;
                    border-radius: 34px;
                    background: #FFA200;
                    line-height: 7vh;
                    cursor: pointer;

                    &:active {
                        background: lighten($color: #FFA200, $amount: 10%);
                    }
                }
            }
        }
    }

    .boxmo {
        // padding: 20px 0;

        .box-left {
            img {
                width: 100%;

            }
        }

        .box-right {
            width: 100%;
            margin-left: 0;

            .title {
                font-family: "PingFang SC Bold";
                font-weight: 700;
                font-size: 20px;
                color: #000;
            }

            .heng {
                width: 123px;
                height: 3px;
                border-radius: 2.5px;
                background: #1e8ff7;
                margin-top: 15px;
                margin-bottom: 20px;
            }

            .price {
                font-family: "PingFang SC Bold";
                font-weight: 700;
                font-size: 26px;
                color: #f00;

            }

            .text {
                font-family: "PingFang SC Bold";
                font-weight: 700;
                font-size: 18px;
                margin-top: 25px;
            }

            .btn {
                font-family: "PingFang SC Bold";
                font-weight: 700;
                font-size: 18px;
                text-align: center;
                color: #fff;
                margin-top: 50px;

                &-blue {
                    width: 43vw;
                    height: 7vh;
                    border-radius: 34px;
                    background: #1e8ff7;
                    line-height: 7vh;
                    cursor: pointer;


                    &:active {
                        background: lighten($color: #1e8ff7, $amount: 10%);
                    }
                }

                &-orange {
                    width: 43vw;
                    height: 7vh;
                    border-radius: 34px;
                    background: #FFA200;
                    line-height: 7vh;
                    cursor: pointer;

                    &:active {
                        background: lighten($color: #FFA200, $amount: 10%);
                    }
                }
            }
        }
    }

    .imgs {

        margin-top: 30px;

        img {
            width: 161px;
            height: 161px;
            cursor: pointer;
        }

        .filder {
            position: absolute;
            z-index: 0;
            width: 161px;
            height: 161px;
            background: #1e8ff7;
            opacity: 0.66;
            top: 0;
        }

        .actives {
            border: 1px solid #1E8FF7;
        }
    }

    .imgsmo {
        cursor: pointer;
        margin-top: 30px;

        img {
            width: 121px;
            height: 121px;
        }

        .filder {
            position: absolute;
            z-index: 0;
            width: 121px;
            height: 121px;
            background: #1e8ff7;
            opacity: 0.66;
            top: 0;
        }

        .actives {
            border: 1px solid #1E8FF7;
        }
    }

    .detailTitle {
        background: #fff;
        box-shadow: 0 0 20px #0000001a;
        height: 70px;
        font-family: "PingFang SC";
        font-weight: 700;
        font-size: 20px;
        padding-left: 24px;
        color: #000;
        margin-top: 70px;

        .sanjiao {
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 10px solid #1E8FF7;
            margin-left: 10px;
            /* 三角形颜色 */
        }
    }



    @media (min-width:1517px) {
        #boxdetail {
            width: 1517px;
        }

        .imgs {
            width: 1517px;
        }

        .detailTitle {
            width: 1517px;
        }

        .htmls {
            width: 1517px;
            padding: 0 13px;
            box-sizing: border-box;
        }
    }
</style>