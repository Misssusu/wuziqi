$(function(){
  var canvasS=600;
  var row=15;
  var blockS=canvasS/row;
  var starradius=5;
  var all={}
  var step=0
  var flag=true
  var ctx=$('#canvas').get(0).getContext('2d');
  $('#canvas').get(0).width = canvasS;
  $('#canvas').get(0).height = canvasS;
  var draw=function(){
    var jiange=blockS/2+0.5;
    var linewidth=canvasS-blockS;
    ctx.save();
    ctx.translate(jiange,jiange);
    ctx.beginPath();
    for(var i=0;i<row;i++){
      ctx.moveTo(0,0);
      ctx.lineTo(linewidth,0);
      ctx.translate(0,blockS);
    }

    ctx.strokeStyle='white'
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    ctx.save();
    ctx.translate(jiange,jiange);
    ctx.beginPath();
    for(var i=0;i<row;i++){
      ctx.moveTo(0,0);
      ctx.lineTo(0,linewidth);
      ctx.translate(blockS,0);
    }
    ctx.strokeStyle='white'
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    var points=[3.5*blockS,11.5*blockS]
    for(var i=0;i<2;i++){
      var x=points[i]
      for(var j=0;j<2;j++){
        var y=points[j]
        ctx.save();
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.arc(x,y,starradius,x,(Math.PI)*360)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
      }
    }
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.arc(7.5*blockS,7.5*blockS,starradius,7.5*blockS,(Math.PI)*360)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
}
  draw();
  //{x,y,color}
   var luozi=function(qizi){
    ctx.save()
    ctx.translate((qizi.x+0.5)*blockS,(qizi.y+0.5)*blockS)
    ctx.beginPath()
    if(qizi.color===1){
      ctx.arc(0,0,15,0,(Math.PI)*360)
      ctx.fillStyle='black'
      ctx.fill()
    }else{
      ctx.arc(0,0,15,0,(Math.PI)*360)
      // ctx.fillStyle='red'
      var img=$('#bai').get(0)
      img.src='2.png'
      ctx.drawImage(img,-15,-15)
    }
    // ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
  // var all=[{x,y,color}]
  $('#canvas').on('click',function(e){
    var x=Math.floor(e.offsetX/blockS)
    var y=Math.floor(e.offsetY/blockS)
    if(all[x+'-'+y]){
      return
    }
    if(flag){
      var qizi={x:x,y:y,color:1,step:step}
      luozi(qizi)
      $('#black').get(0).play()
      if(panduan(qizi)){
        $('.cartel').show().find('.tishi').text('黑棋获胜')
      }
      flag=false
    }else{
      var qizi={x:x,y:y,color:0,step:step}
      luozi(qizi)
      $('#white').get(0).play()
      if(panduan(qizi)){
        $('.cartel').show().find('.tishi').text('白棋获胜')
      }
      flag=true
    }
    step+=1
    all[x+'-'+y]=qizi

  })
  var panduan=function(qizi){
    var shuju={}
    $.each(all,function(k,v){
      if(v.color===qizi.color){
        shuju[k]=v
      }
    })
    var shu=1,hang=1,zuoxie=1,youxie=1
    var tx,ty;
    // 竖着
    tx=qizi.x,ty=qizi.y
    while(shuju[tx+'-'+(ty+1)]){
      shu++;ty++
    }
    tx=qizi.x,ty=qizi.y
    while(shuju[tx+'-'+(ty-1)]){
      shu++;ty--
    }
    // 横着
    tx=qizi.x,ty=qizi.y
    while(shuju[(tx+1)+'-'+ty]){
      hang++;tx++
    }
    tx=qizi.x,ty=qizi.y
    while(shuju[(tx-1)+'-'+ty]){
      hang++;tx--
    }
    // 右斜
    tx=qizi.x,ty=qizi.y
    while(shuju[(tx+1)+'-'+(ty-1)]){
      youxie++;ty--;tx++
    }
    tx=qizi.x,ty=qizi.y
    while(shuju[(tx-1)+'-'+(ty+1)]){
      youxie++;ty++;tx--
    }
    // 左斜
    tx=qizi.x,ty=qizi.y
    while(shuju[(tx-1)+'-'+(ty-1)]){
      zuoxie++;ty--;tx--
    }
    tx=qizi.x,ty=qizi.y
    while(shuju[(tx+1)+'-'+(ty+1)]){
      youxie++;ty++;tx++
    }
    if(shu>=5 || hang>=5 || zuoxie>=5 || youxie>=5){
      return true
    }
  }
  $('.close').on('click',function(){
    $('.cartel').hide()
    ctx.clearRect(0,0,600,600)
    draw()
    flag=true
    all={}
    step=0
  })
  $('.tips').on('click',false)
  $('.cartel').on('click',function(){
    $(this).hide()
    ctx.clearRect(0,0,600,600)
    draw()
    flag=true
    all={}
    step=0
  })
  $('#restart').on('click',function(){
    $('.cartel').hide()
    ctx.clearRect(0,0,600,600)
    draw()
    flag=true
    all={}
    step=0
  })
  $('#qipu').on('click',function(){
    $('.cartel').hide()
    $('#save').show()
    ctx.save();
    ctx.font = "20px consolas";
    for( var i in all){
      if( all[i].color === 1){
          ctx.fillStyle = '#fff';
      }else{
        ctx.fillStyle = 'black';
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(all[i].step,
        (all[i].x+0.5)*blockS,
        (all[i].y+0.5)*blockS);
    }
    ctx.restore();
    var image = $('#canvas').get(0).toDataURL('image/jpg',1);
    $('#save').attr('href',image);
    $('#save').attr('download','qipu.png');
    ctx.clearRect(0,0,600,600)
    draw()
    flag=true
    all={}
    step=0
  })
})
