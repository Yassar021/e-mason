"use strict";
exports.id = 599;
exports.ids = [599];
exports.modules = {

/***/ 9599:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_navbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2953);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_firebase_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7307);
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5566);
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_error__WEBPACK_IMPORTED_MODULE_8__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_navbar__WEBPACK_IMPORTED_MODULE_5__, _utils_firebase_auth__WEBPACK_IMPORTED_MODULE_7__]);
([_components_navbar__WEBPACK_IMPORTED_MODULE_5__, _utils_firebase_auth__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const LayoutDashboardUser = ({ pageTitle , children , bgColor , color  })=>{
    const { isOpen , onOpen , onClose  } = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.useDisclosure)();
    const btnRef = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const [check, user] = (0,_utils_firebase_auth__WEBPACK_IMPORTED_MODULE_7__/* .authCheck */ .X)();
    return user?.data?.type === "pengguna" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("title", {
                    children: [
                        "E-Mason App | ",
                        pageTitle
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                height: "auto",
                bgColor: "#E9E8F9",
                pb: "40px",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_navbar__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                        user: user
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Flex, {
                        direction: "row",
                        pr: {
                            lg: "20px",
                            xl: "89px"
                        },
                        gap: {
                            lg: "20px",
                            xl: "89px"
                        },
                        justifyContent: {
                            md: "center",
                            lg: "normal"
                        },
                        textAlign: "center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                width: {
                                    lg: "280px",
                                    xl: "389px"
                                },
                                height: "100vh",
                                bgColor: "#fff",
                                pt: "57px",
                                textAlign: "center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Hide, {
                                    below: "md",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                            px: {
                                                lg: "40px",
                                                xl: "135px"
                                            },
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Avatar, {
                                                    size: "xl",
                                                    name: user?.data?.nama,
                                                    src: user?.data?.avatar
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                    my: "20px",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                    children: user?.data?.nama
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                            px: {
                                                lg: "40px",
                                                xl: "90px"
                                            },
                                            py: "15px",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                                py: "8px",
                                                px: "12px",
                                                width: "210px",
                                                height: "45px",
                                                bgColor: bgColor,
                                                borderRadius: "5px",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
                                                    style: {
                                                        textDecoration: "none"
                                                    },
                                                    href: "/negosiasiUserPage",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                        direction: "row",
                                                        spacing: "12px",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                                mt: "4px",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                                                    width: "22",
                                                                    height: "18",
                                                                    viewBox: "0 0 22 18",
                                                                    fill: "none",
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                        d: "M1 3C1 3 2.5 1 6 1C9.5 1 11 3 11 3V17C11 17 9.5 16 6 16C2.5 16 1 17 1 17V3ZM11 3C11 3 12.5 1 16 1C19.5 1 21 3 21 3V17C21 17 19.5 16 16 16C12.5 16 11 17 11 17V3Z",
                                                                        stroke: "black",
                                                                        strokeWidth: "2",
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round"
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                                color: color,
                                                                fontSize: "20px",
                                                                fontWeight: "600",
                                                                children: "Negosiasi"
                                                            })
                                                        ]
                                                    })
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                            px: {
                                                lg: "40px",
                                                xl: "90px"
                                            },
                                            py: "15px",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                                py: "8px",
                                                px: "12px",
                                                width: "210px",
                                                height: "45px",
                                                bgColor: bgColor,
                                                borderRadius: "5px",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
                                                    style: {
                                                        textDecoration: "none"
                                                    },
                                                    href: "/editProfilePage",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                        direction: "row",
                                                        spacing: "12px",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                                mt: "4px",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                                    width: "22",
                                                                    height: "22",
                                                                    viewBox: "0 0 22 22",
                                                                    fill: "none",
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                            d: "M11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1Z",
                                                                            stroke: "black",
                                                                            strokeWidth: "1.5",
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                            d: "M3.271 17.346C3.271 17.346 5.5 14.5 11 14.5C16.5 14.5 18.73 17.346 18.73 17.346M11 11C11.7956 11 12.5587 10.6839 13.1213 10.1213C13.6839 9.55871 14 8.79565 14 8C14 7.20435 13.6839 6.44129 13.1213 5.87868C12.5587 5.31607 11.7956 5 11 5C10.2043 5 9.44128 5.31607 8.87868 5.87868C8.31607 6.44129 8 7.20435 8 8C8 8.79565 8.31607 9.55871 8.87868 10.1213C9.44128 10.6839 10.2043 11 11 11V11Z",
                                                                            stroke: "black",
                                                                            strokeWidth: "1.5",
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round"
                                                                        })
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                                color: color,
                                                                fontSize: "20px",
                                                                fontWeight: "600",
                                                                children: "Ubah Profile"
                                                            })
                                                        ]
                                                    })
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {})
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                mt: "40px",
                                bgColor: "#ffff",
                                pt: "28px",
                                px: {
                                    base: "4px",
                                    md: "57px"
                                },
                                width: {
                                    base: "100%",
                                    lg: "700px",
                                    xl: "65%",
                                    "2xl": "100%"
                                },
                                height: "auto",
                                borderRadius: "8px",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Hide, {
                                        above: "lg",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                            rightIcon: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                width: "24",
                                                height: "24",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                        d: "M5 7H19",
                                                        stroke: "#CCD2E3",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                        d: "M5 12H19",
                                                        stroke: "#CCD2E3",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                        d: "M5 17H19",
                                                        stroke: "#CCD2E3",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round"
                                                    })
                                                ]
                                            }),
                                            mb: "20px",
                                            bgColor: "#3E38F5",
                                            color: "#fff",
                                            ref: btnRef,
                                            onClick: onOpen,
                                            children: "Menu"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Drawer, {
                                        isOpen: isOpen,
                                        placement: "left",
                                        onClose: onClose,
                                        finalFocusRef: btnRef,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.DrawerOverlay, {}),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.DrawerContent, {
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.DrawerCloseButton, {}),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.DrawerHeader, {
                                                        children: "Menus"
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.DrawerBody, {
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                                                px: {
                                                                    lg: "40px",
                                                                    xl: "135px"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Avatar, {
                                                                        size: "xl",
                                                                        name: user?.data?.nama,
                                                                        src: user?.data?.avatar
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                                        my: "20px",
                                                                        fontSize: "18px",
                                                                        fontWeight: "600",
                                                                        children: user?.data?.nama
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                                                px: {
                                                                    lg: "40px",
                                                                    xl: "90px"
                                                                },
                                                                py: "15px",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                                                    py: "8px",
                                                                    px: "12px",
                                                                    width: "210px",
                                                                    height: "45px",
                                                                    bgColor: bgColor,
                                                                    borderRadius: "5px",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
                                                                        style: {
                                                                            textDecoration: "none"
                                                                        },
                                                                        href: "/negosiasiUserPage",
                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                                            direction: "row",
                                                                            spacing: "12px",
                                                                            children: [
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                                                    mt: "4px",
                                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                                                                        width: "22",
                                                                                        height: "18",
                                                                                        viewBox: "0 0 22 18",
                                                                                        fill: "none",
                                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                                            d: "M1 3C1 3 2.5 1 6 1C9.5 1 11 3 11 3V17C11 17 9.5 16 6 16C2.5 16 1 17 1 17V3ZM11 3C11 3 12.5 1 16 1C19.5 1 21 3 21 3V17C21 17 19.5 16 16 16C12.5 16 11 17 11 17V3Z",
                                                                                            stroke: "black",
                                                                                            strokeWidth: "2",
                                                                                            strokeLinecap: "round",
                                                                                            strokeLinejoin: "round"
                                                                                        })
                                                                                    })
                                                                                }),
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                                                    color: color,
                                                                                    fontSize: "20px",
                                                                                    fontWeight: "600",
                                                                                    children: "Negosiasi"
                                                                                })
                                                                            ]
                                                                        })
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                                                px: {
                                                                    lg: "40px",
                                                                    xl: "90px"
                                                                },
                                                                py: "15px",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                                                    py: "8px",
                                                                    px: "12px",
                                                                    width: "210px",
                                                                    height: "45px",
                                                                    bgColor: bgColor,
                                                                    borderRadius: "5px",
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
                                                                        style: {
                                                                            textDecoration: "none"
                                                                        },
                                                                        href: "/editProfilePage",
                                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                                            direction: "row",
                                                                            spacing: "12px",
                                                                            children: [
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                                                    mt: "4px",
                                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                                                                        width: "22",
                                                                                        height: "22",
                                                                                        viewBox: "0 0 22 22",
                                                                                        fill: "none",
                                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                                        children: [
                                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                                                d: "M11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1Z",
                                                                                                stroke: "black",
                                                                                                strokeWidth: "1.5",
                                                                                                strokeLinecap: "round",
                                                                                                strokeLinejoin: "round"
                                                                                            }),
                                                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                                                                d: "M3.271 17.346C3.271 17.346 5.5 14.5 11 14.5C16.5 14.5 18.73 17.346 18.73 17.346M11 11C11.7956 11 12.5587 10.6839 13.1213 10.1213C13.6839 9.55871 14 8.79565 14 8C14 7.20435 13.6839 6.44129 13.1213 5.87868C12.5587 5.31607 11.7956 5 11 5C10.2043 5 9.44128 5.31607 8.87868 5.87868C8.31607 6.44129 8 7.20435 8 8C8 8.79565 8.31607 9.55871 8.87868 10.1213C9.44128 10.6839 10.2043 11 11 11V11Z",
                                                                                                stroke: "black",
                                                                                                strokeWidth: "1.5",
                                                                                                strokeLinecap: "round",
                                                                                                strokeLinejoin: "round"
                                                                                            })
                                                                                        ]
                                                                                    })
                                                                                }),
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                                                                    color: color,
                                                                                    fontSize: "20px",
                                                                                    fontWeight: "600",
                                                                                    children: "Ubah Profile"
                                                                                })
                                                                            ]
                                                                        })
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {})
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    children
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_error__WEBPACK_IMPORTED_MODULE_8___default()), {
        statusCode: 413
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LayoutDashboardUser);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;