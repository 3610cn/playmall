<!-- target: experienceForm -->
    <div class="title-wrapper">
        <div class="title">
            <h2>发布展示活动</h2>
        </div>
    </div>

    <form data-ui-id="form" data-ui-type="Form" data-ui-submit-button="submit" class="container">
        <ul class="crumb">
            <li class="crumb-active">
                <span class="crumb-left"></span>
                <span class="crumb-text">Step1<br>填写基本信息</span>
                <span class="crumb-right"></span>
            </li>
            <li>
                <span class="crumb-left"></span>
                <span class="crumb-text">Step2<br>活动审核</span>
                <span class="crumb-right"></span>
            </li>
            <li>
                <span class="crumb-left"></span>
                <span class="crumb-text">Step3<br>活动上线</span>
            </li>
        </ul>
        <div class="form">

            <div class="row">
                <div class="field-name">活动分类</div>
                <div class="field-value">
                    <div data-ui="type:Select;id:category;width:120;datasource:@data.categoryList;" name="category">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动名称</div>
                <div class="field-value">
                    <div class="ui-textbox" data-ui="id:name;type:TextBox;width:500;value:@data.name;">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动时间</div>
                <div class="field-value">
                    <div data-ui="type:Calendar;id:date;value:@data.date;"></div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动图片</div>
                <div class="field-value" style="height:auto;">
                    <div id="previewContainer" class="preview"></div>
                    <div class="uploader-detail">
                        <input type="file"
                            data-ui-id="uploader"
                            data-ui-type="Uploader"
                            data-ui-action="@data.uploadUrl1"
                            data-ui-file-type="auto"
                            data-ui-name="file"
                            data-ui-text="&lt;span class='ui-icon-upload'&gt;&lt;/span&gt; 上传文件"
                            title="上传图片或Flash"
                            accept=".gif,.jpg,.png,.swf"
                            />
                        <p class="uploader-desc">
                            1.图片尺寸不低于200*300，推荐600*800
                            <br>
                            2.单张图片大小不超过1MB
                         </p>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动地点</div>
                <div class="field-value">
                    <div data-ui="type:Select;id:mall;width:200;datasource:@data.mallList;"></div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动详情</div>
                <div class="field-value detail" style="height:auto;">
                    <!-- 加载编辑器的容器 -->
                    <script id="editor" name="content" type="text/plain"></script>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动标签</div>
                <div class="field-value fee-detail" style="height:auto;">
                    <input data-ui="id:tags;type:TokenField;limit:30;delimiter:,;width:600;tokens:@data.tags;" />
                </div>
            </div>
        </div>

        <p class="submit">
            <button data-ui="type:Button;variants:danger;id:submit;" class="ui-large"><span class="ui-icon-check"></span>确认提交</button>
        </p>
    </form>

<!-- target: test -->
<form class="edit-form"
data-ui-type="Form" data-ui-id="form" data-ui-submit-button="submit-button">
	<div class="form-body">
        <!-- if: ${formType} == 'update' -->
	    <div class="form-row">
	        <div class="form-key">当前余额：</div>
	        <div class="form-value">
	        	<label data-ui-type="Label"
	        	data-ui-id="balance" data-ui-text="@detail.balance"></label>
	        </div>
	    </div>
        <!-- /if -->
	    <div class="form-row">
	        <div class="form-key">啥时候：</div>
	        <div class="form-value">
	        	<div data-ui-type="Calendar" data-ui-id="time"
	        	 data-ui-name="time" data-ui-value="${detail.time}"></div>
	        </div>
	    </div>
	    <div class="form-row">
	        <div class="form-key">谁：</div>
	        <div class="form-value">
            	<div data-ui-type="Select" data-ui-id="member"
            	 data-ui-name="member" data-ui-datasource="@members"
            	 data-ui-value="@detail.member.id"></div>
	        </div>
	    </div>
	    <div class="form-row">
	        <div class="form-key">充值\支出：</div>
	        <div class="form-value">
            	<div data-ui-type="Select" data-ui-id="type"
            	 data-ui-name="type" data-ui-datasource="@types"
            	 data-ui-value="@detail.type"></div>
	        </div>
	    </div>
	    <div class="form-row">
	        <div class="form-key">金额：</div>
	        <div class="form-value">
                <input data-ui-type="TextBox" data-ui-id="amount"
                 data-ui-name="amount" data-ui-mode="text"
                 data-ui-title="金额" 
                 data-ui-required="required"
                 data-ui-pattern="/^[0-9]\d*(\.\d+)?$/"
                 data-ui-patternErrorMessage="金额必须为整数"
                 data-ui-value="@detail.amount" />
	        </div>
	    </div>
	    <div class="form-row">
	        <div class="form-key">备注：</div>
	        <div class="form-value">
                <textarea data-ui-type="TextBox" data-ui-id="memo"
                 data-ui-name="memo" data-ui-mode="textarea"
                 data-ui-value=""></textarea>
	        </div>
	    </div>
	</div>
	<div class="submit-row">
	    <div class="form-row">
	        <div class="form-value">
	            <div data-ui-type="Button" data-ui-id="submit-button"
	             data-ui-skin="spring">保存并继续</div>
	            <div data-ui-type="Button"
	             data-ui-skin="link" data-ui-id="cancel-button">取消新建</div>
	        </div>
	    </div>
	</div>
</form>
