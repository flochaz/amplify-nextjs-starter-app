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
export declare type InventaireCreateFormInputValues = {
    Emplacement?: string;
    Reference?: string;
    Ext?: string;
    PCB?: number;
    NbColis?: number;
    Quantite?: number;
    Date?: string;
};
export declare type InventaireCreateFormValidationValues = {
    Emplacement?: ValidationFunction<string>;
    Reference?: ValidationFunction<string>;
    Ext?: ValidationFunction<string>;
    PCB?: ValidationFunction<number>;
    NbColis?: ValidationFunction<number>;
    Quantite?: ValidationFunction<number>;
    Date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InventaireCreateFormOverridesProps = {
    InventaireCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Emplacement?: PrimitiveOverrideProps<TextFieldProps>;
    Reference?: PrimitiveOverrideProps<TextFieldProps>;
    Ext?: PrimitiveOverrideProps<TextFieldProps>;
    PCB?: PrimitiveOverrideProps<TextFieldProps>;
    NbColis?: PrimitiveOverrideProps<TextFieldProps>;
    Quantite?: PrimitiveOverrideProps<TextFieldProps>;
    Date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InventaireCreateFormProps = React.PropsWithChildren<{
    overrides?: InventaireCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: InventaireCreateFormInputValues) => InventaireCreateFormInputValues;
    onSuccess?: (fields: InventaireCreateFormInputValues) => void;
    onError?: (fields: InventaireCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InventaireCreateFormInputValues) => InventaireCreateFormInputValues;
    onValidate?: InventaireCreateFormValidationValues;
} & React.CSSProperties>;
export default function InventaireCreateForm(props: InventaireCreateFormProps): React.ReactElement;
