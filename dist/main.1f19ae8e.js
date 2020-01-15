// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
var localSiteList = JSON.parse(localStorage.getItem('siteList'));
var hashMap = localSiteList || [{
  id: 0,
  icon: 'B',
  url: 'https://www.bilibili.com',
  categoryName: "视频",
  siteName: "哔哩哔哩～",
  key: 'B'
}, {
  id: 1,
  icon: 'B',
  url: 'https://www.baidu.com',
  categoryName: "搜索",
  siteName: '百度',
  key: 'A'
}, {
  id: 2,
  icon: 'G',
  url: 'https://www.google.com',
  categoryName: "搜索",
  siteName: '谷歌',
  key: 'G'
}, {
  id: 3,
  icon: 'I',
  url: 'https://www.iconfont.cn',
  categoryName: "前端资源",
  siteName: 'Iconfont',
  key: 'I'
}, {
  id: 4,
  icon: 'G',
  url: 'https://www.github.com/Polly-foz',
  categoryName: '关于我',
  siteName: '我的github',
  key: 'P'
}, {
  id: 5,
  icon: 'B',
  url: 'https://yangpeiya.xyz/posts',
  categoryName: '关于我',
  siteName: '我的blog',
  key: 'Y'
}];
var $globalMain = $('.globalMain');

var checkIcon = function checkIcon(icon) {
  return icon || '?';
};

var checkUrl = function checkUrl(url) {
  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  return url;
};

var checkCategoryName = function checkCategoryName(categoryName) {
  return categoryName || "未分类";
};

var checkSiteName = function checkSiteName(siteName) {
  return siteName || "(未命名)";
};

var addSiteToList = function addSiteToList(icon, url, categoryName, siteName) {
  icon = checkIcon(icon);
  url = checkUrl(url);
  categoryName = checkCategoryName(categoryName);
  siteName = checkSiteName(siteName);
  key = '?';
  console.log(key);
  hashMap.push({
    id: new Date().getTime(),
    icon: icon,
    url: url,
    categoryName: categoryName,
    siteName: siteName,
    key: key
  });
  localStorage.setItem('siteList', JSON.stringify(hashMap));
  render();
};

var createCategory = function createCategory(categoryName) {
  var $categoryAdderWrapper = $(".categoryAdderWrapper");
  var $categoryWrapper = $("\n        <div class=\"categoryWrapper\">\n            <p class=\"categoryName\">".concat(categoryName, "</p>\n            <div class=\"sitesContainer\">\n                <div class=\"siteAdderContainer siteContainer\" category=").concat(categoryName, ">\n                    <div class=\"siteAdderIconWrapper siteIconWrapper\">\n                        <svg class=\"icon siteAdderIcon siteIcon\">\n                            <use xlink:href=\"#iconjia\"></use>\n                        </svg>\n                    </div>\n                    <div class=\"siteName\">\n                        \u6DFB\u52A0\u5FEB\u6377\u65B9\u5F0F\n                    </div>\n                </div>\n            </div>\n            <hr class=\"categoryDivider\">\n        </div>\n    "));
  $categoryWrapper.insertBefore($categoryAdderWrapper);
  $(".siteAdderContainer").click(function () {
    // e.stopPropagation()
    // console.log($(this).first().attr("category"))
    // console.log($(this).parent().html())
    // let categoryName = $(this).html()
    // console.log(categoryName)
    $("#siteAddCategoryNameInput").attr("value", $(this).first().attr("category")); // $( "#siteCategoryNameLabel" ).html(categoryName)

    $("#siteAddDialog").dialog({
      modal: true,
      buttons: {
        "确认": function _() {
          addSiteToList($("#siteAddIconInput").val(), $("#siteAddUrlInput").val(), $("#siteAddCategoryNameInput").val(), $("#siteAddNameInput").val());
          $(this).dialog("close");
        },
        "取消": function _() {
          $(this).dialog("close");
        }
      }
    }).dialog("open");
    render();
  });
  return $categoryWrapper.find(".sitesContainer");
};

var showEditDialog = function showEditDialog(id) {
  var siteNodeIndex;
  var siteNode;

  if (id) {
    siteNodeIndex = hashMap.findIndex(function (node) {
      return node.id == id;
    });
    siteNode = hashMap[siteNodeIndex];
    $("#siteEditUrlInput").attr("value", siteNode.url);
    $("#siteEditNameInput").attr("value", siteNode.siteName);
    $("#siteEditCategoryNameInput").attr("value", siteNode.categoryName);
    $("#siteEditIconInput").attr("value", siteNode.icon);
  } else {
    $("#siteEditUrlInput").attr("value", '');
    $("#siteEditNameInput").attr("value", '');
    $("#siteEditCategoryNameInput").attr("value", '');
    $("#siteEditIconInput").attr("value", '');
  }

  $("#siteEditDialog").dialog({
    modal: true,
    buttons: {
      "删除": function _() {
        hashMap.splice(siteNodeIndex, 1);
        localStorage.setItem("siteList", JSON.stringify(hashMap));
        render();
        $(this).dialog("close");
      },
      "确认": function _() {
        siteNode.icon = checkIcon($("#siteEditIconInput").val());
        siteNode.url = checkUrl($("#siteEditUrlInput").val());
        siteNode.categoryName = checkCategoryName($("#siteEditCategoryNameInput").val());
        siteNode.siteName = checkSiteName($("#siteEditNameInput").val());
        render();
        localStorage.setItem('siteList', JSON.stringify(hashMap));
        $(this).dialog("close");
      },
      "取消": function _() {
        $(this).dialog("close");
      }
    }
  }).dialog("open");
};

var createSite = function createSite(site) {
  var $siteContainer = $("\n        <div class=\"siteContainer\" id=\"".concat(site.id, "\">\n            <div class=\"siteIconWrapper\">\n                <div class=\"siteIcon\">\n                    ").concat(site.icon, "\n                </div>\n            </div>\n            <div class=\"siteName\">\n                ").concat(site.siteName, "\n            </div>\n            <svg class=\"icon editMenu\">\n                <use xlink:href=\"#icongengduo\"></use>\n            </svg>\n        </div>\n    "));
  $siteContainer.click(function () {
    window.open(site.url);
  });
  $siteContainer.on("touchstart", function (e) {
    // 长按事件触发
    var $siteContainer = $(e.target);

    while (!$siteContainer.hasClass("siteContainer")) {
      // console.log($siteContainer)
      $siteContainer = $siteContainer.parent();
    }

    var id = $siteContainer.attr("id"); // console.log($siteContainer)

    timeOutEvent = setTimeout(function (e) {
      timeOutEvent = 0;
      showEditDialog(id);
    }, 400); //长按400毫秒
    // e.preventDefault();
  });
  $siteContainer.on("touchmove", function () {
    clearTimeout(timeOutEvent);
    timeOutEvent = 0;
  });
  $siteContainer.on("touchend", function () {
    clearTimeout(timeOutEvent);

    if (timeOutEvent != 0) {
      // 点击事件
      // location.href = '/a/live-rooms.html';
      // alert('你点击了');
      window.open(site.url);
    }

    return false;
  }); // $siteContainer.on("tap",function(){
  //     window.open(site.url)
  // });
  // $siteContainer.on("taphold",function(){
  //     alert("长按")
  // });

  $siteContainer.find(".editMenu").click(function (e) {
    e.stopPropagation(); // 阻止冒泡

    var id = $(this).parent().attr("id"); // console.log("id",id)

    showEditDialog(id);
  });
  return $siteContainer;
};

var render = function render() {
  $(".categoryWrapper").remove();
  hashMap.forEach(function (node, index) {
    // 判断站点所属分类是否存在
    var categoryName = node.categoryName; // console.log("categoryName:",categoryName)

    var categoryIsExisted = false;
    var $sitesContainer;
    $globalMain.find(".categoryName").each(function (index) {
      if (!categoryIsExisted) {
        var $this = $(this);

        if ($this.html() === categoryName) {
          //该分类已存在
          categoryIsExisted = true;
          $sitesContainer = $this.next(".sitesContainer");
        }
      }
    });

    if (!categoryIsExisted) {
      //该分类不存在则创建分类
      $sitesContainer = createCategory(categoryName);
    } // console.log(`sitesContainer:${$sitesContainer.html()}`)
    // console.log(`siteName:${node.siteName}`)
    // 创建站点


    var $siteContainer = createSite(node); // console.log($sitesContainer.find(".siteAdderContainer").html())

    $siteContainer.insertBefore($sitesContainer.find(".siteAdderContainer"));
  });
}; // 第一次打开网站时先渲染


render();
$(".categoryAdderWrapper").click(function () {
  showEditDialog();
});
},{}],"../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50892" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map