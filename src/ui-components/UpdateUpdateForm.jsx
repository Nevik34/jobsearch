/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getUpdate, listListings } from "../graphql/queries";
import { updateUpdate } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
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
    notes: "",
    listing: undefined,
  };
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [listing, setListing] = React.useState(initialValues.listing);
  const [listingLoading, setListingLoading] = React.useState(false);
  const [listingRecords, setListingRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = updateRecord
      ? { ...initialValues, ...updateRecord, listing }
      : initialValues;
    setNotes(cleanValues.notes);
    setListing(cleanValues.listing);
    setCurrentListingValue(undefined);
    setCurrentListingDisplayValue("");
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
      const listingRecord = record ? await record.listing : undefined;
      setListing(listingRecord);
      setUpdateRecord(record);
    };
    queryData();
  }, [idProp, updateModelProp]);
  React.useEffect(resetStateValues, [updateRecord, listing]);
  const [currentListingDisplayValue, setCurrentListingDisplayValue] =
    React.useState("");
  const [currentListingValue, setCurrentListingValue] =
    React.useState(undefined);
  const listingRef = React.createRef();
  const getIDValue = {
    listing: (r) => JSON.stringify({ id: r?.id }),
  };
  const listingIdSet = new Set(
    Array.isArray(listing)
      ? listing.map((r) => getIDValue.listing?.(r))
      : getIDValue.listing?.(listing)
  );
  const getDisplayValue = {
    listing: (r) => `${r?.company ? r?.company + " - " : ""}${r?.id}`,
  };
  const validations = {
    notes: [{ type: "Required" }],
    listing: [],
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
  const fetchListingRecords = async (value) => {
    setListingLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ company: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listListings.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listListings?.items;
      var loaded = result.filter(
        (item) => !listingIdSet.has(getIDValue.listing?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setListingRecords(newOptions.slice(0, autocompleteLength));
    setListingLoading(false);
  };
  React.useEffect(() => {
    fetchListingRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          notes,
          listing: listing ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          const modelFieldsToSave = {
            notes: modelFields.notes,
            listingId: modelFields?.listing?.id ?? null,
          };
          await client.graphql({
            query: updateUpdate.replaceAll("__typename", ""),
            variables: {
              input: {
                id: updateRecord.id,
                ...modelFieldsToSave,
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
        label="Notes"
        isRequired={true}
        isReadOnly={false}
        value={notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes: value,
              listing,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              notes,
              listing: value,
            };
            const result = onChange(modelFields);
            value = result?.listing ?? value;
          }
          setListing(value);
          setCurrentListingValue(undefined);
          setCurrentListingDisplayValue("");
        }}
        currentFieldValue={currentListingValue}
        label={"Listing"}
        items={listing ? [listing] : []}
        hasError={errors?.listing?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("listing", currentListingValue)
        }
        errorMessage={errors?.listing?.errorMessage}
        getBadgeText={getDisplayValue.listing}
        setFieldValue={(model) => {
          setCurrentListingDisplayValue(
            model ? getDisplayValue.listing(model) : ""
          );
          setCurrentListingValue(model);
        }}
        inputFieldRef={listingRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Listing"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Listing"
          value={currentListingDisplayValue}
          options={listingRecords
            .filter((r) => !listingIdSet.has(getIDValue.listing?.(r)))
            .map((r) => ({
              id: getIDValue.listing?.(r),
              label: getDisplayValue.listing?.(r),
            }))}
          isLoading={listingLoading}
          onSelect={({ id, label }) => {
            setCurrentListingValue(
              listingRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentListingDisplayValue(label);
            runValidationTasks("listing", label);
          }}
          onClear={() => {
            setCurrentListingDisplayValue("");
          }}
          defaultValue={listing}
          onChange={(e) => {
            let { value } = e.target;
            fetchListingRecords(value);
            if (errors.listing?.hasError) {
              runValidationTasks("listing", value);
            }
            setCurrentListingDisplayValue(value);
            setCurrentListingValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("listing", currentListingDisplayValue)
          }
          errorMessage={errors.listing?.errorMessage}
          hasError={errors.listing?.hasError}
          ref={listingRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "listing")}
        ></Autocomplete>
      </ArrayField>
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
