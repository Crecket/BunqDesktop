import React from "react";
import { translate } from "react-i18next";
import FormControl from "@material-ui/core/FormControl";
import Typography from "../../TranslationHelpers/Typography";
import MoneyFormatInput from "../../FormFields/MoneyFormatInput";

const styles = {
    formControl: {
        marginBottom: 10,
        color: "#ffffff"
    }
};

const handleChangeFormatted = onChange => valueObject => {
    const onChangeValue = valueObject.formattedValue.length > 0 ? valueObject.floatValue : "";
    onChange(onChangeValue);
};

const renderTextField = ({ t, i18n, tReady, input, formStyle = {}, label, meta: { touched, error }, ...custom }) => {
    const { onChange, onBlur, onFocus, onDrop, ...restInputProps } = input;

    const errorStyle = { color: error ? "#ec2616" : "" };

    const labelComponent =
        label && label.length > 0 ? (
            <Typography variant="body1" style={errorStyle}>
                {label}
            </Typography>
        ) : null;
    const errorComponent = error && (
        <Typography variant="body2" style={errorStyle}>
            {error}
        </Typography>
    );
    const handleOnChange = handleChangeFormatted(onChange);

    return (
        <FormControl style={styles.formControl} style={formStyle} error={touched && !!error} fullWidth>
            {labelComponent}
            {errorComponent}
            <MoneyFormatInput onValueChange={handleOnChange} {...restInputProps} {...custom} />
        </FormControl>
    );
};

export default translate("translations")(renderTextField);
