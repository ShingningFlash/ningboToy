<script setup lang="ts">
    const route: any = useRouter()
    const props: any = defineProps({
        nav: Object,
        config: Object
    })

    let show = ref(false)
    let keywords = ref()
    const goRout = ((url: any) => {
        route.push({
            path: url
        })
        show.value = !show.value
    })
    const search = (() => {

        console.log(route);
        if (route.currentRoute._rawValue.path == '/productCenter') {
            

            route.replace({
                path: '/productCenter',
                query: {
                    name: keywords.value
                }
            })
        } else {
            route.push({
                path: '/productCenter',
                query: {
                    name: keywords.value
                }
            })
        }


    })
    const goindex = (()=>{
        route.push({
                path: '/'
            })
    })
    const backs = ((url:any)=>{
        
        if (route.currentRoute._rawValue.path == '/productCenter') {
            
            route.replace({
                path: url,
                query: {
                    detail: new Date()
                }
            })
            
        }
        else{
            route.replace({
                path: url
            })
        }
    })

   
</script>

<template>
    <div>
        <div class="hidden xl:block" id="heads">
            <div class="sky flex justify-between px-6 items-center h-20 xl:h-60 xl:justify-center">
                <div class=" flex">
                   <!-- <img src="/logos.png" alt="" @click="goindex"
                        style="width:15vw;position: absolute;left: 0vw;top:1vh;transform: scale(0.8);cursor: pointer;"> -->
                    <img :src="props.config.bg" class="max-w-4/5 xl:max-w-full" style="height: 95px;">
                </div>
                <img src="/svg1.svg" class="visible xl:invisible w-8" alt="">
            </div>
        </div>
        <div class="block xl:hidden">
            <div class="h-20"></div>
            <div class="sky flex justify-between px-6 items-center h-20 xl:h-60 xl:justify-center"
                style="position: fixed; z-index: 999;top:0">
                <!-- <div class="sky"> -->
                <!-- <div class="clouds_one"></div> -->
                <!-- </div> -->
                <img src="/logos.png" alt="" style="width:13vw;">
                <img :src="props.config.bg" class="w-4/5 xl:max-w-full" style="position: relative;z-index: 1;">
                <img src="/svg1.svg" class="visible xl:invisible w-8" @click="show = !show" alt="">
            </div>
            <div class="pop" v-if="show">
                <div class="clouds_one"></div>
                <div class="navmo flex flex-col" style="">
                    <div class="a" v-for="(item,index) in props.nav.header" :to="item.url" :key="index"
                        @click="goRout(item.url)">{{ item.name }}</div>

                </div>
            </div>
        </div>
        <div class="nav  flex justify-center items-center hidden  xl:flex h-16">
            <div class="nav-box w-9/12 flex justify-between items-center">
                <div class="flex">
                    <nuxt-link  class="nav-item w-32 h-16 flex items-center justify-center" style="height: 60px;"
                        v-for="(item,index) in props.nav.header" :to="item.url"  @click="backs(item.url)" :key="index">{{ item.name }}</nuxt-link>
                </div>
                <div class="w-64 h-10 rounded-full bg-white search flex items-center  px-5 justify-between">
                    <input type="text" placeholder="Keyword" v-model="keywords">
                    <img src="/search.png" class="w-4" alt="" @click="search">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    



    @-webkit-keyframes cloud_one {
        0% {
            left: 0
        }

        100% {
            left: -200%
        }
    }

    @-moz-keyframes cloud_one {
        0% {
            left: 0
        }

        100% {
            left: -200%
        }
    }

    @keyframes cloud_one {
        0% {
            left: 0
        }

        100% {
            left: -200%
        }
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

    .sky {
        /* height: 100%; */
       /* background: #ABD7FF; */
	    background: #fff;
        position: relative;
        overflow: hidden;
        /* background: url('/image1.png') no-repeat center/cover; */
    }

    .pop {
        height: 100vh;
        position: fixed;
        width: 100%;
        z-index: 999;
        background: #ABD7FF;
        /* position: relative; */
        overflow: hidden;
        -webkit-animation: sky_background 50s ease-out infinite;
        -moz-animation: sky_background 50s ease-out infinite;
        -o-animation: sky_background 50s ease-out infinite;
        animation: sky_background 50s ease-out infinite;
        -webkit-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);

    }

    .pop .navmo {
        padding: 0 30px;
        box-sizing: border-box;
    }

    .pop .navmo .a {
        margin-top: 10px;
        color: #fff;
    }

    /* .header {

        background: url('/image1.png') no-repeat center/cover;
    } */

    .nav {
        background-color: #A7D6CC;
    }

    .nav .nav-item {

        color: #fff;
        font-family: "PingFang SC";
        font-weight: 700;
        font-size: 18px;
        line-height: 25px;
        text-align: left;
        color: #fff;
    }

    .nav .nav-item:hover {
        background-color: #128366;
    }

    .search input {
        border: none;
        outline: none;
        font-family: "PingFang SC";
        font-weight: 700;
        font-size: 14px;
        line-height: 25px;
        text-align: left;
        color: #a2a2a2;
    }

    .search img {
        cursor: pointer;
    }

    .router-link-exact-active {
        background: #128366;
    }


    .router-link-active {
        text-decoration: none;

    }

    /* .nuxt-link-active {
        text-decoration: none;
        color: #0D7111;
      }

      .nav {
        // padding: 0 20px;
        box-sizing: border-box;
        //   width: 142px;
        //   height: 80px;
        line-height: 80px;
        text-align: left;
        color: #fff;
        text-decoration: none;

        &:hover {
          //   color: #E77916;
        }
      }

      .nuxt-link-exact-active {
        background: #E77916;
      } */


      @media (min-width:1517px) {
        #heads{
            width: 100%;
            height: 231px;
        }
        .nav{
            height: 60px;
        }
        .nav-box{
            width:1517px;
            margin: 0 auto;
        }
        .sky{
            width: 100%;
            height: 100%;
        }
    }
</style>