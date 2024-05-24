/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type UpdateUpdateFormInputValues = {
    notes?: string;
    listing?: any;
};
export declare type UpdateUpdateFormValidationValues = {
    notes?: ValidationFunction<string>;
    listing?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UpdateUpdateFormOverridesProps = {
    UpdateUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    listing?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type UpdateUpdateFormProps = React.PropsWithChildren<{
    overrides?: UpdateUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    update?: any;
    onSubmit?: (fields: UpdateUpdateFormInputValues) => UpdateUpdateFormInputValues;
    onSuccess?: (fields: UpdateUpdateFormInputValues) => void;
    onError?: (fields: UpdateUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UpdateUpdateFormInputValues) => UpdateUpdateFormInputValues;
    onValidate?: UpdateUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UpdateUpdateForm(props: UpdateUpdateFormProps): React.ReactElement;
