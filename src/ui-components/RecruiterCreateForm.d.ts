/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

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
export declare type RecruiterCreateFormInputValues = {
    listingId?: string;
    first?: string;
    last?: string;
    email?: string;
    company?: string;
};
export declare type RecruiterCreateFormValidationValues = {
    listingId?: ValidationFunction<string>;
    first?: ValidationFunction<string>;
    last?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    company?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RecruiterCreateFormOverridesProps = {
    RecruiterCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    listingId?: PrimitiveOverrideProps<TextFieldProps>;
    first?: PrimitiveOverrideProps<TextFieldProps>;
    last?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    company?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RecruiterCreateFormProps = React.PropsWithChildren<{
    overrides?: RecruiterCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RecruiterCreateFormInputValues) => RecruiterCreateFormInputValues;
    onSuccess?: (fields: RecruiterCreateFormInputValues) => void;
    onError?: (fields: RecruiterCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RecruiterCreateFormInputValues) => RecruiterCreateFormInputValues;
    onValidate?: RecruiterCreateFormValidationValues;
} & React.CSSProperties>;
export default function RecruiterCreateForm(props: RecruiterCreateFormProps): React.ReactElement;
