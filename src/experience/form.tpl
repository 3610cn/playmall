<!-- target: experienceForm -->
    <div class="crumb">
        <span class="title">| ${desc} > 发布活动</span>
    </div>

    <ol data-ui-type="Wizard" data-ui-active-index="1">
        <li data-node-number="1">基本信息</li>
        <li data-node-number="2">活动审核</li>
        <li data-node-number="3">活动上线</li>
    </ol>

    <div data-ui-id="form" data-ui-type="Form" data-ui-submit-button="submit" data-ui-auto-validate="true" class="container">
        <div class="form">

            <div class="row">
                <div class="field-name">活动分类</div>
                <div class="field-value">
                    <div data-ui="type:Select;id:category;width:120;datasource:@data.categoryList;value:@data.category;required:required;" name="category">
                    </div>
                </div>
            </div>

            <!-- if ${user.role === 'admin'} -->
            <div class="row">
                <div class="field-name">推荐级别</div>
                <div class="field-value">
                    <div data-ui="id:starNum;name:starNum;type:Rating;value:@data.starNum;"></div>
                </div>
            </div>
            <!-- /if -->

            <div class="row">
                <div class="field-name">活动名称</div>
                <div class="field-value">
                    <div class="ui-textbox" data-ui="id:name;name:name;type:TextBox;width:500;value:@data.name;required:required;">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">开始时间</div>
                <div class="field-value">
                    <div data-ui="type:Calendar;id:startDate;name:startDate;value:@data.startDate;"></div>
                    <div data-ui="type:Select;id:startTime;width:140;datasource:@timeList;value:@data.startTime;" name="startTime"></div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">结束时间</div>
                <div class="field-value">
                    <div data-ui="type:Calendar;id:endDate;name:endDate;value:@data.endDate;"></div>
                    <div data-ui="type:Select;id:endTime;width:140;datasource:@timeList;value:@data.endTime;" name="endTime"></div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动图片(大图)</div>
                <div class="field-value" style="height:auto;">
                    <div id="preview1" class="preview preview-horizontal"></div>
                    <div class="uploader-detail">
                        <div type="file"
                            data-ui-id="uploader1"
                            data-ui-type="Uploader"
                            data-ui-action="@data.uploadUrl1"
                            data-ui-file-type="auto"
                            data-ui-name="pic1"
                            data-ui-text="&lt;span class='ui-icon-upload'&gt;&lt;/span&gt; 上传文件"
                            title="上传图片或Flash"
                            accept=".gif,.jpg,.png,.swf"
                        ></div>
                        <p class="uploader-desc">
                            1.图片尺寸不低于400*200，推荐800*400
                            <br>
                            2.单张图片大小不超过2MB
                         </p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动图片(小图)</div>
                <div class="field-value" style="height:auto;">
                    <div id="preview2" class="preview preview-vertical"></div>
                    <div class="uploader-detail">
                        <div type="file"
                            data-ui-id="uploader2"
                            data-ui-type="Uploader"
                            data-ui-action="@data.uploadUrl2"
                            data-ui-file-type="auto"
                            data-ui-name="pic2"
                            data-ui-text="&lt;span class='ui-icon-upload'&gt;&lt;/span&gt; 上传文件"
                            title="上传图片或Flash"
                            accept=".gif,.jpg,.png,.swf"
                        ></div>
                        <p class="uploader-desc">
                            1.图片尺寸推荐240*300
                            <br>
                            2.单张图片大小不超过1MB
                         </p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动地点</div>
                <div class="field-value">
                    <div data-ui="type:Select;id:city;width:200;datasource:@cityList;<!-- if: ${user.role} !== 'admin' -->readOnly:readOnly;<!-- /if -->value:@data.city"></div>
                    <div data-ui="type:Select;id:mall;name:mall;width:200;datasource:@mallList;<!-- if: ${user.role} !== 'admin' -->readOnly:readOnly;<!-- /if -->value:@data.mall"></div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动详情</div>
                <div class="field-value detail" style="height:auto;">
                    <div data-ui="type:UMEditor;id:content;name:content;required:required;width:90%;height:600;content:@data.content;"></div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">视频地址</div>
                <div class="field-value" style="height:auto;">
                    <textarea data-ui="type:TextBox;id:videoHtml;name:videoHtml;width:600;height:200;value:@data.videoHtml;"></textarea>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动标签</div>
                <div class="field-value fee-detail" style="height:auto;">
                    <input data-ui="id:tags;name:tags;type:TokenField;limit:30;delimiter:,;width:600;tokens:@data.tags;" />
                </div>
            </div>

            <div class="row">
                <div class="field-value">
                    <button data-ui="type:Button;variants:submit;id:submit;" class="ui-large"><span class="ui-icon-check"></span>确认提交</button>
                </div>
            </div>
        </div>

    </div>
