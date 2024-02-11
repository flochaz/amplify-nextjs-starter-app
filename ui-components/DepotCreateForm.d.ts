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
export declare type DepotCreateFormInputValues = {
    Nom?: string;
};
export declare type DepotCreateFormValidationValues = {
    Nom?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DepotCreateFormOverridesProps = {
    DepotCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Nom?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DepotCreateFormProps = React.PropsWithChildren<{
    overrides?: DepotCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DepotCreateFormInputValues) => DepotCreateFormInputValues;
    onSuccess?: (fields: DepotCreateFormInputValues) => void;
    onError?: (fields: DepotCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DepotCreateFormInputValues) => DepotCreateFormInputValues;
    onValidate?: DepotCreateFormValidationValues;
} & React.CSSProperties>;
export default function DepotCreateForm(props: DepotCreateFormProps): React.ReactElement;
