pc.script.createLoadingScreen(function (app) {
    var description = '9020mAh 蓝海电池｜165Hz 电竞屏';
    var logoSrc = 'https://zhanstatic.vivo.com.cn/wukong-zhan/img/8d4aa3f6-4caa-416b-beb1-0b2b112d8f19nwebp.png';
    
    var isPC = function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    };
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.classList.add('loading-parent') ;
        wrapper.innerHTML = '<div class="loading-wrap"><div class="logo"></div><div class="des"></div><div class="loadingp-wrap"><div class="loading-progress"><canvas id="loading-3d-canvas" width="180" height="180" ></canvas><img src="https://zhanstatic.vivo.com.cn/wukong-zhan/img/52651eb2-499c-4100-82ef-14bdccce977e.gif" class="loading-model"/></div><div class="loading-tip">1%</div></div></div>';
        document.body.appendChild(wrapper);
        wrapper.style.display = 'none';
        //fake loading
        fakeLoading();
        
         var logoImgWrap = document.querySelector('.loading-wrap .logo');
        document.querySelector('.loading-wrap .des').innerHTML = description;
        var logo = document.createElement('img');    
        logo.src = logoSrc;
        logoImgWrap.appendChild(logo);
        if(!!document.querySelector('.loading-parent'))document.querySelector('.loading-parent').style.display = 'block';
        document.querySelector('#application-canvas').style.opacity = 1;
        document.querySelector('#application-canvas').style.visibility = 'unset';
    };
    var fakeLoading = function(){
        var speed= 0;
        var drawFrame =function (){
            var requestAnimationFrameID = window.requestAnimationFrame(drawFrame);
            var canvas = document.getElementById('loading-3d-canvas');  //获取canvas元素
            // if(!!canvas) return;
            var context = !!canvas&&canvas.getContext('2d');
            if(context){
                context.clearRect(0, 0, canvas.width, canvas.height);
                drawProgressBar(speed);
            }
            if(speed >= 60) window.cancelAnimationFrame(requestAnimationFrameID);
            speed += 2;
        };
        drawFrame();
    };
    var hideSplash = function () {
        drawProgressBar(100);
        if(!isPC()){
            document.querySelector('#application-canvas').width = document.body.offsetWidth*window.devicePixelRatio;
            document.querySelector('#application-canvas').height = document.body.offsetHeight*window.devicePixelRatio;
        }
        setTimeout(function(){
            var splash = document.getElementsByClassName('loading-parent')[0];
            splash.parentElement.removeChild(splash);
            window.parent&&window.parent.postMessage({msg:'loaded'},'*');
        });
            
    };

    var setProgress = function (value) {
        if(value<.6)return;
        drawProgressBar(value * 100);
    };
    
    var drawProgressBar = function(n){
        var canvas = document.getElementById('loading-3d-canvas');  //获取canvas元素
            canvas.width = 144;
            canvas.height = 144;
        var context = canvas.getContext('2d'),  //获取画图环境，指明为2d
            centerX = canvas.width/2,   //Canvas中心点x轴坐标
            centerY = canvas.height/2,  //Canvas中心点y轴坐标
            rad = Math.PI*2/100, //将360度分成100份，那么每一份就是rad度
            lineWidth = 3;
            document.querySelector('.loading-tip').innerHTML = Math.floor(n)+'%';
            
        //绘制x像素宽的运动外圈
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.save();
            context.strokeStyle = "#000"; //设置描边样式
            context.lineWidth = lineWidth; //设置线宽
            context.beginPath(); //路径开始
            context.arc(centerX, centerY, canvas.width/2-lineWidth , -Math.PI/2, -Math.PI/2 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            context.stroke(); //绘制
            context.closePath(); //路径结束
            context.restore();
    };

    var createCss = function () {
        var css = [
            '.loading-parent{position:absolute;top:0;left:0;height:100%;width:100%;background:#fff;font-family: VIVO-FONT-WEB-BOLD,VIVO-FONT-NAV-BOLD,sans-serif;}',
            '.loading-parent .loading-wrap{width:100%;height:auto;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);position:relative;text-align:center;font-size:0}',
            '.loading-parent .loading-wrap .logo{display:inline-block;margin-bottom:9px;}',
            '.loading-parent .loading-wrap .logo img{height:29px;}',
            '.loading-parent .loading-wrap .des{height:20px;font-size:16px;line-height:20px;letter-spacing:0px;color:#242933;margin-bottom:20px}',
            '.loading-parent .loading-wrap .loadingp-wrap{width:60px;display:inline-block}',
            '.loading-parent .loading-wrap .loadingp-wrap .loading-progress{width:100%;position: relative;}',
            '.loading-parent .loading-wrap .loadingp-wrap .loading-progress #loading-3d-canvas{-webkit-transform:rotate(-180deg);-ms-transform:rotate(-180deg);transform:rotate(-180deg);width:60px;height:60px}',
            '.loading-parent .loading-wrap .loadingp-wrap .loading-progress .loading-model{position:absolute;width:32px;top:50%;left:50%;transform:translate(-50%,-50%)}',
            '.loading-parent .loading-wrap .loadingp-wrap .loading-tip{height:14px;font-size:12px;letter-spacing:0px;color:#242933;margin-top:10px;}',
            '@media screen and (max-width:768px){.loading-parent{width:100%;height:100%}',
            '.loading-parent .loading-wrap .logo{height:31px}',
            '.loading-parent .loading-wrap .des{height:16px;font-size:14px;letter-spacing:0px;margin-bottom:16px}',
            '.loading-parent .loading-wrap .loadingp-wrap{width:48px}',
            '.loading-parent .loading-wrap .loadingp-wrap .loading-tip{height:11px;font-size:10px;letter-spacing:0px}',
            '.loading-parent .loading-wrap .loadingp-wrap .loading-progress #loading-3d-canvas{width:48px;height:48px}',
            '.loading-parent .loading-wrap .loadingp-wrap .loading-progress .loading-model{width:27px}',
            '};'
        ].join('\n');
        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);
    };

    var showUnsupportTip = function() {
        var unsupportHtml = '<style>.unsupport-tip-wrap{position:absolute;top:0;left:0;height:100%;width:100%;background:#fff}.unsupport-tip-wrap .tip-detail-wrap{position:relative;top:50%;width:100%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);text-align:center}.unsupport-tip-wrap .tip-detail-wrap .logo{display:block;margin:0 auto;width:128px;height:35px;margin-bottom:15px}.unsupport-tip-wrap .tip-detail-wrap .logo img{width:100%}.unsupport-tip-wrap .tip-detail-wrap .tip-text{width:185px;height:32px;font-size:12px;line-height:16px;letter-spacing:0;display:inline-block;color:#575c66}@media screen and (max-width:768px){.unsupport-tip-wrap .tip-detail-wrap .logo{width:113px;height:31px;margin-bottom:14px}.unsupport-tip-wrap .tip-detail-wrap .tip-text{height:32px;font-size:12px;line-height:16px;letter-spacing:0}}</style><div class="unsupport-tip-wrap"><div class="tip-detail-wrap"><div class="logo"><img src="https://zhanstatic.vivo.com.cn/wukong-zhan/img/debcb269-fc5b-4e94-90d1-2749cbee296fnwebp_compress.png"/></div><div class="tip-text">抱歉，当前浏览环境不支持3D体验请升级系统或浏览器版本后重试</div></div></div>';
        var domWrap = document.querySelector('.vivo-container')?document.querySelector('.vivo-container'): document.body;
        document.querySelector('#application-canvas').style.display='none';
        domWrap.innerHTML = unsupportHtml;
    };
    //TODO 平台屏蔽
    var notSupportPlaycanvas = function(){
        var ua = navigator.userAgent.toLowerCase();
        var isIE = !!window.ActiveXObject || 'ActiveXObject' in window || ua.indexOf("edge") > -1;
        var isQQBroswer = (ua.indexOf('mqqbrowser') != -1  || ua.indexOf('qqbrowser') != -1) && ua.indexOf('micromessenger') === -1 && ua.indexOf(" qq")===-1;
        var vivoUnSupport = ua.indexOf('vivo y53') != -1 || ua.indexOf('vivo y23l') != -1;
        var matchAndroid = ua.match(/(A|a)ndroid\s+(\d+(?:\.\d+)?)/)
        var isAndroid5 =  Number(Number(matchAndroid?matchAndroid[2]:0).toFixed(0)) === 5;
        var isUC = /ucbrowser|ucweb/i.test(ua);
        // var isSafrai = /safari/.test(ua) && !/chrome/.test(ua)  ;
        // var isPhone =  ua.indexOf('iphone os') != -1;
        
        // document.querySelector('.j_pluginShareBtn').style.marginLeft = 'unset'
        return isIE || isQQBroswer || vivoUnSupport || isAndroid5&&isUC;
    };
    if(notSupportPlaycanvas()){
        showUnsupportTip();
        app.destroy();
        return ;
    }
    
    createCss();
    showSplash();
    app.on('preload:start', function() {     
       
    });
        
    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});