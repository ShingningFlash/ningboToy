import Http from '@/utils/request'
//  网站公共参数
export const publicApi = (params: any) => {
    return Http.post('/api/public', params)
}
// 后台图片上传接口
export const upimgApi = (params: any) => {
    return Http.post('/admin/Ueditor/imageUp/pictitle/thumb/dir/product', params)
}

// 首页
export const indexApi = (params: any) => {
    return Http.post('/api/index', params)
}

// 关于我们
export const aboutApi = (params: any) => {
    return Http.post('/api/about', params)
}
// 产品列表
export const productsApi = (params: any) => {
    return Http.post('/api/products', params)
}
// 全部产品列表
export const productsallApi = (params: any) => {
    return Http.post('/api/products/all', params)
}
// 产品搜索
export const productsearchApi = (body: any) => {
    return Http.posts('/api/products/search', body)
}
// 产品详情
export const productdetailApi = (params: any) => {
    return Http.post('/api/products/detail', params)
}
// 留言提交接口
export const indexMessageApi = (body: any) => {
    return Http.posts('/api/message/push1', body)
}
// 留言提交接口
export const messageApi = (body: any) => {
    return Http.posts('/api/message/push', body)
}

// 联系我们
export const contactApi = (params: any) => {
    return Http.post('/api/contact', params)
}

