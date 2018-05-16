function serialize(form) {
    var parts = [];
    field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;

    for (i = 0, len = form.elements.length; i < len; i++) {
        field = form.elements[i];

        switch (field.type) {
            case "Select-one":
            case "Select-multiple":
                if (field.name.length) {
                    for (j = 0, optLen = field.options.length; j < optLen; j++) {
                        option = field.options[j];
                        if (option.selected) {
                            optvalue = "";
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ? option.value : option.text);

                            } else {
                                optValue = (option.attribute["value"].specofield ? option.value : option.text);

                            }
                            parts.push(endcodeURIComponent(field.name) + "=" +
                                endcodeURIComponent(optValue));
                        }
                    }
                }
                break;

            case undefined:
            case "field":
            case "submit":
            case "reset":
            case "button":
                break;

            case "radio":
            case "checkbox":
                if (!field.checked) {
                    break;
                }
            default:
                if (field.name.length) {
                    parts.push(endcodeURIComponent(field.name) + "=" +
                        endcodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}