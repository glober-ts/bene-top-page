
(function(){
  const getDailySeed = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return Number(`${yyyy}${mm}${dd}`);
  };

  const createSeededRandom = (seed) => {
    let t = seed >>> 0;
    return () => {
      t += 0x6D2B79F5;
      let x = Math.imul(t ^ (t >>> 15), 1 | t);
      x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  };

  const shuffleBySeed = (items, seed) => {
    const rand = createSeededRandom(seed);
    const arr = items.slice();
    for(let i = arr.length - 1; i > 0; i -= 1){
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const applyDailyCloseupOrder = () => {
    const closeupGrid = document.querySelector('.closeupGrid');
    if(!closeupGrid) return;

    const cards = Array.from(closeupGrid.querySelectorAll('.closeupCard'));
    if(cards.length <= 1) return;

    const seed = getDailySeed();
    const shuffledCards = shuffleBySeed(cards, seed);
    shuffledCards.forEach((card) => closeupGrid.appendChild(card));
  };

  document.addEventListener('DOMContentLoaded', applyDailyCloseupOrder);
})();


/* ===== v141: unified drawer + search modal + toTop controls ===== */
(function(){
  const getDrawer = () => document.getElementById('gnav');
  const getBackdrop = () => document.getElementById('gnavBackdrop');
  const getMenuBtn = () => document.getElementById('menuBtn') || document.querySelector('.hamburger');
  const getSearchModal = () => document.getElementById('searchModal');
  const getSearchInput = () => document.getElementById('searchModalInput');
  const getSearchPriceMinInput = () => document.getElementById('searchPriceMin');
  const getSearchPriceMaxInput = () => document.getElementById('searchPriceMax');

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
      menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDrawer();
      });
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
    const searchPriceMinInput = getSearchPriceMinInput();
    const searchPriceMaxInput = getSearchPriceMaxInput();
    const searchForm = searchInput ? searchInput.form : null;

    const sanitizePrice = (value) => {
      if(value === null || value === undefined) return '';
      const normalized = String(value).replace(/,/g, '');
      const digitsOnly = normalized.replace(/\D/g, '');
      return digitsOnly;
    };

    const getSearchValues = (keyword) => {
      const rawKeyword = typeof keyword === 'string' ? keyword : (searchInput ? searchInput.value : '');
      const trimmedKeyword = rawKeyword.trim();
      const keywordValue = trimmedKeyword || '';

      let minPrice = sanitizePrice(searchPriceMinInput ? searchPriceMinInput.value : '');
      let maxPrice = sanitizePrice(searchPriceMaxInput ? searchPriceMaxInput.value : '');

      if(minPrice && maxPrice && Number(minPrice) > Number(maxPrice)){
        const swappedMin = maxPrice;
        const swappedMax = minPrice;
        minPrice = swappedMin;
        maxPrice = swappedMax;
      }

      return { keywordValue, minPrice, maxPrice };
    };

    const buildSearchUrl = ({ keywordValue, minPrice, maxPrice }) => {
      const params = new URLSearchParams();
      if(keywordValue) params.set('p', keywordValue);
      if(minPrice) params.set('pf', minPrice);
      if(maxPrice) params.set('pt', maxPrice);
      const query = params.toString();
      const baseUrl = 'https://store.shopping.yahoo.co.jp/benebene/search.html';
      return query ? `${baseUrl}?${query}` : baseUrl;
    };

    const goSearch = (keyword) => {
      const values = getSearchValues(keyword);
      const nextUrl = buildSearchUrl(values);
      if(searchInput) searchInput.value = values.keywordValue;
      if(searchPriceMinInput){
        searchPriceMinInput.value = values.minPrice;
      }
      if(searchPriceMaxInput){
        searchPriceMaxInput.value = values.maxPrice;
      }
      closeSearch();
      window.location.href = nextUrl;
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
    initToTop();
  });

  window.addEventListener('pageshow', syncDrawerState);
  window.addEventListener('pagehide', closeSearch);
  window.addEventListener('pageshow', (e) => {
    closeSearch();
    if(e && e.persisted){
      const active = document.activeElement;
      if(active && typeof active.blur === 'function') active.blur();
    }
    const input = getSearchInput();
    if(input){
      input.disabled = false;
      input.blur();
    }
  });
})();

(function () {
  const normalizeHashOnlyUrl = () => {
    if(window.location.hash === '#'){
      history.replaceState(
        history.state,
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  window.addEventListener('load', normalizeHashOnlyUrl);
  window.addEventListener('pageshow', normalizeHashOnlyUrl);
  window.addEventListener('hashchange', normalizeHashOnlyUrl);
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
  let currentIndex = 1; // 表示用index（クローン込み）
  let realIndex = 0; // 実体スライドindex（0始まり）
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
  let loopFallbackTimer = null;
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
    track.style.transition = enabled ? '' : 'none';
  };

  const applyTranslate = (x) => {
    const safeX = Number.isFinite(x) ? x : 0;
    currentTranslateX = safeX;
    track.style.transform = `translate3d(${safeX}px, 0, 0)`;
  };

  const getTranslateForVisualIndex = (visualIndex) => -(cardStep * visualIndex) + railOffset;

  const isUsableMetric = (value) => Number.isFinite(value) && value > 0;

  const ensureHeroImagesVisible = () => {
    slides.forEach((slide) => {
      slide.hidden = false;
      slide.style.removeProperty('display');
      slide.style.removeProperty('visibility');
      slide.querySelectorAll('img').forEach((img) => {
        img.hidden = false;
        img.style.removeProperty('display');
        img.style.removeProperty('visibility');
      });
    });
  };

  const normalizeRealIndex = (index) => {
    if(index < 0) return cards.length - 1;
    if(index >= cards.length) return 0;
    return index;
  };

  const getRealIndexFromVisual = (visualIndex) => {
    if(visualIndex === 0) return cards.length - 1;
    if(visualIndex === cards.length + 1) return 0;
    return normalizeRealIndex(visualIndex - 1);
  };

  const normalizeVisualIndex = (index) => {
    if(!Number.isFinite(index)) return 1;
    if(index < 0 || index > cards.length + 1) return 1;
    return index;
  };

  const normalizeToRealVisualIndex = (index) => {
    const nextRealIndex = getRealIndexFromVisual(normalizeVisualIndex(index));
    return Math.max(0, Math.min(nextRealIndex, cards.length - 1)) + 1;
  };

  const finishLoopJump = () => {
    if(loopFallbackTimer){
      clearTimeout(loopFallbackTimer);
      loopFallbackTimer = null;
    }

    if(!isLoopJumping) return;
    isLoopJumping = false;
    setTransition(false);
    if(currentIndex >= cards.length + 1){
      currentIndex = 1;
      realIndex = 0;
    }else if(currentIndex <= 0){
      currentIndex = cards.length;
      realIndex = cards.length - 1;
    }
    applyTranslate(getTranslateForVisualIndex(currentIndex));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransition(true));
      updateDots();
    });
  };

  const scheduleLoopFallback = () => {
    if(loopFallbackTimer) clearTimeout(loopFallbackTimer);
    loopFallbackTimer = setTimeout(finishLoopJump, 900);
  };

  // レイアウト再計算: リサイズ時にカード幅・中央寄せオフセットを再取得
  const updateMetrics = () => {
    const firstRealCard = slides[1] || slides[0];
    const firstRect = firstRealCard ? firstRealCard.getBoundingClientRect() : null;
    const rectWidth = firstRect ? firstRect.width : 0;
    let nextCardStep = rectWidth;
    if(slides.length > 2){
      const a = slides[1].offsetLeft;
      const b = slides[2].offsetLeft;
      if(Number.isFinite(a) && Number.isFinite(b) && b > a) nextCardStep = b - a;
    }

    if(!isUsableMetric(nextCardStep) || !isUsableMetric(rectWidth)){
      return false;
    }

    cardStep = nextCardStep;
    currentIndex = normalizeVisualIndex(currentIndex);

    railOffset = 0;
    // 端末幅に関わらず、アクティブカードを常に中央軸へ揃える
    railOffset = Math.max((rail.clientWidth - rectWidth) / 2, 0);
    if(!Number.isFinite(railOffset)) railOffset = 0;

    ensureHeroImagesVisible();
    setTransition(false);
    applyTranslate(getTranslateForVisualIndex(currentIndex));
    requestAnimationFrame(() => setTransition(true));
    updateDots();
    return true;
  };

  // ドットUI同期: 現在インデックスを視覚/ARIAの両方に反映
  const updateDots = () => {
    if(!dotsWrap) return;
    Array.from(dotsWrap.children).forEach((dot, i) => {
      const active = i === realIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  };

  const syncDots = () => updateDots();

  const syncHeroPosition = ({ animate = false } = {}) => {
    setTransition(animate && !isPointerDragging);
    applyTranslate(getTranslateForVisualIndex(currentIndex));
  };

  // 指定インデックスへ移動（矢印/ドット/自動再生の共通入口）
  const moveToVisualIndex = (index, { animate = true } = {}) => {
    if(!isUsableMetric(cardStep) && !updateMetrics()) return;

    currentIndex = normalizeVisualIndex(index);
    realIndex = getRealIndexFromVisual(currentIndex);
    ensureHeroImagesVisible();
    setTransition(animate && !isPointerDragging);
    applyTranslate(getTranslateForVisualIndex(currentIndex));
    updateDots();
  };

  const moveToRealIndex = (index, { animate = true } = {}) => {
    const nextRealIndex = normalizeRealIndex(index);
    moveToVisualIndex(nextRealIndex + 1, { animate });
  };

  // 前後移動: ループ境界はクローンへ一度遷移後、transitionendで実体スライドへ戻す
  const moveBy = (dir, byUser = false) => {
    if(byUser){
      stopAutoSlide({ reserveResume: true });
    }

    if(isPointerDragging) return;
    if(isLoopJumping) finishLoopJump();
    if(!isUsableMetric(cardStep) && !updateMetrics()) return;

    currentIndex = normalizeVisualIndex(currentIndex);
    const target = currentIndex + dir;
    const isForwardLoop = target === cards.length + 1;
    const isBackwardLoop = target === 0;

    if(isForwardLoop){
      isLoopJumping = true;
      moveToVisualIndex(target, { animate: true });
      scheduleLoopFallback();
      return;
    }

    if(isBackwardLoop){
      isLoopJumping = true;
      moveToVisualIndex(target, { animate: true });
      scheduleLoopFallback();
      return;
    }

    moveToVisualIndex(target, { animate: true });
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
        moveToRealIndex(i, { animate: true });
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
      moveToVisualIndex(currentIndex, { animate: true });
      return;
    }

    const direction = moved < 0 ? 1 : -1;
    const slideThreshold = Math.max(SLIDE_TRIGGER_PX, cardStep * 0.24);
    if(Math.abs(moved) >= slideThreshold){
      moveBy(direction, true);
    } else {
      moveToVisualIndex(currentIndex, { animate: true });
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
  track.addEventListener('transitionend', (e) => {
    if(e.target !== track || e.propertyName !== 'transform') return;
    finishLoopJump();
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
    timer = setInterval(() => {
      if(document.hidden) return;
      moveBy(1, false);
    }, AUTOPLAY_MS);
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

  const normalizeHeroState = () => {
    if(isLoopJumping) finishLoopJump();
    currentIndex = normalizeToRealVisualIndex(currentIndex);
    realIndex = getRealIndexFromVisual(currentIndex);
    updateMetrics();
    currentIndex = normalizeToRealVisualIndex(currentIndex);
    realIndex = getRealIndexFromVisual(currentIndex);
    syncHeroPosition({ animate: false });
    requestAnimationFrame(() => setTransition(true));
    syncDots();
  };

  window.addEventListener('resize', normalizeHeroState);
  window.addEventListener('load', normalizeHeroState);
  window.addEventListener('pageshow', normalizeHeroState);
  document.addEventListener('visibilitychange', () => {
    if(!document.hidden){
      requestAnimationFrame(() => {
        normalizeHeroState();
        startAutoSlide();
      });
    }
  });

  requestAnimationFrame(updateMetrics);
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
    list.querySelectorAll('img, a, button').forEach((el) => {
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

    list.querySelectorAll('a[href], button.ytItem, button.newsItem').forEach((link) => {
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
/* ===== popup modal controller ===== */
(function(){
  const defaultNoticeConfig = {
    popup: {
      enabled: true,
      startAt: '2026-04-16T00:00:00+09:00',
      endAt: '2026-04-25T23:59:59+09:00',
      suppressHours: 4,
      mode: 'image_text',
      imageUrl: 'https://image.rakuten.co.jp/bene/cabinet/tao/gold/topcontent/260212cp.jpg',
      imageAlt: 'キャンペーンバナー',
      imageAspectRatio: '1/1',
      imageFit: 'cover',
      textHtml: '<h2>お知らせ</h2><p>期間限定のイベントを開催中です。ぜひご覧ください。</p>',
      popupClickable: true,
      linkUrl: 'https://www.rakuten.ne.jp/gold/bene/',
      linkTarget: '_self',
      buttons: [
        {
          label: '詳しく見る',
          url: 'https://shopping.geocities.jp/benebene/',
          target: '_self'
        },
        {
          label: '対象商品を見る',
          url: 'https://shop.bene-bene.com/fs/rosecut/',
          target: '_blank'
        }
      ],
      closeOnOverlay: true
    },
    holiday: {
      startAt: '2026-05-01T00:00:00+09:00',
      endAt: '2026-05-07T23:59:59+09:00'
    },
    campaignBanner: {
      startAt: '2026-05-09T20:00:00+09:00',
      endAt: '2026-05-16T01:59:59+09:00'
    }
  };

  const noticeConfig = window.BENE_TOP_NOTICE_CONFIG || {};
  const popupConfig = {
    ...defaultNoticeConfig.popup,
    ...(noticeConfig.popup || {})
  };
  window.BENE_TOP_NOTICE_DEFAULTS = defaultNoticeConfig;

  const STORAGE_KEY = `benePopup_closedAt_${popupConfig.startAt || 'default'}_${popupConfig.endAt || 'default'}`;
  const DISMISS_UNTIL_END_KEY = `benePopup_dismissUntilEnd_${popupConfig.startAt || 'default'}_${popupConfig.endAt || 'default'}`;

  const modal = document.getElementById('popupModal');
  if(!modal) return;

  const overlay = modal.querySelector('[data-popup-overlay]');
  const dialog = modal.querySelector('[data-popup-dialog]');
  const closeBtn = modal.querySelector('[data-popup-close]');
  const imageWrap = modal.querySelector('[data-popup-image-wrap]');
  const imageEl = modal.querySelector('[data-popup-image]');
  const textEl = modal.querySelector('[data-popup-text]');
  const buttonsWrap = modal.querySelector('[data-popup-buttons]');
  let popupTimerStarted = false;

  const isTruthyString = (value) => typeof value === 'string' && value.trim().length > 0;

  const parseTime = (value) => {
    if(!isTruthyString(value)) return null;
    const ts = new Date(value).getTime();
    return Number.isFinite(ts) ? ts : null;
  };

  const isInSchedule = (nowTs) => {
    const startTs = parseTime(popupConfig.startAt);
    const endTs = parseTime(popupConfig.endAt);
    if(startTs && nowTs < startTs) return false;
    if(endTs && nowTs > endTs) return false;
    return true;
  };

  const isSuppressed = (nowTs) => {
    const suppressMs = Math.max(0, Number(popupConfig.suppressHours) || 0) * 60 * 60 * 1000;
    const closedAt = localStorage.getItem(STORAGE_KEY);
    if(!closedAt) return false;

    const lastDismissedAt = Number(closedAt);
    if(!Number.isFinite(lastDismissedAt)) return false;

    return nowTs < (lastDismissedAt + suppressMs);
  };

  const isDismissedUntilEnd = () => localStorage.getItem(DISMISS_UNTIL_END_KEY) === '1';

  const closePopup = ({ dismissUntilEnd = false } = {}) => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if(dismissUntilEnd){
      localStorage.setItem(DISMISS_UNTIL_END_KEY, '1');
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
  };

  const buildButtons = () => {
    buttonsWrap.innerHTML = '';
    if(!Array.isArray(popupConfig.buttons)) return;

    popupConfig.buttons.forEach((btnConfig) => {
      if(!isTruthyString(btnConfig?.label) || !isTruthyString(btnConfig?.url)) return;
      const link = document.createElement('a');
      link.className = 'popupModal__button';
      link.textContent = btnConfig.label;
      link.href = btnConfig.url;
      link.target = btnConfig.target || '_self';
      link.rel = link.target === '_blank' ? 'noopener noreferrer' : '';
      link.addEventListener('click', (event) => {
        event.stopPropagation();
        localStorage.setItem(DISMISS_UNTIL_END_KEY, '1');
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      });
      buttonsWrap.appendChild(link);
    });
  };

  const setupMode = () => {
    const isImageOnly = popupConfig.mode === 'image';
    modal.classList.toggle('popupModal--image', isImageOnly);
    if(isTruthyString(popupConfig.imageUrl)){
      imageEl.src = popupConfig.imageUrl;
      imageEl.alt = popupConfig.imageAlt || '';
      imageWrap.style.aspectRatio = popupConfig.imageAspectRatio || '4 / 5';
      imageEl.style.objectFit = popupConfig.imageFit === 'contain' ? 'contain' : 'cover';
      imageWrap.hidden = false;
    }else{
      imageWrap.hidden = true;
    }

    if(!isImageOnly){
      textEl.innerHTML = popupConfig.textHtml || '';
      buildButtons();
    }else{
      textEl.innerHTML = '';
      buttonsWrap.innerHTML = '';
    }
  };

  const setupClickable = () => {
    const hasPopupLink = popupConfig.popupClickable && isTruthyString(popupConfig.linkUrl);
    dialog.classList.toggle('is-clickable', hasPopupLink);

    dialog.addEventListener('click', (event) => {
      if(!hasPopupLink) return;
      if(event.target.closest('[data-popup-close], .popupModal__button')) return;
      window.open(popupConfig.linkUrl, popupConfig.linkTarget || '_self');
    });
  };

  const openPopup = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const hasValidElements = () => Boolean(modal && overlay && dialog && closeBtn && imageWrap && imageEl && textEl && buttonsWrap);

  const canShowPopup = () => {
    if(!popupConfig.enabled) return false;
    if(!hasValidElements()) return false;
    const nowTs = Date.now();
    if(!isInSchedule(nowTs)) return false;
    if(isDismissedUntilEnd()) return false;
    if(isSuppressed(nowTs)) return false;
    return true;
  };

  const init = () => {
    if(popupTimerStarted) return;
    popupTimerStarted = true;

    if(!canShowPopup()) return;

    setupMode();
    setupClickable();
    window.setTimeout(() => {
      if(!canShowPopup()) return;
      openPopup();
    }, 4000);
  };

  closeBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    closePopup({ dismissUntilEnd: true });
  });

  overlay?.addEventListener('click', (event) => {
    if(!popupConfig.closeOnOverlay) return;
    event.preventDefault();
    closePopup({ dismissUntilEnd: false });
  });

  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape' && modal.classList.contains('is-open')){
      closePopup({ dismissUntilEnd: false });
    }
  });

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();

const getNoticeConfigSection = (sectionName, fallback = {}) => {
  const defaults = window.BENE_TOP_NOTICE_DEFAULTS?.[sectionName] || {};
  const config = window.BENE_TOP_NOTICE_CONFIG?.[sectionName] || {};
  return { ...fallback, ...defaults, ...config };
};

const parseNoticeTime = (value) => {
  if(typeof value !== 'string' || !value.trim()) return null;
  const ts = new Date(value).getTime();
  return Number.isFinite(ts) ? ts : null;
};

const isWithinNoticePeriod = ({ startAt, endAt }, nowTs = Date.now()) => {
  const startTs = parseNoticeTime(startAt);
  const endTs = parseNoticeTime(endAt);
  if(startTs && nowTs < startTs) return false;
  if(endTs && nowTs > endTs) return false;
  return true;
};

(() => {
  const notice = document.querySelector('.js-periodNotice');
  if(!notice) return;

  const holidayConfig = getNoticeConfigSection('holiday', {
    startAt: '2026-05-01T00:00:00+09:00',
    endAt: '2026-05-07T23:59:59+09:00'
  });

  if(!isWithinNoticePeriod(holidayConfig)){
    notice.hidden = true;
  }
})();

(() => {
  const banner = document.querySelector('.js-campaignBanner');
  if(!banner) return;

  const campaignBannerConfig = getNoticeConfigSection('campaignBanner', {
    startAt: '2026-05-09T20:00:00+09:00',
    endAt: '2026-05-16T01:59:59+09:00'
  });

  if(!isWithinNoticePeriod(campaignBannerConfig)){
    banner.hidden = true;
  }
})();
