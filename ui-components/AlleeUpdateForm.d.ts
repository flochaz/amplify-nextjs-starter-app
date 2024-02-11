import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Allee } from "./graphql/types";
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
export declare type AlleeUpdateFormInputValues = {
    Lettre?: string;
};
export declare type AlleeUpdateFormValidationValues = {
    Lettre?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AlleeUpdateFormOverridesProps = {
    AlleeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Lettre?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AlleeUpdateFormProps = React.PropsWithChildren<{
    overrides?: AlleeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    allee?: Allee;
    onSubmit?: (fields: AlleeUpdateFormInputValues) => AlleeUpdateFormInputValues;
    onSuccess?: (fields: AlleeUpdateFormInputValues) => void;
    onError?: (fields: AlleeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AlleeUpdateFormInputValues) => AlleeUpdateFormInputValues;
    onValidate?: AlleeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AlleeUpdateForm(props: AlleeUpdateFormProps): React.ReactElement;
