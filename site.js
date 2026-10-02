// Ride Media site shared behaviour
(function(){
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
  // mobile nav
  var b=document.getElementById('burger'),l=document.getElementById('navLinks');
  if(b&&l){ b.onclick=function(){l.classList.toggle('mob')};
    l.querySelectorAll('a').forEach(function(a){a.onclick=function(){l.classList.remove('mob')}}); }
  // reveal on scroll
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}})},{threshold:.12});
    document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
    // count-up
    var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);
      var el=e.target,end=parseFloat(el.dataset.count),dec=parseInt(el.dataset.dec||'0',10),t0=null;
      function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1200,1);el.textContent=(end*(1-Math.pow(1-p,3))).toFixed(dec);if(p<1)requestAnimationFrame(f)}
      requestAnimationFrame(f)})},{threshold:.5});
    document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el)});
  } else { document.querySelectorAll('.rv').forEach(function(el){el.classList.add('vis')}); }
  // live KM ticker (rider page phone mock only)
  var kmEl=document.getElementById('kmLive');
  if(kmEl){
    var km=0,pt=0,mn=0,ptEl=document.getElementById('ptLive'),mnEl=document.getElementById('minLive');
    setInterval(function(){km+=Math.random()*0.03;pt+=Math.random()>0.5?1:0;mn+=1/60;
      kmEl.textContent=km.toFixed(2);
      if(ptEl)ptEl.textContent=pt;
      if(mnEl)mnEl.textContent=Math.floor(mn);
    },1000);
  }
  // faq accordion
  document.querySelectorAll('.faq-item').forEach(function(it){
    var q=it.querySelector('.faq-q'); if(!q)return;
    q.onclick=function(){var o=it.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(x){x.classList.remove('open')});
      if(!o)it.classList.add('open')};
  });
  // mailto forms (no backend on static site — composes an email instead)
  function mailto(kind, data){
    var to='sanketrkm@gmail.com', subject, body;
    if(kind==='brand'){
      subject='Ride Media pilot — Brand enquiry from '+data.name;
      body='Name: '+data.name+'\nCompany/Brand: '+data.company+'\nContact: '+data.contact+'\nZone: '+data.zone+'\nBudget: '+data.budget+'\n\nMessage:\n'+data.message;
    } else {
      subject='Ride Media pilot — Rider signup from '+data.name;
      body='Name: '+data.name+'\nPhone: '+data.contact+'\nVehicle: '+data.vehicle+'\nZone: '+data.zone+'\n\nNote:\n'+data.message;
    }
    window.location.href='mailto:'+to+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  }
  ['brand','rider'].forEach(function(kind){
    var f=document.getElementById(kind+'Form'); if(!f)return;
    f.addEventListener('submit',function(ev){
      ev.preventDefault();
      var g=function(n){var el=f.querySelector('[name='+n+']');return el?el.value.trim():''};
      var data={name:g('name'),company:g('company'),contact:g('contact'),vehicle:g('vehicle'),zone:g('zone'),budget:g('budget'),message:g('message')};
      if(!data.name||!data.contact){alert('Please fill your name and contact number.');return}
      mailto(kind,data);
    });
  });
})();
