(function(){
  var LOOKS={
    original:{name:'Original',cw:'sea',blurb:'Soft rounded cards, a friendly serif, and a sprig. The calm base we started with.'},
    nook:{name:'Library',cw:'library',blurb:'A bookshelf (with a cat) across the top, a chapter-list routine with dotted leaders, a ribbon bookmark on your next step, and ribbon tabs.'},
    meadow:{name:'Meadow',cw:'peri',blurb:'A flower garland, blossom bullets, pastel gradient edges, polka-dot paper, and a floating pill tab bar.'},
    tide:{name:'Ocean',cw:'ocean',blurb:'A rippling pool header, a ripple ring on your next step, a wave along the main card, and a wavy tab bar.'},
    birch:{name:'Canvas',cw:'oak',blurb:'Flat, quiet sections with a birch trunk down the edge, a morning glow, a branch drawing, and a wood shelf rule.'}
  };
  var CWS={
    sea:{name:'Fern',sw:['#E9EDDF','#4F9665','#A9CC9B']},
    library:{name:'Heirloom',sw:['#E9DFC9','#28496B','#A47552']},
    peri:{name:'Wisteria',sw:['#F1E8D7','#9580B4','#C98FA0']},
    ocean:{name:'Seaglass',sw:['#EDE5D8','#397F82','#A5CFC7']},
    oak:{name:'Linen',sw:['#F5F0E6','#C9B99F','#B5BDB1']}
  };
  var MOTIFS={
    creature:'<path d="M6 25C6 13 12 7 26 7C26 19 18 25 6 25Z"/><path d="M6 25L18 13"/>',
    original:'<path d="M16 29V9"/><path d="M16 21c-5 0-8-3-8-7 5 0 8 3 8 7z"/><path d="M16 15c4 0 7-3 7-7-4 0-7 3-7 7z"/>',
    nook:'<path d="M16 8c-3-2.5-7-3-11-2.5v17c4-.5 8 0 11 2.5 3-2.5 7-3 11-2.5v-17c-4-.5-8 0-11 2.5z"/><path d="M16 8v17"/>',
    meadow:'<circle cx="16" cy="12" r="2.5"/><circle cx="16" cy="6" r="3"/><circle cx="21.7" cy="10.1" r="3"/><circle cx="19.5" cy="16.8" r="3"/><circle cx="12.5" cy="16.8" r="3"/><circle cx="10.3" cy="10.1" r="3"/><path d="M16 19v10"/><path d="M16 25c3 0 5-1.5 6-4-3 0-5 1.5-6 4z"/>',
    tide:'<path d="M3 12c3-3 5-3 8 0s5 3 8 0 5-3 8 0"/><path d="M3 19c3-3 5-3 8 0s5 3 8 0 5-3 8 0"/><path d="M3 26c3-3 5-3 8 0s5 3 8 0 5-3 8 0"/>',
    birch:'<path d="M6 28C10 20 16 14 26 5"/><path d="M12 22c-4 0-6-2-6-5 4 0 6 2 6 5z"/><path d="M17 16c0-4 2-6 5-6 0 4-2 6-5 6z"/><path d="M22 10c3 0 5-1 5-4-3 0-5 1-5 4z"/>'
  };
  var SVGO='<svg class="sprig" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  function motif(){return SVGO+(MOTIFS[lookKey()]||MOTIFS.original)+'</svg>'}

  /* header illustrations, drawn with the colorway's own tokens */

  /* extra animals per mood; the scene shows one a day, and tapping the scene brings the next */
  var WHO={slow:['sleepy bear','slow turtle','little snail'],energetic:['busy squirrel','bouncy rabbit','springy grasshopper'],dreamy:['little songbird','leaping dolphin','dreamy butterfly'],balanced:['little hedgehog','clever fox','quiet deer']};
  function critterIdx(){var d=new Date(),doy=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5);return (doy+(S.cr||0))%3}
  var CRITTERS={
    slow:[
      function(f,o){ // turtle
        return '<ellipse cx="318" cy="76" rx="8" ry="4" style="fill:var(--sky)" '+f+'/><ellipse cx="368" cy="76" rx="8" ry="4" style="fill:var(--sky)" '+f+'/>'
          +'<path d="M300 76C300 52 322 44 346 44C370 44 388 54 388 76Z" style="fill:var(--accent)" '+f+'/><path d="M316 76C316 62 328 54 346 54M346 54C364 54 374 62 374 76M346 44V76" '+o+' opacity=".55"/>'
          +'<ellipse cx="398" cy="66" rx="10" ry="8" style="fill:var(--sky)" '+f+'/><path d="M396 64Q400 67 404 64" '+o+'/>'
          +'<text x="410" y="48" font-size="12" style="fill:var(--ink2);font-family:var(--font-display)">z</text>';
      },
      function(f,o){ // snail
        return '<path d="M298 78C298 71 306 69 320 69L372 69C384 69 392 60 392 48C392 43 399 43 399 50C401 66 399 78 386 78Z" style="fill:var(--sky)" '+f+'/>'
          +'<path d="M392 46L390 36M398 47L402 37" '+o+'/><circle cx="390" cy="35" r="2" style="fill:var(--ink)"/><circle cx="402" cy="36" r="2" style="fill:var(--ink)"/>'
          +'<circle cx="340" cy="54" r="17" style="fill:var(--wood)" '+f+'/><path d="M340 54m0-1a1 1 0 1 1-1 1M340 54m-1 0a9 9 0 1 1 9 9M340 54m0 0a5 5 0 1 0-5-5" '+o+' opacity=".7"/>';
      }
    ],
    energetic:[
      function(f,o){ // rabbit
        return '<ellipse cx="340" cy="70" rx="12" ry="8" style="fill:var(--surface2)" '+f+'/><ellipse cx="352" cy="62" rx="22" ry="14" style="fill:var(--surface2)" '+f+'/>'
          +'<circle cx="326" cy="68" r="5" style="fill:var(--surface)" '+f+'/>'
          +'<ellipse cx="376" cy="28" rx="3.8" ry="12" transform="rotate(-8 376 28)" style="fill:var(--surface2)" '+f+'/><ellipse cx="387" cy="29" rx="3.8" ry="12" transform="rotate(8 387 29)" style="fill:var(--surface2)" '+f+'/>'
          +'<circle cx="380" cy="50" r="11" style="fill:var(--surface2)" '+f+'/><circle cx="384" cy="48" r="1.6" style="fill:var(--ink)"/><circle cx="390" cy="53" r="2" style="fill:var(--accent)"/>'
          +'<path d="M392 66L402 62L398 74Z" style="fill:var(--accent)" '+f+'/><path d="M398 62L401 55" '+o+'/>';
      },
      function(f,o){ // grasshopper
        return '<ellipse cx="350" cy="56" rx="24" ry="7" transform="rotate(-8 350 56)" style="fill:var(--accent)" '+f+'/><ellipse cx="346" cy="51" rx="19" ry="4" transform="rotate(-8 346 51)" style="fill:var(--sky)" '+f+'/>'
          +'<circle cx="378" cy="50" r="6.5" style="fill:var(--accent)" '+f+'/><circle cx="381" cy="48" r="1.6" style="fill:var(--ink)"/><path d="M381 44L394 28M383 44L400 36" '+o+'/>'
          +'<path d="M336 58L324 38L304 70M340 62L336 78M360 62L364 78M366 60L374 78" '+o+'/>';
      }
    ],
    dreamy:[
      function(f,o){ // dolphin leaping
        return '<path d="M276 78q8-6 16 0t16 0M372 78q8-6 16 0t16 0" '+o+' opacity=".6"/>'
          +'<path d="M298 76C312 34 352 22 390 44L406 50L392 57C374 50 332 52 312 80Z" style="fill:var(--sky)" '+f+'/>'
          +'<path d="M334 40L344 25L354 38Z" style="fill:var(--sky)" '+f+'/><path d="M374 52L368 65L382 58Z" style="fill:var(--sky)" '+f+'/>'
          +'<path d="M298 76L284 69M298 76L289 85" '+o+'/><circle cx="385" cy="46" r="1.7" style="fill:var(--ink)"/><path d="M392 52Q398 54 403 51" '+o+' stroke-width="1"/>';
      },
      function(f,o){ // butterfly on a flower
        return '<path d="M392 78V46" '+o+'/><circle cx="392" cy="43" r="5" style="fill:var(--soft)" '+f+'/><circle cx="392" cy="43" r="2" style="fill:var(--wood)"/>'
          +'<ellipse cx="338" cy="42" rx="15" ry="10" transform="rotate(-28 338 42)" style="fill:var(--accent)" '+f+'/><ellipse cx="372" cy="42" rx="15" ry="10" transform="rotate(28 372 42)" style="fill:var(--accent)" '+f+'/>'
          +'<ellipse cx="344" cy="58" rx="9" ry="7" transform="rotate(22 344 58)" style="fill:var(--soft)" '+f+'/><ellipse cx="366" cy="58" rx="9" ry="7" transform="rotate(-22 366 58)" style="fill:var(--soft)" '+f+'/>'
          +'<path d="M355 38V64" '+o+' stroke-width="3"/><path d="M355 38L349 27M355 38L361 27" '+o+'/>';
      }
    ],
    balanced:[
      function(f,o){ // fox with a scarf
        return '<path d="M332 64C306 66 296 48 304 34C316 40 326 50 334 58Z" style="fill:var(--hot)" '+f+'/><path d="M304 34C309 36 313 40 315 45L305 45Z" style="fill:var(--surface)" '+f+'/>'
          +'<ellipse cx="352" cy="64" rx="22" ry="12" style="fill:var(--hot)" '+f+'/><path d="M342 76V78M362 76V78" '+o+'/>'
          +'<path d="M368 52L371 32L380 41L389 32L392 52C392 62 372 64 368 52Z" style="fill:var(--hot)" '+f+'/><path d="M372 52L380 62L388 52Z" style="fill:var(--surface)" '+f+'/>'
          +'<circle cx="376" cy="47" r="1.4" style="fill:var(--ink)"/><circle cx="385" cy="47" r="1.4" style="fill:var(--ink)"/><circle cx="380.5" cy="58" r="1.8" style="fill:var(--ink)"/>'
          +'<path d="M366 62Q380 70 394 62" fill="none" style="stroke:var(--accent)" stroke-width="5" stroke-linecap="round"/>';
      },
      function(f,o){ // deer
        return '<ellipse cx="346" cy="58" rx="22" ry="11" style="fill:var(--wood)" '+f+'/><circle cx="338" cy="55" r="2" style="fill:var(--surface)"/><circle cx="350" cy="52" r="2" style="fill:var(--surface)"/><circle cx="356" cy="60" r="2" style="fill:var(--surface)"/>'
          +'<path d="M330 66V78M338 66V78M356 66V78M364 66V78" '+o+' stroke-width="3"/><path d="M324 52L320 46" '+o+' stroke-width="3"/>'
          +'<path d="M362 50L376 34" '+o+' stroke-width="9"/><path d="M362 50L376 34" fill="none" style="stroke:var(--wood)" stroke-width="6" stroke-linecap="round"/>'
          +'<ellipse cx="382" cy="31" rx="9" ry="5.5" transform="rotate(-25 382 31)" style="fill:var(--wood)" '+f+'/><circle cx="385" cy="29" r="1.4" style="fill:var(--ink)"/><circle cx="390" cy="34" r="1.8" style="fill:var(--ink)"/>'
          +'<ellipse cx="376" cy="24" rx="2.5" ry="5" transform="rotate(-20 376 24)" style="fill:var(--wood)" '+f+'/>'
          +'<path d="M380 24L376 12M377 16L370 10M384 24L388 12M387 16L394 12" '+o+'/>';
      }
    ]
  };
  var DECO={
    creature:function(){
      var o='fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
      var se=curSeason(),m=S.mood,s='';
      s+='<path d="M0 78H440" '+o+' opacity=".5"/>';
      // season props, left side
      if(se==='spring'){
        s+='<path d="M14 78C14 62 22 54 34 50" '+o+'/><path d="M34 50C26 44 28 36 38 36C40 44 38 48 34 50Z" style="fill:var(--accent)" '+o.replace('fill="none" ','')+'/>';
        [[56,60],[78,66]].forEach(function(p){s+='<path d="M'+p[0]+' 78V'+p[1]+'" '+o+'/><circle cx="'+p[0]+'" cy="'+(p[1]-3)+'" r="5" style="fill:var(--soft)" stroke="var(--ink)" stroke-width="1.5"/><circle cx="'+p[0]+'" cy="'+(p[1]-3)+'" r="1.8" style="fill:var(--wood)"/>'});
        s+='<path d="M100 22C104 18 110 18 112 22C108 26 103 26 100 22Z M126 34C130 30 136 30 138 34C134 38 129 38 126 34Z" style="fill:var(--sky)" stroke="var(--ink)" stroke-width="1.2"/>';
      }else if(se==='summer'){
        s+='<circle cx="40" cy="26" r="11" style="fill:var(--accent)" stroke="var(--ink)" stroke-width="1.5"/>';
        for(var i=0;i<8;i++){var a=i*Math.PI/4;s+='<path d="M'+(40+Math.cos(a)*15).toFixed(1)+' '+(26+Math.sin(a)*15).toFixed(1)+'L'+(40+Math.cos(a)*20).toFixed(1)+' '+(26+Math.sin(a)*20).toFixed(1)+'" '+o+'/>'}
        [[70,0],[78,6],[86,2],[110,4],[118,8]].forEach(function(g){s+='<path d="M'+g[0]+' 78C'+g[0]+' 66 '+(g[0]+3)+' 62 '+(g[0]+5)+' '+(58+g[1])+'" '+o+'/>'});
        s+='<ellipse cx="150" cy="73" rx="9" ry="5" style="fill:var(--sky)" stroke="var(--ink)" stroke-width="1.3"/>';
      }else if(se==='autumn'){
        s+='<path d="M20 78C20 66 24 62 38 62C52 62 56 66 56 78Z" style="fill:var(--accent)" stroke="var(--ink)" stroke-width="1.5"/><path d="M30 78V70C30 68 46 68 46 70V78" style="fill:var(--surface)" stroke="var(--ink)" stroke-width="1.3"/><circle cx="30" cy="68" r="1.6" style="fill:var(--surface)"/><circle cx="42" cy="66" r="1.6" style="fill:var(--surface)"/>';
        [[90,20,-20],[120,40,15],[150,16,40],[176,48,-30]].forEach(function(l){s+='<path d="M0 0C6 -9 16 -9 20 0C14 8 6 8 0 0Z" transform="translate('+l[0]+' '+l[1]+') rotate('+l[2]+')" style="fill:var(--accent);opacity:.85" stroke="var(--ink)" stroke-width="1.2"/>'});
        s+='<path d="M96 78C96 70 104 66 112 66C120 66 124 72 124 78Z" style="fill:var(--wood)" stroke="var(--ink)" stroke-width="1.3"/>';
      }else{
        s+='<path d="M30 78V62M30 62L16 74H44ZM30 48L18 62H42ZM30 34L20 48H40Z" style="fill:var(--accent);opacity:.9" stroke="var(--ink)" stroke-width="1.4"/><path d="M20 48H40L36 44H24Z" style="fill:var(--surface)"/>';
        [[80,14],[106,32],[132,18],[160,40],[188,22]].forEach(function(f){s+='<path d="M'+f[0]+' '+(f[1]-5)+'V'+(f[1]+5)+'M'+(f[0]-5)+' '+f[1]+'H'+(f[0]+5)+'M'+(f[0]-3.5)+' '+(f[1]-3.5)+'L'+(f[0]+3.5)+' '+(f[1]+3.5)+'M'+(f[0]+3.5)+' '+(f[1]-3.5)+'L'+(f[0]-3.5)+' '+(f[1]+3.5)+'" '+o+'/>'});
        s+='<path d="M70 78C70 72 76 70 84 70C92 70 96 72 96 78Z" style="fill:var(--surface)" stroke="var(--ink)" stroke-width="1.3"/>';
      }
      // the animal, right side
      var f='stroke="var(--ink)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
      var v=critterIdx();s+='<g transform="translate(440 78) scale(1.3) translate(-440 -78)">';
      if(v>0&&CRITTERS[m]&&CRITTERS[m][v-1]){s+=CRITTERS[m][v-1](f,o)}else if(m==='slow'){ // sleepy bear in a scarf
        s+='<path d="M300 78C300 54 318 46 342 46C368 46 386 58 386 78Z" style="fill:var(--wood)" '+f+'/>';
        s+='<circle cx="364" cy="56" r="17" style="fill:var(--wood)" '+f+'/><circle cx="351" cy="42" r="6" style="fill:var(--wood)" '+f+'/><circle cx="377" cy="42" r="6" style="fill:var(--wood)" '+f+'/>';
        s+='<ellipse cx="369" cy="62" rx="9" ry="6.5" style="fill:var(--surface2)" '+f+'/><ellipse cx="371" cy="59.5" rx="2.6" ry="1.8" style="fill:var(--ink)"/>';
        s+='<path d="M355 53Q359 56 363 53M372 52Q376 55 380 52" '+o+'/>';
        s+='<path d="M348 66Q364 74 382 70L380 77Q364 81 346 73Z" style="fill:var(--accent)" '+f+'/>';
        s+='<text x="392" y="36" font-size="13" style="fill:var(--ink2);font-family:var(--font-display)">z</text><text x="402" y="26" font-size="10" style="fill:var(--ink2);font-family:var(--font-display)">z</text>';
      }else if(m==='energetic'){ // busy squirrel with an acorn
        s+='<path d="M334 78C300 78 292 44 318 30C312 48 324 56 336 58Z" style="fill:var(--wood)" '+f+'/>';
        s+='<ellipse cx="344" cy="62" rx="14" ry="17" style="fill:var(--wood)" '+f+'/><circle cx="356" cy="42" r="10" style="fill:var(--wood)" '+f+'/><path d="M351 34L349 25L358 31Z" style="fill:var(--wood)" '+f+'/>';
        s+='<circle cx="359" cy="41" r="1.6" style="fill:var(--ink)"/><circle cx="366" cy="45" r="1.6" style="fill:var(--ink)"/><ellipse cx="354" cy="68" rx="8" ry="10" style="fill:var(--surface2)"/>';
        s+='<ellipse cx="370" cy="62" rx="6" ry="7" style="fill:var(--accent)" '+f+'/><path d="M365 57Q370 53 375 57Z" style="fill:var(--ink2)" '+f+'/><path d="M338 78L334 72M352 78L356 72" '+o+'/>';
      }else if(m==='dreamy'){ // songbird on a branch, plus a butterfly
        s+='<path d="M286 52C320 46 360 46 410 42" '+o+'/><path d="M388 43C392 34 400 34 404 38C400 44 394 45 388 43Z" style="fill:var(--accent)" '+f+'/>';
        s+='<ellipse cx="348" cy="36" rx="17" ry="12" style="fill:var(--sky)" '+f+'/><circle cx="364" cy="28" r="8" style="fill:var(--sky)" '+f+'/><path d="M371 27L379 29L371 32Z" style="fill:var(--accent)" '+f+'/><circle cx="366" cy="26" r="1.5" style="fill:var(--ink)"/>';
        s+='<path d="M332 36C322 32 316 36 312 44C322 46 330 44 334 40Z" style="fill:var(--soft)" '+f+'/><path d="M344 36C350 28 358 30 358 38C352 42 346 42 344 36Z" style="fill:var(--accent)" '+f+'/>';
        s+='<path d="M342 48L341 54M352 48L353 54" '+o+'/>';
        s+='<path d="M296 26C290 18 282 22 286 30C290 32 294 30 296 26Z M296 26C302 18 310 22 306 30C302 32 298 30 296 26Z" style="fill:var(--accent);opacity:.85" stroke="var(--ink)" stroke-width="1.2"/><path d="M296 24V32" '+o+'/>';
      }else{ // balanced: hedgehog ready for an adventure
        s+='<path d="M300 78C300 50 322 38 348 40C374 42 388 58 386 78Z" style="fill:var(--wood)" '+f+'/>';
        for(var k=0;k<9;k++){var x=306+k*9;s+='<path d="M'+x+' '+(52-Math.abs(k-4)*2.2)+'L'+(x+4)+' '+(42-Math.abs(k-4)*2.2)+'L'+(x+8)+' '+(54-Math.abs(k-4)*2.2)+'" '+o+'/>'}
        s+='<path d="M380 66C392 66 402 70 404 76L384 78Z" style="fill:var(--surface2)" '+f+'/><circle cx="404" cy="75" r="2.2" style="fill:var(--ink)"/><circle cx="392" cy="68" r="1.5" style="fill:var(--ink)"/>';
        s+='<path d="M368 54C372 44 384 44 388 54Z" style="fill:var(--accent)" '+f+'/><path d="M364 54H394" '+o+'/>';
        s+='<rect x="330" y="52" width="20" height="18" rx="5" style="fill:var(--accent)" '+f+'/><path d="M334 52V70M346 52V70" '+o+'/>';
        s+='<path d="M296 78L300 38" '+o+'/><circle cx="300" cy="37" r="3" style="fill:var(--soft)" '+f+'/>';
        s+='<path d="M334 78L332 72M352 78L354 72" '+o+'/>';
      }
      s+='</g>';
      return '<svg viewBox="0 0 440 90" preserveAspectRatio="xMidYMax meet">'+s+'</svg>';
    },

    nook:function(){
      var cols=['var(--accent)','var(--sky)','var(--wood)','var(--soft)'],ds=[[14,36],[11,44],[16,30],[12,40],[15,46],[13,32],[14,42],[11,36],[16,44],[12,30],[14,38]],x=6,s='';
      ds.forEach(function(d,i){var y=52-d[1];
        s+='<rect x="'+x+'" y="'+y+'" width="'+d[0]+'" height="'+d[1]+'" rx="1.5" style="fill:'+cols[i%4]+'"/>';
        s+='<rect x="'+x+'" y="'+(y+7)+'" width="'+d[0]+'" height="2" style="fill:var(--surface);opacity:.6"/>';
        s+='<rect x="'+x+'" y="'+(y+d[1]-9)+'" width="'+d[0]+'" height="2" style="fill:var(--surface);opacity:.6"/>';
        x+=d[0]+2});
      s+='<g transform="translate('+(x+14)+' 52) rotate(16)"><rect x="0" y="-40" width="12" height="40" rx="1.5" style="fill:var(--accent)"/><rect x="0" y="-33" width="12" height="2" style="fill:var(--surface);opacity:.6"/></g>';
      s+='<rect x="236" y="43" width="56" height="9" rx="1.5" style="fill:var(--wood)"/><rect x="242" y="34" width="46" height="9" rx="1.5" style="fill:var(--sky)"/><rect x="238" y="26" width="50" height="8" rx="1.5" style="fill:var(--accent)"/>';
      s+='<rect x="0" y="52" width="440" height="3" rx="1.5" style="fill:var(--wood)"/>';
      s+='<g transform="translate(338 52)" style="fill:var(--ink2)"><path d="M-22 0C-23 -10 -14 -18 -2 -18C12 -18 22 -12 22 0Z"/><circle cx="15" cy="-15" r="8"/><path d="M8 -20L9 -30L15 -22Z M16 -22L22 -30L23 -19Z"/><path d="M11 -15q2 2 4 0 M18 -15q2 2 4 0" fill="none" style="stroke:var(--surface)" stroke-width="1.4" stroke-linecap="round"/><path d="M-21 -3C-30 -3 -34 5 -29 10C-25 14 -17 13 -15 8" fill="none" style="stroke:var(--ink2)" stroke-width="4" stroke-linecap="round"/></g>';
      s+='<path d="M388 52h18l-2.5-13h-13z" style="fill:var(--wood)"/><path d="M397 39c-9-2-12-10-10-18 8 3 11 9 10 18z" style="fill:var(--accent)"/><path d="M397 39c2-9 8-13 15-14 0 8-6 13-15 14z" style="fill:var(--soft);stroke:var(--accent)" stroke-width="1"/><path d="M397 39c-1-8 1-15 5-20 4 6 3 14-5 20z" style="fill:var(--sky)"/>';
      return '<svg viewBox="0 0 440 70" role="presentation">'+s+'</svg>';
    },
    meadow:function(){
      var s='',pts=[],yy=function(x){return 34+11*Math.sin(x/21)};
      for(var x=0;x<=440;x+=4)pts.push((x?'L':'M')+x+' '+yy(x).toFixed(1));
      s+='<path d="'+pts.join('')+'" fill="none" style="stroke:var(--accent)" stroke-width="2" stroke-linecap="round"/>';
      [14,66,118,172,226,278,332,386].forEach(function(x,i){var y=yy(x)+(i%2?5:-5),a=i%2?36:-36;
        s+='<ellipse cx="'+x+'" cy="'+y.toFixed(1)+'" rx="7" ry="3" transform="rotate('+a+' '+x+' '+y.toFixed(1)+')" style="fill:var(--soft);stroke:var(--accent)" stroke-width="1"/>'});
      [40,150,252,360].forEach(function(x,i){var y=yy(x),c=i%2?'var(--accent)':'var(--wood)';
        s+='<g transform="translate('+x+' '+y.toFixed(1)+')">';
        for(var k=0;k<5;k++){var an=(k*72-90)*Math.PI/180;s+='<circle cx="'+(6.0*Math.cos(an)).toFixed(1)+'" cy="'+(6.0*Math.sin(an)).toFixed(1)+'" r="3.5" style="fill:'+c+';opacity:.9"/>'}
        s+='<circle r="2.4" style="fill:var(--surface);stroke:'+c+'" stroke-width="1.2"/></g>'});
      [96,300,418].forEach(function(x){var y=yy(x);s+='<circle cx="'+x+'" cy="'+y.toFixed(1)+'" r="3" style="fill:var(--sky);stroke:var(--accent)" stroke-width="1"/>'});
      return '<svg viewBox="0 0 440 64" role="presentation">'+s+'</svg>';
    },
    tide:function(){
      return '<svg viewBox="0 0 440 64" role="presentation">'
        +'<path d="M0 34 Q55 12 110 34 T220 34 T330 34 T440 34 V64 H0Z" style="fill:var(--sky);opacity:.55"/>'
        +'<path d="M0 44 Q55 26 110 44 T220 44 T330 44 T440 44 V64 H0Z" style="fill:var(--sky);opacity:.8"/>'
        +'<path d="M0 54 Q55 40 110 54 T220 54 T330 54 T440 54 V64 H0Z" style="fill:var(--accent);opacity:.28"/>'
        +'<circle cx="60" cy="18" r="4" fill="none" style="stroke:var(--accent)" stroke-width="1.4"/><circle cx="74" cy="9" r="2.4" fill="none" style="stroke:var(--accent)" stroke-width="1.2"/>'
        +'<circle cx="250" cy="14" r="3" fill="none" style="stroke:var(--accent)" stroke-width="1.3"/><circle cx="262" cy="22" r="1.8" fill="none" style="stroke:var(--accent)" stroke-width="1.1"/>'
        +'<circle cx="372" cy="12" r="4.5" fill="none" style="stroke:var(--accent)" stroke-width="1.4"/></svg>';
    },
    birch:function(){
      var s='',pts=[],yb=function(x){var t=(440-x)/376;return 8+t*40+4*Math.sin(t*9)};
      for(var x=440;x>=64;x-=8)pts.push((x===440?'M':'L')+x+' '+yb(x).toFixed(1));
      s+='<path d="'+pts.join('')+'" fill="none" style="stroke:var(--ink2)" stroke-width="1.4" stroke-linecap="round"/>';
      [410,372,338,300,262,226,190,154,118,86].forEach(function(x,i){var y=yb(x),a=i%2===0?-48:48;
        s+='<g transform="translate('+x+' '+y.toFixed(1)+') rotate('+a+')"><path d="M0 0C5-7 14-7 19 0C14 7 5 7 0 0Z" style="fill:'+(i%3===0?'var(--sky)':'var(--soft)')+';stroke:var(--accent)" stroke-width="1"/></g>'});
      return '<svg viewBox="0 0 440 60" role="presentation">'+s+'</svg>';
    }
  };
  function deco(){var f=DECO[lookKey()];return f?'<div class="deco" aria-hidden="true"'+(S.logic==='mammal'?' data-a="critter"':'')+'>'+f()+'</div>':''}
  function head(o){
    return '<header class="head"><div class="top"><div>'+(o.eyebrow?'<div class="date">'+esc(o.eyebrow)+'</div>':'')+'<h1 class="hello">'+esc(o.title)+'</h1>'+(o.sub?'<div class="date">'+esc(o.sub)+'</div>':'')+'</div>'
      +'<button class="emblem" data-a="menu" aria-label="Open menu" aria-haspopup="dialog">'+motif()+'</button></div>'+deco()+'</header>';
  }

  var ICON={
    today:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/></svg>',
    lists:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/></svg>',
    log:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>',
    ov:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16M15 4v16"/></svg>',
    us:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 15c3 0 6 1.5 6 5"/></svg>'
  };
  var STACK='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="9" height="9" rx="2"/><path d="M3 5v8a1 1 0 0 0 1 1h8"/></svg>';
  var CHEV='<svg class="gchev" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5l4 4 4-4"/></svg>';

  /* floor items (floor:true) are the basics, so they have no skip button */
  var STEPS={
    dailymeds:{t:'Morning medications',s:'First thing, before anything else.',c:'Taken',floor:true},
    teeth:{t:'Teeth and face',s:'Before you head downstairs. It rarely happens once you are down there.',c:'Done'},
    clothes:{t:'Out of pajamas',s:'Same trip upstairs, then down you go.',c:'Done'},
    muffin:{t:"§C's breakfast",s:'Feeding §C gets you into the kitchen.',c:'Fed',floor:true},
    water:{t:'A glass of water',s:'Just one, wherever you are.',c:'Done',floor:true},
    meal:{t:'Your turn',s:'§C is sorted. What are you having?',meal:true,floor:true},
    lunch:{t:'Lunch',s:'§P is usually free around 12:30. Want to eat together?',lunch:true,floor:true},
    jobs:{t:'One small project step',s:'Twenty minutes. Just the starting, not the finishing.',c:'Done'},
    pt:{t:'Stretches or exercises',s:'The smaller round counts if your energy is low.',c:'Done'},
    archery:{t:'Hobby time',s:'Pack your gear first, then go.',c:'Done'},
    muffinpm:{t:"§C's dinner",s:'The evening bowl.',c:'Fed',floor:true},
    dinner:{t:'Dinner',s:'What sounds doable tonight?',meal:true,floor:true},
    tidy:{t:'One small tidy',s:'Ten minutes, one spot. The kitchen counter is a good one.',c:'Done'},
    tomorrow:{t:'Glance at tomorrow',s:'Just the fixed things, and one easy place to start.',c:'Done'}
  };
  var NAMES={dailymeds:'Morning medications',teeth:'Teeth and face',clothes:'Out of pajamas',muffin:"§C's breakfast",water:'Water',meal:'Breakfast',lunch:'Lunch',jobs:'One small project step',pt:'Stretches or exercises',archery:'Archery, 3 PM',muffinpm:"§C's dinner",dinner:'Dinner',tidy:'One small tidy',tomorrow:'Glance at tomorrow'};
  var PARTS={
    morning:{label:'Morning',steps:['dailymeds','teeth','clothes','muffin','meal'],done:{t:'The floor is covered.',s:'Everything after this is a bonus. Pick some music, or see what the day wants.'}},
    afternoon:{label:'Afternoon',steps:['lunch','jobs','pt'],done:{t:'Afternoon handled.',s:'Whatever happened, the afternoon is done. Evening is its own thing.'}},
    evening:{label:'Evening',steps:['muffinpm','dinner','tidy','tomorrow'],done:{t:'That is the day.',s:'Rest counts. Nothing carries over as overdue.'}}
  };
  var FLOOR=['dailymeds','muffin','water','meal'];
  var BASE_CHIPS=['Migraine','Rough morning','Slept badly','Good hobby session','Watered plants'];
  /* tile groups: a chip that opens a panel of more options. Migraine is the first one; more can be added later. */
  var GROUPS={Migraine:{title:'Migraine details'}};
  var SEVS=['Mild','Moderate','Severe'];
  var SEVCOL={Mild:'var(--c6)',Moderate:'var(--c1)',Severe:'var(--c5)'};
  var KINDS={meds:{label:'Medications taken',add:'Add a medication',store:'gs-meds'},trig:{label:'Possible triggers',add:'Add a trigger',store:'gs-trig'},symp:{label:'Symptoms',add:'Add a symptom',store:'gs-symp'}};
  var DOW=['S','M','T','W','T','F','S'];

  function load(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
  function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
  /* personal names are filled in at display time, so none of them live in the code */
  var PROF=(function(){try{return JSON.parse(localStorage.getItem('gs-profile'))}catch(e){return null}})();
  function fxWith(s,html){
    var p=PROF||{},dflt={'§N':'friend','§P':'your partner','§C':'your pet'},val={'§N':p.name,'§P':p.partner,'§C':p.pet};
    return String(s).replace(/(^|[.!?>] ?)?(§[NPC])/g,function(m,pre,tok){
      var w=(val[tok]||'').trim(),fb=!w;if(fb)w=dflt[tok];
      if(fb&&(pre!==undefined)&&pre!==''){w=w.charAt(0).toUpperCase()+w.slice(1)}else if(fb&&pre===undefined&&false){}
      return (pre||'')+(html?esc(w):w);
    });
  }
  function fx(s){return fxWith(s,true)}
  function fxt(s){return fxWith(s,false)}
  function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML.replace(/"/g,'&quot;').replace(/'/g,'&#39;')}

  var DEFAULT_LISTS=[
    {id:'xmas',name:'Christmas',items:[{t:'Gift idea for §P',done:false},{t:'Wrapping paper (sample item)',done:false}]},
    {id:'movies',name:'Movies to watch',items:[{t:'Add the ones you keep forgetting (sample item)',done:false}]},
    {id:'hobbies',name:'Hobbies to try',items:[{t:'Something with plants (sample item)',done:false}]},
    {id:'groc',name:'Grocery run',items:[{t:'Easy breakfast foods (sample item)',done:false}]}
  ];
  var S={tab:'today',part:'morning',floor:false,status:{},lists:load('gs-lists',DEFAULT_LISTS),log:load('gs-log',[]),custom:load('gs-custom',[]),
    colors:load('gs-colors',{}),hide:{},mo:0,day:null,lv:'everyday',filt:false,rp:null,menu:false,
    opts:{meds:load('gs-meds',[]),trig:load('gs-trig',['Poor sleep','Skipped a meal','Dehydration','Weather change','Stress','Bright light']),symp:load('gs-symp',['Aura','Nausea','Light sensitivity','Sound sensitivity','Brain fog','Neck tension'])},
    f:{sels:[],sev:null,meds:[],trig:[],symp:[]}};
  BASE_CHIPS.forEach(function(c,i){if(S.colors[c]===undefined)S.colors[c]=i});
  S.look=load('gs-look','original');if(S.look==='greenhouse')S.look='original';if(!LOOKS[S.look])S.look='original';
  S.cw=load('gs-cw',null);if(!CWS[S.cw])S.cw=LOOKS[S.look].cw;
  function lookKey(){return S.logic==='mammal'?'creature':S.look}
  function applyLook(){var r=document.documentElement,c=S.logic==='mammal';r.setAttribute('data-look',c?'creature':S.look);r.setAttribute('data-cw',c?'creature':S.cw);if(c){r.setAttribute('data-season',curSeason());r.setAttribute('data-mood',S.mood)}else{r.removeAttribute('data-season');r.removeAttribute('data-mood')}}
  try{applyLook()}catch(e){}



  /* ---- logic modes: how the app words things and what it asks of you ---- */
  var LOGICS={
    gentle:{name:'Gentle (default)',blurb:'How it works now: one next step at a time, nothing overdue, plenty of slack.',icon:MOTIFS.original,voice:'Warm, plain and calm.'},
    clock:{name:'On the clock',blurb:'Cares about time. Steps get start times and lengths, plans warn you earlier, and you can slide the whole schedule if you run behind.',icon:'<circle cx="16" cy="16" r="11"/><path d="M16 9v7l5 3"/>',voice:'Practical and time-aware. You may say how long something realistically takes or suggest a short timer, but never rush or scold.'},
    mammal:{name:'Little mammal',blurb:'A woodland storybook. The whole look changes with the season, you pick your mood (slow, energetic, dreamy or balanced), the parking lot becomes the stash, and the words turn into a small animal tending its den.',icon:'<ellipse cx="16" cy="21" rx="6" ry="5"/><circle cx="8" cy="14" r="2.4"/><circle cx="13" cy="9" r="2.4"/><circle cx="19" cy="9" r="2.4"/><circle cx="24" cy="14" r="2.4"/>',voice:'Lightly playful: frame things as if she were a small animal tending a den and foraging, but keep the actual advice clear and kind. A light touch, not constant.'},
    tiny:{name:'Tiny steps',blurb:'Every step shrinks to its first 30 seconds. For days when starting is the whole problem.',icon:'<circle cx="6" cy="23" r="2"/><circle cx="13" cy="19" r="2"/><circle cx="20" cy="14" r="2"/><circle cx="27" cy="8" r="2"/>',voice:'Always shrink any suggestion to something doable in about 30 seconds.'},
    low:{name:'Low battery',blurb:'Only the basics today: medications, §C, water, and food. Quiet words, nothing extra.',icon:'<rect x="4" y="10" width="21" height="12" rx="3"/><path d="M28 14v4M8 14v4"/>',voice:'She is low on energy: keep replies very short, offer only the minimum, and give permission to do less.'}
  };
  var UI0={
    greet:function(l){return l+', §N.'},next:'Next',allset:'All set',
    routine:function(p){return 'Your '+p+', in order'},plans:'Plans',up:'Coming up',
    rough:'Rough morning? Tap here.',unrough:'Back to a normal morning',music:'Music, no detours',stuck:'Stuck?',skip:'I skipped this',
    food:'What should I have?',eaten:'I have eaten already',picked:'I picked something, done',lunchBtn:'Text §P: lunch?',solo:'I will eat on my own',
    floorNote:'Floor mode: only your medications, §C, water, and food. Everything else can wait, and nothing is overdue.',
    lowNote:'Low battery mode: just the basics. Everything else can wait, and nothing is overdue.',
    win:60,hello:'Hi. What is going on? Tell me in your own words, or tap one.',ctitle:'Here to help'
  };
  var UIALT={
    clock:{next:'On the clock',routine:function(p){return 'Your '+p+' schedule'},skip:'Skip this one',win:90,hello:'Hi. What is getting in the way? Tell me, or tap one.'},
    mammal:{
      greet:function(l){return l+', little mammal.'},next:'Next in the den',allset:'Settled in',
      routine:function(p){return 'Your '+p+' in the den, in order'},plans:'Places to be',up:'Further down the trail',
      rough:'Rough morning? Curl up here.',unrough:'Back to a regular den morning',music:'Sounds for the burrow',stuck:'Lost in the brush?',skip:'I let this one go',
      food:'What should I forage?',eaten:'I already foraged',picked:'I found something, done',lunchBtn:'Howl to §P: lunch?',solo:'I will forage alone',
      floorNote:'Floor mode: only your medicine, §C, water, and food. Everything else can wait. The den will still be there.',
      lowNote:'Low battery: just the essentials. The den can wait. Nothing is overdue.',
      hello:'Hello, little one. What is going on in the den?',ctitle:'Lost in the brush?'
    },
    tiny:{next:'First 30 seconds',allset:'That was enough',routine:function(p){return 'Tiny steps for '+p},skip:'Not this one',hello:'Hi. Tell me what you are stuck on. Small is fine.'},
    low:{greet:function(l){return 'Soft '+l.toLowerCase()+', §N.'},next:'Just this',allset:'Basics covered',routine:function(p){return 'The basics for '+p},rough:'Rougher than usual? Tap here.'}
  };
  var ALT={
    mammal:{
      dailymeds:{t:'Morning medicine',s:'First thing, before any foraging.'},
      teeth:{t:'Freshen your whiskers',s:'Teeth and face, before you leave the loft. It rarely happens once you are in the kitchen burrow.'},
      clothes:{t:'Shed the sleep fur',s:'Out of pajamas. Same trip upstairs, then down you go.'},
      muffin:{t:'Feed §C, the other small one',s:'The bowl gets you into the kitchen.',c:'Fed'},
      water:{t:'Drink at the stream',s:'Just one glass, wherever you are.'},
      meal:{t:'Forage for your own food',s:'§C is sorted. What is worth gathering?'},
      lunch:{t:'Midday forage',s:'§P is usually free around 12:30. Forage together?'},
      jobs:{t:'Scout one small trail',s:'Twenty minutes. Just the scouting, not the finishing.'},
      pt:{t:'Stretch the old muscles',s:'Your stretches or exercises. The smaller round counts if your energy is low.'},
      muffinpm:{t:"§C's evening bowl",s:'The evening bowl.'},
      dinner:{t:'Evening forage',s:'What sounds doable tonight?'},
      tidy:{t:'Tidy one corner of the den',s:'Ten minutes, one spot. The kitchen counter is a good one.'},
      tomorrow:{t:'Sniff the wind for tomorrow',s:'Just the fixed things, and one easy place to start.'}
    },
    tiny:{
      dailymeds:{t:'Open the medicine cabinet',s:'Just open it. Taking them comes next.'},
      teeth:{t:'Walk to the bathroom',s:'That is the whole step. Brushing usually follows once you are there.',c:'Brushed, done'},
      clothes:{t:'Pick one thing to wear',s:'One piece, from the drawer. Put it on after.',c:'Dressed'},
      muffin:{t:"Pick up §C's bowl",s:'Just carry it to the kitchen. The scoop follows.'},
      water:{t:'Fill a glass',s:'Just fill it. Sipping can come later.'},
      meal:{t:'Open the fridge',s:'Just look. Whatever catches your eye counts.'},
      lunch:{t:'Check if §P is free',s:'One text, then the rest.'},
      jobs:{t:'Open the project',s:'Just open it. Nothing else is needed yet.'},
      pt:{t:'Put the mat on the floor',s:'Only the mat. One exercise after, if you feel like it.',c:'Mat is out'},
      muffinpm:{t:"Pick up §C's bowl",s:'Carry it to the kitchen. The scoop follows.'},
      dinner:{t:'Open the fridge or the app',s:'One look. Pick the easiest thing you see.'},
      tidy:{t:'Pick up one thing',s:'One item, back where it lives.'},
      tomorrow:{t:'Open the calendar',s:'Look at tomorrow for ten seconds.'}
    }
  };
  var DONEALT={
    mammal:{morning:{t:'The den is secure.',s:'Everything after this is a bonus. Pick some sounds, or sniff around and see what the day wants.'},afternoon:{t:'Afternoon foraged.',s:'Whatever happened, the afternoon is done. Evening is its own trail.'},evening:{t:'Time to curl up.',s:'Rest counts. Nothing carries over as overdue.'}},
    tiny:{morning:{t:'That was enough to get moving.',s:'Pick some music, or see what the day wants.'},afternoon:{t:'Small steps, done.',s:'Evening is its own thing.'},evening:{t:'That is the day.',s:'Rest counts. Nothing carries over as overdue.'}},
    low:{morning:{t:'The basics are covered.',s:'That is enough for now. Rest counts.'},afternoon:{t:'Lunch handled.',s:'That is enough for the afternoon.'},evening:{t:'That is the day.',s:'Rest counts. Nothing carries over as overdue.'}}
  };
  /* clock mode: start minute and length for each step */
  var TIMES={dailymeds:[540,5],teeth:[545,10],clothes:[555,10],muffin:[565,10],water:[575,5],meal:[580,30],lunch:[750,45],jobs:[810,20],pt:[840,30],muffinpm:[1050,10],dinner:[1080,45],tidy:[1140,10],tomorrow:[1160,10]};
  var LOWSTEPS={morning:FLOOR,afternoon:['lunch'],evening:['muffinpm','dinner']};
  S.logic=load('gs-logic','gentle');if(!LOGICS[S.logic])S.logic='gentle';
  S.mt='colorways';S.shift=0;S.noAI=false;
  S.chat={open:false,msgs:[],busy:false,err:'',retry:''};


  /* ---- Little mammal moods and seasons ---- */
  var MOODS={
    slow:{name:'Slow',who:'sleepy bear',desc:'slow and sluggish, no big ambitions, mostly the basics'},
    energetic:{name:'Energetic',who:'busy squirrel',desc:'energetic and eager to get things done'},
    dreamy:{name:'Dreamy',who:'little songbird',desc:'head in the clouds, creative and free, wants to do the fun thing first'},
    balanced:{name:'Balanced',who:'little hedgehog',desc:'moderate and balanced, a mix of determined, cozy and creative'}
  };
  var SEASONS={auto:'Auto',spring:'Spring',summer:'Summer',autumn:'Autumn',winter:'Winter'};
  S.mood=load('gs-mood','balanced');if(!MOODS[S.mood])S.mood='balanced';
  S.season=load('gs-season','auto');if(!SEASONS[S.season])S.season='auto';
  function curSeason(){if(S.season!=='auto')return S.season;var m=new Date().getMonth();return (m<2||m===11)?'winter':m<5?'spring':m<8?'summer':'autumn'}
  function creature(){return S.logic==='mammal'}
  function lowMode(){return S.logic==='low'||(S.logic==='mammal'&&S.mood==='slow')}
  UI0.lot='Parking lot';UI0.parkIt='Park it';UI0.back='Back to the parking lot';UI0.charge='Recharge Battery';UI0.chargeSub='Gentle ideas for when your battery is low. None of these are tasks.';
  UIALT.mammal.lot='The stash';UIALT.mammal.parkIt='Stash it';UIALT.mammal.back='Back to the stash';UIALT.mammal.charge='Curl-up ideas';UIALT.mammal.chargeSub='Gentle ways to rest in the den. None of these are tasks.';
  UI0.plinko='Plinko';UI0.plbtn='Let the ball choose';UIALT.mammal.plinko='Acorn drop';UIALT.mammal.plbtn='Let the acorn choose';
  UIALT.mammal.greet=function(l){return l+', '+WHO[S.mood][critterIdx()]+'.'};

  /* ---- parking lot: anything nebulous with no set time ---- */
  UI0.park='From the parking lot';UI0.start='Start this';UI0.another='Another one';UI0.later='Not today';
  UIALT.mammal.park='From the stash';UIALT.mammal.start='Start gathering';UIALT.mammal.another='Show another';
  S.tasks=load('gs-tasks',null);
  if(!Array.isArray(S.tasks))S.tasks=[
    {id:'t1',title:'Return the package',ex:true,h:'week',nr:false,fun:false,work:[],mins:15,w:'small',due:'',offDue:null,steps:[],done:false,created:Date.now()-6*864e5},
    {id:'t2',title:'Fill out the insurance form',ex:true,h:'week',nr:false,fun:false,work:[],mins:30,w:'med',due:'',offDue:5,steps:[{t:'Find the form',done:false},{t:'Fill in just your name and address',done:false}],done:false,created:Date.now()-2*864e5},
    {id:'t3',title:'Reply to that email',ex:true,h:'week',nr:false,fun:false,work:[],mins:15,w:'big',due:'',offDue:null,steps:[],done:false,created:Date.now()-864e5},
    {id:'t4',title:'Sort out the plant shelf',ex:true,h:'month',nr:false,fun:false,work:[],mins:60,w:'small',due:'',offDue:null,steps:[],done:false,created:Date.now()-9*864e5},
    {id:'t5',title:'Sketch something just for fun',ex:true,h:'week',nr:false,fun:true,work:[],mins:30,w:'small',due:'',offDue:null,steps:[],done:false,created:Date.now()-3*864e5}
  ];
  S.tk=null;S.doing=null;S.askMore=false;S.celeb=null;S.skipPark=[];S.tkBusy=false;S.ovv='week';S.ovMo=0;S.ovDay=null;S.lot=false;S.pl=null;S.lotTab='week';S.lotAnim=false;
  function saveTasks(){save('gs-tasks',S.tasks)}
  function taskById(id){for(var i=0;i<S.tasks.length;i++)if(S.tasks[i].id===id)return S.tasks[i];return null}
  function dueOf(t){return t.ex&&t.offDue!=null?ymd(addDays(new Date(),t.offDue)):(t.due||'')}
  function dueDays(t){var d=dueOf(t);if(!d)return null;return Math.round((parseKey(d)-parseKey(ymd(new Date())))/864e5)}
  function fmtMins(m){return m<60?m+' min':(m%60?(m/60).toFixed(1):(m/60))+' hr'}
  function basicsDay(){return lowMode()||(S.part==='morning'&&S.floor)}
  function availMin(){
    var now=SIM[S.part],lim={morning:720,afternoon:1020,evening:1320}[S.part];
    evsOn(ymd(new Date())).forEach(function(ev){if(tmin(ev.time)>now){var lb=leaveBy(ev);if(lb<lim)lim=lb}});
    return Math.max(0,lim-now);
  }
  function ageDays(t){return Math.min(10,Math.floor((Date.now()-(t.created||Date.now()))/864e5))}
  function scoreTask(t,av){
    var sc=0,d=dueDays(t),m=t.mins||30,w=t.w||'med';
    if(d!==null)sc+=d<=0?55:d===1?40:d<=3?28:d<=7?14:4;
    sc+=w==='big'?24:w==='small'?0:12;
    sc+=ageDays(t);
    if(m<=av*0.6)sc+=6;
    if(S.logic==='tiny'&&m<=15)sc+=8;
    if(creature()&&S.mood==='energetic'&&w==='big')sc+=10;
    if(S.logic==='clock'&&t.mins)sc+=4;
    return sc;
  }
  function firstStep(t){return t.steps.filter(function(x){return !x.done})[0]||null}
  function rank(flt){
    var tk=ymd(new Date()),av=availMin();
    var open=S.tasks.filter(function(t){return !t.done&&t.snooze!==tk&&S.skipPark.indexOf(t.id)<0&&(!flt||flt(t))});
    var arr=open.map(function(t){return {t:t,s:scoreTask(t,av),m:t.mins||30}});
    var slack=(creature()&&S.mood==='energetic')?0:10;
    var fit=arr.filter(function(x){return x.m+slack<=av}),partial=!fit.length,pool=partial?arr:fit;
    pool.sort(function(a,b){return b.s-a.s});
    return {list:pool,partial:partial,av:av};
  }
  function whyOf(x,partial,av){
    var t=x.t,d=dueDays(t),why;
    if(partial)why='You only have about '+av+' minutes, so just the first small piece.';
    else if(d!==null&&d>=0&&d<=3)why='It has a date coming up: '+dayLabel(dueOf(t))+'.';
    else if(d!==null&&d<0)why='It has a date on it, and there is room for it now.';
    else if(t.w==='big')why='It matters most on your list, and it fits the time you have.';
    else if(ageDays(t)>=5)why='It has been waiting a while, and now there is room.';
    else why='It fits the time you have right now.';
    if(S.logic==='clock'&&!partial)why+=' About '+x.m+' of your '+av+' free minutes.';
    return why;
  }
  function pickTask(flt){
    var r=rank(flt);if(!r.list.length)return null;
    var x=r.list[0];return {t:x.t,m:x.m,av:r.av,partial:r.partial,why:whyOf(x,r.partial,r.av)};
  }
  /* anything a randomizer (plinko, roulette, and so on) may pick from: parked tasks not marked as excluded */
  function randPool(){return S.tasks.filter(function(t){return !t.done&&!t.nr})}
  function taskTags(t){
    var g='',d=dueOf(t);
    if(t.ex)g+=tag('Example');
    g+=tag(t.mins?fmtMins(t.mins):'No time guess');
    if(t.w==='big')g+=tag('Big');else if(t.w==='small')g+=tag('Small');
    if(t.fun)g+=tag('Fun');
    if(d)g+=tag('By '+dayLabel(d));
    if(t.nr)g+=tag('Not in randomizers');
    if(t.work&&t.work.length)g+=tag('Worked on '+t.work.length+(t.work.length===1?' time':' times'));
    return '<span class="tags">'+g+'</span>';
  }

  /* self care: what the "parking lot" card turns into when the battery is low */
  var CARE0=['Drink a full glass of water','Make a cup of tea','Take a warm shower','Step outside for five minutes','Stretch your neck and shoulders','Lie down with your eyes closed for ten minutes','Put on a favorite album','Sit with §C for a few minutes','Wrap up in something soft','Eat something small and easy'];
  S.care=load('gs-care',null);if(!Array.isArray(S.care)||!S.care.length)S.care=CARE0.slice();
  S.careIdx=Math.floor(Math.random()*S.care.length);
  function careCard(){
    var u=U(),c=S.care[S.careIdx%S.care.length];
    return '<div class="card"><h3>'+esc(u.charge)+'</h3><div class="sugg"><b>'+esc(c)+'</b><span class="small">'+esc(u.chargeSub)+'</span></div><div class="row"><button class="btn grow" data-a="caredid">I did this</button><button class="btn alt grow" data-a="carenext">Another one</button></div><details class="tuck"><summary>Add your own</summary><form class="add" data-a="careadd"><input type="text" id="careq" placeholder="e.g. Water the plants slowly" aria-label="Add a self care idea"><button type="submit">Add</button></form></details></div>';
  }
  function suggBlock(pk,u,startLabel,soft){
    var t=pk.t,fs=firstStep(t);
    var h='<div class="sugg"><b>'+esc(t.title)+'</b><span class="small">'+esc(pk.why)+'</span>';
    if(S.logic==='tiny')h+='<span><b style="font-size:16px">Just:</b> '+esc(fs?fs.t:'open it and look at it for one minute.')+'</span>';
    else if(fs)h+='<span class="small">First step: '+esc(fs.t)+'</span>';
    else if(pk.partial)h+='<span class="small">First piece: open it and look at it for a minute.</span>';
    h+=taskTags(t)+'</div><div class="row"><button class="btn'+(soft?' alt':'')+' grow" data-a="tkstart" data-v="'+esc(t.id)+'">'+esc(startLabel||u.start)+'</button><button class="btn alt grow" data-a="tkanother" data-v="'+esc(t.id)+'">'+esc(u.another)+'</button></div><div class="row"><button class="quiet" data-a="tklater" data-v="'+esc(t.id)+'">'+esc(u.later)+'</button></div>';
    return h;
  }

  /* ---- plinko: a ball picks one of the tasks that fit right now ---- */
  var PLN=5;
  function plPool(){return rank(function(t){return !t.nr}).list.map(function(x){return x.t})}
  function plSample(list){var a=list.slice(),o=[];while(a.length&&o.length<PLN){o.push(a.splice(Math.floor(Math.random()*a.length),1)[0])}return o}
  function plPath(n,k){
    /* pick the landing slot first (so every task is equally likely), then shuffle the lefts and rights that lead there */
    var st=[],i;for(i=0;i<n-1;i++)st.push(i<k?1:0);
    for(i=st.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=st[i];st[i]=st[j];st[j]=t}
    return st;
  }
  function plGeo(n,path){
    var dx=150/n,rows=n-1,y0=34,gap=rows>1?150/(rows-1):0,pegs=[],way=[[150,8]],x=150,s,j;
    for(s=0;s<rows;s++){for(j=0;j<=s;j++)pegs.push([150+(2*j-s)*dx,y0+s*gap])}
    for(s=0;s<rows&&path&&path.length;s++){way.push([x,y0+s*gap-8]);x+=(path[s]?1:-1)*dx}
    if(path&&path.length)way.push([x,212]);
    return {dx:dx,pegs:pegs,way:way};
  }
  function plDrop(){var P=S.pl,n=P.ids.length;P.k=Math.floor(Math.random()*n);P.path=plPath(n,P.k);P.phase='fall';P.drops=(P.drops||0)+1}
  function plLand(){if(!S.pl)return;plAnimate.id++;S.pl.phase='done';render()}
  function plAnimate(){
    var P=S.pl;if(!P||P.phase!=='fall')return;
    if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){plLand();return}
    var pts=plGeo(P.ids.length,P.path).way,seg=pts.length-1,T=2400,t0=null,id=++plAnimate.id;
    function ease(u){return u*u*(3-2*u)}
    function f(ts){
      if(plAnimate.id!==id||!S.pl||S.pl.phase!=='fall')return;
      var b=document.getElementById('plball');if(!b)return;
      if(t0===null)t0=ts;
      var p=Math.min(1,(ts-t0)/T),q=p*seg,i=Math.min(seg-1,Math.floor(q)),u=q-i,a=pts[i],c=pts[i+1];
      b.setAttribute('cx',(a[0]+(c[0]-a[0])*ease(u)).toFixed(1));
      b.setAttribute('cy',(a[1]+(c[1]-a[1])*Math.pow(u,1.6)).toFixed(1));
      if(p>=1)plLand();else requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
  }
  plAnimate.id=0;
  function plBtn(){
    if(plPool().length<2)return '';
    var u=U(),hot=S.skipPark.length>=2;
    return (hot?'<p class="small">Cannot decide? Let it fall.</p>':'')+'<div class="row"><button class="'+(hot?'btn alt grow':'quiet')+'" data-a="plopen">'+esc(u.plbtn)+'</button></div>';
  }
  function plSheet(){
    var P=S.pl;if(!P)return '';
    var u=U(),n=P.ids.length,g=plGeo(n,P.path),tasks=P.ids.map(taskById).filter(Boolean),done=P.phase==='done',i;
    var h='<div class="backdrop" data-a="plbg"><div class="sheet plsheet" role="dialog" aria-modal="true" aria-label="'+esc(u.plinko)+'"><div class="between"><h2 style="font-size:24px">'+esc(u.plinko)+'</h2><button class="x" data-a="plclose" aria-label="Close">&times;</button></div>';
    h+='<p class="small">'+(done?'Landed. These all fit the time you have, so any of them is a fine pick.':'Everything on the board fits the time you have right now. Tap the board to skip the wait.')+'</p>';
    h+='<div class="plboard"'+(done?'':' data-a="plskip"')+'><svg viewBox="0 0 300 260" role="img" aria-label="Plinko board with '+n+' slots">';
    for(i=0;i<n;i++){h+='<rect x="'+(300*i/n+2)+'" y="200" width="'+(300/n-4)+'" height="52" rx="8" style="fill:var(--c'+i+');opacity:'+(done&&P.k===i?'.9':'.28')+'"/><text x="'+(300*(i+.5)/n)+'" y="246" text-anchor="middle" style="fill:var(--ink);font:700 15px var(--font-body)">'+(i+1)+'</text>'}
    g.pegs.forEach(function(p){h+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="3.4" style="fill:var(--ink2)"/>'});
    var bx=done?300*(P.k+.5)/n:150,by=done?212:8;
    h+='<circle id="plball" cx="'+bx+'" cy="'+by+'" r="7.5" style="fill:var(--accent);stroke:var(--ink);stroke-width:1.4"/></svg></div>';
    h+='<ol class="plleg">';
    tasks.forEach(function(t,j){h+='<li'+(done&&P.k===j?' class="win"':'')+'><i style="background:var(--c'+j+')">'+(j+1)+'</i><span>'+esc(t.title)+'</span></li>'});
    h+='</ol>';
    if(done&&tasks[P.k]){
      var w=tasks[P.k];
      h+='<div class="sugg"><b>'+esc(w.title)+'</b>'+taskTags(w)+'</div><div class="row"><button class="btn grow" data-a="plstart" data-v="'+esc(w.id)+'">'+esc(u.start)+'</button>'+(P.drops<2?'<button class="btn alt grow" data-a="plagain">Drop again</button>':'')+'</div>';
      h+='<div class="row"><button class="quiet" data-a="plclose">'+(P.drops<2?'Not now':'Maybe later')+'</button></div>';
      if(P.drops>=2)h+='<p class="small">That is the second drop, so this one is the pick. Closing leaves everything as it was.</p>';
    }else h+='<div class="row"><button class="quiet" data-a="plskip">Skip the wait</button></div>';
    return h+'</div></div>';
  }
  function parkCard(){
    if(basicsDay())return careCard();
    var u=U(),open=S.tasks.filter(function(t){return !t.done}).length;
    var h='<div class="card"><div class="between"><h3>'+esc(u.park)+'</h3><button class="addbtn" data-a="lot">Open</button></div>';
    if(!open)h+='<p class="small">Nothing here yet. Add anything nebulous whenever it pops into your head.</p>';
    else if(creature()&&S.mood==='energetic'){
      var top=rank().list.slice(0,3);
      if(!top.length)h+='<p class="small">That is everything for now. They come back tomorrow.</p>';
      else{
        h+='<p class="small">Energy is up, so here is what the stash has for you. Pick one, or pick them all.</p>';
        top.forEach(function(x){h+='<div class="sugg"><b>'+esc(x.t.title)+'</b>'+taskTags(x.t)+'<div class="row"><button class="btn grow" data-a="tkstart" data-v="'+esc(x.t.id)+'">'+esc(u.start)+'</button><button class="quiet" data-a="tklater" data-v="'+esc(x.t.id)+'">'+esc(u.later)+'</button></div></div>'});
      }
    }else if(creature()&&S.mood==='dreamy'){
      var fun=pickTask(function(t){return t.fun}),hard=pickTask(function(t){return !t.fun});
      if(!fun&&!hard)h+='<p class="small">That is everything for now. They come back tomorrow.</p>';
      if(fun)h+='<p class="small">Fun is on the menu today.</p>'+suggBlock(fun,u,'Start this one',true);
      if(hard)h+='<div class="note">'+(fun?'The important one will keep: <b>'+esc(hard.t.title)+'</b>. Doing it first is worth a little celebration, and fun first is allowed too. You are never not allowed to have fun.':'Nothing fun is stashed yet. When you are ready, the important one is <b>'+esc(hard.t.title)+'</b>.')+'</div><div class="row"><button class="btn hot grow" data-a="tkhard" data-v="'+esc(hard.t.id)+'">Hard one first</button></div>';
    }else{
      var pk=pickTask();
      if(!pk)h+='<p class="small">That is all the suggestions for now. They come back tomorrow.</p>';
      else h+=suggBlock(pk,u);
    }
    return h+plBtn()+'</div>';
  }
  function doingHero(t){
    var fs=firstStep(t),u=U();
    if(S.askMore){
      var allSteps=t.steps.length>0&&!fs;
      return '<section class="hero" aria-live="polite"><div class="kicker">Nice work</div><h2>That counts. Keep going?</h2><p class="sub">'+esc(t.title)+(fs?'. Next small piece: '+esc(fs.t):'')+(allSteps?'. Every step is ticked.':'.')+' It is saved on the task that you worked on it.</p><div class="row"><button class="btn grow" data-a="tkcont">Keep going</button><button class="btn alt grow" data-a="tkpause">I am done for now</button></div>'+(allSteps?'<div class="row"><button class="quiet" data-a="tkfinish">Mark the whole task done</button></div>':'')+'</section>';
    }
    return '<section class="hero" aria-live="polite"><div class="kicker">Working on it</div><h2>'+esc(t.title)+'</h2><p class="sub">'+esc(fs?'Next small piece: '+fs.t:'Just start. Ten minutes counts, and so does less.')+'</p><div class="row"><button class="btn grow" data-a="tkfinish">All done</button><button class="btn alt grow" data-a="tkstep">'+(fs?'Did that step':'Did some of it')+'</button></div><div class="row"><button class="quiet" data-a="tkstop">'+esc(u.back)+'</button></div></section>';
  }
  function bay(t,n,doneRow){
    var chk=doneRow?'<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.5l3 3 6-7"/></svg>':'';
    var nd=t.steps.filter(function(x){return x.done}).length;
    return '<div class="bay" data-n="'+(doneRow?'':'P'+n)+'"><button class="check" role="checkbox" aria-checked="'+(!!doneRow)+'" aria-label="'+(doneRow?'Move back: ':'Mark done: ')+esc(t.title)+'" data-a="'+(doneRow?'tkundo':'tkdone')+'" data-v="'+esc(t.id)+'">'+chk+'</button><button class="body" data-a="tkopen" data-v="'+esc(t.id)+'"><b'+(doneRow?' style="text-decoration:line-through;opacity:.7"':'')+'>'+esc(t.title)+'</b>'+(doneRow?'':taskTags(t)+(t.steps.length?'<span class="small">'+nd+' of '+t.steps.length+' steps</span>':''))+'</button></div>';
  }
  function lotSheet(){
    if(!S.lot)return '';
    var u=U(),tab=S.lotTab;
    var h='<div class="lotbg" data-a="lbg"><aside class="lot'+(S.lotAnim?' enter':'')+'" role="dialog" aria-modal="true" aria-label="'+esc(u.lot)+'"><div class="between"><h2 class="lottitle">'+esc(u.lot)+'</h2><button class="x lotx" data-a="lclose" aria-label="Close">&times;</button></div>';
    h+='<div class="subtabs lotabs" role="group" aria-label="Sections"><button data-a="lottab" data-v="week" aria-pressed="'+(tab==='week')+'">Weekly</button><button data-a="lottab" data-v="month" aria-pressed="'+(tab==='month')+'">Monthly</button><button data-a="lottab" data-v="groups" aria-pressed="'+(tab==='groups')+'">Groups</button></div>';
    if(tab==='groups')h+='<div class="lotnote">Groups are coming. Think errands, house, or hobbies, each with its own little lot.</div>';
    else{
      h+='<form class="add lotadd" data-a="tkquick" data-h="'+tab+'"><input type="text" id="tkq" placeholder="'+(tab==='week'?'Something for this week':'Something for this month')+'" aria-label="Add something"><button type="submit">'+esc(u.parkIt)+'</button></form>';
      var list=S.tasks.filter(function(t){return !t.done&&(t.h||'week')===tab}).sort(function(a,b){
        var da=dueOf(a),db=dueOf(b);
        if(da&&db)return da<db?-1:da>db?1:0;
        if(da)return -1;if(db)return 1;
        return (b.created||0)-(a.created||0);
      });
      if(!list.length)h+='<div class="lotnote">An empty lot. Nice and quiet.</div>';
      else{h+='<div class="spaces">';list.forEach(function(t,i){h+=bay(t,i+1,false)});h+='</div>'}
    }
    var dn=S.tasks.filter(function(t){return t.done}).sort(function(a,b){return (b.doneAt||0)-(a.doneAt||0)});
    if(dn.length){h+='<details class="lotdone"><summary>Finished ('+dn.length+')</summary><div class="spaces">';dn.forEach(function(t){h+=bay(t,0,true)});h+='</div><button class="quiet" data-a="tkclear">Clear finished</button></details>'}
    return h+'</aside></div>';
  }
  function tkSheet(){
    var T=S.tk;if(!T)return '';
    var ttl=T.id?'Edit task':'Add a task';
    var h='<div class="backdrop" data-a="tkbg"><div class="sheet" role="dialog" aria-modal="true" aria-label="'+ttl+'"><div class="between"><h2 style="font-size:24px">'+ttl+'</h2><button class="x" data-a="tkclose" aria-label="Close">&times;</button></div>';
    if(T.err)h+='<div class="note" role="alert">'+esc(T.err)+'</div>';
    h+='<div class="grp"><div class="lab">What is it</div><input class="field" type="text" id="tk-title" value="'+esc(T.title)+'" placeholder="e.g. Call about the bill" aria-label="What is it"></div>';
    h+='<div class="grp"><div class="lab">Where it lives</div>'+evChips('tkh',T.h,[['week','This week'],['month','This month']])+'</div>';
    h+='<div class="grp"><div class="lab">How long might it take (optional)</div>'+evChips('tkmins',T.mins,[[0,'Not sure'],[5,'5 min'],[15,'15 min'],[30,'30 min'],[60,'1 hr'],[120,'2 hr+']])+'</div>';
    h+='<div class="grp"><div class="lab">How much it matters (optional)</div>'+evChips('tkw',T.w,[['small','Small'],['med','Medium'],['big','Big']])+'</div>';
    h+='<div class="grp"><div class="lab">A date, only if it really has one (optional)</div><input class="field" type="date" id="tk-due" value="'+esc(T.due)+'" aria-label="Date">'+(T.due?'<button class="quiet" data-a="tkclr" style="align-self:flex-start">No date</button>':'')+'</div>';
    h+='<div class="grp"><label class="fl"><input type="checkbox" id="tk-fun"'+(T.fun?' checked':'')+'> A fun or creative one</label><label class="fl"><input type="checkbox" id="tk-nr"'+(T.nr?' checked':'')+'> Keep this out of the plinko and any other randomizer</label></div>';
    h+='<div class="grp"><div class="lab">Tiny steps (optional)</div>';
    if(T.steps.length){h+='<ul class="items" style="margin-top:0">';T.steps.forEach(function(x,i){
      h+='<li class="item'+(x.done?' done':'')+'"><button class="check" role="checkbox" aria-checked="'+x.done+'" aria-label="'+esc(x.t)+'" data-a="tkstepdone" data-i="'+i+'">'+(x.done?'<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.5l3 3 6-7"/></svg>':'')+'</button><span class="t">'+esc(x.t)+'</span><button class="x" aria-label="Remove step" data-a="tkstepdel" data-i="'+i+'">&times;</button></li>';
    });h+='</ul>'}
    h+='<div class="add" style="margin-top:0"><input type="text" id="tk-step" placeholder="Add a step" aria-label="Add a step" value="'+esc(T.newStep)+'"><button type="button" data-a="tkstepadd">Add</button></div>';
    if(!S.noAI)h+='<button class="quiet" data-a="tkbreak" style="align-self:flex-start"'+(S.tkBusy?' disabled':'')+'>'+(S.tkBusy?'Thinking...':'Break it into tiny steps for me')+'</button>';
    h+='</div>';
    if(T.work&&T.work.length)h+='<p class="small">Worked on '+T.work.length+(T.work.length===1?' time':' times')+', most recently '+esc(new Date(T.work[T.work.length-1]).toLocaleDateString(undefined,{month:'short',day:'numeric'}))+'.</p>';
    h+='<button class="btn" data-a="tksave">Save</button>'+(T.id?'<button class="btn alt" data-a="tkgo">Start this now</button><button class="quiet" data-a="tkdel">Delete</button>':'')+'<button class="quiet" data-a="tkclose">Cancel</button></div></div>';
    return h;
  }
  function syncTk(){
    var T=S.tk;if(!T)return;
    [['tk-title','title'],['tk-due','due'],['tk-step','newStep']].forEach(function(p){var e=document.getElementById(p[0]);if(e)T[p[1]]=e.value});
    var nr=document.getElementById('tk-nr'),fn=document.getElementById('tk-fun');
    if(nr)T.nr=nr.checked;if(fn)T.fun=fn.checked;
  }
  function commitStep(){var T=S.tk,v=T.newStep.trim();if(v&&T.steps.length<12){T.steps.push({t:v.slice(0,80),done:false})}T.newStep=''}
  function finishNote(id){
    if(S.celeb===id){S.celeb=null;render();celebrate();toast('The hard one first. That deserves a little parade.')}
    else{render();toast('Done. Nice.')}
  }
  function celebrate(){
    var c=document.createElement('div');c.className='confetti';c.setAttribute('aria-hidden','true');
    for(var i=0;i<28;i++){var p=document.createElement('i');p.style.left=(Math.random()*100)+'%';p.style.background='var(--c'+(i%8)+')';p.style.animationDelay=(Math.random()*.6)+'s';p.style.transform='rotate('+Math.floor(Math.random()*180)+'deg)';c.appendChild(p)}
    document.body.appendChild(c);setTimeout(function(){c.remove()},2800);
  }

  /* ---- planner view (On the clock): the whole day, hour by hour ---- */
  function planItem(x){
    if(x.k==='r'){var st=S.status[x.id];return '<button class="pi r'+(st==='done'?' done':st==='skip'?' skip':'')+'" data-a="ptog" data-v="'+x.id+'"><b>'+esc(nmOf(x.id))+'</b><small>'+fmtRange(x.start,x.dur)+'</small></button>'}
    var ev=x.ev;return '<button class="pi e" data-a="evedit" data-v="'+esc(ev.id)+'"><b>'+esc(ev.title)+'</b><small>'+fmtRange(x.start,x.dur)+(ev.place?', '+esc(ev.place):'')+'</small></button>';
  }
  function plannerCard(){
    var tk=ymd(new Date()),now=SIM[S.part],items=[],rows='';
    ['morning','afternoon','evening'].forEach(function(p){PARTS[p].steps.forEach(function(id){var sc=schedOf(id);if(sc)items.push({k:'r',id:id,start:sc.start,dur:TIMES[id][1]})})});
    evsOn(tk).forEach(function(ev){items.push({k:'e',ev:ev,start:tmin(ev.time),dur:ev.dur||60})});
    var H0=7,H1=22;
    for(var hr=H0;hr<=H1;hr++){
      var a=hr*60,b=a+60,cell='';
      items.filter(function(x){return hr===H0?x.start<b:hr===H1?x.start>=a:(x.start>=a&&x.start<b)}).sort(function(x,y){return x.start-y.start}).forEach(function(x){cell+=planItem(x)});
      items.forEach(function(x){if(x.k==='e'&&x.start<a&&x.start+x.dur>a)cell+='<span class="pi cont">'+esc(x.ev.title)+' continues</span>'});
      var here=now>=a&&now<b;
      rows+='<div class="hr"><span class="hl">'+fmt(a)+'</span><div class="hb">'+cell+(here?'<span class="nowline" style="top:'+Math.round((now-a)/60*100)+'%"><em>now</em></span>':'')+'</div></div>';
    }
    return '<div class="card"><div class="between"><h3>Today, hour by hour</h3><button class="addbtn" data-a="evnew">+ Add</button></div><div class="planner">'+rows+'</div><p class="small">Tap a routine step to check it off, or a plan to edit it.</p></div>';
  }

  /* ---- overview: the week or month at a glance ---- */
  function ovMonthStart(){var n=new Date();return new Date(n.getFullYear(),n.getMonth()+S.ovMo,1)}
  function ovWeek(){
    var h='',now=SIM[S.part];
    for(var i=0;i<7;i++){
      var d=addDays(new Date(),i),k=ymd(d),evs=evsOn(k);
      h+='<div class="card"><div class="between"><h3>'+esc(dayLabel(k))+' <span class="small" style="font-family:var(--font-body)">'+esc(d.toLocaleDateString(undefined,{month:'short',day:'numeric'}))+'</span></h3><button class="addbtn" data-a="evnewon" data-v="'+k+'">+ Add</button></div>';
      if(!evs.length)h+='<p class="small">Open.</p>';
      else{h+='<div class="evlist">';evs.forEach(function(ev){h+=evRow(ev,k,now,true)});h+='</div>'}
      h+='</div>';
    }
    return h;
  }
  function ovMonth(){
    var ms=ovMonthStart(),y=ms.getFullYear(),m=ms.getMonth(),label=ms.toLocaleDateString(undefined,{month:'long',year:'numeric'});
    var h='<div class="monthnav"><button class="navbtn" data-a="ovprev" aria-label="Previous month">&lsaquo;</button><h2>'+esc(label)+'</h2><button class="navbtn" data-a="ovnext" aria-label="Next month">&rsaquo;</button></div>';
    h+='<div class="cal" role="grid" aria-label="'+esc(label)+'">';
    DOW.forEach(function(d){h+='<div class="dow" aria-hidden="true">'+d+'</div>'});
    var first=new Date(y,m,1).getDay(),dim=new Date(y,m+1,0).getDate(),tk=ymd(new Date());
    for(var b=0;b<first;b++)h+='<div class="day blank" aria-hidden="true"></div>';
    for(var d=1;d<=dim;d++){
      var key=y+'-'+pad(m+1)+'-'+pad(d),evs=evsOn(key),tiles='';
      evs.slice(0,3).forEach(function(){tiles+='<span class="tile" style="background:var(--accent)"></span>'});
      if(evs.length>3)tiles+='<span class="more">+'+(evs.length-3)+'</span>';
      h+='<button class="day'+(key===tk?' today':'')+(S.ovDay===key?' sel':'')+'" data-a="ovday" data-k="'+key+'" aria-pressed="'+(S.ovDay===key)+'" aria-label="'+esc(ms.toLocaleDateString(undefined,{month:'long'}))+' '+d+', '+evs.length+' plans"><span>'+d+'</span><span class="tiles">'+tiles+'</span></button>';
    }
    h+='</div>';
    if(S.ovDay){
      var sk=S.ovDay,e2=evsOn(sk);
      h+='<div class="card"><div class="between"><h3>'+esc(parseKey(sk).toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'}))+'</h3><button class="addbtn" data-a="evnewon" data-v="'+sk+'">+ Add</button></div>';
      if(!e2.length)h+='<p class="small">Nothing planned.</p>';
      else{h+='<div class="evlist">';e2.forEach(function(ev){h+=evRow(ev,sk,SIM[S.part],true)});h+='</div>'}
      h+='</div>';
    }else h+='<p class="small">Tap a day to see its plans.</p>';
    return h;
  }
  function overview(){
    var u=U(),np=S.tasks.filter(function(t){return !t.done}).length;
    var h=head({title:'Overview',sub:'Your plans at a glance.'});
    h+='<div class="between" style="gap:10px"><div class="subtabs" role="group" aria-label="Overview range" style="flex:1"><button data-a="ovv" data-v="week" aria-pressed="'+(S.ovv==='week')+'">Week</button><button data-a="ovv" data-v="month" aria-pressed="'+(S.ovv==='month')+'">Month</button></div><button class="psign" data-a="lot" aria-label="Open '+esc(u.lot)+'"><b>P</b><span>'+esc(u.lot)+'</span>'+(np?'<i>'+np+'</i>':'')+'</button></div>';
    return h+(S.ovv==='week'?ovWeek():ovMonth());
  }

  /* ---- sample entries so the log calendar has something to show ---- */
  function seedSamples(){
    if(load('gs-seeded',false))return;
    var now=new Date(),add=[],every=['Rough morning','Slept badly','Good hobby session','Watered plants'];
    function pick(a){return a[Math.floor(Math.random()*a.length)]}
    function many(a,n){var c=a.slice(),o=[];while(o.length<n&&c.length)o.push(c.splice(Math.floor(Math.random()*c.length),1)[0]);return o}
    [-1,0].forEach(function(mo){
      var y=new Date(now.getFullYear(),now.getMonth()+mo,1),last=mo===0?now.getDate():new Date(y.getFullYear(),y.getMonth()+1,0).getDate();
      for(var d=1;d<=last;d++){
        var r=Math.random(),n=r<.3?0:r<.78?1:2;
        for(var i=0;i<n;i++){
          var dt=new Date(y.getFullYear(),y.getMonth(),d,9+Math.floor(Math.random()*10),pick([0,15,30,45])),mig=Math.random()<.22;
          var en={label:mig?'Migraine':pick(every),ts:dt.toISOString(),when:dt.toLocaleDateString(undefined,{month:'short',day:'numeric'})+', '+dt.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'}),smp:true};
          if(mig){
            en.sev=pick(SEVS);en.symp=many(S.opts.symp,1+Math.floor(Math.random()*3));
            var tr=Math.floor(Math.random()*3);if(tr)en.trig=many(S.opts.trig,tr);
            if(Math.random()<.6)en.meds=[pick(['Sample med A','Sample med B'])];
          }else colorOf(en.label);
          add.push(en);
        }
      }
    });
    S.log=S.log.concat(add).sort(function(a,b){return entryDate(a)-entryDate(b)});
    save('gs-log',S.log);save('gs-seeded',true);
  }

  function U(){var m=UIALT[S.logic];if(!m)return UI0;var o={},k;for(k in UI0)o[k]=UI0[k];for(k in m)o[k]=m[k];return o}
  function moodAlt(id){if(S.logic!=='mammal'||S.mood!=='dreamy')return null;if(id==='teeth')return {t:'Splash in the birdbath',s:'Teeth and face, before you leave the nest. A little splash and a little preening is plenty.'};if(id==='clothes')return {t:'Preen those feathers',s:'Out of pajamas and into something that feels like you. Same trip upstairs, then down you go.'};return null}
  function stepOf(id){var b=STEPS[id],a=moodAlt(id)||(ALT[S.logic]&&ALT[S.logic][id]),o={},k;for(k in b)o[k]=b[k];if(a)for(k in a)o[k]=a[k];return o}
  function nmOf(id){var a=moodAlt(id)||(ALT[S.logic]&&ALT[S.logic][id]);return a?(a.t||NAMES[id]):NAMES[id]}
  function schedOf(id){if(S.logic!=='clock'||!TIMES[id])return null;var b=TIMES[id],st=b[0]+S.shift;return {start:st,label:fmt(st)+' to '+fmt(st+b[1])}}

  /* ---- tile stacks ---- */
  S.stacks=load('gs-stacks',null);if(!Array.isArray(S.stacks))S.stacks=[];
  if(!S.stacks.some(function(x){return x.id==='mig'}))S.stacks.unshift({id:'mig',name:'Migraine',builtin:true,kids:[]});
  S.openStacks=[];S.ns=null;
  function allTiles(){return BASE_CHIPS.filter(function(c){return c!=='Migraine'}).concat(S.custom)}
  function stackById(id){for(var i=0;i<S.stacks.length;i++)if(S.stacks[i].id===id)return S.stacks[i];return null}
  function stackOf(label){for(var i=0;i<S.stacks.length;i++)if(S.stacks[i].kids.indexOf(label)>=0)return S.stacks[i];return null}
  function topTiles(){return allTiles().filter(function(c){return !stackOf(c)})}
  function removeKid(label){S.stacks.forEach(function(x){var i=x.kids.indexOf(label);if(i>=0)x.kids.splice(i,1)})}
  function cleanStacks(){
    var all=allTiles();
    S.stacks.forEach(function(x){x.kids=x.kids.filter(function(k){return all.indexOf(k)>=0})});
    S.stacks=S.stacks.filter(function(x){return x.builtin||x.kids.length});
    S.openStacks=S.openStacks.filter(function(id){return !!stackById(id)});
  }
  cleanStacks();
  function isOpen(st){return st.id==='mig'?S.f.sels.indexOf('Migraine')>=0:S.openStacks.indexOf(st.id)>=0}
  function stackSelCount(st){return st.kids.filter(function(k){return S.f.sels.indexOf(k)>=0}).length}

  /* ---- plans: appointments and other events ---- */
  var SIM={morning:615,afternoon:810,evening:1140}; /* prototype clock: 10:15, 1:30 PM, 7:00 PM */
  function pad(n){return (n<10?'0':'')+n}
  function ymd(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
  function addDays(d,n){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate());x.setDate(x.getDate()+n);return x}
  function parseKey(k){var p=k.split('-');return new Date(+p[0],+p[1]-1,+p[2])}
  function tmin(t){var p=String(t).split(':');return (+p[0])*60+(+p[1]||0)}
  function fmt(m){m=((m%1440)+1440)%1440;var h=Math.floor(m/60),mm=m%60,ap=h>=12?'PM':'AM',h12=h%12||12;return h12+(mm?':'+pad(mm):'')+' '+ap}
  function fmtRange(st,dur){
    if(!dur)return fmt(st);
    var a=fmt(st),b=fmt(st+dur),ap=a.slice(-2);
    return (ap===b.slice(-2)?a.slice(0,-3):a)+' to '+b;
  }
  function dayLabel(k){
    var t=ymd(new Date());if(k===t)return 'Today';
    if(k===ymd(addDays(new Date(),1)))return 'Tomorrow';
    return parseKey(k).toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
  }
  S.events=load('gs-events',null);
  if(!Array.isArray(S.events))S.events=[
    {id:'e1',title:'Walk with a friend',ex:true,off:0,time:'12:00',dur:120,place:'',travel:20,prep:'Pack your gear',withJ:false,share:'full'},
    {id:'e2',title:'Dentist',ex:true,off:0,time:'15:00',dur:60,place:'Main Street clinic',travel:45,prep:'Bring your insurance card',withJ:false,share:'full'},
    {id:'e3',title:'Dinner out',ex:true,off:1,time:'19:00',dur:90,place:'',travel:15,prep:'',withJ:true,share:'full'}
  ];
  S.ev=null;S.evReady={};S.evHide={};
  function evDate(ev){return ev.ex?ymd(addDays(new Date(),ev.off||0)):ev.date}
  function evsOn(k){return S.events.filter(function(ev){return evDate(ev)===k}).sort(function(a,b){return tmin(a.time)-tmin(b.time)})}
  function leaveBy(ev){return tmin(ev.time)-(ev.travel?ev.travel+10:0)}
  function urgentEv(){
    var now=SIM[S.part],tk=ymd(new Date()),best=null;
    evsOn(tk).forEach(function(ev){
      var st=tmin(ev.time);
      if(now>=st||S.evReady[ev.id]||S.evHide[ev.id])return;
      if(now>=leaveBy(ev)-U().win&&!best)best=ev;
    });
    return best;
  }
  function tag(t,c){return '<span class="tag'+(c?' '+c:'')+'">'+esc(t)+'</span>'}
  function evRow(ev,key,now,qt){
    var st=tmin(ev.time),end=st+(ev.dur||0),isToday=key===ymd(new Date());
    var past=isToday&&now>=(ev.dur?end:st+30),cur=isToday&&!past&&now>=st,tags='';
    if(ev.ex)tags+=tag('Example');
    if(cur)tags+=tag('Now','now');
    if(isToday&&!past&&!cur&&ev.travel)tags+=tag('Leave by '+fmt(leaveBy(ev)),'now');
    if(S.evReady[ev.id]&&!past)tags+=tag('Ready');
    if(ev.withJ)tags+=tag('With §P');
    if(ev.share==='generic')tags+=tag('Shows as "Appointment"');
    if(ev.share==='hidden')tags+=tag('Private');
    return '<button class="ev'+(past?' past':'')+'" data-a="evedit" data-v="'+esc(ev.id)+'"><span class="tm">'+fmt(st)+'<small>'+((isToday||qt)?(ev.dur?'to '+fmt(end):''):esc(dayLabel(key)))+'</small></span><span class="bd"><b>'+esc(ev.title)+'</b>'+(ev.place?'<span class="small">'+esc(ev.place)+'</span>':'')+(tags?'<span class="tags">'+tags+'</span>':'')+'</span></button>';
  }
  function plans(){
    var tk=ymd(new Date()),now=SIM[S.part],td=evsOn(tk);
    var h='<div class="card"><div class="between"><h3>'+esc(U().plans)+'</h3><button class="addbtn" data-a="evnew">+ Add</button></div>';
    if(!td.length)h+='<p class="small">Nothing on the calendar today. Nothing to get ready for.</p>';
    else{h+='<div class="evlist">';td.forEach(function(ev){h+=evRow(ev,tk,now)});h+='</div>'}
    var up='';
    for(var i=1;i<=7;i++){var k=ymd(addDays(new Date(),i));evsOn(k).forEach(function(ev){up+=evRow(ev,k,now)})}
    if(up)h+='<div class="dayhead">'+esc(U().up)+'</div><div class="evlist">'+up+'</div>';
    return h+'</div>';
  }
  function newEv(){return {id:null,title:'',dk:'today',dateVal:'',time:'',dur:60,place:'',travel:0,prep:'',withJ:false,share:'full',err:''}}
  function syncEv(){
    var E=S.ev;if(!E)return;
    [['ev-title','title'],['ev-time','time'],['ev-place','place'],['ev-prep','prep'],['ev-date','dateVal']].forEach(function(p){var e=document.getElementById(p[0]);if(e)E[p[1]]=e.value});
  }
  function evChips(act,cur,list){
    var h='<div class="chips sm">';
    list.forEach(function(o){h+='<button data-a="'+act+'" data-v="'+o[0]+'" aria-pressed="'+(String(cur)===String(o[0]))+'">'+o[1]+'</button>'});
    return h+'</div>';
  }
  function evSheet(){
    var E=S.ev;if(!E)return '';
    var ttl=E.id?'Edit plan':'Add a plan';
    var h='<div class="backdrop" data-a="evbg"><div class="sheet" role="dialog" aria-modal="true" aria-label="'+ttl+'"><div class="between"><h2 style="font-size:24px">'+ttl+'</h2><button class="x" data-a="evclose" aria-label="Close">&times;</button></div>';
    if(E.err)h+='<div class="note" role="alert">'+esc(E.err)+'</div>';
    h+='<div class="grp"><div class="lab">What is it</div><input class="field" type="text" id="ev-title" value="'+esc(E.title)+'" placeholder="e.g. Dentist" aria-label="What is it"><div class="chips sm" style="margin-top:8px">';
    ['Appointment','Hobby','Dinner out','Call','Errand'].forEach(function(q){h+='<button data-a="evquick" data-v="'+q+'">'+q+'</button>'});
    h+='</div></div>';
    h+='<div class="grp"><div class="lab">When</div>'+evChips('evday',E.dk,[['today','Today'],['tomorrow','Tomorrow'],['other','Another day']]);
    if(E.dk==='other')h+='<input class="field" type="date" id="ev-date" value="'+esc(E.dateVal)+'" aria-label="Date" style="margin-top:8px">';
    h+='<input class="field" type="time" id="ev-time" value="'+esc(E.time)+'" aria-label="Start time" style="margin-top:8px"></div>';
    h+='<div class="grp"><div class="lab">How long</div>'+evChips('evdur',E.dur,[[0,'No end time'],[30,'30 min'],[60,'1 hr'],[90,'1.5 hr'],[120,'2 hr'],[180,'3 hr']])+'</div>';
    h+='<div class="grp"><div class="lab">Where (optional)</div><input class="field" type="text" id="ev-place" value="'+esc(E.place)+'" placeholder="e.g. Main Street clinic" aria-label="Where"></div>';
    h+='<div class="grp"><div class="lab">Travel time (optional)</div>'+evChips('evtravel',E.travel,[[0,'None'],[10,'10 min'],[20,'20 min'],[30,'30 min'],[45,'45 min'],[60,'1 hr']])+'<p class="small">Used to tell you when to start getting ready. It adds 10 minutes of buffer.</p></div>';
    h+='<div class="grp"><div class="lab">Before you go (optional)</div><input class="field" type="text" id="ev-prep" value="'+esc(E.prep)+'" placeholder="e.g. Bring your insurance card" aria-label="Before you go"></div>';
    h+='<div class="grp"><div class="lab">§P</div><div class="chips sm"><button data-a="evwj" aria-pressed="'+E.withJ+'">§P is coming too</button></div>'
      +'<div class="lab" style="margin-top:8px">What §P sees</div>'+evChips('evshare',E.share,[['full','Show details'],['generic','Just "Appointment"'],['hidden','Keep private']])+'</div>';
    h+='<button class="btn" data-a="evsave">Save</button>'+(E.id?'<button class="quiet" data-a="evdel">Delete this plan</button>':'')+'<button class="quiet" data-a="evclose">Cancel</button></div></div>';
    return h;
  }
  function nameSheet(){
    if(!S.ns)return '';
    var st=stackById(S.ns.id);if(!st)return '';
    return '<div class="backdrop" data-a="nbg"><div class="sheet" role="dialog" aria-modal="true" aria-label="Name this stack"><h2 style="font-size:22px">Name this stack</h2><p class="small">It holds: '+esc(st.kids.join(', '))+'.</p><input class="field" type="text" id="stackname" maxlength="24" value="'+esc(S.ns.name)+'" aria-label="Stack name"><button class="btn" data-a="namestack">Save name</button><button class="quiet" data-a="unstack" data-v="'+esc(st.id)+'">Ungroup these tiles</button><button class="quiet" data-a="ncancel">Keep the name "'+esc(st.name)+'"</button></div></div>';
  }
  function focusName(){var i=document.getElementById('stackname');if(i){i.focus();i.select()}}
  function toggleSel(l){var i=S.f.sels.indexOf(l);if(i>=0){S.f.sels.splice(i,1);if(l==='Migraine'){S.f.sev=null;S.f.meds=[];S.f.trig=[];S.f.symp=[]}}else S.f.sels.push(l)}

  function colorOf(label){
    if(S.colors[label]===undefined){var n=Object.keys(S.colors).length;S.colors[label]=n%8;save('gs-colors',S.colors)}
    return 'var(--c'+(S.colors[label]%8)+')';
  }
  function steps(){if(lowMode())return LOWSTEPS[S.part];return (S.part==='morning'&&S.floor)?FLOOR:PARTS[S.part].steps}
  function nextId(){var a=steps();for(var i=0;i<a.length;i++){if(!S.status[a[i]])return a[i]}return null}
  function toast(m){var t=document.getElementById('toast');t.textContent=fxt(m);t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(function(){t.hidden=true},3200)}
  function keepAll(fn){var m={};document.querySelectorAll('input[type=text],input[type=time],input[type=date]').forEach(function(i){if(i.id)m[i.id]=i.value});fn();Object.keys(m).forEach(function(id){var e=document.getElementById(id);if(e)e.value=m[id]})}

  function roughRow(u){return (S.part==='morning'&&!lowMode())?'<div class="row">'+(S.floor?'<button class="quiet" data-a="unfloor">'+esc(u.unrough)+'</button>':'<button class="quiet" data-a="rough">'+esc(u.rough)+'</button>')+'</div>':''}
  function today(){
    var u=U(),d=new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
    var P=PARTS[S.part];
    var h=head({eyebrow:d,title:u.greet(P.label)});
    if(creature()){h+='<div class="sim"><small>How are you feeling today?</small><div class="seg mood">';Object.keys(MOODS).forEach(function(k){h+='<button data-a="mood" data-v="'+k+'" aria-pressed="'+(S.mood===k)+'">'+MOODS[k].name+'</button>'});h+='</div></div>'}
    if(!lowMode()){
      h+='<div class="sim"><small>Prototype control: see the day at</small><div class="seg">';
      ['morning','afternoon','evening'].forEach(function(k){h+='<button data-a="part" data-v="'+k+'" aria-pressed="'+(S.part===k)+'">'+PARTS[k].label+'</button>'});
      h+='</div></div>';
    }
    if(lowMode())h+='<div class="note">'+esc(u.lowNote)+'</div>';
    else if(S.part==='morning'&&S.floor)h+='<div class="note">'+esc(u.floorNote)+'</div>';
    var id=nextId(),ue=urgentEv();
    if(ue){
      var ust=tmin(ue.time),when=ue.travel?'Leave by '+fmt(leaveBy(ue))+' to be there at '+fmt(ust)+(ue.place?', '+ue.place:'')+'.':'Starts at '+fmt(ust)+(ue.place?', '+ue.place:'')+'.';
      h+='<section class="hero" aria-live="polite"><div class="kicker">Heads up</div><h2>Get ready for '+esc(ue.title)+'</h2><p class="sub">'+esc(when)+'</p>'+(ue.prep?'<p class="sub"><b>Before you go:</b> '+esc(ue.prep)+'</p>':'')
        +'<div class="row"><button class="btn grow" data-a="evready" data-v="'+esc(ue.id)+'">I am ready</button><button class="btn alt grow" data-a="evedit" data-v="'+esc(ue.id)+'">Edit or cancel</button></div><div class="row"><button class="quiet" data-a="evhide" data-v="'+esc(ue.id)+'">Show my routine for now</button></div></section>';
      if(S.doing&&taskById(S.doing))h+=doingHero(taskById(S.doing));
    }else if(S.doing&&taskById(S.doing)){
      h+=doingHero(taskById(S.doing));
    }else if(id){
      var st=stepOf(id),sc=schedOf(id);
      h+='<section class="hero" aria-live="polite"><div class="kicker">'+esc(sc?u.next+', '+sc.label:u.next)+'</div><h2>'+esc(st.t)+'</h2><p class="sub">'+esc(st.s)+'</p><div class="row">';
      if(st.meal){
        h+='<a class="btn grow" href="https://www.google.com/search?q=easy+breakfast+ideas" target="_blank" rel="noopener" data-a="recime">'+esc(u.food)+'</a><button class="btn alt grow" data-a="done" data-v="'+id+'">'+esc(u.eaten)+'</button>';
      }else if(st.lunch){
        h+='<button class="btn grow" data-a="lunch">'+esc(u.lunchBtn)+'</button><button class="btn alt grow" data-a="done" data-v="'+id+'">'+esc(u.eaten)+'</button>';
      }else{
        h+='<button class="btn grow" data-a="done" data-v="'+id+'">'+esc(st.c)+'</button>';
      }
      h+='</div><div class="row">';
      if(st.meal)h+='<button class="quiet" data-a="done" data-v="'+id+'">'+esc(u.picked)+'</button>';
      if(st.lunch)h+='<button class="quiet" data-a="lunchsolo">'+esc(u.solo)+'</button>';
      if(!st.floor)h+='<button class="quiet" data-a="skip" data-v="'+id+'">'+esc(u.skip)+'</button>';
      h+='</div>';
      if(S.logic==='clock')h+='<div class="row"><button class="quiet" data-a="slide">Running behind? Slide the rest 15 min later</button>'+(S.shift?'<button class="quiet" data-a="unslide">Reset times</button>':'')+'</div>';
      h+=roughRow(u)+'</section>';
    }else{
      var dn=(DONEALT[S.logic]&&DONEALT[S.logic][S.part])||P.done;
      h+='<section class="hero"><div class="kicker">'+esc(u.allset)+'</div><h2>'+esc(dn.t)+'</h2><p class="sub">'+esc(dn.s)+'</p>'+roughRow(u)+'</section>';
    }
    if(S.logic!=='clock')h+=plans();
    if(!id&&!S.doing)h+=parkCard();
    if(S.logic==='clock'){h+=plannerCard()}else{
    h+='<div class="card"><h3>'+esc(u.routine(S.part))+'</h3><ul class="steps">';
    var cur=nextId();
    steps().forEach(function(sid){
      var s=S.status[sid],sc2=schedOf(sid);
      var cls=s==='done'?'done':s==='skip'?'skipped':sid===cur?'now':'';
      var stt=s==='done'?'done':s==='skip'?'skipped':sid===cur?'next':'';
      if(!s&&sc2)stt=(sid===cur?'next, ':'')+fmt(sc2.start);
      h+='<li class="'+cls+'"><span class="dot"></span><span class="nm">'+esc(nmOf(sid))+'</span><em class="st">'+esc(stt)+'</em></li>';
    });
    h+='</ul></div>';
    }
    if(id&&!S.doing)h+=parkCard();
    h+='<div class="sect"><h3>'+esc(u.music)+'</h3><div class="music"><a class="btn alt" href="https://open.spotify.com" target="_blank" rel="noopener">Spotify</a><a class="btn alt" href="https://www.youtube.com" target="_blank" rel="noopener">YouTube playlist</a></div></div>';
    return h;
  }

  function lists(){
    var h=head({title:'Lists',sub:'Separate from today. Nothing here is due.'});
    h+='<div class="note">Sample items are marked. Edit, check off, or delete them. They are saved in this browser only.</div>';
    S.lists.forEach(function(L,li){
      var n=L.items.filter(function(i){return !i.done}).length;
      h+='<details class="card lcard"'+(li===0?' open':'')+' data-id="'+L.id+'"><summary><span>'+esc(L.name)+'</span><span class="count">'+n+' item'+(n===1?'':'s')+'</span></summary><ul class="items">';
      L.items.forEach(function(it,ii){
        h+='<li class="item'+(it.done?' done':'')+'"><button class="check" role="checkbox" aria-checked="'+it.done+'" aria-label="'+esc(it.t)+'" data-a="tick" data-l="'+li+'" data-i="'+ii+'">'+(it.done?'<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 7.5l3 3 6-7"/></svg>':'')+'</button><span class="t">'+esc(it.t)+'</span><button class="x" aria-label="Delete item" data-a="del" data-l="'+li+'" data-i="'+ii+'">&times;</button></li>';
      });
      h+='</ul><form class="add" data-a="additem" data-l="'+li+'"><input type="text" id="add-'+L.id+'" placeholder="Add to '+esc(L.name)+'" aria-label="Add to '+esc(L.name)+'"><button type="submit">Add</button></form></details>';
    });
    h+='<form class="card" data-a="newlist"><b>Start a new list</b><div class="add" style="margin-top:0"><input type="text" id="newlist" placeholder="e.g. Pet store, Gift ideas" aria-label="New list name"><button type="submit">Create</button></div></form>';
    return h;
  }

  /* picker for meds / triggers / symptoms: tap saved chips, or add a new one */
  function pickUI(kind,scope,sel){
    var K=KINDS[kind],h='<div class="grp"><div class="lab">'+K.label+' (optional)</div>';
    if(S.opts[kind].length){
      h+='<div class="chips sm" role="group" aria-label="'+K.label+'">';
      S.opts[kind].forEach(function(n){h+='<button data-a="togopt" data-k="'+kind+'" data-s="'+scope+'" data-v="'+esc(n)+'" aria-pressed="'+(sel.indexOf(n)>=0)+'">'+esc(n)+'</button>'});
      h+='</div>';
    }
    h+='<form class="add" data-a="addopt" data-k="'+kind+'" data-s="'+scope+'" style="margin-top:0"><input type="text" id="new-'+scope+'-'+kind+'" placeholder="'+K.add+'" aria-label="'+K.add+'"><button type="submit">Add</button></form></div>';
    return h;
  }
  function selOf(scope,kind){return scope==='rp'?S.rp.meds:S.f[kind]}
  function sevUI(cur,act){
    var h='<div class="grp"><div class="lab">How bad (optional)</div><div class="chips sm">';
    SEVS.forEach(function(v){h+='<button data-a="'+act+'" data-v="'+v+'" aria-pressed="'+(cur===v)+'"><span class="sw" style="background:'+SEVCOL[v]+'"></span>'+v+'</button>'});
    return h+'</div></div>';
  }
  function groupCount(){return (S.f.sev?1:0)+S.f.symp.length+S.f.trig.length+S.f.meds.length}

  function monthStart(){var n=new Date();return new Date(n.getFullYear(),n.getMonth()+S.mo,1)}
  function dkey(t){return t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()}
  function entryDate(en){return en.ts?new Date(en.ts):new Date()}
  function calendar(ms,byDay,tileColor,label){
    var y=ms.getFullYear(),m=ms.getMonth();
    var h='<div class="cal" role="grid" aria-label="'+esc(label)+'">';
    DOW.forEach(function(d){h+='<div class="dow" aria-hidden="true">'+d+'</div>'});
    var first=new Date(y,m,1).getDay(),dim=new Date(y,m+1,0).getDate(),tk=dkey(new Date());
    for(var b=0;b<first;b++)h+='<div class="day blank" aria-hidden="true"></div>';
    for(var d=1;d<=dim;d++){
      var key=y+'-'+(m+1)+'-'+d,list=byDay[key]||[];
      var cls='day'+(key===tk?' today':'')+(S.day===key?' sel':'');
      var tiles='';
      list.slice(0,4).forEach(function(r){tiles+='<span class="tile" style="background:'+tileColor(r.en)+'"></span>'});
      if(list.length>4)tiles+='<span class="more">+'+(list.length-4)+'</span>';
      h+='<button class="'+cls+'" data-a="day" data-k="'+key+'" aria-pressed="'+(S.day===key)+'" aria-label="'+esc(ms.toLocaleDateString(undefined,{month:'long'}))+' '+d+', '+list.length+' logged"><span>'+d+'</span><span class="tiles">'+tiles+'</span></button>';
    }
    return h+'</div>';
  }
  function entryLines(en){
    var l=[];
    if(en.sev)l.push(en.sev);
    if(en.symp&&en.symp.length)l.push('Symptoms: '+en.symp.join(', '));
    if(en.trig&&en.trig.length)l.push('Triggers: '+en.trig.join(', '));
    if(en.meds&&en.meds.length)l.push('Medications: '+en.meds.join(', '));
    if(!l.length&&en.detail)l.push(en.detail);
    return l;
  }
  function counts(rows,field){var c={};rows.forEach(function(r){(r.en[field]||[]).forEach(function(n){c[n]=(c[n]||0)+1})});return Object.keys(c).map(function(k){return [k,c[k]]}).sort(function(a,b){return b[1]-a[1]})}

  function tileBtn(c,from){
    var on=S.f.sels.indexOf(c)>=0;
    return '<button data-a="chip" data-v="'+esc(c)+'" data-drag="'+esc(c)+'"'+(from?' data-from="'+esc(from)+'"':' data-drop-tile="'+esc(c)+'"')+' aria-pressed="'+on+'"><span class="sw" style="background:'+colorOf(c)+'"></span>'+esc(c)+'</button>';
  }
  function stackBtn(st){
    var open=isOpen(st),sel=stackSelCount(st),n=(st.id==='mig'?groupCount():0)+sel,sw='';
    if(st.kids.length){sw='<span class="kss" aria-hidden="true">';st.kids.slice(0,4).forEach(function(k){sw+='<i class="ks" style="background:'+colorOf(k)+'"></i>'});sw+='</span>'}
    var pressed=st.id==='mig'?' aria-pressed="'+open+'"':'';
    return '<button class="gchip" data-a="stack" data-v="'+esc(st.id)+'" data-drop-stack="'+esc(st.id)+'"'+pressed+' aria-expanded="'+open+'">'+STACK+'<span>'+esc(st.name)+'</span>'+sw+(n?'<span class="gcount" aria-label="'+n+' selected">'+n+'</span>':'')+CHEV+'</button>';
  }
  function stackPanel(st){
    var mig=st.id==='mig',title=mig?GROUPS.Migraine.title:st.name;
    var h='<div class="gpanel" role="group" aria-label="'+esc(title)+'" data-drop-stack="'+esc(st.id)+'"><div class="gtitle">'+STACK+'<b>'+esc(title)+'</b>'+(mig?'<span class="small">all optional</span>':'<button class="quiet" style="margin-left:auto" data-a="rename" data-v="'+esc(st.id)+'">Rename</button>')+'</div>';
    if(mig)h+=sevUI(S.f.sev,'sev')+pickUI('symp','log',S.f.symp)+pickUI('trig','log',S.f.trig)+pickUI('meds','log',S.f.meds);
    if(st.kids.length){
      h+='<div class="grp"><div class="lab">'+(mig?'Also in this stack':'Pick any of these')+'</div><div class="chips sm">';
      st.kids.forEach(function(k){h+=tileBtn(k,st.id)});
      h+='</div><p class="small">Press and hold a tile, then drag it out to take it out of the stack.</p></div>';
    }
    if(!mig)h+='<button class="quiet" data-a="unstack" data-v="'+esc(st.id)+'">Ungroup these tiles</button>';
    return h+'</div>';
  }

  function logview(){
    var ms=monthStart(),y=ms.getFullYear(),m=ms.getMonth(),mig=S.lv==='migraine';
    var label=ms.toLocaleDateString(undefined,{month:'long',year:'numeric'});
    var h=head({title:'Log',sub:'Optional. Only what you choose to add.'});
    if(S.log.some(function(e){return e.smp}))h+='<div class="note">Some entries here are sample data, so the calendar has something to show. <button class="quiet" data-a="rmsample">Remove sample entries</button></div>';

    h+='<div class="card"><h3>Log something</h3>';
    if(S.day){var dq=S.day.split('-');h+='<p class="small">Adding to '+esc(new Date(+dq[0],+dq[1]-1,+dq[2]).toLocaleDateString(undefined,{month:'short',day:'numeric'}))+'. Tap the day again to go back to right now.</p>'}
    h+='<p class="small">Pick as many as you like. Stacked tiles hold more options. To make your own stack, press and hold a tile, then drag it onto another tile.</p><div class="chips">';
    S.stacks.forEach(function(st){h+=stackBtn(st)});
    topTiles().forEach(function(c){h+=tileBtn(c,'')});
    h+='</div>';
    S.stacks.forEach(function(st){if(isOpen(st))h+=stackPanel(st)});
    h+='<input class="field" type="text" id="custom" placeholder="Or track something new" aria-label="Track something new"><button class="btn" data-a="savelog">Save</button></div>';

    h+='<div class="subtabs" role="group" aria-label="Log view"><button data-a="lv" data-v="everyday" aria-pressed="'+(!mig)+'">Everyday</button><button data-a="lv" data-v="migraine" aria-pressed="'+mig+'">Migraine</button></div>';
    h+='<div class="monthnav"><button class="navbtn" data-a="prevmo" aria-label="Previous month">&lsaquo;</button><h2>'+esc(label)+'</h2><button class="navbtn" data-a="nextmo" aria-label="Next month"'+(S.mo>=0?' disabled':'')+'>&rsaquo;</button></div>';

    var rows=[];S.log.forEach(function(en,i){var t=entryDate(en);if(t.getFullYear()===y&&t.getMonth()===m&&((en.label==='Migraine')===mig))rows.push({en:en,i:i,t:t,k:dkey(t)})});
    var labels=[];rows.forEach(function(r){if(labels.indexOf(r.en.label)<0)labels.push(r.en.label)});
    var vis=mig?rows:rows.filter(function(r){return !S.hide[r.en.label]});
    var byDay={};vis.forEach(function(r){(byDay[r.k]=byDay[r.k]||[]).push(r)});

    h+=calendar(ms,byDay,mig?function(en){return SEVCOL[en.sev]||'var(--c7)'}:function(en){return colorOf(en.label)},label);
    if(mig){
      h+='<div class="legend">';SEVS.forEach(function(v){h+='<span><i class="sw" style="background:'+SEVCOL[v]+'"></i>'+v+'</span>'});h+='<span><i class="sw" style="background:var(--c7)"></i>Not rated</span></div>';
    }else if(labels.length){
      h+='<details class="filter" data-f="1"'+(S.filt?' open':'')+'><summary>Filter the calendar</summary><div>';
      labels.forEach(function(l){h+='<label class="fl"><input type="checkbox" data-a="tog" data-v="'+esc(l)+'"'+(S.hide[l]?'':' checked')+'><span class="sw" style="background:'+colorOf(l)+'"></span>'+esc(l)+'</label>'});
      h+='</div></details>';
    }

    if(mig&&rows.length){
      var days={};rows.forEach(function(r){days[r.k]=1});
      h+='<div class="card"><h3>This month</h3><p class="small">'+Object.keys(days).length+' migraine day'+(Object.keys(days).length===1?'':'s')+', '+rows.length+' entr'+(rows.length===1?'y':'ies')+'</p>';
      [['symp','Symptoms'],['trig','Triggers'],['meds','Medications']].forEach(function(g){
        var c=counts(rows,g[0]);if(!c.length)return;
        h+='<div class="grp"><div class="lab">'+g[1]+'</div>';
        c.forEach(function(p){h+='<div class="brow"><span>'+esc(p[0])+'</span><span class="small">'+p[1]+' &times;</span><span class="bar"><i style="width:'+Math.round(100*p[1]/rows.length)+'%"></i></span></div>'});
        h+='</div>';
      });
      h+='</div>';
    }

    var shown=S.day?vis.filter(function(r){return r.k===S.day}):vis;
    if(S.day){
      var dp=S.day.split('-'),dt=new Date(+dp[0],+dp[1]-1,+dp[2]);
      h+='<div class="between"><h3 style="font-size:18px">'+esc(dt.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'}))+'</h3><button class="quiet" data-a="clearday">Show whole month</button></div>';
    }
    if(!shown.length){
      h+='<div class="note">'+(S.day?'Nothing logged this day.':rows.length?'Everything is filtered out above.':mig?'No migraine entries this month. Pick the Migraine tile in the log above to add one, with symptoms, triggers, and medications.':'Nothing logged this month. That is fine. Entries show up here as colored tiles when you add them.')+'</div>';
    }else if(!S.day){
      h+='<p class="small">Tap a day on the calendar to see what you logged.</p>';
    }else{
      shown.slice().reverse().forEach(function(r){
        var sw=mig?(SEVCOL[r.en.sev]||'var(--c7)'):colorOf(r.en.label);
        var lines=entryLines(r.en);
        h+='<div class="entry"><span class="sw" style="background:'+sw+'"></span><div class="e"><b>'+esc(r.en.label)+'</b>';
        lines.forEach(function(l){h+='<span class="small">'+esc(l)+'</span>'});
        h+='<span class="small">'+esc(r.en.when)+'</span></div><button class="x" aria-label="Delete entry" data-a="dellog" data-i="'+r.i+'">&times;</button></div>';
      });
    }
    return h;
  }

  function usRow(ev){
    var rng=fmtRange(tmin(ev.time),ev.dur),who=ev.withJ?'§N and §P':'§N';
    var line=ev.share==='generic'?who+', Appointment, '+rng:who+', '+ev.title+', '+rng+(ev.place?', '+ev.place:'');
    return '<div class="him"><b>'+esc(line)+'</b>'+(ev.ex?'<span class="small">Example</span>':'')+'</div>';
  }
  function us(){
    var h=head({title:'Us',sub:'What §P sees of your day'});
    h+='<div class="note">Built from the plans you add on Today. Each plan shows the way you set it: full details, just "Appointment", or nothing. Flexible things stay tucked away, and free time shows nothing.</div>';
    var groups=[['Today',[0]],['Tomorrow',[1]],['Later this week',[2,3,4,5,6,7]]],hidden=0,any=false;
    groups.forEach(function(g){
      var rows='';
      g[1].forEach(function(n){
        var k=ymd(addDays(new Date(),n));
        evsOn(k).forEach(function(ev){
          if(ev.share==='hidden'){hidden++;return}
          var pre=(g[0]==='Later this week')?'<span class="small">'+esc(dayLabel(k))+'</span>':'';
          rows+=pre+usRow(ev);
        });
      });
      if(rows){any=true;h+='<div class="dayhead">'+g[0]+'</div><div class="card">'+rows+'</div>'}
    });
    if(!any)h+='<div class="card"><p class="small">Nothing shared for the next few days.</p></div>';
    if(hidden)h+='<p class="small">'+hidden+' private plan'+(hidden===1?'':'s')+' not shown to §P.</p>';
    h+='<div class="card"><details class="tuck"><summary>Flexible today (3)</summary><ul><li>Chores</li><li>Project work</li><li>Art project</li></ul></details></div>';
    h+='<p class="small">Shared plans, like dinner out, appear once for both of you.</p>';
    return h;
  }

  function roughSheet(){
    if(!S.rp)return '';
    var h='<div class="backdrop" data-a="rbg"><div class="sheet" role="dialog" aria-modal="true" aria-label="Rough morning"><h2 style="font-size:22px">Rough morning. Migraine?</h2><p class="small">Totally optional. The rough morning gets logged either way, then we switch to floor mode. You can add symptoms and triggers later in the Log tab.</p><div class="chips"><button class="gchip" data-a="rmig" aria-pressed="'+S.rp.mig+'" aria-expanded="'+S.rp.mig+'">'+STACK+'<span>Migraine</span>'+CHEV+'</button></div>';
    if(S.rp.mig)h+='<div class="gpanel">'+sevUI(S.rp.sev,'rsev')+pickUI('meds','rp',S.rp.meds)+'</div>';
    h+='<button class="btn" data-a="rgo">Switch to floor mode</button><button class="quiet" data-a="rcancel">Never mind</button></div></div>';
    return h;
  }

  function nameFields(p){
    p=p||{};
    return '<label class="lab" for="pf-name">What should I call you?</label><input class="field" type="text" id="pf-name" maxlength="30" autocomplete="given-name" value="'+esc(p.name||'')+'">'
      +'<label class="lab" for="pf-partner" style="margin-top:10px">Partner&rsquo;s name (optional)</label><input class="field" type="text" id="pf-partner" maxlength="30" value="'+esc(p.partner||'')+'">'
      +'<label class="lab" for="pf-pet" style="margin-top:10px">A pet&rsquo;s name (optional)</label><input class="field" type="text" id="pf-pet" maxlength="30" value="'+esc(p.pet||'')+'">';
  }
  function welcomeSheet(){
    if(PROF)return '';
    return '<div class="backdrop" style="z-index:40"><div class="sheet" role="dialog" aria-modal="true" aria-label="Welcome"><h2 style="font-size:26px">Welcome</h2><p class="small">A few names make this feel like yours. All of it is optional, it stays on this device, and you can change it any time in the menu.</p><form id="welcomeform" style="display:flex;flex-direction:column;gap:4px">'+nameFields({})+'<button class="btn" type="submit" style="margin-top:14px">Start</button></form><button class="quiet" data-a="wskip">Skip for now</button></div></div>';
  }
  function saveProf(o){PROF={name:(o.name||'').trim(),partner:(o.partner||'').trim(),pet:(o.pet||'').trim()};try{localStorage.setItem('gs-profile',JSON.stringify(PROF))}catch(e){}}
  function menuSheet(){
    if(!S.menu)return '';
    var h='<div class="backdrop" data-a="mbg"><div class="sheet" role="dialog" aria-modal="true" aria-label="Menu"><div class="between"><h2 style="font-size:24px">Menu</h2><button class="x" data-a="mclose" aria-label="Close menu">&times;</button></div>';
    h+='<div class="subtabs" role="group" aria-label="Menu sections">';
    [['colorways','Colorways'],['themes','Themes'],['logic','Logic'],['data','You']].forEach(function(t){h+='<button data-a="mt" data-v="'+t[0]+'" aria-pressed="'+(S.mt===t[0])+'">'+t[1]+'</button>'});
    h+='</div>';
    var paused=creature()&&S.mt!=='logic'?'<div class="note">Little mammal has its own storybook look, so themes and colorways are paused while it is on.</div>':'';
    if(S.mt==='colorways'){
      h+=paused+'<div class="grp"><div class="lab">Colorway</div><div class="cws">';
      Object.keys(CWS).forEach(function(k){
        var sw='';CWS[k].sw.forEach(function(c){sw+='<i style="background:'+c+'"></i>'});
        h+='<button class="cw" data-a="cw" data-v="'+k+'" aria-pressed="'+(S.cw===k)+'"><span class="sws">'+sw+'</span>'+esc(CWS[k].name)+'</button>';
      });
      h+='</div><p class="small">Colorways only change the colors, and they work with any theme.</p></div>';
    }else if(S.mt==='themes'){
      h+='<p class="small">Picking a theme switches to its own colorway. Then try any other colorway on top, in the Colorways tab.</p>'+paused+'<div class="grp"><div class="lab">Theme</div>';
      Object.keys(LOOKS).forEach(function(k){
        h+='<button class="opt" data-a="look" data-v="'+k+'" aria-pressed="'+(S.look===k)+'">'+SVGO.replace('class="sprig"','class="mini"')+MOTIFS[k]+'</svg><span><b>'+esc(LOOKS[k].name)+'</b><span class="small">'+esc(LOOKS[k].blurb)+'</span></span></button>';
      });
      h+='</div>';
    }else if(S.mt==='data'){
      h+='<form id="profform" class="grp" style="display:flex;flex-direction:column;gap:4px"><div class="lab">About you</div>'+nameFields(PROF)+'<button class="btn alt" type="submit" style="margin-top:10px">Save names</button></form>';
      h+='<div class="grp"><div class="lab">Back up your data</div><p class="small">Everything lives on this device only for now. A backup is one small file with your tasks, plans, lists, log and settings. Keep it somewhere safe, or use it to move to a new phone.</p><button class="btn" data-a="dexport">Save a backup</button></div>';
      h+='<div class="grp"><div class="lab">Restore from a backup</div><p class="small">This replaces what is on this device with what is in the file.</p><label class="btn alt" style="cursor:pointer">Choose a backup file<input type="file" id="dimport" accept=".json,application/json" hidden></label></div>';
      if(S.dataPending)h+='<div class="note" role="alert">Found a backup with '+S.dataPending.n+' saved items'+(S.dataPending.when?' from '+esc(S.dataPending.when):'')+'. Replace what is on this device with it?<div class="row" style="margin-top:10px"><button class="btn grow" data-a="dgo">Yes, restore it</button><button class="btn alt grow" data-a="dno">Cancel</button></div></div>';
      if(S.dataMsg)h+='<div class="note" role="status">'+esc(S.dataMsg)+'</div>';
    }else{
      h+='<div class="grp"><div class="lab">What&rsquo;s your mindset today?</div><p class="small">This changes how the app thinks.</p>';
      Object.keys(LOGICS).forEach(function(k){
        h+='<button class="opt" data-a="logic" data-v="'+k+'" aria-pressed="'+(S.logic===k)+'">'+SVGO.replace('class="sprig"','class="mini"')+LOGICS[k].icon+'</svg><span><b>'+esc(LOGICS[k].name)+'</b><span class="small">'+esc(LOGICS[k].blurb)+'</span></span></button>';
      });
      h+='<p class="small">Your plans, lists and log stay exactly the same, so you can switch whenever you feel like it.</p></div>';
      if(creature()){
        h+='<div class="grp"><div class="lab">How are you feeling today?</div><div class="chips sm">';
        Object.keys(MOODS).forEach(function(k){h+='<button data-a="mood" data-v="'+k+'" aria-pressed="'+(S.mood===k)+'">'+MOODS[k].name+'</button>'});
        h+='</div><p class="small">Today: '+esc(MOODS[S.mood].desc)+'.</p></div><div class="grp"><div class="lab">Season</div><div class="chips sm">';
        Object.keys(SEASONS).forEach(function(k){h+='<button data-a="season" data-v="'+k+'" aria-pressed="'+(S.season===k)+'">'+SEASONS[k]+'</button>'});
        h+='</div><p class="small">Auto follows the calendar. Pick one to preview its colors and creatures.</p></div>';
      }
    }
    h+='<p class="small">More settings will live here as we build them.</p></div></div>';
    return h;
  }

  function tabs(){
    var h='';
    [['lists','Lists'],['ov','Overview'],['today','Today'],['us','Us'],['log','Log']].forEach(function(t){
      h+='<button data-a="tab" data-v="'+t[0]+'"'+(S.tab===t[0]?' aria-current="page"':'')+'>'+ICON[t[0]]+t[1]+'</button>';
    });
    return h;
  }

  function render(){
    var app=document.getElementById('app');
    app.innerHTML=fx(S.tab==='today'?today():S.tab==='ov'?overview():S.tab==='lists'?lists():S.tab==='log'?logview():us());
    document.getElementById('tabs').innerHTML=fx(tabs());
    var _hh=app.querySelector('.hero h2'),_hk=_hh?_hh.textContent:'';
    if(_hk&&_hk===render.lastHero){app.querySelectorAll('.hero').forEach(function(e){e.style.animation='none'})}
    render.lastHero=_hk;
    var _l=document.querySelector('.lot'),_st=_l?_l.scrollTop:0;
    document.getElementById('sheetRoot').innerHTML=fx(roughSheet()+menuSheet()+evSheet()+nameSheet()+tkSheet()+lotSheet()+plSheet()+fab()+welcomeSheet());
    var _l2=document.querySelector('.lot');if(_l2)_l2.scrollTop=_st;
  }

  function logIt(label,extra,onDay){
    var d=new Date(),opts={month:'short',day:'numeric'};
    if(onDay&&S.day){var p=S.day.split('-');d=new Date(+p[0],+p[1]-1,+p[2],12,0,0)}
    var when=(onDay&&S.day)?d.toLocaleDateString(undefined,opts):d.toLocaleDateString(undefined,opts)+', '+d.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'});
    var en={label:label,ts:d.toISOString(),when:when};
    if(extra){['sev','meds','trig','symp'].forEach(function(k){if(extra[k]&&(!Array.isArray(extra[k])||extra[k].length))en[k]=extra[k]})}
    S.log.push(en);
    if(label!=='Migraine')colorOf(label);
    save('gs-log',S.log);
  }
  function openIds(){return Array.prototype.map.call(document.querySelectorAll('details.lcard[open]'),function(d){return d.dataset.id})}
  function reopen(ids){ids.forEach(function(id){var d=document.querySelector('details.lcard[data-id="'+id+'"]');if(d)d.open=true})}
  function keepOpen(){var ids=openIds();render();reopen(ids)}
  function resetForm(){S.f={sels:[],sev:null,meds:[],trig:[],symp:[]}}
  function keepSheet(fn){var sh=document.querySelector('.sheet'),st=sh?sh.scrollTop:0;fn();var s2=document.querySelector('.sheet');if(s2)s2.scrollTop=st}
  function closeSheets(){S.menu=false;S.rp=null;S.ev=null;S.ns=null;S.tk=null;S.pl=null}

  var A={
    mt:function(b){keepSheet(function(){S.mt=b.dataset.v;render()})},
    logic:function(b){keepSheet(function(){S.logic=b.dataset.v;S.shift=0;S.skipPark=[];save('gs-logic',S.logic);applyLook();render()})},
    slide:function(){S.shift+=15;render();toast('Everything after this moved 15 minutes later.')},
    unslide:function(){S.shift=0;render()},
    stuck:function(){S.chat.open=true;render();chatRender();focusChat()},
    cclose:function(){chatClose()},
    cbg:function(b,e){if(e.target===b)chatClose()},
    cnew:function(){if(CHATCTL)CHATCTL.abort();S.chat.msgs=[];S.chat.err='';S.chat.retry='';S.chat.busy=false;chatRender();focusChat()},
    cstop:function(){if(CHATCTL)CHATCTL.abort()},
    cstart:function(b){chatSend(b.dataset.v)},
    cretry:function(){var t=S.chat.retry;if(!t)return;var m=S.chat.msgs;if(m.length&&m[m.length-1].r==='u'&&m[m.length-1].t===t)m.pop();chatSend(t)},
    wskip:function(){saveProf({});render()},
    dexport:function(){
      var o={app:'gentle-start',version:1,saved:new Date().toISOString(),data:{}};
      try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k.indexOf('gs-')===0)o.data[k]=localStorage.getItem(k)}}catch(e){}
      var json=JSON.stringify(o,null,1),name='gentle-start-backup-'+ymd(new Date())+'.json';
      var file=null;try{file=new File([json],name,{type:'application/json'})}catch(e){}
      function viaLink(){
        var a=document.createElement('a'),u=URL.createObjectURL(new Blob([json],{type:'application/json'}));
        a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},4000);
        S.dataMsg='Backup saved as '+name+'.';keepSheet(render);
      }
      if(file&&navigator.canShare&&navigator.canShare({files:[file]})){
        navigator.share({files:[file],title:'Gentle Start backup'}).then(function(){S.dataMsg='Backup shared. Keep that file somewhere safe.';keepSheet(render)},function(e){if(e&&e.name!=='AbortError')viaLink()});
      }else viaLink();
    },
    dgo:function(){
      var p=S.dataPending;if(!p)return;
      try{
        var del=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k.indexOf('gs-')===0)del.push(k)}
        del.forEach(function(k){localStorage.removeItem(k)});
        Object.keys(p.data).forEach(function(k){if(k.indexOf('gs-')===0&&typeof p.data[k]==='string')localStorage.setItem(k,p.data[k])});
        location.reload();
      }catch(e){S.dataMsg='That did not work. Nothing was changed.';S.dataPending=null;keepSheet(render)}
    },
    dno:function(){S.dataPending=null;S.dataMsg='';keepSheet(render)},
    rmsample:function(){S.log=S.log.filter(function(e){return !e.smp});save('gs-log',S.log);render();toast('Sample entries removed.')},
    mood:function(b){keepSheet(function(){S.mood=b.dataset.v;S.skipPark=[];save('gs-mood',S.mood);render()})},
    season:function(b){keepSheet(function(){S.season=b.dataset.v;save('gs-season',S.season);applyLook();render()})},
    critter:function(){S.cr=(S.cr||0)+1;render()},
    plopen:function(){var pool=plPool();if(pool.length<2)return;S.pl={ids:plSample(pool).map(function(t){return t.id}),drops:0};plDrop();render();plAnimate()},
    plagain:function(){if(!S.pl||S.pl.drops>=2)return;plDrop();render();plAnimate()},
    plskip:function(){plLand()},
    plclose:function(){plAnimate.id++;S.pl=null;render()},
    plbg:function(b,e){if(e.target===b)A.plclose()},
    plstart:function(b){var id=b.dataset.v;plAnimate.id++;S.pl=null;S.lot=false;S.doing=id;S.askMore=false;S.celeb=null;S.tab='today';render();window.scrollTo(0,0)},
    lot:function(){S.lot=true;S.lotAnim=true;render();S.lotAnim=false},
    lclose:function(){S.lot=false;render()},
    lbg:function(b,e){if(e.target===b){S.lot=false;render()}},
    lottab:function(b){S.lotTab=b.dataset.v;render()},
    ovv:function(b){S.ovv=b.dataset.v;render()},
    ovprev:function(){S.ovMo-=1;S.ovDay=null;render()},
    ovnext:function(){S.ovMo+=1;S.ovDay=null;render()},
    ovday:function(b){S.ovDay=S.ovDay===b.dataset.k?null:b.dataset.k;render()},
    evnewon:function(b){var k=b.dataset.v;S.ev=newEv();S.ev.dk=k===ymd(new Date())?'today':k===ymd(addDays(new Date(),1))?'tomorrow':'other';S.ev.dateVal=k;render()},
    ptog:function(b){var id=b.dataset.v;if(S.status[id]==='done')delete S.status[id];else S.status[id]='done';render()},
    caredid:function(){toast('That counts. Resting is the task.');S.careIdx=(S.careIdx+1)%S.care.length;render()},
    carenext:function(){S.careIdx=(S.careIdx+1)%S.care.length;render()},
    tkopen:function(b){
      var t=taskById(b.dataset.v);if(!t)return;
      S.tk={id:t.id,title:t.title,h:t.h||'week',nr:!!t.nr,fun:!!t.fun,work:(t.work||[]).slice(),mins:t.mins||0,w:t.w||'med',due:dueOf(t),steps:t.steps.map(function(x){return {t:x.t,done:x.done}}),newStep:'',err:''};render();
    },
    tkclose:function(){S.tk=null;render()},
    tkbg:function(b,e){if(e.target===b){S.tk=null;render()}},
    tkh:function(b){keepSheet(function(){syncTk();S.tk.h=b.dataset.v;render()})},
    tkmins:function(b){keepSheet(function(){syncTk();S.tk.mins=+b.dataset.v;render()})},
    tkw:function(b){keepSheet(function(){syncTk();S.tk.w=b.dataset.v;render()})},
    tkclr:function(){keepSheet(function(){syncTk();S.tk.due='';render()})},
    tkstepadd:function(){keepSheet(function(){syncTk();commitStep();render();var i=document.getElementById('tk-step');if(i)i.focus()})},
    tkstepdel:function(b){keepSheet(function(){syncTk();S.tk.steps.splice(+b.dataset.i,1);render()})},
    tkstepdone:function(b){keepSheet(function(){syncTk();var x=S.tk.steps[+b.dataset.i];if(x)x.done=!x.done;render()})},
    tksave:function(){
      syncTk();var T=S.tk;commitStep();T.err='';
      if(!T.title.trim()){T.err='Give it a name first. A word or two is plenty.';keepSheet(render);return}
      var old=T.id?taskById(T.id):null;
      var rec={id:T.id||('t'+Date.now()),title:T.title.trim(),h:T.h,nr:T.nr,fun:T.fun,mins:T.mins,w:T.w,due:T.due||'',steps:T.steps,work:old?(old.work||[]):[],done:old?old.done:false,created:old?old.created:Date.now(),doneAt:old?old.doneAt:0,snooze:old?old.snooze:''};
      if(old){S.tasks[S.tasks.indexOf(old)]=rec}else S.tasks.unshift(rec);
      saveTasks();S.tk=null;render();toast('Saved.');
    },
    tkdel:function(){var id=S.tk&&S.tk.id;S.tasks=S.tasks.filter(function(t){return t.id!==id});if(S.doing===id)S.doing=null;saveTasks();S.tk=null;render();toast('Removed. Nothing else changes.')},
    tkgo:function(){
      syncTk();var T=S.tk;if(!T||!T.id)return;var t=taskById(T.id);
      if(t){t.steps=T.steps;t.title=T.title.trim()||t.title;t.mins=T.mins;t.w=T.w;t.h=T.h;t.nr=T.nr;t.fun=T.fun;t.due=T.due||'';t.ex=false;saveTasks();S.doing=t.id;S.askMore=false}
      S.tk=null;S.lot=false;S.tab='today';render();window.scrollTo(0,0);
    },
    tkdone:function(b){var t=taskById(b.dataset.v);if(!t)return;t.done=true;t.doneAt=Date.now();if(S.doing===t.id)S.doing=null;saveTasks();finishNote(t.id)},
    tkundo:function(b){var t=taskById(b.dataset.v);if(!t)return;t.done=false;saveTasks();render()},
    tkclear:function(){S.tasks=S.tasks.filter(function(t){return !t.done});saveTasks();render()},
    tkstart:function(b){S.doing=b.dataset.v;S.askMore=false;S.celeb=null;render();window.scrollTo(0,0)},
    tkhard:function(b){S.doing=b.dataset.v;S.askMore=false;S.celeb=b.dataset.v;render();window.scrollTo(0,0)},
    tkanother:function(b){S.skipPark.push(b.dataset.v);render()},
    tklater:function(b){var t=taskById(b.dataset.v);if(!t)return;t.snooze=ymd(new Date());saveTasks();render();toast('Back tomorrow. No pressure.')},
    tkfinish:function(){var t=taskById(S.doing);if(!t)return;t.done=true;t.doneAt=Date.now();saveTasks();S.doing=null;S.askMore=false;finishNote(t.id)},
    tkstep:function(){
      var t=taskById(S.doing);if(!t)return;var fs=firstStep(t);
      if(fs)fs.done=true;
      (t.work=t.work||[]).push(Date.now());saveTasks();S.askMore=true;render();
    },
    tkcont:function(){S.askMore=false;render()},
    tkpause:function(){S.doing=null;S.askMore=false;render();toast('Saved on the task. It is still waiting for you, no rush.')},
    tkstop:function(){S.doing=null;S.askMore=false;render()},
    tkbreak:function(){
      syncTk();var T=S.tk;
      if(!T.title.trim()){T.err='Name it first, then I can break it down.';keepSheet(render);return}
      if(S.tkBusy)return;S.tkBusy=true;T.err='';keepSheet(render);
      getSample().then(function(sample){
        if(!sample)throw {code:'not_granted'};
        return sample.json('Break this task into 3 to 6 tiny physical first actions for someone who struggles to start things. Each step is a short imperative phrase (under 9 words) that takes about 5 minutes or less, and the first one is almost effortless. Task: "'+T.title.trim().slice(0,200)+'"'+(T.steps.length?'\nSteps already listed (do not repeat): '+T.steps.map(function(x){return x.t}).join('; '):'')+'\nReply with only a JSON array of strings.',{modelTier:'quick',cache:false});
      }).then(function(arr){
        if(!Array.isArray(arr))throw {code:'invalid_json'};
        arr.slice(0,6).forEach(function(x){x=String(x).trim();if(x&&T.steps.length<12)T.steps.push({t:x.slice(0,80),done:false})});
      }).catch(function(e){
        T.err=(e&&e.code==='not_granted')?'The step-maker is not switched on for this page. You can add steps yourself.':'That did not go through. Try again, or add steps yourself.';
      }).then(function(){S.tkBusy=false;if(S.tk===T){syncTk();keepSheet(render)}});
    },
    menu:function(){S.menu=true;render()},
    mclose:function(){S.menu=false;render()},
    mbg:function(b,e){if(e.target===b){S.menu=false;render()}},
    look:function(b){keepSheet(function(){S.look=b.dataset.v;S.cw=LOOKS[S.look].cw;save('gs-look',S.look);save('gs-cw',S.cw);applyLook();render()})},
    cw:function(b){keepSheet(function(){S.cw=b.dataset.v;save('gs-cw',S.cw);applyLook();render()})},
    tab:function(b){S.tab=b.dataset.v;render();window.scrollTo(0,0)},
    part:function(b){S.part=b.dataset.v;S.shift=0;render()},
    done:function(b){S.status[b.dataset.v]='done';render()},
    skip:function(b){S.status[b.dataset.v]='skip';render();toast('Marked as skipped.')},
    recime:function(){toast('Opening a recipe search.')},
    lunch:function(){toast('Prototype: the real app would draft a quick "lunch?" text to §P.')},
    lunchsolo:function(){toast('Got it. Lunch stays in your plan so it does not get skipped.')},
    rough:function(){S.rp={mig:false,sev:null,meds:[]};render()},
    rmig:function(){S.rp.mig=!S.rp.mig;if(!S.rp.mig){S.rp.sev=null;S.rp.meds=[]}keepAll(render)},
    rsev:function(b){keepAll(function(){S.rp.sev=S.rp.sev===b.dataset.v?null:b.dataset.v;render()})},
    rcancel:function(){S.rp=null;render()},
    rbg:function(b,e){if(e.target===b){S.rp=null;render()}},
    rgo:function(){
      logIt('Rough morning');
      if(S.rp.mig)logIt('Migraine',{sev:S.rp.sev,meds:S.rp.meds});
      S.rp=null;S.floor=true;S.status={};render();toast('Floor mode on. Logged.');
    },
    unfloor:function(){S.floor=false;S.status={};render()},
    chip:function(b){keepAll(function(){toggleSel(b.dataset.v);render()})},
    stack:function(b){keepAll(function(){
      var id=b.dataset.v;
      if(id==='mig')toggleSel('Migraine');
      else{var i=S.openStacks.indexOf(id);if(i>=0)S.openStacks.splice(i,1);else S.openStacks.push(id)}
      render()})},
    rename:function(b){var st=stackById(b.dataset.v);if(!st)return;S.ns={id:st.id,name:st.name};render();focusName()},
    namestack:function(){
      var st=S.ns&&stackById(S.ns.id),el=document.getElementById('stackname');
      if(st&&el&&el.value.trim())st.name=el.value.trim().slice(0,24);
      S.ns=null;save('gs-stacks',S.stacks);render();
    },
    unstack:function(b){
      var st=stackById(b.dataset.v);if(!st)return;
      if(!st.builtin)S.stacks=S.stacks.filter(function(x){return x.id!==st.id});else st.kids=[];
      S.ns=null;cleanStacks();save('gs-stacks',S.stacks);render();toast('Ungrouped. The tiles are back on their own.');
    },
    nbg:function(b,e){if(e.target===b){S.ns=null;save('gs-stacks',S.stacks);render()}},
    ncancel:function(){S.ns=null;render()},
    evnew:function(){S.ev=newEv();render()},
    evedit:function(b){
      var ev=S.events.filter(function(x){return x.id===b.dataset.v})[0];if(!ev)return;
      var k=evDate(ev),dk=k===ymd(new Date())?'today':k===ymd(addDays(new Date(),1))?'tomorrow':'other';
      S.ev={id:ev.id,title:ev.title,dk:dk,dateVal:k,time:ev.time,dur:ev.dur||0,place:ev.place||'',travel:ev.travel||0,prep:ev.prep||'',withJ:!!ev.withJ,share:ev.share||'full',err:''};
      render();
    },
    evclose:function(){S.ev=null;render()},
    evbg:function(b,e){if(e.target===b){S.ev=null;render()}},
    evquick:function(b){keepSheet(function(){syncEv();S.ev.title=b.dataset.v;render()})},
    evday:function(b){keepSheet(function(){syncEv();S.ev.dk=b.dataset.v;render()})},
    evdur:function(b){keepSheet(function(){syncEv();S.ev.dur=+b.dataset.v;render()})},
    evtravel:function(b){keepSheet(function(){syncEv();S.ev.travel=+b.dataset.v;render()})},
    evwj:function(){keepSheet(function(){syncEv();S.ev.withJ=!S.ev.withJ;render()})},
    evshare:function(b){keepSheet(function(){syncEv();S.ev.share=b.dataset.v;render()})},
    evsave:function(){
      syncEv();var E=S.ev;E.err='';
      if(!E.title.trim())E.err='Give it a name first. A word or two is plenty.';
      else if(!E.time)E.err='Add a start time so it lands in the right spot.';
      else if(E.dk==='other'&&!E.dateVal)E.err='Pick the day.';
      if(E.err){keepSheet(render);return}
      var date=E.dk==='today'?ymd(new Date()):E.dk==='tomorrow'?ymd(addDays(new Date(),1)):E.dateVal;
      var rec={id:E.id||('e'+Date.now()),title:E.title.trim(),date:date,time:E.time,dur:E.dur,place:E.place.trim(),travel:E.travel,prep:E.prep.trim(),withJ:E.withJ,share:E.share};
      var idx=-1;S.events.forEach(function(x,i){if(x.id===rec.id)idx=i});
      if(idx>=0)S.events[idx]=rec;else S.events.push(rec);
      save('gs-events',S.events);S.ev=null;render();toast('Saved. §P sees it the way you set it.');
    },
    evdel:function(){
      var id=S.ev&&S.ev.id;S.events=S.events.filter(function(x){return x.id!==id});
      save('gs-events',S.events);S.ev=null;render();toast('Removed. Nothing else changes.');
    },
    evready:function(b){S.evReady[b.dataset.v]=true;render();toast('Good. You are all set.')},
    evhide:function(b){S.evHide[b.dataset.v]=true;render()},
    sev:function(b){keepAll(function(){S.f.sev=S.f.sev===b.dataset.v?null:b.dataset.v;render()})},
    togopt:function(b){
      var arr=selOf(b.dataset.s,b.dataset.k),n=b.dataset.v,i=arr.indexOf(n);
      keepAll(function(){if(i>=0)arr.splice(i,1);else arr.push(n);render()});
    },
    savelog:function(){
      var c=document.getElementById('custom');
      var custom=c?c.value.trim():'';
      if(!S.f.sels.length&&!custom){toast('Pick something or type it. Or just leave it.');return}
      S.f.sels.forEach(function(l){logIt(l,l==='Migraine'?{sev:S.f.sev,meds:S.f.meds,trig:S.f.trig,symp:S.f.symp}:null,true)});
      if(custom){
        logIt(custom,null,true);
        var all=BASE_CHIPS.concat(S.custom).map(function(x){return x.toLowerCase()});
        if(all.indexOf(custom.toLowerCase())<0){S.custom.push(custom);save('gs-custom',S.custom)}
      }
      var hadMig=S.f.sels.indexOf('Migraine')>=0;
      resetForm();render();toast(hadMig?'Saved. Migraine entries are in the Migraine view.':'Saved.')
    },
    lv:function(b){S.lv=b.dataset.v;S.day=null;render()},
    day:function(b){keepAll(function(){S.day=S.day===b.dataset.k?null:b.dataset.k;render()})},
    clearday:function(){S.day=null;render()},
    tog:function(b){S.hide[b.dataset.v]=!S.hide[b.dataset.v];render()},
    dellog:function(b){S.log.splice(+b.dataset.i,1);save('gs-log',S.log);render()},
    prevmo:function(){S.mo-=1;S.day=null;render()},
    nextmo:function(){if(S.mo<0){S.mo+=1;S.day=null;render()}},
    tick:function(b){var it=S.lists[+b.dataset.l].items[+b.dataset.i];it.done=!it.done;save('gs-lists',S.lists);keepOpen()},
    del:function(b){S.lists[+b.dataset.l].items.splice(+b.dataset.i,1);save('gs-lists',S.lists);keepOpen()}
  };

  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-a]');if(!b||b.tagName==='FORM')return;
    var f=A[b.dataset.a];if(f)f(b,e);
  });
  document.addEventListener('toggle',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.f)S.filt=t.open},true);
  document.addEventListener('submit',function(e){
    var f=e.target.closest('form[data-a]');if(!f)return;e.preventDefault();
    var inp=f.querySelector('input'),v=inp.value.trim();if(!v)return;
    var ids=openIds();
    if(f.dataset.a==='addopt'){
      var kind=f.dataset.k,sc=f.dataset.s,arr=selOf(sc,kind),name=v;
      var hit=S.opts[kind].filter(function(x){return x.toLowerCase()===v.toLowerCase()})[0];
      if(hit)name=hit;else{S.opts[kind].push(v);save(KINDS[kind].store,S.opts[kind])}
      if(arr.indexOf(name)<0)arr.push(name);
      var fid='new-'+sc+'-'+kind;
      keepAll(function(){document.getElementById(fid).value='';render()});
      var nm=document.getElementById(fid);if(nm){nm.value='';nm.focus()}
    }else if(f.dataset.a==='additem'){
      var L=S.lists[+f.dataset.l];L.items.push({t:v,done:false});save('gs-lists',S.lists);render();reopen(ids);
      var el=document.getElementById('add-'+L.id);if(el)el.focus();
    }else if(f.dataset.a==='careadd'){
      S.care.push(v);save('gs-care',S.care);S.careIdx=S.care.length-1;render();toast('Added.');
    }else if(f.dataset.a==='tkquick'){
      S.tasks.unshift({id:'t'+Date.now(),title:v,h:f.dataset.h||'week',nr:false,fun:false,work:[],mins:0,w:'med',due:'',steps:[],done:false,created:Date.now()});saveTasks();render();
      var q=document.getElementById('tkq');if(q)q.focus();toast('Parked. It can wait there.');
    }else if(f.dataset.a==='newlist'){
      S.lists.push({id:'l'+Date.now(),name:v,items:[]});save('gs-lists',S.lists);render();reopen(ids);
      var all=document.querySelectorAll('details.lcard');if(all.length)all[all.length-1].open=true;
    }
  });

  /* ---- long-press, then drag a tile onto another tile (new stack) or onto a stack (move in) ---- */
  var D=null,noClick=0;
  function moveGhost(x,y){if(D&&D.ghost){D.ghost.style.left=x+'px';D.ghost.style.top=y+'px'}}
  function setHot(t){if(D.hot&&D.hot!==t)D.hot.classList.remove('drop-hot');D.hot=t;if(t)t.classList.add('drop-hot')}
  function hitAt(x,y){
    var el=document.elementFromPoint(x,y);if(!el)return null;
    var t=el.closest('[data-drop-out],[data-drop-stack],[data-drop-tile]');if(!t)return null;
    if(t.hasAttribute('data-drop-out'))return D.from?t:null;
    if(t.hasAttribute('data-drop-stack'))return t.dataset.dropStack===D.from?null:t;
    return t.dataset.dropTile===D.label?null:t;
  }
  function startDrag(){
    if(!D||D.active)return;
    D.active=true;D.el.classList.add('dragging');
    var g=document.createElement('div');g.className='ghost';g.textContent=D.label;document.body.appendChild(g);D.ghost=g;
    moveGhost(D.x,D.y);
    if(D.from)document.getElementById('outzone').hidden=false;
    try{var sel=window.getSelection();if(sel)sel.removeAllRanges()}catch(e){}
    try{if(navigator.vibrate)navigator.vibrate(12)}catch(e){}
    D.scroller=setInterval(function(){if(!D)return;var y=D.y;if(y<90)window.scrollBy(0,-12);else if(y>window.innerHeight-130)window.scrollBy(0,12)},16);
  }
  function endDrag(commit){
    if(!D)return;
    var d=D;D=null;clearTimeout(d.timer);clearInterval(d.scroller);
    if(!d.active)return;
    noClick=Date.now()+450;
    if(d.ghost)d.ghost.remove();
    d.el.classList.remove('dragging');
    if(d.hot)d.hot.classList.remove('drop-hot');
    var oz=document.getElementById('outzone');oz.hidden=true;oz.classList.remove('drop-hot');
    if(commit&&d.hot)applyDrop(d,d.hot);
  }
  function applyDrop(d,t){
    var label=d.label,msg='';
    if(t.hasAttribute('data-drop-out')){
      removeKid(label);msg='Out of the stack.';
    }else if(t.hasAttribute('data-drop-stack')){
      var st=stackById(t.dataset.dropStack);if(!st)return;
      removeKid(label);st.kids.push(label);
      if(st.id!=='mig'&&S.openStacks.indexOf(st.id)<0)S.openStacks.push(st.id);
      msg='Moved into '+st.name+'.';
    }else{
      var other=t.dataset.dropTile,id='s'+Date.now();
      removeKid(label);
      S.stacks.push({id:id,name:'New stack',kids:[other,label]});
      S.openStacks.push(id);S.ns={id:id,name:'New stack'};
    }
    cleanStacks();save('gs-stacks',S.stacks);
    keepAll(render);
    if(S.ns)focusName();else toast(msg);
  }
  document.addEventListener('pointerdown',function(e){
    if(D)return;
    var t=e.target.closest&&e.target.closest('[data-drag]');if(!t)return;
    if(e.pointerType==='mouse'&&e.button!==0)return;
    D={el:t,label:t.dataset.drag,from:t.dataset.from||'',sx:e.clientX,sy:e.clientY,x:e.clientX,y:e.clientY,id:e.pointerId,type:e.pointerType,active:false,hot:null,ghost:null};
    D.timer=setTimeout(startDrag,450);
  });
  document.addEventListener('pointermove',function(e){
    if(!D||e.pointerId!==D.id)return;
    D.x=e.clientX;D.y=e.clientY;
    if(!D.active){
      var dist=Math.hypot(D.x-D.sx,D.y-D.sy);
      if(D.type==='mouse'){if(dist>6)startDrag()}
      else if(dist>10){clearTimeout(D.timer);D=null}
      return;
    }
    e.preventDefault();
    moveGhost(D.x,D.y);
    var t=hitAt(D.x,D.y);setHot(t);
  });
  document.addEventListener('pointerup',function(e){if(D&&e.pointerId===D.id)endDrag(true)});
  document.addEventListener('pointercancel',function(e){if(D&&e.pointerId===D.id)endDrag(false)});
  document.addEventListener('touchmove',function(e){if(D&&D.active&&e.cancelable)e.preventDefault()},{passive:false});
  document.addEventListener('contextmenu',function(e){if(e.target.closest&&e.target.closest('[data-drag]'))e.preventDefault()});
  document.addEventListener('click',function(e){if(Date.now()<noClick){e.stopPropagation();e.preventDefault()}},true);
  document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target&&e.target.id==='stackname'){e.preventDefault();A.namestack()}});

  /* ---- the "Stuck?" helper: a back-and-forth chat answered by Claude ---- */
  var CHATCTL=null,CHATICON='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/></svg>';
  var STARTERS=["I can't get out of bed","I don't know what to do first","I can't start something","I'm stuck on a decision"];
  function getSample(){try{return window.claude&&window.claude.use?window.claude.use('sample').then(function(f){return f||null},function(){return null}):Promise.resolve(null)}catch(e){return Promise.resolve(null)}}
  function fab(){if(!PROF||S.noAI||S.menu||S.rp||S.ev||S.ns||S.tk||S.lot||S.pl||S.chat.open)return '';return '<button class="fab" data-a="stuck" aria-label="Open the stuck helper">'+CHATICON+'<span>'+esc(U().stuck)+'</span></button>'}
  function chatRules(){
    var tk=ymd(new Date()),evs=evsOn(tk).map(function(ev){return ev.title+' at '+fmt(tmin(ev.time))}).join('; ')||'none',nx=nextId(),L=LOGICS[S.logic],pk=S.tasks.filter(function(t){return !t.done}).slice(0,6).map(function(t){return t.title}).join('; ')||'none';
    return fxt(['You are the "Stuck?" helper inside §N\'s personal scheduling app. §N has trouble with task initiation and often ruminates over which task to do first, or cannot start something she knows she should do. Generic productivity advice and "be more disciplined" do not help her; understanding what is in the way and reducing friction does.',
      'How to reply: warm, gentle and curious. Keep it short, usually 2 to 4 sentences, in plain text with no lists, headings or markdown. Ask ONE question at a time about what is getting in the way before you advise. Once you understand the barrier, offer one tiny, concrete first action, and if it fits, a way to make it cozier or easier. Never guilt, never "should", never mention overdue items or streaks, no lectures, no heavy reassurance, no diagnosing.',
      'Tone example (not a script): if she says "I\'m struggling to get out of bed", you might reply "Oh no! What\'s getting in the way? Just really cozy, or something else?" and if she says "so cozy", "Let\'s take the cozy with you. A sweater, a cup of tea and slippers can help."',
      'If she cannot choose between tasks, help narrow it to one: ask what is most time-sensitive or what is weighing on her, then pick one for her, say why in a sentence, and name the first two-minute action.',
      'If she says anything suggesting she may hurt herself or is in crisis, set tasks aside, respond with warmth, and encourage her to reach someone near her or a crisis line (988 in the US).',
      'App context: it is the '+S.part+' (about '+fmt(SIM[S.part])+'). Next routine step: '+(nx?stepOf(nx).t:'none left')+'. Plans today: '+evs+'. Parking lot (tasks with no set time): '+pk+'. '+(PROF&&PROF.partner?' Her partner is §P.':'')+(PROF&&PROF.pet?' Her pet is §C.':'')+' Voice for this reply: '+L.voice+(S.logic==='mammal'?' Today\'s mood: '+MOODS[S.mood].name+' ('+MOODS[S.mood].desc+').'+(S.mood==='dreamy'?' Remind her gently that fun things will still be there later, that doing the hard thing first is worth celebrating, and that she is never not allowed to have fun.':''):''),
      'Only use the app context if it is relevant; do not recite it.'].join('\n\n'));
  }
  function bub(r,t,busy){return '<div class="bub '+r+(busy?' dots':'')+'">'+(busy?'<span></span><span></span><span></span>':esc(t))+'</div>'}
  function chatRender(){
    var root=document.getElementById('chatRoot'),c=S.chat,old=document.getElementById('chatin'),val=old?old.value:'';
    if(!c.open){root.innerHTML='';return}
    var u=U(),h='<div class="backdrop" data-a="cbg"><div class="sheet chatsheet" role="dialog" aria-modal="true" aria-label="Stuck helper"><div class="between"><h2 style="font-size:22px">'+esc(u.ctitle)+'</h2><div class="row" style="gap:4px"><button class="quiet" data-a="cnew">New chat</button><button class="x" data-a="cclose" aria-label="Close">&times;</button></div></div><div class="msgs" id="msgs" aria-live="polite">';
    h+=bub('a',u.hello);
    c.msgs.forEach(function(m,i){h+=bub(m.r,m.t,c.busy&&i===c.msgs.length-1&&m.r==='a'&&!m.t)});
    h+='</div>';
    if(!c.msgs.length){h+='<div class="chips sm">';STARTERS.forEach(function(q){h+='<button data-a="cstart" data-v="'+esc(q)+'">'+esc(q)+'</button>'});h+='</div>'}
    if(c.err)h+='<div class="note" role="alert">'+esc(c.err)+(c.retry?' <button class="quiet" data-a="cretry">Try again</button>':'')+'</div>';
    h+='<form class="chatform" id="chatform"><input class="field" type="text" id="chatin" placeholder="Tell me what is going on" autocomplete="off" aria-label="Message">'+(c.busy?'<button type="button" class="btn alt" data-a="cstop">Stop</button>':'<button type="submit" class="btn">Send</button>')+'</form></div></div>';
    root.innerHTML=fx(h);
    var inp=document.getElementById('chatin');if(inp)inp.value=val;
    var m=document.getElementById('msgs');if(m)m.scrollTop=m.scrollHeight;
  }
  function focusChat(){var i=document.getElementById('chatin');if(i)i.focus()}
  function paintLast(t){
    var m=document.getElementById('msgs');if(!m)return;
    var all=m.querySelectorAll('.bub.a'),b=all[all.length-1];if(!b)return;
    b.classList.remove('dots');b.textContent=t;m.scrollTop=m.scrollHeight;
  }
  function errCopy(code){
    if(code==='rate_limited')return 'Too many messages too quickly, or your Claude usage limit is reached. Try again in a little while.';
    if(code==='not_granted'||code==='sampling_disabled'||code==='not_declared'||code==='capability_disabled'||code==='capability_removed')return 'The helper is not switched on for this page, so I cannot reply here.';
    if(code==='session_expired')return 'You need to sign in again to keep chatting.';
    if(code==='refused')return 'I could not answer that one. Try putting it a different way.';
    return 'That did not go through.';
  }
  function chatSend(text){
    var c=S.chat;text=(text||'').trim();if(!text||c.busy)return;
    c.msgs.push({r:'u',t:text});c.msgs.push({r:'a',t:''});c.busy=true;c.err='';c.retry='';
    var i0=document.getElementById('chatin');if(i0)i0.value='';
    chatRender();focusChat();
    var last=c.msgs[c.msgs.length-1];
    getSample().then(function(sample){
      if(!sample)throw {code:'not_granted'};
      CHATCTL=new AbortController();
      var turns=[{role:'user',content:chatRules()}];
      c.msgs.slice(0,-1).slice(-30).forEach(function(m){if(m.t)turns.push({role:m.r==='u'?'user':'assistant',content:m.t})});
      return sample(turns,{cache:false,modelTier:'quick',signal:CHATCTL.signal,onText:function(up){last.t=up.text;paintLast(up.text)}});
    }).then(function(res){last.t=res.text;if(res.truncated)last.t+='...'}).catch(function(e){
      e=e||{};
      if(e.text)last.t=e.text;
      if(!last.t){var ix=c.msgs.indexOf(last);if(ix>=0)c.msgs.splice(ix,1)}
      if(e.code!=='cancelled'){c.err=errCopy(e.code);c.retry=(e.code==='not_granted'||e.code==='sampling_disabled'||e.code==='not_declared'||e.code==='capability_disabled'||e.code==='capability_removed')?'':text;
        if(!c.retry)S.noAI=true}
    }).then(function(){c.busy=false;CHATCTL=null;chatRender();if(c.open)focusChat()});
  }
  function chatClose(){if(CHATCTL)CHATCTL.abort();S.chat.open=false;chatRender();render()}
  document.addEventListener('submit',function(e){if(e.target&&e.target.id==='chatform'){e.preventDefault();var i=document.getElementById('chatin');if(i)chatSend(i.value)}});

  /* ---- swipe a sheet down to close it ---- */
  var SW=null,CLOSERS={mbg:'mclose',rbg:'rcancel',evbg:'evclose',nbg:'ncancel',cbg:'cclose',tkbg:'tkclose',plbg:'plclose'};
  document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target&&e.target.id==='tk-step'){e.preventDefault();A.tkstepadd()}});
  document.addEventListener('touchstart',function(e){
    if(D||!e.touches||e.touches.length!==1)return;
    var sh=e.target.closest&&e.target.closest('.sheet');if(!sh)return;
    var bd=sh.parentNode;if(!bd||!bd.dataset||!CLOSERS[bd.dataset.a])return;
    if(e.target.closest('input,textarea,button.x'))return;
    for(var n=e.target;n&&n!==bd;n=n.parentNode){if(n.scrollTop>0)return}
    var y=e.touches[0].clientY;
    if(sh.classList.contains('chatsheet')&&y-sh.getBoundingClientRect().top>72)return;
    SW={sh:sh,bd:bd,y0:y,dy:0,on:false,t0:Date.now()};
  },{passive:true});
  document.addEventListener('touchmove',function(e){
    if(!SW||!e.touches.length)return;
    var dy=e.touches[0].clientY-SW.y0;
    if(!SW.on){if(dy>10)SW.on=true;else{if(dy<-6)SW=null;return}}
    SW.dy=dy;SW.sh.style.transition='none';SW.sh.style.transform='translateY('+Math.max(0,dy)+'px)';
    if(e.cancelable)e.preventDefault();
  },{passive:false});
  function swEnd(){
    if(!SW)return;var w=SW;SW=null;if(!w.on)return;
    if(w.dy>110||((Date.now()-w.t0)<300&&w.dy>40)){var f=A[CLOSERS[w.bd.dataset.a]];if(f)f()}
    else{w.sh.style.transition='transform .18s ease';w.sh.style.transform='none'}
  }
  document.addEventListener('touchend',swEnd);document.addEventListener('touchcancel',swEnd);
  document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;if(D&&D.active){endDrag(false);return}if(S.chat.open){chatClose();return}if(S.pl){A.plclose();return}if(S.rp||S.menu||S.ev||S.ns||S.tk){closeSheets();render();return}if(S.lot){S.lot=false;render()}});
  seedSamples();
  try{applyLook()}catch(e){}
  render();
  document.addEventListener('submit',function(e){
    var f=e.target;if(!f||(f.id!=='welcomeform'&&f.id!=='profform'))return;e.preventDefault();
    function g(i){var x=document.getElementById(i);return x?x.value:''}
    saveProf({name:g('pf-name'),partner:g('pf-partner'),pet:g('pf-pet')});
    if(f.id==='profform'){S.dataMsg='Saved.';keepSheet(render)}else render();
  });
  document.addEventListener('change',function(e){
    var el=e.target;if(!el||el.id!=='dimport'||!el.files||!el.files[0])return;
    var f=el.files[0],r=new FileReader();
    r.onload=function(){
      try{
        var o=JSON.parse(r.result);
        if(!o||o.app!=='gentle-start'||!o.data||typeof o.data!=='object')throw 0;
        var n=Object.keys(o.data).filter(function(k){return k.indexOf('gs-')===0}).length;
        if(!n)throw 0;
        S.dataPending={data:o.data,n:n,when:o.saved?new Date(o.saved).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}):''};S.dataMsg='';
      }catch(err){S.dataPending=null;S.dataMsg='That file does not look like a Gentle Start backup.'}
      keepSheet(render);
    };
    r.readAsText(f);
  });
  getSample().then(function(f){if(!f){S.noAI=true;render()}});
})();
