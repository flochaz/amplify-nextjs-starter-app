import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Depot } from "./graphql/types";
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
export declare type DepotUpdateFormInputValues = {
    Nom?: string;
};
export declare type DepotUpdateFormValidationValues = {
    Nom?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DepotUpdateFormOverridesProps = {
    DepotUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Nom?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DepotUpdateFormProps = React.PropsWithChildren<{
    overrides?: DepotUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    depot?: Depot;
    onSubmit?: (fields: DepotUpdateFormInputValues) => DepotUpdateFormInputValues;
    onSuccess?: (fields: DepotUpdateFormInputValues) => void;
    onError?: (fields: DepotUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DepotUpdateFormInputValues) => DepotUpdateFormInputValues;
    onValidate?: DepotUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DepotUpdateForm(props: DepotUpdateFormProps): React.ReactElement;
