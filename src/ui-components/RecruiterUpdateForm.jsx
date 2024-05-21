/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getRecruiter } from "../graphql/queries";
import { updateRecruiter } from "../graphql/mutations";
const client = generateClient();
export default function RecruiterUpdateForm(props) {
  const {
    id: idProp,
    recruiter: recruiterModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    listingId: "",
    first: "",
    last: "",
    email: "",
    company: "",
  };
  const [listingId, setListingId] = React.useState(initialValues.listingId);
  const [first, setFirst] = React.useState(initialValues.first);
  const [last, setLast] = React.useState(initialValues.last);
  const [email, setEmail] = React.useState(initialValues.email);
  const [company, setCompany] = React.useState(initialValues.company);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = recruiterRecord
      ? { ...initialValues, ...recruiterRecord }
      : initialValues;
    setListingId(cleanValues.listingId);
    setFirst(cleanValues.first);
    setLast(cleanValues.last);
    setEmail(cleanValues.email);
    setCompany(cleanValues.company);
    setErrors({});
  };
  const [recruiterRecord, setRecruiterRecord] =
    React.useState(recruiterModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getRecruiter.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getRecruiter
        : recruiterModelProp;
      setRecruiterRecord(record);
    };
    queryData();
  }, [idProp, recruiterModelProp]);
  React.useEffect(resetStateValues, [recruiterRecord]);
  const validations = {
    listingId: [{ type: "Required" }],
    first: [{ type: "Required" }],
    last: [{ type: "Required" }],
    email: [{ type: "Required" }],
    company: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          listingId,
          first,
          last,
          email,
          company: company ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateRecruiter.replaceAll("__typename", ""),
            variables: {
              input: {
                id: recruiterRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "RecruiterUpdateForm")}
      {...rest}
    >
      <TextField
        label="Listing id"
        isRequired={true}
        isReadOnly={false}
        value={listingId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              listingId: value,
              first,
              last,
              email,
              company,
            };
            const result = onChange(modelFields);
            value = result?.listingId ?? value;
          }
          if (errors.listingId?.hasError) {
            runValidationTasks("listingId", value);
          }
          setListingId(value);
        }}
        onBlur={() => runValidationTasks("listingId", listingId)}
        errorMessage={errors.listingId?.errorMessage}
        hasError={errors.listingId?.hasError}
        {...getOverrideProps(overrides, "listingId")}
      ></TextField>
      <TextField
        label="First"
        isRequired={true}
        isReadOnly={false}
        value={first}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              listingId,
              first: value,
              last,
              email,
              company,
            };
            const result = onChange(modelFields);
            value = result?.first ?? value;
          }
          if (errors.first?.hasError) {
            runValidationTasks("first", value);
          }
          setFirst(value);
        }}
        onBlur={() => runValidationTasks("first", first)}
        errorMessage={errors.first?.errorMessage}
        hasError={errors.first?.hasError}
        {...getOverrideProps(overrides, "first")}
      ></TextField>
      <TextField
        label="Last"
        isRequired={true}
        isReadOnly={false}
        value={last}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              listingId,
              first,
              last: value,
              email,
              company,
            };
            const result = onChange(modelFields);
            value = result?.last ?? value;
          }
          if (errors.last?.hasError) {
            runValidationTasks("last", value);
          }
          setLast(value);
        }}
        onBlur={() => runValidationTasks("last", last)}
        errorMessage={errors.last?.errorMessage}
        hasError={errors.last?.hasError}
        {...getOverrideProps(overrides, "last")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              listingId,
              first,
              last,
              email: value,
              company,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Company"
        isRequired={false}
        isReadOnly={false}
        value={company}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              listingId,
              first,
              last,
              email,
              company: value,
            };
            const result = onChange(modelFields);
            value = result?.company ?? value;
          }
          if (errors.company?.hasError) {
            runValidationTasks("company", value);
          }
          setCompany(value);
        }}
        onBlur={() => runValidationTasks("company", company)}
        errorMessage={errors.company?.errorMessage}
        hasError={errors.company?.hasError}
        {...getOverrideProps(overrides, "company")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || recruiterModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || recruiterModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
