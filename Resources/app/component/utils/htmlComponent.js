(function(namespace, app, globals) {


    namespace.htmlComponent = app.newClass({
        extend: function () {
            return app.core.component.abstractComponent;
        }
    });


    /**
     * 
     * @returns {$}
     */
    namespace.htmlComponent.prototype.getTemplate = function() {
        var tmplString = app.utils.getString(function() {
            //@formatter:off
            /**<string>
                    <xv-html>
                    </xv-html>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };
    

    /**
     * 
     * @returns {object}
     */
    namespace.htmlComponent.prototype.getDefaultParams = function() {
        return {
            html : "",
            items : [],
            styles : []
        };
    };

  
    /**
     * 
     * @returns {undefined}
     */
    namespace.htmlComponent.prototype.init = function() {
        this.$styles = $();
        this.setHTML(this.params.html);
        this.setComponents(this.params.items);

        this.initEvents();
    };
  
    /**
     * 
     * @returns {undefined}
     */
    namespace.htmlComponent.prototype.setHTML = function(html, selector) {
        var $element = this.$element;
        var self = this;

        if(selector){
            $element = $element.find(selector);
        }else{
            this.$styles.remove();
        }
        $element.html(html);
        var $styles = $element.find('style').html(function(i, v) {
            return v.replace(/\#\#/g, '#' + self.$element.attr('id'));
        });
        this.$styles = this.$styles.add($styles);
        this.$styles.appendTo('head');
        return this;
    };


    namespace.htmlComponent.prototype.setComponents = function(components) {
        var self = this;
        var promisesArr = [];
        components.forEach(function(item){
            promisesArr.push(self.addItem(item));
        });

        return Q.all(promisesArr);
    };

    namespace.htmlComponent.prototype.addItem = function(item) {
        var self = this;
        return app.utils.buildComponent(item.component).then(function($html){
            var $el = self.$element.find(item.selector);
            $el[app.utils.ifsetor(item.replace, false) ? 'replaceWith' : 'html']($html);
            return true;
        });
    };

    namespace.htmlComponent.prototype.addComponent = function(item) {
        return this.addItem(item);
    };



    /**
     * 
     * @returns {undefined}
     */
    namespace.htmlComponent.prototype.initEvents = function() {
        var self = this;
        
        this.$element.on("click", "[xv-html-click]", function(){
            var eventName = $(this).attr("xv-html-click");
            self.trigger(eventName ? eventName : 'onClick');
            return false;
        });

        this.$element.on("mouseenter", "[xv-html-mouse-enter]", function(){
            var eventName = $(this).attr("xv-html-mouse-enter");
            self.trigger(eventName ? eventName : 'onMouseEnter');
            return false;
        });

        this.$element.on("mouseleave", "[xv-html-mouse-leave]", function(){
            var eventName = $(this).attr("xv-html-mouse-leave");
            self.trigger(eventName ? eventName : 'onMouseLeave');
            return false;
        });
        return this;
    };

    /**
     *
     * @returns {undefined}
     */
    namespace.htmlComponent.prototype.setAttrBySelector = function(selector, attrName, attrValue) {
        this.$element.find(selector).attr(attrName, attrValue);
        return this;
    };


    /**
     *
     * @returns {undefined}
     */
    namespace.htmlComponent.prototype.setTextBySelector = function(selector, text) {
        this.$element.find(selector).text(text);
        return this;
    };

    /**
     *
     * @returns {undefined}
     */
    namespace.htmlComponent.prototype.setHTMLBySelector = function(selector, html) {
        this.$element.find(selector).html(html);
        return this;
    };


    /**
     *
     * @returns {undefined}
     */
    namespace.htmlComponent.prototype.addClassBySelector = function(selector, classes) {
        this.$element.find(selector).addClass(classes);
        return this;
    };
    /**
     *
     * @returns {undefined}
     */
    namespace.htmlComponent.prototype.removeClassBySelector = function(selector, classes) {
        this.$element.find(selector).removeClass(classes);
        return this;
    };

    /**
     *
     * @returns {undefined}
     */
    namespace.htmlComponent.prototype.remove = function(selector) {
        this.$element.find(selector).remove();
        return this;
    };

    /**
     * Destructor
     * @returns {undefined}
     */
    namespace.htmlComponent.prototype.destroy = function(){
        this.$styles.remove();
    };


    
  
    return namespace.htmlComponent;
})(__ARGUMENT_LIST__);