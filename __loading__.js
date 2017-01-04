pc.script.createLoadingScreen(function (app) {




    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = ASSET_PREFIX + 'img/1.png';
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('bartext');
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            bar.innerHTML = '买家卖家合力无限大' ;
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #283538;',
            '}',

            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background:-moz-linear-gradient(top,#34004a,#00002e);/*火狐*/;',
            '    background: -webkit-linear-gradient(top, #34004a, #00002e);   /*Safari5.1 Chrome 10+*/;',
            '    background:-moz-linear-gradient(top,#34004a,#00002e);/*火狐*/;',
            '    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#34004a), to(#00002e));',
            '    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#34004a), to(#00002e));      /* Safari 4-5, Chrome 1-9*/;',
          /*  '    background-color: #fff;',*/
            '}',

            '#application-splash {',
            '    position: absolute;',
            '    top: calc(50% - 250px);',
            '    width: 264px;',
            '    left: calc(50% - 132px);',
            '}',


            '#application-splash img {',
            '    width: 100%;',
            '}',

            /*'#progress-bar-container {',
             '    margin: 20px auto 0 auto;',
             '    height: 2px;',
             '    width: 100%;',
             '    background-color: #1d292c;',
             '}',*/

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',

            '}',

            '#progress-bar{',
            'position: absolute;',
            'top: calc(50%  + 250px);',
            'width: 160px;',
            'left: calc(50% - 80px)',
            '}',

            '#bartext{',
            'position: relative;',
            'color:#fff;',
            'width: 154px;',
            'margin:0 auto;',
            'top:25px;',
            'font-size:15px;',
            'font-family:\'Heiti SC\';',
            'font-weight: bolder;',
            'text-align:center;',
            '}',

            '#bartext2{',
            'position: relative;',
            'color:#fff;',
            'width: 134px;',
            'margin:0 auto;',
            'top:25px;',
            'font-size:17px;',
            'font-family:\'Heiti SC\';',
            'font-weight: bolder;',
            'text-align:center;',
            'display:none;',
            '}',
            '#progress-bar img {',
            '    width: 100%;',
            '}',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 80px;',
            '        left: calc(50% - 40px);',
            '        top: calc(50% - 100px);',
            '    }',
            '    #progress-bar{',
            '        position: absolute;',
            '        top: calc(50%  + 44px);',
            '        width: 154px;',
            '        left: calc(50% - 77px)',
            '    }',
            '}',
            '@media (max-height: 567px) {',
            '    #application-splash {',
            '        width: 140px;',
            '        left: calc(50% - 70px);',
            '        top: calc(50% - 170px);',
            '    }',
            '}'

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


    createCss();

    showSplash();

    app.on('preload:end', function () {


    });

    app.on('start', hideSplash);

});