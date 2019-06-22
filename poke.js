$(function () {
    let poke=[];
    let colorArr=['s','d','h','c'];
    let flag={};
    for(let i=0;i<52;i++){
        let index=Math.floor(Math.random()*colorArr.length);
        let color=colorArr[index];
        let num=Math.round(Math.random()*12+1);
        while (flag[num+'_'+color]) {
            let index=Math.floor(Math.random()*colorArr.length);
            color=colorArr[index];
            num=Math.round(Math.random()*12+1);
        }
        poke.push({num,color});
        flag[num+'_'+color]=true;
    }

    let index=-1;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            index++;
            let obj=poke[index];
            let tops=50*i-1,lefts=350-50*i+100*j;
            $('<div>').addClass('poke top').attr('id',i+"_"+j)
                .css({backgroundImage:`url(./imgs/${obj.num}${obj.color}.jpg`})
                .html('').appendTo('.box').delay(index*100)
                .data('num',obj.num)
                .animate({left:lefts,top:tops,opacity:1})
        }
    }
    let index2=index+1;
    console.log(index2);
    for(;index<52;index++){
        // console.log(index);
        let obj=poke[index];
        $('<div>').addClass('poke left')
            .css({backgroundImage:`url(./imgs/${obj.num}${obj.color}.jpg`})
            .html('').appendTo('.box')
            .data("num",obj.num)
            .animate({left:0,top:"480px",opacity:1}).attr('id',-2+'_'+-2);
    }
    let pokes=$('.poke');
    let first=null;
    // console.log(pokes);
    pokes.on('click',function () {
        let _this=$(this);
        let str=this.id.split("_");
        let str0=parseInt(str[0]);
        let str1=parseInt(str[1]);
        let id1= (str0+1)+"_"+(str1);
        let id2= (str0+1)+"_"+(str1+1);
        if($('#'+id1).length || $('#'+id2).length){
            return;
        }
        if (_this.hasClass('active')) {
            _this.removeClass('active').animate({top:`+=30px`});
        }else{
            _this.addClass('active').animate({top:`-=30px`});
        }
        if (!first){
            first=_this;
        }else {
            if(first.data('num')+_this.data('num')===14){
                $(".active").animate({top:0,left:0,opacity:0},50,function () {
                    $('.active').remove();
                })
            }else{
                $('.active').removeClass('active').animate({top:`+=30px`});
            }
            first=null;
        }
        index2=$('.top').length;
        console.log(index2);
    })

    $('.button').on('click',function () {
        console.log(1);
        if ($('.left').hasClass('open')) {
            $('.left').animate({left:0}).removeClass('open');
        }else {
            $('.left').animate({},function () {
                console.log($(this));
                let index1=$(this).index();
                console.log(index1);
                $(this).animate({left:28*(index1-index2)}).addClass('open');
            });
        }
    })
})