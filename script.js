
/* ===== v141: unified drawer + search modal + toTop controls ===== */
(function(){
  const getDrawer = () => document.getElementById('gnav');
  const getBackdrop = () => document.getElementById('gnavBackdrop');
  const getMenuBtn = () => document.getElementById('menuBtn') || document.querySelector('.hamburger');
  const getSearchModal = () => document.getElementById('searchModal');
  const getSearchInput = () => document.getElementById('searchModalInput');
  let isSubmittingSearch = false;

  const syncDrawerState = () => {
    const drawer = getDrawer();
    const backdrop = getBackdrop();
    const menuBtn = getMenuBtn();
    const isOpen = !!(drawer && drawer.classList.contains('is-open'));

    if(backdrop) backdrop.classList.toggle('is-open', isOpen);
    if(menuBtn) menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    document.body.classList.toggle('noScroll', isOpen);
    // iOS Safari URLバー改善を維持: html はロックしない
    document.documentElement.classList.remove('noScroll');
  };

  const openDrawer = () => {
    const drawer = getDrawer();
    if(!drawer) return;
    drawer.classList.add('is-open');
    syncDrawerState();
  };

  const closeDrawer = () => {
    const drawer = getDrawer();
    if(!drawer) return;
    drawer.classList.remove('is-open');
    syncDrawerState();
  };

  const toggleDrawer = () => {
    const drawer = getDrawer();
    if(!drawer) return;
    drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
  };

  const openSearch = () => {
    const modal = getSearchModal();
    if(!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('is-modal-open');
    const input = getSearchInput();
    setTimeout(() => { if(input) input.focus(); }, 0);
  };

  const closeSearch = () => {
    const modal = getSearchModal();
    document.documentElement.classList.remove('is-modal-open');
    if(!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  window.__openDrawer = openDrawer;
  window.__closeDrawer = closeDrawer;
  window.__toggleDrawer = toggleDrawer;
  window.__openSearch = openSearch;
  window.__closeSearch = closeSearch;

  const initToTop = () => {
    const btn = document.getElementById('toTopBtn') || document.querySelector('.toTop');
    if(!btn) return;

    const target = document.querySelector('.section.ytSection');
    const fallbackThreshold = document.documentElement.scrollHeight * 0.8;
    let isVisible = false;

    const update = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      const showThreshold = target
        ? target.getBoundingClientRect().top + y
        : fallbackThreshold;
      const hideThreshold = showThreshold * 0.7;

      if(!isVisible && y >= showThreshold){
        isVisible = true;
        btn.classList.add('is-show');
      }else if(isVisible && y <= hideThreshold){
        isVisible = false;
        btn.classList.remove('is-show');
      }
    };

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    update();
    window.addEventListener('scroll', update, { passive:true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    window.addEventListener('pageshow', update);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = getMenuBtn();
    const drawer = getDrawer();
    const backdrop = getBackdrop();
    const closeBtn = drawer ? drawer.querySelector('.gnavClose') : null;

    if(menuBtn){
      const hasInlineToggle = /__toggleDrawer/.test(menuBtn.getAttribute('onclick') || '');
      if(!hasInlineToggle){
        menuBtn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleDrawer();
        });
      }
    }
    if(closeBtn){
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      });
    }
    if(backdrop){
      backdrop.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      });
    }

    const searchModal = getSearchModal();
    const headerSearchBtn = document.getElementById('searchFocusBtn') || document.querySelector('.icoBtn--search');
    const drawerSearchBtn = document.getElementById('drawerSearchBtn');
    const searchCloseBtn = searchModal ? searchModal.querySelector('#searchCloseBtn, .searchModal__close') : null;
    const searchOverlay = searchModal ? searchModal.querySelector('.searchModal__overlay, [data-close="1"]') : null;
    const searchInput = getSearchInput();
    const searchForm = searchInput ? searchInput.form : null;
    const searchSubmitBtn = searchForm ? searchForm.querySelector('.searchModal__submit, button[type="submit"], input[type="submit"]') : null;

    const resetSearchSubmitting = () => {
      isSubmittingSearch = false;
      if(searchSubmitBtn) searchSubmitBtn.disabled = false;
    };

    const goSearch = (keyword) => {
      if(!searchForm || !searchInput || isSubmittingSearch) return;
      if(typeof keyword === 'string') searchInput.value = keyword;

      isSubmittingSearch = true;
      if(searchSubmitBtn) searchSubmitBtn.disabled = true;
      closeSearch();

      const action = searchForm.getAttribute('action') || window.location.href;
      const formData = new FormData(searchForm);
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        params.append(key, String(value));
      });
      const query = params.toString();
      const separator = action.includes('?') ? '&' : '?';
      const url = query ? `${action}${separator}${query}` : action;
      window.location.assign(url);
    };

    if(headerSearchBtn){
      headerSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
      });
    }

    if(drawerSearchBtn){
      drawerSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
        openSearch();
      });
    }

    if(searchCloseBtn){
      searchCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeSearch();
      });
    }

    if(searchOverlay){
      searchOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        closeSearch();
      });
    }

    if(searchModal){
      searchModal.querySelectorAll('.chip[data-q]').forEach((chip) => {
        chip.addEventListener('click', (e) => {
          e.preventDefault();
          goSearch(chip.getAttribute('data-q') || '');
        });
      });
    }

    if(searchForm){
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        goSearch();
      });
    }

    document.addEventListener('keydown', (e) => {
      if(e.key !== 'Escape') return;
      closeDrawer();
      closeSearch();
    });

    if(drawer && window.MutationObserver){
      const observer = new MutationObserver(syncDrawerState);
      observer.observe(drawer, { attributes:true, attributeFilter:['class'] });
    }

    syncDrawerState();
    closeSearch();
    resetSearchSubmitting();
    initToTop();
  });

  window.addEventListener('pageshow', () => {
    isSubmittingSearch = false;
    const searchInput = getSearchInput();
    const searchForm = searchInput ? searchInput.form : null;
    const searchSubmitBtn = searchForm ? searchForm.querySelector('.searchModal__submit, button[type="submit"], input[type="submit"]') : null;
    if(searchSubmitBtn) searchSubmitBtn.disabled = false;
    syncDrawerState();
  });
  window.addEventListener('pagehide', closeSearch);
  window.addEventListener('pageshow', (e) => {
    closeSearch();
    if(e && e.persisted){
      const active = document.activeElement;
      if(active && typeof active.blur === 'function') active.blur();
    }
  });
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
  // ユーザー操作後の自動再開待機(ms)
  const AUTOPLAY_RESUME_DELAY_MS = 5000;
  // ドラッグしきい値(px)
  // クリック誤判定を避けるため、開始判定とスライド確定判定を分離
  const DRAG_START_THRESHOLD = 8;
  const SLIDE_TRIGGER_PX = 40;

  let timer = null;
  let resumeTimer = null;
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
    // 端末幅に関わらず、アクティブカードを常に中央軸へ揃える
    if(firstRealCard){
      railOffset = Math.max((rail.clientWidth - firstRealCard.getBoundingClientRect().width) / 2, 0);
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
      stopAutoSlide({ reserveResume: true });
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
    stopAutoSlide({ reserveResume: true });
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
  function startAutoSlide(){
    if(timer) return;
    if(resumeTimer){
      clearTimeout(resumeTimer);
      resumeTimer = null;
    }
    timer = setInterval(() => moveBy(1, false), AUTOPLAY_MS);
  }

  // autoplay停止: 手動操作・ホバー時に意図せぬ移動を止める
  function stopAutoSlide({ reserveResume = false } = {}){
    if(timer){
      clearInterval(timer);
      timer = null;
    }

    if(resumeTimer){
      clearTimeout(resumeTimer);
      resumeTimer = null;
    }

    if(reserveResume){
      resumeTimer = setTimeout(() => {
        resumeTimer = null;
        startAutoSlide();
      }, AUTOPLAY_RESUME_DELAY_MS);
    }
  }

  rail.addEventListener('mouseenter', () => stopAutoSlide());
  rail.addEventListener('mouseleave', startAutoSlide);
  rail.addEventListener('touchstart', onUserInteract, { passive: true });
  rail.addEventListener('mousedown', onUserInteract);

  window.addEventListener('resize', updateMetrics);
  window.addEventListener('load', updateMetrics);

  updateMetrics();
  updateDots();
  startAutoSlide();
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

      row.scrollLeft = startLeft - deltaX;
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


;
