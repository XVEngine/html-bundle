<?php

namespace XVEngine\Bundle\ComponentsBundle\Component\Utils;

use JsonSerializable;
use XVEngine\Core\Component\AbstractComponent;


/**
 * Class HtmlComponentItem
 * @author Krzysztof Bordeux Bednarczyk
 * @package XVEngine\Bundle\ComponentsBundle\Component\Utils
 */
class HtmlComponentItem implements JsonSerializable {


    /**
     * @var AbstractComponent
     */
    private $component;

    /**
     *
     * @var string
     */
    private $selector = "";

    /**
     * @var bool
     */
    private $replace = false;


    /**
     *
     * @param string $selector
     * @param AbstractComponent $component
     * @param bool $replace
     */
    public function __construct($selector , AbstractComponent $component, $replace = false) {
        $this->selector = $selector;
        $this->component = $component;
        $this->replace = $replace;
    }


    /**
     *
     *
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function jsonSerialize() {
        return array(
            "component" => $this->component,
            "selector" => $this->selector,
            "replace" => !!$this->replace
        );
    }

}
