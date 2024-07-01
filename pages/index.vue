<script setup lang="ts">
    import {
        throttle
    } from '../utils/throttle'
    const route = useRouter()
    const goDetail = ((id: any) => {
        
        route.push({
            path: '/productCenter',
            query: {
                Id: id
            }
        })
    })
    const gohref = ((url: any) => {
        if (url != '') {
            window.location.href = url
        }
    });
	let isOptiys:boolean = false;
	const changeBtn = ((e:any) =>{
		if(e != "") {
			isOptiys = true;
		}
	});

    function replaceCommasWithNewlines(inputString: string): string {
        // 使用正则表达式将换行替换为富文本换行
        const result = inputString.replace(/\r\n/g, '<br>');
        return result;
    }
    // 规划产品列表数据
    function groupArrayItems < T > (arr: T[], groupSize1: number, groupSize2: number): T[][] {
        const groupedItems: T[][] = []; //定义用于存储最终的分组结果的二维数组
        let tempGroup: T[] = []; //用于暂时存储正在构建的分组的数组
        for (const item of arr) {
            tempGroup.push(item);
            if (tempGroup.length === groupSize1 || tempGroup.length === groupSize2) {
                groupedItems.push(tempGroup);
                tempGroup = [];
            }
        }

        if (tempGroup.length > 0) {
            groupedItems.push(tempGroup);
        }
        return groupedItems;
    }
    // 轮播图
    const swiperList = ref([{
        img: ''
    }])
    // 产品列表
    const productList: any = ref([{
        img: '',
        title: '',
    }])
    const title = ref()
    // 关于我们
    const aboutData = ref({
        image1: '',
        image2: '',
        logo: '',
        text: ''
    })
    const pcPro1 = ref() //产品2
    const pcPro2 = ref() // 产品1
    // 首页底部轮播图
    const cert = ref()

    // 留言
    const message = ref({
        img: '',
        logo: ''
    })
    const form = reactive({
        name: '',
        content: ''
    })
    let video = ref('')
    // 留言提交
    const messagePush = (throttle(() => {
        console.log("节流");

        if (form.name == '') {
            return alert('Please enter your name')
        }
        if (form.content == '') {
            return alert('Please enter your Message content')
        }

        let formData = new FormData()
        formData.append('name', form.name)
        formData.append('comment', form.content)

        indexMessageApi(formData).then((res: any) => {
            alert(res.msg)
            form.name = ''
            form.content = ''
        })
    }))
    onMounted(() => {
        nextTick(() => {
            indexApi('').then((res: any) => {
                if (res.status == 1) {
                    swiperList.value = res.row.banner

                    if (res.row.about) {
                        res.row.about.text = replaceCommasWithNewlines(res.row.about.text)
                    }
                    aboutData.value = res.row.about
                    cert.value = res.row.cert
                    message.value = res.row.message
                    productList.value = res.row.goods.data
                    title.value = res.row.goods.logo
                    let list = productList.value
                    video.value = res.row.video
                    pcPro1.value = groupArrayItems(list, 5, 10)[0] as never
                    pcPro2.value = groupArrayItems(list, 5, 10)[1] as never
                }
            }).catch((err: any) => {

            })
        })
    })
</script>

<template>
    <div>
        <div>
            <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative,SwiperPagination]" :slides-per-view="1" :loop="true"
                :effect="'creative'" :autoplay="{delay: 8000,disableOnInteraction: true,}" :creative-effect="{ prev: { shadow: false, translate: ['-20%', 0, -1],},      
                next: {translate: ['100%', 0, 0],},}">
                <SwiperSlide v-for="(slide,index) in swiperList" :key="index" @click="gohref(slide.url)">
                    <img :src="slide.img" />
                </SwiperSlide>
            </Swiper>
        </div>
        <div class="backg lg:pt-26 hidden xl:block" v-if="title != ''" style="padding-top: 41px;">

            <div class="productitle text-center text-xl md:text-2xl lg:text-4xl xl:text-6xl ">
                <img class="fi" :src="title" alt="" style="width: 523px;">
            </div>
            <div class="product flex flex-wrap w-8/12 m-auto  text-center justify-between" style="height:590px">
                <div class="text-xl1" style="width:18%" v-for="(sider,index) in pcPro1" :key="index"
                    @click="goDetail(sider.id)">
                    <div class="span" style="font-weight: 500;">{{ sider.title }}</div>
                    <div class="img-block">
                        <img class="" :src="sider.img" alt=""/>
                    </div>
                </div>
                <div class="text-xl1" style="width:18%" v-for="(sider,index) in pcPro2" :key="index"
                    @click="goDetail(sider.id)">
                    <div class="span" style="font-weight: 500;">{{ sider.title }}</div>
                    <div class="img-block">
                        <img :src="sider.img" alt=""/>
                    </div>

                </div>
            </div>
            <div class="about ">
                <div class="title w-10/12 m-auto" style="display: flex;justify-content: center;">
                    <img style="" :src="aboutData.logo" alt="">
                </div>
                <div class="flex justify-between items-center w-8/12 m-auto" style="margin-top:81px;">
                    <div class="left flex flex-col">
                        <div class=" bg flex justify-center align-center">
                            <img class="about-img" :src="aboutData.image1" alt="" style="height:248px">
                        </div>
                        <div class=" bg flex justify-center align-center"
                            style="margin-top:52px;">
                            <img class="about-img" :src="aboutData.image2" alt="" style="height:248px">
                        </div>
                    </div>
                    <div class="right text-xl w-3/5" v-html="aboutData.text">

                    </div>
                </div>
            </div>

        </div>
        <!-- <div style="background: url('/image9.png') no-repeat center/cover;height: 130vh;width: 100%;display: flex;justify-content: center;align-items: center;">
            <video style="width:60vw;" :src="video" controls></video>
        </div> -->
        <div style="background-color: #fff;width: 100%;">
            <div class="w-10/12 m-auto hidden xl:block" style="width:78%">
                <Swiper style="position: relative;" :modules="[SwiperAutoplay, SwiperEffectCreative,SwiperPagination]"
                    :slides-per-view="1" :loop="true" :effect="'creative'"
                    :autoplay="{delay: 8000,disableOnInteraction: true,}" :creative-effect="{ prev: { shadow: false, translate: ['-20%', 0, -1],},      
                next: {translate: ['100%', 0, 0],},}">
                    <SwiperSlide v-for="(slide,index) in cert" :key="index">
                        <img style="width:100%;border-radius: 15px;" :src="slide.img" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>

        <div class="message hidden xl:block" style="position: relative;">
            <div class="flex w-10/12 mx-auto  pb-12 justify-between" style="width:78%">
                <div class="l-msg">
                    <img style="width:36vw" :src="message.logo" alt="">
                    <div class="heng"></div>
                    <div class="input-name">
                        <div class="head">
                            NAME<span>*</span>
                        </div>
                        <input class="input" v-model="form.name" type="text" placeholder="Please enter your name" @input="changeBtn"/>
                    </div>
                    <div class="input-name">
                        <div class="head">
                            MESSAGE<span>*</span>
                        </div>

                        <textarea class="inputs" v-model="form.content" type="text"
                            placeholder="Please enter your Message content"  @input="changeBtn"></textarea>
                    </div>
                    <div class="blue-btn" :class="{nooptity: isOptiys}" @click="messagePush">
                        SEND
                    </div>
                </div>
                <div class="r-msg">
                    <img :src="message.img" alt="">
                </div>
            </div>
        </div>

        <!-- 移动端 -->
        <div class="backg_mo block xl:hidden">
            <div class="productitle text-center text-xl md:text-2xl lg:text-4xl xl:text-6xl ">
                <img class="fi" :src="title" alt="">
            </div>
            <div class="list flex flex-wrap justify-between  gap-4 w-11/12 mx-auto mt-2"
                style="display: grid;grid-template-columns: repeat(2,1fr);">
                <div class="list_item  " v-for="(silder,index) in productList" :key="index"
                    @click="goDetail(silder.id)">
                    <img :src="silder.img" alt="">
                    <div class="title">{{ silder.title }}</div>
                </div>
            </div>
            <div class="about w-11/12 m-auto  ">
                <div class="title text-6xl pt-24">
                    <img :src="aboutData.logo" alt="">
                </div>
                <div class=" justify-between   " style="margin-top:5%">
                    <div class="left flex flex-col ">
                        <div class=" bg flex justify-center align-center pt-3 pb-3 pl-3 pr-3 "
                            style="background: linear-gradient(134.55deg, #2a98f8 0%, #fff 49.49%, #fb960a 100%);">
                            <img class="" :src="aboutData.image1" alt="">
                        </div>
                        <div class=" bg flex justify-center align-center pt-3 pb-3 pl-3 pr-3 mt-3"
                            style="background: linear-gradient(134.55deg, #2a98f8 0%, #fff 49.49%, #fb960a 100%);">
                            <img class="" :src="aboutData.image2" alt="">
                        </div>
                    </div>
                    <div class="right text-lg " v-html="aboutData.text" style="margin-top:10px;">

                    </div>
                </div>

            </div>

            <div class="w-11/12 mx-auto mt-4">
                <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative,SwiperPagination]" :slides-per-view="1"
                    :loop="true" :effect="'creative'" :autoplay="{delay: 8000,disableOnInteraction: true,}"
                    :creative-effect="{ prev: { shadow: false, translate: ['-20%', 0, -1],},      
                next: {translate: ['100%', 0, 0],},}">
                    <SwiperSlide v-for="(slide,index) in cert" :key="index">
                        <img style="width:100%" :src="slide.img" />
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
        <div class="messagemo block xl:hidden">
            <div class=" w-11/12 mx-auto pt-12 pb-12">
                <div class="r-msg">
                    <img :src="message.img" alt="">
                </div>
                <div class="l-msg">
                    <img :src="message.logo" alt="">
                    <div class="heng"></div>
                    <div class="input-name">
                        <div class="head">
                            NAME<span>*</span>
                        </div>
                        <input class="input" v-model="form.name" type="text" placeholder="Please enter your name" />
                    </div>
                    <div class="input-name">
                        <div class="head">
                            MESSAGE<span>*</span>
                        </div>

                        <textarea class="inputs" v-model="form.content" type="text"
                            placeholder="Please enter your Message content"></textarea>
                    </div>
                    <div class="blue-btn" @click="messagePush">
                        SEND
                    </div>
                </div>

            </div>
        </div>


    </div>
</template>

<style scoped lang="scss">
    .backg {
        //background: url('/image4.png') no-repeat center/cover;
        //background-position: top;
        height: auto;
        position: relative;
        padding-bottom: 56vh;
		background: linear-gradient(180.00deg, #e8f2f1 0%, #fff 100%);
    }

    .clouds_one {
        background: url("/image8.png") no-repeat center/cover;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 300%;
        -webkit-animation: cloud_one 50s linear infinite;
        -moz-animation: cloud_one 50s linear infinite;
        -o-animation: cloud_one 50s linear infinite;
        animation: cloud_one 50s linear infinite;
        -webkit-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        z-index: -1;
    }



    .backg_mo {
        background-color: #BAE8FF;
        /* background: url('/image4.png') no-repeat center/cover; */

        position: relative;
        overflow: hidden;
        -webkit-animation: sky_background 50s ease-out infinite;
        -moz-animation: sky_background 50s ease-out infinite;
        -o-animation: sky_background 50s ease-out infinite;
        animation: sky_background 50s ease-out infinite;
        -webkit-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        padding: 30px 0;

        .productitle {
            color: #1e92f7;

            font-family: 'DFPHaiBaoW12-GB';
            font-weight: 400;
            letter-spacing: 2.38px;
            font-weight: bolder;

            .ti,
            .fi {
                color: #FB9404;
                -webkit-text-stroke: 1px #fff;
                position: relative;
                z-index: 1;
                left: 50%;
                transform: translateX(-50%);


            }

            .fi {
                color: #1E92F7;

            }


        }

        .list {
            // margin-top: 20px;

            .list_item {
                // width: 48%;
                box-shadow: 0 0 20px #00000029;
                background: #fff;

                img {
                    width: 100%;
                }

                .title {
                    font-family: "PingFang SC Bold";
                    font-weight: 700;
                    font-size: 15px;
                    padding: 10px;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            }

        }
    }



    .backg .productitle {
        color: #1e92f7;
        font-family: 'DFPHaiBaoW12-GB';
        font-weight: 400;
        letter-spacing: 2.38px;
        font-weight: bolder;
        margin-top: 60px;
    }

    .backg .bgimg {
        position: absolute;
        top: 0;
        z-index: 0;
    }
	.text-xl1 {
		width: 305px;
		height: 274px;
		border-radius: 10px;
		background: #fff;
		
		font-family: "PingFang SC Bold";
		font-weight: 700;
		font-size: 16px;
		line-height: 20px;
		text-align: center;
		color: #000;
	}
	.text-xl1 .span {
		margin-top: 15px;
	}
	.text-xl1>img {
		height: 205px;
	}
    .product-item {
        .imged {

            //box-shadow: -10px 7px 2px 2px #B1E6FB;


        }

        .imged1 {
            //box-shadow: 16px -7px 2px 2px #B1E6FB;
        }

        .imged2 {
            //box-shadow: 16px 7px 2px 2px #B1E6FB;
        }

        .imged3 {
           // box-shadow: -6px 12px 2px 2px #B1E6FB;
        }

        .imged4 {
            //box-shadow: 8px -10px 2px 2px #B1E6FB;
        }


        .img-block {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            position: relative;
            border: 3px solid #F1F1F1;
            border-radius: 50%;

            img {
                cursor: pointer;
                transition: all .6s;
                border-radius: 50%;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;

            }
        }



        &:hover img {
            transform: scale(1.1);
            border: 2px solid #F1F1F1;

        }

        &:hover .img-block {
            border: none;
        }

        .span {
            margin-top: 20px;
            font-family: 'PingFang SC Bold', sans-serif;
        }
    }

    .product-items {
        width: 100%;



        .imged5 {
            box-shadow: 4px 0px 2px 14px #B1E6FB;

        }

        .imged6 {
            box-shadow: -8px -10px 2px 2px #B1E6FB;
        }

        .imged7 {
            box-shadow: 6px 12px 2px 2px #B1E6FB;
        }

        .imged8 {
            box-shadow: 6px -15px 2px 2px #B1E6FB;
        }

        .imged9 {
            box-shadow: 12px 0px 2px 2px #B1E6FB;
        }

        .img-block {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            position: relative;
            border: 3px solid #F1F1F1;
            border-radius: 50%;

            img {
                cursor: pointer;
                transition: all .6s;
                border-radius: 50%;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;

            }
        }

        &:hover img {
            transform: scale(1.1);
            border: 3px solid #F1F1F1;
        }

        &:hover .img-block {
            border: none;
        }

        .span {
            // line-height: 45px;
            margin-top: 20px;
        }
    }

    /* 奇数 */
    .product-item:nth-child(even) {
        margin-top: 100px;

    }

    .product-items:nth-child(odd) {
        margin-top: 100px;
    }

    /*  */

    .backg .productitle .fi {
        color: #1E92F7;
        -webkit-text-stroke: 2px #fff;
        position: relative;
        z-index: 1;
        left: 50%;
        transform: translateX(-50%);
        // width: 603px;
    }

    .message {
        background-color: #fff;
        padding-top: 176px;

        .l-msg {
            .heng {
                width: 68px;
                height: 6px;
                border-radius: 3px;
                background: #A7D6CC;
                margin-top: 5px;
                margin-left: 8px;
            }

            .input-name {
                margin-top: 36px;
                margin-left: 5px;

                .head {
                    color: #000000;
                    font-size: 20px;
                    font-family: "PingFang SC";
                    font-weight: 700;
                    margin-bottom: 10px;

                    span {
                        color: #ff0000;
                    }
                }

                .input {
                    width: 36vw;
                    height: 63px;
                    border-radius: 8px;
                    background: #fff;
                    border: 1px solid #d8d8d8;
                    padding-left: 20px;
                }

                .inputs {
                    width: 36vw;
                    height: 171px;
                    border-radius: 8px;
                    background: #fff;
                    border: 1px solid #d8d8d8;
                    padding-left: 20px;
                    padding-top: 20px;
                }

            }
			.nooptity {
				opacity: 0.5;
			}
            .blue-btn {
                width: 213px;
                height: 65px;
                color: #fff;
                background-color: #A7D6CC;
                line-height: 65px;
                text-align: center;
                border: 1px solid #fff;
                box-shadow: 0px 0px 0px 3px #A7D6CC;
                border-radius: 30px;
                cursor: pointer;
                margin-top: 20px;
				
                &:active {
                    background: lighten($color: #A7D6CC, $amount: 10%);
                }
            }
        }

        .r-msg {
			padding: 14px;
			width: 602px;
			height: 606px;
			border-radius: 20px;
			background-color: #fff;
			box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.192);
            img {
                width: 576px;
                height: 579px;
                // box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.192);
            }
        }

    }

    .messagemo {
        background-color: #EEFCFF;

        .l-msg {
            margin-top: 20px;

            .heng {
                width: 68px;
                height: 6px;
                border-radius: 3px;
                background: #3bbafd;
            }

            .input-name {
                margin-top: 44px;

                .head {
                    color: #000000;
                    font-size: 20px;
                    font-family: "PingFang SC";
                    font-weight: 700;

                    span {
                        color: #ff0000;
                    }
                }

                .input {
                    width: 100%;
                    height: 63px;
                    border-radius: 8px;
                    background: #fff;
                    border: 1px solid #d8d8d8;
                    padding-left: 20px;
                }

                .inputs {
                    width: 100%;
                    height: 171px;
                    border-radius: 8px;
                    background: #fff;
                    border: 1px solid #d8d8d8;
                    padding-left: 20px;
                    padding-top: 20px;
                }

            }

            .blue-btn {
                width: 150px;
                height: 35px;
                color: #fff;
                background-color: #3CBAFD;
                line-height: 35px;
                text-align: center;
                border: 1px solid #fff;
                box-shadow: 0px 0px 0px 3px #3CBAFD;
                border-radius: 30px;
                cursor: pointer;
                margin-top: 20px;

                &:active {
                    background: lighten($color: #3CBAFD, $amount: 10%);
                }
            }
        }

        .r-msg {

            img {
                width: 100%;
                // height: 30vw;
                box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.192);
            }
        }

    }



    .backg .productitle .ti {
        color: #FB9404;
        -webkit-text-stroke: 2px #fff;
        position: relative;
        z-index: 1;
    }

    .backg .product {
        width: 74.666667%;
        // font-family: "PingFang SC Bold";
        font-weight: 700;
        color: #000;
        position: relative;
        z-index: 1;
        top: 71px;

    }

    .backg .about {
        position: relative;
        z-index: 1;
        top: 29vh;
    }

    .backg .about .title {
        color: #1e92f7;
        font-weight: 800;
        letter-spacing: 2.38px;
        padding-left: 20px;
    }

    .backg .about .title img {
        width: 341px;
    }

    .backg .about .title .text2 {
        color: #fb9404;
    }

    .backg .about .left .bg {
        //background: linear-gradient(134.55deg, #2a98f8 0%, #fff 49.49%, #fb960a 100%);
		border: 5px solid #128366;
        border-radius: 50px 0;
		.about-img {
			border-radius: 44px 0;
		}
    }

    .backg .about .right {
        font-family: "PingFang SC Bold";
        font-weight: 400;
        font-size: 18px;
        line-height: 35px;
        color: #000;
        margin-left: 93px;
    }
</style>