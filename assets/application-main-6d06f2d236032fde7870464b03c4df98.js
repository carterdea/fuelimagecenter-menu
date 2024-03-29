function wrapTablesForScrolling() {
    $("table").each(function() {
        $(this).wrap("<div class='table-scroll'></div>")
    })
}

function manipulateEmailLinks() {
    pathName = window.location.pathname, (pathName.indexOf("mid") >= 0 || pathName.indexOf("canopy") >= 0 || pathName.indexOf("forecourt") >= 0) && $(".email-link").each(function() {
        addSectionNumberAndHeader($(this)), addPdfLink($(this))
    })
}

function addSectionNumberAndHeader(e) {
    var t = "",
        n = "";
    e.siblings("button.button-style").length > 0 ? (t = e.siblings("button.button-style").find(".content-section").text(), n = e.siblings("button.button-style").text().replace(t, "")) : (t = e.siblings(".content-section").text(), n = e.parents(".header-placeholder").text().replace(t, ""));
    var i = n.replace(/[^A-Za-z0-9]/g, "-").replace(/\-+/g, "-"),
        o = e.context.href,
        r = o.replace("insert_humanized_section_number", t).split("%23")[0] + "%23" + i;
    e.attr("href", r)
}

function addPdfLink(e) {
    var t = "";
    e.siblings("button.button-style").length > 0 ? ($teritiary_content = e.parents(".accordion").nextAll(".collapse").first(), t = $teritiary_content.find(".pdf-button-page").attr("href")) : t = e.parents(".header-placeholder").nextAll(".pdf-button-page").first().attr("href");
    var n = e.context.href,
        i = n.replace("insert_pdf_link", t);
    e.attr("href", i)
}

function orderMobileImages() {
    $(window).on("load resize", function() {
        var e = window.innerWidth;
        868 >= e ? $(".pdf-row").each(function() {
            orderChildrenBasedOnImages($(this))
        }) : $(".order-10, .order-11, .order-12, .order-13,.order-14, .order-15").each(function() {
            $(this).removeClass(".order-10, .order-11, .order-12, .order-13,.order-14, .order-15")
        })
    })
}

function orderChildrenBasedOnImages(e) {
    var t = ["order-10", "order-11", "order-12", "order-13", "order-14", "order-15"];
    i = 0, e.children().each(function() {
        $(this).find(".image-wrapper").length > 0 && ($(this).addClass(t[i]), i++)
    })
}

function addScrollbarsToTables() {
    $(window).on("load resize", function() {
        var e = window.innerWidth;
        $(".table-scroll").each(function() {
            var t = $(this).width(),
                n = $(this).offset().left + $(this).width(),
                i = $(this).find("table").width(),
                o = $(this).find("table").offset().left + $(this).find("table").width();
            n > e || i > t && o > e ? (extendShownTableToEdgeOfScreen($(this), e, n), $(this).addClass("show-scrollbars")) : i > t && e > o ? (extendShownTableToEdgeOfFullTable($(this), o, n), $(this).removeClass("show-scrollbars")) : t > i && $(this).data("tableMargin") && (resetShownTable($(this)), $(this).removeClass("show-scrollbars"))
        })
    })
}

function extendShownTableToEdgeOfScreen(e, t, n) {
    var i = parseInt(e.css("margin-right")),
        o = parseInt(e.css("padding-right")),
        r = -1 * Math.abs(i - (t - n));
    e.data("tableMargin", i), e.data("tablePadding", o), e.css("margin-right", r + "px"), 0 == e.siblings(".doubleScroll-scroll-wrapper").length && e.doubleScroll({
        resetOnWindowResize: !0,
        onlyIfScroll: !0
    }), e.siblings(".doubleScroll-scroll-wrapper").css("margin-right", r + "px")
}

function extendShownTableToEdgeOfFullTable(e, t, n) {
    var i = parseInt(e.css("margin-right")),
        o = parseInt(e.css("padding-right")),
        r = -1 * Math.abs(i - (t - n));
    e.data("tableMargin", i), e.data("tablePadding", o), e.css("margin-right", r + "px"), e.siblings(".doubleScroll-scroll-wrapper").remove()
}

function resetShownTable(e) {
    var t = e.data("tableMargin"),
        n = e.data("tablePadding");
    e.css("margin-right", t + "px"), e.css("padding-right", n + "px"), e.removeData("tableMargin"), e.removeData("tablePadding"), e.siblings(".doubleScroll-scroll-wrapper").remove()
}

function isBrowserIE() {
    var e = window.navigator.userAgent,
        t = e.indexOf("MSIE ");
    if (t > 0) return !0;
    var n = e.indexOf("Trident/");
    return n > 0 ? !0 : !1
}

function checkSideBarHover() {
    $(".sidebar-menu > li").mouseenter(limitToOne), $(".bg-red").mouseenter(checkHoverInSecondaryEnter), $(".bg-red > li").mouseenter(checkHoverInSecondaryEnter), 1 == isBrowserIE() ? $(".bg-red > li").mouseleave(function() {
        setTimeout(checkHoverInSecondaryLeave, 200)
    }) : $(".bg-red > li").mouseleave(checkHoverInSecondaryLeave)
}

function activateNavbarSelection() {
    $(window).on("load", function() {
        pathName = window.location.pathname, pathName.indexOf("mid") >= 0 ? $("#mid-btn > a").addClass("active") : pathName.indexOf("canopy") >= 0 ? $("#canopy-btn > a").addClass("active") : pathName.indexOf("forecourt") >= 0 ? $("#forecourt-btn > a").addClass("active") : pathName.indexOf("miscellaneous") >= 0 ? $("#miscellaneous-btn > a").addClass("active") : pathName.indexOf("whats_new") >= 0 ? $("#whats-new-btn > a").addClass("active") : pathName.indexOf("asset_groups") >= 0 && $("#asset-groups-btn > a").addClass("active")
    })
}

function resizeNavbar() {
    $(window).on("load scroll resize", function() {
        document.body.scrollTop > 35 || document.documentElement.scrollTop > 35 ? ($(".header-bar").addClass("shrink-nav"), $(".main-menu a").addClass("shrink-main-menu"), $("a.search-opener").addClass("shrink-search"), $(".nav-opener").css("top", "64px")) : ($(".header-bar").removeClass("shrink-nav"), $(".main-menu a").removeClass("shrink-main-menu"), $("a.search-opener").removeClass("shrink-search"), $(".nav-opener").css("top", "80px"))
    })
}

function initHideMenu() {
    var e = "hover",
        t = jQuery("#wrapper"),
        n = "sb-nav-active";
    jQuery(".sidebar-menu").each(function() {
        var i = jQuery(this),
            o = i.find('a:not(".btn-back")');
        o.on("click", function() {
            i.find("." + e).removeClass(e), t.hasClass(n) && t.removeClass(n), hideTertiaryContent()
        })
    })
}

function initTouchNav() {
    jQuery(".sidebar-menu").each(function() {
        new TouchNav({
            navBlock: this
        })
    })
}

function initStickySidebar() {
    jQuery("#sidebar").each(function() {
        var e = jQuery(window),
            t = window.innerWidth,
            n = jQuery(this),
            i = jQuery("#tocList");
        adjustSidebarHeight(t, n, i), showSidebar(), e.on("load", function() {
            n.css({
                transition: "0s"
            })
        }), e.on("scroll", function() {
            n.css({
                transition: "0.3s"
            })
        }), e.on("scroll resize", function() {
            adjustSidebarHeight(t, n, i)
        })
    })
}

function adjustSidebarHeight(e, t, n) {
    document.body.scrollTop > 35 || document.documentElement.scrollTop > 35 ? (t.css({
        "margin-top": "103px"
    }), e > 868 ? n.css("height", "100%").css("height", "-=103px") : n.css("height", "100%")) : (t.css({
        "margin-top": "138px"
    }), e > 868 ? n.css("height", "100%").css("height", "-=138px") : n.css("height", "100%"))
}

function showSidebar() {
    var e = window.innerWidth;
    e > 868 ? $("#sidebar").css("visibility", "visible") : setTimeout(function() {
        $("#sidebar").css("visibility", "visible")
    }, 500)
}

function initDropdownToggleClass() {
    ResponsiveHelper.addRange({
        "868..": {
            on: function() {
                var e = "menu-active",
                    t = jQuery(window);
                jQuery("#nav .dropdown").each(function() {
                    var n = jQuery(this),
                        i = n.find(".dropdown-toggle");
                    i.on("mouseenter", function() {
                        jQuery(this).parent().addClass(e)
                    }), n.on("mouseleave", function() {
                        n.removeClass(e)
                    }), t.on("click", function(t) {
                        jQuery(t.target).closest(n).length || n.removeClass(e)
                    })
                })
            }
        }
    })
}

function limitToOne() {
    var e = this;
    $(".sidebar-menu > li.hover").each(function() {
        this != e && $(this).removeClass("hover")
    })
}

function checkTertiary(e) {
    var t = $(e),
        n = window.innerWidth;
    if (t.attr("id") && n > 868) {
        var i = t.attr("id").replace("number-", ""),
            o = $("#attach-li-" + i);
        if (t.parent().hasClass("bg-red") && o.children().length > 0) {
            var r = o.children("ul"),
                s = Math.floor(t.parent().outerWidth());
            t.hasClass("hover") ? (r.addClass("show-tertiary-content"), r.css("-webkit-transform", "translateX(" + s + "px)"), r.css("-ms-transform", "translateX(" + s + "px)"), r.css("transform", "translateX(" + s + "px)")) : (r.removeClass("show-tertiary-content"), r.css("-webkit-transform", "translateX(-" + s + "px)"), r.css("-ms-transform", "translateX(-" + s + "px)"), r.css("transform", "translateX(-" + s + "px)"))
        }
    }
}

function hideTertiaryContent() {
    $(".sidebar-menu .show-tertiary-content").each(function() {
        $currentPos = $(this).offset(), $(this).css("-webkit-transform", "translateX(-" + $currentPos.left + "px)"), $(this).css("-ms-transform", "translateX(-" + $currentPos.left + "px)"), $(this).css("transform", "translateX(-" + $currentPos.left + "px)"), $(this).removeClass("show-tertiary-content")
    })
}

function checkHoverInSecondaryEnter() {
    0 == $(".bg-red li:hover").length ? (hideTertiaryContent(), $(".bg-red li.hover").each(function() {
        $(this).removeClass("hover")
    })) : $(".bg-red li.hover").each(function() {
        var e = $(this).attr("id").replace("number-", ""),
            t = $(".bg-red li:hover").attr("id").replace("number-", "");
        t != e && ($(this).removeClass("hover"), checkTertiary(this))
    })
}

function checkHoverInSecondaryLeave() {
    0 == $(".bg-gray:hover").length && $(".bg-red li.hover").each(function() {
        var e = $(this).attr("id").replace("number-", "");
        if ($(".bg-red li:hover").length) {
            var t = $(".bg-red li:hover").attr("id").replace("number-", "");
            t != e && ($(this).removeClass("hover"), checkTertiary(this))
        } else $(this).removeClass("hover"), checkTertiary(this)
    })
}

function checkHover(e) {
    0 == $(".bg-red:hover").length && 0 == $(".bg-gray:hover").length && (hideTertiaryContent(), $(".bg-red li.hover").each(function() {
        $(this).removeClass("hover")
    }), lib.removeClass(e.currentItem, e.options.hoverClass), jQuery(e.currentItem).trigger("itemleave"))
}

function checkHoverForIE(e) {
    0 == $(".bg-red:hover").length && 0 == $(".bg-gray:hover").length ? (hideTertiaryContent(), $(".bg-red li.hover").each(function() {
        $(this).removeClass("hover"), $(this).trigger("itemleave")
    }), $(".sidebar-menu li.hover").each(function() {
        $(this).removeClass("hover"), $(this).trigger("itemleave")
    })) : $(".bg-red:hover").length > 0 && $(".bg-red li.hover").each(function() {
        var e = $(this).attr("id").replace("number-", ""),
            t = $(".bg-red li.hover").attr("id").replace("number-", "");
        t != e && $(this).hasClass("hover") && ($(this).removeClass("hover"), checkTertiary(this))
    })
}

function displayForMobile() {
    $(window).on("load resize", function() {
        var e = window.innerWidth;
        868 >= e ? (removeMobileSidemenuLinks(), setDisplayForMenus(), positionMenus(), setBackButtons(), showMobileGearMenu(), hideMobileGearMenu(), delayMobileGearClicks()) : addRemovedMobileSidemenuLinks()
    })
}

function removeMobileSidemenuLinks() {
    $("ul.sidebar-menu > li").each(function() {
        if ($(this).children("ul").length > 0 && $(this).children("a").hasClass("sliding-link")) {
            var e = $(this).children("a");
            e.data("savedHref", e.attr("href")), e.removeClass("sliding-link"), e.attr("href", "")
        }
    }), $("ul.sidebar-menu > li > ul > li").each(function() {
        if (findTertiary($(this)).length > 0 && $(this).children("a").hasClass("sliding-link")) {
            var e = $(this).children("a");
            e.data("savedHref", e.attr("href")), e.removeClass("sliding-link"), e.attr("href", "")
        }
    })
}

function addRemovedMobileSidemenuLinks() {
    $("ul.sidebar-menu > li").each(function() {
        if ($(this).children("ul").length > 0 && !$(this).children("a").hasClass("sliding-link")) {
            var e = $(this).children("a");
            e.addClass("sliding-link"), e.attr("href", e.data("savedHref")), e.removeData("savedHref")
        }
    }), $("ul.sidebar-menu > li > ul > li").each(function() {
        if (findTertiary($(this)).length > 0 && !$(this).children("a").hasClass("sliding-link")) {
            var e = $(this).children("a");
            e.addClass("sliding-link"), e.attr("href", e.data("savedHref")), e.removeData("savedHref")
        }
    })
}

function setDisplayForMenus() {
    $("ul.sidebar-menu li, #sidebar .sb-nav-close").click(function(e) {
        e.stopPropagation(), $("#wrapper").addClass("sb-nav-active"), $(".sb-nav-close").removeClass("secondary-menu"), $(this).parent().hasClass("sidebar-menu") && $(this).children("ul").length > 0 ? ($(this).children("ul").css("left", "0"), $(".sb-nav-close").addClass("secondary-menu")) : !$(this).parent().hasClass("sidebar-menu") && findTertiary($(this)) ? findTertiary($(this)).css("left", "0") : ($("#wrapper").removeClass("sb-nav-active"), positionMenus())
    })
}

function positionMenus() {
    var e = window.innerWidth;
    $(".sb-nav-drop, .bg-red, .bg-gray").each(function() {
        $(this).css("left", -1 * e)
    }), $(".sb-nav-opener").on("click", function() {
        $(".sb-nav-drop").css("left", "0")
    })
}

function setBackButtons() {
    $("ul.sidebar-menu > li > ul > a.btn-back").click(function(e) {
        e.stopPropagation();
        var t = window.innerWidth;
        $(this).parent("ul").css("left", -1 * t), $(".sb-nav-close").removeClass("secondary-menu")
    }), $("ul.sidebar-menu > li > div > ul > a.btn-back").click(function(e) {
        e.stopPropagation();
        var t = window.innerWidth;
        $(this).parent("ul").css("left", -1 * t), $(".sb-nav-close").addClass("secondary-menu")
    })
}

function findTertiary(e) {
    if (e.attr("id")) {
        var t = e.attr("id").replace("number-", ""),
            n = [];
        return e.parent().siblings("div").each(function() {
            if ("undefined" != typeof $(this).attr("id")) {
                var e = $(this).attr("id").replace("attach-li-", "");
                n.push(e)
            }
        }), n.indexOf(t) >= 0 ? $("#attach-li-" + t).children("ul") : !1
    }
    return !1
}

function showMobileGearMenu() {
    setMobileGearMenuSelections();
    var e = window.innerWidth;
    $("#gear-options").css("left", e), $("#gear-icon").on("click", function() {
        $("#gear-options").css("left", .2 * e), $("#gear-options").css("visibility", "visible"), $("#header").css("z-index", "1001")
    }), $(".nav-opener").on("click", function() {
        $(".nav-drop").css("visbility", "visibile"), $("#header").css("z-index", "1001")
    }), $(".nav-close").on("click", function() {
        $("#header").css("z-index", "12")
    }), $("#miscellaneous-btn").on("click", function() {
        $subMenu = $("#miscellaneous-menu"), $subMenu.css("left", "0")
    }), $("#miscellaneous-btn .btn-back").on("click", function(e) {
        e.stopPropagation(), $subMenu = $("#miscellaneous-menu"), $subMenu.css("left", "100%")
    }), $("#mid-btn").on("click", function() {
        $subMenu = $("#mid-menu"), $subMenu.css("left", "0")
    }), $("#mid-btn .btn-back").on("click", function(e) {
        e.stopPropagation(), $subMenu = $("#mid-menu"), $subMenu.css("left", "100%")
    }), $("#canopy-btn").on("click", function() {
        $subMenu = $("#canopy-menu"), $subMenu.css("left", "0")
    }), $("#canopy-btn .btn-back").on("click", function(e) {
        e.stopPropagation(), $subMenu = $("#canopy-menu"), $subMenu.css("left", "100%")
    }), $("#forecourt-btn").on("click", function() {
        $subMenu = $("#forecourt-menu"), $subMenu.css("left", "0")
    }), $("#forecourt-btn .btn-back").on("click", function(e) {
        e.stopPropagation(), $subMenu = $("#forecourt-menu"), $subMenu.css("left", "100%")
    })
}

function setMobileGearMenuSelections() {
    var e = $("#user-current-selection").data().language,
        t = $("#user-current-selection").data().business,
        n = t.charAt(0).toUpperCase() + t.slice(1);
    $("#gear-options .mobile-langs li").each(function() {
        $(this).find("a").text() == e && $(this).find("input").prop("checked", !0)
    }), $("#gear-options .mobile-add-nav li").each(function() {
        $(this).find("a").text() == n && $(this).find("input").prop("checked", !0)
    })
}

function hideMobileGearMenu() {
    var e = window.innerWidth;
    $("#gear-options-close").on("click", function() {
        $("#gear-options").css("left", e), $("#gear-options").css("visibility", "hidden"), $("#header").css("z-index", "10")
    })
}

function delayMobileGearClicks() {
    $("#gear-options a").click(function(e) {
        e.preventDefault, uncheckOtherSliders($(this));
        var t = $(this).attr("href");
        setTimeout(function() {
            window.location.href = t
        }, 500)
    })
}

function uncheckOtherSliders(e) {
    var t = e.siblings("input"),
        n = e.text();
    t.prop("checked", !0), e.closest("ul").find("input").each(function() {
        $(this).is(":checked") && $(this).siblings("a").text() != n && $(this).prop("checked", !1)
    })
}

function initMobileNav() {
    jQuery("#wrapper").mobileNav({
        menuActiveClass: "nav-active",
        menuOpener: ".nav-opener, .nav-close"
    }), jQuery("#wrapper").mobileNav({
        menuActiveClass: "search-active",
        menuOpener: ".search-opener"
    }), jQuery("#wrapper").mobileNav({
        menuActiveClass: "sb-nav-active",
        menuOpener: ".sb-nav-opener, .sb-nav-close"
    })
}

function initMobileNavigation() {
    ResponsiveHelper.addRange({
        "..868": {
            on: function() {
                jQuery(".nav-drop").mobileNavigation({
                    slider: ".main-menu",
                    nextLevel: "> .dropdown-menu",
                    backBtn: '<a href="#" class="btn-back" />'
                }), jQuery(".fixed-nav").mobileNavigation({
                    slider: ".sidebar-menu",
                    nextLevel: "> .dropdown-menu",
                    backBtn: '<a href="#" class="btn-back" />'
                })
            },
            off: function() {
                void 0 !== jQuery(".nav-drop").data("MobileNavigation") && jQuery(".nav-drop").data("MobileNavigation").destroy(), void 0 !== jQuery(".fixed-nav").data("MobileNavigation") && jQuery(".fixed-nav").data("MobileNavigation").destroy()
            }
        }
    })
}

function TouchNav(e) {
    this.options = {
        hoverClass: "hover",
        menuItems: "li",
        menuOpener: "a",
        menuDrop: "ul",
        navBlock: null
    };
    for (var t in e) e.hasOwnProperty(t) && (this.options[t] = e[t]);
    this.init()
}

function gl_handle_country_select_change() {
    var e = $("#country-select").val();
    "" != e && (window.location = util_add_url_param("country", e))
}

function gl_handle_visibility_level_select_change() {
    var e = $("#visibility-level-select").val();
    "" != e && (window.location = util_add_url_param("visibility_level", e))
}

function util_add_url_param(e, t) {
    var n = document.location.href,
        i = n,
        o = "";
    if (-1 !== n.indexOf("#")) {
        var r = n.split("#");
        n = r[0], o = r[1]
    }
    var s = new RegExp("([?&])" + e + "=.*?(&|$)", "i"),
        a = -1 !== n.indexOf("?") ? "&" : "?";
    return i = n.match(s) ? n.replace(s, "$1" + e + "=" + t + "$2") : n + a + e + "=" + t, "" != o && (i += "#" + o), i
}! function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = !!e && "length" in e && e.length,
            n = fe.type(e);
        return "function" === n || fe.isWindow(e) ? !1 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function i(e, t, n) {
        if (fe.isFunction(t)) return fe.grep(e, function(e, i) {
            return !!t.call(e, i, e) !== n
        });
        if (t.nodeType) return fe.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (xe.test(t)) return fe.filter(t, e, n);
            t = fe.filter(t, e)
        }
        return fe.grep(e, function(e) {
            return fe.inArray(e, t) > -1 !== n
        })
    }

    function o(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function r(e) {
        var t = {};
        return fe.each(e.match(Ae) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function s() {
        ie.addEventListener ? (ie.removeEventListener("DOMContentLoaded", a), e.removeEventListener("load", a)) : (ie.detachEvent("onreadystatechange", a), e.detachEvent("onload", a))
    }

    function a() {
        (ie.addEventListener || "load" === e.event.type || "complete" === ie.readyState) && (s(), fe.ready())
    }

    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var i = "data-" + t.replace(je, "-$1").toLowerCase();
            if (n = e.getAttribute(i), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Oe.test(n) ? fe.parseJSON(n) : n
                } catch (o) {}
                fe.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function c(e) {
        var t;
        for (t in e)
            if (("data" !== t || !fe.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function u(e, t, n, i) {
        if (Ie(e)) {
            var o, r, s = fe.expando,
                a = e.nodeType,
                l = a ? fe.cache : e,
                c = a ? e[s] : e[s] && s;
            if (c && l[c] && (i || l[c].data) || void 0 !== n || "string" != typeof t) return c || (c = a ? e[s] = ne.pop() || fe.guid++ : s), l[c] || (l[c] = a ? {} : {
                toJSON: fe.noop
            }), ("object" == typeof t || "function" == typeof t) && (i ? l[c] = fe.extend(l[c], t) : l[c].data = fe.extend(l[c].data, t)), r = l[c], i || (r.data || (r.data = {}), r = r.data), void 0 !== n && (r[fe.camelCase(t)] = n), "string" == typeof t ? (o = r[t], null == o && (o = r[fe.camelCase(t)])) : o = r, o
        }
    }

    function d(e, t, n) {
        if (Ie(e)) {
            var i, o, r = e.nodeType,
                s = r ? fe.cache : e,
                a = r ? e[fe.expando] : fe.expando;
            if (s[a]) {
                if (t && (i = n ? s[a] : s[a].data)) {
                    fe.isArray(t) ? t = t.concat(fe.map(t, fe.camelCase)) : t in i ? t = [t] : (t = fe.camelCase(t), t = t in i ? [t] : t.split(" ")), o = t.length;
                    for (; o--;) delete i[t[o]];
                    if (n ? !c(i) : !fe.isEmptyObject(i)) return
                }(n || (delete s[a].data, c(s[a]))) && (r ? fe.cleanData([e], !0) : de.deleteExpando || s != s.window ? delete s[a] : s[a] = void 0)
            }
        }
    }

    function h(e, t, n, i) {
        var o, r = 1,
            s = 20,
            a = i ? function() {
                return i.cur()
            } : function() {
                return fe.css(e, t, "")
            },
            l = a(),
            c = n && n[3] || (fe.cssNumber[t] ? "" : "px"),
            u = (fe.cssNumber[t] || "px" !== c && +l) && Le.exec(fe.css(e, t));
        if (u && u[3] !== c) {
            c = c || u[3], n = n || [], u = +l || 1;
            do r = r || ".5", u /= r, fe.style(e, t, u + c); while (r !== (r = a() / l) && 1 !== r && --s)
        }
        return n && (u = +u || +l || 0, o = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = u, i.end = o)), o
    }

    function f(e) {
        var t = ze.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length;) n.createElement(t.pop());
        return n
    }

    function p(e, t) {
        var n, i, o = 0,
            r = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : void 0;
        if (!r)
            for (r = [], n = e.childNodes || e; null != (i = n[o]); o++) !t || fe.nodeName(i, t) ? r.push(i) : fe.merge(r, p(i, t));
        return void 0 === t || t && fe.nodeName(e, t) ? fe.merge([e], r) : r
    }

    function m(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++) fe._data(n, "globalEval", !t || fe._data(t[i], "globalEval"))
    }

    function g(e) {
        We.test(e.type) && (e.defaultChecked = e.checked)
    }

    function v(e, t, n, i, o) {
        for (var r, s, a, l, c, u, d, h = e.length, v = f(t), y = [], b = 0; h > b; b++)
            if (s = e[b], s || 0 === s)
                if ("object" === fe.type(s)) fe.merge(y, s.nodeType ? [s] : s);
                else if (Ue.test(s)) {
            for (l = l || v.appendChild(t.createElement("div")), c = (Fe.exec(s) || ["", ""])[1].toLowerCase(), d = Qe[c] || Qe._default, l.innerHTML = d[1] + fe.htmlPrefilter(s) + d[2], r = d[0]; r--;) l = l.lastChild;
            if (!de.leadingWhitespace && Re.test(s) && y.push(t.createTextNode(Re.exec(s)[0])), !de.tbody)
                for (s = "table" !== c || Xe.test(s) ? "<table>" !== d[1] || Xe.test(s) ? 0 : l : l.firstChild, r = s && s.childNodes.length; r--;) fe.nodeName(u = s.childNodes[r], "tbody") && !u.childNodes.length && s.removeChild(u);
            for (fe.merge(y, l.childNodes), l.textContent = ""; l.firstChild;) l.removeChild(l.firstChild);
            l = v.lastChild
        } else y.push(t.createTextNode(s));
        for (l && v.removeChild(l), de.appendChecked || fe.grep(p(y, "input"), g), b = 0; s = y[b++];)
            if (i && fe.inArray(s, i) > -1) o && o.push(s);
            else if (a = fe.contains(s.ownerDocument, s), l = p(v.appendChild(s), "script"), a && m(l), n)
            for (r = 0; s = l[r++];) Be.test(s.type || "") && n.push(s);
        return l = null, v
    }

    function y() {
        return !0
    }

    function b() {
        return !1
    }

    function w() {
        try {
            return ie.activeElement
        } catch (e) {}
    }

    function C(e, t, n, i, o, r) {
        var s, a;
        if ("object" == typeof t) {
            "string" != typeof n && (i = i || n, n = void 0);
            for (a in t) C(e, a, n, i, t[a], r);
            return e
        }
        if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), o === !1) o = b;
        else if (!o) return e;
        return 1 === r && (s = o, o = function(e) {
            return fe().off(e), s.apply(this, arguments)
        }, o.guid = s.guid || (s.guid = fe.guid++)), e.each(function() {
            fe.event.add(this, t, o, i, n)
        })
    }

    function _(e, t) {
        return fe.nodeName(e, "table") && fe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function x(e) {
        return e.type = (null !== fe.find.attr(e, "type")) + "/" + e.type, e
    }

    function $(e) {
        var t = ot.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function E(e, t) {
        if (1 === t.nodeType && fe.hasData(e)) {
            var n, i, o, r = fe._data(e),
                s = fe._data(t, r),
                a = r.events;
            if (a) {
                delete s.handle, s.events = {};
                for (n in a)
                    for (i = 0, o = a[n].length; o > i; i++) fe.event.add(t, n, a[n][i])
            }
            s.data && (s.data = fe.extend({}, s.data))
        }
    }

    function T(e, t) {
        var n, i, o;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !de.noCloneEvent && t[fe.expando]) {
                o = fe._data(t);
                for (i in o.events) fe.removeEvent(t, i, o.handle);
                t.removeAttribute(fe.expando)
            }
            "script" === n && t.text !== e.text ? (x(t).text = e.text, $(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), de.html5Clone && e.innerHTML && !fe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && We.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function S(e, t, n, i) {
        t = re.apply([], t);
        var o, r, s, a, l, c, u = 0,
            d = e.length,
            h = d - 1,
            f = t[0],
            m = fe.isFunction(f);
        if (m || d > 1 && "string" == typeof f && !de.checkClone && it.test(f)) return e.each(function(o) {
            var r = e.eq(o);
            m && (t[0] = f.call(this, o, r.html())), S(r, t, n, i)
        });
        if (d && (c = v(t, e[0].ownerDocument, !1, e, i), o = c.firstChild, 1 === c.childNodes.length && (c = o), o || i)) {
            for (a = fe.map(p(c, "script"), x), s = a.length; d > u; u++) r = c, u !== h && (r = fe.clone(r, !0, !0), s && fe.merge(a, p(r, "script"))), n.call(e[u], r, u);
            if (s)
                for (l = a[a.length - 1].ownerDocument, fe.map(a, $), u = 0; s > u; u++) r = a[u], Be.test(r.type || "") && !fe._data(r, "globalEval") && fe.contains(l, r) && (r.src ? fe._evalUrl && fe._evalUrl(r.src) : fe.globalEval((r.text || r.textContent || r.innerHTML || "").replace(rt, "")));
            c = o = null
        }
        return e
    }

    function k(e, t, n) {
        for (var i, o = t ? fe.filter(t, e) : e, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || fe.cleanData(p(i)), i.parentNode && (n && fe.contains(i.ownerDocument, i) && m(p(i, "script")), i.parentNode.removeChild(i));
        return e
    }

    function A(e, t) {
        var n = fe(t.createElement(e)).appendTo(t.body),
            i = fe.css(n[0], "display");
        return n.detach(), i
    }

    function D(e) {
        var t = ie,
            n = ct[e];
        return n || (n = A(e, t), "none" !== n && n || (lt = (lt || fe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (lt[0].contentWindow || lt[0].contentDocument).document, t.write(), t.close(), n = A(e, t), lt.detach()), ct[e] = n), n
    }

    function N(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function I(e) {
        if (e in $t) return e;
        for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = xt.length; n--;)
            if (e = xt[n] + t, e in $t) return e
    }

    function O(e, t) {
        for (var n, i, o, r = [], s = 0, a = e.length; a > s; s++) i = e[s], i.style && (r[s] = fe._data(i, "olddisplay"), n = i.style.display, t ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && Pe(i) && (r[s] = fe._data(i, "olddisplay", D(i.nodeName)))) : (o = Pe(i), (n && "none" !== n || !o) && fe._data(i, "olddisplay", o ? n : fe.css(i, "display"))));
        for (s = 0; a > s; s++) i = e[s], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[s] || "" : "none"));
        return e
    }

    function j(e, t, n) {
        var i = wt.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }

    function H(e, t, n, i, o) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > r; r += 2) "margin" === n && (s += fe.css(e, n + Me[r], !0, o)), i ? ("content" === n && (s -= fe.css(e, "padding" + Me[r], !0, o)), "margin" !== n && (s -= fe.css(e, "border" + Me[r] + "Width", !0, o))) : (s += fe.css(e, "padding" + Me[r], !0, o), "padding" !== n && (s += fe.css(e, "border" + Me[r] + "Width", !0, o)));
        return s
    }

    function L(e, t, n) {
        var i = !0,
            o = "width" === t ? e.offsetWidth : e.offsetHeight,
            r = pt(e),
            s = de.boxSizing && "border-box" === fe.css(e, "boxSizing", !1, r);
        if (0 >= o || null == o) {
            if (o = mt(e, t, r), (0 > o || null == o) && (o = e.style[t]), dt.test(o)) return o;
            i = s && (de.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
        }
        return o + H(e, t, n || (s ? "border" : "content"), i, r) + "px"
    }

    function M(e, t, n, i, o) {
        return new M.prototype.init(e, t, n, i, o)
    }

    function P() {
        return e.setTimeout(function() {
            Et = void 0
        }), Et = fe.now()
    }

    function q(e, t) {
        var n, i = {
                height: e
            },
            o = 0;
        for (t = t ? 1 : 0; 4 > o; o += 2 - t) n = Me[o], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function W(e, t, n) {
        for (var i, o = (R.tweeners[t] || []).concat(R.tweeners["*"]), r = 0, s = o.length; s > r; r++)
            if (i = o[r].call(n, t, e)) return i
    }

    function F(e, t, n) {
        var i, o, r, s, a, l, c, u, d = this,
            h = {},
            f = e.style,
            p = e.nodeType && Pe(e),
            m = fe._data(e, "fxshow");
        n.queue || (a = fe._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
            a.unqueued || l()
        }), a.unqueued++, d.always(function() {
            d.always(function() {
                a.unqueued--, fe.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], c = fe.css(e, "display"), u = "none" === c ? fe._data(e, "olddisplay") || D(e.nodeName) : c, "inline" === u && "none" === fe.css(e, "float") && (de.inlineBlockNeedsLayout && "inline" !== D(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", de.shrinkWrapBlocks() || d.always(function() {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (i in t)
            if (o = t[i], St.exec(o)) {
                if (delete t[i], r = r || "toggle" === o, o === (p ? "hide" : "show")) {
                    if ("show" !== o || !m || void 0 === m[i]) continue;
                    p = !0
                }
                h[i] = m && m[i] || fe.style(e, i)
            } else c = void 0;
        if (fe.isEmptyObject(h)) "inline" === ("none" === c ? D(e.nodeName) : c) && (f.display = c);
        else {
            m ? "hidden" in m && (p = m.hidden) : m = fe._data(e, "fxshow", {}), r && (m.hidden = !p), p ? fe(e).show() : d.done(function() {
                fe(e).hide()
            }), d.done(function() {
                var t;
                fe._removeData(e, "fxshow");
                for (t in h) fe.style(e, t, h[t])
            });
            for (i in h) s = W(p ? m[i] : 0, i, d), i in m || (m[i] = s.start, p && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function B(e, t) {
        var n, i, o, r, s;
        for (n in e)
            if (i = fe.camelCase(n), o = t[i], r = e[n], fe.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), s = fe.cssHooks[i], s && "expand" in s) {
                r = s.expand(r), delete e[i];
                for (n in r) n in e || (e[n] = r[n], t[n] = o)
            } else t[i] = o
    }

    function R(e, t, n) {
        var i, o, r = 0,
            s = R.prefilters.length,
            a = fe.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (o) return !1;
                for (var t = Et || P(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, s = 0, l = c.tweens.length; l > s; s++) c.tweens[s].run(r);
                return a.notifyWith(e, [c, r, n]), 1 > r && l ? n : (a.resolveWith(e, [c]), !1)
            },
            c = a.promise({
                elem: e,
                props: fe.extend({}, t),
                opts: fe.extend(!0, {
                    specialEasing: {},
                    easing: fe.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Et || P(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var i = fe.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(i), i
                },
                stop: function(t) {
                    var n = 0,
                        i = t ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; i > n; n++) c.tweens[n].run(1);
                    return t ? (a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c, t])) : a.rejectWith(e, [c, t]), this
                }
            }),
            u = c.props;
        for (B(u, c.opts.specialEasing); s > r; r++)
            if (i = R.prefilters[r].call(c, e, u, c.opts)) return fe.isFunction(i.stop) && (fe._queueHooks(c.elem, c.opts.queue).stop = fe.proxy(i.stop, i)), i;
        return fe.map(u, W, c), fe.isFunction(c.opts.start) && c.opts.start.call(e, c), fe.fx.timer(fe.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function z(e) {
        return fe.attr(e, "class") || ""
    }

    function Q(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, o = 0,
                r = t.toLowerCase().match(Ae) || [];
            if (fe.isFunction(n))
                for (; i = r[o++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function U(e, t, n, i) {
        function o(a) {
            var l;
            return r[a] = !0, fe.each(e[a] || [], function(e, a) {
                var c = a(t, n, i);
                return "string" != typeof c || s || r[c] ? s ? !(l = c) : void 0 : (t.dataTypes.unshift(c), o(c), !1)
            }), l
        }
        var r = {},
            s = e === Zt;
        return o(t.dataTypes[0]) || !r["*"] && o("*")
    }

    function X(e, t) {
        var n, i, o = fe.ajaxSettings.flatOptions || {};
        for (i in t) void 0 !== t[i] && ((o[i] ? e : n || (n = {}))[i] = t[i]);
        return n && fe.extend(!0, e, n), e
    }

    function K(e, t, n) {
        for (var i, o, r, s, a = e.contents, l = e.dataTypes;
            "*" === l[0];) l.shift(), void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
        if (o)
            for (s in a)
                if (a[s] && a[s].test(o)) {
                    l.unshift(s);
                    break
                }
        if (l[0] in n) r = l[0];
        else {
            for (s in n) {
                if (!l[0] || e.converters[s + " " + l[0]]) {
                    r = s;
                    break
                }
                i || (i = s)
            }
            r = r || i
        }
        return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
    }

    function Y(e, t, n, i) {
        var o, r, s, a, l, c = {},
            u = e.dataTypes.slice();
        if (u[1])
            for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
        for (r = u.shift(); r;)
            if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift())
                if ("*" === r) r = l;
                else if ("*" !== l && l !== r) {
            if (s = c[l + " " + r] || c["* " + r], !s)
                for (o in c)
                    if (a = o.split(" "), a[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                        s === !0 ? s = c[o] : c[o] !== !0 && (r = a[0], u.unshift(a[1]));
                        break
                    }
            if (s !== !0)
                if (s && e["throws"]) t = s(t);
                else try {
                    t = s(t)
                } catch (d) {
                    return {
                        state: "parsererror",
                        error: s ? d : "No conversion from " + l + " to " + r
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function V(e) {
        return e.style && e.style.display || fe.css(e, "display")
    }

    function G(e) {
        if (!fe.contains(e.ownerDocument || ie, e)) return !0;
        for (; e && 1 === e.nodeType;) {
            if ("none" === V(e) || "hidden" === e.type) return !0;
            e = e.parentNode
        }
        return !1
    }

    function Z(e, t, n, i) {
        var o;
        if (fe.isArray(t)) fe.each(t, function(t, o) {
            n || on.test(e) ? i(e, o) : Z(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, n, i)
        });
        else if (n || "object" !== fe.type(t)) i(e, t);
        else
            for (o in t) Z(e + "[" + o + "]", t[o], n, i)
    }

    function J() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function ee() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function te(e) {
        return fe.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var ne = [],
        ie = e.document,
        oe = ne.slice,
        re = ne.concat,
        se = ne.push,
        ae = ne.indexOf,
        le = {},
        ce = le.toString,
        ue = le.hasOwnProperty,
        de = {},
        he = "1.12.4",
        fe = function(e, t) {
            return new fe.fn.init(e, t)
        },
        pe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        me = /^-ms-/,
        ge = /-([\da-z])/gi,
        ve = function(e, t) {
            return t.toUpperCase()
        };
    fe.fn = fe.prototype = {
        jquery: he,
        constructor: fe,
        selector: "",
        length: 0,
        toArray: function() {
            return oe.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : oe.call(this)
        },
        pushStack: function(e) {
            var t = fe.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e) {
            return fe.each(this, e)
        },
        map: function(e) {
            return this.pushStack(fe.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(oe.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: se,
        sort: ne.sort,
        splice: ne.splice
    }, fe.extend = fe.fn.extend = function() {
        var e, t, n, i, o, r, s = arguments[0] || {},
            a = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || fe.isFunction(s) || (s = {}), a === l && (s = this, a--); l > a; a++)
            if (null != (o = arguments[a]))
                for (i in o) e = s[i], n = o[i], s !== n && (c && n && (fe.isPlainObject(n) || (t = fe.isArray(n))) ? (t ? (t = !1, r = e && fe.isArray(e) ? e : []) : r = e && fe.isPlainObject(e) ? e : {}, s[i] = fe.extend(c, r, n)) : void 0 !== n && (s[i] = n));
        return s
    }, fe.extend({
        expando: "jQuery" + (he + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === fe.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === fe.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !fe.isArray(e) && t - parseFloat(t) + 1 >= 0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== fe.type(e) || e.nodeType || fe.isWindow(e)) return !1;
            try {
                if (e.constructor && !ue.call(e, "constructor") && !ue.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            if (!de.ownFirst)
                for (t in e) return ue.call(e, t);
            for (t in e);
            return void 0 === t || ue.call(e, t)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? le[ce.call(e)] || "object" : typeof e
        },
        globalEval: function(t) {
            t && fe.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(me, "ms-").replace(ge, ve)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var i, o = 0;
            if (n(e))
                for (i = e.length; i > o && t.call(e[o], o, e[o]) !== !1; o++);
            else
                for (o in e)
                    if (t.call(e[o], o, e[o]) === !1) break; return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(pe, "")
        },
        makeArray: function(e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? fe.merge(i, "string" == typeof e ? [e] : e) : se.call(i, e)), i
        },
        inArray: function(e, t, n) {
            var i;
            if (t) {
                if (ae) return ae.call(t, e, n);
                for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, o = e.length; n > i;) e[o++] = t[i++];
            if (n !== n)
                for (; void 0 !== t[i];) e[o++] = t[i++];
            return e.length = o, e
        },
        grep: function(e, t, n) {
            for (var i, o = [], r = 0, s = e.length, a = !n; s > r; r++) i = !t(e[r], r), i !== a && o.push(e[r]);
            return o
        },
        map: function(e, t, i) {
            var o, r, s = 0,
                a = [];
            if (n(e))
                for (o = e.length; o > s; s++) r = t(e[s], s, i), null != r && a.push(r);
            else
                for (s in e) r = t(e[s], s, i), null != r && a.push(r);
            return re.apply([], a)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, i, o;
            return "string" == typeof t && (o = e[t], t = e, e = o), fe.isFunction(e) ? (n = oe.call(arguments, 2), i = function() {
                return e.apply(t || this, n.concat(oe.call(arguments)))
            }, i.guid = e.guid = e.guid || fe.guid++, i) : void 0
        },
        now: function() {
            return +new Date
        },
        support: de
    }), "function" == typeof Symbol && (fe.fn[Symbol.iterator] = ne[Symbol.iterator]), fe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        le["[object " + t + "]"] = t.toLowerCase()
    });
    var ye = function(e) {
        function t(e, t, n, i) {
            var o, r, s, a, l, c, d, f, p = t && t.ownerDocument,
                m = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== m && 9 !== m && 11 !== m) return n;
            if (!i && ((t ? t.ownerDocument || t : W) !== I && N(t), t = t || I, j)) {
                if (11 !== m && (c = ve.exec(e)))
                    if (o = c[1]) {
                        if (9 === m) {
                            if (!(s = t.getElementById(o))) return n;
                            if (s.id === o) return n.push(s), n
                        } else if (p && (s = p.getElementById(o)) && P(t, s) && s.id === o) return n.push(s), n
                    } else {
                        if (c[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
                        if ((o = c[3]) && C.getElementsByClassName && t.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(o)), n
                    }
                if (C.qsa && !Q[e + " "] && (!H || !H.test(e))) {
                    if (1 !== m) p = t, f = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((a = t.getAttribute("id")) ? a = a.replace(be, "\\$&") : t.setAttribute("id", a = q), d = E(e), r = d.length, l = he.test(a) ? "#" + a : "[id='" + a + "']"; r--;) d[r] = l + " " + h(d[r]);
                        f = d.join(","), p = ye.test(e) && u(t.parentNode) || t
                    }
                    if (f) try {
                        return Z.apply(n, p.querySelectorAll(f)), n
                    } catch (g) {} finally {
                        a === q && t.removeAttribute("id")
                    }
                }
            }
            return S(e.replace(ae, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > _.cacheLength && delete e[t.shift()], e[n + " "] = i
            }
            var t = [];
            return e
        }

        function i(e) {
            return e[q] = !0, e
        }

        function o(e) {
            var t = I.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function r(e, t) {
            for (var n = e.split("|"), i = n.length; i--;) _.attrHandle[n[i]] = t
        }

        function s(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || X) - (~e.sourceIndex || X);
            if (i) return i;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function a(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function c(e) {
            return i(function(t) {
                return t = +t, i(function(n, i) {
                    for (var o, r = e([], n.length, t), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
                })
            })
        }

        function u(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function d() {}

        function h(e) {
            for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
            return i
        }

        function f(e, t, n) {
            var i = t.dir,
                o = n && "parentNode" === i,
                r = B++;
            return t.first ? function(t, n, r) {
                for (; t = t[i];)
                    if (1 === t.nodeType || o) return e(t, n, r)
            } : function(t, n, s) {
                var a, l, c, u = [F, r];
                if (s) {
                    for (; t = t[i];)
                        if ((1 === t.nodeType || o) && e(t, n, s)) return !0
                } else
                    for (; t = t[i];)
                        if (1 === t.nodeType || o) {
                            if (c = t[q] || (t[q] = {}), l = c[t.uniqueID] || (c[t.uniqueID] = {}), (a = l[i]) && a[0] === F && a[1] === r) return u[2] = a[2];
                            if (l[i] = u, u[2] = e(t, n, s)) return !0
                        }
            }
        }

        function p(e) {
            return e.length > 1 ? function(t, n, i) {
                for (var o = e.length; o--;)
                    if (!e[o](t, n, i)) return !1;
                return !0
            } : e[0]
        }

        function m(e, n, i) {
            for (var o = 0, r = n.length; r > o; o++) t(e, n[o], i);
            return i
        }

        function g(e, t, n, i, o) {
            for (var r, s = [], a = 0, l = e.length, c = null != t; l > a; a++)(r = e[a]) && (!n || n(r, i, o)) && (s.push(r), c && t.push(a));
            return s
        }

        function v(e, t, n, o, r, s) {
            return o && !o[q] && (o = v(o)), r && !r[q] && (r = v(r, s)), i(function(i, s, a, l) {
                var c, u, d, h = [],
                    f = [],
                    p = s.length,
                    v = i || m(t || "*", a.nodeType ? [a] : a, []),
                    y = !e || !i && t ? v : g(v, h, e, a, l),
                    b = n ? r || (i ? e : p || o) ? [] : s : y;
                if (n && n(y, b, a, l), o)
                    for (c = g(b, f), o(c, [], a, l), u = c.length; u--;)(d = c[u]) && (b[f[u]] = !(y[f[u]] = d));
                if (i) {
                    if (r || e) {
                        if (r) {
                            for (c = [], u = b.length; u--;)(d = b[u]) && c.push(y[u] = d);
                            r(null, b = [], c, l)
                        }
                        for (u = b.length; u--;)(d = b[u]) && (c = r ? ee(i, d) : h[u]) > -1 && (i[c] = !(s[c] = d))
                    }
                } else b = g(b === s ? b.splice(p, b.length) : b), r ? r(null, s, b, l) : Z.apply(s, b)
            })
        }

        function y(e) {
            for (var t, n, i, o = e.length, r = _.relative[e[0].type], s = r || _.relative[" "], a = r ? 1 : 0, l = f(function(e) {
                    return e === t
                }, s, !0), c = f(function(e) {
                    return ee(t, e) > -1
                }, s, !0), u = [function(e, n, i) {
                    var o = !r && (i || n !== k) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
                    return t = null, o
                }]; o > a; a++)
                if (n = _.relative[e[a].type]) u = [f(p(u), n)];
                else {
                    if (n = _.filter[e[a].type].apply(null, e[a].matches), n[q]) {
                        for (i = ++a; o > i && !_.relative[e[i].type]; i++);
                        return v(a > 1 && p(u), a > 1 && h(e.slice(0, a - 1).concat({
                            value: " " === e[a - 2].type ? "*" : ""
                        })).replace(ae, "$1"), n, i > a && y(e.slice(a, i)), o > i && y(e = e.slice(i)), o > i && h(e))
                    }
                    u.push(n)
                }
            return p(u)
        }

        function b(e, n) {
            var o = n.length > 0,
                r = e.length > 0,
                s = function(i, s, a, l, c) {
                    var u, d, h, f = 0,
                        p = "0",
                        m = i && [],
                        v = [],
                        y = k,
                        b = i || r && _.find.TAG("*", c),
                        w = F += null == y ? 1 : Math.random() || .1,
                        C = b.length;
                    for (c && (k = s === I || s || c); p !== C && null != (u = b[p]); p++) {
                        if (r && u) {
                            for (d = 0, s || u.ownerDocument === I || (N(u), a = !j); h = e[d++];)
                                if (h(u, s || I, a)) {
                                    l.push(u);
                                    break
                                }
                            c && (F = w)
                        }
                        o && ((u = !h && u) && f--, i && m.push(u))
                    }
                    if (f += p, o && p !== f) {
                        for (d = 0; h = n[d++];) h(m, v, s, a);
                        if (i) {
                            if (f > 0)
                                for (; p--;) m[p] || v[p] || (v[p] = V.call(l));
                            v = g(v)
                        }
                        Z.apply(l, v), c && !i && v.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                    }
                    return c && (F = w, k = y), m
                };
            return o ? i(s) : s
        }
        var w, C, _, x, $, E, T, S, k, A, D, N, I, O, j, H, L, M, P, q = "sizzle" + 1 * new Date,
            W = e.document,
            F = 0,
            B = 0,
            R = n(),
            z = n(),
            Q = n(),
            U = function(e, t) {
                return e === t && (D = !0), 0
            },
            X = 1 << 31,
            K = {}.hasOwnProperty,
            Y = [],
            V = Y.pop,
            G = Y.push,
            Z = Y.push,
            J = Y.slice,
            ee = function(e, t) {
                for (var n = 0, i = e.length; i > n; n++)
                    if (e[n] === t) return n;
                return -1
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
            re = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
            se = new RegExp(ne + "+", "g"),
            ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            le = new RegExp("^" + ne + "*," + ne + "*"),
            ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            ue = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            de = new RegExp(re),
            he = new RegExp("^" + ie + "$"),
            fe = {
                ID: new RegExp("^#(" + ie + ")"),
                CLASS: new RegExp("^\\.(" + ie + ")"),
                TAG: new RegExp("^(" + ie + "|[*])"),
                ATTR: new RegExp("^" + oe),
                PSEUDO: new RegExp("^" + re),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            pe = /^(?:input|select|textarea|button)$/i,
            me = /^h\d$/i,
            ge = /^[^{]+\{\s*\[native \w/,
            ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ye = /[+~]/,
            be = /'|\\/g,
            we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            Ce = function(e, t, n) {
                var i = "0x" + t - 65536;
                return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            },
            _e = function() {
                N()
            };
        try {
            Z.apply(Y = J.call(W.childNodes), W.childNodes), Y[W.childNodes.length].nodeType
        } catch (xe) {
            Z = {
                apply: Y.length ? function(e, t) {
                    G.apply(e, J.call(t))
                } : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        C = t.support = {}, $ = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, N = t.setDocument = function(e) {
            var t, n, i = e ? e.ownerDocument || e : W;
            return i !== I && 9 === i.nodeType && i.documentElement ? (I = i, O = I.documentElement, j = !$(I), (n = I.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", _e, !1) : n.attachEvent && n.attachEvent("onunload", _e)), C.attributes = o(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), C.getElementsByTagName = o(function(e) {
                return e.appendChild(I.createComment("")), !e.getElementsByTagName("*").length
            }), C.getElementsByClassName = ge.test(I.getElementsByClassName), C.getById = o(function(e) {
                return O.appendChild(e).id = q, !I.getElementsByName || !I.getElementsByName(q).length
            }), C.getById ? (_.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && j) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }, _.filter.ID = function(e) {
                var t = e.replace(we, Ce);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete _.find.ID, _.filter.ID = function(e) {
                var t = e.replace(we, Ce);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), _.find.TAG = C.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : C.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, i = [],
                    o = 0,
                    r = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                    return i
                }
                return r
            }, _.find.CLASS = C.getElementsByClassName && function(e, t) {
                return "undefined" != typeof t.getElementsByClassName && j ? t.getElementsByClassName(e) : void 0
            }, L = [], H = [], (C.qsa = ge.test(I.querySelectorAll)) && (o(function(e) {
                O.appendChild(e).innerHTML = "<a id='" + q + "'></a><select id='" + q + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && H.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || H.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + q + "-]").length || H.push("~="), e.querySelectorAll(":checked").length || H.push(":checked"), e.querySelectorAll("a#" + q + "+*").length || H.push(".#.+[+~]")
            }), o(function(e) {
                var t = I.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && H.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), H.push(",.*:")
            })), (C.matchesSelector = ge.test(M = O.matches || O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && o(function(e) {
                C.disconnectedMatch = M.call(e, "div"), M.call(e, "[s!='']:x"), L.push("!=", re)
            }), H = H.length && new RegExp(H.join("|")), L = L.length && new RegExp(L.join("|")), t = ge.test(O.compareDocumentPosition), P = t || ge.test(O.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, U = t ? function(e, t) {
                if (e === t) return D = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !C.sortDetached && t.compareDocumentPosition(e) === n ? e === I || e.ownerDocument === W && P(W, e) ? -1 : t === I || t.ownerDocument === W && P(W, t) ? 1 : A ? ee(A, e) - ee(A, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return D = !0, 0;
                var n, i = 0,
                    o = e.parentNode,
                    r = t.parentNode,
                    a = [e],
                    l = [t];
                if (!o || !r) return e === I ? -1 : t === I ? 1 : o ? -1 : r ? 1 : A ? ee(A, e) - ee(A, t) : 0;
                if (o === r) return s(e, t);
                for (n = e; n = n.parentNode;) a.unshift(n);
                for (n = t; n = n.parentNode;) l.unshift(n);
                for (; a[i] === l[i];) i++;
                return i ? s(a[i], l[i]) : a[i] === W ? -1 : l[i] === W ? 1 : 0
            }, I) : I
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== I && N(e), n = n.replace(ue, "='$1']"), C.matchesSelector && j && !Q[n + " "] && (!L || !L.test(n)) && (!H || !H.test(n))) try {
                var i = M.call(e, n);
                if (i || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
            } catch (o) {}
            return t(n, I, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== I && N(e), P(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== I && N(e);
            var n = _.attrHandle[t.toLowerCase()],
                i = n && K.call(_.attrHandle, t.toLowerCase()) ? n(e, t, !j) : void 0;
            return void 0 !== i ? i : C.attributes || !j ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                i = 0,
                o = 0;
            if (D = !C.detectDuplicates, A = !C.sortStable && e.slice(0), e.sort(U), D) {
                for (; t = e[o++];) t === e[o] && (i = n.push(o));
                for (; i--;) e.splice(n[i], 1)
            }
            return A = null, e
        }, x = t.getText = function(e) {
            var t, n = "",
                i = 0,
                o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += x(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else
                for (; t = e[i++];) n += x(t);
            return n
        }, _ = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(we, Ce), e[3] = (e[3] || e[4] || e[5] || "").replace(we, Ce), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(we, Ce).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = R[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && R(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, i) {
                    return function(o) {
                        var r = t.attr(o, e);
                        return null == r ? "!=" === n : n ? (r += "", "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r.replace(se, " ") + " ").indexOf(i) > -1 : "|=" === n ? r === i || r.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, i, o) {
                    var r = "nth" !== e.slice(0, 3),
                        s = "last" !== e.slice(-4),
                        a = "of-type" === t;
                    return 1 === i && 0 === o ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, l) {
                        var c, u, d, h, f, p, m = r !== s ? "nextSibling" : "previousSibling",
                            g = t.parentNode,
                            v = a && t.nodeName.toLowerCase(),
                            y = !l && !a,
                            b = !1;
                        if (g) {
                            if (r) {
                                for (; m;) {
                                    for (h = t; h = h[m];)
                                        if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                                    p = m = "only" === e && !p && "nextSibling"
                                }
                                return !0
                            }
                            if (p = [s ? g.firstChild : g.lastChild], s && y) {
                                for (h = g, d = h[q] || (h[q] = {}), u = d[h.uniqueID] || (d[h.uniqueID] = {}), c = u[e] || [], f = c[0] === F && c[1], b = f && c[2], h = f && g.childNodes[f]; h = ++f && h && h[m] || (b = f = 0) || p.pop();)
                                    if (1 === h.nodeType && ++b && h === t) {
                                        u[e] = [F, f, b];
                                        break
                                    }
                            } else if (y && (h = t, d = h[q] || (h[q] = {}), u = d[h.uniqueID] || (d[h.uniqueID] = {}), c = u[e] || [], f = c[0] === F && c[1], b = f), b === !1)
                                for (;
                                    (h = ++f && h && h[m] || (b = f = 0) || p.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++b || (y && (d = h[q] || (h[q] = {}), u = d[h.uniqueID] || (d[h.uniqueID] = {}), u[e] = [F, b]), h !== t)););
                            return b -= o, b === i || b % i === 0 && b / i >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var o, r = _.pseudos[e] || _.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return r[q] ? r(n) : r.length > 1 ? (o = [e, e, "", n], _.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                        for (var i, o = r(e, n), s = o.length; s--;) i = ee(e, o[s]), e[i] = !(t[i] = o[s])
                    }) : function(e) {
                        return r(e, 0, o)
                    }) : r
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = [],
                        n = [],
                        o = T(e.replace(ae, "$1"));
                    return o[q] ? i(function(e, t, n, i) {
                        for (var r, s = o(e, null, i, []), a = e.length; a--;)(r = s[a]) && (e[a] = !(t[a] = r))
                    }) : function(e, i, r) {
                        return t[0] = e, o(t, null, r, n), t[0] = null, !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: i(function(e) {
                    return e = e.replace(we, Ce),
                        function(t) {
                            return (t.textContent || t.innerText || x(t)).indexOf(e) > -1
                        }
                }),
                lang: i(function(e) {
                    return he.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, Ce).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = j ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === O
                },
                focus: function(e) {
                    return e === I.activeElement && (!I.hasFocus || I.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !_.pseudos.empty(e)
                },
                header: function(e) {
                    return me.test(e.nodeName)
                },
                input: function(e) {
                    return pe.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(e, t) {
                    return [t - 1]
                }),
                eq: c(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: c(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: c(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: c(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
                    return e
                }),
                gt: c(function(e, t, n) {
                    for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
                    return e
                })
            }
        }, _.pseudos.nth = _.pseudos.eq;
        for (w in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) _.pseudos[w] = a(w);
        for (w in {
                submit: !0,
                reset: !0
            }) _.pseudos[w] = l(w);
        return d.prototype = _.filters = _.pseudos, _.setFilters = new d, E = t.tokenize = function(e, n) {
            var i, o, r, s, a, l, c, u = z[e + " "];
            if (u) return n ? 0 : u.slice(0);
            for (a = e, l = [], c = _.preFilter; a;) {
                (!i || (o = le.exec(a))) && (o && (a = a.slice(o[0].length) || a), l.push(r = [])), i = !1, (o = ce.exec(a)) && (i = o.shift(), r.push({
                    value: i,
                    type: o[0].replace(ae, " ")
                }), a = a.slice(i.length));
                for (s in _.filter) !(o = fe[s].exec(a)) || c[s] && !(o = c[s](o)) || (i = o.shift(), r.push({
                    value: i,
                    type: s,
                    matches: o
                }), a = a.slice(i.length));
                if (!i) break
            }
            return n ? a.length : a ? t.error(e) : z(e, l).slice(0)
        }, T = t.compile = function(e, t) {
            var n, i = [],
                o = [],
                r = Q[e + " "];
            if (!r) {
                for (t || (t = E(e)), n = t.length; n--;) r = y(t[n]), r[q] ? i.push(r) : o.push(r);
                r = Q(e, b(o, i)), r.selector = e
            }
            return r
        }, S = t.select = function(e, t, n, i) {
            var o, r, s, a, l, c = "function" == typeof e && e,
                d = !i && E(e = c.selector || e);
            if (n = n || [], 1 === d.length) {
                if (r = d[0] = d[0].slice(0), r.length > 2 && "ID" === (s = r[0]).type && C.getById && 9 === t.nodeType && j && _.relative[r[1].type]) {
                    if (t = (_.find.ID(s.matches[0].replace(we, Ce), t) || [])[0], !t) return n;
                    c && (t = t.parentNode), e = e.slice(r.shift().value.length)
                }
                for (o = fe.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !_.relative[a = s.type]);)
                    if ((l = _.find[a]) && (i = l(s.matches[0].replace(we, Ce), ye.test(r[0].type) && u(t.parentNode) || t))) {
                        if (r.splice(o, 1), e = i.length && h(r), !e) return Z.apply(n, i), n;
                        break
                    }
            }
            return (c || T(e, d))(i, t, !j, n, !t || ye.test(e) && u(t.parentNode) || t), n
        }, C.sortStable = q.split("").sort(U).join("") === q, C.detectDuplicates = !!D, N(), C.sortDetached = o(function(e) {
            return 1 & e.compareDocumentPosition(I.createElement("div"))
        }), o(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || r("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), C.attributes && o(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || r("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), o(function(e) {
            return null == e.getAttribute("disabled")
        }) || r(te, function(e, t, n) {
            var i;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), t
    }(e);
    fe.find = ye, fe.expr = ye.selectors, fe.expr[":"] = fe.expr.pseudos, fe.uniqueSort = fe.unique = ye.uniqueSort, fe.text = ye.getText, fe.isXMLDoc = ye.isXML, fe.contains = ye.contains;
    var be = function(e, t, n) {
            for (var i = [], o = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (o && fe(e).is(n)) break;
                    i.push(e)
                }
            return i
        },
        we = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        Ce = fe.expr.match.needsContext,
        _e = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        xe = /^.[^:#\[\.,]*$/;
    fe.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? fe.find.matchesSelector(i, e) ? [i] : [] : fe.find.matches(e, fe.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, fe.fn.extend({
        find: function(e) {
            var t, n = [],
                i = this,
                o = i.length;
            if ("string" != typeof e) return this.pushStack(fe(e).filter(function() {
                for (t = 0; o > t; t++)
                    if (fe.contains(i[t], this)) return !0
            }));
            for (t = 0; o > t; t++) fe.find(e, i[t], n);
            return n = this.pushStack(o > 1 ? fe.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        filter: function(e) {
            return this.pushStack(i(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(i(this, e || [], !0))
        },
        is: function(e) {
            return !!i(this, "string" == typeof e && Ce.test(e) ? fe(e) : e || [], !1).length
        }
    });
    var $e, Ee = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        Te = fe.fn.init = function(e, t, n) {
            var i, o;
            if (!e) return this;
            if (n = n || $e, "string" == typeof e) {
                if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : Ee.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (i[1]) {
                    if (t = t instanceof fe ? t[0] : t, fe.merge(this, fe.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : ie, !0)), _e.test(i[1]) && fe.isPlainObject(t))
                        for (i in t) fe.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                    return this
                }
                if (o = ie.getElementById(i[2]), o && o.parentNode) {
                    if (o.id !== i[2]) return $e.find(e);
                    this.length = 1, this[0] = o
                }
                return this.context = ie, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : fe.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(fe) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), fe.makeArray(e, this))
        };
    Te.prototype = fe.fn, $e = fe(ie);
    var Se = /^(?:parents|prev(?:Until|All))/,
        ke = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    fe.fn.extend({
        has: function(e) {
            var t, n = fe(e, this),
                i = n.length;
            return this.filter(function() {
                for (t = 0; i > t; t++)
                    if (fe.contains(this, n[t])) return !0
            })
        },
        closest: function(e, t) {
            for (var n, i = 0, o = this.length, r = [], s = Ce.test(e) || "string" != typeof e ? fe(e, t || this.context) : 0; o > i; i++)
                for (n = this[i]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && fe.find.matchesSelector(n, e))) {
                        r.push(n);
                        break
                    }
            return this.pushStack(r.length > 1 ? fe.uniqueSort(r) : r)
        },
        index: function(e) {
            return e ? "string" == typeof e ? fe.inArray(this[0], fe(e)) : fe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(fe.uniqueSort(fe.merge(this.get(), fe(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), fe.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return be(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return be(e, "parentNode", n)
        },
        next: function(e) {
            return o(e, "nextSibling")
        },
        prev: function(e) {
            return o(e, "previousSibling")
        },
        nextAll: function(e) {
            return be(e, "nextSibling")
        },
        prevAll: function(e) {
            return be(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return be(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return be(e, "previousSibling", n)
        },
        siblings: function(e) {
            return we((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return we(e.firstChild)
        },
        contents: function(e) {
            return fe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : fe.merge([], e.childNodes)
        }
    }, function(e, t) {
        fe.fn[e] = function(n, i) {
            var o = fe.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = fe.filter(i, o)), this.length > 1 && (ke[e] || (o = fe.uniqueSort(o)), Se.test(e) && (o = o.reverse())), this.pushStack(o)
        }
    });
    var Ae = /\S+/g;
    fe.Callbacks = function(e) {
        e = "string" == typeof e ? r(e) : fe.extend({}, e);
        var t, n, i, o, s = [],
            a = [],
            l = -1,
            c = function() {
                for (o = e.once, i = t = !0; a.length; l = -1)
                    for (n = a.shift(); ++l < s.length;) s[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = s.length, n = !1);
                e.memory || (n = !1), t = !1, o && (s = n ? [] : "")
            },
            u = {
                add: function() {
                    return s && (n && !t && (l = s.length - 1, a.push(n)), function i(t) {
                        fe.each(t, function(t, n) {
                            fe.isFunction(n) ? e.unique && u.has(n) || s.push(n) : n && n.length && "string" !== fe.type(n) && i(n)
                        })
                    }(arguments), n && !t && c()), this
                },
                remove: function() {
                    return fe.each(arguments, function(e, t) {
                        for (var n;
                            (n = fe.inArray(t, s, n)) > -1;) s.splice(n, 1), l >= n && l--
                    }), this
                },
                has: function(e) {
                    return e ? fe.inArray(e, s) > -1 : s.length > 0
                },
                empty: function() {
                    return s && (s = []), this
                },
                disable: function() {
                    return o = a = [], s = n = "", this
                },
                disabled: function() {
                    return !s
                },
                lock: function() {
                    return o = !0, n || u.disable(), this
                },
                locked: function() {
                    return !!o
                },
                fireWith: function(e, n) {
                    return o || (n = n || [], n = [e, n.slice ? n.slice() : n], a.push(n), t || c()), this
                },
                fire: function() {
                    return u.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!i
                }
            };
        return u
    }, fe.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", fe.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", fe.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", fe.Callbacks("memory")]
                ],
                n = "pending",
                i = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return fe.Deferred(function(n) {
                            fe.each(t, function(t, r) {
                                var s = fe.isFunction(e[t]) && e[t];
                                o[r[1]](function() {
                                    var e = s && s.apply(this, arguments);
                                    e && fe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this === i ? n.promise() : this, s ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? fe.extend(e, i) : i
                    }
                },
                o = {};
            return i.pipe = i.then, fe.each(t, function(e, r) {
                var s = r[2],
                    a = r[3];
                i[r[1]] = s.add, a && s.add(function() {
                    n = a
                }, t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function() {
                    return o[r[0] + "With"](this === o ? i : this, arguments), this
                }, o[r[0] + "With"] = s.fireWith
            }), i.promise(o), e && e.call(o, o), o
        },
        when: function(e) {
            var t, n, i, o = 0,
                r = oe.call(arguments),
                s = r.length,
                a = 1 !== s || e && fe.isFunction(e.promise) ? s : 0,
                l = 1 === a ? e : fe.Deferred(),
                c = function(e, n, i) {
                    return function(o) {
                        n[e] = this, i[e] = arguments.length > 1 ? oe.call(arguments) : o, i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                    }
                };
            if (s > 1)
                for (t = new Array(s), n = new Array(s), i = new Array(s); s > o; o++) r[o] && fe.isFunction(r[o].promise) ? r[o].promise().progress(c(o, n, t)).done(c(o, i, r)).fail(l.reject) : --a;
            return a || l.resolveWith(i, r), l.promise()
        }
    });
    var De;
    fe.fn.ready = function(e) {
        return fe.ready.promise().done(e), this
    }, fe.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? fe.readyWait++ : fe.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --fe.readyWait : fe.isReady) || (fe.isReady = !0, e !== !0 && --fe.readyWait > 0 || (De.resolveWith(ie, [fe]), fe.fn.triggerHandler && (fe(ie).triggerHandler("ready"), fe(ie).off("ready"))))
        }
    }), fe.ready.promise = function(t) {
        if (!De)
            if (De = fe.Deferred(), "complete" === ie.readyState || "loading" !== ie.readyState && !ie.documentElement.doScroll) e.setTimeout(fe.ready);
            else if (ie.addEventListener) ie.addEventListener("DOMContentLoaded", a), e.addEventListener("load", a);
        else {
            ie.attachEvent("onreadystatechange", a), e.attachEvent("onload", a);
            var n = !1;
            try {
                n = null == e.frameElement && ie.documentElement
            } catch (i) {}
            n && n.doScroll && ! function o() {
                if (!fe.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (t) {
                        return e.setTimeout(o, 50)
                    }
                    s(), fe.ready()
                }
            }()
        }
        return De.promise(t)
    }, fe.ready.promise();
    var Ne;
    for (Ne in fe(de)) break;
    de.ownFirst = "0" === Ne, de.inlineBlockNeedsLayout = !1, fe(function() {
            var e, t, n, i;
            n = ie.getElementsByTagName("body")[0], n && n.style && (t = ie.createElement("div"), i = ie.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", de.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
        }),
        function() {
            var e = ie.createElement("div");
            de.deleteExpando = !0;
            try {
                delete e.test
            } catch (t) {
                de.deleteExpando = !1
            }
            e = null
        }();
    var Ie = function(e) {
            var t = fe.noData[(e.nodeName + " ").toLowerCase()],
                n = +e.nodeType || 1;
            return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
        },
        Oe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        je = /([A-Z])/g;
    fe.extend({
            cache: {},
            noData: {
                "applet ": !0,
                "embed ": !0,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(e) {
                return e = e.nodeType ? fe.cache[e[fe.expando]] : e[fe.expando], !!e && !c(e)
            },
            data: function(e, t, n) {
                return u(e, t, n)
            },
            removeData: function(e, t) {
                return d(e, t)
            },
            _data: function(e, t, n) {
                return u(e, t, n, !0)
            },
            _removeData: function(e, t) {
                return d(e, t, !0)
            }
        }), fe.fn.extend({
            data: function(e, t) {
                var n, i, o, r = this[0],
                    s = r && r.attributes;
                if (void 0 === e) {
                    if (this.length && (o = fe.data(r), 1 === r.nodeType && !fe._data(r, "parsedAttrs"))) {
                        for (n = s.length; n--;) s[n] && (i = s[n].name, 0 === i.indexOf("data-") && (i = fe.camelCase(i.slice(5)), l(r, i, o[i])));
                        fe._data(r, "parsedAttrs", !0)
                    }
                    return o
                }
                return "object" == typeof e ? this.each(function() {
                    fe.data(this, e)
                }) : arguments.length > 1 ? this.each(function() {
                    fe.data(this, e, t)
                }) : r ? l(r, e, fe.data(r, e)) : void 0
            },
            removeData: function(e) {
                return this.each(function() {
                    fe.removeData(this, e)
                })
            }
        }), fe.extend({
            queue: function(e, t, n) {
                var i;
                return e ? (t = (t || "fx") + "queue", i = fe._data(e, t), n && (!i || fe.isArray(n) ? i = fe._data(e, t, fe.makeArray(n)) : i.push(n)), i || []) : void 0
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = fe.queue(e, t),
                    i = n.length,
                    o = n.shift(),
                    r = fe._queueHooks(e, t),
                    s = function() {
                        fe.dequeue(e, t)
                    };
                "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, s, r)), !i && r && r.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return fe._data(e, n) || fe._data(e, n, {
                    empty: fe.Callbacks("once memory").add(function() {
                        fe._removeData(e, t + "queue"), fe._removeData(e, n)
                    })
                })
            }
        }), fe.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? fe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var n = fe.queue(this, e, t);
                    fe._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && fe.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    fe.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, i = 1,
                    o = fe.Deferred(),
                    r = this,
                    s = this.length,
                    a = function() {
                        --i || o.resolveWith(r, [r])
                    };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;) n = fe._data(r[s], e + "queueHooks"), n && n.empty && (i++, n.empty.add(a));
                return a(), o.promise(t)
            }
        }),
        function() {
            var e;
            de.shrinkWrapBlocks = function() {
                if (null != e) return e;
                e = !1;
                var t, n, i;
                return n = ie.getElementsByTagName("body")[0], n && n.style ? (t = ie.createElement("div"), i = ie.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(ie.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0
            }
        }();
    var He = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Le = new RegExp("^(?:([+-])=|)(" + He + ")([a-z%]*)$", "i"),
        Me = ["Top", "Right", "Bottom", "Left"],
        Pe = function(e, t) {
            return e = t || e, "none" === fe.css(e, "display") || !fe.contains(e.ownerDocument, e)
        },
        qe = function(e, t, n, i, o, r, s) {
            var a = 0,
                l = e.length,
                c = null == n;
            if ("object" === fe.type(n)) {
                o = !0;
                for (a in n) qe(e, t, a, n[a], !0, r, s)
            } else if (void 0 !== i && (o = !0, fe.isFunction(i) || (s = !0), c && (s ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
                    return c.call(fe(e), n)
                })), t))
                for (; l > a; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
            return o ? e : c ? t.call(e) : l ? t(e[0], n) : r
        },
        We = /^(?:checkbox|radio)$/i,
        Fe = /<([\w:-]+)/,
        Be = /^$|\/(?:java|ecma)script/i,
        Re = /^\s+/,
        ze = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    ! function() {
        var e = ie.createElement("div"),
            t = ie.createDocumentFragment(),
            n = ie.createElement("input");
        e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", de.leadingWhitespace = 3 === e.firstChild.nodeType, de.tbody = !e.getElementsByTagName("tbody").length, de.htmlSerialize = !!e.getElementsByTagName("link").length, de.html5Clone = "<:nav></:nav>" !== ie.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, t.appendChild(n), de.appendChecked = n.checked, e.innerHTML = "<textarea>x</textarea>", de.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue,
            t.appendChild(e), n = ie.createElement("input"), n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), de.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, de.noCloneEvent = !!e.addEventListener, e[fe.expando] = 1, de.attributes = !e.getAttribute(fe.expando)
    }();
    var Qe = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: de.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    Qe.optgroup = Qe.option, Qe.tbody = Qe.tfoot = Qe.colgroup = Qe.caption = Qe.thead, Qe.th = Qe.td;
    var Ue = /<|&#?\w+;/,
        Xe = /<tbody/i;
    ! function() {
        var t, n, i = ie.createElement("div");
        for (t in {
                submit: !0,
                change: !0,
                focusin: !0
            }) n = "on" + t, (de[t] = n in e) || (i.setAttribute(n, "t"), de[t] = i.attributes[n].expando === !1);
        i = null
    }();
    var Ke = /^(?:input|select|textarea)$/i,
        Ye = /^key/,
        Ve = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Ge = /^(?:focusinfocus|focusoutblur)$/,
        Ze = /^([^.]*)(?:\.(.+)|)/;
    fe.event = {
        global: {},
        add: function(e, t, n, i, o) {
            var r, s, a, l, c, u, d, h, f, p, m, g = fe._data(e);
            if (g) {
                for (n.handler && (l = n, n = l.handler, o = l.selector), n.guid || (n.guid = fe.guid++), (s = g.events) || (s = g.events = {}), (u = g.handle) || (u = g.handle = function(e) {
                        return "undefined" == typeof fe || e && fe.event.triggered === e.type ? void 0 : fe.event.dispatch.apply(u.elem, arguments)
                    }, u.elem = e), t = (t || "").match(Ae) || [""], a = t.length; a--;) r = Ze.exec(t[a]) || [], f = m = r[1], p = (r[2] || "").split(".").sort(), f && (c = fe.event.special[f] || {}, f = (o ? c.delegateType : c.bindType) || f, c = fe.event.special[f] || {}, d = fe.extend({
                    type: f,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && fe.expr.match.needsContext.test(o),
                    namespace: p.join(".")
                }, l), (h = s[f]) || (h = s[f] = [], h.delegateCount = 0, c.setup && c.setup.call(e, i, p, u) !== !1 || (e.addEventListener ? e.addEventListener(f, u, !1) : e.attachEvent && e.attachEvent("on" + f, u))), c.add && (c.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, d) : h.push(d), fe.event.global[f] = !0);
                e = null
            }
        },
        remove: function(e, t, n, i, o) {
            var r, s, a, l, c, u, d, h, f, p, m, g = fe.hasData(e) && fe._data(e);
            if (g && (u = g.events)) {
                for (t = (t || "").match(Ae) || [""], c = t.length; c--;)
                    if (a = Ze.exec(t[c]) || [], f = m = a[1], p = (a[2] || "").split(".").sort(), f) {
                        for (d = fe.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, h = u[f] || [], a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = h.length; r--;) s = h[r], !o && m !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (h.splice(r, 1), s.selector && h.delegateCount--, d.remove && d.remove.call(e, s));
                        l && !h.length && (d.teardown && d.teardown.call(e, p, g.handle) !== !1 || fe.removeEvent(e, f, g.handle), delete u[f])
                    } else
                        for (f in u) fe.event.remove(e, f + t[c], n, i, !0);
                fe.isEmptyObject(u) && (delete g.handle, fe._removeData(e, "events"))
            }
        },
        trigger: function(t, n, i, o) {
            var r, s, a, l, c, u, d, h = [i || ie],
                f = ue.call(t, "type") ? t.type : t,
                p = ue.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = u = i = i || ie, 3 !== i.nodeType && 8 !== i.nodeType && !Ge.test(f + fe.event.triggered) && (f.indexOf(".") > -1 && (p = f.split("."), f = p.shift(), p.sort()), s = f.indexOf(":") < 0 && "on" + f, t = t[fe.expando] ? t : new fe.Event(f, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = p.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : fe.makeArray(n, [t]), c = fe.event.special[f] || {}, o || !c.trigger || c.trigger.apply(i, n) !== !1)) {
                if (!o && !c.noBubble && !fe.isWindow(i)) {
                    for (l = c.delegateType || f, Ge.test(l + f) || (a = a.parentNode); a; a = a.parentNode) h.push(a), u = a;
                    u === (i.ownerDocument || ie) && h.push(u.defaultView || u.parentWindow || e)
                }
                for (d = 0;
                    (a = h[d++]) && !t.isPropagationStopped();) t.type = d > 1 ? l : c.bindType || f, r = (fe._data(a, "events") || {})[t.type] && fe._data(a, "handle"), r && r.apply(a, n), r = s && a[s], r && r.apply && Ie(a) && (t.result = r.apply(a, n), t.result === !1 && t.preventDefault());
                if (t.type = f, !o && !t.isDefaultPrevented() && (!c._default || c._default.apply(h.pop(), n) === !1) && Ie(i) && s && i[f] && !fe.isWindow(i)) {
                    u = i[s], u && (i[s] = null), fe.event.triggered = f;
                    try {
                        i[f]()
                    } catch (m) {}
                    fe.event.triggered = void 0, u && (i[s] = u)
                }
                return t.result
            }
        },
        dispatch: function(e) {
            e = fe.event.fix(e);
            var t, n, i, o, r, s = [],
                a = oe.call(arguments),
                l = (fe._data(this, "events") || {})[e.type] || [],
                c = fe.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                for (s = fe.event.handlers.call(this, e, l), t = 0;
                    (o = s[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = o.elem, n = 0;
                        (r = o.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.rnamespace || e.rnamespace.test(r.namespace)) && (e.handleObj = r, e.data = r.data, i = ((fe.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, a), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, i, o, r, s = [],
                a = t.delegateCount,
                l = e.target;
            if (a && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                        for (i = [], n = 0; a > n; n++) r = t[n], o = r.selector + " ", void 0 === i[o] && (i[o] = r.needsContext ? fe(o, this).index(l) > -1 : fe.find(o, this, null, [l]).length), i[o] && i.push(r);
                        i.length && s.push({
                            elem: l,
                            handlers: i
                        })
                    }
            return a < t.length && s.push({
                elem: this,
                handlers: t.slice(a)
            }), s
        },
        fix: function(e) {
            if (e[fe.expando]) return e;
            var t, n, i, o = e.type,
                r = e,
                s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = Ve.test(o) ? this.mouseHooks : Ye.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new fe.Event(r), t = i.length; t--;) n = i[t], e[n] = r[n];
            return e.target || (e.target = r.srcElement || ie), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, i, o, r = t.button,
                    s = t.fromElement;
                return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || ie, o = i.documentElement, n = i.body, e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement : s), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== w() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === w() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return fe.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return fe.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n) {
            var i = fe.extend(new fe.Event, n, {
                type: e,
                isSimulated: !0
            });
            fe.event.trigger(i, null, t), i.isDefaultPrevented() && n.preventDefault()
        }
    }, fe.removeEvent = ie.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    } : function(e, t, n) {
        var i = "on" + t;
        e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null), e.detachEvent(i, n))
    }, fe.Event = function(e, t) {
        return this instanceof fe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? y : b) : this.type = e, t && fe.extend(this, t), this.timeStamp = e && e.timeStamp || fe.now(), void(this[fe.expando] = !0)) : new fe.Event(e, t)
    }, fe.Event.prototype = {
        constructor: fe.Event,
        isDefaultPrevented: b,
        isPropagationStopped: b,
        isImmediatePropagationStopped: b,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = y, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = y, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = y, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, fe.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        fe.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this,
                    o = e.relatedTarget,
                    r = e.handleObj;
                return (!o || o !== i && !fe.contains(i, o)) && (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), de.submit || (fe.event.special.submit = {
        setup: function() {
            return fe.nodeName(this, "form") ? !1 : void fe.event.add(this, "click._submit keypress._submit", function(e) {
                var t = e.target,
                    n = fe.nodeName(t, "input") || fe.nodeName(t, "button") ? fe.prop(t, "form") : void 0;
                n && !fe._data(n, "submit") && (fe.event.add(n, "submit._submit", function(e) {
                    e._submitBubble = !0
                }), fe._data(n, "submit", !0))
            })
        },
        postDispatch: function(e) {
            e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && fe.event.simulate("submit", this.parentNode, e))
        },
        teardown: function() {
            return fe.nodeName(this, "form") ? !1 : void fe.event.remove(this, "._submit")
        }
    }), de.change || (fe.event.special.change = {
        setup: function() {
            return Ke.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (fe.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
            }), fe.event.add(this, "click._change", function(e) {
                this._justChanged && !e.isTrigger && (this._justChanged = !1), fe.event.simulate("change", this, e)
            })), !1) : void fe.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Ke.test(t.nodeName) && !fe._data(t, "change") && (fe.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || fe.event.simulate("change", this.parentNode, e)
                }), fe._data(t, "change", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return fe.event.remove(this, "._change"), !Ke.test(this.nodeName)
        }
    }), de.focusin || fe.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            fe.event.simulate(t, e.target, fe.event.fix(e))
        };
        fe.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this,
                    o = fe._data(i, t);
                o || i.addEventListener(e, n, !0), fe._data(i, t, (o || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                    o = fe._data(i, t) - 1;
                o ? fe._data(i, t, o) : (i.removeEventListener(e, n, !0), fe._removeData(i, t))
            }
        }
    }), fe.fn.extend({
        on: function(e, t, n, i) {
            return C(this, e, t, n, i)
        },
        one: function(e, t, n, i) {
            return C(this, e, t, n, i, 1)
        },
        off: function(e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, fe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, t, e[o]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = b), this.each(function() {
                fe.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                fe.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? fe.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Je = / jQuery\d+="(?:null|\d+)"/g,
        et = new RegExp("<(?:" + ze + ")[\\s/>]", "i"),
        tt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        nt = /<script|<style|<link/i,
        it = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ot = /^true\/(.*)/,
        rt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        st = f(ie),
        at = st.appendChild(ie.createElement("div"));
    fe.extend({
        htmlPrefilter: function(e) {
            return e.replace(tt, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var i, o, r, s, a, l = fe.contains(e.ownerDocument, e);
            if (de.html5Clone || fe.isXMLDoc(e) || !et.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (at.innerHTML = e.outerHTML, at.removeChild(r = at.firstChild)), !(de.noCloneEvent && de.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || fe.isXMLDoc(e)))
                for (i = p(r), a = p(e), s = 0; null != (o = a[s]); ++s) i[s] && T(o, i[s]);
            if (t)
                if (n)
                    for (a = a || p(e), i = i || p(r), s = 0; null != (o = a[s]); s++) E(o, i[s]);
                else E(e, r);
            return i = p(r, "script"), i.length > 0 && m(i, !l && p(e, "script")), i = a = o = null, r
        },
        cleanData: function(e, t) {
            for (var n, i, o, r, s = 0, a = fe.expando, l = fe.cache, c = de.attributes, u = fe.event.special; null != (n = e[s]); s++)
                if ((t || Ie(n)) && (o = n[a], r = o && l[o])) {
                    if (r.events)
                        for (i in r.events) u[i] ? fe.event.remove(n, i) : fe.removeEvent(n, i, r.handle);
                    l[o] && (delete l[o], c || "undefined" == typeof n.removeAttribute ? n[a] = void 0 : n.removeAttribute(a), ne.push(o))
                }
        }
    }), fe.fn.extend({
        domManip: S,
        detach: function(e) {
            return k(this, e, !0)
        },
        remove: function(e) {
            return k(this, e)
        },
        text: function(e) {
            return qe(this, function(e) {
                return void 0 === e ? fe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ie).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return S(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = _(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return S(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = _(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return S(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return S(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && fe.cleanData(p(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && fe.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return fe.clone(this, e, t)
            })
        },
        html: function(e) {
            return qe(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    i = this.length;
                if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Je, "") : void 0;
                if ("string" == typeof e && !nt.test(e) && (de.htmlSerialize || !et.test(e)) && (de.leadingWhitespace || !Re.test(e)) && !Qe[(Fe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = fe.htmlPrefilter(e);
                    try {
                        for (; i > n; n++) t = this[n] || {}, 1 === t.nodeType && (fe.cleanData(p(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (o) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return S(this, arguments, function(t) {
                var n = this.parentNode;
                fe.inArray(this, e) < 0 && (fe.cleanData(p(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), fe.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        fe.fn[e] = function(e) {
            for (var n, i = 0, o = [], r = fe(e), s = r.length - 1; s >= i; i++) n = i === s ? this : this.clone(!0), fe(r[i])[t](n), se.apply(o, n.get());
            return this.pushStack(o)
        }
    });
    var lt, ct = {
            HTML: "block",
            BODY: "block"
        },
        ut = /^margin/,
        dt = new RegExp("^(" + He + ")(?!px)[a-z%]+$", "i"),
        ht = function(e, t, n, i) {
            var o, r, s = {};
            for (r in t) s[r] = e.style[r], e.style[r] = t[r];
            o = n.apply(e, i || []);
            for (r in t) e.style[r] = s[r];
            return o
        },
        ft = ie.documentElement;
    ! function() {
        function t() {
            var t, u, d = ie.documentElement;
            d.appendChild(l), c.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", n = o = a = !1, i = s = !0, e.getComputedStyle && (u = e.getComputedStyle(c), n = "1%" !== (u || {}).top, a = "2px" === (u || {}).marginLeft, o = "4px" === (u || {
                width: "4px"
            }).width, c.style.marginRight = "50%", i = "4px" === (u || {
                marginRight: "4px"
            }).marginRight, t = c.appendChild(ie.createElement("div")), t.style.cssText = c.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", c.style.width = "1px", s = !parseFloat((e.getComputedStyle(t) || {}).marginRight), c.removeChild(t)), c.style.display = "none", r = 0 === c.getClientRects().length, r && (c.style.display = "", c.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", c.childNodes[0].style.borderCollapse = "separate", t = c.getElementsByTagName("td"), t[0].style.cssText = "margin:0;border:0;padding:0;display:none", r = 0 === t[0].offsetHeight, r && (t[0].style.display = "", t[1].style.display = "none", r = 0 === t[0].offsetHeight)), d.removeChild(l)
        }
        var n, i, o, r, s, a, l = ie.createElement("div"),
            c = ie.createElement("div");
        c.style && (c.style.cssText = "float:left;opacity:.5", de.opacity = "0.5" === c.style.opacity, de.cssFloat = !!c.style.cssFloat, c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", de.clearCloneStyle = "content-box" === c.style.backgroundClip, l = ie.createElement("div"), l.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", c.innerHTML = "", l.appendChild(c), de.boxSizing = "" === c.style.boxSizing || "" === c.style.MozBoxSizing || "" === c.style.WebkitBoxSizing, fe.extend(de, {
            reliableHiddenOffsets: function() {
                return null == n && t(), r
            },
            boxSizingReliable: function() {
                return null == n && t(), o
            },
            pixelMarginRight: function() {
                return null == n && t(), i
            },
            pixelPosition: function() {
                return null == n && t(), n
            },
            reliableMarginRight: function() {
                return null == n && t(), s
            },
            reliableMarginLeft: function() {
                return null == n && t(), a
            }
        }))
    }();
    var pt, mt, gt = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (pt = function(t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e), n.getComputedStyle(t)
    }, mt = function(e, t, n) {
        var i, o, r, s, a = e.style;
        return n = n || pt(e), s = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== s && void 0 !== s || fe.contains(e.ownerDocument, e) || (s = fe.style(e, t)), n && !de.pixelMarginRight() && dt.test(s) && ut.test(t) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r), void 0 === s ? s : s + ""
    }) : ft.currentStyle && (pt = function(e) {
        return e.currentStyle
    }, mt = function(e, t, n) {
        var i, o, r, s, a = e.style;
        return n = n || pt(e), s = n ? n[t] : void 0, null == s && a && a[t] && (s = a[t]), dt.test(s) && !gt.test(t) && (i = a.left, o = e.runtimeStyle, r = o && o.left, r && (o.left = e.currentStyle.left), a.left = "fontSize" === t ? "1em" : s, s = a.pixelLeft + "px", a.left = i, r && (o.left = r)), void 0 === s ? s : s + "" || "auto"
    });
    var vt = /alpha\([^)]*\)/i,
        yt = /opacity\s*=\s*([^)]*)/i,
        bt = /^(none|table(?!-c[ea]).+)/,
        wt = new RegExp("^(" + He + ")(.*)$", "i"),
        Ct = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        _t = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        xt = ["Webkit", "O", "Moz", "ms"],
        $t = ie.createElement("div").style;
    fe.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = mt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": de.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, r, s, a = fe.camelCase(t),
                    l = e.style;
                if (t = fe.cssProps[a] || (fe.cssProps[a] = I(a) || a), s = fe.cssHooks[t] || fe.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(e, !1, i)) ? o : l[t];
                if (r = typeof n, "string" === r && (o = Le.exec(n)) && o[1] && (n = h(e, t, o), r = "number"), null != n && n === n && ("number" === r && (n += o && o[3] || (fe.cssNumber[a] ? "" : "px")), de.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(s && "set" in s && void 0 === (n = s.set(e, n, i))))) try {
                    l[t] = n
                } catch (c) {}
            }
        },
        css: function(e, t, n, i) {
            var o, r, s, a = fe.camelCase(t);
            return t = fe.cssProps[a] || (fe.cssProps[a] = I(a) || a), s = fe.cssHooks[t] || fe.cssHooks[a], s && "get" in s && (r = s.get(e, !0, n)), void 0 === r && (r = mt(e, t, i)), "normal" === r && t in _t && (r = _t[t]), "" === n || n ? (o = parseFloat(r), n === !0 || isFinite(o) ? o || 0 : r) : r
        }
    }), fe.each(["height", "width"], function(e, t) {
        fe.cssHooks[t] = {
            get: function(e, n, i) {
                return n ? bt.test(fe.css(e, "display")) && 0 === e.offsetWidth ? ht(e, Ct, function() {
                    return L(e, t, i)
                }) : L(e, t, i) : void 0
            },
            set: function(e, n, i) {
                var o = i && pt(e);
                return j(e, n, i ? H(e, t, i, de.boxSizing && "border-box" === fe.css(e, "boxSizing", !1, o), o) : 0)
            }
        }
    }), de.opacity || (fe.cssHooks.opacity = {
        get: function(e, t) {
            return yt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style,
                i = e.currentStyle,
                o = fe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                r = i && i.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === fe.trim(r.replace(vt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = vt.test(r) ? r.replace(vt, o) : r + " " + o)
        }
    }), fe.cssHooks.marginRight = N(de.reliableMarginRight, function(e, t) {
        return t ? ht(e, {
            display: "inline-block"
        }, mt, [e, "marginRight"]) : void 0
    }), fe.cssHooks.marginLeft = N(de.reliableMarginLeft, function(e, t) {
        return t ? (parseFloat(mt(e, "marginLeft")) || (fe.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - ht(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        }) : 0)) + "px" : void 0
    }), fe.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        fe.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) o[e + Me[i] + t] = r[i] || r[i - 2] || r[0];
                return o
            }
        }, ut.test(e) || (fe.cssHooks[e + t].set = j)
    }), fe.fn.extend({
        css: function(e, t) {
            return qe(this, function(e, t, n) {
                var i, o, r = {},
                    s = 0;
                if (fe.isArray(t)) {
                    for (i = pt(e), o = t.length; o > s; s++) r[t[s]] = fe.css(e, t[s], !1, i);
                    return r
                }
                return void 0 !== n ? fe.style(e, t, n) : fe.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return O(this, !0)
        },
        hide: function() {
            return O(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Pe(this) ? fe(this).show() : fe(this).hide()
            })
        }
    }), fe.Tween = M, M.prototype = {
        constructor: M,
        init: function(e, t, n, i, o, r) {
            this.elem = e, this.prop = n, this.easing = o || fe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (fe.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = M.propHooks[this.prop];
            return e && e.get ? e.get(this) : M.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = M.propHooks[this.prop];
            return this.options.duration ? this.pos = t = fe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : M.propHooks._default.set(this), this
        }
    }, M.prototype.init.prototype = M.prototype, M.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = fe.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
            },
            set: function(e) {
                fe.fx.step[e.prop] ? fe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[fe.cssProps[e.prop]] && !fe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : fe.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, M.propHooks.scrollTop = M.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, fe.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, fe.fx = M.prototype.init, fe.fx.step = {};
    var Et, Tt, St = /^(?:toggle|show|hide)$/,
        kt = /queueHooks$/;
    fe.Animation = fe.extend(R, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return h(n.elem, e, Le.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                fe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Ae);
                for (var n, i = 0, o = e.length; o > i; i++) n = e[i], R.tweeners[n] = R.tweeners[n] || [], R.tweeners[n].unshift(t)
            },
            prefilters: [F],
            prefilter: function(e, t) {
                t ? R.prefilters.unshift(e) : R.prefilters.push(e)
            }
        }), fe.speed = function(e, t, n) {
            var i = e && "object" == typeof e ? fe.extend({}, e) : {
                complete: n || !n && t || fe.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !fe.isFunction(t) && t
            };
            return i.duration = fe.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in fe.fx.speeds ? fe.fx.speeds[i.duration] : fe.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                fe.isFunction(i.old) && i.old.call(this), i.queue && fe.dequeue(this, i.queue)
            }, i
        }, fe.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(Pe).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function(e, t, n, i) {
                var o = fe.isEmptyObject(e),
                    r = fe.speed(t, n, i),
                    s = function() {
                        var t = R(this, fe.extend({}, e), r);
                        (o || fe._data(this, "finish")) && t.stop(!0)
                    };
                return s.finish = s, o || r.queue === !1 ? this.each(s) : this.queue(r.queue, s)
            },
            stop: function(e, t, n) {
                var i = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        o = null != e && e + "queueHooks",
                        r = fe.timers,
                        s = fe._data(this);
                    if (o) s[o] && s[o].stop && i(s[o]);
                    else
                        for (o in s) s[o] && s[o].stop && kt.test(o) && i(s[o]);
                    for (o = r.length; o--;) r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
                    (t || !n) && fe.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = fe._data(this),
                        i = n[e + "queue"],
                        o = n[e + "queueHooks"],
                        r = fe.timers,
                        s = i ? i.length : 0;
                    for (n.finish = !0, fe.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                    for (t = 0; s > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                    delete n.finish
                })
            }
        }), fe.each(["toggle", "show", "hide"], function(e, t) {
            var n = fe.fn[t];
            fe.fn[t] = function(e, i, o) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(q(t, !0), e, i, o)
            }
        }), fe.each({
            slideDown: q("show"),
            slideUp: q("hide"),
            slideToggle: q("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            fe.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i)
            }
        }), fe.timers = [], fe.fx.tick = function() {
            var e, t = fe.timers,
                n = 0;
            for (Et = fe.now(); n < t.length; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
            t.length || fe.fx.stop(), Et = void 0
        }, fe.fx.timer = function(e) {
            fe.timers.push(e), e() ? fe.fx.start() : fe.timers.pop()
        }, fe.fx.interval = 13, fe.fx.start = function() {
            Tt || (Tt = e.setInterval(fe.fx.tick, fe.fx.interval))
        }, fe.fx.stop = function() {
            e.clearInterval(Tt), Tt = null
        }, fe.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, fe.fn.delay = function(t, n) {
            return t = fe.fx ? fe.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, i) {
                var o = e.setTimeout(n, t);
                i.stop = function() {
                    e.clearTimeout(o)
                }
            })
        },
        function() {
            var e, t = ie.createElement("input"),
                n = ie.createElement("div"),
                i = ie.createElement("select"),
                o = i.appendChild(ie.createElement("option"));
            n = ie.createElement("div"), n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], t.setAttribute("type", "checkbox"), n.appendChild(t), e = n.getElementsByTagName("a")[0], e.style.cssText = "top:1px", de.getSetAttribute = "t" !== n.className, de.style = /top/.test(e.getAttribute("style")), de.hrefNormalized = "/a" === e.getAttribute("href"), de.checkOn = !!t.value, de.optSelected = o.selected, de.enctype = !!ie.createElement("form").enctype, i.disabled = !0, de.optDisabled = !o.disabled, t = ie.createElement("input"), t.setAttribute("value", ""), de.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), de.radioValue = "t" === t.value
        }();
    var At = /\r/g,
        Dt = /[\x20\t\r\n\f]+/g;
    fe.fn.extend({
        val: function(e) {
            var t, n, i, o = this[0]; {
                if (arguments.length) return i = fe.isFunction(e), this.each(function(n) {
                    var o;
                    1 === this.nodeType && (o = i ? e.call(this, n, fe(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : fe.isArray(o) && (o = fe.map(o, function(e) {
                        return null == e ? "" : e + ""
                    })), t = fe.valHooks[this.type] || fe.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
                });
                if (o) return t = fe.valHooks[o.type] || fe.valHooks[o.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value, "string" == typeof n ? n.replace(At, "") : null == n ? "" : n)
            }
        }
    }), fe.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = fe.find.attr(e, "value");
                    return null != t ? t : fe.trim(fe.text(e)).replace(Dt, " ")
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || 0 > o, s = r ? null : [], a = r ? o + 1 : i.length, l = 0 > o ? a : r ? o : 0; a > l; l++)
                        if (n = i[l], (n.selected || l === o) && (de.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !fe.nodeName(n.parentNode, "optgroup"))) {
                            if (t = fe(n).val(), r) return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    for (var n, i, o = e.options, r = fe.makeArray(t), s = o.length; s--;)
                        if (i = o[s], fe.inArray(fe.valHooks.option.get(i), r) > -1) try {
                            i.selected = n = !0
                        } catch (a) {
                            i.scrollHeight
                        } else i.selected = !1;
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), fe.each(["radio", "checkbox"], function() {
        fe.valHooks[this] = {
            set: function(e, t) {
                return fe.isArray(t) ? e.checked = fe.inArray(fe(e).val(), t) > -1 : void 0
            }
        }, de.checkOn || (fe.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Nt, It, Ot = fe.expr.attrHandle,
        jt = /^(?:checked|selected)$/i,
        Ht = de.getSetAttribute,
        Lt = de.input;
    fe.fn.extend({
        attr: function(e, t) {
            return qe(this, fe.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                fe.removeAttr(this, e)
            })
        }
    }), fe.extend({
        attr: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return "undefined" == typeof e.getAttribute ? fe.prop(e, t, n) : (1 === r && fe.isXMLDoc(e) || (t = t.toLowerCase(), o = fe.attrHooks[t] || (fe.expr.match.bool.test(t) ? It : Nt)), void 0 !== n ? null === n ? void fe.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : (i = fe.find.attr(e, t), null == i ? void 0 : i))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!de.radioValue && "radio" === t && fe.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, i, o = 0,
                r = t && t.match(Ae);
            if (r && 1 === e.nodeType)
                for (; n = r[o++];) i = fe.propFix[n] || n, fe.expr.match.bool.test(n) ? Lt && Ht || !jt.test(n) ? e[i] = !1 : e[fe.camelCase("default-" + n)] = e[i] = !1 : fe.attr(e, n, ""), e.removeAttribute(Ht ? n : i)
        }
    }), It = {
        set: function(e, t, n) {
            return t === !1 ? fe.removeAttr(e, n) : Lt && Ht || !jt.test(n) ? e.setAttribute(!Ht && fe.propFix[n] || n, n) : e[fe.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, fe.each(fe.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = Ot[t] || fe.find.attr;
        Lt && Ht || !jt.test(t) ? Ot[t] = function(e, t, i) {
            var o, r;
            return i || (r = Ot[t], Ot[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, Ot[t] = r), o
        } : Ot[t] = function(e, t, n) {
            return n ? void 0 : e[fe.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), Lt && Ht || (fe.attrHooks.value = {
        set: function(e, t, n) {
            return fe.nodeName(e, "input") ? void(e.defaultValue = t) : Nt && Nt.set(e, t, n)
        }
    }), Ht || (Nt = {
        set: function(e, t, n) {
            var i = e.getAttributeNode(n);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    }, Ot.id = Ot.name = Ot.coords = function(e, t, n) {
        var i;
        return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
    }, fe.valHooks.button = {
        get: function(e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        },
        set: Nt.set
    }, fe.attrHooks.contenteditable = {
        set: function(e, t, n) {
            Nt.set(e, "" === t ? !1 : t, n)
        }
    }, fe.each(["width", "height"], function(e, t) {
        fe.attrHooks[t] = {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })), de.style || (fe.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    });
    var Mt = /^(?:input|select|textarea|button|object)$/i,
        Pt = /^(?:a|area)$/i;
    fe.fn.extend({
        prop: function(e, t) {
            return qe(this, fe.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = fe.propFix[e] || e, this.each(function() {
                try {
                    this[e] = void 0, delete this[e]
                } catch (t) {}
            })
        }
    }), fe.extend({
        prop: function(e, t, n) {
            var i, o, r = e.nodeType;
            if (3 !== r && 8 !== r && 2 !== r) return 1 === r && fe.isXMLDoc(e) || (t = fe.propFix[t] || t, o = fe.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = fe.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Mt.test(e.nodeName) || Pt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), de.hrefNormalized || fe.each(["href", "src"], function(e, t) {
        fe.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }), de.optSelected || (fe.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), fe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        fe.propFix[this.toLowerCase()] = this
    }), de.enctype || (fe.propFix.enctype = "encoding");
    var qt = /[\t\r\n\f]/g;
    fe.fn.extend({
        addClass: function(e) {
            var t, n, i, o, r, s, a, l = 0;
            if (fe.isFunction(e)) return this.each(function(t) {
                fe(this).addClass(e.call(this, t, z(this)))
            });
            if ("string" == typeof e && e)
                for (t = e.match(Ae) || []; n = this[l++];)
                    if (o = z(n), i = 1 === n.nodeType && (" " + o + " ").replace(qt, " ")) {
                        for (s = 0; r = t[s++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                        a = fe.trim(i), o !== a && fe.attr(n, "class", a)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, i, o, r, s, a, l = 0;
            if (fe.isFunction(e)) return this.each(function(t) {
                fe(this).removeClass(e.call(this, t, z(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(Ae) || []; n = this[l++];)
                    if (o = z(n), i = 1 === n.nodeType && (" " + o + " ").replace(qt, " ")) {
                        for (s = 0; r = t[s++];)
                            for (; i.indexOf(" " + r + " ") > -1;) i = i.replace(" " + r + " ", " ");
                        a = fe.trim(i), o !== a && fe.attr(n, "class", a);
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : fe.isFunction(e) ? this.each(function(n) {
                fe(this).toggleClass(e.call(this, n, z(this), t), t)
            }) : this.each(function() {
                var t, i, o, r;
                if ("string" === n)
                    for (i = 0, o = fe(this), r = e.match(Ae) || []; t = r[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else(void 0 === e || "boolean" === n) && (t = z(this), t && fe._data(this, "__className__", t), fe.attr(this, "class", t || e === !1 ? "" : fe._data(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++];)
                if (1 === n.nodeType && (" " + z(n) + " ").replace(qt, " ").indexOf(t) > -1) return !0;
            return !1
        }
    }), fe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        fe.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), fe.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    });
    var Wt = e.location,
        Ft = fe.now(),
        Bt = /\?/,
        Rt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    fe.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
        var n, i = null,
            o = fe.trim(t + "");
        return o && !fe.trim(o.replace(Rt, function(e, t, o, r) {
            return n && t && (i = 0), 0 === i ? e : (n = o || t, i += !r - !o, "")
        })) ? Function("return " + o)() : fe.error("Invalid JSON: " + t)
    }, fe.parseXML = function(t) {
        var n, i;
        if (!t || "string" != typeof t) return null;
        try {
            e.DOMParser ? (i = new e.DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new e.ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (o) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || fe.error("Invalid XML: " + t), n
    };
    var zt = /#.*$/,
        Qt = /([?&])_=[^&]*/,
        Ut = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Xt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Kt = /^(?:GET|HEAD)$/,
        Yt = /^\/\//,
        Vt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Gt = {},
        Zt = {},
        Jt = "*/".concat("*"),
        en = Wt.href,
        tn = Vt.exec(en.toLowerCase()) || [];
    fe.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: en,
            type: "GET",
            isLocal: Xt.test(tn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Jt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": fe.parseJSON,
                "text xml": fe.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? X(X(e, fe.ajaxSettings), t) : X(fe.ajaxSettings, e)
        },
        ajaxPrefilter: Q(Gt),
        ajaxTransport: Q(Zt),
        ajax: function(t, n) {
            function i(t, n, i, o) {
                var r, d, y, b, C, x = n;
                2 !== w && (w = 2, l && e.clearTimeout(l), u = void 0, a = o || "", _.readyState = t > 0 ? 4 : 0, r = t >= 200 && 300 > t || 304 === t, i && (b = K(h, _, i)), b = Y(h, b, _, r), r ? (h.ifModified && (C = _.getResponseHeader("Last-Modified"), C && (fe.lastModified[s] = C), C = _.getResponseHeader("etag"), C && (fe.etag[s] = C)), 204 === t || "HEAD" === h.type ? x = "nocontent" : 304 === t ? x = "notmodified" : (x = b.state, d = b.data, y = b.error, r = !y)) : (y = x, (t || !x) && (x = "error", 0 > t && (t = 0))), _.status = t, _.statusText = (n || x) + "", r ? m.resolveWith(f, [d, x, _]) : m.rejectWith(f, [_, x, y]), _.statusCode(v), v = void 0, c && p.trigger(r ? "ajaxSuccess" : "ajaxError", [_, h, r ? d : y]), g.fireWith(f, [_, x]), c && (p.trigger("ajaxComplete", [_, h]), --fe.active || fe.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var o, r, s, a, l, c, u, d, h = fe.ajaxSetup({}, n),
                f = h.context || h,
                p = h.context && (f.nodeType || f.jquery) ? fe(f) : fe.event,
                m = fe.Deferred(),
                g = fe.Callbacks("once memory"),
                v = h.statusCode || {},
                y = {},
                b = {},
                w = 0,
                C = "canceled",
                _ = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === w) {
                            if (!d)
                                for (d = {}; t = Ut.exec(a);) d[t[1].toLowerCase()] = t[2];
                            t = d[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return w || (e = b[n] = b[n] || e, y[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return w || (h.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > w)
                                for (t in e) v[t] = [v[t], e[t]];
                            else _.always(e[_.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || C;
                        return u && u.abort(t), i(0, t), this
                    }
                };
            if (m.promise(_).complete = g.add, _.success = _.done, _.error = _.fail, h.url = ((t || h.url || en) + "").replace(zt, "").replace(Yt, tn[1] + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = fe.trim(h.dataType || "*").toLowerCase().match(Ae) || [""], null == h.crossDomain && (o = Vt.exec(h.url.toLowerCase()), h.crossDomain = !(!o || o[1] === tn[1] && o[2] === tn[2] && (o[3] || ("http:" === o[1] ? "80" : "443")) === (tn[3] || ("http:" === tn[1] ? "80" : "443")))), h.data && h.processData && "string" != typeof h.data && (h.data = fe.param(h.data, h.traditional)), U(Gt, h, n, _), 2 === w) return _;
            c = fe.event && h.global, c && 0 === fe.active++ && fe.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Kt.test(h.type), s = h.url, h.hasContent || (h.data && (s = h.url += (Bt.test(s) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (h.url = Qt.test(s) ? s.replace(Qt, "$1_=" + Ft++) : s + (Bt.test(s) ? "&" : "?") + "_=" + Ft++)), h.ifModified && (fe.lastModified[s] && _.setRequestHeader("If-Modified-Since", fe.lastModified[s]), fe.etag[s] && _.setRequestHeader("If-None-Match", fe.etag[s])), (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && _.setRequestHeader("Content-Type", h.contentType), _.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Jt + "; q=0.01" : "") : h.accepts["*"]);
            for (r in h.headers) _.setRequestHeader(r, h.headers[r]);
            if (h.beforeSend && (h.beforeSend.call(f, _, h) === !1 || 2 === w)) return _.abort();
            C = "abort";
            for (r in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) _[r](h[r]);
            if (u = U(Zt, h, n, _)) {
                if (_.readyState = 1, c && p.trigger("ajaxSend", [_, h]), 2 === w) return _;
                h.async && h.timeout > 0 && (l = e.setTimeout(function() {
                    _.abort("timeout")
                }, h.timeout));
                try {
                    w = 1, u.send(y, i)
                } catch (x) {
                    if (!(2 > w)) throw x;
                    i(-1, x)
                }
            } else i(-1, "No Transport");
            return _
        },
        getJSON: function(e, t, n) {
            return fe.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return fe.get(e, void 0, t, "script")
        }
    }), fe.each(["get", "post"], function(e, t) {
        fe[t] = function(e, n, i, o) {
            return fe.isFunction(n) && (o = o || i, i = n, n = void 0), fe.ajax(fe.extend({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: i
            }, fe.isPlainObject(e) && e))
        }
    }), fe._evalUrl = function(e) {
        return fe.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }, fe.fn.extend({
        wrapAll: function(e) {
            if (fe.isFunction(e)) return this.each(function(t) {
                fe(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = fe(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return fe.isFunction(e) ? this.each(function(t) {
                fe(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = fe(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = fe.isFunction(e);
            return this.each(function(n) {
                fe(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                fe.nodeName(this, "body") || fe(this).replaceWith(this.childNodes)
            }).end()
        }
    }), fe.expr.filters.hidden = function(e) {
        return de.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : G(e)
    }, fe.expr.filters.visible = function(e) {
        return !fe.expr.filters.hidden(e)
    };
    var nn = /%20/g,
        on = /\[\]$/,
        rn = /\r?\n/g,
        sn = /^(?:submit|button|image|reset|file)$/i,
        an = /^(?:input|select|textarea|keygen)/i;
    fe.param = function(e, t) {
        var n, i = [],
            o = function(e, t) {
                t = fe.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = fe.ajaxSettings && fe.ajaxSettings.traditional), fe.isArray(e) || e.jquery && !fe.isPlainObject(e)) fe.each(e, function() {
            o(this.name, this.value)
        });
        else
            for (n in e) Z(n, e[n], t, o);
        return i.join("&").replace(nn, "+")
    }, fe.fn.extend({
        serialize: function() {
            return fe.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = fe.prop(this, "elements");
                return e ? fe.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !fe(this).is(":disabled") && an.test(this.nodeName) && !sn.test(e) && (this.checked || !We.test(e))
            }).map(function(e, t) {
                var n = fe(this).val();
                return null == n ? null : fe.isArray(n) ? fe.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(rn, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(rn, "\r\n")
                }
            }).get()
        }
    }), fe.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
        return this.isLocal ? ee() : ie.documentMode > 8 ? J() : /^(get|post|head|put|delete|options)$/i.test(this.type) && J() || ee()
    } : J;
    var ln = 0,
        cn = {},
        un = fe.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function() {
        for (var e in cn) cn[e](void 0, !0)
    }), de.cors = !!un && "withCredentials" in un, un = de.ajax = !!un, un && fe.ajaxTransport(function(t) {
        if (!t.crossDomain || de.cors) {
            var n;
            return {
                send: function(i, o) {
                    var r, s = t.xhr(),
                        a = ++ln;
                    if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (r in t.xhrFields) s[r] = t.xhrFields[r];
                    t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    for (r in i) void 0 !== i[r] && s.setRequestHeader(r, i[r] + "");
                    s.send(t.hasContent && t.data || null), n = function(e, i) {
                        var r, l, c;
                        if (n && (i || 4 === s.readyState))
                            if (delete cn[a], n = void 0, s.onreadystatechange = fe.noop, i) 4 !== s.readyState && s.abort();
                            else {
                                c = {}, r = s.status, "string" == typeof s.responseText && (c.text = s.responseText);
                                try {
                                    l = s.statusText
                                } catch (u) {
                                    l = ""
                                }
                                r || !t.isLocal || t.crossDomain ? 1223 === r && (r = 204) : r = c.text ? 200 : 404
                            }
                        c && o(r, l, c, s.getAllResponseHeaders())
                    }, t.async ? 4 === s.readyState ? e.setTimeout(n) : s.onreadystatechange = cn[a] = n : n()
                },
                abort: function() {
                    n && n(void 0, !0)
                }
            }
        }
    }), fe.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return fe.globalEval(e), e
            }
        }
    }), fe.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), fe.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n = ie.head || fe("head")[0] || ie.documentElement;
            return {
                send: function(i, o) {
                    t = ie.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || o(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                },
                abort: function() {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var dn = [],
        hn = /(=)\?(?=&|$)|\?\?/;
    fe.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = dn.pop() || fe.expando + "_" + Ft++;
            return this[e] = !0, e
        }
    }), fe.ajaxPrefilter("json jsonp", function(t, n, i) {
        var o, r, s, a = t.jsonp !== !1 && (hn.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && hn.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (o = t.jsonpCallback = fe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(hn, "$1" + o) : t.jsonp !== !1 && (t.url += (Bt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
            return s || fe.error(o + " was not called"), s[0]
        }, t.dataTypes[0] = "json", r = e[o], e[o] = function() {
            s = arguments
        }, i.always(function() {
            void 0 === r ? fe(e).removeProp(o) : e[o] = r, t[o] && (t.jsonpCallback = n.jsonpCallback, dn.push(o)), s && fe.isFunction(r) && r(s[0]), s = r = void 0
        }), "script") : void 0
    }), fe.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || ie;
        var i = _e.exec(e),
            o = !n && [];
        return i ? [t.createElement(i[1])] : (i = v([e], t, o), o && o.length && fe(o).remove(), fe.merge([], i.childNodes))
    };
    var fn = fe.fn.load;
    fe.fn.load = function(e, t, n) {
        if ("string" != typeof e && fn) return fn.apply(this, arguments);
        var i, o, r, s = this,
            a = e.indexOf(" ");
        return a > -1 && (i = fe.trim(e.slice(a, e.length)), e = e.slice(0, a)), fe.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), s.length > 0 && fe.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            r = arguments, s.html(i ? fe("<div>").append(fe.parseHTML(e)).find(i) : e)
        }).always(n && function(e, t) {
            s.each(function() {
                n.apply(this, r || [e.responseText, t, e])
            })
        }), this
    }, fe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        fe.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), fe.expr.filters.animated = function(e) {
        return fe.grep(fe.timers, function(t) {
            return e === t.elem
        }).length
    }, fe.offset = {
        setOffset: function(e, t, n) {
            var i, o, r, s, a, l, c, u = fe.css(e, "position"),
                d = fe(e),
                h = {};
            "static" === u && (e.style.position = "relative"), a = d.offset(), r = fe.css(e, "top"), l = fe.css(e, "left"), c = ("absolute" === u || "fixed" === u) && fe.inArray("auto", [r, l]) > -1, c ? (i = d.position(), s = i.top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), fe.isFunction(t) && (t = t.call(e, n, fe.extend({}, a))), null != t.top && (h.top = t.top - a.top + s), null != t.left && (h.left = t.left - a.left + o), "using" in t ? t.using.call(e, h) : d.css(h)
        }
    }, fe.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                fe.offset.setOffset(this, e, t)
            });
            var t, n, i = {
                    top: 0,
                    left: 0
                },
                o = this[0],
                r = o && o.ownerDocument;
            if (r) return t = r.documentElement, fe.contains(t, o) ? ("undefined" != typeof o.getBoundingClientRect && (i = o.getBoundingClientRect()), n = te(r), {
                top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : i
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                        top: 0,
                        left: 0
                    },
                    i = this[0];
                return "fixed" === fe.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), fe.nodeName(e[0], "html") || (n = e.offset()), n.top += fe.css(e[0], "borderTopWidth", !0), n.left += fe.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - fe.css(i, "marginTop", !0),
                    left: t.left - n.left - fe.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && !fe.nodeName(e, "html") && "static" === fe.css(e, "position");) e = e.offsetParent;
                return e || ft
            })
        }
    }), fe.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = /Y/.test(t);
        fe.fn[e] = function(i) {
            return qe(this, function(e, i, o) {
                var r = te(e);
                return void 0 === o ? r ? t in r ? r[t] : r.document.documentElement[i] : e[i] : void(r ? r.scrollTo(n ? fe(r).scrollLeft() : o, n ? o : fe(r).scrollTop()) : e[i] = o)
            }, e, i, arguments.length, null)
        }
    }), fe.each(["top", "left"], function(e, t) {
        fe.cssHooks[t] = N(de.pixelPosition, function(e, n) {
            return n ? (n = mt(e, t), dt.test(n) ? fe(e).position()[t] + "px" : n) : void 0
        })
    }), fe.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        fe.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, i) {
            fe.fn[i] = function(i, o) {
                var r = arguments.length && (n || "boolean" != typeof i),
                    s = n || (i === !0 || o === !0 ? "margin" : "border");
                return qe(this, function(t, n, i) {
                    var o;
                    return fe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? fe.css(t, n, s) : fe.style(t, n, i, s)
                }, t, r ? i : void 0, r, null)
            }
        })
    }), fe.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), fe.fn.size = function() {
        return this.length
    }, fe.fn.andSelf = fe.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return fe
    });
    var pn = e.jQuery,
        mn = e.$;
    return fe.noConflict = function(t) {
        return e.$ === fe && (e.$ = mn), t && e.jQuery === fe && (e.jQuery = pn), fe
    }, t || (e.jQuery = e.$ = fe), fe
}),
function(e, t) {
    "use strict";
    e.rails !== t && e.error("jquery-ujs has already been loaded!");
    var n, i = e(document);
    e.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
        fileInputSelector: "input[name][type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function() {
            return e("meta[name=csrf-token]").attr("content")
        },
        csrfParam: function() {
            return e("meta[name=csrf-param]").attr("content")
        },
        CSRFProtection: function(e) {
            var t = n.csrfToken();
            t && e.setRequestHeader("X-CSRF-Token", t)
        },
        refreshCSRFTokens: function() {
            e('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken())
        },
        fire: function(t, n, i) {
            var o = e.Event(n);
            return t.trigger(o, i), o.result !== !1
        },
        confirm: function(e) {
            return confirm(e)
        },
        ajax: function(t) {
            return e.ajax(t)
        },
        href: function(e) {
            return e[0].href
        },
        isRemote: function(e) {
            return e.data("remote") !== t && e.data("remote") !== !1
        },
        handleRemote: function(i) {
            var o, r, s, a, l, c;
            if (n.fire(i, "ajax:before")) {
                if (a = i.data("with-credentials") || null, l = i.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, i.is("form")) {
                    o = i.data("ujs:submit-button-formmethod") || i.attr("method"), r = i.data("ujs:submit-button-formaction") || i.attr("action"), s = e(i[0]).serializeArray();
                    var u = i.data("ujs:submit-button");
                    u && (s.push(u), i.data("ujs:submit-button", null)), i.data("ujs:submit-button-formmethod", null), i.data("ujs:submit-button-formaction", null)
                } else i.is(n.inputChangeSelector) ? (o = i.data("method"), r = i.data("url"), s = i.serialize(), i.data("params") && (s = s + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (o = i.data("method") || "get", r = i.data("url"), s = i.serialize(), i.data("params") && (s = s + "&" + i.data("params"))) : (o = i.data("method"), r = n.href(i), s = i.data("params") || null);
                return c = {
                    type: o || "GET",
                    data: s,
                    dataType: l,
                    beforeSend: function(e, o) {
                        return o.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), n.fire(i, "ajax:beforeSend", [e, o]) ? void i.trigger("ajax:send", e) : !1
                    },
                    success: function(e, t, n) {
                        i.trigger("ajax:success", [e, t, n])
                    },
                    complete: function(e, t) {
                        i.trigger("ajax:complete", [e, t])
                    },
                    error: function(e, t, n) {
                        i.trigger("ajax:error", [e, t, n])
                    },
                    crossDomain: n.isCrossDomain(r)
                }, a && (c.xhrFields = {
                    withCredentials: a
                }), r && (c.url = r), n.ajax(c)
            }
            return !1
        },
        isCrossDomain: function(e) {
            var t = document.createElement("a");
            t.href = location.href;
            var n = document.createElement("a");
            try {
                return n.href = e, n.href = n.href, !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
            } catch (i) {
                return !0
            }
        },
        handleMethod: function(i) {
            var o = n.href(i),
                r = i.data("method"),
                s = i.attr("target"),
                a = n.csrfToken(),
                l = n.csrfParam(),
                c = e('<form method="post" action="' + o + '"></form>'),
                u = '<input name="_method" value="' + r + '" type="hidden" />';
            l === t || a === t || n.isCrossDomain(o) || (u += '<input name="' + l + '" value="' + a + '" type="hidden" />'), s && c.attr("target", s), c.hide().append(u).appendTo("body"), c.submit()
        },
        formElements: function(t, n) {
            return t.is("form") ? e(t[0].elements).filter(n) : t.find(n)
        },
        disableFormElements: function(t) {
            n.formElements(t, n.disableSelector).each(function() {
                n.disableFormElement(e(this))
            })
        },
        disableFormElement: function(e) {
            var n, i;
            n = e.is("button") ? "html" : "val", i = e.data("disable-with"), i !== t && (e.data("ujs:enable-with", e[n]()), e[n](i)), e.prop("disabled", !0), e.data("ujs:disabled", !0)
        },
        enableFormElements: function(t) {
            n.formElements(t, n.enableSelector).each(function() {
                n.enableFormElement(e(this))
            })
        },
        enableFormElement: function(e) {
            var n = e.is("button") ? "html" : "val";
            e.data("ujs:enable-with") !== t && (e[n](e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.prop("disabled", !1), e.removeData("ujs:disabled")
        },
        allowAction: function(e) {
            var t, i = e.data("confirm"),
                o = !1;
            if (!i) return !0;
            if (n.fire(e, "confirm")) {
                try {
                    o = n.confirm(i)
                } catch (r) {
                    (console.error || console.log).call(console, r.stack || r)
                }
                t = n.fire(e, "confirm:complete", [o])
            }
            return o && t
        },
        blankInputs: function(t, n, i) {
            var o, r, s, a, l = e(),
                c = n || "input,textarea",
                u = t.find(c),
                d = {};
            return u.each(function() {
                o = e(this), o.is("input[type=radio]") ? (a = o.attr("name"), d[a] || (0 === t.find('input[type=radio]:checked[name="' + a + '"]').length && (s = t.find('input[type=radio][name="' + a + '"]'), l = l.add(s)), d[a] = a)) : (r = o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : !!o.val(), r === i && (l = l.add(o)))
            }), l.length ? l : !1
        },
        nonBlankInputs: function(e, t) {
            return n.blankInputs(e, t, !0)
        },
        stopEverything: function(t) {
            return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
        },
        disableElement: function(e) {
            var i = e.data("disable-with");
            i !== t && (e.data("ujs:enable-with", e.html()), e.html(i)), e.bind("click.railsDisable", function(e) {
                return n.stopEverything(e)
            }), e.data("ujs:disabled", !0)
        },
        enableElement: function(e) {
            e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable"), e.removeData("ujs:disabled")
        }
    }, n.fire(i, "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, i) {
        e.crossDomain || n.CSRFProtection(i)
    }), e(window).on("pageshow.rails", function() {
        e(e.rails.enableSelector).each(function() {
            var t = e(this);
            t.data("ujs:disabled") && e.rails.enableFormElement(t)
        }), e(e.rails.linkDisableSelector).each(function() {
            var t = e(this);
            t.data("ujs:disabled") && e.rails.enableElement(t)
        })
    }), i.on("ajax:complete", n.linkDisableSelector, function() {
        n.enableElement(e(this))
    }), i.on("ajax:complete", n.buttonDisableSelector, function() {
        n.enableFormElement(e(this))
    }), i.on("click.rails", n.linkClickSelector, function(t) {
        var i = e(this),
            o = i.data("method"),
            r = i.data("params"),
            s = t.metaKey || t.ctrlKey;
        if (!n.allowAction(i)) return n.stopEverything(t);
        if (!s && i.is(n.linkDisableSelector) && n.disableElement(i), n.isRemote(i)) {
            if (s && (!o || "GET" === o) && !r) return !0;
            var a = n.handleRemote(i);
            return a === !1 ? n.enableElement(i) : a.fail(function() {
                n.enableElement(i)
            }), !1
        }
        return o ? (n.handleMethod(i), !1) : void 0
    }), i.on("click.rails", n.buttonClickSelector, function(t) {
        var i = e(this);
        if (!n.allowAction(i) || !n.isRemote(i)) return n.stopEverything(t);
        i.is(n.buttonDisableSelector) && n.disableFormElement(i);
        var o = n.handleRemote(i);
        return o === !1 ? n.enableFormElement(i) : o.fail(function() {
            n.enableFormElement(i)
        }), !1
    }), i.on("change.rails", n.inputChangeSelector, function(t) {
        var i = e(this);
        return n.allowAction(i) && n.isRemote(i) ? (n.handleRemote(i), !1) : n.stopEverything(t)
    }), i.on("submit.rails", n.formSubmitSelector, function(i) {
        var o, r, s = e(this),
            a = n.isRemote(s);
        if (!n.allowAction(s)) return n.stopEverything(i);
        if (s.attr("novalidate") === t)
            if (s.data("ujs:formnovalidate-button") === t) {
                if (o = n.blankInputs(s, n.requiredInputSelector, !1), o && n.fire(s, "ajax:aborted:required", [o])) return n.stopEverything(i)
            } else s.data("ujs:formnovalidate-button", t);
        if (a) {
            if (r = n.nonBlankInputs(s, n.fileInputSelector)) {
                setTimeout(function() {
                    n.disableFormElements(s)
                }, 13);
                var l = n.fire(s, "ajax:aborted:file", [r]);
                return l || setTimeout(function() {
                    n.enableFormElements(s)
                }, 13), l
            }
            return n.handleRemote(s), !1
        }
        setTimeout(function() {
            n.disableFormElements(s)
        }, 13)
    }), i.on("click.rails", n.formInputClickSelector, function(t) {
        var i = e(this);
        if (!n.allowAction(i)) return n.stopEverything(t);
        var o = i.attr("name"),
            r = o ? {
                name: o,
                value: i.val()
            } : null,
            s = i.closest("form");
        0 === s.length && (s = e("#" + i.attr("form"))), s.data("ujs:submit-button", r), s.data("ujs:formnovalidate-button", i.attr("formnovalidate")), s.data("ujs:submit-button-formaction", i.attr("formaction")), s.data("ujs:submit-button-formmethod", i.attr("formmethod"))
    }), i.on("ajax:send.rails", n.formSubmitSelector, function(t) {
        this === t.target && n.disableFormElements(e(this))
    }), i.on("ajax:complete.rails", n.formSubmitSelector, function(t) {
        this === t.target && n.enableFormElements(e(this))
    }), e(function() {
        n.refreshCSRFTokens()
    }))
}(jQuery), ! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], t) : t(e.bootstrap = {}, e.jQuery)
}(this, function(e, t) {
    "use strict";

    function n(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    function i(e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e
    }

    function o(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {},
                i = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable
            }))), i.forEach(function(t) {
                var i, o, r;
                i = e, r = n[o = t], o in i ? Object.defineProperty(i, o, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : i[o] = r
            })
        }
        return e
    }

    function r(e) {
        return e && "[object Function]" === {}.toString.call(e)
    }

    function s(e, t) {
        if (1 !== e.nodeType) return [];
        var n = getComputedStyle(e, null);
        return t ? n[t] : n
    }

    function a(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host
    }

    function l(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case "HTML":
            case "BODY":
                return e.ownerDocument.body;
            case "#document":
                return e.body
        }
        var t = s(e),
            n = t.overflow,
            i = t.overflowX,
            o = t.overflowY;
        return /(auto|scroll|overlay)/.test(n + o + i) ? e : l(a(e))
    }

    function c(e) {
        return 11 === e ? ht : 10 === e ? ft : ht || ft
    }

    function u(e) {
        if (!e) return document.documentElement;
        for (var t = c(10) ? document.body : null, n = e.offsetParent; n === t && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TD", "TABLE"].indexOf(n.nodeName) && "static" === s(n, "position") ? u(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function d(e) {
        return null !== e.parentNode ? d(e.parentNode) : e
    }

    function h(e, t) {
        if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
        var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? e : t,
            o = n ? t : e,
            r = document.createRange();
        r.setStart(i, 0), r.setEnd(o, 0);
        var s, a, l = r.commonAncestorContainer;
        if (e !== l && t !== l || i.contains(o)) return "BODY" === (a = (s = l).nodeName) || "HTML" !== a && u(s.firstElementChild) !== s ? u(l) : l;
        var c = d(e);
        return c.host ? h(c.host, t) : h(e, d(t).host)
    }

    function f(e) {
        var t = "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
            n = e.nodeName;
        if ("BODY" === n || "HTML" === n) {
            var i = e.ownerDocument.documentElement;
            return (e.ownerDocument.scrollingElement || i)[t]
        }
        return e[t]
    }

    function p(e, t) {
        var n = "x" === t ? "Left" : "Top",
            i = "Left" === n ? "Right" : "Bottom";
        return parseFloat(e["border" + n + "Width"], 10) + parseFloat(e["border" + i + "Width"], 10)
    }

    function m(e, t, n, i) {
        return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], c(10) ? n["offset" + e] + i["margin" + ("Height" === e ? "Top" : "Left")] + i["margin" + ("Height" === e ? "Bottom" : "Right")] : 0)
    }

    function g() {
        var e = document.body,
            t = document.documentElement,
            n = c(10) && getComputedStyle(t);
        return {
            height: m("Height", e, t, n),
            width: m("Width", e, t, n)
        }
    }

    function v(e) {
        return gt({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function y(e) {
        var t = {};
        try {
            if (c(10)) {
                t = e.getBoundingClientRect();
                var n = f(e, "top"),
                    i = f(e, "left");
                t.top += n, t.left += i, t.bottom += n, t.right += i
            } else t = e.getBoundingClientRect()
        } catch (e) {}
        var o = {
                left: t.left,
                top: t.top,
                width: t.right - t.left,
                height: t.bottom - t.top
            },
            r = "HTML" === e.nodeName ? g() : {},
            a = r.width || e.clientWidth || o.right - o.left,
            l = r.height || e.clientHeight || o.bottom - o.top,
            u = e.offsetWidth - a,
            d = e.offsetHeight - l;
        if (u || d) {
            var h = s(e);
            u -= p(h, "x"), d -= p(h, "y"), o.width -= u, o.height -= d
        }
        return v(o)
    }

    function b(e, t) {
        var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            i = c(10),
            o = "HTML" === t.nodeName,
            r = y(e),
            a = y(t),
            u = l(e),
            d = s(t),
            h = parseFloat(d.borderTopWidth, 10),
            p = parseFloat(d.borderLeftWidth, 10);
        n && "HTML" === t.nodeName && (a.top = Math.max(a.top, 0), a.left = Math.max(a.left, 0));
        var m = v({
            top: r.top - a.top - h,
            left: r.left - a.left - p,
            width: r.width,
            height: r.height
        });
        if (m.marginTop = 0, m.marginLeft = 0, !i && o) {
            var g = parseFloat(d.marginTop, 10),
                b = parseFloat(d.marginLeft, 10);
            m.top -= h - g, m.bottom -= h - g, m.left -= p - b, m.right -= p - b, m.marginTop = g, m.marginLeft = b
        }
        return (i && !n ? t.contains(u) : t === u && "BODY" !== u.nodeName) && (m = function(e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
                i = f(t, "top"),
                o = f(t, "left"),
                r = n ? -1 : 1;
            return e.top += i * r, e.bottom += i * r, e.left += o * r, e.right += o * r, e
        }(m, t)), m
    }

    function w(e) {
        if (!e || !e.parentElement || c()) return document.documentElement;
        for (var t = e.parentElement; t && "none" === s(t, "transform");) t = t.parentElement;
        return t || document.documentElement
    }

    function C(e, t, n, i) {
        var o = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            r = {
                top: 0,
                left: 0
            },
            c = o ? w(e) : h(e, t);
        if ("viewport" === i) r = function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                n = e.ownerDocument.documentElement,
                i = b(e, n),
                o = Math.max(n.clientWidth, window.innerWidth || 0),
                r = Math.max(n.clientHeight, window.innerHeight || 0),
                s = t ? 0 : f(n),
                a = t ? 0 : f(n, "left");
            return v({
                top: s - i.top + i.marginTop,
                left: a - i.left + i.marginLeft,
                width: o,
                height: r
            })
        }(c, o);
        else {
            var u = void 0;
            "scrollParent" === i ? "BODY" === (u = l(a(t))).nodeName && (u = e.ownerDocument.documentElement) : u = "window" === i ? e.ownerDocument.documentElement : i;
            var d = b(u, c, o);
            if ("HTML" !== u.nodeName || function C(e) {
                    var t = e.nodeName;
                    return "BODY" !== t && "HTML" !== t && ("fixed" === s(e, "position") || C(a(e)))
                }(c)) r = d;
            else {
                var p = g(),
                    m = p.height,
                    y = p.width;
                r.top += d.top - d.marginTop, r.bottom = m + d.top, r.left += d.left - d.marginLeft, r.right = y + d.left
            }
        }
        return r.left += n, r.top += n, r.right -= n, r.bottom -= n, r
    }

    function _(e, t, n, i, o) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto")) return e;
        var s = C(n, i, r, o),
            a = {
                top: {
                    width: s.width,
                    height: t.top - s.top
                },
                right: {
                    width: s.right - t.right,
                    height: s.height
                },
                bottom: {
                    width: s.width,
                    height: s.bottom - t.bottom
                },
                left: {
                    width: t.left - s.left,
                    height: s.height
                }
            },
            l = Object.keys(a).map(function(e) {
                return gt({
                    key: e
                }, a[e], {
                    area: (t = a[e], t.width * t.height)
                });
                var t
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            c = l.filter(function(e) {
                var t = e.width,
                    i = e.height;
                return t >= n.clientWidth && i >= n.clientHeight
            }),
            u = 0 < c.length ? c[0].key : l[0].key,
            d = e.split("-")[1];
        return u + (d ? "-" + d : "")
    }

    function x(e, t, n) {
        var i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return b(n, i ? w(t) : h(t, n), i)
    }

    function $(e) {
        var t = getComputedStyle(e),
            n = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            i = parseFloat(t.marginLeft) + parseFloat(t.marginRight);
        return {
            width: e.offsetWidth + i,
            height: e.offsetHeight + n
        }
    }

    function E(e) {
        var t = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function T(e, t, n) {
        n = n.split("-")[0];
        var i = $(e),
            o = {
                width: i.width,
                height: i.height
            },
            r = -1 !== ["right", "left"].indexOf(n),
            s = r ? "top" : "left",
            a = r ? "left" : "top",
            l = r ? "height" : "width",
            c = r ? "width" : "height";
        return o[s] = t[s] + t[l] / 2 - i[l] / 2, o[a] = n === a ? t[a] - i[c] : t[E(a)], o
    }

    function S(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function k(e, t, n) {
        return (void 0 === n ? e : e.slice(0, function(e, t, n) {
            if (Array.prototype.findIndex) return e.findIndex(function(e) {
                return e[t] === n
            });
            var i = S(e, function(e) {
                return e[t] === n
            });
            return e.indexOf(i)
        }(e, "name", n))).forEach(function(e) {
            e["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var n = e["function"] || e.fn;
            e.enabled && r(n) && (t.offsets.popper = v(t.offsets.popper), t.offsets.reference = v(t.offsets.reference), t = n(t, e))
        }), t
    }

    function A(e, t) {
        return e.some(function(e) {
            var n = e.name;
            return e.enabled && n === t
        })
    }

    function D(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), i = 0; i < t.length; i++) {
            var o = t[i],
                r = o ? "" + o + n : e;
            if ("undefined" != typeof document.body.style[r]) return r
        }
        return null
    }

    function N(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function I(e, t, n, i) {
        n.updateBound = i, N(e).addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var o = l(e);
        return function r(e, t, n, i) {
            var o = "BODY" === e.nodeName,
                s = o ? e.ownerDocument.defaultView : e;
            s.addEventListener(t, n, {
                passive: !0
            }), o || r(l(s.parentNode), t, n, i), i.push(s)
        }(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n
    }

    function O() {
        var e, t;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (e = this.reference, t = this.state, N(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener("scroll", t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t))
    }

    function j(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function H(e, t) {
        Object.keys(t).forEach(function(n) {
            var i = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && j(t[n]) && (i = "px"),
                e.style[n] = t[n] + i
        })
    }

    function L(e, t, n) {
        var i = S(e, function(e) {
                return e.name === t
            }),
            o = !!i && e.some(function(e) {
                return e.name === n && e.enabled && e.order < i.order
            });
        if (!o) {
            var r = "`" + t + "`",
                s = "`" + n + "`";
            console.warn(s + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")
        }
        return o
    }

    function M(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            n = yt.indexOf(e),
            i = yt.slice(n + 1).concat(yt.slice(0, n));
        return t ? i.reverse() : i
    }

    function P(e, t, n, i) {
        var o = [0, 0],
            r = -1 !== ["right", "left"].indexOf(i),
            s = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            a = s.indexOf(S(s, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
        return (c = c.map(function(e, i) {
            var o = (1 === i ? !r : r) ? "height" : "width",
                s = !1;
            return e.reduce(function(e, t) {
                return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, s = !0, e) : s ? (e[e.length - 1] += t, s = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return function(e, t, n, i) {
                    var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        r = +o[1],
                        s = o[2];
                    if (!r) return e;
                    if (0 === s.indexOf("%")) {
                        var a = void 0;
                        switch (s) {
                            case "%p":
                                a = n;
                                break;
                            case "%":
                            case "%r":
                            default:
                                a = i
                        }
                        return v(a)[t] / 100 * r
                    }
                    return "vh" === s || "vw" === s ? ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r : r
                }(e, o, t, n)
            })
        })).forEach(function(e, t) {
            e.forEach(function(n, i) {
                j(n) && (o[t] += n * ("-" === e[i - 1] ? -1 : 1))
            })
        }), o
    }
    for (var q, W, F, B, R, z, Q, U, X, K, Y, V, G, Z, J, ee, te, ne, ie, oe, re, se, ae, le, ce, ue, de, he, fe, pe, me, ge, ve, ye, be, we, Ce, _e, xe, $e, Ee, Te, Se, ke, Ae, De, Ne, Ie, Oe, je, He, Le, Me, Pe, qe, We, Fe, Be, Re, ze, Qe, Ue, Xe, Ke, Ye, Ve, Ge, Ze, Je, et, tt, nt = function(e) {
            function t(t) {
                var n = this,
                    o = !1;
                return e(this).one(i.TRANSITION_END, function() {
                    o = !0
                }), setTimeout(function() {
                    o || i.triggerTransitionEnd(n)
                }, t), this
            }
            var n = "transitionend",
                i = {
                    TRANSITION_END: "bsTransitionEnd",
                    getUID: function(e) {
                        for (; e += ~~(1e6 * Math.random()), document.getElementById(e););
                        return e
                    },
                    getSelectorFromElement: function(e) {
                        var t = e.getAttribute("data-target");
                        t && "#" !== t || (t = e.getAttribute("href") || "");
                        try {
                            return document.querySelector(t) ? t : null
                        } catch (e) {
                            return null
                        }
                    },
                    getTransitionDurationFromElement: function(t) {
                        if (!t) return 0;
                        var n = e(t).css("transition-duration");
                        return parseFloat(n) ? (n = n.split(",")[0], 1e3 * parseFloat(n)) : 0
                    },
                    reflow: function(e) {
                        return e.offsetHeight
                    },
                    triggerTransitionEnd: function(t) {
                        e(t).trigger(n)
                    },
                    supportsTransitionEnd: function() {
                        return Boolean(n)
                    },
                    isElement: function(e) {
                        return (e[0] || e).nodeType
                    },
                    typeCheckConfig: function(e, t, n) {
                        for (var o in n)
                            if (Object.prototype.hasOwnProperty.call(n, o)) {
                                var r = n[o],
                                    s = t[o],
                                    a = s && i.isElement(s) ? "element" : (l = s, {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase());
                                if (!new RegExp(r).test(a)) throw new Error(e.toUpperCase() + ': Option "' + o + '" provided type "' + a + '" but expected type "' + r + '".')
                            }
                        var l
                    }
                };
            return e.fn.emulateTransitionEnd = t, e.event.special[i.TRANSITION_END] = {
                bindType: n,
                delegateType: n,
                handle: function(t) {
                    return e(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : void 0
                }
            }, i
        }(t = t && t.hasOwnProperty("default") ? t["default"] : t), it = (W = "alert", B = "." + (F = "bs.alert"), R = (q = t).fn[W], z = {
            CLOSE: "close" + B,
            CLOSED: "closed" + B,
            CLICK_DATA_API: "click" + B + ".data-api"
        }, Q = "alert", U = "fade", X = "show", K = function() {
            function e(e) {
                this._element = e
            }
            var t = e.prototype;
            return t.close = function(e) {
                var t = this._element;
                e && (t = this._getRootElement(e)), this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
            }, t.dispose = function() {
                q.removeData(this._element, F), this._element = null
            }, t._getRootElement = function(e) {
                var t = nt.getSelectorFromElement(e),
                    n = !1;
                return t && (n = document.querySelector(t)), n || (n = q(e).closest("." + Q)[0]), n
            }, t._triggerCloseEvent = function(e) {
                var t = q.Event(z.CLOSE);
                return q(e).trigger(t), t
            }, t._removeElement = function(e) {
                var t = this;
                if (q(e).removeClass(X), q(e).hasClass(U)) {
                    var n = nt.getTransitionDurationFromElement(e);
                    q(e).one(nt.TRANSITION_END, function(n) {
                        return t._destroyElement(e, n)
                    }).emulateTransitionEnd(n)
                } else this._destroyElement(e)
            }, t._destroyElement = function(e) {
                q(e).detach().trigger(z.CLOSED).remove()
            }, e._jQueryInterface = function(t) {
                return this.each(function() {
                    var n = q(this),
                        i = n.data(F);
                    i || (i = new e(this), n.data(F, i)), "close" === t && i[t](this)
                })
            }, e._handleDismiss = function(e) {
                return function(t) {
                    t && t.preventDefault(), e.close(this)
                }
            }, i(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }]), e
        }(), q(document).on(z.CLICK_DATA_API, '[data-dismiss="alert"]', K._handleDismiss(new K)), q.fn[W] = K._jQueryInterface, q.fn[W].Constructor = K, q.fn[W].noConflict = function() {
            return q.fn[W] = R, K._jQueryInterface
        }, K), ot = (V = "button", Z = "." + (G = "bs.button"), J = ".data-api", ee = (Y = t).fn[V], te = "active", ne = "btn", oe = '[data-toggle^="button"]', re = '[data-toggle="buttons"]', se = "input", ae = ".active", le = ".btn", ce = {
            CLICK_DATA_API: "click" + Z + J,
            FOCUS_BLUR_DATA_API: (ie = "focus") + Z + J + " blur" + Z + J
        }, ue = function() {
            function e(e) {
                this._element = e
            }
            var t = e.prototype;
            return t.toggle = function() {
                var e = !0,
                    t = !0,
                    n = Y(this._element).closest(re)[0];
                if (n) {
                    var i = this._element.querySelector(se);
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && this._element.classList.contains(te)) e = !1;
                            else {
                                var o = n.querySelector(ae);
                                o && Y(o).removeClass(te)
                            }
                        if (e) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            i.checked = !this._element.classList.contains(te), Y(i).trigger("change")
                        }
                        i.focus(), t = !1
                    }
                }
                t && this._element.setAttribute("aria-pressed", !this._element.classList.contains(te)), e && Y(this._element).toggleClass(te)
            }, t.dispose = function() {
                Y.removeData(this._element, G), this._element = null
            }, e._jQueryInterface = function(t) {
                return this.each(function() {
                    var n = Y(this).data(G);
                    n || (n = new e(this), Y(this).data(G, n)), "toggle" === t && n[t]()
                })
            }, i(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }]), e
        }(), Y(document).on(ce.CLICK_DATA_API, oe, function(e) {
            e.preventDefault();
            var t = e.target;
            Y(t).hasClass(ne) || (t = Y(t).closest(le)), ue._jQueryInterface.call(Y(t), "toggle")
        }).on(ce.FOCUS_BLUR_DATA_API, oe, function(e) {
            var t = Y(e.target).closest(le)[0];
            Y(t).toggleClass(ie, /^focus(in)?$/.test(e.type))
        }), Y.fn[V] = ue._jQueryInterface, Y.fn[V].Constructor = ue, Y.fn[V].noConflict = function() {
            return Y.fn[V] = ee, ue._jQueryInterface
        }, ue), rt = (he = "carousel", pe = "." + (fe = "bs.carousel"), me = ".data-api", ge = (de = t).fn[he], ve = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0
        }, ye = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean"
        }, be = "next", we = "prev", Ce = "left", _e = "right", xe = {
            SLIDE: "slide" + pe,
            SLID: "slid" + pe,
            KEYDOWN: "keydown" + pe,
            MOUSEENTER: "mouseenter" + pe,
            MOUSELEAVE: "mouseleave" + pe,
            TOUCHEND: "touchend" + pe,
            LOAD_DATA_API: "load" + pe + me,
            CLICK_DATA_API: "click" + pe + me
        }, $e = "carousel", Ee = "active", Te = "slide", Se = "carousel-item-right", ke = "carousel-item-left", Ae = "carousel-item-next", De = "carousel-item-prev", Ne = ".active", Ie = ".active.carousel-item", Oe = ".carousel-item", je = ".carousel-item-next, .carousel-item-prev", He = ".carousel-indicators", Le = "[data-slide], [data-slide-to]", Me = '[data-ride="carousel"]', Pe = function() {
            function e(e, t) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(t), this._element = de(e)[0], this._indicatorsElement = this._element.querySelector(He), this._addEventListeners()
            }
            var t = e.prototype;
            return t.next = function() {
                this._isSliding || this._slide(be)
            }, t.nextWhenVisible = function() {
                !document.hidden && de(this._element).is(":visible") && "hidden" !== de(this._element).css("visibility") && this.next()
            }, t.prev = function() {
                this._isSliding || this._slide(we)
            }, t.pause = function(e) {
                e || (this._isPaused = !0), this._element.querySelector(je) && (nt.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, t.cycle = function(e) {
                e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, t.to = function(e) {
                var t = this;
                this._activeElement = this._element.querySelector(Ie);
                var n = this._getItemIndex(this._activeElement);
                if (!(e > this._items.length - 1 || 0 > e))
                    if (this._isSliding) de(this._element).one(xe.SLID, function() {
                        return t.to(e)
                    });
                    else {
                        if (n === e) return this.pause(), void this.cycle();
                        var i = e > n ? be : we;
                        this._slide(i, this._items[e])
                    }
            }, t.dispose = function() {
                de(this._element).off(pe), de.removeData(this._element, fe), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, t._getConfig = function(e) {
                return e = o({}, ve, e), nt.typeCheckConfig(he, e, ye), e
            }, t._addEventListeners = function() {
                var e = this;
                this._config.keyboard && de(this._element).on(xe.KEYDOWN, function(t) {
                    return e._keydown(t)
                }), "hover" === this._config.pause && (de(this._element).on(xe.MOUSEENTER, function(t) {
                    return e.pause(t)
                }).on(xe.MOUSELEAVE, function(t) {
                    return e.cycle(t)
                }), "ontouchstart" in document.documentElement && de(this._element).on(xe.TOUCHEND, function() {
                    e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function(t) {
                        return e.cycle(t)
                    }, 500 + e._config.interval)
                }))
            }, t._keydown = function(e) {
                if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
                    case 37:
                        e.preventDefault(), this.prev();
                        break;
                    case 39:
                        e.preventDefault(), this.next()
                }
            }, t._getItemIndex = function(e) {
                return this._items = e && e.parentNode ? [].slice.call(e.parentNode.querySelectorAll(Oe)) : [], this._items.indexOf(e)
            }, t._getItemByDirection = function(e, t) {
                var n = e === be,
                    i = e === we,
                    o = this._getItemIndex(t),
                    r = this._items.length - 1;
                if ((i && 0 === o || n && o === r) && !this._config.wrap) return t;
                var s = (o + (e === we ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, t._triggerSlideEvent = function(e, t) {
                var n = this._getItemIndex(e),
                    i = this._getItemIndex(this._element.querySelector(Ie)),
                    o = de.Event(xe.SLIDE, {
                        relatedTarget: e,
                        direction: t,
                        from: i,
                        to: n
                    });
                return de(this._element).trigger(o), o
            }, t._setActiveIndicatorElement = function(e) {
                if (this._indicatorsElement) {
                    var t = [].slice.call(this._indicatorsElement.querySelectorAll(Ne));
                    de(t).removeClass(Ee);
                    var n = this._indicatorsElement.children[this._getItemIndex(e)];
                    n && de(n).addClass(Ee)
                }
            }, t._slide = function(e, t) {
                var n, i, o, r = this,
                    s = this._element.querySelector(Ie),
                    a = this._getItemIndex(s),
                    l = t || s && this._getItemByDirection(e, s),
                    c = this._getItemIndex(l),
                    u = Boolean(this._interval);
                if (e === be ? (n = ke, i = Ae, o = Ce) : (n = Se, i = De, o = _e), l && de(l).hasClass(Ee)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(l, o).isDefaultPrevented() && s && l) {
                    this._isSliding = !0, u && this.pause(), this._setActiveIndicatorElement(l);
                    var d = de.Event(xe.SLID, {
                        relatedTarget: l,
                        direction: o,
                        from: a,
                        to: c
                    });
                    if (de(this._element).hasClass(Te)) {
                        de(l).addClass(i), nt.reflow(l), de(s).addClass(n), de(l).addClass(n);
                        var h = nt.getTransitionDurationFromElement(s);
                        de(s).one(nt.TRANSITION_END, function() {
                            de(l).removeClass(n + " " + i).addClass(Ee), de(s).removeClass(Ee + " " + i + " " + n), r._isSliding = !1, setTimeout(function() {
                                return de(r._element).trigger(d)
                            }, 0)
                        }).emulateTransitionEnd(h)
                    } else de(s).removeClass(Ee), de(l).addClass(Ee), this._isSliding = !1, de(this._element).trigger(d);
                    u && this.cycle()
                }
            }, e._jQueryInterface = function(t) {
                return this.each(function() {
                    var n = de(this).data(fe),
                        i = o({}, ve, de(this).data());
                    "object" == typeof t && (i = o({}, i, t));
                    var r = "string" == typeof t ? t : i.slide;
                    if (n || (n = new e(this, i), de(this).data(fe, n)), "number" == typeof t) n.to(t);
                    else if ("string" == typeof r) {
                        if ("undefined" == typeof n[r]) throw new TypeError('No method named "' + r + '"');
                        n[r]()
                    } else i.interval && (n.pause(), n.cycle())
                })
            }, e._dataApiClickHandler = function(t) {
                var n = nt.getSelectorFromElement(this);
                if (n) {
                    var i = de(n)[0];
                    if (i && de(i).hasClass($e)) {
                        var r = o({}, de(i).data(), de(this).data()),
                            s = this.getAttribute("data-slide-to");
                        s && (r.interval = !1), e._jQueryInterface.call(de(i), r), s && de(i).data(fe).to(s), t.preventDefault()
                    }
                }
            }, i(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return ve
                }
            }]), e
        }(), de(document).on(xe.CLICK_DATA_API, Le, Pe._dataApiClickHandler), de(window).on(xe.LOAD_DATA_API, function() {
            for (var e = [].slice.call(document.querySelectorAll(Me)), t = 0, n = e.length; n > t; t++) {
                var i = de(e[t]);
                Pe._jQueryInterface.call(i, i.data())
            }
        }), de.fn[he] = Pe._jQueryInterface, de.fn[he].Constructor = Pe, de.fn[he].noConflict = function() {
            return de.fn[he] = ge, Pe._jQueryInterface
        }, Pe), st = (We = "collapse", Be = "." + (Fe = "bs.collapse"), Re = (qe = t).fn[We], ze = {
            toggle: !0,
            parent: ""
        }, Qe = {
            toggle: "boolean",
            parent: "(string|element)"
        }, Ue = {
            SHOW: "show" + Be,
            SHOWN: "shown" + Be,
            HIDE: "hide" + Be,
            HIDDEN: "hidden" + Be,
            CLICK_DATA_API: "click" + Be + ".data-api"
        }, Xe = "show", Ke = "collapse", Ye = "collapsing", Ve = "collapsed", Ge = "width", Ze = "height", Je = ".show, .collapsing", et = '[data-toggle="collapse"]', tt = function() {
            function e(e, t) {
                this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = qe.makeArray(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(et)), i = 0, o = n.length; o > i; i++) {
                    var r = n[i],
                        s = nt.getSelectorFromElement(r),
                        a = [].slice.call(document.querySelectorAll(s)).filter(function(t) {
                            return t === e
                        });
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(r))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var t = e.prototype;
            return t.toggle = function() {
                qe(this._element).hasClass(Xe) ? this.hide() : this.show()
            }, t.show = function() {
                var t, n, i = this;
                if (!(this._isTransitioning || qe(this._element).hasClass(Xe) || (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(Je)).filter(function(e) {
                        return e.getAttribute("data-parent") === i._config.parent
                    })).length && (t = null), t && (n = qe(t).not(this._selector).data(Fe)) && n._isTransitioning))) {
                    var o = qe.Event(Ue.SHOW);
                    if (qe(this._element).trigger(o), !o.isDefaultPrevented()) {
                        t && (e._jQueryInterface.call(qe(t).not(this._selector), "hide"), n || qe(t).data(Fe, null));
                        var r = this._getDimension();
                        qe(this._element).removeClass(Ke).addClass(Ye), this._element.style[r] = 0, this._triggerArray.length && qe(this._triggerArray).removeClass(Ve).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var s = "scroll" + (r[0].toUpperCase() + r.slice(1)),
                            a = nt.getTransitionDurationFromElement(this._element);
                        qe(this._element).one(nt.TRANSITION_END, function() {
                            qe(i._element).removeClass(Ye).addClass(Ke).addClass(Xe), i._element.style[r] = "", i.setTransitioning(!1), qe(i._element).trigger(Ue.SHOWN)
                        }).emulateTransitionEnd(a), this._element.style[r] = this._element[s] + "px"
                    }
                }
            }, t.hide = function() {
                var e = this;
                if (!this._isTransitioning && qe(this._element).hasClass(Xe)) {
                    var t = qe.Event(Ue.HIDE);
                    if (qe(this._element).trigger(t), !t.isDefaultPrevented()) {
                        var n = this._getDimension();
                        this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", nt.reflow(this._element), qe(this._element).addClass(Ye).removeClass(Ke).removeClass(Xe);
                        var i = this._triggerArray.length;
                        if (i > 0)
                            for (var o = 0; i > o; o++) {
                                var r = this._triggerArray[o],
                                    s = nt.getSelectorFromElement(r);
                                null !== s && (qe([].slice.call(document.querySelectorAll(s))).hasClass(Xe) || qe(r).addClass(Ve).attr("aria-expanded", !1))
                            }
                        this.setTransitioning(!0), this._element.style[n] = "";
                        var a = nt.getTransitionDurationFromElement(this._element);
                        qe(this._element).one(nt.TRANSITION_END, function() {
                            e.setTransitioning(!1), qe(e._element).removeClass(Ye).addClass(Ke).trigger(Ue.HIDDEN)
                        }).emulateTransitionEnd(a)
                    }
                }
            }, t.setTransitioning = function(e) {
                this._isTransitioning = e
            }, t.dispose = function() {
                qe.removeData(this._element, Fe), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, t._getConfig = function(e) {
                return (e = o({}, ze, e)).toggle = Boolean(e.toggle), nt.typeCheckConfig(We, e, Qe), e
            }, t._getDimension = function() {
                return qe(this._element).hasClass(Ge) ? Ge : Ze
            }, t._getParent = function() {
                var t = this,
                    n = null;
                nt.isElement(this._config.parent) ? (n = this._config.parent, "undefined" != typeof this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent);
                var i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    o = [].slice.call(n.querySelectorAll(i));
                return qe(o).each(function(n, i) {
                    t._addAriaAndCollapsedClass(e._getTargetFromElement(i), [i])
                }), n
            }, t._addAriaAndCollapsedClass = function(e, t) {
                if (e) {
                    var n = qe(e).hasClass(Xe);
                    t.length && qe(t).toggleClass(Ve, !n).attr("aria-expanded", n)
                }
            }, e._getTargetFromElement = function(e) {
                var t = nt.getSelectorFromElement(e);
                return t ? document.querySelector(t) : null
            }, e._jQueryInterface = function(t) {
                return this.each(function() {
                    var n = qe(this),
                        i = n.data(Fe),
                        r = o({}, ze, n.data(), "object" == typeof t && t ? t : {});
                    if (!i && r.toggle && /show|hide/.test(t) && (r.toggle = !1), i || (i = new e(this, r), n.data(Fe, i)), "string" == typeof t) {
                        if ("undefined" == typeof i[t]) throw new TypeError('No method named "' + t + '"');
                        i[t]()
                    }
                })
            }, i(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return ze
                }
            }]), e
        }(), qe(document).on(Ue.CLICK_DATA_API, et, function(e) {
            "A" === e.currentTarget.tagName && e.preventDefault();
            var t = qe(this),
                n = nt.getSelectorFromElement(this),
                i = [].slice.call(document.querySelectorAll(n));
            qe(i).each(function() {
                var e = qe(this),
                    n = e.data(Fe) ? "toggle" : t.data();
                tt._jQueryInterface.call(e, n)
            })
        }), qe.fn[We] = tt._jQueryInterface, qe.fn[We].Constructor = tt, qe.fn[We].noConflict = function() {
            return qe.fn[We] = Re, tt._jQueryInterface
        }, tt), at = "undefined" != typeof window && "undefined" != typeof document, lt = ["Edge", "Trident", "Firefox"], ct = 0, ut = 0; ut < lt.length; ut += 1)
        if (at && 0 <= navigator.userAgent.indexOf(lt[ut])) {
            ct = 1;
            break
        }
    var dt = at && window.Promise ? function(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e()
                }))
            }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, ct))
            }
        },
        ht = at && !(!window.MSInputMethodContext || !document.documentMode),
        ft = at && /MSIE 10/.test(navigator.userAgent),
        pt = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t
            }
        }(),
        mt = function(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        },
        gt = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        },
        vt = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        yt = vt.slice(3),
        bt = "flip",
        wt = "clockwise",
        Ct = "counterclockwise",
        _t = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function() {},
            onUpdate: function() {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function(e) {
                        var t = e.placement,
                            n = t.split("-")[0],
                            i = t.split("-")[1];
                        if (i) {
                            var o = e.offsets,
                                r = o.reference,
                                s = o.popper,
                                a = -1 !== ["bottom", "top"].indexOf(n),
                                l = a ? "left" : "top",
                                c = a ? "width" : "height",
                                u = {
                                    start: mt({}, l, r[l]),
                                    end: mt({}, l, r[l] + r[c] - s[c])
                                };
                            e.offsets.popper = gt({}, s, u[i])
                        }
                        return e
                    }
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: function(e, t) {
                        var n = t.offset,
                            i = e.placement,
                            o = e.offsets,
                            r = o.popper,
                            s = o.reference,
                            a = i.split("-")[0],
                            l = void 0;
                        return l = j(+n) ? [+n, 0] : P(n, r, s, a), "left" === a ? (r.top += l[0], r.left -= l[1]) : "right" === a ? (r.top += l[0], r.left += l[1]) : "top" === a ? (r.left += l[0], r.top -= l[1]) : "bottom" === a && (r.left += l[0], r.top += l[1]), e.popper = r, e
                    },
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function(e, t) {
                        var n = t.boundariesElement || u(e.instance.popper);
                        e.instance.reference === n && (n = u(n));
                        var i = D("transform"),
                            o = e.instance.popper.style,
                            r = o.top,
                            s = o.left,
                            a = o[i];
                        o.top = "", o.left = "", o[i] = "";
                        var l = C(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
                        o.top = r, o.left = s, o[i] = a, t.boundaries = l;
                        var c = t.priority,
                            d = e.offsets.popper,
                            h = {
                                primary: function(e) {
                                    var n = d[e];
                                    return d[e] < l[e] && !t.escapeWithReference && (n = Math.max(d[e], l[e])), mt({}, e, n)
                                },
                                secondary: function(e) {
                                    var n = "right" === e ? "left" : "top",
                                        i = d[n];
                                    return d[e] > l[e] && !t.escapeWithReference && (i = Math.min(d[n], l[e] - ("right" === e ? d.width : d.height))), mt({}, n, i)
                                }
                            };
                        return c.forEach(function(e) {
                            var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                            d = gt({}, d, h[t](e))
                        }), e.offsets.popper = d, e
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function(e) {
                        var t = e.offsets,
                            n = t.popper,
                            i = t.reference,
                            o = e.placement.split("-")[0],
                            r = Math.floor,
                            s = -1 !== ["top", "bottom"].indexOf(o),
                            a = s ? "right" : "bottom",
                            l = s ? "left" : "top",
                            c = s ? "width" : "height";
                        return n[a] < r(i[l]) && (e.offsets.popper[l] = r(i[l]) - n[c]), n[l] > r(i[a]) && (e.offsets.popper[l] = r(i[a])), e
                    }
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function(e, t) {
                        var n;
                        if (!L(e.instance.modifiers, "arrow", "keepTogether")) return e;
                        var i = t.element;
                        if ("string" == typeof i) {
                            if (!(i = e.instance.popper.querySelector(i))) return e
                        } else if (!e.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                        var o = e.placement.split("-")[0],
                            r = e.offsets,
                            a = r.popper,
                            l = r.reference,
                            c = -1 !== ["left", "right"].indexOf(o),
                            u = c ? "height" : "width",
                            d = c ? "Top" : "Left",
                            h = d.toLowerCase(),
                            f = c ? "left" : "top",
                            p = c ? "bottom" : "right",
                            m = $(i)[u];
                        l[p] - m < a[h] && (e.offsets.popper[h] -= a[h] - (l[p] - m)), l[h] + m > a[p] && (e.offsets.popper[h] += l[h] + m - a[p]), e.offsets.popper = v(e.offsets.popper);
                        var g = l[h] + l[u] / 2 - m / 2,
                            y = s(e.instance.popper),
                            b = parseFloat(y["margin" + d], 10),
                            w = parseFloat(y["border" + d + "Width"], 10),
                            C = g - e.offsets.popper[h] - b - w;
                        return C = Math.max(Math.min(a[u] - m, C), 0), e.arrowElement = i, e.offsets.arrow = (mt(n = {}, h, Math.round(C)), mt(n, f, ""), n), e
                    },
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function(e, t) {
                        if (A(e.instance.modifiers, "inner")) return e;
                        if (e.flipped && e.placement === e.originalPlacement) return e;
                        var n = C(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                            i = e.placement.split("-")[0],
                            o = E(i),
                            r = e.placement.split("-")[1] || "",
                            s = [];
                        switch (t.behavior) {
                            case bt:
                                s = [i, o];
                                break;
                            case wt:
                                s = M(i);
                                break;
                            case Ct:
                                s = M(i, !0);
                                break;
                            default:
                                s = t.behavior
                        }
                        return s.forEach(function(a, l) {
                            if (i !== a || s.length === l + 1) return e;
                            i = e.placement.split("-")[0], o = E(i);
                            var c, u = e.offsets.popper,
                                d = e.offsets.reference,
                                h = Math.floor,
                                f = "left" === i && h(u.right) > h(d.left) || "right" === i && h(u.left) < h(d.right) || "top" === i && h(u.bottom) > h(d.top) || "bottom" === i && h(u.top) < h(d.bottom),
                                p = h(u.left) < h(n.left),
                                m = h(u.right) > h(n.right),
                                g = h(u.top) < h(n.top),
                                v = h(u.bottom) > h(n.bottom),
                                y = "left" === i && p || "right" === i && m || "top" === i && g || "bottom" === i && v,
                                b = -1 !== ["top", "bottom"].indexOf(i),
                                w = !!t.flipVariations && (b && "start" === r && p || b && "end" === r && m || !b && "start" === r && g || !b && "end" === r && v);
                            (f || y || w) && (e.flipped = !0, (f || y) && (i = s[l + 1]), w && (r = "end" === (c = r) ? "start" : "start" === c ? "end" : c), e.placement = i + (r ? "-" + r : ""), e.offsets.popper = gt({}, e.offsets.popper, T(e.instance.popper, e.offsets.reference, e.placement)), e = k(e.instance.modifiers, e, "flip"))
                        }), e
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport"
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function(e) {
                        var t = e.placement,
                            n = t.split("-")[0],
                            i = e.offsets,
                            o = i.popper,
                            r = i.reference,
                            s = -1 !== ["left", "right"].indexOf(n),
                            a = -1 === ["top", "left"].indexOf(n);
                        return o[s ? "left" : "top"] = r[n] - (a ? o[s ? "width" : "height"] : 0), e.placement = E(t), e.offsets.popper = v(o), e
                    }
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function(e) {
                        if (!L(e.instance.modifiers, "hide", "preventOverflow")) return e;
                        var t = e.offsets.reference,
                            n = S(e.instance.modifiers, function(e) {
                                return "preventOverflow" === e.name
                            }).boundaries;
                        if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                            if (!0 === e.hide) return e;
                            e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                        } else {
                            if (!1 === e.hide) return e;
                            e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                        }
                        return e
                    }
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function(e, t) {
                        var n = t.x,
                            i = t.y,
                            o = e.offsets.popper,
                            r = S(e.instance.modifiers, function(e) {
                                return "applyStyle" === e.name
                            }).gpuAcceleration;
                        void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                        var s = void 0 !== r ? r : t.gpuAcceleration,
                            a = y(u(e.instance.popper)),
                            l = {
                                position: o.position
                            },
                            c = {
                                left: Math.floor(o.left),
                                top: Math.round(o.top),
                                bottom: Math.round(o.bottom),
                                right: Math.floor(o.right)
                            },
                            d = "bottom" === n ? "top" : "bottom",
                            h = "right" === i ? "left" : "right",
                            f = D("transform"),
                            p = void 0,
                            m = void 0;
                        if (m = "bottom" === d ? -a.height + c.bottom : c.top, p = "right" === h ? -a.width + c.right : c.left, s && f) l[f] = "translate3d(" + p + "px, " + m + "px, 0)", l[d] = 0, l[h] = 0, l.willChange = "transform";
                        else {
                            var g = "bottom" === d ? -1 : 1,
                                v = "right" === h ? -1 : 1;
                            l[d] = m * g, l[h] = p * v, l.willChange = d + ", " + h
                        }
                        var b = {
                            "x-placement": e.placement
                        };
                        return e.attributes = gt({}, b, e.attributes), e.styles = gt({}, l, e.styles), e.arrowStyles = gt({}, e.offsets.arrow, e.arrowStyles), e
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function(e) {
                        var t, n;
                        return H(e.instance.popper, e.styles), t = e.instance.popper, n = e.attributes, Object.keys(n).forEach(function(e) {
                            !1 !== n[e] ? t.setAttribute(e, n[e]) : t.removeAttribute(e)
                        }), e.arrowElement && Object.keys(e.arrowStyles).length && H(e.arrowElement, e.arrowStyles), e
                    },
                    onLoad: function(e, t, n, i, o) {
                        var r = x(o, t, e, n.positionFixed),
                            s = _(n.placement, r, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                        return t.setAttribute("x-placement", s), H(t, {
                            position: n.positionFixed ? "fixed" : "absolute"
                        }), n
                    },
                    gpuAcceleration: void 0
                }
            }
        },
        xt = function() {
            function e(t, n) {
                var i = this,
                    o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.scheduleUpdate = function() {
                    return requestAnimationFrame(i.update)
                }, this.update = dt(this.update.bind(this)), this.options = gt({}, e.Defaults, o), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = t && t.jquery ? t[0] : t, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(gt({}, e.Defaults.modifiers, o.modifiers)).forEach(function(t) {
                    i.options.modifiers[t] = gt({}, e.Defaults.modifiers[t] || {}, o.modifiers ? o.modifiers[t] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return gt({
                        name: e
                    }, i.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(e) {
                    e.enabled && r(e.onLoad) && e.onLoad(i.reference, i.popper, i.options, e, i.state)
                }), this.update();
                var s = this.options.eventsEnabled;
                s && this.enableEventListeners(), this.state.eventsEnabled = s
            }
            return pt(e, [{
                key: "update",
                value: function() {
                    return function() {
                        if (!this.state.isDestroyed) {
                            var e = {
                                instance: this,
                                styles: {},
                                arrowStyles: {},
                                attributes: {},
                                flipped: !1,
                                offsets: {}
                            };
                            e.offsets.reference = x(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = _(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = T(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = k(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
                        }
                    }.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return function() {
                        return this.state.isDestroyed = !0, A(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[D("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                    }.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return function() {
                        this.state.eventsEnabled || (this.state = I(this.reference, this.options, this.state, this.scheduleUpdate))
                    }.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return O.call(this)
                }
            }]), e
        }();
    xt.Utils = ("undefined" != typeof window ? window : global).PopperUtils, xt.placements = vt, xt.Defaults = _t;
    var $t, Et, Tt, St, kt, At, Dt, Nt, It, Ot, jt, Ht, Lt, Mt, Pt, qt, Wt, Ft, Bt, Rt, zt, Qt, Ut, Xt, Kt, Yt, Vt, Gt, Zt, Jt, en, tn, nn, on, rn, sn, an, ln, cn, un, dn, hn, fn, pn, mn, gn, vn, yn, bn, wn, Cn, _n, xn, $n, En, Tn, Sn, kn, An, Dn, Nn, In, On, jn, Hn, Ln, Mn, Pn, qn, Wn, Fn, Bn, Rn, zn, Qn, Un, Xn, Kn, Yn, Vn, Gn, Zn, Jn, ei, ti, ni, ii, oi, ri, si, ai, li, ci, ui, di, hi, fi, pi, mi, gi, vi, yi, bi, wi, Ci, _i, xi, $i, Ei, Ti, Si, ki, Ai, Di, Ni, Ii, Oi, ji, Hi, Li, Mi, Pi, qi, Wi, Fi, Bi = (Et = "dropdown", St = "." + (Tt = "bs.dropdown"), kt = ".data-api", At = ($t = t).fn[Et], Dt = new RegExp("38|40|27"), Nt = {
            HIDE: "hide" + St,
            HIDDEN: "hidden" + St,
            SHOW: "show" + St,
            SHOWN: "shown" + St,
            CLICK: "click" + St,
            CLICK_DATA_API: "click" + St + kt,
            KEYDOWN_DATA_API: "keydown" + St + kt,
            KEYUP_DATA_API: "keyup" + St + kt
        }, It = "disabled", Ot = "show", jt = "dropup", Ht = "dropright", Lt = "dropleft", Mt = "dropdown-menu-right", Pt = "position-static", qt = '[data-toggle="dropdown"]', Wt = ".dropdown form", Ft = ".dropdown-menu", Bt = ".navbar-nav", Rt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", zt = "top-start", Qt = "top-end", Ut = "bottom-start", Xt = "bottom-end", Kt = "right-start", Yt = "left-start", Vt = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        }, Gt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        }, Zt = function() {
            function e(e, t) {
                this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var t = e.prototype;
            return t.toggle = function() {
                if (!this._element.disabled && !$t(this._element).hasClass(It)) {
                    var t = e._getParentFromElement(this._element),
                        n = $t(this._menu).hasClass(Ot);
                    if (e._clearMenus(), !n) {
                        var i = {
                                relatedTarget: this._element
                            },
                            o = $t.Event(Nt.SHOW, i);
                        if ($t(t).trigger(o), !o.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if ("undefined" == typeof xt) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                var r = this._element;
                                "parent" === this._config.reference ? r = t : nt.isElement(this._config.reference) && (r = this._config.reference, "undefined" != typeof this._config.reference.jquery && (r = this._config.reference[0])), "scrollParent" !== this._config.boundary && $t(t).addClass(Pt), this._popper = new xt(r, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === $t(t).closest(Bt).length && $t(document.body).children().on("mouseover", null, $t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), $t(this._menu).toggleClass(Ot), $t(t).toggleClass(Ot).trigger($t.Event(Nt.SHOWN, i))
                        }
                    }
                }
            }, t.dispose = function() {
                $t.removeData(this._element, Tt), $t(this._element).off(St), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, t.update = function() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, t._addEventListeners = function() {
                var e = this;
                $t(this._element).on(Nt.CLICK, function(t) {
                    t.preventDefault(), t.stopPropagation(), e.toggle()
                })
            }, t._getConfig = function(e) {
                return e = o({}, this.constructor.Default, $t(this._element).data(), e), nt.typeCheckConfig(Et, e, this.constructor.DefaultType), e
            }, t._getMenuElement = function() {
                if (!this._menu) {
                    var t = e._getParentFromElement(this._element);
                    t && (this._menu = t.querySelector(Ft))
                }
                return this._menu
            }, t._getPlacement = function() {
                var e = $t(this._element.parentNode),
                    t = Ut;
                return e.hasClass(jt) ? (t = zt, $t(this._menu).hasClass(Mt) && (t = Qt)) : e.hasClass(Ht) ? t = Kt : e.hasClass(Lt) ? t = Yt : $t(this._menu).hasClass(Mt) && (t = Xt), t
            }, t._detectNavbar = function() {
                return 0 < $t(this._element).closest(".navbar").length
            }, t._getPopperConfig = function() {
                var e = this,
                    t = {};
                "function" == typeof this._config.offset ? t.fn = function(t) {
                    return t.offsets = o({}, t.offsets, e._config.offset(t.offsets) || {}), t
                } : t.offset = this._config.offset;
                var n = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: t,
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (n.modifiers.applyStyle = {
                    enabled: !1
                }), n
            }, e._jQueryInterface = function(t) {
                return this.each(function() {
                    var n = $t(this).data(Tt);
                    if (n || (n = new e(this, "object" == typeof t ? t : null), $t(this).data(Tt, n)), "string" == typeof t) {
                        if ("undefined" == typeof n[t]) throw new TypeError('No method named "' + t + '"');
                        n[t]()
                    }
                })
            }, e._clearMenus = function(t) {
                if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                    for (var n = [].slice.call(document.querySelectorAll(qt)), i = 0, o = n.length; o > i; i++) {
                        var r = e._getParentFromElement(n[i]),
                            s = $t(n[i]).data(Tt),
                            a = {
                                relatedTarget: n[i]
                            };
                        if (t && "click" === t.type && (a.clickEvent = t), s) {
                            var l = s._menu;
                            if ($t(r).hasClass(Ot) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && $t.contains(r, t.target))) {
                                var c = $t.Event(Nt.HIDE, a);
                                $t(r).trigger(c), c.isDefaultPrevented() || ("ontouchstart" in document.documentElement && $t(document.body).children().off("mouseover", null, $t.noop),
                                    n[i].setAttribute("aria-expanded", "false"), $t(l).removeClass(Ot), $t(r).removeClass(Ot).trigger($t.Event(Nt.HIDDEN, a)))
                            }
                        }
                    }
            }, e._getParentFromElement = function(e) {
                var t, n = nt.getSelectorFromElement(e);
                return n && (t = document.querySelector(n)), t || e.parentNode
            }, e._dataApiKeydownHandler = function(t) {
                if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || $t(t.target).closest(Ft).length)) : Dt.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !$t(this).hasClass(It))) {
                    var n = e._getParentFromElement(this),
                        i = $t(n).hasClass(Ot);
                    if ((i || 27 === t.which && 32 === t.which) && (!i || 27 !== t.which && 32 !== t.which)) {
                        var o = [].slice.call(n.querySelectorAll(Rt));
                        if (0 !== o.length) {
                            var r = o.indexOf(t.target);
                            38 === t.which && r > 0 && r--, 40 === t.which && r < o.length - 1 && r++, 0 > r && (r = 0), o[r].focus()
                        }
                    } else {
                        if (27 === t.which) {
                            var s = n.querySelector(qt);
                            $t(s).trigger("focus")
                        }
                        $t(this).trigger("click")
                    }
                }
            }, i(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return Vt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Gt
                }
            }]), e
        }(), $t(document).on(Nt.KEYDOWN_DATA_API, qt, Zt._dataApiKeydownHandler).on(Nt.KEYDOWN_DATA_API, Ft, Zt._dataApiKeydownHandler).on(Nt.CLICK_DATA_API + " " + Nt.KEYUP_DATA_API, Zt._clearMenus).on(Nt.CLICK_DATA_API, qt, function(e) {
            e.preventDefault(), e.stopPropagation(), Zt._jQueryInterface.call($t(this), "toggle")
        }).on(Nt.CLICK_DATA_API, Wt, function(e) {
            e.stopPropagation()
        }), $t.fn[Et] = Zt._jQueryInterface, $t.fn[Et].Constructor = Zt, $t.fn[Et].noConflict = function() {
            return $t.fn[Et] = At, Zt._jQueryInterface
        }, Zt),
        Ri = (en = "modal", nn = "." + (tn = "bs.modal"), on = (Jt = t).fn[en], rn = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        }, sn = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        }, an = {
            HIDE: "hide" + nn,
            HIDDEN: "hidden" + nn,
            SHOW: "show" + nn,
            SHOWN: "shown" + nn,
            FOCUSIN: "focusin" + nn,
            RESIZE: "resize" + nn,
            CLICK_DISMISS: "click.dismiss" + nn,
            KEYDOWN_DISMISS: "keydown.dismiss" + nn,
            MOUSEUP_DISMISS: "mouseup.dismiss" + nn,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + nn,
            CLICK_DATA_API: "click" + nn + ".data-api"
        }, ln = "modal-scrollbar-measure", cn = "modal-backdrop", un = "modal-open", dn = "fade", hn = "show", fn = ".modal-dialog", pn = '[data-toggle="modal"]', mn = '[data-dismiss="modal"]', gn = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", vn = ".sticky-top", yn = function() {
            function e(e, t) {
                this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(fn), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._scrollbarWidth = 0
            }
            var t = e.prototype;
            return t.toggle = function(e) {
                return this._isShown ? this.hide() : this.show(e)
            }, t.show = function(e) {
                var t = this;
                if (!this._isTransitioning && !this._isShown) {
                    Jt(this._element).hasClass(dn) && (this._isTransitioning = !0);
                    var n = Jt.Event(an.SHOW, {
                        relatedTarget: e
                    });
                    Jt(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), Jt(document.body).addClass(un), this._setEscapeEvent(), this._setResizeEvent(), Jt(this._element).on(an.CLICK_DISMISS, mn, function(e) {
                        return t.hide(e)
                    }), Jt(this._dialog).on(an.MOUSEDOWN_DISMISS, function() {
                        Jt(t._element).one(an.MOUSEUP_DISMISS, function(e) {
                            Jt(e.target).is(t._element) && (t._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function() {
                        return t._showElement(e)
                    }))
                }
            }, t.hide = function(e) {
                var t = this;
                if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
                    var n = Jt.Event(an.HIDE);
                    if (Jt(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                        this._isShown = !1;
                        var i = Jt(this._element).hasClass(dn);
                        if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), Jt(document).off(an.FOCUSIN), Jt(this._element).removeClass(hn), Jt(this._element).off(an.CLICK_DISMISS), Jt(this._dialog).off(an.MOUSEDOWN_DISMISS), i) {
                            var o = nt.getTransitionDurationFromElement(this._element);
                            Jt(this._element).one(nt.TRANSITION_END, function(e) {
                                return t._hideModal(e)
                            }).emulateTransitionEnd(o)
                        } else this._hideModal()
                    }
                }
            }, t.dispose = function() {
                Jt.removeData(this._element, tn), Jt(window, document, this._element, this._backdrop).off(nn), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
            }, t.handleUpdate = function() {
                this._adjustDialog()
            }, t._getConfig = function(e) {
                return e = o({}, rn, e), nt.typeCheckConfig(en, e, sn), e
            }, t._showElement = function(e) {
                var t = this,
                    n = Jt(this._element).hasClass(dn);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, n && nt.reflow(this._element), Jt(this._element).addClass(hn), this._config.focus && this._enforceFocus();
                var i = Jt.Event(an.SHOWN, {
                        relatedTarget: e
                    }),
                    o = function() {
                        t._config.focus && t._element.focus(), t._isTransitioning = !1, Jt(t._element).trigger(i)
                    };
                if (n) {
                    var r = nt.getTransitionDurationFromElement(this._element);
                    Jt(this._dialog).one(nt.TRANSITION_END, o).emulateTransitionEnd(r)
                } else o()
            }, t._enforceFocus = function() {
                var e = this;
                Jt(document).off(an.FOCUSIN).on(an.FOCUSIN, function(t) {
                    document !== t.target && e._element !== t.target && 0 === Jt(e._element).has(t.target).length && e._element.focus()
                })
            }, t._setEscapeEvent = function() {
                var e = this;
                this._isShown && this._config.keyboard ? Jt(this._element).on(an.KEYDOWN_DISMISS, function(t) {
                    27 === t.which && (t.preventDefault(), e.hide())
                }) : this._isShown || Jt(this._element).off(an.KEYDOWN_DISMISS)
            }, t._setResizeEvent = function() {
                var e = this;
                this._isShown ? Jt(window).on(an.RESIZE, function(t) {
                    return e.handleUpdate(t)
                }) : Jt(window).off(an.RESIZE)
            }, t._hideModal = function() {
                var e = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                    Jt(document.body).removeClass(un), e._resetAdjustments(), e._resetScrollbar(), Jt(e._element).trigger(an.HIDDEN)
                })
            }, t._removeBackdrop = function() {
                this._backdrop && (Jt(this._backdrop).remove(), this._backdrop = null)
            }, t._showBackdrop = function(e) {
                var t = this,
                    n = Jt(this._element).hasClass(dn) ? dn : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = cn, n && this._backdrop.classList.add(n), Jt(this._backdrop).appendTo(document.body), Jt(this._element).on(an.CLICK_DISMISS, function(e) {
                            t._ignoreBackdropClick ? t._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === t._config.backdrop ? t._element.focus() : t.hide())
                        }), n && nt.reflow(this._backdrop), Jt(this._backdrop).addClass(hn), !e) return;
                    if (!n) return void e();
                    var i = nt.getTransitionDurationFromElement(this._backdrop);
                    Jt(this._backdrop).one(nt.TRANSITION_END, e).emulateTransitionEnd(i)
                } else if (!this._isShown && this._backdrop) {
                    Jt(this._backdrop).removeClass(hn);
                    var o = function() {
                        t._removeBackdrop(), e && e()
                    };
                    if (Jt(this._element).hasClass(dn)) {
                        var r = nt.getTransitionDurationFromElement(this._backdrop);
                        Jt(this._backdrop).one(nt.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else o()
                } else e && e()
            }, t._adjustDialog = function() {
                var e = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, t._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, t._checkScrollbar = function() {
                var e = document.body.getBoundingClientRect();
                this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, t._setScrollbar = function() {
                var e = this;
                if (this._isBodyOverflowing) {
                    var t = [].slice.call(document.querySelectorAll(gn)),
                        n = [].slice.call(document.querySelectorAll(vn));
                    Jt(t).each(function(t, n) {
                        var i = n.style.paddingRight,
                            o = Jt(n).css("padding-right");
                        Jt(n).data("padding-right", i).css("padding-right", parseFloat(o) + e._scrollbarWidth + "px")
                    }), Jt(n).each(function(t, n) {
                        var i = n.style.marginRight,
                            o = Jt(n).css("margin-right");
                        Jt(n).data("margin-right", i).css("margin-right", parseFloat(o) - e._scrollbarWidth + "px")
                    });
                    var i = document.body.style.paddingRight,
                        o = Jt(document.body).css("padding-right");
                    Jt(document.body).data("padding-right", i).css("padding-right", parseFloat(o) + this._scrollbarWidth + "px")
                }
            }, t._resetScrollbar = function() {
                var e = [].slice.call(document.querySelectorAll(gn));
                Jt(e).each(function(e, t) {
                    var n = Jt(t).data("padding-right");
                    Jt(t).removeData("padding-right"), t.style.paddingRight = n || ""
                });
                var t = [].slice.call(document.querySelectorAll("" + vn));
                Jt(t).each(function(e, t) {
                    var n = Jt(t).data("margin-right");
                    "undefined" != typeof n && Jt(t).css("margin-right", n).removeData("margin-right")
                });
                var n = Jt(document.body).data("padding-right");
                Jt(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
            }, t._getScrollbarWidth = function() {
                var e = document.createElement("div");
                e.className = ln, document.body.appendChild(e);
                var t = e.getBoundingClientRect().width - e.clientWidth;
                return document.body.removeChild(e), t
            }, e._jQueryInterface = function(t, n) {
                return this.each(function() {
                    var i = Jt(this).data(tn),
                        r = o({}, rn, Jt(this).data(), "object" == typeof t && t ? t : {});
                    if (i || (i = new e(this, r), Jt(this).data(tn, i)), "string" == typeof t) {
                        if ("undefined" == typeof i[t]) throw new TypeError('No method named "' + t + '"');
                        i[t](n)
                    } else r.show && i.show(n)
                })
            }, i(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return rn
                }
            }]), e
        }(), Jt(document).on(an.CLICK_DATA_API, pn, function(e) {
            var t, n = this,
                i = nt.getSelectorFromElement(this);
            i && (t = document.querySelector(i));
            var r = Jt(t).data(tn) ? "toggle" : o({}, Jt(t).data(), Jt(this).data());
            "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
            var s = Jt(t).one(an.SHOW, function(e) {
                e.isDefaultPrevented() || s.one(an.HIDDEN, function() {
                    Jt(n).is(":visible") && n.focus()
                })
            });
            yn._jQueryInterface.call(Jt(t), r, this)
        }), Jt.fn[en] = yn._jQueryInterface, Jt.fn[en].Constructor = yn, Jt.fn[en].noConflict = function() {
            return Jt.fn[en] = on, yn._jQueryInterface
        }, yn),
        zi = (wn = "tooltip", _n = "." + (Cn = "bs.tooltip"), xn = (bn = t).fn[wn], $n = "bs-tooltip", En = new RegExp("(^|\\s)" + $n + "\\S+", "g"), kn = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !(Sn = {
                AUTO: "auto",
                TOP: "top",
                RIGHT: "right",
                BOTTOM: "bottom",
                LEFT: "left"
            }),
            selector: !(Tn = {
                animation: "boolean",
                template: "string",
                title: "(string|element|function)",
                trigger: "string",
                delay: "(number|object)",
                html: "boolean",
                selector: "(string|boolean)",
                placement: "(string|function)",
                offset: "(number|string)",
                container: "(string|element|boolean)",
                fallbackPlacement: "(string|array)",
                boundary: "(string|element)"
            }),
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent"
        }, Dn = "out", Nn = {
            HIDE: "hide" + _n,
            HIDDEN: "hidden" + _n,
            SHOW: (An = "show") + _n,
            SHOWN: "shown" + _n,
            INSERTED: "inserted" + _n,
            CLICK: "click" + _n,
            FOCUSIN: "focusin" + _n,
            FOCUSOUT: "focusout" + _n,
            MOUSEENTER: "mouseenter" + _n,
            MOUSELEAVE: "mouseleave" + _n
        }, In = "fade", On = "show", jn = ".tooltip-inner", Hn = ".arrow", Ln = "hover", Mn = "focus", Pn = "click", qn = "manual", Wn = function() {
            function e(e, t) {
                if ("undefined" == typeof xt) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
            }
            var t = e.prototype;
            return t.enable = function() {
                this._isEnabled = !0
            }, t.disable = function() {
                this._isEnabled = !1
            }, t.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, t.toggle = function(e) {
                if (this._isEnabled)
                    if (e) {
                        var t = this.constructor.DATA_KEY,
                            n = bn(e.currentTarget).data(t);
                        n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), bn(e.currentTarget).data(t, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                    } else {
                        if (bn(this.getTipElement()).hasClass(On)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, t.dispose = function() {
                clearTimeout(this._timeout), bn.removeData(this.element, this.constructor.DATA_KEY), bn(this.element).off(this.constructor.EVENT_KEY), bn(this.element).closest(".modal").off("hide.bs.modal"), this.tip && bn(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, t.show = function() {
                var e = this;
                if ("none" === bn(this.element).css("display")) throw new Error("Please use show on visible elements");
                var t = bn.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    bn(this.element).trigger(t);
                    var n = bn.contains(this.element.ownerDocument.documentElement, this.element);
                    if (t.isDefaultPrevented() || !n) return;
                    var i = this.getTipElement(),
                        o = nt.getUID(this.constructor.NAME);
                    i.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && bn(i).addClass(In);
                    var r = "function" == typeof this.config.placement ? this.config.placement.call(this, i, this.element) : this.config.placement,
                        s = this._getAttachment(r);
                    this.addAttachmentClass(s);
                    var a = !1 === this.config.container ? document.body : bn(document).find(this.config.container);
                    bn(i).data(this.constructor.DATA_KEY, this), bn.contains(this.element.ownerDocument.documentElement, this.tip) || bn(i).appendTo(a), bn(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new xt(this.element, i, {
                        placement: s,
                        modifiers: {
                            offset: {
                                offset: this.config.offset
                            },
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: Hn
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function(t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function(t) {
                            e._handlePopperPlacementChange(t)
                        }
                    }), bn(i).addClass(On), "ontouchstart" in document.documentElement && bn(document.body).children().on("mouseover", null, bn.noop);
                    var l = function() {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, bn(e.element).trigger(e.constructor.Event.SHOWN), t === Dn && e._leave(null, e)
                    };
                    if (bn(this.tip).hasClass(In)) {
                        var c = nt.getTransitionDurationFromElement(this.tip);
                        bn(this.tip).one(nt.TRANSITION_END, l).emulateTransitionEnd(c)
                    } else l()
                }
            }, t.hide = function(e) {
                var t = this,
                    n = this.getTipElement(),
                    i = bn.Event(this.constructor.Event.HIDE),
                    o = function() {
                        t._hoverState !== An && n.parentNode && n.parentNode.removeChild(n), t._cleanTipClass(), t.element.removeAttribute("aria-describedby"), bn(t.element).trigger(t.constructor.Event.HIDDEN), null !== t._popper && t._popper.destroy(), e && e()
                    };
                if (bn(this.element).trigger(i), !i.isDefaultPrevented()) {
                    if (bn(n).removeClass(On), "ontouchstart" in document.documentElement && bn(document.body).children().off("mouseover", null, bn.noop), this._activeTrigger[Pn] = !1, this._activeTrigger[Mn] = !1, this._activeTrigger[Ln] = !1, bn(this.tip).hasClass(In)) {
                        var r = nt.getTransitionDurationFromElement(n);
                        bn(n).one(nt.TRANSITION_END, o).emulateTransitionEnd(r)
                    } else o();
                    this._hoverState = ""
                }
            }, t.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, t.isWithContent = function() {
                return Boolean(this.getTitle())
            }, t.addAttachmentClass = function(e) {
                bn(this.getTipElement()).addClass($n + "-" + e)
            }, t.getTipElement = function() {
                return this.tip = this.tip || bn(this.config.template)[0], this.tip
            }, t.setContent = function() {
                var e = this.getTipElement();
                this.setElementContent(bn(e.querySelectorAll(jn)), this.getTitle()), bn(e).removeClass(In + " " + On)
            }, t.setElementContent = function(e, t) {
                var n = this.config.html;
                "object" == typeof t && (t.nodeType || t.jquery) ? n ? bn(t).parent().is(e) || e.empty().append(t) : e.text(bn(t).text()) : e[n ? "html" : "text"](t)
            }, t.getTitle = function() {
                var e = this.element.getAttribute("data-original-title");
                return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
            }, t._getAttachment = function(e) {
                return Sn[e.toUpperCase()]
            }, t._setListeners = function() {
                var e = this;
                this.config.trigger.split(" ").forEach(function(t) {
                    if ("click" === t) bn(e.element).on(e.constructor.Event.CLICK, e.config.selector, function(t) {
                        return e.toggle(t)
                    });
                    else if (t !== qn) {
                        var n = t === Ln ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                            i = t === Ln ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                        bn(e.element).on(n, e.config.selector, function(t) {
                            return e._enter(t)
                        }).on(i, e.config.selector, function(t) {
                            return e._leave(t)
                        })
                    }
                    bn(e.element).closest(".modal").on("hide.bs.modal", function() {
                        return e.hide()
                    })
                }), this.config.selector ? this.config = o({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, t._fixTitle = function() {
                var e = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, t._enter = function(e, t) {
                var n = this.constructor.DATA_KEY;
                (t = t || bn(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), bn(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusin" === e.type ? Mn : Ln] = !0), bn(t.getTipElement()).hasClass(On) || t._hoverState === An ? t._hoverState = An : (clearTimeout(t._timeout), t._hoverState = An, t.config.delay && t.config.delay.show ? t._timeout = setTimeout(function() {
                    t._hoverState === An && t.show()
                }, t.config.delay.show) : t.show())
            }, t._leave = function(e, t) {
                var n = this.constructor.DATA_KEY;
                (t = t || bn(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), bn(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusout" === e.type ? Mn : Ln] = !1), t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = Dn, t.config.delay && t.config.delay.hide ? t._timeout = setTimeout(function() {
                    t._hoverState === Dn && t.hide()
                }, t.config.delay.hide) : t.hide())
            }, t._isWithActiveTrigger = function() {
                for (var e in this._activeTrigger)
                    if (this._activeTrigger[e]) return !0;
                return !1
            }, t._getConfig = function(e) {
                return "number" == typeof(e = o({}, this.constructor.Default, bn(this.element).data(), "object" == typeof e && e ? e : {})).delay && (e.delay = {
                    show: e.delay,
                    hide: e.delay
                }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), nt.typeCheckConfig(wn, e, this.constructor.DefaultType), e
            }, t._getDelegateConfig = function() {
                var e = {};
                if (this.config)
                    for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                return e
            }, t._cleanTipClass = function() {
                var e = bn(this.getTipElement()),
                    t = e.attr("class").match(En);
                null !== t && t.length && e.removeClass(t.join(""))
            }, t._handlePopperPlacementChange = function(e) {
                var t = e.instance;
                this.tip = t.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
            }, t._fixTransition = function() {
                var e = this.getTipElement(),
                    t = this.config.animation;
                null === e.getAttribute("x-placement") && (bn(e).removeClass(In), this.config.animation = !1, this.hide(), this.show(), this.config.animation = t)
            }, e._jQueryInterface = function(t) {
                return this.each(function() {
                    var n = bn(this).data(Cn),
                        i = "object" == typeof t && t;
                    if ((n || !/dispose|hide/.test(t)) && (n || (n = new e(this, i), bn(this).data(Cn, n)), "string" == typeof t)) {
                        if ("undefined" == typeof n[t]) throw new TypeError('No method named "' + t + '"');
                        n[t]()
                    }
                })
            }, i(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return kn
                }
            }, {
                key: "NAME",
                get: function() {
                    return wn
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Cn
                }
            }, {
                key: "Event",
                get: function() {
                    return Nn
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return _n
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Tn
                }
            }]), e
        }(), bn.fn[wn] = Wn._jQueryInterface, bn.fn[wn].Constructor = Wn, bn.fn[wn].noConflict = function() {
            return bn.fn[wn] = xn, Wn._jQueryInterface
        }, Wn),
        Qi = (Bn = "popover", zn = "." + (Rn = "bs.popover"), Qn = (Fn = t).fn[Bn], Un = "bs-popover", Xn = new RegExp("(^|\\s)" + Un + "\\S+", "g"), Kn = o({}, zi.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }), Yn = o({}, zi.DefaultType, {
            content: "(string|element|function)"
        }), Vn = "fade", Zn = ".popover-header", Jn = ".popover-body", ei = {
            HIDE: "hide" + zn,
            HIDDEN: "hidden" + zn,
            SHOW: (Gn = "show") + zn,
            SHOWN: "shown" + zn,
            INSERTED: "inserted" + zn,
            CLICK: "click" + zn,
            FOCUSIN: "focusin" + zn,
            FOCUSOUT: "focusout" + zn,
            MOUSEENTER: "mouseenter" + zn,
            MOUSELEAVE: "mouseleave" + zn
        }, ti = function(e) {
            function t() {
                return e.apply(this, arguments) || this
            }
            var n, o;
            o = e, (n = t).prototype = Object.create(o.prototype), (n.prototype.constructor = n).__proto__ = o;
            var r = t.prototype;
            return r.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, r.addAttachmentClass = function(e) {
                Fn(this.getTipElement()).addClass(Un + "-" + e)
            }, r.getTipElement = function() {
                return this.tip = this.tip || Fn(this.config.template)[0], this.tip
            }, r.setContent = function() {
                var e = Fn(this.getTipElement());
                this.setElementContent(e.find(Zn), this.getTitle());
                var t = this._getContent();
                "function" == typeof t && (t = t.call(this.element)), this.setElementContent(e.find(Jn), t), e.removeClass(Vn + " " + Gn)
            }, r._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, r._cleanTipClass = function() {
                var e = Fn(this.getTipElement()),
                    t = e.attr("class").match(Xn);
                null !== t && 0 < t.length && e.removeClass(t.join(""))
            }, t._jQueryInterface = function(e) {
                return this.each(function() {
                    var n = Fn(this).data(Rn),
                        i = "object" == typeof e ? e : null;
                    if ((n || !/destroy|hide/.test(e)) && (n || (n = new t(this, i), Fn(this).data(Rn, n)), "string" == typeof e)) {
                        if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
                        n[e]()
                    }
                })
            }, i(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return Kn
                }
            }, {
                key: "NAME",
                get: function() {
                    return Bn
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Rn
                }
            }, {
                key: "Event",
                get: function() {
                    return ei
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return zn
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Yn
                }
            }]), t
        }(zi), Fn.fn[Bn] = ti._jQueryInterface, Fn.fn[Bn].Constructor = ti, Fn.fn[Bn].noConflict = function() {
            return Fn.fn[Bn] = Qn, ti._jQueryInterface
        }, ti),
        Ui = (ii = "scrollspy", ri = "." + (oi = "bs.scrollspy"), si = (ni = t).fn[ii], ai = {
            offset: 10,
            method: "auto",
            target: ""
        }, li = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        }, ci = {
            ACTIVATE: "activate" + ri,
            SCROLL: "scroll" + ri,
            LOAD_DATA_API: "load" + ri + ".data-api"
        }, ui = "dropdown-item", di = "active", hi = '[data-spy="scroll"]', fi = ".active", pi = ".nav, .list-group", mi = ".nav-link", gi = ".nav-item", vi = ".list-group-item", yi = ".dropdown", bi = ".dropdown-item", wi = ".dropdown-toggle", Ci = "offset", _i = "position", xi = function() {
            function e(e, t) {
                var n = this;
                this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(t), this._selector = this._config.target + " " + mi + "," + this._config.target + " " + vi + "," + this._config.target + " " + bi, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, ni(this._scrollElement).on(ci.SCROLL, function(e) {
                    return n._process(e)
                }), this.refresh(), this._process()
            }
            var t = e.prototype;
            return t.refresh = function() {
                var e = this,
                    t = this._scrollElement === this._scrollElement.window ? Ci : _i,
                    n = "auto" === this._config.method ? t : this._config.method,
                    i = n === _i ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(e) {
                    var t, o = nt.getSelectorFromElement(e);
                    if (o && (t = document.querySelector(o)), t) {
                        var r = t.getBoundingClientRect();
                        if (r.width || r.height) return [ni(t)[n]().top + i, o]
                    }
                    return null
                }).filter(function(e) {
                    return e
                }).sort(function(e, t) {
                    return e[0] - t[0]
                }).forEach(function(t) {
                    e._offsets.push(t[0]), e._targets.push(t[1])
                })
            }, t.dispose = function() {
                ni.removeData(this._element, oi), ni(this._scrollElement).off(ri), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, t._getConfig = function(e) {
                if ("string" != typeof(e = o({}, ai, "object" == typeof e && e ? e : {})).target) {
                    var t = ni(e.target).attr("id");
                    t || (t = nt.getUID(ii), ni(e.target).attr("id", t)), e.target = "#" + t
                }
                return nt.typeCheckConfig(ii, e, li), e
            }, t._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, t._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, t._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, t._process = function() {
                var e = this._getScrollTop() + this._config.offset,
                    t = this._getScrollHeight(),
                    n = this._config.offset + t - this._getOffsetHeight();
                if (this._scrollHeight !== t && this.refresh(), e >= n) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && e < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) this._activeTarget !== this._targets[o] && e >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || e < this._offsets[o + 1]) && this._activate(this._targets[o])
                }
            }, t._activate = function(e) {
                this._activeTarget = e, this._clear();
                var t = this._selector.split(",");
                t = t.map(function(t) {
                    return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                });
                var n = ni([].slice.call(document.querySelectorAll(t.join(","))));
                n.hasClass(ui) ? (n.closest(yi).find(wi).addClass(di), n.addClass(di)) : (n.addClass(di), n.parents(pi).prev(mi + ", " + vi).addClass(di), n.parents(pi).prev(gi).children(mi).addClass(di)), ni(this._scrollElement).trigger(ci.ACTIVATE, {
                    relatedTarget: e
                })
            }, t._clear = function() {
                var e = [].slice.call(document.querySelectorAll(this._selector));
                ni(e).filter(fi).removeClass(di)
            }, e._jQueryInterface = function(t) {
                return this.each(function() {
                    var n = ni(this).data(oi);
                    if (n || (n = new e(this, "object" == typeof t && t), ni(this).data(oi, n)), "string" == typeof t) {
                        if ("undefined" == typeof n[t]) throw new TypeError('No method named "' + t + '"');
                        n[t]()
                    }
                })
            }, i(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return ai
                }
            }]), e
        }(), ni(window).on(ci.LOAD_DATA_API, function() {
            for (var e = [].slice.call(document.querySelectorAll(hi)), t = e.length; t--;) {
                var n = ni(e[t]);
                xi._jQueryInterface.call(n, n.data())
            }
        }), ni.fn[ii] = xi._jQueryInterface, ni.fn[ii].Constructor = xi, ni.fn[ii].noConflict = function() {
            return ni.fn[ii] = si, xi._jQueryInterface
        }, xi),
        Xi = (Ti = "." + (Ei = "bs.tab"), Si = ($i = t).fn.tab, ki = {
            HIDE: "hide" + Ti,
            HIDDEN: "hidden" + Ti,
            SHOW: "show" + Ti,
            SHOWN: "shown" + Ti,
            CLICK_DATA_API: "click" + Ti + ".data-api"
        }, Ai = "dropdown-menu", Di = "active", Ni = "disabled", Ii = "fade", Oi = "show", ji = ".dropdown", Hi = ".nav, .list-group", Li = ".active", Mi = "> li > .active", Pi = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', qi = ".dropdown-toggle", Wi = "> .dropdown-menu .active", Fi = function() {
            function e(e) {
                this._element = e
            }
            var t = e.prototype;
            return t.show = function() {
                var e = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $i(this._element).hasClass(Di) || $i(this._element).hasClass(Ni))) {
                    var t, n, i = $i(this._element).closest(Hi)[0],
                        o = nt.getSelectorFromElement(this._element);
                    if (i) {
                        var r = "UL" === i.nodeName ? Mi : Li;
                        n = (n = $i.makeArray($i(i).find(r)))[n.length - 1]
                    }
                    var s = $i.Event(ki.HIDE, {
                            relatedTarget: this._element
                        }),
                        a = $i.Event(ki.SHOW, {
                            relatedTarget: n
                        });
                    if (n && $i(n).trigger(s), $i(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                        o && (t = document.querySelector(o)), this._activate(this._element, i);
                        var l = function() {
                            var t = $i.Event(ki.HIDDEN, {
                                    relatedTarget: e._element
                                }),
                                i = $i.Event(ki.SHOWN, {
                                    relatedTarget: n
                                });
                            $i(n).trigger(t), $i(e._element).trigger(i)
                        };
                        t ? this._activate(t, t.parentNode, l) : l()
                    }
                }
            }, t.dispose = function() {
                $i.removeData(this._element, Ei), this._element = null
            }, t._activate = function(e, t, n) {
                var i = this,
                    o = ("UL" === t.nodeName ? $i(t).find(Mi) : $i(t).children(Li))[0],
                    r = n && o && $i(o).hasClass(Ii),
                    s = function() {
                        return i._transitionComplete(e, o, n)
                    };
                if (o && r) {
                    var a = nt.getTransitionDurationFromElement(o);
                    $i(o).one(nt.TRANSITION_END, s).emulateTransitionEnd(a)
                } else s()
            }, t._transitionComplete = function(e, t, n) {
                if (t) {
                    $i(t).removeClass(Oi + " " + Di);
                    var i = $i(t.parentNode).find(Wi)[0];
                    i && $i(i).removeClass(Di), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1)
                }
                if ($i(e).addClass(Di), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), nt.reflow(e), $i(e).addClass(Oi), e.parentNode && $i(e.parentNode).hasClass(Ai)) {
                    var o = $i(e).closest(ji)[0];
                    if (o) {
                        var r = [].slice.call(o.querySelectorAll(qi));
                        $i(r).addClass(Di)
                    }
                    e.setAttribute("aria-expanded", !0)
                }
                n && n()
            }, e._jQueryInterface = function(t) {
                return this.each(function() {
                    var n = $i(this),
                        i = n.data(Ei);
                    if (i || (i = new e(this), n.data(Ei, i)), "string" == typeof t) {
                        if ("undefined" == typeof i[t]) throw new TypeError('No method named "' + t + '"');
                        i[t]()
                    }
                })
            }, i(e, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }]), e
        }(), $i(document).on(ki.CLICK_DATA_API, Pi, function(e) {
            e.preventDefault(), Fi._jQueryInterface.call($i(this), "show")
        }), $i.fn.tab = Fi._jQueryInterface, $i.fn.tab.Constructor = Fi, $i.fn.tab.noConflict = function() {
            return $i.fn.tab = Si, Fi._jQueryInterface
        }, Fi);
    ! function(e) {
        if ("undefined" == typeof e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var t = e.fn.jquery.split(" ")[0].split(".");
        if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(t), e.Util = nt, e.Alert = it, e.Button = ot, e.Carousel = rt, e.Collapse = st, e.Dropdown = Bi, e.Modal = Ri, e.Popover = Qi, e.Scrollspy = Ui, e.Tab = Xi, e.Tooltip = zi, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}),
function() {
    var e = [].slice;
    ! function(t, n) {
        "use strict";
        var i;
        return i = function() {
            function e(e, n) {
                null == n && (n = {}), this.$element = t(e), this.options = t.extend({}, t.fn.bootstrapSwitch.defaults, {
                    state: this.$element.is(":checked"),
                    size: this.$element.data("size"),
                    animate: this.$element.data("animate"),
                    disabled: this.$element.is(":disabled"),
                    readonly: this.$element.is("[readonly]"),
                    indeterminate: this.$element.data("indeterminate"),
                    inverse: this.$element.data("inverse"),
                    radioAllOff: this.$element.data("radio-all-off"),
                    onColor: this.$element.data("on-color"),
                    offColor: this.$element.data("off-color"),
                    onText: this.$element.data("on-text"),
                    offText: this.$element.data("off-text"),
                    labelText: this.$element.data("label-text"),
                    handleWidth: this.$element.data("handle-width"),
                    labelWidth: this.$element.data("label-width"),
                    baseClass: this.$element.data("base-class"),
                    wrapperClass: this.$element.data("wrapper-class")
                }, n), this.$wrapper = t("<div>", {
                    "class": function(e) {
                        return function() {
                            var t;
                            return t = ["" + e.options.baseClass].concat(e._getClasses(e.options.wrapperClass)), t.push(e.options.state ? "" + e.options.baseClass + "-on" : "" + e.options.baseClass + "-off"), null != e.options.size && t.push("" + e.options.baseClass + "-" + e.options.size), e.options.disabled && t.push("" + e.options.baseClass + "-disabled"), e.options.readonly && t.push("" + e.options.baseClass + "-readonly"), e.options.indeterminate && t.push("" + e.options.baseClass + "-indeterminate"), e.options.inverse && t.push("" + e.options.baseClass + "-inverse"), e.$element.attr("id") && t.push("" + e.options.baseClass + "-id-" + e.$element.attr("id")), t.join(" ")
                        }
                    }(this)()
                }), this.$container = t("<div>", {
                    "class": "" + this.options.baseClass + "-container"
                }), this.$on = t("<span>", {
                    html: this.options.onText,
                    "class": "" + this.options.baseClass + "-handle-on " + this.options.baseClass + "-" + this.options.onColor
                }), this.$off = t("<span>", {
                    html: this.options.offText,
                    "class": "" + this.options.baseClass + "-handle-off " + this.options.baseClass + "-" + this.options.offColor
                }), this.$label = t("<span>", {
                    html: this.options.labelText,
                    "class": "" + this.options.baseClass + "-label"
                }), this.$element.on("init.bootstrapSwitch", function(t) {
                    return function() {
                        return t.options.onInit.apply(e, arguments)
                    }
                }(this)), this.$element.on("switchChange.bootstrapSwitch", function(t) {
                    return function() {
                        return t.options.onSwitchChange.apply(e, arguments)
                    }
                }(this)), this.$container = this.$element.wrap(this.$container).parent(), this.$wrapper = this.$container.wrap(this.$wrapper).parent(), this.$element.before(this.options.inverse ? this.$off : this.$on).before(this.$label).before(this.options.inverse ? this.$on : this.$off), this.options.indeterminate && this.$element.prop("indeterminate", !0), this._init(), this._elementHandlers(), this._handleHandlers(), this._labelHandlers(), this._formHandler(), this._externalLabelHandler(), this.$element.trigger("init.bootstrapSwitch")
            }
            return e.prototype._constructor = e, e.prototype.state = function(e, t) {
                return "undefined" == typeof e ? this.options.state : this.options.disabled || this.options.readonly ? this.$element : this.options.state && !this.options.radioAllOff && this.$element.is(":radio") ? this.$element : (this.options.indeterminate && this.indeterminate(!1), e = !!e, this.$element.prop("checked", e).trigger("change.bootstrapSwitch", t), this.$element)
            }, e.prototype.toggleState = function(e) {
                return this.options.disabled || this.options.readonly ? this.$element : this.options.indeterminate ? (this.indeterminate(!1), this.state(!0)) : this.$element.prop("checked", !this.options.state).trigger("change.bootstrapSwitch", e)
            }, e.prototype.size = function(e) {
                return "undefined" == typeof e ? this.options.size : (null != this.options.size && this.$wrapper.removeClass("" + this.options.baseClass + "-" + this.options.size), e && this.$wrapper.addClass("" + this.options.baseClass + "-" + e), this._width(), this._containerPosition(), this.options.size = e, this.$element)
            }, e.prototype.animate = function(e) {
                return "undefined" == typeof e ? this.options.animate : (e = !!e, e === this.options.animate ? this.$element : this.toggleAnimate())
            }, e.prototype.toggleAnimate = function() {
                return this.options.animate = !this.options.animate, this.$wrapper.toggleClass("" + this.options.baseClass + "-animate"), this.$element
            }, e.prototype.disabled = function(e) {
                return "undefined" == typeof e ? this.options.disabled : (e = !!e, e === this.options.disabled ? this.$element : this.toggleDisabled())
            }, e.prototype.toggleDisabled = function() {
                return this.options.disabled = !this.options.disabled, this.$element.prop("disabled", this.options.disabled), this.$wrapper.toggleClass("" + this.options.baseClass + "-disabled"), this.$element
            }, e.prototype.readonly = function(e) {
                return "undefined" == typeof e ? this.options.readonly : (e = !!e, e === this.options.readonly ? this.$element : this.toggleReadonly())
            }, e.prototype.toggleReadonly = function() {
                return this.options.readonly = !this.options.readonly, this.$element.prop("readonly", this.options.readonly), this.$wrapper.toggleClass("" + this.options.baseClass + "-readonly"), this.$element
            }, e.prototype.indeterminate = function(e) {
                return "undefined" == typeof e ? this.options.indeterminate : (e = !!e, e === this.options.indeterminate ? this.$element : this.toggleIndeterminate())
            }, e.prototype.toggleIndeterminate = function() {
                return this.options.indeterminate = !this.options.indeterminate, this.$element.prop("indeterminate", this.options.indeterminate), this.$wrapper.toggleClass("" + this.options.baseClass + "-indeterminate"), this._containerPosition(), this.$element
            }, e.prototype.inverse = function(e) {
                return "undefined" == typeof e ? this.options.inverse : (e = !!e, e === this.options.inverse ? this.$element : this.toggleInverse())
            }, e.prototype.toggleInverse = function() {
                var e, t;
                return this.$wrapper.toggleClass("" + this.options.baseClass + "-inverse"), t = this.$on.clone(!0), e = this.$off.clone(!0), this.$on.replaceWith(e), this.$off.replaceWith(t), this.$on = e, this.$off = t, this.options.inverse = !this.options.inverse, this.$element
            }, e.prototype.onColor = function(e) {
                var t;
                return t = this.options.onColor, "undefined" == typeof e ? t : (null != t && this.$on.removeClass("" + this.options.baseClass + "-" + t), this.$on.addClass("" + this.options.baseClass + "-" + e), this.options.onColor = e, this.$element)
            }, e.prototype.offColor = function(e) {
                var t;
                return t = this.options.offColor, "undefined" == typeof e ? t : (null != t && this.$off.removeClass("" + this.options.baseClass + "-" + t), this.$off.addClass("" + this.options.baseClass + "-" + e), this.options.offColor = e, this.$element)
            }, e.prototype.onText = function(e) {
                return "undefined" == typeof e ? this.options.onText : (this.$on.html(e), this._width(), this._containerPosition(), this.options.onText = e, this.$element)
            }, e.prototype.offText = function(e) {
                return "undefined" == typeof e ? this.options.offText : (this.$off.html(e), this._width(), this._containerPosition(), this.options.offText = e, this.$element)
            }, e.prototype.labelText = function(e) {
                return "undefined" == typeof e ? this.options.labelText : (this.$label.html(e), this._width(), this.options.labelText = e, this.$element)
            }, e.prototype.handleWidth = function(e) {
                return "undefined" == typeof e ? this.options.handleWidth : (this.options.handleWidth = e, this._width(), this._containerPosition(), this.$element)
            }, e.prototype.labelWidth = function(e) {
                return "undefined" == typeof e ? this.options.labelWidth : (this.options.labelWidth = e, this._width(), this._containerPosition(), this.$element)
            }, e.prototype.baseClass = function(e) {
                return this.options.baseClass
            }, e.prototype.wrapperClass = function(e) {
                return "undefined" == typeof e ? this.options.wrapperClass : (e || (e = t.fn.bootstrapSwitch.defaults.wrapperClass), this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" ")), this.$wrapper.addClass(this._getClasses(e).join(" ")), this.options.wrapperClass = e, this.$element)
            }, e.prototype.radioAllOff = function(e) {
                return "undefined" == typeof e ? this.options.radioAllOff : (e = !!e, e === this.options.radioAllOff ? this.$element : (this.options.radioAllOff = e, this.$element))
            }, e.prototype.onInit = function(e) {
                return "undefined" == typeof e ? this.options.onInit : (e || (e = t.fn.bootstrapSwitch.defaults.onInit), this.options.onInit = e, this.$element)
            }, e.prototype.onSwitchChange = function(e) {
                return "undefined" == typeof e ? this.options.onSwitchChange : (e || (e = t.fn.bootstrapSwitch.defaults.onSwitchChange), this.options.onSwitchChange = e, this.$element)
            }, e.prototype.destroy = function() {
                var e;
                return e = this.$element.closest("form"), e.length && e.off("reset.bootstrapSwitch").removeData("bootstrap-switch"), this.$container.children().not(this.$element).remove(), this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch"), this.$element
            }, e.prototype._width = function() {
                var e, t;
                return e = this.$on.add(this.$off), e.add(this.$label).css("width", ""), t = "auto" === this.options.handleWidth ? Math.max(this.$on.width(), this.$off.width()) : this.options.handleWidth, e.width(t), this.$label.width(function(e) {
                    return function(n, i) {
                        return "auto" !== e.options.labelWidth ? e.options.labelWidth : t > i ? t : i
                    }
                }(this)), this._handleWidth = this.$on.outerWidth(), this._labelWidth = this.$label.outerWidth(), this.$container.width(2 * this._handleWidth + this._labelWidth), this.$wrapper.width(this._handleWidth + this._labelWidth)
            }, e.prototype._containerPosition = function(e, t) {
                return null == e && (e = this.options.state), this.$container.css("margin-left", function(t) {
                    return function() {
                        var n;
                        return n = [0, "-" + t._handleWidth + "px"], t.options.indeterminate ? "-" + t._handleWidth / 2 + "px" : e ? t.options.inverse ? n[1] : n[0] : t.options.inverse ? n[0] : n[1]
                    }
                }(this)), t ? setTimeout(function() {
                    return t()
                }, 50) : void 0
            }, e.prototype._init = function() {
                var e, t;
                return e = function(e) {
                    return function() {
                        return e._width(), e._containerPosition(null, function() {
                            return e.options.animate ? e.$wrapper.addClass("" + e.options.baseClass + "-animate") : void 0
                        })
                    }
                }(this), this.$wrapper.is(":visible") ? e() : t = n.setInterval(function(i) {
                    return function() {
                        return i.$wrapper.is(":visible") ? (e(), n.clearInterval(t)) : void 0
                    }
                }(this), 50)
            }, e.prototype._elementHandlers = function() {
                return this.$element.on({
                    "change.bootstrapSwitch": function(e) {
                        return function(n, i) {
                            var o;
                            return n.preventDefault(), n.stopImmediatePropagation(), o = e.$element.is(":checked"), e._containerPosition(o), o !== e.options.state ? (e.options.state = o, e.$wrapper.toggleClass("" + e.options.baseClass + "-off").toggleClass("" + e.options.baseClass + "-on"), i ? void 0 : (e.$element.is(":radio") && t("[name='" + e.$element.attr("name") + "']").not(e.$element).prop("checked", !1).trigger("change.bootstrapSwitch", !0), e.$element.trigger("switchChange.bootstrapSwitch", [o]))) : void 0
                        }
                    }(this),
                    "focus.bootstrapSwitch": function(e) {
                        return function(t) {
                            return t.preventDefault(), e.$wrapper.addClass("" + e.options.baseClass + "-focused")
                        }
                    }(this),
                    "blur.bootstrapSwitch": function(e) {
                        return function(t) {
                            return t.preventDefault(), e.$wrapper.removeClass("" + e.options.baseClass + "-focused")
                        }
                    }(this),
                    "keydown.bootstrapSwitch": function(e) {
                        return function(t) {
                            if (t.which && !e.options.disabled && !e.options.readonly) switch (t.which) {
                                case 37:
                                    return t.preventDefault(), t.stopImmediatePropagation(), e.state(!1);
                                case 39:
                                    return t.preventDefault(), t.stopImmediatePropagation(), e.state(!0)
                            }
                        }
                    }(this)
                })
            }, e.prototype._handleHandlers = function() {
                return this.$on.on("click.bootstrapSwitch", function(e) {
                    return function(t) {
                        return t.preventDefault(), t.stopPropagation(), e.state(!1), e.$element.trigger("focus.bootstrapSwitch")
                    }
                }(this)), this.$off.on("click.bootstrapSwitch", function(e) {
                    return function(t) {
                        return t.preventDefault(), t.stopPropagation(), e.state(!0), e.$element.trigger("focus.bootstrapSwitch")
                    }
                }(this))
            }, e.prototype._labelHandlers = function() {
                return this.$label.on({
                    "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": function(e) {
                        return function(t) {
                            return e._dragStart || e.options.disabled || e.options.readonly ? void 0 : (t.preventDefault(), t.stopPropagation(), e._dragStart = (t.pageX || t.originalEvent.touches[0].pageX) - parseInt(e.$container.css("margin-left"), 10), e.options.animate && e.$wrapper.removeClass("" + e.options.baseClass + "-animate"), e.$element.trigger("focus.bootstrapSwitch"))
                        }
                    }(this),
                    "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": function(e) {
                        return function(t) {
                            var n;
                            if (null != e._dragStart && (t.preventDefault(), n = (t.pageX || t.originalEvent.touches[0].pageX) - e._dragStart, !(n < -e._handleWidth || n > 0))) return e._dragEnd = n, e.$container.css("margin-left", "" + e._dragEnd + "px")
                        }
                    }(this),
                    "mouseup.bootstrapSwitch touchend.bootstrapSwitch": function(e) {
                        return function(t) {
                            var n;
                            if (e._dragStart) return t.preventDefault(), e.options.animate && e.$wrapper.addClass("" + e.options.baseClass + "-animate"), e._dragEnd ? (n = e._dragEnd > -(e._handleWidth / 2), e._dragEnd = !1, e.state(e.options.inverse ? !n : n)) : e.state(!e.options.state), e._dragStart = !1
                        }
                    }(this),
                    "mouseleave.bootstrapSwitch": function(e) {
                        return function(t) {
                            return e.$label.trigger("mouseup.bootstrapSwitch")
                        }
                    }(this)
                })
            }, e.prototype._externalLabelHandler = function() {
                var e;
                return e = this.$element.closest("label"), e.on("click", function(t) {
                    return function(n) {
                        return n.preventDefault(), n.stopImmediatePropagation(), n.target === e[0] ? t.toggleState() : void 0
                    }
                }(this))
            }, e.prototype._formHandler = function() {
                var e;
                return e = this.$element.closest("form"), e.data("bootstrap-switch") ? void 0 : e.on("reset.bootstrapSwitch", function() {
                    return n.setTimeout(function() {
                        return e.find("input").filter(function() {
                            return t(this).data("bootstrap-switch")
                        }).each(function() {
                            return t(this).bootstrapSwitch("state", this.checked)
                        })
                    }, 1)
                }).data("bootstrap-switch", !0)
            }, e.prototype._getClasses = function(e) {
                var n, i, o, r;
                if (!t.isArray(e)) return ["" + this.options.baseClass + "-" + e];
                for (i = [], o = 0, r = e.length; r > o; o++) n = e[o], i.push("" + this.options.baseClass + "-" + n);
                return i
            }, e
        }(), t.fn.bootstrapSwitch = function() {
            var n, o, r;
            return o = arguments[0], n = 2 <= arguments.length ? e.call(arguments, 1) : [], r = this, this.each(function() {
                var e, s;
                return e = t(this), s = e.data("bootstrap-switch"), s || e.data("bootstrap-switch", s = new i(this, o)), "string" == typeof o ? r = s[o].apply(s, n) : void 0
            }), r
        }, t.fn.bootstrapSwitch.Constructor = i, t.fn.bootstrapSwitch.defaults = {
            state: !0,
            size: null,
            animate: !0,
            disabled: !1,
            readonly: !1,
            indeterminate: !1,
            inverse: !1,
            radioAllOff: !1,
            onColor: "primary",
            offColor: "default",
            onText: "ON",
            offText: "OFF",
            labelText: "&nbsp;",
            handleWidth: "auto",
            labelWidth: "auto",
            baseClass: "bootstrap-switch",
            wrapperClass: "wrapper",
            onInit: function() {},
            onSwitchChange: function() {}
        }
    }(window.jQuery, window)
}.call(this), jQuery(function() {
        $(window).on("load resize", function() {
            function e(e) {
                e.attr("src").indexOf("inactive") >= 0 && (e.attr("src", e.attr("active_url")), e.attr("hovered_in", "1"))
            }

            function t(e) {
                "1" == e.attr("hovered_in") && (e.attr("src", e.attr("inactive_url")), e.attr("hovered_in", "0"))
            }
            width = window.innerWidth, $("a.mid-nav").hover(function() {
                $("svg#hero").css("background-image", "url(" + $("#mid-hero").attr("src") + ")"), width > 868 && $("#mid-text-banner").show()
            }, function() {
                $("svg#hero").css("background-image", "url(" + $("#main-hero").attr("src") + ")"), $("#mid-text-banner").hide()
            }), $("a.canopy-nav").hover(function() {
                $("svg#hero").css("background-image", "url(" + $("#can-hero").attr("src") + ")"), width > 868 && $("#canopy-text-banner").show()
            }, function() {
                $("#canopy-text-banner").hide(), $("svg#hero").css("background-image", "url(" + $("#main-hero").attr("src") + ")")
            }), $("a.forecourt-nav").hover(function() {
                $("svg#hero").css("background-image", "url(" + $("#court-hero").attr("src") + ")"), width > 868 && $("#forecourt-text-banner").show()
            }, function() {
                $("#forecourt-text-banner").hide(), $("svg#hero").css("background-image", "url(" + $("#main-hero").attr("src") + ")")
            }), $(".js-logo-exxon").hover(function() {
                e($(this))
            }, function() {
                t($(this))
            }), $(".js-logo-esso").hover(function() {
                e($(this))
            }, function() {
                t($(this))
            }), $(".js-logo-mobil").hover(function() {
                e($(this))
            }, function() {
                t($(this))
            }), $(".video-wrapper").each(function(e) {
                videoWrapper = $(this), video = $(this).children("video");
                var t = function() {
                        video.addClass("has-media-controls-hidden"), video.removeAttr("controls", "controls"), videoPlayButton = videoWrapper.find(".video-overlay-play-button"), videoPlayButton.click(n)
                    },
                    n = function() {
                        video = $(this).prev(), video.get(0).play(), $(this).addClass("is-hidden"), video.removeClass("has-media-controls-hidden"), video.attr("controls", "controls")
                    };
                t()
            })
        }), $(window).on("load", function() {
            "" != $(".alert.alert-danger").html() && $(".alert.alert-danger").addClass("active-flash")
        })
    }), jQuery(function() {
        function e(e) {
            return e.split("-").length
        }

        function t(t) {
            $("html,body").animate({
                scrollTop: $(t).offset().top
            }, "fast"), 4 == e(t) && n(t)
        }

        function n(e) {
            $button = $(e).next().find("button"), $button.removeClass("collapsed"), $button.attr("aria-expanded", "true"), contentDivId = $button.attr("data-target"), $(contentDivId).addClass("show")
        }

        function o(e) {
            var t = location.origin,
                n = location.pathname,
                i = $("#user-current-selection").data().countryAbr,
                o = $("#user-current-selection").data().languageAbr,
                r = $("#user-current-selection").data().masterbrand;
            selectionURL = "?country=" + i + "&language=" + o + "&masterbrand=" + r, history.replaceState(null, null, t + n + selectionURL + e)
        }

        function r() {
            var t = /[A-Za-z]+/,
                n = $(location).attr("href"),
                i = $(location).attr("hash");
            if (!i.match(t)) {
                var o = $(i).next(".header-placeholder, .pdf-ignore, .accordion");
                if (4 == e(i)) var r = o.html().match(/<button.+<div/),
                    s = r[0].replace(/\<button.+"\>/, "").replace(/<div/, "");
                else var s = o.html().split("<div")[0];
                var a = "#" + s.replace(/[^A-Za-z0-9]/g, "-").replace(/\-+/g, "-"),
                    l = n.replace(i, a);
                history.replaceState(null, null, l)
            }
        }

        function s(e) {
            var t = e.attr("id").replace("attach-li-", ""),
                n = $(".sidebar-menu #number-" + t + " a span").text(),
                i = $(".sidebar-menu #number-" + t + " a").text().replace(n, "");
            return i
        }

        function a() {
            if (pathName = window.location.pathname, pathName.indexOf("mid") >= 0 || pathName.indexOf("canopy") >= 0 || pathName.indexOf("forecourt") >= 0) {
                $("#country-select").on("change", l), $(".langs, .header-bar .logo a").click(l);
                var e = localStorage.getItem("position");
                if (e) {
                    var t = JSON.parse(e),
                        n = 6e4,
                        i = $(location).attr("hash");
                    Date.now() < t.timestamp + n && !i && d(t.data), localStorage.removeItem("position")
                }
            }
        }

        function l() {
            $(".info-holder").children().each(function() {
                return $(this).is(":visible") && c($(this)) ? (u($(this)), !1) : void 0
            })
        }

        function c(e) {
            var t = e.offset().top,
                n = t + e.outerHeight(),
                i = $(window).scrollTop(),
                o = i + $(window).height(),
                r = (o + i) / 2;
            return n > r && r > t
        }

        function u(e) {
            var t = e.prevAll(".section-header").first().attr("id");
            localStorage.setItem("position", JSON.stringify({
                data: t,
                timestamp: Date.now()
            }))
        }

        function d(e) {
            if ($("#" + e).length > 0) history.pushState(null, null, "#" + e);
            else {
                if (-1 == e.indexOf("-")) return !1;
                e = e.substring(0, e.length - 2), d(e)
            }
        }

        function h() {
            $(window).on("load", function() {
                var e = /[A-Za-z]+/,
                    t = $(location).attr("hash");
                t && !t.match(e) ? ($("html,body").animate({
                    scrollTop: $(t).offset().top
                }, "fast"), 4 == t.split("-").length && n(t), r()) : t && t.match(e) && f(t)
            })
        }

        function f(t) {
            $(".section-header").each(function() {
                var n = $(this).attr("id"),
                    i = $(this).next(".header-placeholder, .pdf-ignore, .accordion"),
                    o = e(n);
                if (i.length > 0 && 4 == o) var r = i.html().match(/<button.+<div/),
                    s = r[0].replace(/\<button.+"\>/, "").replace(/<div/, "");
                else if (i.length > 0) var s = i.html().split("<div")[0];
                s && p(t, s, o, n)
            })
        }

        function p(e, t, i, o) {
            var r = "#" + t.replace(/[^A-Za-z0-9]/g, "-").replace(/\-+/g, "-");
            e == r && ($("html,body").animate({
                scrollTop: $("#" + o).offset().top
            }, "fast"), 4 == i && n("#" + o))
        }

        function m() {
            i = 0, $(".lightgallery").each(function() {
                $(this).lightGallery({
                    galleryId: i,
                    enableTouch: !0,
                    zoom: !0,
                    scale: 1
                }), i++
            })
        }

        function g() {
            var e;
            $(window).on("load scroll", function() {
                w || (e && window.clearTimeout(e), e = window.setTimeout(function() {
                    v()
                }, 250))
            })
        }

        function v() {
            $(".info-holder").children().each(function() {
                $(this).is(":visible") && c($(this)) && y($(this))
            })
        }

        function y(t) {
            var n = t.prevAll(".section-header").first().attr("id");
            if (n && e(n) > 1) {
                var i = parseInt(n.split("-")[1]),
                    o = $(".sidebar-menu > li:nth-child(" + i + ") > a");
                o.addClass("current-view"), b(o)
            }
        }

        function b(e) {
            $(".current-view").each(function() {
                $(this).text() != e.text() && $(this).removeClass("current-view")
            })
        }
        var w = !1;
        $(".sliding-link").on("click", function(e) {
            e.preventDefault(), w = !1;
            var n = $(this).attr("href");
            o(n), r(), setTimeout(function() {
                t(n)
            }, 200), setTimeout(function() {
                w = !0, setTimeout(function() {
                    w = !1
                }, 500)
            }, 200), setTimeout(function() {
                v()
            }, 750)
        }), $(window).on("load resize", function() {
            var e = window.innerWidth;
            if (e > 1150) $(".pdf-scope > #content").css("padding-left", "34px"), $("#footer .footer-padding").css("padding-left", "34px");
            else if (868 >= e) $(".pdf-scope > #content").css("padding-left", "0px"), $("#footer .footer-padding").css("padding-left", "0px");
            else {
                var t = .166667 * Math.round(1150 - e) + 34;
                $(".pdf-scope > #content").css("padding-left", t), $("#footer .footer-padding").css("padding-left", t)
            }
            868 >= e && $(".sidebar-menu .tertiary-content").each(function() {
                0 == $(this).children("ul").children("a").length && $(this).children("ul").prepend("<a href='#' class='btn-back'>" + s($(this)) + "</a>")
            })
        }), a(), h(), m(), g()
    }), $(document).ready(function() {
        $("#lightgallery").lightGallery(), wrapTablesForScrolling(), manipulateEmailLinks()
    }), orderMobileImages(), addScrollbarsToTables(), jQuery(function() {
        resizeNavbar(), initMobileNavigation(), initMobileNav(), initDropdownToggleClass(), initStickySidebar(), initTouchNav(), initHideMenu(), activateNavbarSelection(), displayForMobile(), checkSideBarHover()
    }), TouchNav.isActiveOn = function(e) {
        return e && e.touchNavActive
    }, TouchNav.prototype = {
        init: function() {
            "string" == typeof this.options.navBlock ? this.menu = document.getElementById(this.options.navBlock) : "object" == typeof this.options.navBlock && (this.menu = this.options.navBlock), this.menu && this.addEvents()
        },
        addEvents: function() {
            var e = this,
                t = navigator.pointerEnabled && "pointerdown" || navigator.msPointerEnabled && "MSPointerDown" || this.isTouchDevice && "touchstart";
            this.menuItems = lib.queryElementsBySelector(this.options.menuItems, this.menu);
            for (var n = function(n) {
                    var i = lib.queryElementsBySelector(e.options.menuDrop, n)[0],
                        o = lib.queryElementsBySelector(e.options.menuOpener, n)[0];
                    i && o && (e.isTouchDevice || e.isPointerDevice) && (lib.event.add(o, "click", lib.bind(e.clickHandler, e)), lib.event.add(o, "mousedown", lib.bind(e.mousedownHandler, e)), lib.event.add(o, t, function(t) {
                        return e.isTouchPointerEvent(t) ? (e.touchFlag = !0, e.currentItem = n, e.currentLink = o, void e.pressHandler.apply(e, arguments)) : void(e.preventCurrentClick = !1)
                    })), jQuery(n).bind("mouseenter", function() {
                        e.touchFlag || (e.currentItem = n, e.mouseoverHandler())
                    }), jQuery(n).bind("mouseleave", function(t) {
                        if (1 == isBrowserIE())
                            if (!e.touchFlag && ($(t.target).hasClass("bg-gray") || $(t.target).parents(".bg-gray").length > 0 || $(t.target).hasClass("bg-red") || $(t.target).parents(".bg-red").length > 0)) {
                                var i = $(t.target);
                                setTimeout(function() {
                                    checkHoverForIE(i)
                                }, 200)
                            } else e.touchFlag || checkHoverForIE($(t.target));
                        else e.touchFlag || (e.currentItem = n, e.mouseoutHandler())
                    }), n.touchNavActive = !0
                }, i = 0; i < this.menuItems.length; i++) n(e.menuItems[i]);
            (this.isTouchDevice || this.isPointerDevice) && (lib.event.add(document.documentElement, "mousedown", lib.bind(this.clickOutsideHandler, this)), lib.event.add(document.documentElement, t, lib.bind(this.clickOutsideHandler, this)))
        },
        mousedownHandler: function(e) {
            this.touchFlag && (e.preventDefault(), this.touchFlag = !1, this.preventCurrentClick = !1)
        },
        mouseoverHandler: function() {
            lib.addClass(this.currentItem, this.options.hoverClass), jQuery(this.currentItem).trigger("itemhover"), checkTertiary(this.currentItem)
        },
        mouseoutHandler: function() {
            checkHover(this)
        },
        hideActiveDropdown: function() {
            for (var e = 0; e < this.menuItems.length; e++) lib.hasClass(this.menuItems[e], this.options.hoverClass) && (lib.removeClass(this.menuItems[e], this.options.hoverClass), jQuery(this.menuItems[e]).trigger("itemleave"));
            this.activeParent = null
        },
        pressHandler: function(e) {
            if (this.currentItem !== this.activeParent && (this.activeParent && this.currentItem.parentNode === this.activeParent.parentNode ? lib.removeClass(this.activeParent, this.options.hoverClass) : this.isParent(this.activeParent, this.currentLink) || this.hideActiveDropdown()), this.activeParent = this.currentItem, lib.hasClass(this.currentItem, this.options.hoverClass)) this.preventCurrentClick = !1;
            else {
                var t = window.innerWidth;
                t > 868 && (e.preventDefault(), this.preventCurrentClick = !0, lib.addClass(this.currentItem, this.options.hoverClass), jQuery(this.currentItem).trigger("itemhover"))
            }
        },
        clickHandler: function(e) {
            this.preventCurrentClick && e.preventDefault()
        },
        clickOutsideHandler: function(e) {
            var t = e.changedTouches ? e.changedTouches[0] : e;
            this.activeParent && !this.isParent(this.menu, t.target) && (this.hideActiveDropdown(), this.touchFlag = !1)
        },
        isParent: function(e, t) {
            for (; t.parentNode;) {
                if (t.parentNode == e) return !0;
                t = t.parentNode
            }
            return !1
        },
        isTouchPointerEvent: function(e) {
            return e.type.indexOf("touch") > -1 || navigator.pointerEnabled && "touch" === e.pointerType || navigator.msPointerEnabled && e.pointerType == e.MSPOINTER_TYPE_TOUCH
        },
        isPointerDevice: function() {
            return !(!navigator.pointerEnabled && !navigator.msPointerEnabled)
        }(),
        isTouchDevice: function() {
            return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
        }()
    }, lib = {
        hasClass: function(e, t) {
            return e && e.className ? e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)")) : !1
        },
        addClass: function(e, t) {
            e && !this.hasClass(e, t) && (e.className += " " + t)
        },
        removeClass: function(e, t) {
            e && this.hasClass(e, t) && (e.className = e.className.replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " "))
        },
        extend: function(e) {
            for (var t = 1; t < arguments.length; t++)
                for (var n in arguments[t]) arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
            return e
        },
        each: function(e, t) {
            var n, i;
            if ("number" == typeof e.length)
                for (n = 0, i = e.length; i > n && t.call(e[n], n, e[n]) !== !1; n++);
            else
                for (n in e)
                    if (e.hasOwnProperty(n) && t.call(e[n], n, e[n]) === !1) break
        },
        event: function() {
            var e = function(e) {
                return e = e || window.event, e.isFixed ? e : (e.isFixed = !0, e.target || (e.target = e.srcElement), e.preventDefault = e.preventDefault || function() {
                    this.returnValue = !1
                }, e.stopPropagation = e.stopPropagation || function() {
                    this.cancelBubble = !0
                }, e)
            };
            return {
                add: function(t, n, i) {
                    t.events || (t.events = {}, t.handle = function(n) {
                        var i, o = t.events[n.type];
                        n = e(n);
                        for (var r = 0, s = o.length; s > r; r++) o[r] && (i = o[r].call(t, n), i === !1 && (n.preventDefault(), n.stopPropagation()))
                    }), t.events[n] || (t.events[n] = [], t.addEventListener ? t.addEventListener(n, t.handle, !1) : t.attachEvent && t.attachEvent("on" + n, t.handle)), t.events[n].push(i)
                },
                remove: function(e, t, n) {
                    for (var i = e.events[t], o = i.length - 1; o >= 0; o--) i[o] === n && i.splice(o, 1);
                    i.length || (delete e.events[t], e.removeEventListener ? e.removeEventListener(t, e.handle, !1) : e.detachEvent && e.detachEvent("on" + t, e.handle))
                }
            }
        }(),
        queryElementsBySelector: function(e, t) {
            if (t = t || document, !e) return [];
            if (">*" === e) return t.children;
            if ("function" == typeof document.querySelectorAll) return t.querySelectorAll(e);
            for (var n = e.split(","), i = [], o = 0; o < n.length; o++) {
                for (var r = [t || document], s = n[o].replace(/^\s+/, "").replace(/\s+$/, "").split(" "), a = 0; a < s.length; a++)
                    if (token = s[a].replace(/^\s+/, "").replace(/\s+$/, ""), token.indexOf("#") > -1) {
                        var l = token.split("#"),
                            c = l[0],
                            u = l[1],
                            d = document.getElementById(u);
                        if (d && c && d.nodeName.toLowerCase() != c) return [];
                        r = d ? [d] : []
                    } else if (token.indexOf(".") > -1) {
                    for (var l = token.split("."), c = l[0] || "*", h = l[1], f = [], p = 0, m = 0; m < r.length; m++) {
                        var g;
                        g = "*" == c ? r[m].getElementsByTagName("*") : r[m].getElementsByTagName(c);
                        for (var v = 0; v < g.length; v++) f[p++] = g[v]
                    }
                    r = [];
                    for (var y = 0, b = 0; b < f.length; b++) f[b].className && f[b].className.match(new RegExp("(\\s|^)" + h + "(\\s|$)")) && (r[y++] = f[b])
                } else if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
                    var c = RegExp.$1 || "*",
                        w = RegExp.$2,
                        C = RegExp.$3,
                        _ = RegExp.$4;
                    "for" == w.toLowerCase() && this.browser.msie && this.browser.version < 8 && (w = "htmlFor");
                    for (var f = [], p = 0, m = 0; m < r.length; m++) {
                        var g;
                        g = "*" == c ? r[m].getElementsByTagName("*") : r[m].getElementsByTagName(c);
                        for (var v = 0; g[v]; v++) f[p++] = g[v]
                    }
                    r = [];
                    var x, y = 0;
                    switch (C) {
                        case "=":
                            x = function(e) {
                                return e.getAttribute(w) == _
                            };
                            break;
                        case "~":
                            x = function(e) {
                                return e.getAttribute(w).match(new RegExp("(\\s|^)" + _ + "(\\s|$)"))
                            };
                            break;
                        case "|":
                            x = function(e) {
                                return e.getAttribute(w).match(new RegExp("^" + _ + "-?"))
                            };
                            break;
                        case "^":
                            x = function(e) {
                                return 0 == e.getAttribute(w).indexOf(_)
                            };
                            break;
                        case "$":
                            x = function(e) {
                                return e.getAttribute(w).lastIndexOf(_) == e.getAttribute(w).length - _.length
                            };
                            break;
                        case "*":
                            x = function(e) {
                                return e.getAttribute(w).indexOf(_) > -1
                            };
                            break;
                        default:
                            x = function(e) {
                                return e.getAttribute(w)
                            }
                    }
                    r = [];
                    for (var y = 0, b = 0; b < f.length; b++) x(f[b]) && (r[y++] = f[b])
                } else {
                    c = token;
                    for (var f = [], p = 0, m = 0; m < r.length; m++)
                        for (var g = r[m].getElementsByTagName(c), v = 0; v < g.length; v++) f[p++] = g[v];
                    r = f
                }
                i = [].concat(i, r)
            }
            return i
        },
        trim: function(e) {
            return e.replace(/^\s+/, "").replace(/\s+$/, "")
        },
        bind: function(e, t, n) {
            return function() {
                return e.apply(t, "undefined" != typeof n ? [n] : arguments)
            }
        }
    }, window.ResponsiveHelper = function(e) {
        function t() {
            var t = a.width();
            t !== r && (r = t, e.each(s, function(t, i) {
                e.each(i.data, function(e, t) {
                    t.currentActive && !n(t.range[0], t.range[1]) && (t.currentActive = !1, "function" == typeof t.disableCallback && t.disableCallback())
                }), e.each(i.data, function(e, t) {
                    !t.currentActive && n(t.range[0], t.range[1]) && (t.currentActive = !0, "function" == typeof t.enableCallback && t.enableCallback())
                })
            }))
        }

        function n(e, t) {
            var n = "";
            return e > 0 && (n += "(min-width: " + e + "px)"), 1 / 0 > t && (n += (n ? " and " : "") + "(max-width: " + t + "px)"), i(n, e, t)
        }

        function i(e, t, n) {
            return window.matchMedia && l ? matchMedia(e).matches : window.styleMedia ? styleMedia.matchMedium(e) : window.media ? media.matchMedium(e) : r >= t && n >= r
        }

        function o(e) {
            var t = e.split(".."),
                n = parseInt(t[0], 10) || -(1 / 0),
                i = parseInt(t[1], 10) || 1 / 0;
            return [n, i].sort(function(e, t) {
                return e - t
            })
        }
        var r, s = [],
            a = e(window),
            l = !1;
        return window.matchMedia && (window.Window && window.matchMedia === Window.prototype.matchMedia ? l = !0 : window.matchMedia.toString().indexOf("native") > -1 && (l = !0)), a.bind("load resize orientationchange", t), {
            addRange: function(n) {
                var i = {
                    data: {}
                };
                e.each(n, function(e, t) {
                    i.data[e] = {
                        range: o(e),
                        enableCallback: t.on,
                        disableCallback: t.off
                    }
                }), s.push(i), r = null, t()
            }
        }
    }(jQuery),
    function(e) {
        function t(t) {
            this.options = e.extend({
                container: null,
                hideOnClickOutside: !1,
                menuActiveClass: "nav-active",
                menuOpener: ".nav-opener",
                menuDrop: ".nav-drop",
                toggleEvent: "click",
                outsideClickEvent: "click touchstart pointerdown MSPointerDown"
            }, t), this.initStructure(), this.attachEvents()
        }
        t.prototype = {
            initStructure: function() {
                this.page = e("html"), this.container = e(this.options.container), this.opener = this.container.find(this.options.menuOpener), this.drop = this.container.find(this.options.menuDrop)
            },
            attachEvents: function() {
                var t = this;
                n && (n(), n = null), this.outsideClickHandler = function(n) {
                    if (t.isOpened()) {
                        var i = e(n.target);
                        i.closest(t.opener).length || i.closest(t.drop).length || t.hide()
                    }
                }, this.openerClickHandler = function(e) {
                    e.preventDefault(), t.toggle()
                }, this.opener.on(this.options.toggleEvent, this.openerClickHandler)
            },
            isOpened: function() {
                return this.container.hasClass(this.options.menuActiveClass)
            },
            show: function() {
                this.container.addClass(this.options.menuActiveClass), this.options.hideOnClickOutside && this.page.on(this.options.outsideClickEvent, this.outsideClickHandler), setTimeout('$(".js-search-input").focus();', 250)
            },
            hide: function() {
                this.container.removeClass(this.options.menuActiveClass), this.options.hideOnClickOutside && this.page.off(this.options.outsideClickEvent, this.outsideClickHandler)
            },
            toggle: function() {
                this.isOpened() ? this.hide() : this.show()
            },
            destroy: function() {
                this.container.removeClass(this.options.menuActiveClass), this.opener.off(this.options.toggleEvent, this.clickHandler), this.page.off(this.options.outsideClickEvent, this.outsideClickHandler)
            }
        };
        var n = function() {
            var t, n, i = e(window),
                o = e("html"),
                r = "resize-active",
                s = function() {
                    t = !1, o.removeClass(r)
                },
                a = function() {
                    t || (t = !0, o.addClass(r)), clearTimeout(n), n = setTimeout(s, 500)
                };
            i.on("resize orientationchange", a)
        };
        e.fn.mobileNav = function(n) {
            var i = Array.prototype.slice.call(arguments),
                o = i[0];
            return this.each(function() {
                var r = jQuery(this),
                    s = r.data("MobileNav");
                "object" == typeof n || "undefined" == typeof n ? r.data("MobileNav", new t(e.extend({
                    container: this
                }, n))) : "string" == typeof o && s && "function" == typeof s[o] && (i.shift(), s[o].apply(s, i))
            })
        }
    }(jQuery),
    function(e) {
        function t(t) {
            this.options = e.extend({
                addClassBeforeAnimation: !0,
                hideOnClickOutside: !1,
                slider: "#nav",
                listItems: "li",
                opener: "> a",
                nextLevel: "> .drop-wrap > .dropdown",
                activeClass: "active-state",
                backBtn: '<a href="#" class="btn-back" />',
                navActiveClass: "menu-active",
                animSpeed: 400
            }, t), this.init()
        }
        t.prototype = {
            init: function() {
                this.options.holder && (this.findElements(), this.attachEvents(), this.makeCallback("onInit", this))
            },
            findElements: function() {
                var t = this;
                this.holder = e(this.options.holder), this.slider = this.holder.find(this.options.slider), this.allListItems = this.slider.find(this.options.listItems).has(this.options.nextLevel), this.allOpeners = e(), this.levelCounter = 0, this.allBack = e(), this.allListItems.each(function() {
                    var n = e(this),
                        i = n.find(t.options.opener),
                        o = n.find(t.options.nextLevel),
                        r = (n.closest(o), e(t.options.backBtn)),
                        s = i.text();
                    r.text(s).prependTo(o), t.allOpeners = t.allOpeners.add(i), i.data({
                        drop: o,
                        listItem: n,
                        backLink: r
                    }), n.data({
                        drop: o,
                        opener: i
                    }), t.allBack = t.allBack.add(r), n.hasClass(t.options.activeClass) && t.levelCounter++
                }), this.moveOffset = this.slider.innerWidth()
            },
            attachEvents: function() {
                var t = this;
                this.resizeHandler = function() {
                    t.onPageResize()
                }, e(window).on("resize orientationchange load", this.resizeHandler), this.allOpeners.each(function() {
                    var n = e(this),
                        i = n.data("backLink"),
                        o = window.innerWidth;
                    n.on("click.menu", function(e) {
                        e.preventDefault(), t.showLevel(n.data("listItem"), o)
                    }), i && i.length && i.on("click.menu", function(e) {
                        e.preventDefault(), t.hideLevel(n.data("listItem"), o)
                    })
                })
            },
            showLevel: function(e, t) {
                var n = this;
                jQuery(n.options.holder).addClass(n.options.navActiveClass), t > 868 && (++this.levelCounter, this.moveSlider()), e.siblings().removeClass(this.options.activeClass), e.addClass(this.options.activeClass)
            },
            hideLevel: function(e, t) {
                var n = this;
                --this.levelCounter, 0 === n.levelCounter && jQuery(n.options.holder).removeClass(n.options.navActiveClass), t > 868 && this.moveSlider({
                    complete: function() {
                        e.removeClass(n.options.activeClass)
                    }
                })
            },
            hideAllLevels: function() {
                var e = this;
                this.levelCounter = 0, jQuery(e.options.holder).removeClass(e.options.navActiveClass), this.moveSlider({
                    complete: function() {
                        e.allListItems.removeClass(e.options.activeClass)
                    }
                })
            },
            moveSlider: function(e) {
                this.slider.stop().animate({
                    marginLeft: -this.levelCounter * this.moveOffset
                }, e && e.noAnim ? 0 : this.options.animSpeed, function() {
                    e && e.complete && e.complete()
                })
            },
            onPageResize: function() {
                this.moveOffset = this.slider.innerWidth(), this.moveSlider({
                    noAnim: !0
                })
            },
            destroy: function() {
                this.allOpeners.off("click.menu"), this.allBack.remove(), this.allListItems.removeClass(this.options.activeClass), this.slider.stop().css({
                    marginLeft: ""
                }), e(window).off("resize orientationchange load", this.resizeHandler)
            },
            makeCallback: function(e) {
                if ("function" == typeof this.options[e]) {
                    var t = Array.prototype.slice.call(arguments);
                    t.shift(), this.options[e].apply(this, t)
                }
            }
        }, e.fn.mobileNavigation = function(n) {
            return this.each(function() {
                jQuery(this).data("MobileNavigation", new t(e.extend(n, {
                    holder: this
                })))
            })
        }
    }(jQuery),
    function(e, t) {
        "function" == typeof define && define.amd ? define(["jquery"], function(e) {
            return t(e)
        }) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(e.jQuery)
    }(this, function(e) {
        ! function() {
            "use strict";

            function t(t, i) {
                if (this.el = t, this.$el = e(t), this.s = e.extend({}, n, i), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = e(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(e(this.s.selector)) : this.$items = this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this
            }
            var n = {
                mode: "lg-slide",
                cssEasing: "ease",
                easing: "linear",
                speed: 600,
                height: "100%",
                width: "100%",
                addClass: "",
                startClass: "lg-start-zoom",
                backdropDuration: 150,
                hideBarsDelay: 6e3,
                useLeft: !1,
                closable: !0,
                loop: !0,
                escKey: !0,
                keyPress: !0,
                controls: !0,
                slideEndAnimatoin: !0,
                hideControlOnEnd: !1,
                mousewheel: !0,
                getCaptionFromTitleOrAlt: !0,
                appendSubHtmlTo: ".lg-sub-html",
                subHtmlSelectorRelative: !1,
                preload: 1,
                showAfterLoad: !0,
                selector: "",
                selectWithin: "",
                nextHtml: "",
                prevHtml: "",
                index: !1,
                iframeMaxWidth: "100%",
                download: !0,
                counter: !0,
                appendCounterTo: ".lg-toolbar",
                swipeThreshold: 50,
                enableSwipe: !0,
                enableDrag: !0,
                dynamic: !1,
                dynamicEl: [],
                galleryId: 1
            };
            t.prototype.init = function() {
                var t = this;
                t.s.preload > t.$items.length && (t.s.preload = t.$items.length);
                var n = window.location.hash;
                n.indexOf("lg=" + this.s.galleryId) > 0 && (t.index = parseInt(n.split("&slide=")[1], 10), e("body").addClass("lg-from-hash"), e("body").hasClass("lg-on") || (setTimeout(function() {
                    t.build(t.index);
                }), e("body").addClass("lg-on"))), t.s.dynamic ? (t.$el.trigger("onBeforeOpen.lg"), t.index = t.s.index || 0, e("body").hasClass("lg-on") || setTimeout(function() {
                    t.build(t.index), e("body").addClass("lg-on")
                })) : t.$items.on("click.lgcustom", function(n) {
                    try {
                        n.preventDefault(), n.preventDefault()
                    } catch (i) {
                        n.returnValue = !1
                    }
                    t.$el.trigger("onBeforeOpen.lg"), t.index = t.s.index || t.$items.index(this), e("body").hasClass("lg-on") || (t.build(t.index), e("body").addClass("lg-on"))
                })
            }, t.prototype.build = function(t) {
                var n = this;
                n.structure(), e.each(e.fn.lightGallery.modules, function(t) {
                    n.modules[t] = new e.fn.lightGallery.modules[t](n.el)
                }), n.slide(t, !1, !1, !1), n.s.keyPress && n.keyPress(), n.$items.length > 1 ? (n.arrow(), setTimeout(function() {
                    n.enableDrag(), n.enableSwipe()
                }, 50), n.s.mousewheel && n.mousewheel()) : n.$slide.on("click.lg", function() {
                    n.$el.trigger("onSlideClick.lg")
                }), n.counter(), n.closeGallery(), n.$el.trigger("onAfterOpen.lg"), n.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
                    n.$outer.removeClass("lg-hide-items"), clearTimeout(n.hideBartimeout), n.hideBartimeout = setTimeout(function() {
                        n.$outer.addClass("lg-hide-items")
                    }, n.s.hideBarsDelay)
                }), n.$outer.trigger("mousemove.lg")
            }, t.prototype.structure = function() {
                var t, n = "",
                    i = "",
                    o = 0,
                    r = "",
                    s = this;
                for (e("body").append('<div class="lg-backdrop"></div>'), e(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), o = 0; o < this.$items.length; o++) n += '<div class="lg-item"></div>';
                if (this.s.controls && this.$items.length > 1 && (i = '<div class="lg-actions"><button class="lg-prev lg-icon">' + this.s.prevHtml + '</button><button class="lg-next lg-icon">' + this.s.nextHtml + "</button></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (r = '<div class="lg-sub-html"></div>'), t = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + n + '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' + i + r + "</div></div>", e("body").append(t), this.$outer = e(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), s.setTop(), e(window).on("resize.lg orientationchange.lg", function() {
                        setTimeout(function() {
                            s.setTop()
                        }, 100)
                    }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
                    var a = this.$outer.find(".lg-inner");
                    a.css("transition-timing-function", this.s.cssEasing), a.css("transition-duration", this.s.speed + "ms")
                }
                setTimeout(function() {
                    e(".lg-backdrop").addClass("in")
                }), setTimeout(function() {
                    s.$outer.addClass("lg-visible")
                }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = e(window).scrollTop()
            }, t.prototype.setTop = function() {
                if ("100%" !== this.s.height) {
                    var t = e(window).height(),
                        n = (t - parseInt(this.s.height, 10)) / 2,
                        i = this.$outer.find(".lg");
                    t >= parseInt(this.s.height, 10) ? i.css("top", n + "px") : i.css("top", "0px")
                }
            }, t.prototype.doCss = function() {
                var e = function() {
                    var e = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"],
                        t = document.documentElement,
                        n = 0;
                    for (n = 0; n < e.length; n++)
                        if (e[n] in t.style) return !0
                };
                return e() ? !0 : !1
            }, t.prototype.isVideo = function(e, t) {
                var n;
                if (n = this.s.dynamic ? this.s.dynamicEl[t].html : this.$items.eq(t).attr("data-html"), !e) return n ? {
                    html5: !0
                } : (console.error("lightGallery :- data-src is not pvovided on slide item " + (t + 1) + ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"), !1);
                var i = e.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
                    o = e.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                    r = e.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                    s = e.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
                return i ? {
                    youtube: i
                } : o ? {
                    vimeo: o
                } : r ? {
                    dailymotion: r
                } : s ? {
                    vk: s
                } : void 0
            }, t.prototype.counter = function() {
                this.s.counter && e(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>")
            }, t.prototype.addHtml = function(t) {
                var n, i, o = null;
                if (this.s.dynamic ? this.s.dynamicEl[t].subHtmlUrl ? n = this.s.dynamicEl[t].subHtmlUrl : o = this.s.dynamicEl[t].subHtml : (i = this.$items.eq(t), i.attr("data-sub-html-url") ? n = i.attr("data-sub-html-url") : (o = i.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !o && (o = i.attr("title") || i.find("img").first().attr("alt")))), !n)
                    if ("undefined" != typeof o && null !== o) {
                        var r = o.substring(0, 1);
                        ("." === r || "#" === r) && (o = this.s.subHtmlSelectorRelative && !this.s.dynamic ? i.find(o).html() : e(o).html())
                    } else o = "";
                    ".lg-sub-html" === this.s.appendSubHtmlTo ? n ? this.$outer.find(this.s.appendSubHtmlTo).load(n) : this.$outer.find(this.s.appendSubHtmlTo).html(o) : n ? this.$slide.eq(t).load(n) : this.$slide.eq(t).append(o), "undefined" != typeof o && null !== o && ("" === o ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [t])
            }, t.prototype.preload = function(e) {
                var t = 1,
                    n = 1;
                for (t = 1; t <= this.s.preload && !(t >= this.$items.length - e); t++) this.loadContent(e + t, !1, 0);
                for (n = 1; n <= this.s.preload && !(0 > e - n); n++) this.loadContent(e - n, !1, 0)
            }, t.prototype.loadContent = function(t, n, i) {
                var o, r, s, a, l, c, u = this,
                    d = !1,
                    h = function(t) {
                        for (var n = [], i = [], o = 0; o < t.length; o++) {
                            var s = t[o].split(" ");
                            "" === s[0] && s.splice(0, 1), i.push(s[0]), n.push(s[1])
                        }
                        for (var a = e(window).width(), l = 0; l < n.length; l++)
                            if (parseInt(n[l], 10) > a) {
                                r = i[l];
                                break
                            }
                    };
                if (u.s.dynamic) {
                    if (u.s.dynamicEl[t].poster && (d = !0, s = u.s.dynamicEl[t].poster), c = u.s.dynamicEl[t].html, r = u.s.dynamicEl[t].src, u.s.dynamicEl[t].responsive) {
                        var f = u.s.dynamicEl[t].responsive.split(",");
                        h(f)
                    }
                    a = u.s.dynamicEl[t].srcset, l = u.s.dynamicEl[t].sizes
                } else {
                    if (u.$items.eq(t).attr("data-poster") && (d = !0, s = u.$items.eq(t).attr("data-poster")), c = u.$items.eq(t).attr("data-html"), r = u.$items.eq(t).attr("href") || u.$items.eq(t).attr("data-src"), u.$items.eq(t).attr("data-responsive")) {
                        var p = u.$items.eq(t).attr("data-responsive").split(",");
                        h(p)
                    }
                    a = u.$items.eq(t).attr("data-srcset"), l = u.$items.eq(t).attr("data-sizes")
                }
                var m = !1;
                u.s.dynamic ? u.s.dynamicEl[t].iframe && (m = !0) : "true" === u.$items.eq(t).attr("data-iframe") && (m = !0);
                var g = u.isVideo(r, t);
                if (!u.$slide.eq(t).hasClass("lg-loaded")) {
                    if (m) u.$slide.eq(t).prepend('<div class="lg-video-cont lg-has-iframe" style="max-width:' + u.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + r + '"  allowfullscreen="true"></iframe></div></div>');
                    else if (d) {
                        var v = "";
                        v = g && g.youtube ? "lg-has-youtube" : g && g.vimeo ? "lg-has-vimeo" : "lg-has-html5", u.$slide.eq(t).prepend('<div class="lg-video-cont ' + v + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + s + '" /></div></div>')
                    } else g ? (u.$slide.eq(t).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), u.$el.trigger("hasVideo.lg", [t, r, c])) : u.$slide.eq(t).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + r + '" /></div>');
                    if (u.$el.trigger("onAferAppendSlide.lg", [t]), o = u.$slide.eq(t).find(".lg-object"), l && o.attr("sizes", l), a) {
                        o.attr("srcset", a);
                        try {
                            picturefill({
                                elements: [o[0]]
                            })
                        } catch (y) {
                            console.warn("lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.")
                        }
                    }
                    ".lg-sub-html" !== this.s.appendSubHtmlTo && u.addHtml(t), u.$slide.eq(t).addClass("lg-loaded")
                }
                u.$slide.eq(t).find(".lg-object").on("load.lg error.lg", function() {
                    var n = 0;
                    i && !e("body").hasClass("lg-from-hash") && (n = i), setTimeout(function() {
                        u.$slide.eq(t).addClass("lg-complete"), u.$el.trigger("onSlideItemLoad.lg", [t, i || 0])
                    }, n)
                }), g && g.html5 && !d && u.$slide.eq(t).addClass("lg-complete"), n === !0 && (u.$slide.eq(t).hasClass("lg-complete") ? u.preload(t) : u.$slide.eq(t).find(".lg-object").on("load.lg error.lg", function() {
                    u.preload(t)
                }))
            }, t.prototype.slide = function(t, n, i, o) {
                var r = this.$outer.find(".lg-current").index(),
                    s = this;
                if (!s.lGalleryOn || r !== t) {
                    var a = this.$slide.length,
                        l = s.lGalleryOn ? this.s.speed : 0;
                    if (!s.lgBusy) {
                        if (this.s.download) {
                            var c;
                            c = s.s.dynamic ? s.s.dynamicEl[t].downloadUrl !== !1 && (s.s.dynamicEl[t].downloadUrl || s.s.dynamicEl[t].src) : "false" !== s.$items.eq(t).attr("data-download-url") && (s.$items.eq(t).attr("data-download-url") || s.$items.eq(t).attr("href") || s.$items.eq(t).attr("data-src")), c ? (e("#lg-download").attr("href", c), s.$outer.removeClass("lg-hide-download")) : s.$outer.addClass("lg-hide-download")
                        }
                        if (this.$el.trigger("onBeforeSlide.lg", [r, t, n, i]), s.lgBusy = !0, clearTimeout(s.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
                                s.addHtml(t)
                            }, l), this.arrowDisable(t), o || (r > t ? o = "prev" : t > r && (o = "next")), n) {
                            this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");
                            var u, d;
                            a > 2 ? (u = t - 1, d = t + 1, 0 === t && r === a - 1 ? (d = 0, u = a - 1) : t === a - 1 && 0 === r && (d = 0, u = a - 1)) : (u = 0, d = 1), "prev" === o ? s.$slide.eq(d).addClass("lg-next-slide") : s.$slide.eq(u).addClass("lg-prev-slide"), s.$slide.eq(t).addClass("lg-current")
                        } else s.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), "prev" === o ? (this.$slide.eq(t).addClass("lg-prev-slide"), this.$slide.eq(r).addClass("lg-next-slide")) : (this.$slide.eq(t).addClass("lg-next-slide"), this.$slide.eq(r).addClass("lg-prev-slide")), setTimeout(function() {
                            s.$slide.removeClass("lg-current"), s.$slide.eq(t).addClass("lg-current"), s.$outer.removeClass("lg-no-trans")
                        }, 50);
                        s.lGalleryOn ? (setTimeout(function() {
                            s.loadContent(t, !0, 0)
                        }, this.s.speed + 50), setTimeout(function() {
                            s.lgBusy = !1, s.$el.trigger("onAfterSlide.lg", [r, t, n, i])
                        }, this.s.speed)) : (s.loadContent(t, !0, s.s.backdropDuration), s.lgBusy = !1, s.$el.trigger("onAfterSlide.lg", [r, t, n, i])), s.lGalleryOn = !0, this.s.counter && e("#lg-counter-current").text(t + 1)
                    }
                    s.index = t
                }
            }, t.prototype.goToNextSlide = function(e) {
                var t = this,
                    n = t.s.loop;
                e && t.$slide.length < 3 && (n = !1), t.lgBusy || (t.index + 1 < t.$slide.length ? (t.index++, t.$el.trigger("onBeforeNextSlide.lg", [t.index]), t.slide(t.index, e, !1, "next")) : n ? (t.index = 0, t.$el.trigger("onBeforeNextSlide.lg", [t.index]), t.slide(t.index, e, !1, "next")) : t.s.slideEndAnimatoin && !e && (t.$outer.addClass("lg-right-end"), setTimeout(function() {
                    t.$outer.removeClass("lg-right-end")
                }, 400)))
            }, t.prototype.goToPrevSlide = function(e) {
                var t = this,
                    n = t.s.loop;
                e && t.$slide.length < 3 && (n = !1), t.lgBusy || (t.index > 0 ? (t.index--, t.$el.trigger("onBeforePrevSlide.lg", [t.index, e]), t.slide(t.index, e, !1, "prev")) : n ? (t.index = t.$items.length - 1, t.$el.trigger("onBeforePrevSlide.lg", [t.index, e]), t.slide(t.index, e, !1, "prev")) : t.s.slideEndAnimatoin && !e && (t.$outer.addClass("lg-left-end"), setTimeout(function() {
                    t.$outer.removeClass("lg-left-end")
                }, 400)))
            }, t.prototype.keyPress = function() {
                var t = this;
                this.$items.length > 1 && e(window).on("keyup.lg", function(e) {
                    t.$items.length > 1 && (37 === e.keyCode && (e.preventDefault(), t.goToPrevSlide()), 39 === e.keyCode && (e.preventDefault(), t.goToNextSlide()))
                }), e(window).on("keydown.lg", function(e) {
                    t.s.escKey === !0 && 27 === e.keyCode && (e.preventDefault(), t.$outer.hasClass("lg-thumb-open") ? t.$outer.removeClass("lg-thumb-open") : t.destroy())
                })
            }, t.prototype.arrow = function() {
                var e = this;
                this.$outer.find(".lg-prev").on("click.lg", function() {
                    e.goToPrevSlide()
                }), this.$outer.find(".lg-next").on("click.lg", function() {
                    e.goToNextSlide()
                })
            }, t.prototype.arrowDisable = function(e) {
                !this.s.loop && this.s.hideControlOnEnd && (e + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), e > 0 ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
            }, t.prototype.setTranslate = function(e, t, n) {
                this.s.useLeft ? e.css("left", t) : e.css({
                    transform: "translate3d(" + t + "px, " + n + "px, 0px)"
                })
            }, t.prototype.touchMove = function(t, n) {
                var i = n - t;
                Math.abs(i) > 15 && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), i, 0), this.setTranslate(e(".lg-prev-slide"), -this.$slide.eq(this.index).width() + i, 0), this.setTranslate(e(".lg-next-slide"), this.$slide.eq(this.index).width() + i, 0))
            }, t.prototype.touchEnd = function(e) {
                var t = this;
                "lg-slide" !== t.s.mode && t.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function() {
                    t.$outer.removeClass("lg-dragging"), 0 > e && Math.abs(e) > t.s.swipeThreshold ? t.goToNextSlide(!0) : e > 0 && Math.abs(e) > t.s.swipeThreshold ? t.goToPrevSlide(!0) : Math.abs(e) < 5 && t.$el.trigger("onSlideClick.lg"), t.$slide.removeAttr("style")
                }), setTimeout(function() {
                    t.$outer.hasClass("lg-dragging") || "lg-slide" === t.s.mode || t.$outer.removeClass("lg-slide")
                }, t.s.speed + 100)
            }, t.prototype.enableSwipe = function() {
                var e = this,
                    t = 0,
                    n = 0,
                    i = !1;
                e.s.enableSwipe && e.doCss() && (e.$slide.on("touchstart.lg", function(n) {
                    e.$outer.hasClass("lg-zoomed") || e.lgBusy || (n.preventDefault(), e.manageSwipeClass(), t = n.originalEvent.targetTouches[0].pageX)
                }), e.$slide.on("touchmove.lg", function(o) {
                    e.$outer.hasClass("lg-zoomed") || (o.preventDefault(), n = o.originalEvent.targetTouches[0].pageX, e.touchMove(t, n), i = !0)
                }), e.$slide.on("touchend.lg", function() {
                    e.$outer.hasClass("lg-zoomed") || (i ? (i = !1, e.touchEnd(n - t)) : e.$el.trigger("onSlideClick.lg"))
                }))
            }, t.prototype.enableDrag = function() {
                var t = this,
                    n = 0,
                    i = 0,
                    o = !1,
                    r = !1;
                t.s.enableDrag && t.doCss() && (t.$slide.on("mousedown.lg", function(i) {
                    t.$outer.hasClass("lg-zoomed") || t.lgBusy || e(i.target).text().trim() || (i.preventDefault(), t.manageSwipeClass(), n = i.pageX, o = !0, t.$outer.scrollLeft += 1, t.$outer.scrollLeft -= 1, t.$outer.removeClass("lg-grab").addClass("lg-grabbing"), t.$el.trigger("onDragstart.lg"))
                }), e(window).on("mousemove.lg", function(e) {
                    o && (r = !0, i = e.pageX, t.touchMove(n, i), t.$el.trigger("onDragmove.lg"))
                }), e(window).on("mouseup.lg", function(s) {
                    r ? (r = !1, t.touchEnd(i - n), t.$el.trigger("onDragend.lg")) : (e(s.target).hasClass("lg-object") || e(s.target).hasClass("lg-video-play")) && t.$el.trigger("onSlideClick.lg"), o && (o = !1, t.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
                }))
            }, t.prototype.manageSwipeClass = function() {
                var e = this.index + 1,
                    t = this.index - 1;
                this.s.loop && this.$slide.length > 2 && (0 === this.index ? t = this.$slide.length - 1 : this.index === this.$slide.length - 1 && (e = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), t > -1 && this.$slide.eq(t).addClass("lg-prev-slide"), this.$slide.eq(e).addClass("lg-next-slide")
            }, t.prototype.mousewheel = function() {
                var e = this;
                e.$outer.on("mousewheel.lg", function(t) {
                    t.deltaY && (t.deltaY > 0 ? e.goToPrevSlide() : e.goToNextSlide(), t.preventDefault())
                })
            }, t.prototype.closeGallery = function() {
                var t = this,
                    n = !1;
                this.$outer.find(".lg-close").on("click.lg", function() {
                    t.destroy()
                }), t.s.closable && (t.$outer.on("mousedown.lg", function(t) {
                    n = e(t.target).is(".lg-outer") || e(t.target).is(".lg-item ") || e(t.target).is(".lg-img-wrap") ? !0 : !1
                }), t.$outer.on("mousemove.lg", function() {
                    n = !1
                }), t.$outer.on("mouseup.lg", function(i) {
                    (e(i.target).is(".lg-outer") || e(i.target).is(".lg-item ") || e(i.target).is(".lg-img-wrap") && n) && (t.$outer.hasClass("lg-dragging") || t.destroy())
                }))
            }, t.prototype.destroy = function(t) {
                var n = this;
                t || (n.$el.trigger("onBeforeClose.lg"), e(window).scrollTop(n.prevScrollTop)), t && (n.s.dynamic || this.$items.off("click.lg click.lgcustom"), e.removeData(n.el, "lightGallery")), this.$el.off(".lg.tm"), e.each(e.fn.lightGallery.modules, function(e) {
                    n.modules[e] && n.modules[e].destroy()
                }), this.lGalleryOn = !1, clearTimeout(n.hideBartimeout), this.hideBartimeout = !1, e(window).off(".lg"), e("body").removeClass("lg-on lg-from-hash"), n.$outer && n.$outer.removeClass("lg-visible"), e(".lg-backdrop").removeClass("in"), setTimeout(function() {
                    n.$outer && n.$outer.remove(), e(".lg-backdrop").remove(), t || n.$el.trigger("onCloseAfter.lg")
                }, n.s.backdropDuration + 50)
            }, e.fn.lightGallery = function(n) {
                return this.each(function() {
                    if (e.data(this, "lightGallery")) try {
                        e(this).data("lightGallery").init()
                    } catch (i) {
                        console.error("lightGallery has not initiated properly")
                    } else e.data(this, "lightGallery", new t(this, n))
                })
            }, e.fn.lightGallery.modules = {}
        }()
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define(["jquery"], function(e) {
            return t(e)
        }) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(this, function(e) {
        ! function() {
            "use strict";
            var t = function() {
                    var e = !1,
                        t = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                    return t && parseInt(t[2], 10) < 54 && (e = !0), e
                },
                n = {
                    scale: 1,
                    zoom: !0,
                    actualSize: !0,
                    enableZoomAfter: 300,
                    useLeftForZoom: t()
                },
                i = function(t) {
                    return this.core = e(t).data("lightGallery"), this.core.s = e.extend({}, n, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = !1, this.pageX = e(window).width() / 2, this.pageY = e(window).height() / 2 + e(window).scrollTop()), this
                };
            i.prototype.init = function() {
                var t = this,
                    n = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
                t.core.s.actualSize && (n += '<span id="lg-actual-size" class="lg-icon"></span>'), t.core.s.useLeftForZoom ? t.core.$outer.addClass("lg-use-left-for-zoom") : t.core.$outer.addClass("lg-use-transition-for-zoom"), this.core.$outer.find(".lg-toolbar").append(n), t.core.$el.on("onSlideItemLoad.lg.tm.zoom", function(n, i, o) {
                    var r = t.core.s.enableZoomAfter + o;
                    e("body").hasClass("lg-from-hash") && o ? r = 0 : e("body").removeClass("lg-from-hash"), t.zoomabletimeout = setTimeout(function() {
                        t.core.$slide.eq(i).addClass("lg-zoomable")
                    }, r + 30)
                });
                var i = 1,
                    o = function(n) {
                        var i, o, r = t.core.$outer.find(".lg-current .lg-image"),
                            s = (e(window).width() - r.prop("offsetWidth")) / 2,
                            a = (e(window).height() - r.prop("offsetHeight")) / 2 + e(window).scrollTop();
                        i = t.pageX - s, o = t.pageY - a;
                        var l = (n - 1) * i,
                            c = (n - 1) * o;
                        r.css("transform", "scale3d(" + n + ", " + n + ", 1)").attr("data-scale", n), t.core.s.useLeftForZoom ? r.parent().css({
                            left: -l + "px",
                            top: -c + "px"
                        }).attr("data-x", l).attr("data-y", c) : r.parent().css("transform", "translate3d(-" + l + "px, -" + c + "px, 0)").attr("data-x", l).attr("data-y", c)
                    },
                    r = function() {
                        i > 1 ? t.core.$outer.addClass("lg-zoomed") : t.resetZoom(), 1 > i && (i = 1), o(i)
                    },
                    s = function(n, o, s, a) {
                        var l, c = o.prop("offsetWidth");
                        l = t.core.s.dynamic ? t.core.s.dynamicEl[s].width || o[0].naturalWidth || c : t.core.$items.eq(s).attr("data-width") || o[0].naturalWidth || c;
                        var u;
                        t.core.$outer.hasClass("lg-zoomed") ? i = 1 : l > c && (u = l / c, i = u || 2), a ? (t.pageX = e(window).width() / 2, t.pageY = e(window).height() / 2 + e(window).scrollTop()) : (t.pageX = n.pageX || n.originalEvent.targetTouches[0].pageX, t.pageY = n.pageY || n.originalEvent.targetTouches[0].pageY), r(), setTimeout(function() {
                            t.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                        }, 10)
                    },
                    a = !1;
                t.core.$el.on("onAferAppendSlide.lg.tm.zoom", function(e, n) {
                    var i = t.core.$slide.eq(n).find(".lg-image");
                    i.on("dblclick", function(e) {
                        s(e, i, n)
                    }), i.on("touchstart", function(e) {
                        a ? (clearTimeout(a), a = null, s(e, i, n)) : a = setTimeout(function() {
                            a = null
                        }, 300), e.preventDefault()
                    })
                }), e(window).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function() {
                    t.pageX = e(window).width() / 2, t.pageY = e(window).height() / 2 + e(window).scrollTop(), o(i)
                }), e("#lg-zoom-out").on("click.lg", function() {
                    t.core.$outer.find(".lg-current .lg-image").length && (i -= t.core.s.scale, r())
                }), e("#lg-zoom-in").on("click.lg", function() {
                    t.core.$outer.find(".lg-current .lg-image").length && (i += t.core.s.scale, r())
                }), e("#lg-actual-size").on("click.lg", function(e) {
                    s(e, t.core.$slide.eq(t.core.index).find(".lg-image"), t.core.index, !0)
                }), t.core.$el.on("onBeforeSlide.lg.tm", function() {
                    i = 1, t.resetZoom()
                }), t.zoomDrag(), t.zoomSwipe()
            }, i.prototype.resetZoom = function() {
                this.core.$outer.removeClass("lg-zoomed"), this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y"), this.core.$slide.find(".lg-image").removeAttr("style data-scale"), this.pageX = e(window).width() / 2, this.pageY = e(window).height() / 2 + e(window).scrollTop()
            }, i.prototype.zoomSwipe = function() {
                var e = this,
                    t = {},
                    n = {},
                    i = !1,
                    o = !1,
                    r = !1;
                e.core.$slide.on("touchstart.lg", function(n) {
                    if (e.core.$outer.hasClass("lg-zoomed")) {
                        var i = e.core.$slide.eq(e.core.index).find(".lg-object");
                        r = i.prop("offsetHeight") * i.attr("data-scale") > e.core.$outer.find(".lg").height(), o = i.prop("offsetWidth") * i.attr("data-scale") > e.core.$outer.find(".lg").width(), (o || r) && (n.preventDefault(), t = {
                            x: n.originalEvent.targetTouches[0].pageX,
                            y: n.originalEvent.targetTouches[0].pageY
                        })
                    }
                }), e.core.$slide.on("touchmove.lg", function(s) {
                    if (e.core.$outer.hasClass("lg-zoomed")) {
                        var a, l, c = e.core.$slide.eq(e.core.index).find(".lg-img-wrap");
                        s.preventDefault(), i = !0, n = {
                            x: s.originalEvent.targetTouches[0].pageX,
                            y: s.originalEvent.targetTouches[0].pageY
                        }, e.core.$outer.addClass("lg-zoom-dragging"), l = r ? -Math.abs(c.attr("data-y")) + (n.y - t.y) : -Math.abs(c.attr("data-y")), a = o ? -Math.abs(c.attr("data-x")) + (n.x - t.x) : -Math.abs(c.attr("data-x")), (Math.abs(n.x - t.x) > 15 || Math.abs(n.y - t.y) > 15) && (e.core.s.useLeftForZoom ? c.css({
                            left: a + "px",
                            top: l + "px"
                        }) : c.css("transform", "translate3d(" + a + "px, " + l + "px, 0)"))
                    }
                }), e.core.$slide.on("touchend.lg", function() {
                    e.core.$outer.hasClass("lg-zoomed") && i && (i = !1, e.core.$outer.removeClass("lg-zoom-dragging"), e.touchendZoom(t, n, o, r))
                })
            }, i.prototype.zoomDrag = function() {
                var t = this,
                    n = {},
                    i = {},
                    o = !1,
                    r = !1,
                    s = !1,
                    a = !1;
                t.core.$slide.on("mousedown.lg.zoom", function(i) {
                    var r = t.core.$slide.eq(t.core.index).find(".lg-object");
                    a = r.prop("offsetHeight") * r.attr("data-scale") > t.core.$outer.find(".lg").height(), s = r.prop("offsetWidth") * r.attr("data-scale") > t.core.$outer.find(".lg").width(), t.core.$outer.hasClass("lg-zoomed") && e(i.target).hasClass("lg-object") && (s || a) && (i.preventDefault(), n = {
                        x: i.pageX,
                        y: i.pageY
                    }, o = !0, t.core.$outer.scrollLeft += 1, t.core.$outer.scrollLeft -= 1, t.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"))
                }), e(window).on("mousemove.lg.zoom", function(e) {
                    if (o) {
                        var l, c, u = t.core.$slide.eq(t.core.index).find(".lg-img-wrap");
                        r = !0, i = {
                            x: e.pageX,
                            y: e.pageY
                        }, t.core.$outer.addClass("lg-zoom-dragging"), c = a ? -Math.abs(u.attr("data-y")) + (i.y - n.y) : -Math.abs(u.attr("data-y")), l = s ? -Math.abs(u.attr("data-x")) + (i.x - n.x) : -Math.abs(u.attr("data-x")), t.core.s.useLeftForZoom ? u.css({
                            left: l + "px",
                            top: c + "px"
                        }) : u.css("transform", "translate3d(" + l + "px, " + c + "px, 0)")
                    }
                }), e(window).on("mouseup.lg.zoom", function(e) {
                    o && (o = !1, t.core.$outer.removeClass("lg-zoom-dragging"), !r || n.x === i.x && n.y === i.y || (i = {
                        x: e.pageX,
                        y: e.pageY
                    }, t.touchendZoom(n, i, s, a)), r = !1), t.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                })
            }, i.prototype.touchendZoom = function(e, t, n, i) {
                var o = this,
                    r = o.core.$slide.eq(o.core.index).find(".lg-img-wrap"),
                    s = o.core.$slide.eq(o.core.index).find(".lg-object"),
                    a = -Math.abs(r.attr("data-x")) + (t.x - e.x),
                    l = -Math.abs(r.attr("data-y")) + (t.y - e.y),
                    c = (o.core.$outer.find(".lg").height() - s.prop("offsetHeight")) / 2,
                    u = Math.abs(s.prop("offsetHeight") * Math.abs(s.attr("data-scale")) - o.core.$outer.find(".lg").height() + c),
                    d = (o.core.$outer.find(".lg").width() - s.prop("offsetWidth")) / 2,
                    h = Math.abs(s.prop("offsetWidth") * Math.abs(s.attr("data-scale")) - o.core.$outer.find(".lg").width() + d);
                (Math.abs(t.x - e.x) > 15 || Math.abs(t.y - e.y) > 15) && (i && (-u >= l ? l = -u : l >= -c && (l = -c)), n && (-h >= a ? a = -h : a >= -d && (a = -d)), i ? r.attr("data-y", Math.abs(l)) : l = -Math.abs(r.attr("data-y")), n ? r.attr("data-x", Math.abs(a)) : a = -Math.abs(r.attr("data-x")), o.core.s.useLeftForZoom ? r.css({
                    left: a + "px",
                    top: l + "px"
                }) : r.css("transform", "translate3d(" + a + "px, " + l + "px, 0)"))
            }, i.prototype.destroy = function() {
                var t = this;
                t.core.$el.off(".lg.zoom"), e(window).off(".lg.zoom"), t.core.$slide.off(".lg.zoom"), t.core.$el.off(".lg.tm.zoom"), t.resetZoom(), clearTimeout(t.zoomabletimeout), t.zoomabletimeout = !1
            }, e.fn.lightGallery.modules.zoom = i
        }()
    }),
    function() {
        jQuery(function(e) {
            e.fn.bootstrapSwitch.defaults.size = "small", e.fn.bootstrapSwitch.defaults.onColor = "success", e(".country-switch").bootstrapSwitch(), e(".all-countries-switch").bootstrapSwitch(), e("input#all_countries").on("switchChange.bootstrapSwitch", function(t, n) {
                return e("input.country-switch").bootstrapSwitch("state", n, !0)
            }), e("input.country-switch").on("switchChange.bootstrapSwitch", function(t, n) {
                return e("input.country-switch").filter(":checked").length === e("input.country-switch").length ? e("input#all_countries").bootstrapSwitch("state", !0, !0) : e("input#all_countries").bootstrapSwitch("state", !1, !0)
            })
        }), $(document).ready(function() {
            return $("#filter-country").on("click", function() {
                $(".country-list").submit()
            })
        })
    }.call(this);
var font = function() {
    var e = "mmmmmmmmmwwwwwww",
        t = '"Comic Sans MS"',
        n = 0,
        i = null,
        o = 0;
    return {
        setup: function() {
            $("#fontInstalledTest").length || ($("head").append("<style> #fontInstalledTest, #fontTestBed { position: absolute; left: -9999px; top: 0; visibility: hidden; } #fontInstalledTest { font-size: 50px!important; font-family: " + t + ";}</style>"), $("body").append('<div id="fontTestBed"></div>').append('<span id="fontInstalledTest" class="fonttest">' + e + "</span>"), i = $("#fontTestBed"), n = $("#fontInstalledTest").width())
        },
        isInstalled: function(r) {
            o++;
            var s = '<style id="fonttestStyle"> #fonttest' + o + " { font-size: 50px!important; font-family: " + r + ", " + t + "; } </style>";
            return $("head").find("#fonttestStyle").remove().end().append(s), i.empty().append('<span id="fonttest' + o + '" class="fonttest">' + e + "</span>"), i.find("span").width() != n
        }
    }
}();
(function() {
    jQuery(function(e) {
        return font.setup(), font.isInstalled("EMprintW01-Regular") ? void 0 : e(".navbar-default").css("font-size", "17px")
    })
}).call(this), $(function() {
        function e() {
            var e = $("#country-data").data().masterbrandCountries,
                t = $("#country-data").data().masterbrands,
                n = [],
                i = t.slice();
            $(".country-access input:checked").each(function() {
                n.push($(this).attr("id"))
            }), $(".masterbrand-select").children("input").each(function() {
                $(this).attr("disabled", !0)
            }), $.each(n, function(n, o) {
                $.each(t, function(t, n) {
                    e[n] && e[n].indexOf(o) >= 0 && ($(".masterbrand-select #" + n).removeAttr("disabled"), $(".masterbrand-select #" + n).next("text").css("color", "#231f20"), $(".masterbrand-select #" + n).next("text").css("opacity", "1"), i.indexOf(n) >= 0 && i.splice(i.indexOf(n), 1))
                })
            }), $.each(i, function(e, t) {
                $(".masterbrand-select #" + t).prop("checked", !1), $(".masterbrand-select #" + t).attr("disabled", !0), $(".masterbrand-select #" + t).next("text").css("color", "#777777"), $(".masterbrand-select #" + t).next("text").css("opacity", "0.3")
            })
        }

        function t() {
            var e = $("#country-data").data().languageCountries,
                t = $("#country-data").data().languages,
                i = [],
                o = t.slice();
            if ($(".country-access input:checked").each(function() {
                    i.push($(this).attr("id"))
                }), $.each(i, function(n, i) {
                    $.each(t, function(t, n) {
                        e[n] && e[n].indexOf(i) >= 0 && ($("#" + n + "-group").css({
                            display: "block"
                        }), o.indexOf(n) >= 0 && o.splice(o.indexOf(n), 1))
                    })
                }), $.each(o, function(e, t) {
                    $("#" + t + "-group").children("input").prop("checked", !1), $("#" + t + "-group").css({
                        display: "none"
                    })
                }), t.length - o.length > 1 ? $(".language-selection").css({
                    display: "block"
                }) : ($(".language-selection").css({
                    display: "none"
                }), $(".language-selection").find("input").prop("checked", !1)), 3 == o.length) {
                var r = n(t, o);
                $(".language-selection input#" + r).prop("checked", !0)
            }
        }

        function n(e, t) {
            for (var n = [], i = [], o = 0; o < e.length; o++) n[e[o]] = !0;
            for (var o = 0; o < t.length; o++) n[t[o]] ? delete n[t[o]] : n[t[o]] = !0;
            for (var r in n) i.push(r);
            return i[0]
        }
        $(".role-select").click(function(e) {
            const t = ["role-wholesaler", "role-dealer", "role-employee"],
                n = ["role-agency", "role-installer", "role-supplier"];
            t.indexOf(e.target.id) >= 0 ? $(".role-select").not(this).prop("checked", !1) : n.indexOf(e.target.id) >= 0 && !$("#" + e.target.id).prop("checked") ? $(".role-select").prop("checked", !1) : n.indexOf(e.target.id) >= 0 ? ($(".role-select").not(this).prop("checked", !1), $("#role-").prop("checked", !0)) : $(".role-select").prop("checked", !1)
        }), $(".seller-type-select").click(function() {
            $(".seller-type-select").not(this).prop("checked", !1)
        }), $(".language-select").click(function() {
            $(".language-select").not(this).prop("checked", !1)
        }), $(".landing-country-select").click(function() {
            $(".landing-country-select").not(this).prop("checked", !1)
        }), document.location.pathname.match(/admin\/users\/\d+\/edit/gi) && (t(), e()), $(".country-access").change(e), $(".country-access").change(t)
    }), $(function() {
        $("#whats-new").stickyTableHeaders()
    }),
    function(e, t, n) {
        "use strict";

        function i(n, i) {
            var a = this;
            a.$el = e(n), a.el = n, a.id = r++, a.$window = e(t), a.$document = e(document), a.$el.bind("destroyed", e.proxy(a.teardown, a)), a.$clonedHeader = null, a.$originalHeader = null, a.isSticky = !1, a.hasBeenSticky = !1, a.leftOffset = null, a.topOffset = null, a.init = function() {
                a.$el.each(function() {
                    var t = e(this);
                    t.css("padding", 0), a.$originalHeader = e("thead:first", this), a.$clonedHeader = a.$originalHeader.clone(), t.trigger("clonedHeader." + o, [a.$clonedHeader]), a.$clonedHeader.addClass("tableFloatingHeader"), a.$clonedHeader.css("display", "none"), a.$originalHeader.addClass("tableFloatingHeaderOriginal"), a.$originalHeader.after(a.$clonedHeader), a.$printStyle = e('<style type="text/css" media="print">.tableFloatingHeader{display:none !important;}.tableFloatingHeaderOriginal{position:static !important;}</style>'), e("head").append(a.$printStyle)
                }), a.setOptions(i), a.updateWidth(), a.toggleHeaders(), a.bind()
            }, a.destroy = function() {
                a.$el.unbind("destroyed", a.teardown), a.teardown()
            }, a.teardown = function() {
                a.isSticky && a.$originalHeader.css("position", "static"), e.removeData(a.el, "plugin_" + o), a.unbind(), a.$clonedHeader.remove(), a.$originalHeader.removeClass("tableFloatingHeaderOriginal"), a.$originalHeader.css("visibility", "visible"), a.$printStyle.remove(), a.el = null, a.$el = null
            }, a.bind = function() {
                a.$scrollableArea.on("scroll." + o, a.toggleHeaders), a.isWindowScrolling || (a.$window.on("scroll." + o + a.id, a.setPositionValues), a.$window.on("resize." + o + a.id, a.toggleHeaders)), a.$scrollableArea.on("resize." + o, a.toggleHeaders), a.$scrollableArea.on("resize." + o, a.updateWidth)
            }, a.unbind = function() {
                a.$scrollableArea.off("." + o, a.toggleHeaders), a.isWindowScrolling || (a.$window.off("." + o + a.id, a.setPositionValues), a.$window.off("." + o + a.id, a.toggleHeaders)), a.$scrollableArea.off("." + o, a.updateWidth)
            }, a.toggleHeaders = function() {
                a.$el && a.$el.each(function() {
                    var t, n = e(this),
                        i = a.isWindowScrolling ? isNaN(a.options.fixedOffset) ? a.options.fixedOffset.outerHeight() : a.options.fixedOffset : a.$scrollableArea.offset().top + (isNaN(a.options.fixedOffset) ? 0 : a.options.fixedOffset),
                        o = n.offset(),
                        r = a.$scrollableArea.scrollTop() + i,
                        s = a.$scrollableArea.scrollLeft(),
                        l = a.isWindowScrolling ? r > o.top : i > o.top,
                        c = (a.isWindowScrolling ? r : 0) < o.top + n.height() - a.$clonedHeader.height() - (a.isWindowScrolling ? 0 : i);
                    l && c ? (t = o.left - s + a.options.leftOffset, a.$originalHeader.css({
                        position: "fixed",
                        "margin-top": a.options.marginTop,
                        left: t,
                        "z-index": 3
                    }), a.leftOffset = t, a.topOffset = i, a.$clonedHeader.css("display", ""), a.isSticky || (a.isSticky = !0, a.updateWidth()), a.setPositionValues()) : a.isSticky && (a.$originalHeader.css("position", "static"), a.$clonedHeader.css("display", "none"), a.isSticky = !1, a.resetWidth(e("td,th", a.$clonedHeader), e("td,th", a.$originalHeader)))
                })
            }, a.setPositionValues = function() {
                var e = a.$window.scrollTop(),
                    t = a.$window.scrollLeft();
                !a.isSticky || 0 > e || e + a.$window.height() > a.$document.height() || 0 > t || t + a.$window.width() > a.$document.width() || a.$originalHeader.css({
                    top: a.topOffset - (a.isWindowScrolling ? 0 : e),
                    left: a.leftOffset - (a.isWindowScrolling ? 0 : t)
                })
            }, a.updateWidth = function() {
                if (a.isSticky) {
                    a.$originalHeaderCells || (a.$originalHeaderCells = e("th,td", a.$originalHeader)), a.$clonedHeaderCells || (a.$clonedHeaderCells = e("th,td", a.$clonedHeader));
                    var t = a.getWidth(a.$clonedHeaderCells);
                    a.setWidth(t, a.$clonedHeaderCells, a.$originalHeaderCells), a.$originalHeader.css("width", a.$clonedHeader.width())
                }
            }, a.getWidth = function(n) {
                var i = [];
                return n.each(function(n) {
                    var o, r = e(this);
                    if ("border-box" === r.css("box-sizing")) o = r[0].getBoundingClientRect().width;
                    else {
                        var s = e("th", a.$originalHeader);
                        if ("collapse" === s.css("border-collapse"))
                            if (t.getComputedStyle) o = parseFloat(t.getComputedStyle(this, null).width);
                            else {
                                var l = parseFloat(r.css("padding-left")),
                                    c = parseFloat(r.css("padding-right")),
                                    u = parseFloat(r.css("border-width"));
                                o = r.outerWidth() - l - c - u
                            } else o = r.width()
                    }
                    i[n] = o
                }), i
            }, a.setWidth = function(e, t, n) {
                t.each(function(t) {
                    var i = e[t];
                    n.eq(t).css({
                        "min-width": i,
                        "max-width": i
                    })
                })
            }, a.resetWidth = function(t, n) {
                t.each(function(t) {
                    var i = e(this);
                    n.eq(t).css({
                        "min-width": i.css("min-width"),
                        "max-width": i.css("max-width")
                    })
                })
            }, a.setOptions = function(n) {
                a.options = e.extend({}, s, n), a.$scrollableArea = e(a.options.scrollableArea), a.isWindowScrolling = a.$scrollableArea[0] === t
            }, a.updateOptions = function(e) {
                a.setOptions(e), a.unbind(), a.bind(), a.updateWidth(), a.toggleHeaders()
            }, a.init()
        }
        var o = "stickyTableHeaders",
            r = 0,
            s = {
                fixedOffset: 0,
                leftOffset: 0,
                marginTop: 0,
                scrollableArea: t
            };
        e.fn[o] = function(t) {
            return this.each(function() {
                var n = e.data(this, "plugin_" + o);
                n ? "string" == typeof t ? n[t].apply(n) : n.updateOptions(t) : "destroy" !== t && e.data(this, "plugin_" + o, new i(this, t))
            })
        }
    }(jQuery, window),
    function(e) {
        jQuery.fn.doubleScroll = function(t) {
            var n = {
                contentElement: void 0,
                scrollCss: {
                    "overflow-x": "auto",
                    "overflow-y": "hidden",
                    height: "20px"
                },
                contentCss: {
                    "overflow-x": "auto",
                    "overflow-y": "hidden"
                },
                onlyIfScroll: !0,
                resetOnWindowResize: !1,
                timeToWaitForResize: 30
            };
            e.extend(!0, n, t), e.extend(n, {
                topScrollBarMarkup: '<div class="doubleScroll-scroll-wrapper"><div class="doubleScroll-scroll"></div></div>',
                topScrollBarWrapperSelector: ".doubleScroll-scroll-wrapper",
                topScrollBarInnerSelector: ".doubleScroll-scroll"
            });
            var i = function(t, n) {
                if (n.onlyIfScroll && t.get(0).scrollWidth <= t.width()) return void t.prev(n.topScrollBarWrapperSelector).remove();
                var i = t.prev(n.topScrollBarWrapperSelector);
                if (0 == i.length) {
                    i = e(n.topScrollBarMarkup), t.before(i), i.css(n.scrollCss), e(n.topScrollBarInnerSelector).css("height", "20px"), t.css(n.contentCss), i.bind("scroll.doubleScroll", function() {
                        t.scrollLeft(i.scrollLeft())
                    });
                    var o = function() {
                        i.scrollLeft(t.scrollLeft())
                    };
                    t.bind("scroll.doubleScroll", o)
                }
                var r;
                r = void 0 !== n.contentElement && 0 !== t.find(n.contentElement).length ? t.find(n.contentElement) : t.find(">:first-child"), e(n.topScrollBarInnerSelector, i).width(r.outerWidth()), i.width(t.width()), i.scrollLeft(t.scrollLeft())
            };
            return this.each(function() {
                var t = e(this);
                if (i(t, n), n.resetOnWindowResize) {
                    var o, r = function(e) {
                        i(t, n)
                    };
                    e(window).bind("resize.doubleScroll", function() {
                        clearTimeout(o), o = setTimeout(r, n.timeToWaitForResize)
                    })
                }
            })
        }
    }(jQuery), $(document).ready(function() {
        $(document).on("change", "#country-select", function(e) {
            gl_handle_country_select_change()
        }), $(document).on("change", "#visibility-level-select", function(e) {
            gl_handle_visibility_level_select_change()
        })
    });
