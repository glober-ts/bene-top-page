
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

/*
  v128: HEROスライダー制御（transform方式）
  目的:
  - 画像枚数が増えても同じ実装で運用できるよう、1本化した制御にする
  - 「自動再生・矢印・ドット・ドラッグ」を同一状態で管理し、表示ズレを防ぐ
*/
(function(){
  // ----------------------------------------
  // Hero slider 初期化
  // ・対象DOMを取得し、以降の処理対象を確定
  // ・要素不足時は安全に処理を中断
  // ----------------------------------------
  const rail = document.querySelector('.heroRail');
  const track = rail ? rail.querySelector('.heroTrack') : null;
  if(!rail || !track) return;

  const cards = Array.from(track.querySelectorAll('.heroCard'));
  const prevBtn = document.querySelector('.heroNavPrev');
  const nextBtn = document.querySelector('.heroNavNext');
  const dotsWrap = document.querySelector('.heroDots');
  if(!cards.length) return;

  // ----------------------------------------
  // Hero 重要パラメータ
  // ----------------------------------------
  // autoplay間隔(ms)
  // 5000ms: 内容認知とテンポ感のバランスを取る標準値
  const AUTOPLAY_MS = 5000;
  // ドラッグしきい値(px)
  // クリック誤判定を避けるため、開始判定とスライド確定判定を分離
  const DRAG_START_THRESHOLD = 8;
  const SLIDE_TRIGGER_PX = 40;

  let timer = null;
  let stoppedByUser = false;
  let currentIndex = 0;
  let cardStep = 0;
  let railOffset = 0;

  let isPointerDragging = false;
  let activePointerId = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartTranslateX = 0;
  let currentTranslateX = 0;
  let dragDistance = 0;
  let dragDistanceY = 0;
  let suppressClick = false;
  let didCapturePointer = false;
  let dragRafId = null;
  let dragRafTranslateX = 0;
  let dragIntent = null;

  let isLoopJumping = false;
  // 無限ループ実現のため先頭/末尾のクローンを挿入し、端到達時の見た目を自然にする
  const cloneStart = cards[0].cloneNode(true);
  const cloneEnd = cards[cards.length - 1].cloneNode(true);
  cloneStart.classList.add('is-clone');
  cloneEnd.classList.add('is-clone');
  track.insertBefore(cloneEnd, cards[0]);
  track.appendChild(cloneStart);

  const slides = Array.from(track.querySelectorAll('.heroCard'));


  slides.forEach((slide) => {
    slide.setAttribute('draggable', 'false');
    slide.querySelectorAll('img, a').forEach((el) => {
      el.setAttribute('draggable', 'false');
    });
  });

  rail.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  // アニメーションON/OFF切り替え（ドラッグ中はOFFにして指/マウス追従を優先）
  const setTransition = (enabled) => {
    track.classList.toggle('is-animated', enabled);
  };

  const applyTranslate = (x) => {
    currentTranslateX = x;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  };

  const getVisualIndex = () => currentIndex + 1;
  const getTranslateForVisualIndex = (visualIndex) => -(cardStep * visualIndex) + railOffset;

  const normalizeIndex = (index) => {
    if(index < 0) return cards.length - 1;
    if(index >= cards.length) return 0;
    return index;
  };

  // レイアウト再計算: リサイズ時にカード幅・中央寄せオフセットを再取得
  const updateMetrics = () => {
    const firstRealCard = slides[1] || slides[0];
    cardStep = firstRealCard ? firstRealCard.getBoundingClientRect().width : 0;
    if(slides.length > 2){
      const a = slides[1].offsetLeft;
      const b = slides[2].offsetLeft;
      if(b > a) cardStep = b - a;
    }

    railOffset = 0;
    // SPは両端余白を均して中央寄せ表示にし、見切れ時も視線が安定するよう調整
    if(window.matchMedia('(max-width: 979px)').matches && firstRealCard){
      railOffset = (rail.clientWidth - firstRealCard.getBoundingClientRect().width) / 2;
    }

    setTransition(false);
    applyTranslate(getTranslateForVisualIndex(getVisualIndex()));
    requestAnimationFrame(() => setTransition(true));
  };

  // ドットUI同期: 現在インデックスを視覚/ARIAの両方に反映
  const updateDots = () => {
    if(!dotsWrap) return;
    Array.from(dotsWrap.children).forEach((dot, i) => {
      const active = i === currentIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  // 指定インデックスへ移動（矢印/ドット/自動再生の共通入口）
  const moveToIndex = (index, { animate = true } = {}) => {
    currentIndex = normalizeIndex(index);
    setTransition(animate && !isPointerDragging);
    applyTranslate(getTranslateForVisualIndex(getVisualIndex()));
    updateDots();
  };

  // 前後移動: ループ境界はクローンへ一度遷移後、transitionendで実体スライドへ戻す
  const moveBy = (dir, byUser = false) => {
    if(byUser){
      stoppedByUser = true;
      stopAutoplay();
    }

    const target = currentIndex + dir;
    const isForwardLoop = target >= cards.length;
    const isBackwardLoop = target < 0;

    if(isForwardLoop){
      isLoopJumping = true;
      setTransition(true);
      applyTranslate(getTranslateForVisualIndex(cards.length + 1));
      currentIndex = 0;
      updateDots();
      return;
    }

    if(isBackwardLoop){
      isLoopJumping = true;
      setTransition(true);
      applyTranslate(getTranslateForVisualIndex(0));
      currentIndex = cards.length - 1;
      updateDots();
      return;
    }

    moveToIndex(target, { animate: true });
  };

  // ユーザー操作後は自動再生を停止（勝手に動くストレスを避けるため）
  const onUserInteract = () => {
    stoppedByUser = true;
    stopAutoplay();
  };

  // rAFでtransformを間引き、pointermove連打時の描画負荷を抑える
  const flushDrag = () => {
    dragRafId = null;
    applyTranslate(dragRafTranslateX);
  };

  const scheduleDrag = () => {
    if(dragRafId) return;
    dragRafId = requestAnimationFrame(flushDrag);
  };


  // ----------------------------------------
  // Dots navigation
  // ・スライド枚数に応じてドットを自動生成
  // ・クリックで対象スライドへ移動
  // ----------------------------------------
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
        onUserInteract();
        moveToIndex(i, { animate: true });
      });
      dotsWrap.appendChild(dot);
    });
  }

  // ----------------------------------------
  // Arrow navigation
  // ・前へ / 次へボタンで1枚単位移動
  // ・手動操作としてautoplayを停止
  // ----------------------------------------
  if(prevBtn) prevBtn.addEventListener('click', () => moveBy(-1, true));
  if(nextBtn) nextBtn.addEventListener('click', () => moveBy(1, true));

  rail.addEventListener('wheel', onUserInteract, { passive: true });
  rail.addEventListener('keydown', onUserInteract);

  // ----------------------------------------
  // Drag / Swipe（Pointer Events統一）
  // ・SP: touch pointer でスワイプ
  // ・PC: mouse pointer でドラッグ
  // ----------------------------------------
  rail.addEventListener('pointerdown', (e) => {
    if(!e.isPrimary) return;
    if(e.pointerType === 'mouse' && e.button !== 0) return;

    isPointerDragging = true;
    activePointerId = e.pointerId;
    suppressClick = false;
    dragDistance = 0;
    didCapturePointer = false;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragStartTranslateX = currentTranslateX;
    dragRafTranslateX = currentTranslateX;
    dragDistanceY = 0;
    dragIntent = null;
    setTransition(false);
    rail.classList.add('is-dragging');
    document.body.classList.add('heroDragNoSelect');

    onUserInteract();
  });

  rail.addEventListener('pointermove', (e) => {
    if(!isPointerDragging || e.pointerId !== activePointerId) return;
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    dragDistance = Math.max(dragDistance, Math.abs(deltaX));
    dragDistanceY = Math.max(dragDistanceY, Math.abs(deltaY));

    if(dragIntent === null){
      if(dragDistance < 5 && dragDistanceY < 5) return;
      if(dragDistanceY > dragDistance * 1.15){
        isPointerDragging = false;
        activePointerId = null;
        rail.classList.remove('is-dragging');
        document.body.classList.remove('heroDragNoSelect');
        setTransition(true);
        applyTranslate(dragStartTranslateX);
        return;
      }
      dragIntent = 'x';
    }

    if(dragDistance >= DRAG_START_THRESHOLD){
      if(
        !didCapturePointer &&
        e.pointerType === 'mouse' &&
        typeof rail.setPointerCapture === 'function'
      ){
        try {
          rail.setPointerCapture(e.pointerId);
          didCapturePointer = true;
        } catch(_e) {}
      }
      e.preventDefault();
    }
    dragRafTranslateX = dragStartTranslateX + deltaX;
    scheduleDrag();
  });

  const endPointerDrag = (e) => {
    if(!isPointerDragging) return;
    if(e && activePointerId !== null && e.pointerId !== undefined && e.pointerId !== activePointerId) return;

    if(dragRafId){
      cancelAnimationFrame(dragRafId);
      dragRafId = null;
      applyTranslate(dragRafTranslateX);
    }

    const moved = currentTranslateX - dragStartTranslateX;
    const didDrag = dragDistance >= DRAG_START_THRESHOLD;
    suppressClick = didDrag;

    isPointerDragging = false;
    if(didCapturePointer && activePointerId !== null && typeof rail.releasePointerCapture === 'function'){
      try { rail.releasePointerCapture(activePointerId); } catch(_e) {}
    }
    didCapturePointer = false;
    activePointerId = null;
    dragIntent = null;

    rail.classList.remove('is-dragging');
    document.body.classList.remove('heroDragNoSelect');

    if(!didDrag){
      moveToIndex(currentIndex, { animate: true });
      return;
    }

    const direction = moved < 0 ? 1 : -1;
    const slideThreshold = Math.max(SLIDE_TRIGGER_PX, cardStep * 0.24);
    if(Math.abs(moved) >= slideThreshold){
      moveBy(direction, true);
    } else {
      moveToIndex(currentIndex, { animate: true });
    }
  };

  rail.addEventListener('pointerup', endPointerDrag);
  rail.addEventListener('pointercancel', endPointerDrag);
  rail.addEventListener('lostpointercapture', endPointerDrag);

  // ----------------------------------------
  // Click判定
  // ・ドラッグ成立時はクリック遷移を抑止
  // ・意図しないリンク遷移を防止
  // ----------------------------------------
  slides.forEach((card) => {
    card.addEventListener('click', (e) => {
      if(!suppressClick) return;
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    });
  });

  // 無限ループ補正: クローン位置から実体位置へ瞬時に戻し、つなぎ目を隠す
  track.addEventListener('transitionend', () => {
    if(!isLoopJumping) return;
    isLoopJumping = false;
    setTransition(false);
    applyTranslate(getTranslateForVisualIndex(getVisualIndex()));
    requestAnimationFrame(() => setTransition(true));
  });

  // ----------------------------------------
  // Hero autoplay
  // ・一定時間ごとに次のカードへ移動
  // ・ユーザー操作後は停止
  // ・ホバー中は停止、離脱で再開
  // ----------------------------------------
  // autoplay: ユーザー操作が入るまで一定間隔で次へ送る
  function startAutoplay(){
    if(stoppedByUser || timer) return;
    timer = setInterval(() => moveBy(1, false), AUTOPLAY_MS);
  }

  // autoplay停止: 手動操作・ホバー時に意図せぬ移動を止める
  function stopAutoplay(){
    if(!timer) return;
    clearInterval(timer);
    timer = null;
  }

  rail.addEventListener('mouseenter', stopAutoplay);
  rail.addEventListener('mouseleave', startAutoplay);

  window.addEventListener('resize', updateMetrics);
  window.addEventListener('load', updateMetrics);

  updateMetrics();
  updateDots();
  startAutoplay();
})();;

/* v133: unified submenu toggle behavior for PC/SP (capture phase, conflict-safe) */
document.addEventListener('DOMContentLoaded', () => {
  if(document.documentElement.dataset.submenuBound === '1') return;
  document.documentElement.dataset.submenuBound = '1';

  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('#gnav .menu-item.has-children .submenu-toggle');
    if(!toggle) return;

    const item = toggle.closest('.menu-item.has-children');
    const submenu = item ? item.querySelector(':scope > .submenu') : null;
    if(!item || !submenu) return;

    e.preventDefault();
    e.stopPropagation();

    const willOpen = !item.classList.contains('is-open');
    item.classList.toggle('is-open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
  }, true);
});

/* v138: product rows scroll control (SP native / PC drag) */
document.addEventListener('DOMContentLoaded', () => {
  const rows = Array.from(document.querySelectorAll('.rankingRow, .rowScroll'));
  if(!rows.length) return;

  const SWIPE_THRESHOLD = 6;

  const isSmartphoneMode =
    window.matchMedia('(max-width: 979px)').matches ||
    window.matchMedia('(any-pointer: coarse)').matches;

  rows.forEach((row) => {
    row.querySelectorAll('img, a').forEach((el) => {
      el.setAttribute('draggable', 'false');
    });

    row.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });

    // SP: 独自ドラッグ処理を完全にスキップし、ネイティブ横スクロールのみ利用
    if(isSmartphoneMode){
      return;
    }

    // PC: 追従性最優先（慣性なし）
    let suppressClick = false;
    let isPointerDown = false;
    let isDragging = false;
    let activePointerId = null;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let movedX = 0;
    let movedY = 0;
    let didCapturePointer = false;

    const getMaxScroll = () => Math.max(0, row.scrollWidth - row.clientWidth);
    const clampScroll = (value) => Math.min(getMaxScroll(), Math.max(0, value));

    const resetState = (e) => {
      isPointerDown = false;
      isDragging = false;
      activePointerId = null;
      row.classList.remove('is-dragging');
      document.body.classList.remove('dragScrollNoSelect');
      if(didCapturePointer && e && typeof row.releasePointerCapture === 'function' && e.pointerId !== undefined){
        try { row.releasePointerCapture(e.pointerId); } catch(_e) {}
      }
      didCapturePointer = false;
    };

    row.addEventListener('pointerdown', (e) => {
      if(!e.isPrimary) return;
      if(e.pointerType !== 'mouse') return;
      if(e.button !== 0) return;

      isPointerDown = true;
      isDragging = false;
      suppressClick = false;
      didCapturePointer = false;
      activePointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = row.scrollLeft;
      movedX = 0;
      movedY = 0;
    });

    row.addEventListener('pointermove', (e) => {
      if(!isPointerDown || e.pointerId !== activePointerId) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      movedX = Math.max(movedX, Math.abs(deltaX));
      movedY = Math.max(movedY, Math.abs(deltaY));

      if(!isDragging){
        if(movedX < SWIPE_THRESHOLD) return;
        if(movedY > movedX){
          resetState(e);
          return;
        }
        isDragging = true;
        if(!didCapturePointer && typeof row.setPointerCapture === 'function'){
          try {
            row.setPointerCapture(e.pointerId);
            didCapturePointer = true;
          } catch(_e) {}
        }
        row.classList.add('is-dragging');
        document.body.classList.add('dragScrollNoSelect');
      }

      row.scrollLeft = clampScroll(startLeft - deltaX);
      e.preventDefault();
    });

    const endDrag = (e) => {
      if(!isPointerDown) return;
      if(e && e.pointerId !== undefined && activePointerId !== null && e.pointerId !== activePointerId) return;
      suppressClick = isDragging;
      resetState(e);
    };

    row.addEventListener('pointerup', endDrag);
    row.addEventListener('pointercancel', endDrag);
    row.addEventListener('lostpointercapture', endDrag);

    row.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', (e) => {
        if(!suppressClick) return;
        e.preventDefault();
        e.stopPropagation();
        suppressClick = false;
      });
    });
  });
});

/* v139: vertical drag scroll for YouTube/NEWS on desktop mouse */
document.addEventListener('DOMContentLoaded', () => {
  const verticalLists = Array.from(document.querySelectorAll('.ytCarousel .ytList, .newsCarousel .newsList'));
  if(!verticalLists.length) return;

  const DRAG_THRESHOLD = 8;
  const isDesktopMouseMode = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(any-pointer: coarse)').matches;

  verticalLists.forEach((list) => {
    list.querySelectorAll('img, a').forEach((el) => {
      el.setAttribute('draggable', 'false');
    });

    list.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });

    let suppressClick = false;
    let isPointerDown = false;
    let isDragging = false;
    let activePointerId = null;
    let didCapturePointer = false;
    let startX = 0;
    let startY = 0;
    let startTop = 0;
    let movedX = 0;
    let movedY = 0;

    const resetState = (e) => {
      isPointerDown = false;
      isDragging = false;
      activePointerId = null;
      list.classList.remove('is-dragging');
      document.body.classList.remove('dragScrollNoSelect');
      if(didCapturePointer && e && typeof list.releasePointerCapture === 'function' && e.pointerId !== undefined){
        try { list.releasePointerCapture(e.pointerId); } catch(_e) {}
      }
      didCapturePointer = false;
    };

    list.addEventListener('pointerdown', (e) => {
      if(!isDesktopMouseMode()) return;
      if(!e.isPrimary) return;
      if(e.pointerType !== 'mouse') return;
      if(e.button !== 0) return;

      isPointerDown = true;
      isDragging = false;
      suppressClick = false;
      activePointerId = e.pointerId;
      didCapturePointer = false;
      startX = e.clientX;
      startY = e.clientY;
      startTop = list.scrollTop;
      movedX = 0;
      movedY = 0;
    });

    list.addEventListener('pointermove', (e) => {
      if(!isPointerDown || e.pointerId !== activePointerId) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      movedX = Math.max(movedX, Math.abs(deltaX));
      movedY = Math.max(movedY, Math.abs(deltaY));

      if(!isDragging){
        if(movedY < DRAG_THRESHOLD) return;
        if(movedX > movedY){
          resetState(e);
          return;
        }

        isDragging = true;
        if(!didCapturePointer && typeof list.setPointerCapture === 'function'){
          try {
            list.setPointerCapture(e.pointerId);
            didCapturePointer = true;
          } catch(_e) {}
        }
        list.classList.add('is-dragging');
        document.body.classList.add('dragScrollNoSelect');
      }

      list.scrollTop = startTop - deltaY;
      e.preventDefault();
    });

    const endDrag = (e) => {
      if(!isPointerDown) return;
      if(e && e.pointerId !== undefined && activePointerId !== null && e.pointerId !== activePointerId) return;
      suppressClick = isDragging;
      resetState(e);
    };

    list.addEventListener('pointerup', endDrag);
    list.addEventListener('pointercancel', endDrag);
    list.addEventListener('lostpointercapture', endDrag);

    list.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', (e) => {
        if(!suppressClick) return;
        e.preventDefault();
        e.stopPropagation();
        suppressClick = false;
      });
    });
  });
});
