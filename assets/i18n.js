(function () {
  'use strict';

  var LANGS = ['en', 'ja', 'zh', 'ko', 'fr', 'es'];
  var STORAGE_KEY = 'glv402-lang';

  var TITLES = {
    index: { en: 'Welcome to GLV 402', ja: 'GLV 402 へようこそ', zh: '欢迎来到 GLV 402', ko: 'GLV 402에 오신 것을 환영합니다', fr: 'Bienvenue au GLV 402', es: 'Bienvenido/a al GLV 402' },
    access: { en: 'How to Access - GLV 402', ja: 'アクセス方法 - GLV 402', zh: '交通路线 - GLV 402', ko: '오시는 방법 - GLV 402', fr: 'Comment venir - GLV 402', es: 'Cómo llegar - GLV 402' },
    'circuit-breaker': { en: 'Circuit Breaker - GLV 402', ja: 'ブレーカーについて - GLV 402', zh: '断路器说明 - GLV 402', ko: '차단기 안내 - GLV 402', fr: 'Disjoncteur - GLV 402', es: 'Interruptor automático - GLV 402' },
    emergency: { en: 'Emergency - GLV 402', ja: '緊急連絡先 - GLV 402', zh: '紧急联系 - GLV 402', ko: '비상 연락정보 - GLV 402', fr: 'Urgences - GLV 402', es: 'Emergencias - GLV 402' },
    equipment: { en: 'Equipment - GLV 402', ja: '設備について - GLV 402', zh: '设施说明 - GLV 402', ko: '시설 안내 - GLV 402', fr: 'Équipements - GLV 402', es: 'Equipamiento - GLV 402' },
    'gas-reset': { en: 'Gas Reset - GLV 402', ja: 'ガス復帰 - GLV 402', zh: '燃气复位 - GLV 402', ko: '가스 복구 - GLV 402', fr: 'Réinitialisation gaz - GLV 402', es: 'Reinicio de gas - GLV 402' },
    'house-rules': { en: 'House Rules - GLV 402', ja: 'ハウスルール - GLV 402', zh: '入住规则 - GLV 402', ko: '하우스 규정 - GLV 402', fr: 'Règlement intérieur - GLV 402', es: 'Normas de la casa - GLV 402' },
    'how-to-open': { en: 'How to Open - GLV 402', ja: '入室方法 - GLV 402', zh: '如何开门 - GLV 402', ko: '입실 방법 - GLV 402', fr: 'Comment entrer - GLV 402', es: 'Cómo entrar - GLV 402' },
    laundry: { en: 'Laundry - GLV 402', ja: '洗濯機の使い方 - GLV 402', zh: '洗衣指南 - GLV 402', ko: '세탁기 사용법 - GLV 402', fr: 'Blanchisserie - GLV 402', es: 'Lavandería - GLV 402' },
    'nearby-shops': { en: 'Nearby Shops - GLV 402', ja: '近くのお店情報 - GLV 402', zh: '附近商店 - GLV 402', ko: '근처 상점 - GLV 402', fr: 'Commerces à proximité - GLV 402', es: 'Tiendas cercanas - GLV 402' },
    parking: { en: 'Parking - GLV 402', ja: '駐車場 - GLV 402', zh: '停车场 - GLV 402', ko: '주차장 - GLV 402', fr: 'Parking - GLV 402', es: 'Aparcamiento - GLV 402' },
    taxi: { en: 'For Taxi - GLV 402', ja: 'タクシー利用案内 - GLV 402', zh: '出租车指南 - GLV 402', ko: '택시 안내 - GLV 402', fr: 'Guide Taxi - GLV 402', es: 'Guía de Taxi - GLV 402' },
    trash: { en: 'Trash - GLV 402', ja: 'ゴミ捨て - GLV 402', zh: '垃圾处理 - GLV 402', ko: '쓰레기 버리기 - GLV 402', fr: 'Déchets - GLV 402', es: 'Basura - GLV 402' }
  };

  function normalize(tag) {
    if (!tag) return null;
    var value = String(tag).toLowerCase().replace(/_/g, '-');
    var base = value.split('-')[0];
    return LANGS.indexOf(base) !== -1 ? base : null;
  }

  function detect() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      var savedLang = normalize(saved);
      if (savedLang) return savedLang;
    } catch (e) {}

    var tags = navigator.languages || [navigator.language];
    for (var i = 0; i < tags.length; i++) {
      var lang = normalize(tags[i]);
      if (lang) return lang;
    }
    return 'en';
  }

  function pageKey() {
    var parts = location.pathname.replace(/\/+$/, '').split('/');
    for (var i = parts.length - 1; i >= 0; i--) {
      if (TITLES[parts[i]]) return parts[i];
    }
    return 'index';
  }

  function apply(lang) {
    if (LANGS.indexOf(lang) === -1) lang = 'en';
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    document.querySelectorAll('.lang-btn[data-lang]').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    var titles = TITLES[pageKey()];
    if (titles && titles[lang]) document.title = titles[lang];
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
  }

  function init() {
    document.addEventListener('click', function (event) {
      var btn = event.target.closest('.lang-btn[data-lang]');
      if (btn) setLang(btn.getAttribute('data-lang'));
    });
    apply(detect());
  }

  window.setLang = setLang;
  apply(detect());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
