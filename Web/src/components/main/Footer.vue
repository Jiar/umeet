<template>
    <div class="main_footer">
        <div class="main_footer_content">
            <div class="main_footer_inner">
                <div class="main_footer_line">
                    <strong>
                        <a href="#/about" class="dark">关于</a>
                        &nbsp;<span class="snow">·</span>&nbsp;
                        <a href="#/mission" class="dark">我们的愿景</a>
                        &nbsp;<span class="snow">·</span>&nbsp;
                        <span class="dark">2130人在线</span>
                        &nbsp;&nbsp;
                    </strong>
                    <span class="fade">最高记录 2466</span>
                </div>
                <div class="main_footer_info">
                    <div style="height: 20px"></div>
                    umeet 社区
                    <div style="height: 0px"></div>
                    you meet us .
                    <div style="height: 20px"></div>
                    <span class="smail">VERSION: 1.0</span>
                    <div style="height: 20px"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .main_footer {
        border-top: 1px solid rgba(0, 0, 0, 0.22);
        background-color: #fff;
        color: #999;
        padding: 0px 10px 0px 10px;
    }
    .main_footer_content {
        margin: 0px 10px 0px 10px;
    }
    .main_footer_inner {
        padding: 10px;
        font-size: 12px;
        line-height: 150%;
        text-align: left;
    }
    .main_footer_line {
        margin-top: 10px;
    }
    .main_footer_line strong {
        font-size: 12px;
        line-height: 150%;
        text-align: left;
        font-weight: bold;
    }
    .main_footer_inner .fade {
        color: #ccc;
    }
    .main_footer_inner .small {
        font-size: 11px;
    }
    a.dark:link, a.dark:visited, a.dark:active {
        color: gray;
        text-decoration: none;
        word-break: break-all;
    }
    a:-webkit-any-link {
        color: -webkit-link;
        cursor: auto;
        text-decoration: underline;
    }
    .main_footer_info {

    }
</style>
