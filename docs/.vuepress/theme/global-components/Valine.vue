<template>
    <div class="valine-body">
        <div class="footer">
            <span :id="url" class="leancloud_visitors" data-flag-title="Your Article Title">
                <em class="post-meta-item-text">阅读量 </em>
                <i class="leancloud-visitors-count"></i>
            </span>
            <div class="last-updated">
                <span class="prefix">上次更新：</span>
                <span class="time">{{$page.lastUpdated}}</span>
            </div>
        </div>
        <div id="valine-vuepress-comment"></div>
    </div>
</template>

<script>
    export default {
        name: 'Valine',
        data() {
            return {
                url: '',
                lastModifiedTime: '',
                isRouterAlive: true
            }
        },
        mounted() {
            let urls = window.location.pathname.split("/");
            this.url = '/' + urls[1] + '/' + urls[2];
            this.lastModifiedTime = document.lastModified;
            console.log(this.url);
            import('valine').then(Valine => {
                new Valine.default({
                    el: '#valine-vuepress-comment',
                    appId: "eytWDTcVXxD6jB2TPPIFVljq-gzGzoHsz",
                    appKey: 'sJRhu6ftXLC0eNR4vsjo3Euy',
                    placeholder: '在此处输入评论：',
                    visitor: true,
                    // 设置Bilibili表情包地址
                    emojiCDN: '//i0.hdslb.com/bfs/emote/',
                    // 表情title和图片映射
                    emojiMaps: {
                        "热词系列-知识增加": "142409b595982b8210b2958f3d340f3b47942645.png@112w_112h.webp",
                        "热词系列-好家伙": "63ec80dea3066bd9f449ba999ba531fa61f7b4eb.png@112w_112h.webp",
                        "热词系列-芜湖起飞": "78d04c6ce78a613c90d510cd45fe7e25c57ba00b.png@112w_112h.webp",
                        "热词系列-爷青回": "a26189ff1e681bddef7f6533f9aabe7604731a3e.png@112w_112h.webp",
                        "热词系列-梦幻联动": "4809416be5ca787c2ec3e897e4fd022a58da6e0e.png@112w_112h.webp",
                        "热词系列-泪目": "bba3703ab90b7d16fe9dbcb85ed949db687f8331.png@112w_112h.webp",
                        "热词系列-保护": "55f8f6445ca7c3170cdfc5b16036abf639ce9b57.png@112w_112h.webp",
                        "热词系列-害怕": "d77e2de26da143249f0c0ad7a608c27152c985bf.png@112w_112h.webp",
                        "热词系列-爱了爱了": "2a165b555ba20391316366c664ed7891883dc5aa.png@112w_112h.webp",
                        "热词系列-吹爆": "b528220f9c37256ed6a37f05bf118e44b08b81e5.png@112w_112h.webp",
                        "热词系列-三连": "21f15fe11b7a84d2f2121c16dec50a4e4556f865.png@112w_112h.webp",
                        "热词系列-可以": "e08543c71202b36c590094417fcfbb80c3506cd8.png@112w_112h.webp",
                        "热词系列-希望没事": "6c0d2e6c486d1ba5afd6204a96e102652464a01d.png@112w_112h.webp",
                        "热词系列-打卡": "a9cf77c78e1b9b40aa3ed4862402fba008ee2f51.png@112w_112h.webp",
                        "热词系列-skr": "bd285ff94db16ad52557c3effe930d64663e8375.png@112w_112h.webp",
                        "热词系列-battle": "f2f81c8e47db6252becd633a5d1ee14e15df2ea8.png@112w_112h.webp",
                        "热词系列-DNA": "f6eb74f8230588f61a298af89061a7d75c5762e5.png@112w_112h.webp",
                        "热词系列-妙啊": "0e98299d7decf5eaffad854977946075c3e91cb8.png@112w_112h.webp",
                        "热词系列-这次一定": "a01ca28923daa7cc896c42f27deb4914e20dd572.png@112w_112h.webp",
                        "热词系列-AWSL": "c37f88cf799f9badf9d84b7671dc3dd98c0fc0c2.png@112w_112h.webp",
                        "热词系列-递话筒": "98e6950e39fbb4dd1c576042063ca632074070ba.png@112w_112h.webp",
                        "热词系列-你细品": "535e00658e7e47966f154d3a167fa2365ebc4321.png@112w_112h.webp",
                        "热词系列-咕咕": "d8065c2e7ce48c929317a94553499a46fecc262a.png@112w_112h.webp",
                        "热词系列-标准结局": "3de98174b510cf7dc5fd1bd08c5d881065e79137.png@112w_112h.webp",
                        "热词系列-危": "5cc6c3357c4df544dd8de9d5c5c0cec97c7c9a56.png@112w_112h.webp",
                        "热词系列-张三": "255a938f39cea625032b6650036b31aa26c50a3c.png@112w_112h.webp",
                        "热词系列-害": "cbe798a194612958537c5282fcca7c3bcd2aa15c.png@112w_112h.webp",
                        "热词系列-我裂开了": "29bd57ec4e8952880fea6c9e47aee924e91f10c4.png@112w_112h.webp",
                        "热词系列-有内味了": "7ca61680a905b5b6e2e335c630e725b648b03b4d.png@112w_112h.webp",
                        "热词系列-猛男必看": "c97064450528a0e45c7e7c365a15fbb13fd61d8c.png@112w_112h.webp",
                        "热词系列-奥力给": "c9b8683827ec6c00fea5327c9bec14f581cef2aa.png@112w_112h.webp",
                        "热词系列-问号": "c1d1e76c12180adc8558f47006fe0e7ded4154bb.png@112w_112h.webp",
                        "热词系列-我哭了": "9e0b3877d649aaf6538fbdd3f937e240a9d808e4.png@112w_112h.webp",
                        "热词系列-高产": "9db817cba4a7f4a42398f3b2ec7c0a8e0c247c42.png@112w_112h.webp",
                        "热词系列-我酸了": "a8cbf3f6b8cd9377eeb15b9172f3cd683b2e4650.png@112w_112h.webp",
                        "热词系列-真香": "e68497c775feaac1c3b1a6cd63a50cfb11b767c4.png@112w_112h.webp",
                        "热词系列-我全都要": "d424d1ad8d14c1c9b8367842bc68c658b9229bc1.png@112w_112h.webp",
                        "热词系列-神仙UP": "a49e0d0db1e7d35a0f7411be13208951ab448f03.png@112w_112h.webp",
                        "热词系列-你币有了": "84820c2b147a8ca02f3c4006b63f76c6313cbfa0.png@112w_112h.webp",
                        "热词系列-不愧是你": "9ff2e356797c57ee3b1675ade0883d2d2247be9b.png@112w_112h.webp",
                        "热词系列-锤": "35668cc12ae25b9545420e4a85bf21a0bfc03e5d.png@112w_112h.webp",
                        "热词系列-秀": "50782fbf5d9b7f48f9467b5c53932981e321eedc.png@112w_112h.webp",
                        "热词系列-爷关更": "faad40c56447f1f8abcb4045c17ce159d113d1fd.png@112w_112h.webp",
                        "热词系列-有生之年": "f41fdafe2d0fbb8e8bc1598d2cf37e355560103a.png@112w_112h.webp",
                        "热词系列-镇站之宝": "24e7a6a6e6383c987215fb905e3ee070aca259b5.png@112w_112h.webp",
                        "热词系列-我太南了": "a523f3e4c63e4db1232365765d0ec452f83be97e.png@112w_112h.webp",
                        "热词系列-完结撒花": "ea9db62ff5bca8e069cd70c4233353a802835422.png@112w_112h.webp",
                        "热词系列-大师球": "f30089248dd137c568edabcb07cf67e0f6e98cf3.png@112w_112h.webp",
                        "热词系列-知识盲区": "ccc94600b321a28116081e49ecedaa4ee8728312.png@112w_112h.webp",
                        "热词系列-“狼火”": "33ccd3617bfa89e9d1498b13b7542b63f163e5de.png@112w_112h.webp",
                        "热词系列-你可真星": "54c8ddff400abfe388060cabfbb579280fdea1be.png@112w_112h.webp",
                    }
                })
            })
            // import('../styles/valineStyle.scss')
        }
    }
</script>

<style lang="scss" scoped>
    .valine-body {
        margin-top: 80px;

        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 50px;

            .last-updated {

                .prefix {
                    color: #4e6e8e;
                }

                .time {
                    color: #767676;
                    font-weight: 400;
                }
            }
        }
    }
</style>