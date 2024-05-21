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
import { getUpdate } from "../graphql/queries";
import { updateUpdate } from "../graphql/mutations";
const client = generateClient();
export default function UpdateUpdateForm(props) {
  const {
    id: idProp,
    update: updateModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    noteId: "",
    date: "",
    notes: "",
  };
  const [noteId, setNoteId] = React.useState(initialValues.noteId);
  const [date, setDate] = React.useState(initialValues.date);
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = updateRecord
      ? { ...initialValues, ...updateRecord }
      : initialValues;
    setNoteId(cleanValues.noteId);
    setDate(cleanValues.date);
    setNotes(cleanValues.notes);
    setErrors({});
  };
  const [updateRecord, setUpdateRecord] = React.useState(updateModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUpdate.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUpdate
        : updateModelProp;
      setUpdateRecord(record);
    };
    queryData();
  }, [idProp, updateModelProp]);
  React.useEffect(resetStateValues, [updateRecord]);
  const validations = {
    noteId: [{ type: "Required" }],
    date: [{ type: "Required" }],
    notes: [],
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
          noteId,
          date,
          notes: notes ?? null,
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
            query: updateUpdate.replaceAll("__typename", ""),
            variables: {
              input: {
                id: updateRecord.id,
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
      {...getOverrideProps(overrides, "UpdateUpdateForm")}
      {...rest}
    >
      <TextField
        label="Note id"
        isRequired={true}
        isReadOnly={false}
        value={noteId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              noteId: value,
              date,
              notes,
            };
            const result = onChange(modelFields);
            value = result?.noteId ?? value;
          }
          if (errors.noteId?.hasError) {
            runValidationTasks("noteId", value);
          }
          setNoteId(value);
        }}
        onBlur={() => runValidationTasks("noteId", noteId)}
        errorMessage={errors.noteId?.errorMessage}
        hasError={errors.noteId?.hasError}
        {...getOverrideProps(overrides, "noteId")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              noteId,
              date: value,
              notes,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Notes"
        isRequired={false}
        isReadOnly={false}
        value={notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              noteId,
              date,
              notes: value,
            };
            const result = onChange(modelFields);
            value = result?.notes ?? value;
          }
          if (errors.notes?.hasError) {
            runValidationTasks("notes", value);
          }
          setNotes(value);
        }}
        onBlur={() => runValidationTasks("notes", notes)}
        errorMessage={errors.notes?.errorMessage}
        hasError={errors.notes?.hasError}
        {...getOverrideProps(overrides, "notes")}
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
          isDisabled={!(idProp || updateModelProp)}
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
              !(idProp || updateModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
