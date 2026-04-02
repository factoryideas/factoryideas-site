// ===== FACTORY IDEAS — PHOTOREALISTIC 3D MOCKUP ENGINE =====
// Three.js PBR + Procedural Textures + Fabric.js Design Composition
// Quality target: Printful / Placeit / Nike Customizer level

(function () {
  'use strict';

  // ===== TRANSLATIONS =====
  const MK_T = {
    pt: {
      'mk.badge': 'Personalizacao em Tempo Real',
      'mk.h1': 'Visualize a sua marca<br /><em>nos nossos produtos</em>',
      'mk.subtitle': 'Carregue o seu logotipo, veja o resultado fotorrealista em 3D e solicite orcamento.',
      'mk.step1': 'O Seu Design', 'mk.logo': 'Logotipo', 'mk.text': 'Texto', 'mk.both': 'Ambos',
      'mk.upload.title': 'Arraste o ficheiro ou clique para carregar',
      'mk.upload.formats': 'PNG, JPG, SVG (max 5MB)',
      'mk.text.ph': 'Digite o seu texto...',
      'mk.font': 'Fonte', 'mk.color': 'Cor', 'mk.size': 'Tamanho',
      'mk.step2': 'Escolha o Produto', 'mk.prod.mug': 'Caneca', 'mk.prod.cap': 'Bone',
      'mk.step3': 'Ajustes', 'mk.opacity': 'Opacidade', 'mk.scale': 'Escala', 'mk.rotation': 'Rotacao',
      'mk.reset': 'Repor', 'mk.step4': 'Cor do Produto',
      'mk.download': 'Descarregar Mockup', 'mk.quote': 'Solicitar Orcamento',
      'mk.modal.title': 'Solicitar Orcamento',
      'mk.modal.subtitle': 'Enviaremos o seu mockup junto com os dados de contacto via WhatsApp.',
      'mk.modal.name': 'Nome *', 'mk.modal.company': 'Empresa *',
      'mk.modal.phone': 'Telefone *', 'mk.modal.qty': 'Quantidade',
      'mk.modal.notes': 'Observacoes', 'mk.modal.color': 'Branco', 'mk.modal.send': 'Enviar via WhatsApp',
      'mk.rotate.hint': 'Arraste para rodar o produto',
      'nav.servicos': 'Servicos', 'nav.portfolio': 'Portfolio', 'nav.clientes': 'Clientes',
      'nav.sobre': 'Sobre', 'nav.mockup': 'Personalizar', 'nav.orcamento': 'Pedir Orcamento',
      'foot.p': 'Onde a criatividade encontra a excelencia. Luanda, Angola.',
      'foot.slogan': '"Questione, Inove, Experimente"',
      'foot.serv': 'Servicos', 'foot.emp': 'Empresa', 'foot.sobre': 'Sobre nos',
      'foot.processo': 'Como trabalhamos', 'foot.contacto': 'Contacto',
      's1.h3': 'Stands para Feiras', 's2.h3': 'Impressao Grande Formato',
      's3.h3': 'Brindes Corporativos', 's4.h3': 'Texteis Personalizados',
    },
    en: {
      'mk.badge': 'Real-Time Customization',
      'mk.h1': 'See your brand<br /><em>on our products</em>',
      'mk.subtitle': 'Upload your logo, see photorealistic 3D results and request a quote.',
      'mk.step1': 'Your Design', 'mk.logo': 'Logo', 'mk.text': 'Text', 'mk.both': 'Both',
      'mk.upload.title': 'Drag the file or click to upload',
      'mk.upload.formats': 'PNG, JPG, SVG (max 5MB)',
      'mk.text.ph': 'Type your text...',
      'mk.font': 'Font', 'mk.color': 'Colour', 'mk.size': 'Size',
      'mk.step2': 'Choose Product', 'mk.prod.mug': 'Mug', 'mk.prod.cap': 'Cap',
      'mk.step3': 'Adjustments', 'mk.opacity': 'Opacity', 'mk.scale': 'Scale', 'mk.rotation': 'Rotation',
      'mk.reset': 'Reset', 'mk.step4': 'Product Colour',
      'mk.download': 'Download Mockup', 'mk.quote': 'Request Quote',
      'mk.modal.title': 'Request Quote',
      'mk.modal.subtitle': 'We will send your mockup with contact details via WhatsApp.',
      'mk.modal.name': 'Name *', 'mk.modal.company': 'Company *',
      'mk.modal.phone': 'Phone *', 'mk.modal.qty': 'Quantity',
      'mk.modal.notes': 'Notes', 'mk.modal.color': 'White', 'mk.modal.send': 'Send via WhatsApp',
      'mk.rotate.hint': 'Drag to rotate product',
      'nav.servicos': 'Services', 'nav.portfolio': 'Portfolio', 'nav.clientes': 'Clients',
      'nav.sobre': 'About', 'nav.mockup': 'Customize', 'nav.orcamento': 'Request Quote',
      'foot.p': 'Where creativity meets excellence. Luanda, Angola.',
      'foot.slogan': '"Question, Innovate, Experiment"',
      'foot.serv': 'Services', 'foot.emp': 'Company', 'foot.sobre': 'About us',
      'foot.processo': 'How we work', 'foot.contacto': 'Contact',
      's1.h3': 'Trade Fair Stands', 's2.h3': 'Large Format Printing',
      's3.h3': 'Corporate Gifts', 's4.h3': 'Custom Textiles',
    },
    fr: {
      'mk.badge': 'Personnalisation en Temps Reel',
      'mk.h1': 'Visualisez votre marque<br /><em>sur nos produits</em>',
      'mk.subtitle': 'Telechargez votre logo, visualisez en 3D et demandez un devis.',
      'mk.step1': 'Votre Design', 'mk.logo': 'Logo', 'mk.text': 'Texte', 'mk.both': 'Les deux',
      'mk.upload.title': 'Glissez ou cliquez pour telecharger',
      'mk.upload.formats': 'PNG, JPG, SVG (max 5Mo)',
      'mk.step2': 'Choisir le Produit', 'mk.prod.mug': 'Tasse', 'mk.prod.cap': 'Casquette',
      'mk.step3': 'Ajustements', 'mk.opacity': 'Opacite', 'mk.scale': 'Echelle', 'mk.rotation': 'Rotation',
      'mk.reset': 'Reinitialiser', 'mk.step4': 'Couleur du Produit',
      'mk.download': 'Telecharger', 'mk.quote': 'Demander un Devis',
      'mk.rotate.hint': 'Glissez pour pivoter',
      'nav.servicos': 'Services', 'nav.portfolio': 'Portfolio', 'nav.clientes': 'Clients',
      'nav.sobre': 'A propos', 'nav.mockup': 'Personnaliser', 'nav.orcamento': 'Demander un Devis',
    },
    zh: {
      'mk.badge': '实时定制', 'mk.h1': '在产品上<br /><em>展示您的品牌</em>',
      'mk.subtitle': '上传标志，查看逼真3D效果。',
      'mk.step1': '您的设计', 'mk.logo': '标志', 'mk.text': '文字', 'mk.both': '两者',
      'mk.upload.title': '拖拽或点击上传',
      'mk.step2': '选择产品', 'mk.prod.mug': '马克杯', 'mk.prod.cap': '帽子',
      'mk.step3': '调整', 'mk.opacity': '透明度', 'mk.scale': '比例', 'mk.rotation': '旋转',
      'mk.reset': '重置', 'mk.step4': '产品颜色',
      'mk.download': '下载', 'mk.quote': '申请报价', 'mk.rotate.hint': '拖拽旋转',
      'nav.servicos': '服务', 'nav.portfolio': '作品集', 'nav.clientes': '客户',
      'nav.sobre': '关于我们', 'nav.mockup': '定制产品', 'nav.orcamento': '申请报价',
    },
    ar: {
      'mk.badge': 'تخصيص فوري', 'mk.h1': 'اعرض علامتك<br /><em>على منتجاتنا</em>',
      'mk.subtitle': 'حمّل شعارك وشاهد النتيجة الواقعية.',
      'mk.step1': 'تصميمك', 'mk.logo': 'شعار', 'mk.text': 'نص', 'mk.both': 'كلاهما',
      'mk.upload.title': 'اسحب أو انقر للتحميل',
      'mk.step2': 'اختر المنتج', 'mk.prod.mug': 'كوب', 'mk.prod.cap': 'قبعة',
      'mk.step3': 'التعديلات', 'mk.opacity': 'الشفافية', 'mk.scale': 'المقياس', 'mk.rotation': 'الدوران',
      'mk.reset': 'إعادة تعيين', 'mk.step4': 'لون المنتج',
      'mk.download': 'تحميل', 'mk.quote': 'طلب عرض سعر', 'mk.rotate.hint': 'اسحب للتدوير',
      'nav.servicos': 'الخدمات', 'nav.portfolio': 'المحفظة', 'nav.clientes': 'العملاء',
      'nav.sobre': 'من نحن', 'nav.mockup': 'تخصيص', 'nav.orcamento': 'طلب عرض سعر',
    }
  };

  // ===== STATE =====
  let scene, camera, renderer, envMap;
  let productGroup = null, fabricCanvas;
  let currentProduct = 'tshirt', currentColor = '#FFFFFF', currentMode = 'logo';
  let uploadedImageData = null, currentLang = localStorage.getItem('fi_lang') || 'pt';
  let isDragging = false, prevMouse = { x: 0, y: 0 };
  let targetRot = { x: 0.15, y: 0.4 }, curRot = { x: 0.15, y: 0.4 };
  let targetZoom = 4.0, curZoom = 4.0;
  let designTexture = null, isTransitioning = false;

  // ===== PROCEDURAL TEXTURES =====
  const TEX = {
    fabricNormal: function (sz, intensity) {
      const c = document.createElement('canvas'); c.width = c.height = sz || 512;
      const x = c.getContext('2d'); const s = intensity || 12;
      x.fillStyle = '#8080ff'; x.fillRect(0, 0, c.width, c.height);
      for (let y = 0; y < c.height; y += 4) { x.fillStyle = 'rgb('+(128+Math.sin(y*0.8)*s)+','+(128+Math.cos(y*0.5)*s)+',255)'; x.fillRect(0, y, c.width, 2); }
      for (let i = 0; i < c.width; i += 4) { x.fillStyle = 'rgba('+(128+Math.cos(i*0.8)*s)+','+(128+Math.sin(i*0.5)*s*0.5)+',255,0.5)'; x.fillRect(i, 0, 2, c.height); }
      for (let i = 0; i < 200; i++) {
        const wx = Math.random()*c.width, wy = Math.random()*c.height, wl = 20+Math.random()*60, a = Math.random()*Math.PI;
        x.strokeStyle = 'rgba('+(128+(Math.random()-0.5)*s*2)+','+(128+(Math.random()-0.5)*s)+',255,0.3)';
        x.lineWidth = 1+Math.random()*2; x.beginPath(); x.moveTo(wx,wy); x.lineTo(wx+Math.cos(a)*wl, wy+Math.sin(a)*wl); x.stroke();
      }
      const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3,3); return t;
    },
    fabricRoughness: function (sz) {
      const c = document.createElement('canvas'); c.width = c.height = sz || 256;
      const x = c.getContext('2d');
      x.fillStyle = '#b0b0b0'; x.fillRect(0, 0, c.width, c.height);
      for (let i = 0; i < 5000; i++) { const v = 150+Math.random()*50; x.fillStyle = 'rgb('+v+','+v+','+v+')'; x.fillRect(Math.random()*c.width, Math.random()*c.height, 2+Math.random()*3, 2+Math.random()*3); }
      const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3,3); return t;
    },
    ceramicNormal: function (sz) {
      const c = document.createElement('canvas'); c.width = c.height = sz || 256;
      const x = c.getContext('2d');
      x.fillStyle = '#8080ff'; x.fillRect(0, 0, c.width, c.height);
      for (let i = 0; i < 2000; i++) { const s = 3; x.fillStyle = 'rgb('+(128+(Math.random()-0.5)*s)+','+(128+(Math.random()-0.5)*s)+',255)'; x.fillRect(Math.random()*c.width, Math.random()*c.height, 1, 1); }
      const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
    },
    metalNormal: function (sz) {
      const c = document.createElement('canvas'); c.width = c.height = sz || 512;
      const x = c.getContext('2d');
      x.fillStyle = '#8080ff'; x.fillRect(0, 0, c.width, c.height);
      for (let i = 0; i < c.width; i++) { const o = (Math.random()-0.5)*8; x.strokeStyle = 'rgb('+(128+o)+',128,255)'; x.lineWidth = 0.5; x.beginPath(); x.moveTo(i,0); x.lineTo(i+(Math.random()-0.5)*2, c.height); x.stroke(); }
      const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1,2); return t;
    },
    studioEnv: function () {
      const sz = 256, faces = [];
      for (let i = 0; i < 6; i++) {
        const c = document.createElement('canvas'); c.width = c.height = sz;
        const x = c.getContext('2d'); let g;
        if (i === 2) { g = x.createRadialGradient(sz/2,sz/2,0,sz/2,sz/2,sz); g.addColorStop(0,'#ffffff'); g.addColorStop(0.5,'#f0ece4'); g.addColorStop(1,'#d8d0c8'); }
        else if (i === 3) { g = x.createRadialGradient(sz/2,sz/2,0,sz/2,sz/2,sz); g.addColorStop(0,'#c0b8b0'); g.addColorStop(1,'#a09890'); }
        else { g = x.createLinearGradient(0,0,0,sz); g.addColorStop(0,'#f5f0ea'); g.addColorStop(0.3,'#e8e0d8'); g.addColorStop(0.6,'#d0c8c0'); g.addColorStop(1,'#b8b0a8'); }
        x.fillStyle = g; x.fillRect(0, 0, sz, sz);
        if (i === 0 || i === 1 || i === 4) {
          x.fillStyle = 'rgba(255,255,240,0.25)'; x.beginPath(); x.arc(sz*0.3, sz*0.3, sz*0.25, 0, Math.PI*2); x.fill();
          x.fillStyle = 'rgba(255,248,240,0.15)'; x.beginPath(); x.arc(sz*0.7, sz*0.5, sz*0.2, 0, Math.PI*2); x.fill();
        }
        faces.push(c);
      }
      const ct = new THREE.CubeTexture(faces); ct.needsUpdate = true; return ct;
    }
  };

  // ===== PRODUCT CONFIGS =====
  const PRODUCTS = {
    tshirt: { name: 'T-shirt', camY: 0, camZ: 3.8, build: buildTshirt },
    mug: { name: 'Caneca', camY: 0, camZ: 3.0, build: buildMug },
    cap: { name: 'Bone', camY: 0.2, camZ: 2.8, build: buildCap },
    stanley: { name: 'Stanley', camY: 0, camZ: 3.5, build: buildStanley },
    totebag: { name: 'Tote Bag', camY: 0, camZ: 3.5, build: buildToteBag },
    hoodie: { name: 'Hoodie', camY: 0, camZ: 4.0, build: buildHoodie },
  };

  // ===== INIT =====
  function init() {
    initFabric(); initThree(); switchProduct('tshirt'); bindAllEvents();
    setMockupLang(currentLang);
    document.getElementById('year').textContent = new Date().getFullYear();
    animate();
    setTimeout(function(){ var h=document.getElementById('rotateHint'); if(h) h.classList.add('hidden'); }, 4000);
  }

  // ===== FABRIC DESIGN CANVAS =====
  function initFabric() { fabricCanvas = new fabric.StaticCanvas('designCanvas', { width: 1024, height: 1024, backgroundColor: 'transparent' }); }

  function updateDesignTexture() {
    fabricCanvas.clear(); fabricCanvas.backgroundColor = 'transparent';
    var op = parseInt(document.getElementById('opacitySlider').value)/100;
    var sc = parseInt(document.getElementById('scaleSlider').value)/100;
    var rot = parseInt(document.getElementById('rotationSlider').value);
    var txt = document.getElementById('customText').value.trim();
    var wL = (currentMode==='logo'||currentMode==='both') && uploadedImageData;
    var wT = (currentMode==='text'||currentMode==='both') && txt;
    var items = [], toLoad = wL ? 1 : 0;

    function done() {
      if (!items.length) { fabricCanvas.renderAll(); applyDesign(); return; }
      fabricCanvas.add(new fabric.Group(items, {
        left:512, top:512, originX:'center', originY:'center',
        scaleX:sc, scaleY:sc, angle:rot, opacity:op
      }));
      fabricCanvas.renderAll(); applyDesign();
    }
    function addTxt() {
      if (!wT) return;
      items.push(new fabric.Text(txt, {
        fontFamily: document.getElementById('fontSelect').value,
        fontSize: parseInt(document.getElementById('textSize').value)*3,
        fill: document.getElementById('textColor').value,
        originX:'center', originY:'center', textAlign:'center',
        left:0, top:(wL&&uploadedImageData)?140:0,
        shadow: new fabric.Shadow({color:'rgba(0,0,0,0.15)',blur:8,offsetX:2,offsetY:2})
      }));
    }
    if (wL) {
      fabric.Image.fromURL(uploadedImageData, function(img){
        var s = Math.min(600/img.width, 600/img.height);
        img.set({scaleX:s,scaleY:s,originX:'center',originY:'center',left:0,top:wT?-100:0});
        items.push(img); addTxt(); done();
      });
    } else { addTxt(); done(); }
  }

  function applyDesign() {
    if (!fabricCanvas || !productGroup) return;
    new THREE.TextureLoader().load(fabricCanvas.toDataURL({format:'png'}), function(tex){
      tex.flipY = true; tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      tex.encoding = THREE.sRGBEncoding; designTexture = tex;
      productGroup.traverse(function(ch){ if(ch.isMesh && ch.userData.isDecal){ ch.material.map = designTexture; ch.material.needsUpdate = true; }});
    });
  }

  // ===== THREE.JS SCENE =====
  function initThree() {
    var w = document.getElementById('canvasWrapper'), ww = w.clientWidth||700, wh = w.clientHeight||520;
    scene = new THREE.Scene(); scene.background = new THREE.Color(0xeae6e1);
    envMap = TEX.studioEnv();
    camera = new THREE.PerspectiveCamera(35, ww/wh, 0.1, 100); camera.position.set(0,0,4);
    renderer = new THREE.WebGLRenderer({canvas:document.getElementById('threeCanvas'),antialias:true,preserveDrawingBuffer:true});
    renderer.setSize(ww,wh); renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
    renderer.outputEncoding = THREE.sRGBEncoding; renderer.physicallyCorrectLights = true;

    // Studio lighting
    var key = new THREE.DirectionalLight(0xfff8f0, 3.0); key.position.set(3,6,5);
    key.castShadow=true; key.shadow.mapSize.width=2048; key.shadow.mapSize.height=2048;
    key.shadow.camera.near=0.1; key.shadow.camera.far=20;
    key.shadow.camera.left=-3; key.shadow.camera.right=3; key.shadow.camera.top=3; key.shadow.camera.bottom=-3;
    key.shadow.bias=-0.0005; key.shadow.radius=4; scene.add(key);
    scene.add(new THREE.DirectionalLight(0xe8eeff, 1.2).translateX(-4).translateY(3).translateZ(2));
    scene.add(new THREE.DirectionalLight(0xfff0e0, 1.5).translateY(2).translateZ(-5));
    scene.add(new THREE.HemisphereLight(0xfff8f0, 0xc0b8a8, 0.6));
    scene.add(new THREE.DirectionalLight(0xf0ece8, 0.4).translateY(-3).translateZ(2));

    // Ground shadow
    var gm = new THREE.Mesh(new THREE.PlaneGeometry(12,12), new THREE.ShadowMaterial({opacity:0.15}));
    gm.rotation.x=-Math.PI/2; gm.position.y=-2; gm.receiveShadow=true; scene.add(gm);

    // Studio floor gradient
    var fc = document.createElement('canvas'); fc.width=fc.height=512; var fx = fc.getContext('2d');
    var fg = fx.createRadialGradient(256,200,0,256,256,400);
    fg.addColorStop(0,'#ece8e3'); fg.addColorStop(0.6,'#e2ded8'); fg.addColorStop(1,'#d5d0ca');
    fx.fillStyle=fg; fx.fillRect(0,0,512,512);
    var fm = new THREE.Mesh(new THREE.PlaneGeometry(15,15), new THREE.MeshStandardMaterial({map:new THREE.CanvasTexture(fc),roughness:0.9}));
    fm.rotation.x=-Math.PI/2; fm.position.y=-2.01; scene.add(fm);

    window.addEventListener('resize', function(){
      var w2=document.getElementById('canvasWrapper').clientWidth||700, h2=document.getElementById('canvasWrapper').clientHeight||520;
      camera.aspect=w2/h2; camera.updateProjectionMatrix(); renderer.setSize(w2,h2);
    });
  }

  function animate() {
    requestAnimationFrame(animate);
    curRot.x+=(targetRot.x-curRot.x)*0.06; curRot.y+=(targetRot.y-curRot.y)*0.06;
    curZoom+=(targetZoom-curZoom)*0.08;
    if(productGroup){ productGroup.rotation.y=curRot.y; productGroup.rotation.x=curRot.x; }
    camera.position.z=curZoom; renderer.render(scene,camera);
  }

  // ===== PRODUCT SWITCH =====
  function switchProduct(id) {
    if(isTransitioning) return; isTransitioning=true;
    currentProduct=id; var cfg=PRODUCTS[id];
    if(productGroup){ scene.remove(productGroup); productGroup.traverse(function(ch){ if(ch.isMesh){ ch.geometry.dispose(); if(ch.material.map)ch.material.map.dispose(); if(ch.material.normalMap)ch.material.normalMap.dispose(); if(ch.material.roughnessMap)ch.material.roughnessMap.dispose(); ch.material.dispose(); }}); }
    productGroup=cfg.build(currentColor); productGroup.scale.set(0.01,0.01,0.01); scene.add(productGroup);
    var p=0; (function grow(){ p+=0.04; var t=easeOutBack(Math.min(p,1)), s=0.01+(1-0.01)*t;
      productGroup.scale.set(s,s,s); if(p<1) requestAnimationFrame(grow); else isTransitioning=false;
    })();
    targetRot={x:0.15,y:0.4}; targetZoom=cfg.camZ; camera.position.y=cfg.camY;
    document.getElementById('currentProductName').textContent=cfg.name; updateDesignTexture();
  }
  function easeOutBack(t){ var c1=1.70158,c3=c1+1; return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2); }

  // ===== PBR MATERIALS =====
  function matFabric(col) {
    return new THREE.MeshPhysicalMaterial({ color:new THREE.Color(col), roughness:0.85, metalness:0,
      normalMap:TEX.fabricNormal(512,10), normalScale:new THREE.Vector2(0.4,0.4),
      roughnessMap:TEX.fabricRoughness(256), envMap:envMap, envMapIntensity:0.15, clearcoat:0, side:THREE.DoubleSide });
  }
  function matCeramic(col) {
    return new THREE.MeshPhysicalMaterial({ color:new THREE.Color(col), roughness:0.15, metalness:0,
      normalMap:TEX.ceramicNormal(256), normalScale:new THREE.Vector2(0.1,0.1),
      envMap:envMap, envMapIntensity:0.6, clearcoat:0.8, clearcoatRoughness:0.1, reflectivity:0.8 });
  }
  function matMetal(col) {
    return new THREE.MeshPhysicalMaterial({ color:new THREE.Color(col), roughness:0.25, metalness:0.85,
      normalMap:TEX.metalNormal(512), normalScale:new THREE.Vector2(0.15,0.15),
      envMap:envMap, envMapIntensity:1.0, clearcoat:0.3, clearcoatRoughness:0.2 });
  }
  function matDecal() {
    return new THREE.MeshPhysicalMaterial({ color:0xffffff, roughness:0.55, metalness:0, transparent:true,
      map:designTexture||null, envMap:envMap, envMapIntensity:0.1, side:THREE.FrontSide,
      depthWrite:true, polygonOffset:true, polygonOffsetFactor:-1 });
  }
  function dk(hex,amt){ var c=new THREE.Color(hex); c.r=Math.max(0,c.r-amt); c.g=Math.max(0,c.g-amt); c.b=Math.max(0,c.b-amt); return c; }

  // ===== 3D PRODUCTS =====

  function buildTshirt(color) {
    var g = new THREE.Group(), mat = matFabric(color);
    // Torso (lathe)
    var pts = [[0.60,-1.3],[0.63,-1.0],[0.66,-0.5],[0.65,0.0],[0.62,0.3],[0.55,0.5],[0.35,0.6],[0.18,0.62]];
    var lp = []; pts.forEach(function(p){ lp.push(new THREE.Vector2(p[0],p[1])); });
    var torso = new THREE.Mesh(new THREE.LatheGeometry(lp,64), mat); torso.castShadow=true; torso.receiveShadow=true; g.add(torso);
    // Sleeves
    function sleeve(side){
      var sp=[]; for(var i=0;i<=10;i++){var t=i/10; sp.push(new THREE.Vector2(0.18-t*0.03, t*0.55));}
      var s=new THREE.Mesh(new THREE.LatheGeometry(sp,24),mat); s.position.set(side*0.55,0.25,0); s.rotation.z=side*0.9; s.castShadow=true; return s;
    }
    g.add(sleeve(-1)); g.add(sleeve(1));
    // Collar
    var collar=new THREE.Mesh(new THREE.TorusGeometry(0.22,0.035,16,48),matFabric(color));
    collar.position.set(0,0.58,0); collar.rotation.x=Math.PI/2; g.add(collar);
    // Seams
    var sm=new THREE.LineBasicMaterial({color:dk(color,0.12)});
    [-1,1].forEach(function(side){
      var sp=[]; for(var i=0;i<=20;i++){var t=i/20,y=-1.3+t*1.85,a=side*Math.PI/2,r=0.55+Math.sin(t*Math.PI)*0.08;
        sp.push(new THREE.Vector3(Math.cos(a)*r,y,Math.sin(a)*r));} g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(sp),sm));
    });
    var hp=[]; for(var i=0;i<=64;i++){var a=(i/64)*Math.PI*2; hp.push(new THREE.Vector3(Math.cos(a)*0.555,-1.3,Math.sin(a)*0.555));} g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(hp),sm));
    // Decal
    var dc=new THREE.Mesh(new THREE.CylinderGeometry(0.605,0.615,0.75,64,1,true,-Math.PI*0.28,Math.PI*0.56),matDecal());
    dc.position.y=-0.15; dc.userData.isDecal=true; g.add(dc);
    g.position.y=0.3; return g;
  }

  function buildMug(color) {
    var g=new THREE.Group(), mat=matCeramic(color);
    var mp=[[0.42,-0.7],[0.44,-0.6],[0.47,-0.2],[0.48,0.2],[0.47,0.5],[0.46,0.65],[0.48,0.68],[0.46,0.70],[0.42,0.70],[0.42,0.65],[0.43,0.5],[0.43,-0.2],[0.41,-0.55],[0.0,-0.55],[0.0,-0.7]];
    var lp=[]; mp.forEach(function(p){lp.push(new THREE.Vector2(p[0],p[1]));});
    var body=new THREE.Mesh(new THREE.LatheGeometry(lp,80),mat); body.castShadow=true; body.receiveShadow=true; g.add(body);
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.40,0.05,64),new THREE.MeshPhysicalMaterial({color:0x1a1a1a,roughness:0.9})).translateY(0.67));
    // Handle
    var hc=new THREE.CubicBezierCurve3(new THREE.Vector3(0.47,0.45,0),new THREE.Vector3(0.85,0.45,0),new THREE.Vector3(0.85,-0.35,0),new THREE.Vector3(0.47,-0.35,0));
    var h=new THREE.Mesh(new THREE.TubeGeometry(hc,32,0.05,12,false),mat); h.castShadow=true; g.add(h);
    // Decal
    var dc=new THREE.Mesh(new THREE.CylinderGeometry(0.485,0.455,0.85,80,1,true,Math.PI*0.6,Math.PI*0.8),matDecal());
    dc.material.clearcoat=0.6; dc.material.clearcoatRoughness=0.15; dc.userData.isDecal=true; g.add(dc);
    return g;
  }

  function buildCap(color) {
    var g=new THREE.Group(), mat=matFabric(color); mat.roughness=0.7;
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.65,64,32,0,Math.PI*2,0,Math.PI*0.52),mat).translateY(0));
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.63,0.64,0.08,64,1,true),matFabric(color)).translateY(-0.2));
    // Brim
    var bs=new THREE.Shape(); bs.absarc(0,0,0.64,0,Math.PI,false); bs.lineTo(-0.95,0); bs.absarc(0,0,0.95,Math.PI,0,true); bs.closePath();
    var bm=new THREE.Mesh(new THREE.ExtrudeGeometry(bs,{depth:0.05,bevelEnabled:true,bevelThickness:0.015,bevelSize:0.015,bevelSegments:4}),matFabric(color));
    bm.rotation.x=-Math.PI/2; bm.position.y=-0.25; bm.castShadow=true; g.add(bm);
    // Seams
    var sm=new THREE.LineBasicMaterial({color:dk(color,0.1)});
    for(var i=0;i<6;i++){var a=(i/6)*Math.PI*2,pts=[]; for(var t=0;t<=1;t+=0.04){var phi=t*Math.PI*0.52,r=0.652;
      pts.push(new THREE.Vector3(Math.sin(phi)*Math.cos(a)*r,Math.cos(phi)*r,Math.sin(phi)*Math.sin(a)*r));}
      g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),sm));
    }
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.045,16,16),new THREE.MeshPhysicalMaterial({color:dk(color,0.15),roughness:0.5,envMap:envMap})).translateY(0.6));
    // Decal
    var dc=new THREE.Mesh(new THREE.SphereGeometry(0.656,64,32,Math.PI*0.7,Math.PI*0.6,0.15,Math.PI*0.35),matDecal());
    dc.userData.isDecal=true; g.add(dc); g.position.y=0.1; return g;
  }

  function buildStanley(color) {
    var g=new THREE.Group(), mat=matMetal(color);
    var bp=[[0.32,-0.95],[0.33,-0.9],[0.34,-0.5],[0.36,0.0],[0.37,0.4],[0.38,0.7],[0.375,0.75]];
    var lp=[]; bp.forEach(function(p){lp.push(new THREE.Vector2(p[0],p[1]));});
    var body=new THREE.Mesh(new THREE.LatheGeometry(lp,80),mat); body.castShadow=true; g.add(body);
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.325,0.33,0.06,64),matMetal(color)).translateY(-0.95));
    var lm=matMetal(color); lm.roughness=0.2;
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.39,0.39,0.14,64),lm).translateY(0.82));
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.34,0.38,0.06,64),lm).translateY(0.91));
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,0.1,16),new THREE.MeshPhysicalMaterial({color:0x222222,roughness:0.8})).translateY(0.94).translateX(0.12));
    // Handle
    var hc=new THREE.CubicBezierCurve3(new THREE.Vector3(0.38,0.55,0),new THREE.Vector3(0.65,0.55,0),new THREE.Vector3(0.65,0.1,0),new THREE.Vector3(0.38,0.1,0));
    g.add(new THREE.Mesh(new THREE.TubeGeometry(hc,24,0.035,12,false),lm));
    // Rings
    var rm=new THREE.MeshPhysicalMaterial({color:dk(color,0.1),roughness:0.15,metalness:0.9,envMap:envMap});
    [0.72,0,-0.85].forEach(function(y){var r=new THREE.Mesh(new THREE.TorusGeometry(y<-0.5?0.335:0.38,0.008,8,64),rm); r.position.y=y; r.rotation.x=Math.PI/2; g.add(r);});
    // Decal
    var dc=new THREE.Mesh(new THREE.CylinderGeometry(0.381,0.351,0.7,80,1,true,Math.PI*0.6,Math.PI*0.8),matDecal());
    dc.material.metalness=0.1; dc.material.clearcoat=0.2; dc.position.y=-0.1; dc.userData.isDecal=true; g.add(dc);
    return g;
  }

  function buildToteBag(color) {
    var g=new THREE.Group(), mat=matFabric(color); mat.roughness=0.9;
    // Front (curved)
    var fg=new THREE.PlaneGeometry(1.3,1.6,32,32), fp=fg.attributes.position;
    for(var i=0;i<fp.count;i++){var x=fp.getX(i),y=fp.getY(i); fp.setZ(i,Math.sin(x*1.5)*0.03+Math.sin(y*0.8)*0.02);} fg.computeVertexNormals();
    var front=new THREE.Mesh(fg,mat); front.position.z=0.06; front.castShadow=true; g.add(front);
    var back=new THREE.Mesh(fg.clone(),mat); back.position.z=-0.06; back.rotation.y=Math.PI; g.add(back);
    // Sides
    var sm=matFabric(color); sm.roughness=0.92; var sg=new THREE.PlaneGeometry(0.12,1.6);
    [-1,1].forEach(function(s){var m=new THREE.Mesh(sg,sm); m.position.set(s*0.65,0,0); m.rotation.y=Math.PI/2; g.add(m);});
    g.add(new THREE.Mesh(new THREE.PlaneGeometry(1.3,0.12),sm).translateY(-0.8).rotateX(-Math.PI/2));
    // Handles
    var hm=matFabric(color); hm.roughness=0.8;
    [-0.3,0.3].forEach(function(xO){
      var c=new THREE.CubicBezierCurve3(new THREE.Vector3(xO,0.8,0.06),new THREE.Vector3(xO,1.35,0.06),new THREE.Vector3(xO,1.35,-0.06),new THREE.Vector3(xO,0.8,-0.06));
      var m=new THREE.Mesh(new THREE.TubeGeometry(c,24,0.028,8,false),hm); m.castShadow=true; g.add(m);
    });
    // Decal
    var dg=new THREE.PlaneGeometry(0.85,0.85,16,16),dp=dg.attributes.position;
    for(var i=0;i<dp.count;i++){var x=dp.getX(i),y=dp.getY(i); dp.setZ(i,Math.sin(x*1.5)*0.03+Math.sin(y*0.8)*0.02+0.002);} dg.computeVertexNormals();
    var dc=new THREE.Mesh(dg,matDecal()); dc.position.set(0,-0.05,0.065); dc.userData.isDecal=true; g.add(dc);
    return g;
  }

  function buildHoodie(color) {
    var g=new THREE.Group(), mat=matFabric(color); mat.normalScale=new THREE.Vector2(0.5,0.5);
    // Torso
    var pts=[[0.60,-1.5],[0.63,-1.2],[0.66,-0.6],[0.65,0.0],[0.62,0.3],[0.55,0.5],[0.35,0.6],[0.18,0.62]];
    var lp=[]; pts.forEach(function(p){lp.push(new THREE.Vector2(p[0],p[1]));});
    var t=new THREE.Mesh(new THREE.LatheGeometry(lp,64),mat); t.castShadow=true; g.add(t);
    // Hood
    var hm=matFabric(color); hm.side=THREE.DoubleSide;
    var hood=new THREE.Mesh(new THREE.SphereGeometry(0.35,32,24,0,Math.PI*2,0,Math.PI*0.6),hm);
    hood.position.set(0,0.6,-0.15); hood.rotation.x=-0.3; hood.castShadow=true; g.add(hood);
    g.add(new THREE.Mesh(new THREE.TorusGeometry(0.22,0.025,12,32),matFabric(color)).translateY(0.58).translateZ(0.08).rotateX(Math.PI/2-0.15));
    // Sleeves
    function sleeve(side){var sp=[]; for(var i=0;i<=12;i++){var t=i/12; sp.push(new THREE.Vector2(0.2-t*0.04,t*0.7));}
      var s=new THREE.Mesh(new THREE.LatheGeometry(sp,20),mat); s.position.set(side*0.6,0.18,0); s.rotation.z=side*0.85; s.castShadow=true; return s;}
    g.add(sleeve(-1)); g.add(sleeve(1));
    // Pocket
    var ps=new THREE.Shape(); ps.moveTo(-0.4,0); ps.quadraticCurveTo(-0.42,0.22,-0.35,0.22); ps.lineTo(0.35,0.22); ps.quadraticCurveTo(0.42,0.22,0.4,0); ps.closePath();
    var pm=new THREE.Mesh(new THREE.ExtrudeGeometry(ps,{depth:0.015,bevelEnabled:true,bevelThickness:0.005,bevelSize:0.005,bevelSegments:2}),matFabric(color));
    pm.position.set(0,-0.85,0.6); g.add(pm);
    // Drawstrings + aglets
    var dm=new THREE.MeshPhysicalMaterial({color:dk(color,0.15),roughness:0.6,envMap:envMap});
    [-1,1].forEach(function(side){
      var dp=[]; for(var t=0;t<=1;t+=0.08) dp.push(new THREE.Vector3(side*0.1,0.55-t*0.55,0.64+Math.sin(t*3)*0.01));
      g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(dp),16,0.012,6,false),dm));
      var ag=new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.012,0.04,8),new THREE.MeshPhysicalMaterial({color:0xcccccc,metalness:0.8,roughness:0.2,envMap:envMap}));
      ag.position.set(side*0.1,0,0.65); g.add(ag);
    });
    // Zipper
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.02,1.2,0.02),new THREE.MeshPhysicalMaterial({color:0xb0b0b0,metalness:0.7,roughness:0.3,envMap:envMap})).translateZ(0.66).translateY(-0.25));
    // Hem
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.61,0.60,0.08,64,1,true),matFabric(color)).translateY(-1.46));
    // Decal
    var dc=new THREE.Mesh(new THREE.CylinderGeometry(0.655,0.66,0.65,64,1,true,-Math.PI*0.25,Math.PI*0.5),matDecal());
    dc.position.y=-0.15; dc.userData.isDecal=true; g.add(dc);
    g.position.y=0.4; return g;
  }

  // ===== CONTROLS =====
  function setupControls(el) {
    el.addEventListener('mousedown',function(e){isDragging=true;prevMouse={x:e.clientX,y:e.clientY};document.getElementById('rotateHint')?.classList.add('hidden');});
    window.addEventListener('mousemove',function(e){if(!isDragging)return;targetRot.y+=(e.clientX-prevMouse.x)*0.007;targetRot.x+=(e.clientY-prevMouse.y)*0.004;targetRot.x=Math.max(-0.6,Math.min(0.6,targetRot.x));prevMouse={x:e.clientX,y:e.clientY};});
    window.addEventListener('mouseup',function(){isDragging=false;});
    el.addEventListener('touchstart',function(e){isDragging=true;prevMouse={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
    el.addEventListener('touchmove',function(e){if(!isDragging)return;targetRot.y+=(e.touches[0].clientX-prevMouse.x)*0.007;targetRot.x+=(e.touches[0].clientY-prevMouse.y)*0.004;targetRot.x=Math.max(-0.6,Math.min(0.6,targetRot.x));prevMouse={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
    el.addEventListener('touchend',function(){isDragging=false;});
    el.addEventListener('wheel',function(e){e.preventDefault();targetZoom=Math.max(2,Math.min(7,targetZoom+e.deltaY*0.003));},{passive:false});
  }

  // ===== ALL EVENTS =====
  function bindAllEvents() {
    setupControls(document.getElementById('canvasWrapper'));
    document.querySelectorAll('.mode-btn').forEach(function(b){b.addEventListener('click',function(){
      document.querySelectorAll('.mode-btn').forEach(function(x){x.classList.remove('active');}); b.classList.add('active');
      currentMode=b.dataset.mode;
      document.getElementById('uploadZone').style.display=currentMode==='text'?'none':'flex';
      document.getElementById('textInputGroup').style.display=currentMode==='logo'?'none':'block';
      updateDesignTexture();
    });});
    var uz=document.getElementById('uploadZone'),fi=document.getElementById('fileInput');
    uz.addEventListener('click',function(e){if(!e.target.closest('#removeUpload'))fi.click();});
    uz.addEventListener('dragover',function(e){e.preventDefault();uz.classList.add('drag-over');});
    uz.addEventListener('dragleave',function(){uz.classList.remove('drag-over');});
    uz.addEventListener('drop',function(e){e.preventDefault();uz.classList.remove('drag-over');if(e.dataTransfer.files.length)handleFile(e.dataTransfer.files[0]);});
    fi.addEventListener('change',function(){if(fi.files.length)handleFile(fi.files[0]);});
    document.getElementById('removeUpload').addEventListener('click',function(e){
      e.stopPropagation();uploadedImageData=null;document.getElementById('uploadContent').style.display='flex';
      document.getElementById('uploadPreview').style.display='none';fi.value='';updateDesignTexture();
    });
    document.querySelectorAll('.product-card').forEach(function(c){c.addEventListener('click',function(){
      document.querySelectorAll('.product-card').forEach(function(x){x.classList.remove('active');});c.classList.add('active');switchProduct(c.dataset.product);
    });});
    document.querySelectorAll('.color-swatch').forEach(function(s){s.addEventListener('click',function(){
      document.querySelectorAll('.color-swatch').forEach(function(x){x.classList.remove('active');});s.classList.add('active');currentColor=s.dataset.color;switchProduct(currentProduct);
    });});
    ['opacitySlider','scaleSlider','rotationSlider'].forEach(function(id){document.getElementById(id).addEventListener('input',function(){updateDesignTexture();});});
    document.getElementById('customText').addEventListener('input',function(){updateDesignTexture();});
    document.getElementById('fontSelect').addEventListener('change',function(){updateDesignTexture();});
    document.getElementById('textColor').addEventListener('input',function(e){document.getElementById('textColorHex').textContent=e.target.value.toUpperCase();updateDesignTexture();});
    document.getElementById('textSize').addEventListener('input',function(){updateDesignTexture();});
    document.getElementById('resetBtn').addEventListener('click',function(){
      document.getElementById('opacitySlider').value=100;document.getElementById('scaleSlider').value=100;document.getElementById('rotationSlider').value=0;
      targetRot={x:0.15,y:0.4};updateDesignTexture();
    });
    document.getElementById('zoomInBtn').addEventListener('click',function(){targetZoom=Math.max(2,targetZoom-0.5);});
    document.getElementById('zoomOutBtn').addEventListener('click',function(){targetZoom=Math.min(7,targetZoom+0.5);});
    document.getElementById('resetViewBtn').addEventListener('click',function(){targetZoom=PRODUCTS[currentProduct].camZ;targetRot={x:0.15,y:0.4};});
    document.getElementById('downloadBtn').addEventListener('click',downloadMockup);
    document.getElementById('quoteBtn').addEventListener('click',openQuoteModal);
    document.getElementById('modalClose').addEventListener('click',closeQuoteModal);
    document.getElementById('quoteModal').addEventListener('click',function(e){if(e.target.id==='quoteModal')closeQuoteModal();});
    document.getElementById('quoteForm').addEventListener('submit',submitQuote);
    var hb=document.getElementById('hamburger'),nl=document.getElementById('navLinks');
    if(hb&&nl){hb.addEventListener('click',function(){nl.classList.toggle('open');});nl.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nl.classList.remove('open');});});}
  }

  function handleFile(f){
    if(!['image/png','image/jpeg','image/svg+xml','image/webp'].includes(f.type)){alert('Formato nao suportado.');return;}
    if(f.size>5*1024*1024){alert('Ficheiro demasiado grande. Max 5MB.');return;}
    var r=new FileReader(); r.onload=function(e){
      uploadedImageData=e.target.result;document.getElementById('uploadContent').style.display='none';
      document.getElementById('uploadPreview').style.display='block';document.getElementById('uploadedImg').src=uploadedImageData;updateDesignTexture();
    }; r.readAsDataURL(f);
  }

  function downloadMockup(){
    var w=renderer.domElement.width,h=renderer.domElement.height;
    renderer.setSize(w*2,h*2); renderer.render(scene,camera);
    var a=document.createElement('a'); a.download='mockup-'+currentProduct+'-factoryideas.png'; a.href=renderer.domElement.toDataURL('image/png'); a.click();
    renderer.setSize(w,h);
  }

  function openQuoteModal(){
    document.getElementById('quoteModal').classList.add('open');
    document.getElementById('summaryProduct').textContent=PRODUCTS[currentProduct].name;
    renderer.render(scene,camera);
    document.getElementById('summaryThumb').innerHTML='<img src="'+renderer.domElement.toDataURL('image/png')+'" alt="Preview"/>';
  }
  function closeQuoteModal(){document.getElementById('quoteModal').classList.remove('open');}
  function submitQuote(e){
    e.preventDefault();
    var n=document.getElementById('quoteName').value,c=document.getElementById('quoteCompany').value,
    p=document.getElementById('quotePhone').value,q=document.getElementById('quoteQty').value,
    notes=document.getElementById('quoteNotes').value,prod=PRODUCTS[currentProduct].name;
    var msg='Ola Factory Ideas! Gostaria de solicitar um orcamento.\n\n*Nome:* '+n+'\n*Empresa:* '+c+'\n*Telefone:* '+p+
    '\n*Produto:* '+prod+'\n*Cor:* '+currentColor+'\n'+(q?'*Quantidade:* '+q+'\n':'')+(notes?'*Obs:* '+notes+'\n':'')+
    '\n_Mockup 3D criado na plataforma Factory Ideas._';
    window.open('https://wa.me/244922698044?text='+encodeURIComponent(msg),'_blank');closeQuoteModal();
  }

  window.setMockupLang=function(lang){
    if(!MK_T[lang])return; currentLang=lang; localStorage.setItem('fi_lang',lang);
    document.documentElement.setAttribute('lang',lang);document.documentElement.setAttribute('dir',lang==='ar'?'rtl':'ltr');
    var t=MK_T[lang];
    document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(t[k]!==undefined)el.textContent=t[k];});
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){var k=el.getAttribute('data-i18n-html');if(t[k]!==undefined)el.innerHTML=t[k];});
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){var k=el.getAttribute('data-i18n-ph');if(t[k]!==undefined)el.placeholder=t[k];});
    document.querySelectorAll('.lang-btn').forEach(function(b){b.classList.toggle('active',b.dataset.lang===lang);});
    var mug=document.querySelector('[data-product="mug"] span'),cap=document.querySelector('[data-product="cap"] span');
    if(mug&&t['mk.prod.mug'])mug.textContent=t['mk.prod.mug']; if(cap&&t['mk.prod.cap'])cap.textContent=t['mk.prod.cap'];
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
