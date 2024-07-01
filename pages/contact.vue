<script lang="ts" setup>
    import {
        throttle
    } from '../utils/throttle'
    
    import AMapLoader from "@amap/amap-jsapi-loader";
    function replaceCommasWithNewlines(inputString: string): string {
        // 使用正则表达式将换行替换为富文本换行
        const result = inputString.replace(/\r\n/g, '<br>');
        return result;
    }
    declare let AMap: any;
    const contactObj = ref({
        image: '',
        left_img: '',
        mtitle: '',
        text: '',
        map: '',
        title:''
    })
    const maps = ref()

    const messagePush = (() => {
        console.log("节流");
        if (form.name == '') {
            return alert('Please enter your name')
        }
        if (form.content == '') {
            return alert('Please enter your Message content')
        }
        if (form.xing == '') {
            return alert('Please enter your Country')
        }
        if (form.title == '') {
            return alert('Please enter your Subject')
        }
        if (form.email == '') {
            return alert('Please enter your email')
        }
        let data = {
            name: form.name,
            email:form.email,
            content: form.content,
            xing:form.xing,
            title:form.title
        }
        let formData = new FormData()
        formData.append('name',form.name)
        formData.append('email',form.email)
        formData.append('content',form.content)
        formData.append('xing',form.xing)
        formData.append('title',form.title)
        
        messageApi(formData).then((res: any) => {
            alert(res.msg)
            form.name = ''
            form.content = ''
            form.email = ''
            form.xing = ''
            form.title = ''
        })
    })
    const form = reactive({
        name: '',
        email: '',
        xing: '',
        content: '',
        title: ''
    })

    onMounted(() => {

        nextTick(() => {
            
            // window._AMapSecurityConfig = {
            //     securityJsCode: 'd3670d9faa3fc8548dc7b1906f6bc373',
            // }


            
            const loadingInstance = ElLoading.service({ fullscreen: true })
            contactApi('').then((res: any) => {
                if (res.status == 1) {
                    if (res.row.text != '') {
                        res.row.text = replaceCommasWithNewlines(res.row.text)
                    }
                    contactObj.value = res.row
                    let logdata = contactObj.value.map
                    AMapLoader.load({
                        "key": "9ac02314779bcc0e257bf335121e5bbc", // 申请好的Web端开发者Key，首次调用 load 时必填
                        "version": "2.0", // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
                        "plugins": [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                    }).then((AMap) => {
                        loadingInstance.close()
                        setTimeout(() => {
                            let getDom = document.getElementById('container')
                            if (getDom) {
                                let map = new AMap.Map('container',{
                                    zoom:16,
                                    center:[logdata.split(',')[0],logdata.split(',')[1]]
                                })
                            }
                        }, 1000)
                    }).catch(e => {
                        console.log(e);
                    })



                }
            }).catch((err: any) => {

            })
        })
    })
</script>


<template>
    <div>
        <div style="position: relative;">
            <img :src="contactObj.image" alt="">
            <div class="swiper-float w-9/12 hidden xl:flex" style="">
                <img style="width:25.47px;margin-right: 17.5px;" src="/cate.svg" alt="">
                <div>{{contactObj.title}}</div>
            </div>
        </div>
        <div class="about w-9/12 mx-auto  justify-center flex-col items-center hidden xl:flex">
            <div class="title">{{ contactObj.title }}</div>
            <div class="heng"></div>
            <div class="box flex justify-between">
                <div class="left-box">
                    <div class="inp">
                        <input type="text" placeholder="Full Name" v-model="form.name">
                    </div>
                    <div class="inp">
                        <input type="text" placeholder="Email" v-model="form.email">
                    </div>
                    <div class="inp">
                        <input type="text" placeholder="Country" v-model="form.xing">
                    </div>
                    <div class="inp">
                        <input type="text" placeholder="Subject" v-model="form.title">
                    </div>
                    <div class="inp">
                        <textarea type="text" placeholder="Message" v-model="form.content"></textarea>
                    </div>
                    <div class="blue-btn" @click="messagePush">SEND</div>
                </div>
                <div class="right-box">
                    <div class="title">{{ contactObj.mtitle }}</div>
                    <div class="heng"></div>
                    <div class="text" v-html="contactObj.text"></div>
                    <div class="text-center mt-6" style="width:319px">
                        <img :src="contactObj.qr_image" alt="">
                        <div style="color:#777777" class="mt-2">Mobile phone scan</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="aboutmo w-11/12 mx-auto  justify-center flex-col items-center  flex xl:hidden">
            <div class="title" style="font-size:24px">{{ contactObj.title }}</div>
            <div class="heng"></div>
            <div class="box " style="width:100%;margin-top:0">
                <div class="left-box">
                    <div class="inp">
                        <input style="width:100%;height: 45px;" type="text" placeholder="Full Name">
                    </div>
                    <div class="inp">
                        <input style="width:100%;height: 45px;" type="text" placeholder="Email">
                    </div>
                    <div class="inp">
                        <input style="width:100%;height: 45px;" type="text" placeholder="Country">
                    </div>
                    <div class="inp">
                        <input style="width:100%;height: 45px;" type="text" placeholder="Subject">
                    </div>
                    <div class="inp">
                        <textarea style="width:100%;height: 90px;" type="text" placeholder="Message"></textarea>
                    </div>
                    <div class="blue-btn" style="width:200px;height: 45px;line-height: 45px;" @click="messagePush">SEND
                    </div>
                </div>
                <div class="right-box" style="margin-top:20px">
                    <div class="title">{{ contactObj.mtitle }}</div>
                    <div class="heng" style="margin-bottom:10px;"></div>
                    <div class="text" v-html="contactObj.text"></div>
                    <div class="flex justify-center">
                        <img style="width:45vw;" :src="contactObj.qr_image" alt="">
                        
                    </div>
                    <div class="text-center">Mobile phone scan</div>
                </div>
            </div>
        </div>
        <div class="">
            <div id="container" class="amap w-11/12 mx-auto xl:w-9/12 h-64 xl:h-screen"></div>
        </div>

        <!-- <div id="map-content" class="amaps w-11/12 mx-auto xl:w-8/12 h-64 hidden xl:block" ></div> -->
    </div>
</template>

<style scoped lang="scss">
    .aboutmo {
        padding: 50px 0;
        padding-bottom: 20px;

        .title {
            font-family: "PingFang SC Bold";
            font-weight: 700;
            font-size: 36px;
            line-height: 30px;
            text-align: left;
            color: #000;

        }

        .heng {
            width: 52px;
            height: 6px;
            border-radius: 3px;
            background: #1e91fc;
            margin-top: 30px;
        }

        .box {
            margin-top: 10vh;
            gap: 65px;
            box-sizing: border-box;

            .left-box {
                width: 100%;

                .inp {
                    margin-top: 20px;

                    input {
                        width: 30vw;
                        height: 66px;
                        border-radius: 8px;
                        background: #fff;
                        border: 1px solid #d8d8d8;
                        padding-left: 20px;
                    }

                    textarea {
                        border: 1px solid #d8d8d8;
                        padding-left: 20px;
                        padding-top: 20px;
                    }
                }

            }

            .right-box {
                // width: 760px;

                .title {
                    font-family: "PingFang SC",sans-serif;
                    font-weight: 700;
                    font-size: 26px;
                    line-height: 30px;
                    color: #000;
                }

                .text {

                    width: 100%;
                    font-family: "PingFang SC",sans-serif;
                    font-weight: 700;
                    font-size: 20px;
                    color: #000;
                    overflow: hidden;
                }
            }

        }
    }

    .about {
        padding: 100px 0;
        padding-bottom: 93px;
        .title {
            font-family: "PingFang SC",sans-serif;
            font-weight: 700;
            font-size: 36px;
            line-height: 30px;
            text-align: left;
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
            // gap: 65px;

            .left-box {
                margin-left:55px;
                .inp {
                    margin-bottom: 25px;

                    input {
                        width: 30vw;
                        height: 66px;
                        border-radius: 8px;
                        background: #fff;
                        border: 1px solid #d8d8d8;
                        padding-left: 20px;
                    }

                    textarea {
                        width: 30vw;
                        height: 240px;
                        border: 1px solid #d8d8d8;
                        padding-left: 20px;
                        padding-top: 20px;
                    }
                }

            }

            .right-box {
                
                margin-left: 96px;

                .title {
                    font-family: "PingFang SC",sans-serif;
                    font-weight: 700;
                    font-size: 26px;
                    line-height: 30px;
                    color: #000;
                }

                .text {
                    font-family: "PingFang SC",sans-serif;
                    margin-top:10px;
                    font-weight: 500;
                    font-size: 18px;
                    color: #777777;
                    line-height: 40px;
                }
                img{
                    width: 319px;
                    height: 319px;
                }
            }

        }
    }

    .amaps {
        height: 808px;
        margin-bottom: 30px;
    }

    .amap {
        margin-bottom: 114px;
    }

    .blue-btn {
        width: 213px;
        height: 50px;
        color: #fff;
        background-color: #3CBAFD;
        line-height: 50px;
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
</style>