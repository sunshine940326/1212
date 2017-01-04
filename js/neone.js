var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?b963868504d0df21861aa5e85376f0a6";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
var host = window.location.host;
neoneClick(host);

function neoneView(id)
{
    if (_hmt)
    {
        _hmt.push(['_trackEvent', 'View' , 'view_'+id]);
    }
}

function neoneClick(eventId)
{
    if (_hmt)
    {
        _hmt.push(['_trackEvent', 'onClick' , 'onclick_'+eventId]);
    }
}

//分享
(function() {
    window.share = {
        imgUrl : window.location.origin + "/images/share.jpg",
        link : 'http://t.cn/RfOA00e',
        title : "亲亲节标题",
        desc : "亲亲节分享内容",
        suc : function(){
            window.location.href=window.location.origin;
        },
    };

    if (IsPC())
    {
        window.location.href = "./pc.html";
    }
    else
    {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {

            var shareUrl = encodeURIComponent(window.location.href);

            var script = document.createElement("script");
            script.type = "text/javascript";
            var host = window.location.host;

            if (host == 'www.qinqinevent.com' || host == 'www.h5qinqin.com' || host == 'www.qinqinh5.com' || host == 'qinqinh5.com')
            {
                script.src = "http://wechat.test.neone.com.cn/partner-api/getshare/2/?jsoncallback=callback&shareurl=" + shareUrl;
            }
            else
            {
                script.src = "http://wechat.test.neone.com.cn/partner-api/getshare/1/?jsoncallback=callback&shareurl=" + shareUrl;
            }
            document.getElementsByTagName('head')[0].appendChild(script);
        } else {
        }
    }
})();


function IsPC(){
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

function weiboShare()
{
    (function(s,d,e)
    {
        try{}
        catch(e){}
        var f='http://v.t.sina.com.cn/share/share.php?',p=['url=',e(window.sharedata.link),'&title=',e(window.sharedata.title),'&appkey=2206048557','&pic=',e(window.sharedata.imgUrl)].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})(screen,document,encodeURIComponent);

}

function callback(data)
{
    wx.config({
        debug: false,
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
        ]
    });

    wx.ready(function () {
        wxcheck();
        function wxcheck(){
            wx.checkJsApi({
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ],
                success: function (res) {
                    //alert(JSON.stringify(res));
                }
            });
        }

        wx.onMenuShareTimeline({
            imgUrl : window.share.imgUrl,
            link : window.share.link,
            title : window.share.title,
            desc : window.share.des,
            success: function () {
                neoneClick('wechatShareTimeLine');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareAppMessage({
            imgUrl : window.share.imgUrl,
            link : window.share.link,
            title : window.share.title,
            desc : window.share.desc,
            trigger: function (res) {
                //	alert('用户点击分享到朋友圈');
            },
            success: function (res) {
                neoneClick('otherShare');
            },
            cancel: function (res) {
                //	alert('已取消');
            },
            fail: function (res) {
                //	alert(JSON.stringify(res));
            }
        });

    });
}
