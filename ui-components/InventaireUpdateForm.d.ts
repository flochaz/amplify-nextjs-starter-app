import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Inventaire } from "./graphql/types";
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
export declare type InventaireUpdateFormInputValues = {
    Emplacement?: string;
    Reference?: string;
    Ext?: string;
    PCB?: number;
    NbColis?: number;
    Quantite?: number;
    Date?: string;
};
export declare type InventaireUpdateFormValidationValues = {
    Emplacement?: ValidationFunction<string>;
    Reference?: ValidationFunction<string>;
    Ext?: ValidationFunction<string>;
    PCB?: ValidationFunction<number>;
    NbColis?: ValidationFunction<number>;
    Quantite?: ValidationFunction<number>;
    Date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InventaireUpdateFormOverridesProps = {
    InventaireUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Emplacement?: PrimitiveOverrideProps<TextFieldProps>;
    Reference?: PrimitiveOverrideProps<TextFieldProps>;
    Ext?: PrimitiveOverrideProps<TextFieldProps>;
    PCB?: PrimitiveOverrideProps<TextFieldProps>;
    NbColis?: PrimitiveOverrideProps<TextFieldProps>;
    Quantite?: PrimitiveOverrideProps<TextFieldProps>;
    Date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InventaireUpdateFormProps = React.PropsWithChildren<{
    overrides?: InventaireUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    inventaire?: Inventaire;
    onSubmit?: (fields: InventaireUpdateFormInputValues) => InventaireUpdateFormInputValues;
    onSuccess?: (fields: InventaireUpdateFormInputValues) => void;
    onError?: (fields: InventaireUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InventaireUpdateFormInputValues) => InventaireUpdateFormInputValues;
    onValidate?: InventaireUpdateFormValidationValues;
    displayEmptyButton?: boolean;
} & React.CSSProperties>;
export default function InventaireUpdateForm(props: InventaireUpdateFormProps): React.ReactElement;
