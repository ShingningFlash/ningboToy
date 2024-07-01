<script setup lang="ts">
    const aboutObj = ref({
        image: '',
        left_img: '',
        mtitle: '',
        text: ''
    })
    function replaceCommasWithNewlines(inputString: string): string {
        // 使用正则表达式将换行替换为富文本换行
        const result = inputString.replace(/\r\n/g, '<br>');
        return result;
    }
    onMounted(() => {
        nextTick(() => {
            const loadingInstance = ElLoading.service({ fullscreen: true })
            aboutApi('').then((res: any) => {
                loadingInstance.close()
                if (res.status == 1) {
                    if(res.row){
                        res.row.text = replaceCommasWithNewlines(res.row.text)
                    }
                    aboutObj.value = res.row
                    
                }
                
            }).catch((err: any) => {

            })
        })
    })
</script>
<template>
    <div>
        <div style="position: relative;"><img :src="aboutObj.image" alt="">
            <div class="swiper-float w-11/12 hidden xl:flex">
                <img style="width:25.47px;margin-right: 17.5px;" src="/cate.svg" alt="">
                <div>{{ aboutObj.title }}</div>
            </div>
        </div>
        <div class="about w-9/12 mx-auto  justify-center flex-col items-center hidden xl:flex">
            <div class="title">{{ aboutObj.title }}</div>
            <div class="heng"></div>
            <div class="box flex" style="width:100%">
                <div class="left-box">
                    <img :src="aboutObj.left_img" alt="">
                </div>
                <div class="right-box">
                    <div class="title">{{ aboutObj.mtitle }}</div>
                    <div class="heng"></div>
                    <div class="text" v-html="aboutObj.text"></div>
                </div>
            </div>
        </div>
        <div class="aboutmo w-11/12 mx-auto  justify-center flex-col items-center flex xl:hidden">
            <div class="title">{{ aboutObj.title }}</div>
            <div class="heng"></div>
            <div class="box " style="width:100%">
                <div class="left-box">
                    <img :src="aboutObj.left_img" alt="">
                </div>
                <div class="right-box">
                    <div class="title">{{ aboutObj.mtitle }}</div>
                    <div class="heng"></div>
                    <div class="text" v-html="aboutObj.text"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .aboutmo{
        padding: 50px 0;
        .title {
            // font-family: "PingFang SC";
            font-weight: 600;
            font-size: 26px;
            line-height: 30px;
            text-align: center;
            color: #000;

        }

        .heng {
            width: 32px;
            height: 4px;
            border-radius: 3px;
            background: #1e91fc;
            margin-top: 10px;
        }
        .box{
            margin-top:20px;
            .left-box{
                
            }
            .right-box{
                margin-top:20px;
                .title{
                    font-size:24px;
                }
                .heng{
                    margin:5px auto;
                }
            }

        }
    }
    .about {
        padding: 100px 0;
        padding-bottom: 175px;
        .title {
            font-family: "PingFang SC",sans-serif;
            font-weight: 600;
            font-size: 36px;
            line-height: 30px;
            text-align: center;
            color: #000;

        }

        .heng {
            width: 52px;
            height: 6px;
            border-radius: 3px;
            background: #1e91fc;
            margin-top: 15px;
        }

        .box {
            margin-top: 10vh;
            gap: 65px;

            .left-box {
                img {
                    width:693px;
                    height:495px;
                    box-shadow: -77px 77px 3px #D7F1FE;
                }

            }

            .right-box {
                width:760px;
                .title {
                    text-align: left;
                    font-weight: 600;
                    font-size: 26px;
                    line-height: 30px;
                    color: #000;
                    font-family: "PingFang SC",sans-serif;
                }

                .text {
                    font-family: "PingFang SC",sans-serif;
                    font-weight: 500;
                    font-size: 20px;
                    color: #000;
                    margin-top:23px;
                    line-height: 33px;
                }
            }

        }
    }
</style>