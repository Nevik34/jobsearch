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
export declare type ListingUpdateFormInputValues = {
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
export declare type ListingUpdateFormValidationValues = {
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
export declare type ListingUpdateFormOverridesProps = {
    ListingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type ListingUpdateFormProps = React.PropsWithChildren<{
    overrides?: ListingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    listing?: any;
    onSubmit?: (fields: ListingUpdateFormInputValues) => ListingUpdateFormInputValues;
    onSuccess?: (fields: ListingUpdateFormInputValues) => void;
    onError?: (fields: ListingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ListingUpdateFormInputValues) => ListingUpdateFormInputValues;
    onValidate?: ListingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ListingUpdateForm(props: ListingUpdateFormProps): React.ReactElement;
