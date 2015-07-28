<!-- target: coupleForm -->
    <div data-ui-id="form" data-ui-type="Form" data-ui-submit-button="submit" data-ui-auto-validate="true" class="container">
        <div class="form">

            <div class="row">
                <div class="field-name">优惠内容</div>
                <div class="field-value">
                    <div class="ui-textbox" data-ui="id:content;name:content;type:TextBox;width:500;value:@data.content;required:required;">
                    </div>
                </div>
            </div>

        </div>

        <p class="submit">
            <button data-ui="type:Button;variants:danger;id:submit;" class="ui-large"><span class="ui-icon-check"></span>确认提交</button>
        </p>
    </div>
