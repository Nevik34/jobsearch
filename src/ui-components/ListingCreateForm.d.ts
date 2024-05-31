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
export declare type ListingCreateFormInputValues = {
    company?: string;
    title?: string;
    source?: string;
    link?: string;
    recruiter?: any;
    status?: string;
    notes?: string;
    updates?: any[];
    updateIds?: string[];
};
export declare type ListingCreateFormValidationValues = {
    company?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    source?: ValidationFunction<string>;
    link?: ValidationFunction<string>;
    recruiter?: ValidationFunction<any>;
    status?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
    updates?: ValidationFunction<any>;
    updateIds?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ListingCreateFormOverridesProps = {
    ListingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    company?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    source?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    recruiter?: PrimitiveOverrideProps<AutocompleteProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    updates?: PrimitiveOverrideProps<AutocompleteProps>;
    updateIds?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ListingCreateFormProps = React.PropsWithChildren<{
    overrides?: ListingCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ListingCreateFormInputValues) => ListingCreateFormInputValues;
    onSuccess?: (fields: ListingCreateFormInputValues) => void;
    onError?: (fields: ListingCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ListingCreateFormInputValues) => ListingCreateFormInputValues;
    onValidate?: ListingCreateFormValidationValues;
} & React.CSSProperties>;
export default function ListingCreateForm(props: ListingCreateFormProps): React.ReactElement;
