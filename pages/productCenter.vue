<script lang="ts" setup>
    const route: any = useRouter()
    let productList: any = ref({
        config: {
            image: String
        },
        cat: {
            data: [{
                id: Number,
                name: String
            }],
            cid: Number
        },
        data: {
            data: [{
                img: '',
                name: '',
                price: '',
                sales: '',
                productId: 0
            }]
        }
    }) //商品列表数据
    let current = ref(0) //当前分类
    let cid = ref(0) //cid
    let titleName = ref('') //
    const changeTab = ((id: number, index: number, name: string) => {
        currentPage.value = 1
        current.value = index
        cid.value = id
        titleName.value = name
        detail.value = false
        productList.value = {
            config: {
                image: String
            },
            cat: {
                data: [{
                    id: Number,
                    name: String
                }],
                cid: Number
            },
            data: {
                data: [{
                    img: '',
                    name: '',
                    price: '',
                    sales: '',
                    productId: 0
                }]
            }
        }
        getProdata()
    })
    const currentPage = ref(1)
    const totalPages = ref(1)
    const currentSize = ref(1)
    // 点击
    const onClickHandler = (page: number) => {
        currentPage.value = page
        getProdata()
    };
    const cats = ref({data:[]}
        )
    const detail = ref(false)
    // 获取产品列表数据
    const getProdata = (() => {
        
        let data = {
            size: 12,
            p: currentPage.value,
            cid: cid.value
        }
        // const loadingInstance = ElLoading.service({
        //     fullscreen: true
        // })
        if (cid.value == 0) {
            productsallApi({}).then((res: any) => {
                
                if (res.status == 1) {
                    
                    productList.value = res.row
                    cats.value = productList.value.cat
                    cats.value.unshift({
                        id: '0',
                        name: 'ALL'
                    })
                    productList.value.cat
                    totalPages.value = res.row.data.total
                    currentSize.value = res.row.data.size
                    if(res.row.data.title){
                        titleName.value = res.row.data.title
                    }
                    else{
                        titleName.value = 'ALL'
                    }
                    // loadingInstance.close()
                }
            }).catch((err: any) => {

            })
        } else {
            productsApi(data).then((res: any) => {
                if (res.status == 1) {
                    productList.value = res.row
                    cats.value = productList.value.cat.data
                    cats.value.unshift({
                        id: '0',
                        name: 'ALL'
                    })
                    totalPages.value = res.row.data.total
                    currentSize.value = res.row.data.size
                    if(res.row.data.title){
                        titleName.value = res.row.data.title
                    }
                    else{
                        titleName.value = 'ALL'
                    }
                    
                    // loadingInstance.close()
                }
            }).catch((err: any) => {

            })
        }

    })
    const productId = ref(0)
    // 前往详情
    const goDetail = ((item: any) => {
        
        productId.value = item.productId
        route.replace({
            
            query: {
                Id:item.productId
            }
        })
        document.body.scrollIntoView()
        
        
        
        
        // if(detail.value ==)
        


    })

    const gocon = (() => {
        route.push({
            path: '/contact',
            query: {

            }
        })

    })
    const loading = ref(true)
    const keywords = ref('')
    const search = (() => {
        const loadingInstance = ElLoading.service({
            fullscreen: true
        })
        let formdata = new FormData()
        formdata.append('name', keywords.value)
        productsearchApi(formdata).then((res: any) => {
            loadingInstance.close()
            if (res.row.data != '') {
                const element = document.getElementById("box");
                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                        inline: "nearest"
                    });
                }
                productList.value.data = res.row.data
                productList.cat.data.unshift({
                    id: '00',
                    name: 'ALL'
                })
                totalPages.value = res.row.data.total
                currentSize.value = res.row.data.size
                titleName.value = res.row.data.title


            } else {
                alert('搜索结果为空')
            }
        }).catch((err: any) => {
            console.log(err);
        })
    })




    onMounted(() => {


        nextTick(() => {

            getProdata()
            if (route.currentRoute._rawValue.query.Id) {

                detail.value = true
                productId.value = route.currentRoute._rawValue.query.Id

            } else if (route.currentRoute._rawValue.query.name) {

                keywords.value = route.currentRoute._rawValue.query.name
                search()

            } else if (route.currentRoute._rawValue.query.detail) {
                console.log( detail.value);
                detail.value = false
                console.log( detail.value);
                
            }
        })
    })
</script>

<template>
    <div>
        <div v-if="!detail" style="position: relative;" v-cloak>
            <img :src="productList.config.image" alt="">
            <div class="swiper-float w-11/12 hidden xl:flex" >
                <img style="width:25.47px;margin-right: 17.5px;" src="/cate.svg" alt="">
                <div>PRODUCT CATEGORIES</div>
            </div>
        </div>
        <div v-if="!detail && productList != ''" v-cloak>
            <div class="tab w-11/12 mx-auto flex flex-wrap gap-5 pt-4 xl:pt-20 xl:w-9/12 xl:gap-10">
                <div class="tab-item" :class="current == Number(index) ? 'active' : ''"
                    v-for="(item,index) in cats" :key="index"
                    @click="changeTab(Number(item.id),Number(index),String(item.name))">
                    {{ item.name }}
                </div>
            </div>
            <div class="text-center titleName text-2xl xl:text-4xl">{{ titleName }}</div>
            <div class="blue-heng"></div>
            <div id="box" class="list  flex-wrap w-9/12 mx-auto  hidden xl:grid">
                <div class="list-item " v-for="(item,index) in productList.data.data" :key="index"
                    @click="goDetail(item)">
                    <img :src="item.img" alt="">
                    <div class="text">{{ item.name }}</div>
                </div>
            </div>
            <div class="listmo flex flex-wrap justify-between  gap-2 w-11/12 mx-auto xl:hidden">
                <div class="list_item  " v-for="(silder,index) in productList.data.data" :key="index"
                    @click="goDetail(silder)">
                    <img :src="silder.img">
                    <div class="title text-center">{{ silder.name }}</div>
                </div>
            </div>

            <div class="flex justify-center mb-28 mt-10">
                <VueAwesomePaginate :total-items="totalPages" :items-per-page="currentSize" :max-pages-shown="5"
                    v-model="currentPage" :on-click="onClickHandler" />
            </div>
        </div>
        <div v-else>
            <product-detail :pid="productId" @back-emitted="detail = false" @go-emitted="gocon"></product-detail>
        </div>


        <!-- <pagination :current-page="currentPage" :total-pages="totalPages" @update:current-page="handlePageChange" /> -->
    </div>

</template>
<style>
    [v-cloak] {
        display: none;
    }
</style>
<style>
    .swiper-float {
        width: 1517px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 87px;
        border-radius: 12px 12px 0 0;
        background: #1e92f7;
        opacity: 0.92;
        
        align-items: center;
        padding-left: 71px;
        font-family: "PingFang SC";
        font-weight: 700;
        font-size: 20px;
        line-height: 30px;
        text-align: left;
        color: #fff;
        box-sizing: border-box;

    }



    .pagination-container {
        display: flex;
        column-gap: 10px;
    }

    .paginate-buttons {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        cursor: pointer;
        background-color: rgb(242, 242, 242);
        border: 1px solid rgb(217, 217, 217);
        color: black;
    }

    .paginate-buttons:hover {
        background-color: #d8d8d8;
    }

    .active-page {
        background-color: #3498db;
        border: 1px solid #3498db;
        color: white;
    }

    .active-page:hover {
        background-color: #2988c8;
    }
</style>
<style lang="scss" scoped>
    .titleName {
        font-family: 'PingFang SC Bold', sans-serif;
        // font-weight: 600;
        line-height: 30px;
        color: #000;
        margin-top: 3vw;
    }

    .blue-heng {
        width: 52px;
        height: 6px;
        border-radius: 3px;
        background: #1e91fc;
        margin: 15px auto;
        margin-bottom: 20px;
    }

    .tab {


        &-item {
            color: #000;
            font-size: 16px;
            font-weight: 700;
            transition: all .3s;
            padding-bottom: 5px;
            cursor: pointer;
            font-family: 'PingFang SC', sans-serif;
            // padding: 30px;
        }

        .active {
            color: #1b90fa;
            position: relative;

            // border-bottom: 4px solid #1b90fa;
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                height: 4px;
                width: 100%;
                background-color: #1b90fa;
                left: 0;

            }
        }
    }

    .listmo {
        margin-top: 20px;

        .list_item {
            width: 48%;
            box-shadow: 0 0 20px #00000029;
            background: #fff;

            img {
                width: 100%;
            }

            .title {

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

    .list {
        padding: 50px 0;
        row-gap: 80px;
        column-gap: 30px;
        // display: grid;
        grid-template-columns: repeat(4, 1fr);

        .list-item {
            // width: 22%;
            // height: 439px;
            background: #fff;
            box-shadow: 0 0 20px #00000029;
            list-style: none;
            cursor: pointer;
            overflow: hidden;
            transition: all .6s;
            // margin-top:13px;


            img {
                width: 100%;
                height: 17.2vw;
                // height: 342px;
                // height:60px;
            }

            &:hover {
                transform: scale(1.1);
            }

            .text {
                text-align: center;
                font-weight: 700;
                font-size: 15px;
                color: #000;
                padding: 0px 40px;
                padding-top: 12px;
                padding-bottom: 30px;
                font-family: 'PingFang SC', sans-serif;
            }
        }
    }
</style>