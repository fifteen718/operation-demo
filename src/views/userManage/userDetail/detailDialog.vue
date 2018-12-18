<template>
    <el-dialog title="用户信息" :visible.sync="detailDialogVisible" width="60%">
        <el-tabs type="border-card" style="height: 500px; overflow: auto;" v-model="activeIndex">
            <el-tab-pane label="基础信息">
                <el-row>
                    <el-col :span="4">注册时间</el-col>
                    <el-col :span="8">{{(baseInfo && $dateFormatter(null, null, baseInfo.ctime)) || '--'}}</el-col>
                    <el-col :span="4">用户ID</el-col>
                    <el-col :span="8">{{(baseInfo && baseInfo.uid) || '--'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">名字</el-col>
                    <el-col :span="8">{{(baseInfo && baseInfo.userName) || '--'}}</el-col>
                    <el-col :span="4">性别</el-col>
                    <el-col :span="8">{{(baseInfo && $genderFormatter(null,null,baseInfo.gender)) || '--'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">地区</el-col>
                    <el-col :span="8">{{(baseInfo && baseInfo.city) || '--'}}</el-col>
                    <el-col :span="4">详细地址</el-col>
                    <el-col :span="8">{{(baseInfo && baseInfo.address) || '--'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">用户段位</el-col>
                    <el-col :span="8">{{(baseInfo && $levelFormatter(null, null, baseInfo.level)) || '--'}}</el-col>
                    <el-col :span="4">注册方式</el-col>
                    <el-col :span="8">{{(baseInfo && $registerTypeFormatter(null, null, baseInfo.registerType)) || '--'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">手机号</el-col>
                    <el-col :span="8">{{(baseInfo && baseInfo.mobile) || '--'}}</el-col>
                    <el-col :span="4">邮箱</el-col>
                    <el-col :span="8">{{(baseInfo && baseInfo.email) || '--'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">是否299会员</el-col>
                    <el-col :span="8">{{(baseInfo && $isVipFormatter(null, null, baseInfo.vip)) || '--'}}</el-col>
                    <el-col :span="4">299会员有效期至</el-col>
                    <el-col :span="8">{{(baseInfo && $dateFormatter(null, null, baseInfo.invalidTime)) || '--'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">公司</el-col>
                    <el-col :span="8">{{(baseInfo && baseInfo.company) || '--'}}</el-col>
                    <el-col :span="4">职务</el-col>
                    <el-col :span="8">{{(baseInfo && baseInfo.position) || '--'}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">一句话介绍</el-col>
                    <el-col :span="8">{{(baseInfo && baseInfo.motto) || '--'}}</el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="资产信息">
                <el-row>
                    <el-col :span="6">LKC余额</el-col>
                    <el-col :span="18">{{assetsInfo}}</el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="路演信息">
                <el-table
                    :data="activityInfo"
                    v-loading="activityLoading"
                    element-loading-text="拼命加载中"
                    height="380px"
                    border>
                    <el-table-column label="项目信息" min-width="240" header-align="center">
                        <template slot-scope="scope">
                            <img :src="scope.row.icon" class="activityInfoIcon"/>
                            <div class="activityInfoContent">
                                <p>{{scope.row.name}}</p>
                                <p>{{scope.row.area}}</p>
                                <p>报名活动：{{scope.row.title}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="获得票数" min-width="80" align="center">
                        <template slot-scope="scope">
                            <label class="amountLabel">{{scope.row.amount}}</label>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ranking" label="比赛结果" min-width="160" align="center">
                        <template slot-scope="scope">
                            <label class="rankingLabel">第{{scope.row.ranking || '?'}}名</label>
                            <el-tag
                                disable-transitions
                                size="medium"
                                :type="scope.row.result === 1 ? 'success' : 'danger'">
                                {{scope.row.result === 1 ? '获胜' : '淘汰'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @current-change="getActivityInfo"
                    :current-page.sync="activityPage"
                    :page-size="20"
                    :total="activityTotal"
                    layout="->, total, prev, pager, next, jumper">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="投票信息">
                <el-table
                    :data="voteInfo"
                    v-loading="voteLoading"
                    element-loading-text="拼命加载中"
                    height="380px"
                    border>
                    <el-table-column label="投票的项目" min-width="240" header-align="center">
                        <template slot-scope="scope">
                            <img :src="scope.row.icon" class="activityInfoIcon"/>
                            <div class="activityInfoContent">
                                <p>{{scope.row.name}}</p>
                                <p>{{scope.row.area}}</p>
                                <p>报名活动：{{scope.row.title}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="我投的票数" min-width="80" align="center">
                        <template slot-scope="scope">
                            <label class="amountLabel">{{scope.row.amount}}</label>
                        </template>
                    </el-table-column>
                    <el-table-column label="比赛结果" prop="ranking" min-width="160" align="center">
                        <template slot-scope="scope">
                            <label class="rankingLabel">第{{scope.row.ranking || '?'}}名</label>
                            <el-tag
                                disable-transitions
                                size="medium"
                                :type="scope.row.result === 1 ? 'success' : 'danger'">
                                {{scope.row.result === 1 ? '获胜' : '淘汰'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @current-change="getVoteInfo"
                    :current-page.sync="votePage"
                    :page-size="20"
                    :total="voteTotal"
                    layout="->, total, prev, pager, next, jumper">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        dialogData: {}
    },
    data() {
        return {
            uid: null,
            detailDialogVisible: false,
            baseInfo: null,
            assetsInfo: null,
            activityInfo: null,
            voteInfo: null,
            activityPage: 1,
            votePage: 1,
            activityTotal: null,
            voteTotal: null,
            activeIndex: '0',
            activityLoading: false,
            voteLoading: false
        }
    },
    watch: {
        value(val) {
            this.detailDialogVisible = val
            if (val) {
                if (!this.uid || this.uid !== this.dialogData.uid) {
                    this.uid = this.dialogData.uid
                    this.init()
                }
            }
        },
        detailDialogVisible(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        init() {
            this.activeIndex = '0'
            this.baseInfo = null
            this.assetsInfo = null
            this.activityInfo = null
            this.voteInfo = null
            this.activityPage = 1
            this.votePage = 1
            this.activityTotal = null
            this.voteTotal = null
            this.getBaseInfo()
            this.getAssetsInfo()
            this.getActivityInfo()
            this.getVoteInfo()
        },
        getBaseInfo() {
            this.$apis.getUserBaseInfo({ uid: this.uid }).then(res => {
                if (res.code === '2000') {
                    this.baseInfo = res.data
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        getAssetsInfo() {
            this.$apis.getLkc({ uid: this.uid }).then(res => {
                if (res.code === '2000') {
                    this.assetsInfo = res.data
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        getActivityInfo() {
            this.$apis.queryActivityInfo({ uid: this.uid, currentPage: this.activityPage }).then(res => {
                if (res.code === '2000') {
                    this.activityInfo = res.data.list
                    this.activityTotal = res.data.total
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        getVoteInfo() {
            this.$apis.queryActivityVoteInfo({ uid: this.uid, currentPage: this.votePage }).then(res => {
                if (res.code === '2000') {
                    this.voteInfo = res.data.list
                    this.voteTotal = res.data.total
                } else {
                    this.$message.error(res.message)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 8px;
    .el-col{
        height: 45px;
        line-height: 45px;
        text-align: center;
        &:nth-child(odd) {
            background: #d3dce6;
        }
        &:nth-child(even) {
            background: #e5e9f2;
            border-right: 8px solid #fff;
        }
    }
}
.activityInfoIcon {
    width: 80px;
    height: 80px;
    display: block;
    float: left;
    margin: 12px 12px 12px 0;
}
.activityInfoContent {
    margin-top: 12px;
    >p {
        font-size: 14px;
        line-height: 26px;
        &:first-child {
            font-weight: bold;
        }
    }
}
.rankingLabel {
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-right: 10px;
}
.amountLabel {
    font-size: 16px;
    font-weight: bold;
}

</style>
