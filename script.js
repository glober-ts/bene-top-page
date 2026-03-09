
/* ===== v93 floating toTop ===== */
(function(){
  const btn = document.querySelector('.toTop');
  if(!btn) return;
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY || document.documentElement.scrollTop;
    if(h > 0 && y > h * 0.5) btn.classList.add('is-show');
    else btn.classList.remove('is-show');
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  btn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });
})();


/* v97 header controls */
(function(){
  const btn = document.querySelector('.hamburger');
  const gnav = document.getElementById('gnav');
  if(btn && gnav){
    btn.addEventListener('click', () => {
      const open = gnav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.documentElement.classList.toggle('noScroll', open);
    });
  }
  const sbtn = document.getElementById('searchFocusBtn');
  const q = document.getElementById('q');
  if(sbtn && q){
    sbtn.addEventListener('click', () => { q.focus(); });
  }
})();

/* v98 hamburger toggle */
(function(){
  const btn = document.querySelector('.hamburger');
  const menu = document.getElementById('gnav');
  if(!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

/* v99: robust mobile menu toggle */
(function(){
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('gnav');
  const back = document.getElementById('gnavBackdrop');
  const close = menu ? menu.querySelector('.gnavClose') : null;
  if(!btn || !menu) return;

  function open(){
    menu.classList.add('is-open');
    if(back) back.classList.add('is-open');
    btn.setAttribute('aria-expanded','true');
  }
  function closeFn(){
    menu.classList.remove('is-open');
    if(back) back.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
  }
  btn.addEventListener('click', ()=>{
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeFn() : open();
  });
  if(close) close.addEventListener('click', closeFn);
  if(back) back.addEventListener('click', closeFn);
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeFn();
  });
})();


/* v100: init after DOM ready */
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('gnav');
  const back = document.getElementById('gnavBackdrop');
  const closeBtn = menu ? menu.querySelector('.gnavClose') : null;

  const openMenu = () => {
    if(!menu) return;
    menu.classList.add('is-open');
    if(back) back.classList.add('is-open');
    if(btn) btn.setAttribute('aria-expanded','true');
  };
  const closeMenu = () => {
    if(!menu) return;
    menu.classList.remove('is-open');
    if(back) back.classList.remove('is-open');
    if(btn) btn.setAttribute('aria-expanded','false');
  };

  if(btn && menu){
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      menu.classList.contains('is-open') ? closeMenu() : openMenu();
    });
  }
  if(closeBtn) closeBtn.addEventListener('click', closeMenu);
  if(back) back.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') { closeMenu(); closeSearch(); } });

  // Search modal
  const modal = document.getElementById('searchModal');
  const searchBtn = document.getElementById('searchFocusBtn') || document.querySelector('.icoBtn--search');
  const input = document.getElementById('searchInput');
  const form = document.getElementById('searchForm');

  function openSearch(){
    if(!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    setTimeout(()=>{ if(input) input.focus(); }, 0);
  }
  window.closeSearch = function closeSearch(){
    if(!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
  }

  if(searchBtn){
    searchBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      e.stopPropagation();
      openSearch();
    });
  }
  if(modal){
    modal.addEventListener('click', (e)=>{
      const t = e.target;
      if(t && t.getAttribute && t.getAttribute('data-close') === '1'){
        closeSearch();
      }
    });
  }
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const q = (input && input.value ? input.value.trim() : '');
      if(!q) return;
      const url = 'https://store.shopping.yahoo.co.jp/benebene/search.html?p=' + encodeURIComponent(q);
      window.location.href = url;
    });
  }
});

/* v101: modal + drawer interaction fixes */
document.addEventListener('DOMContentLoaded', () => {
  // Search modal
  const modal = document.getElementById('searchModal');
  const closeBtn = modal ? modal.querySelector('.modalClose') : null;
  const back = modal ? modal.querySelector('.modalBackdrop') : null;
  const chips = modal ? modal.querySelectorAll('.chip') : [];
  const openBtn = document.getElementById('searchFocusBtn') || document.querySelector('.icoBtn--search');

  function openSearch(){
    if(!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    const input = document.getElementById('searchInput');
    setTimeout(()=>{ if(input) input.focus(); }, 0);
  }
  function closeSearch(){
    if(!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
  }
  window.closeSearch = closeSearch;

  if(openBtn){
    openBtn.addEventListener('click', (e)=>{ e.preventDefault(); openSearch(); });
  }
  if(closeBtn){
    closeBtn.addEventListener('click', (e)=>{ e.preventDefault(); closeSearch(); });
  }
  if(back){
    back.addEventListener('click', (e)=>{ e.preventDefault(); closeSearch(); });
  }
  chips.forEach(a=> a.addEventListener('click', ()=> closeSearch()));

  // Drawer
  const menuBtn = document.getElementById('menuBtn');
  const drawer = document.getElementById('gnav');
  const drawerBack = document.getElementById('gnavBackdrop');
  const drawerClose = drawer ? drawer.querySelector('.gnavClose') : null;

  const lock = () => { document.documentElement.classList.add('noScroll'); document.body.classList.add('noScroll'); };
  const unlock = () => { document.documentElement.classList.remove('noScroll'); document.body.classList.remove('noScroll'); };

  function openDrawer(){
    if(!drawer) return;
    drawer.classList.add('is-open');
    if(drawerBack) drawerBack.classList.add('is-open');
    if(menuBtn) menuBtn.setAttribute('aria-expanded','true');
    lock();
  }
  function closeDrawer(){
    if(!drawer) return;
    drawer.classList.remove('is-open');
    if(drawerBack) drawerBack.classList.remove('is-open');
    if(menuBtn) menuBtn.setAttribute('aria-expanded','false');
    unlock();
  }

  if(menuBtn && drawer){
    menuBtn.addEventListener('click', (e)=>{
      e.preventDefault(); e.stopPropagation();
      drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
    });
  }
  if(drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if(drawerBack) drawerBack.addEventListener('click', closeDrawer);

  const dSearch = document.getElementById('drawerSearchBtn');
  if(dSearch) dSearch.addEventListener('click', ()=>{ closeDrawer(); openSearch(); });

  if(drawer){
    drawer.addEventListener('click', (e)=>{ e.stopPropagation(); });
  }

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){ closeDrawer(); closeSearch(); }
  });
});

/* v102: robust global handlers (fallback-safe) */
(function(){
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  const drawer = ()=>document.getElementById('gnav');
  const backdrop = ()=>document.getElementById('gnavBackdrop');
  const menuBtn = ()=>document.getElementById('menuBtn');

  function lock(){ document.documentElement.classList.add('noScroll'); document.body.classList.add('noScroll'); }
  function unlock(){ document.documentElement.classList.remove('noScroll'); document.body.classList.remove('noScroll'); }

  window.__openDrawer = function(){
    const d = drawer(); if(!d) return;
    d.classList.add('is-open');
    const b = backdrop(); if(b) b.classList.add('is-open');
    const mb = menuBtn(); if(mb) mb.setAttribute('aria-expanded','true');
    lock();
  };
  window.__closeDrawer = function(){
    const d = drawer(); if(!d) return;
    d.classList.remove('is-open');
    const b = backdrop(); if(b) b.classList.remove('is-open');
    const mb = menuBtn(); if(mb) mb.setAttribute('aria-expanded','false');
    unlock();
  };
  window.__toggleDrawer = function(){
    const d = drawer(); if(!d) return;
    d.classList.contains('is-open') ? window.__closeDrawer() : window.__openDrawer();
  };

  window.__openSearch = function(){
    const modal = document.getElementById('searchModal'); if(!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    const input = document.getElementById('searchInput');
    setTimeout(()=>{ if(input) input.focus(); }, 0);
  };
  window.__closeSearch = function(){
    const modal = document.getElementById('searchModal'); if(!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
  };

  document.addEventListener('DOMContentLoaded', () => {
    // Hamburger click (capture to beat other handlers)
    const mb = menuBtn();
    if(mb){
      mb.addEventListener('click', (e)=>{
        e.preventDefault(); e.stopPropagation();
        window.__toggleDrawer();
      }, true);
    }
    const d = drawer();
    const b = backdrop();
    if(b) b.addEventListener('click', (e)=>{ e.preventDefault(); window.__closeDrawer(); }, true);
    if(d){
      const x = $('.gnavClose', d);
      if(x) x.addEventListener('click', (e)=>{ e.preventDefault(); window.__closeDrawer(); }, true);
      d.addEventListener('click', (e)=>{ e.stopPropagation(); }, true);
    }

    // Search open button (header)
    const openBtn = document.getElementById('searchFocusBtn') || document.querySelector('.icoBtn--search');
    if(openBtn){
      openBtn.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); window.__openSearch(); }, true);
    }
    // Search open button (drawer)
    const dSearch = document.getElementById('drawerSearchBtn');
    if(dSearch){
      dSearch.addEventListener('click', (e)=>{ e.preventDefault(); window.__closeDrawer(); window.__openSearch(); }, true);
    }

    // Modal close
    const modal = document.getElementById('searchModal');
    if(modal){
      const closeBtn = $('.modalClose', modal);
      const back = $('.modalBackdrop', modal);
      if(closeBtn) closeBtn.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); window.__closeSearch(); }, true);
      if(back) back.addEventListener('click', (e)=>{ e.preventDefault(); window.__closeSearch(); }, true);

      // Chips: force navigation
      $$('.chip', modal).forEach(a=>{
        a.addEventListener('click', (e)=>{
          e.preventDefault();
          const href = a.getAttribute('href');
          window.__closeSearch();
          if(href) window.location.href = href;
        }, true);
      });
    }

    // ESC
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){ window.__closeDrawer(); window.__closeSearch(); }
    });
  });
})();

/* v103: wire search modal (existing markup) */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('searchModal');
  if(!modal) return;

  const openBtns = [
    document.getElementById('searchFocusBtn'),
    document.querySelector('.icoBtn--search'),
    document.getElementById('drawerSearchBtn')
  ].filter(Boolean);

  const overlay = modal.querySelector('.searchModal__overlay');
  const closeBtn = modal.querySelector('#searchCloseBtn') || modal.querySelector('.searchModal__close');
  const form = modal.querySelector('form.searchModal__form');
  const input = modal.querySelector('#searchModalInput');

  const open = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    setTimeout(()=>{ if(input) input.focus(); }, 0);
  };
  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
  };

  openBtns.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      e.stopPropagation();
      // if drawer button, close drawer first if helper exists
      if(btn.id === 'drawerSearchBtn' && window.__closeDrawer) window.__closeDrawer();
      open();
    }, true);
  });

  if(overlay){
    overlay.addEventListener('click', (e)=>{ e.preventDefault(); close(); }, true);
  }
  if(closeBtn){
    closeBtn.addEventListener('click', (e)=>{ e.preventDefault(); close(); }, true);
  }

  // One-click chips: buttons with data-q
  modal.querySelectorAll('.chip[data-q]').forEach(chip=>{
    chip.addEventListener('click', (e)=>{
      e.preventDefault();
      const q = chip.getAttribute('data-q') || '';
      if(input) input.value = q;
      if(form) form.submit();
    }, true);
  });

  // ESC
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
});

/* v104: ensure drawer search button opens modal on mobile */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('searchModal');
  const openModal = () => {
    if(!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    const input = modal.querySelector('#searchModalInput');
    setTimeout(()=>{ if(input) input.focus(); }, 0);
  };

  const btn = document.getElementById('drawerSearchBtn');
  if(btn){
    btn.addEventListener('click', (e)=>{
      e.preventDefault(); e.stopPropagation();
      if(window.__closeDrawer) window.__closeDrawer();
      openModal();
    }, true);
  }

  const gnav = document.getElementById('gnav');
  if(gnav){
    gnav.addEventListener('click', (e)=>{
      const t = e.target;
      const el = t && t.closest ? t.closest('button.drawerIco[aria-label="検索"]') : null;
      if(el){
        e.preventDefault(); e.stopPropagation();
        if(window.__closeDrawer) window.__closeDrawer();
        openModal();
      }
    }, true);
  }
});

/* v106: force close button binding */
document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.getElementById('gnav');
  if(!drawer) return;
  const closeBtn = drawer.querySelector('.gnavClose');
  if(closeBtn){
    closeBtn.addEventListener('click', (e)=>{
      e.preventDefault(); e.stopPropagation();
      if(window.__closeDrawer) window.__closeDrawer();
      else drawer.classList.remove('is-open');
    }, true);
  }
}, { once:true });

/* v107: close button must always close drawer */
document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.getElementById('gnav');
  if(!drawer) return;
  const closeBtn = drawer.querySelector('.gnavClose');
  if(closeBtn){
    closeBtn.addEventListener('click', (e)=>{
      e.preventDefault(); e.stopPropagation();
      if(window.__closeDrawer) window.__closeDrawer();
      else {
        drawer.classList.remove('is-open');
        const b = document.getElementById('gnavBackdrop');
        if(b) b.classList.remove('is-open');
        document.documentElement.classList.remove('noScroll');
        document.body.classList.remove('noScroll');
      }
    }, true);
  }
}, { once:true });

/* v108: ensure floating contact buttons are visible from load */
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.floatActions, .floatContact, .floatButtons').forEach(el=>{
    el.classList.add('is-show');
    el.style.display = 'flex';
  });
});


/* v110: robust drawer close + toTop after 50% scroll */
(function(){
  function closeDrawer(){
    const drawer = document.getElementById('gnav');
    const backdrop = document.getElementById('gnavBackdrop') || document.querySelector('.gnavBackdrop');
    if(drawer) drawer.classList.remove('is-open');
    if(backdrop) backdrop.classList.remove('is-open');
    document.documentElement.classList.remove('noScroll');
    document.body.classList.remove('noScroll');
  }
  // expose for onclick fallback
  window.__closeDrawer = window.__closeDrawer || closeDrawer;

  document.addEventListener('DOMContentLoaded', ()=>{
    const drawer = document.getElementById('gnav');
    if(drawer){
      const closeBtn = drawer.querySelector('.gnavClose');
      if(closeBtn){
        closeBtn.addEventListener('click', (e)=>{
          e.preventDefault(); e.stopPropagation();
          (window.__closeDrawer || closeDrawer)();
        }, true);
      }
      // clicking backdrop closes too
      const backdrop = document.getElementById('gnavBackdrop') || document.querySelector('.gnavBackdrop');
      if(backdrop){
        backdrop.addEventListener('click', (e)=>{
          e.preventDefault(); e.stopPropagation();
          (window.__closeDrawer || closeDrawer)();
        }, true);
      }
    }

    // toTop show after 50% scroll
    const toTop = document.getElementById('toTopBtn') || document.querySelector('.toTop, .floatTop');
    const updateToTop = ()=>{
      if(!toTop) return;
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const ratio = (window.scrollY || doc.scrollTop || 0) / scrollable;
      if(ratio >= 0.5) toTop.classList.add('is-show');
      else toTop.classList.remove('is-show');
    };
    updateToTop();
    window.addEventListener('scroll', updateToTop, { passive:true });
    window.addEventListener('resize', updateToTop);
  });
})();

/* v111: final overrides for drawer close and toTop */
(function(){
  function closeDrawerNow(){
    const drawer = document.getElementById('gnav');
    const backdrop = document.getElementById('gnavBackdrop') || document.querySelector('.gnavBackdrop');
    if(drawer) drawer.classList.remove('is-open');
    if(backdrop) backdrop.classList.remove('is-open');
    document.documentElement.classList.remove('noScroll');
    document.body.classList.remove('noScroll');
  }
  window.__closeDrawer = closeDrawerNow;

  document.addEventListener('click', function(e){
    const closeBtn = e.target && e.target.closest ? e.target.closest('.gnavClose') : null;
    if(closeBtn){
      e.preventDefault();
      e.stopPropagation();
      closeDrawerNow();
    }
  }, true);

  document.addEventListener('DOMContentLoaded', function(){
    const toTop = document.getElementById('toTopBtn') || document.querySelector('.toTop');
    function updateToTop(){
      if(!toTop) return;
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      const y = window.pageYOffset || doc.scrollTop || 0;
      const ratio = y / scrollable;
      if(ratio >= 0.5){
        toTop.classList.add('is-show');
      }else{
        toTop.classList.remove('is-show');
      }
    }
    updateToTop();
    window.addEventListener('scroll', updateToTop, {passive:true});
    window.addEventListener('resize', updateToTop);
    if(toTop){
      toTop.addEventListener('click', function(e){
        e.preventDefault();
        window.scrollTo({top:0, behavior:'smooth'});
      }, true);
    }
  });
})();

/* v112: final force fixes for drawer close + toTop */
(function(){
  window.__closeDrawer = function(){
    var drawer = document.getElementById('gnav');
    var backdrop = document.getElementById('gnavBackdrop') || document.querySelector('.gnavBackdrop');
    if(drawer) drawer.classList.remove('is-open');
    if(backdrop) backdrop.classList.remove('is-open');
    document.documentElement.classList.remove('noScroll');
    document.body.classList.remove('noScroll');
  };

  function bindFixes(){
    var closeBtn = document.querySelector('#gnav .gnavClose');
    if(closeBtn){
      closeBtn.onclick = function(e){
        if(e){ e.preventDefault(); e.stopPropagation(); }
        window.__closeDrawer();
        return false;
      };
    }

    var toTop = document.getElementById('toTopBtn');
    function updateToTop(){
      if(!toTop) return;
      var doc = document.documentElement;
      var scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      var y = window.pageYOffset || doc.scrollTop || 0;
      if((y / scrollable) >= 0.5){ toTop.classList.add('is-show'); }
      else { toTop.classList.remove('is-show'); }
    }
    if(toTop){
      toTop.onclick = function(e){
        if(e){ e.preventDefault(); }
        window.scrollTo({top:0, behavior:'smooth'});
      };
      updateToTop();
      window.addEventListener('scroll', updateToTop, {passive:true});
      window.addEventListener('resize', updateToTop);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bindFixes);
  } else {
    bindFixes();
  }
})();

/* v113: show toTop after 50vh, not after 50% of total page */
(function(){
  function setupToTop(){
    const btn = document.getElementById('toTopBtn') || document.querySelector('.toTop') || document.querySelector('.floatTop');
    if(!btn) return;

    function update(){
      const y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const threshold = Math.max(1, window.innerHeight * 0.5);
      if(y >= threshold){
        btn.classList.add('is-show');
      }else{
        btn.classList.remove('is-show');
      }
    }

    btn.onclick = function(e){
      if(e) e.preventDefault();
      window.scrollTo({top:0, behavior:'smooth'});
      return false;
    };

    update();
    window.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupToTop);
  }else{
    setupToTop();
  }
})();

/* v114: guaranteed toTop behavior */
(function(){
  function ensureToTop(){
    var btn = document.getElementById('toTopBtn');
    if(!btn) return;

    function update(){
      var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var threshold = Math.max(1, window.innerHeight * 0.5);
      if(y >= threshold){
        btn.classList.add('is-show');
      }else{
        btn.classList.remove('is-show');
      }
    }

    btn.onclick = function(e){
      if(e) e.preventDefault();
      window.scrollTo({top:0, behavior:'smooth'});
      return false;
    };

    update();
    window.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update);
    setTimeout(update, 300);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ensureToTop);
  } else {
    ensureToTop();
  }
  window.addEventListener('load', ensureToTop);
})();

/* v115: final direct toTop controller */
(function(){
  function getBtn(){ return document.getElementById('toTopBtn'); }
  function currentScroll(){
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
  function threshold(){
    return Math.max(1, Math.round(window.innerHeight * 0.5));
  }
  function render(){
    var btn = getBtn();
    if(!btn) return;
    if(currentScroll() >= threshold()){
      btn.classList.add('is-show');
      btn.style.opacity = '1';
      btn.style.visibility = 'visible';
      btn.style.pointerEvents = 'auto';
      btn.style.transform = 'translateY(0)';
    }else{
      btn.classList.remove('is-show');
      btn.style.opacity = '0';
      btn.style.visibility = 'hidden';
      btn.style.pointerEvents = 'none';
      btn.style.transform = 'translateY(8px)';
    }
  }
  function init(){
    var btn = getBtn();
    if(!btn) return;
    btn.onclick = function(e){
      if(e) e.preventDefault();
      window.scrollTo({top:0, behavior:'smooth'});
      return false;
    };
    render();
    window.addEventListener('scroll', render, {passive:true});
    window.addEventListener('resize', render);
    setTimeout(render, 100);
    setTimeout(render, 500);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('load', init);
})();

/* v127: hero rail nav + dots + autoplay */
(function(){
  const rail = document.querySelector('.heroRail');
  if(!rail) return;

  const cards = Array.from(rail.querySelectorAll('.heroCard'));
  const prevBtn = document.querySelector('.heroNavPrev');
  const nextBtn = document.querySelector('.heroNavNext');
  const dotsWrap = document.querySelector('.heroDots');
  if(!cards.length) return;

  let timer = null;
  let stoppedByUser = false;
  const DRAG_THRESHOLD = 8;

  let isMouseDragging = false;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let dragDistance = 0;
  let suppressClick = false;
  let dragTargetScrollLeft = 0;
  let dragRafId = null;
  let cardPositions = [];

  const isPcDragEnabled = () => window.matchMedia('(min-width: 980px) and (pointer: fine)').matches;

  const updateCardPositions = () => {
    cardPositions = cards.map((card) => card.offsetLeft);
  };

  const snapToNearestCard = () => {
    const nearest = getIndex();
    rail.scrollTo({ left: cardPositions[nearest], behavior: 'smooth' });
    updateDots(nearest);
  };

  const flushDragScroll = () => {
    dragRafId = null;
    rail.scrollLeft = dragTargetScrollLeft;
  };

  const scheduleDragScroll = () => {
    if(dragRafId) return;
    dragRafId = requestAnimationFrame(flushDragScroll);
  };

  const endMouseDrag = () => {
    if(!isMouseDragging) return;
    isMouseDragging = false;
    if(dragRafId){
      cancelAnimationFrame(dragRafId);
      dragRafId = null;
      rail.scrollLeft = dragTargetScrollLeft;
    }
    const didDrag = dragDistance >= DRAG_THRESHOLD;
    if(!didDrag) suppressClick = false;
    rail.classList.remove('is-dragging');
    document.body.classList.remove('heroDragNoSelect');
    snapToNearestCard();
  };


  const getIndex = () => {
    const left = rail.scrollLeft;
    let nearest = 0;
    let min = Infinity;
    cardPositions.forEach((position, i) => {
      const d = Math.abs(position - left);
      if(d < min){ min = d; nearest = i; }
    });
    return nearest;
  };

  const scrollToIndex = (index, smooth=true) => {
    const i = (index + cards.length) % cards.length;
    rail.scrollTo({ left: cardPositions[i], behavior: smooth ? 'smooth' : 'auto' });
    updateDots(i);
  };

  const updateDots = (active = getIndex()) => {
    if(!dotsWrap) return;
    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.classList.toggle('is-active', i === active);
      dot.setAttribute('aria-selected', i === active ? 'true' : 'false');
    });
  };

  if(dotsWrap){
    dotsWrap.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'heroDot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', `スライド ${i + 1}`);
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => {
        stoppedByUser = true;
        stopAutoplay();
        scrollToIndex(i);
      });
      dotsWrap.appendChild(dot);
    });
  }

  const move = (dir, byUser=false) => {
    if(byUser){
      stoppedByUser = true;
      stopAutoplay();
    }
    const idx = getIndex();
    let next = idx + dir;
    if(next >= cards.length) next = 0;
    if(next < 0) next = cards.length - 1;
    scrollToIndex(next);
  };

  if(prevBtn) prevBtn.addEventListener('click', () => move(-1, true));
  if(nextBtn) nextBtn.addEventListener('click', () => move(1, true));

  const onUserInteract = () => {
    stoppedByUser = true;
    stopAutoplay();
  };
  rail.addEventListener('pointerdown', onUserInteract, {passive:true});
  rail.addEventListener('wheel', onUserInteract, {passive:true});
  rail.addEventListener('keydown', onUserInteract);
  rail.addEventListener('scroll', () => updateDots(), {passive:true});

  rail.addEventListener('mousedown', (e) => {
    if(!isPcDragEnabled() || e.button !== 0) return;
    isMouseDragging = true;
    suppressClick = false;
    dragStartX = e.pageX;
    dragStartScrollLeft = rail.scrollLeft;
    dragTargetScrollLeft = dragStartScrollLeft;
    dragDistance = 0;
    rail.classList.add('is-dragging');
    document.body.classList.add('heroDragNoSelect');
    onUserInteract();
  });

  rail.addEventListener('mousemove', (e) => {
    if(!isMouseDragging) return;
    const deltaX = e.pageX - dragStartX;
    dragDistance = Math.max(dragDistance, Math.abs(deltaX));
    if(dragDistance >= DRAG_THRESHOLD){
      suppressClick = true;
    }
    dragTargetScrollLeft = dragStartScrollLeft - deltaX;
    scheduleDragScroll();
  });

  rail.addEventListener('mouseup', endMouseDrag);
  rail.addEventListener('mouseleave', endMouseDrag);
  window.addEventListener('mouseup', endMouseDrag);

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if(!suppressClick) return;
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    });
  });

  function startAutoplay(){
    if(stoppedByUser || timer) return;
    timer = setInterval(() => move(1, false), 5000);
  }
  function stopAutoplay(){
    if(!timer) return;
    clearInterval(timer);
    timer = null;
  }

  rail.addEventListener('mouseenter', stopAutoplay);
  rail.addEventListener('mouseleave', startAutoplay);

  window.addEventListener('resize', () => {
    updateCardPositions();
    const idx = getIndex();
    scrollToIndex(idx, false);
  });

  window.addEventListener('load', updateCardPositions);
  updateCardPositions();
  startAutoplay();
  updateDots(0);
})();
