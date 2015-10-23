<?php

namespace XVEngine\Bundle\ComponentsBundle\Component\Utils;

use XVEngine\Core\Component\AbstractComponent;

class HtmlComponent extends AbstractComponent {

    /**
     * @var HtmlComponentItem[]
     */
    protected $items = [];

    /*
     *
     */
    public function init() {
        $this->setComponentName('utils.htmlComponent');
        $this->setParamByRef("items", $this->items);
    }


    /**
     * Set raw HTML to this component
     *
     * @author Krzysztof Bednarczyk
     * @param $html
     * @return $this
     */
    public function setHTML($html) {
        $this->setParam("html", $html);
        return $this;
    }


    /**
     * @deprecated Use addItem
     * @author Krzysztof Bednarczyk
     * @param HtmlComponentItem $item
     * @return HtmlComponent
     */
    public function addComponent(HtmlComponentItem $item){
       return $this->addItem($item);
    }


    /**
     * Replace tag in HTML with component
     *
     * @author Krzysztof Bednarczyk
     * @param HtmlComponentItem $item
     * @return $this
     */
    public function addItem(HtmlComponentItem $item){
        $this->items[] = $item;
        return $this;
    }

}
