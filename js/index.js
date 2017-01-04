$(function () {
    $('.nav_trigger').on('click', function (e) {
        e.preventDefault();
        $('.container').addClass('nav_active');

        $('.musicclose').hide();
        $('.nav_trigger').hide();



        $('.back,.backbottom').on('click', function (e) {

            e.stopPropagation();
            $('.container').removeClass('nav_active')
            $('.musicclose').show();
            $('.nav_trigger').show();
        })



    });
})
document.body.style.height = view().h + 'px';
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
window.onload = function () {
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);

}

$('.nav_list img').on('click', function (e) {
    $('.style-1').addClass('clickimg');

    $('.back').hide();
    $('.content').on('click', function () {
        $('.style-1').removeClass('clickimg');
        $('.back').show();
    })
    var id = $(this).attr('id');

    $('#contentimg').attr("src", getImgUrl(id));

    function getImgUrl(name) {
        var result = null;
        switch (name) {
            case "img1":
                result = "img/12011.png";
                break;
            case "img2":
                result = "img/12021.png";
                break;
            case "img3":
                result = "img/12031.png";
                break;
            case "img4":
                result = "img/12041.png";
                break;
            case "img5":
                result = "img/12051.png";
                break;
            case "img6":
                result = "img/12061.png";
                break;
            case "img7":
                result = "img/12071.png";
                break;
            case "img8":
                result = "img/12081.png";
                break;
            case "img9":
                result = "img/12091.png";
                break;
            case "img10":
                result = "img/12101.png";
                break;
            case "img11":
                result = "img/12111.png";
                break;
            case "img12":
                result = "img/12121.png";
                break;
            default:
                break;
        }
        return result;
    }
})

function show3Dimg(Dname) {

    $(".up").css("z-index",198);

    $('.nav_trigger').hide();
    $('.musicclose').hide();

        $('.content3D').fadeIn();

        $('.style-1').addClass('click3Dimg');

        /*close */
        $('.content3D').on('click', function () {
            $('.nav_trigger').show();
            $('.musicclose').show();
            $(".up").css("z-index",999);

            $('.style-1').removeClass('click3Dimg');
        })

    $('#content3Dimg').attr("src", get3DImgUrl(Dname));


        function get3DImgUrl(Dname) {
            var result = null;
            switch (Dname) {
                case "img1":
                    result = "img/12011.png";
                    neoneClick('navbtn1');
                    break;
                case "img2":
                    result = "img/12021.png";
                    neoneClick('navbtn2');
                    break;
                case "img3":
                    result = "img/12031.png";
                    neoneClick('navbtn3');
                    break;
                case "img4":
                    result = "img/12041.png";
                    neoneClick('navbtn4');
                    break;
                case "img5":
                    result = "img/12051.png";
                    neoneClick('navbtn5');
                    break;
                case "img6":
                    result = "img/12061.png";
                    neoneClick('navbtn6');
                    break;
                case "img7":
                    result = "img/12071.png";
                    neoneClick('navbtn7');
                    break;
                case "img8":
                    result = "img/12081.png";
                    neoneClick('navbtn8');
                    break;
                case "img9":
                    result = "img/12091.png";
                    neoneClick('navbtn9');
                    break;
                case "img10":
                    result = "img/12101.png";
                    neoneClick('navbtn10');
                    break;
                case "img11":
                    result = "img/12111.png";
                    neoneClick('navbtn11');
                    break;
                case "img12":
                    result = "img/12121.png";
                    neoneClick('navbtn12');
                    break;
                default:
                    break;
            }

            return result;

        }




}
/*分享*/
$('.up').on('click', function (e) {
    e.preventDefault();
    //微信分享
    neoneClick('btn_sky');

})
$('#downbtn').on('click',function(){
    //其他分享
    neoneClick('btn_sky_down');
})
/*音乐控制*/
$(".musicclose").click(function () {
    if ($(".musicclose img").attr("src") == "img/musicoff.png") {
        $(".musicclose img").attr("src", "img/musicon.png");
    }
    else {
        $(".musicclose img").attr("src", "img/musicoff.png");
    }

});

/*统计监测*/
$('#img1').on('click', function () {
    neoneClick('navigation1');
});
$('#img2').on('click', function () {
    neoneClick('navigation2');
});
$('#img3').on('click', function () {
    neoneClick('navigation3');
})
$('#img4').on('click', function () {
    neoneClick('navigation4');
})
$('#img5').on('click', function () {
    neoneClick('navigation5');
})
$('#img6').on('click', function () {
    neoneClick('navigation6');
})
$('#img7').on('click', function () {
    neoneClick('navigation7');
})
$('#img8').on('click', function () {
    neoneClick('navigation8');
})
$('#img9').on('click', function () {
    neoneClick('navigation9');
})
$('#img10').on('click', function () {
    neoneClick('navigation10');
})
$('#img11').on('click', function () {
    neoneClick('navigation11');
})
$('#img12').on('click', function () {
    neoneClick('navigation12');
})


