const localSiteList = JSON.parse(localStorage.getItem('siteList'))
const hashMap = localSiteList || [
    {id:0,icon:'B', url:'https://www.bilibili.com', categoryName:"视频", siteName:"哔哩哔哩～", key:'B'},
    {id:1,icon:'B', url:'https://www.baidu.com', categoryName:"搜索", siteName:'百度',key:'A'},
    {id:2,icon:'G', url:'https://www.google.com', categoryName:"搜索", siteName:'谷歌',key:'G'},
    {id:3,icon:'I', url:'https://www.iconfont.cn', categoryName:"前端资源", siteName:'Iconfont', key:'I'},
    {id:4,icon:'G', url:'https://www.github.com/Polly-foz', categoryName:'关于我', siteName:'我的github', key:'P'},
    {id:5,icon:'B', url:'https://yangpeiya.xyz/posts', categoryName:'关于我', siteName:'我的blog', key:'Y'}

]

const $globalMain = $('.globalMain')

const checkIcon = (icon) => {
    return icon||'?'
}

const checkUrl = (url) => {
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    return url
}

const checkCategoryName = (categoryName) => {
    return categoryName || "未分类"
}

const checkSiteName = (siteName) => {
    return siteName||"(未命名)"
}

const addSiteToList = (icon,url,categoryName,siteName) => {
    icon = checkIcon(icon)
    url = checkUrl(url)
    categoryName = checkCategoryName(categoryName)
    siteName = checkSiteName(siteName)
    key = '?'
    console.log(key)
    hashMap.push({
        id: new Date().getTime(),
        icon:icon,
        url:url,
        categoryName:categoryName,
        siteName:siteName,
        key:key,
    })
    localStorage.setItem('siteList', JSON.stringify(hashMap))
    render()
}


const createCategory = (categoryName) => {
    let $categoryAdderWrapper = $(".categoryAdderWrapper")
    let $categoryWrapper = $(`
        <div class="categoryWrapper">
            <p class="categoryName">${categoryName}</p>
            <div class="sitesContainer">
                <div class="siteAdderContainer siteContainer" category=${categoryName}>
                    <div class="siteAdderIconWrapper siteIconWrapper">
                        <svg class="icon siteAdderIcon siteIcon">
                            <use xlink:href="#iconjia"></use>
                        </svg>
                    </div>
                    <div class="siteName">
                        添加快捷方式
                    </div>
                </div>
            </div>
            <hr class="categoryDivider">
        </div>
    `)
    $categoryWrapper.insertBefore($categoryAdderWrapper)
    $(".siteAdderContainer").click(function(){
        // e.stopPropagation()
        // console.log($(this).first().attr("category"))
        // console.log($(this).parent().html())
        // let categoryName = $(this).html()
        // console.log(categoryName)

        $( "#siteAddCategoryNameInput" ).attr("value",$(this).first().attr("category"))
        // $( "#siteCategoryNameLabel" ).html(categoryName)
        $( "#siteAddDialog" ).dialog({
            modal: true,
            buttons: {
                "确认": function() {
                    addSiteToList($("#siteAddIconInput").val(),$("#siteAddUrlInput").val(),
                        $("#siteAddCategoryNameInput").val(),$("#siteAddNameInput").val()
                    )
                    $( this ).dialog( "close" );
                },
                "取消": function() {
                    $( this ).dialog( "close" );
                }
            },
        }).dialog("open")
        render()
    })
    return $categoryWrapper.find(".sitesContainer")
}

const showEditDialog = function(id){
    let siteNodeIndex
    let siteNode
    if(id) {
        siteNodeIndex = hashMap.findIndex((node) => {
            return node.id == id
        })
        siteNode = hashMap[siteNodeIndex]
        $("#siteEditUrlInput").attr("value", siteNode.url)
        $("#siteEditNameInput").attr("value", siteNode.siteName)
        $("#siteEditCategoryNameInput").attr("value", siteNode.categoryName)
        $("#siteEditIconInput").attr("value", siteNode.icon)
    }else{
        $("#siteEditUrlInput").attr("value", '')
        $("#siteEditNameInput").attr("value", '')
        $("#siteEditCategoryNameInput").attr("value", '')
        $("#siteEditIconInput").attr("value", '')
    }
    $( "#siteEditDialog" ).dialog({
        modal: true,
        buttons: {
            "删除": function(){
                hashMap.splice(siteNodeIndex,1)
                localStorage.setItem("siteList",JSON.stringify(hashMap))
                render()
                $( this ).dialog( "close" );
            },
            "确认": function() {
                siteNode.icon = checkIcon($("#siteEditIconInput").val())
                siteNode.url = checkUrl($("#siteEditUrlInput").val())
                siteNode.categoryName = checkCategoryName($("#siteEditCategoryNameInput").val())
                siteNode.siteName = checkSiteName($("#siteEditNameInput").val())
                render()
                localStorage.setItem('siteList', JSON.stringify(hashMap))
                $( this ).dialog( "close" );
            },
            "取消": function() {
                $( this ).dialog( "close" );
            }
        },
    }).dialog("open")
}

const createSite = (site) => {
    let $siteContainer = $(`
        <div class="siteContainer" id="${site.id}">
            <div class="siteIconWrapper">
                <div class="siteIcon">
                    ${site.icon}
                </div>
            </div>
            <div class="siteName">
                ${site.siteName}
            </div>
            <svg class="icon editMenu">
                <use xlink:href="#icongengduo"></use>
            </svg>
        </div>
    `)
    $siteContainer.click(()=>{
        window.open(site.url)
    })
    $siteContainer.on("touchstart",function(e) {
        // 长按事件触发
        let $siteContainer = $(e.target)
        while(!$siteContainer.hasClass("siteContainer")){
            // console.log($siteContainer)
            $siteContainer = $siteContainer.parent()
        }
        let id = $siteContainer.attr("id")
        // console.log($siteContainer)
        timeOutEvent = setTimeout(function(e) {
            timeOutEvent = 0;
            showEditDialog(id)
        }, 400);
            //长按400毫秒
            // e.preventDefault();
    })
    $siteContainer.on("touchmove",function() {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
    })
    $siteContainer.on("touchend", function() {
        clearTimeout(timeOutEvent);
        if (timeOutEvent != 0) {
            // 点击事件
            // location.href = '/a/live-rooms.html';
            // alert('你点击了');
            window.open(site.url)
        }return false;
    })

    // $siteContainer.on("tap",function(){
    //     window.open(site.url)
    // });
    // $siteContainer.on("taphold",function(){
    //     alert("长按")
    // });
    $siteContainer.find(".editMenu").click(function(e){
        e.stopPropagation() // 阻止冒泡
        let id = $(this).parent().attr("id")
        // console.log("id",id)
        showEditDialog(id)
    })
    return $siteContainer
}

const render = () => {
    $(".categoryWrapper").remove()
    hashMap.forEach((node, index) => {
        // 判断站点所属分类是否存在
        let categoryName = node.categoryName
        // console.log("categoryName:",categoryName)
        let categoryIsExisted = false
        let $sitesContainer
        $globalMain.find(".categoryName").each(function(index){
            if(!categoryIsExisted) {
                let $this = $(this)
                if ($this.html() === categoryName) {//该分类已存在
                    categoryIsExisted = true
                    $sitesContainer = $this.next(".sitesContainer")
                }
            }
        })
        if(!categoryIsExisted){//该分类不存在则创建分类
            $sitesContainer = createCategory(categoryName)
        }
        // console.log(`sitesContainer:${$sitesContainer.html()}`)
        // console.log(`siteName:${node.siteName}`)

        // 创建站点
        let $siteContainer = createSite(node)
        // console.log($sitesContainer.find(".siteAdderContainer").html())
        $siteContainer.insertBefore($sitesContainer.find(".siteAdderContainer"))
    })
}

// 第一次打开网站时先渲染
render()

$(".categoryAdderWrapper").click(function(){
    showEditDialog()
})



