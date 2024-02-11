import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AlleeCreateFormInputValues = {
    Lettre?: string;
};
export declare type AlleeCreateFormValidationValues = {
    Lettre?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AlleeCreateFormOverridesProps = {
    AlleeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Lettre?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AlleeCreateFormProps = React.PropsWithChildren<{
    overrides?: AlleeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AlleeCreateFormInputValues) => AlleeCreateFormInputValues;
    onSuccess?: (fields: AlleeCreateFormInputValues) => void;
    onError?: (fields: AlleeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AlleeCreateFormInputValues) => AlleeCreateFormInputValues;
    onValidate?: AlleeCreateFormValidationValues;
} & React.CSSProperties>;
export default function AlleeCreateForm(props: AlleeCreateFormProps): React.ReactElement;
