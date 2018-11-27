// 记得要加window.onload啊, 不然Html中显示不了值！！！
// window.onload = function() {
    var vm = new Vue({
        el: '#app',
        delimiters: ['<%', '%>'], // 修改vue模板符号，防止与django冲突
        data: {
            host: host,
            article_detail: [],  // 文章详情数据
            lastest_article: [], // 最新的文章数据
        },
        // 页面一加载时, 执行下面的请求, 获取数据
        mounted: function () {
            this.get_article_detail();
            this.get_lastest_article();
        },
        methods: {
            // 请求文章详情的数据,带上该文章的id值
            get_article_detail: function () {
                // document.location.search直接获取http://127.0.0.1?article=9后面的整个?article=9
                axios.get(this.host + '/articles/' + document.location.search, {
                    responseType: 'json'
                })
                    .then(response => {
                        this.article_detail = response.data;
                    })
                    .catch(error => {
                        console.log(error.response.data);
                    })
            },
            // 请求最新的前3篇文章数据
            get_lastest_article: function () {
                axios.get(this.host + '/lastest/', {
                    responseType: 'json',
		            'Access-Control-Allow-Credentials':true,
        	        'Access-Control-Allow-Origin':true
                })
                    .then(response => {
                        this.lastest_article = response.data
                    })
                    .catch(error => {
                        console.log(error.response.data);
                    })
            },
        }
    });
// }


