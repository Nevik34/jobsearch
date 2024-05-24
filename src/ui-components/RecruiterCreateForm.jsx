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
import { listListings } from "../graphql/queries";
import { createRecruiter, updateListing } from "../graphql/mutations";
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
export default function RecruiterCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    referrals: [],
    first: "",
    last: "",
    email: "",
    company: "",
  };
  const [referrals, setReferrals] = React.useState(initialValues.referrals);
  const [referralsLoading, setReferralsLoading] = React.useState(false);
  const [referralsRecords, setReferralsRecords] = React.useState([]);
  const [first, setFirst] = React.useState(initialValues.first);
  const [last, setLast] = React.useState(initialValues.last);
  const [email, setEmail] = React.useState(initialValues.email);
  const [company, setCompany] = React.useState(initialValues.company);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setReferrals(initialValues.referrals);
    setCurrentReferralsValue(undefined);
    setCurrentReferralsDisplayValue("");
    setFirst(initialValues.first);
    setLast(initialValues.last);
    setEmail(initialValues.email);
    setCompany(initialValues.company);
    setErrors({});
  };
  const [currentReferralsDisplayValue, setCurrentReferralsDisplayValue] =
    React.useState("");
  const [currentReferralsValue, setCurrentReferralsValue] =
    React.useState(undefined);
  const referralsRef = React.createRef();
  const getIDValue = {
    referrals: (r) => JSON.stringify({ id: r?.id }),
  };
  const referralsIdSet = new Set(
    Array.isArray(referrals)
      ? referrals.map((r) => getIDValue.referrals?.(r))
      : getIDValue.referrals?.(referrals)
  );
  const getDisplayValue = {
    referrals: (r) => `${r?.company ? r?.company + " - " : ""}${r?.id}`,
  };
  const validations = {
    referrals: [],
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
  const fetchReferralsRecords = async (value) => {
    setReferralsLoading(true);
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
        (item) => !referralsIdSet.has(getIDValue.referrals?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setReferralsRecords(newOptions.slice(0, autocompleteLength));
    setReferralsLoading(false);
  };
  React.useEffect(() => {
    fetchReferralsRecords("");
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
          referrals,
          first,
          last,
          email,
          company,
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
            first: modelFields.first,
            last: modelFields.last,
            email: modelFields.email,
            company: modelFields.company,
          };
          const recruiter = (
            await client.graphql({
              query: createRecruiter.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createRecruiter;
          const promises = [];
          promises.push(
            ...referrals.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateListing.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "RecruiterCreateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              referrals: values,
              first,
              last,
              email,
              company,
            };
            const result = onChange(modelFields);
            values = result?.referrals ?? values;
          }
          setReferrals(values);
          setCurrentReferralsValue(undefined);
          setCurrentReferralsDisplayValue("");
        }}
        currentFieldValue={currentReferralsValue}
        label={"Referrals"}
        items={referrals}
        hasError={errors?.referrals?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("referrals", currentReferralsValue)
        }
        errorMessage={errors?.referrals?.errorMessage}
        getBadgeText={getDisplayValue.referrals}
        setFieldValue={(model) => {
          setCurrentReferralsDisplayValue(
            model ? getDisplayValue.referrals(model) : ""
          );
          setCurrentReferralsValue(model);
        }}
        inputFieldRef={referralsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Referrals"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Listing"
          value={currentReferralsDisplayValue}
          options={referralsRecords.map((r) => ({
            id: getIDValue.referrals?.(r),
            label: getDisplayValue.referrals?.(r),
          }))}
          isLoading={referralsLoading}
          onSelect={({ id, label }) => {
            setCurrentReferralsValue(
              referralsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentReferralsDisplayValue(label);
            runValidationTasks("referrals", label);
          }}
          onClear={() => {
            setCurrentReferralsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchReferralsRecords(value);
            if (errors.referrals?.hasError) {
              runValidationTasks("referrals", value);
            }
            setCurrentReferralsDisplayValue(value);
            setCurrentReferralsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("referrals", currentReferralsDisplayValue)
          }
          errorMessage={errors.referrals?.errorMessage}
          hasError={errors.referrals?.hasError}
          ref={referralsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "referrals")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="First"
        isRequired={true}
        isReadOnly={false}
        value={first}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              referrals,
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
              referrals,
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
              referrals,
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
              referrals,
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
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
