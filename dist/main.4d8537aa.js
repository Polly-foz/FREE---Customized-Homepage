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
})({"epB2":[function(require,module,exports) {
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
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.4d8537aa.js.map